import { useMemo } from "react";
import DashboardTableCard from "../components/organismos/DashboardTableCard";
import UserInfoCard from "../components/organismos/UserInfoCard";
import { useInventario } from "../../../context/InventarioContext";
import { useVentas } from "../../../context/VentasContext";

const InicioPage = () => {
  const { ingresos } = useInventario();
  const { ventas } = useVentas();

  // Transformar datos de ingresos para la tabla
  const inventarioData = useMemo(() => ({
    headers: ["ID Ingreso", "Total (S/.)", "N° Productos"],
    data: ingresos.slice(0, 5).map(ingreso => [
      ingreso.id,
      ingreso.costoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 }),
      ingreso.cantidad
    ])
  }), [ingresos]);

  // Transformar datos de ventas para la tabla
  const ventasData = useMemo(() => ({
    headers: ["ID Venta", "Total (S/.)", "N° Productos"],
    data: ventas.slice(0, 5).map(venta => [
      venta.id,
      venta.total.toLocaleString('es-PE', { minimumFractionDigits: 2 }),
      venta.productos.reduce((sum, p) => sum + p.cantidad, 0)
    ])
  }), [ventas]);

  // Filtrar ventas con devoluciones (productos que fueron removidos)
  const devolucionesData = useMemo(() => {
    // Buscar ventas que tienen menos productos o total menor al subtotal original
    const ventasConDevoluciones = ventas.filter(v => 
      v.productos.length === 0 || v.total < v.subtotal - v.descuento
    );
    
    return {
      headers: ["ID Venta", "Cliente", "Total Devuelto"],
      data: ventasConDevoluciones.slice(0, 5).map(venta => [
        venta.id,
        venta.cliente,
        `S/. ${(venta.subtotal - venta.total - venta.descuento).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`
      ])
    };
  }, [ventas]);

  return (
    <main className="flex-grow p-6 bg-neutral-03">
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col h-full mb-4">
        Inicio
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Fila 1, Col 1 */}
        <UserInfoCard />
        
        {/* Fila 1, Col 2 */}
        <DashboardTableCard 
          title="Últimos Ingresos de Inventario"
          headers={inventarioData.headers}
          data={inventarioData.data}
          buttonText="Ir a Inventario"
          linkTo="/inventario"
        />
        
        {/* Fila 2, Col 1 */}
        <DashboardTableCard 
          title="Últimas Ventas"
          headers={ventasData.headers}
          data={ventasData.data}
          buttonText="Ir a Ventas"
          linkTo="/ventas"
        />
        
        {/* Fila 2, Col 2 */}
        <DashboardTableCard 
          title="Últimas Devoluciones"
          headers={devolucionesData.headers}
          data={devolucionesData.data}
          buttonText="Ir a Ventas"
          linkTo="/ventas"
          emptyMessage="No hay devoluciones registradas"
        />
        
      </div>
    </main>
  );
};

export default InicioPage;