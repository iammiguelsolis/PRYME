import { useMemo, useState } from "react";
import DashboardTableCard from "../components/organismos/DashboardTableCard";
import UserInfoCard from "../components/organismos/UserInfoCard";
import { useInventario } from "../../../context/InventarioContext";
import { useVentas } from "../../../context/VentasContext";

import {
  HiOutlineArchiveBox,
  HiOutlineTag,
  HiOutlineUser,
} from "react-icons/hi2";

// Reutilizamos el mismo Modal e InfoRow que en InventarioIngreso
import { Modal } from "../../ventasDashboard/components/organisms/Modal";
import { InfoRow } from "../../ventasDashboard/components/molecules/InfoRow";

// Íconos para los InfoRow (mismo estilo que en tus otros módulos)
import {
  Phone,
  Package,
  Box,
  DollarSign,
  Calendar,
  User,
  Tag,
  Edit3,
  Hash,
  CreditCard,
  MapPin,
} from "lucide-react";

const InicioPage = () => {
  const { ingresos } = useInventario();
  const { ventas } = useVentas();

  // ===== Estado para modales =====
  const [showIngresoModal, setShowIngresoModal] = useState(false);
  const [showVentaModal, setShowVentaModal] = useState(false);
  const [ventaModalTitle, setVentaModalTitle] = useState("Detalle de venta");

  const [ingresoSeleccionado, setIngresoSeleccionado] = useState(null);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // ===== Datos para tablas =====
  const inventarioData = useMemo(
    () => ({
      headers: ["ID Ingreso", "Total (S/.)", "N° Productos"],
      data: ingresos.slice(0, 5).map((ingreso) => [
        ingreso.id,
        ingreso.costoTotal.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        }),
        ingreso.cantidad,
      ]),
    }),
    [ingresos]
  );

  const ventasData = useMemo(
    () => ({
      headers: ["ID Venta", "Total (S/.)", "N° Productos"],
      data: ventas.slice(0, 5).map((venta) => [
        venta.id,
        venta.total.toLocaleString("es-PE", {
          minimumFractionDigits: 2,
        }),
        venta.productos.reduce((sum, p) => sum + p.cantidad, 0),
      ]),
    }),
    [ventas]
  );

  const devolucionesData = useMemo(() => {
    const ventasConDevoluciones = ventas.filter(
      (v) => v.productos.length === 0 || v.total < v.subtotal - v.descuento
    );

    return {
      headers: ["ID Venta", "Cliente", "Total Devuelto"],
      data: ventasConDevoluciones.slice(0, 5).map((venta) => [
        venta.id,
        venta.cliente,
        `S/. ${(venta.subtotal - venta.total - venta.descuento).toLocaleString(
          "es-PE",
          { minimumFractionDigits: 2 }
        )}`,
      ]),
    };
  }, [ventas]);

  // ===== Handlers de "Ver detalle" (desde las tablas) =====

  const handleDetalleIngreso = (row) => {
    const id = row[0]; // primera columna = ID Ingreso

    const ingreso = ingresos.find((ing) => String(ing.id) === String(id));
    if (!ingreso) return;

    setIngresoSeleccionado(ingreso);
    setShowIngresoModal(true);
  };

  const handleDetalleVenta = (row) => {
    const id = row[0];

    const venta = ventas.find((v) => String(v.id) === String(id));
    if (!venta) return;

    setVentaSeleccionada(venta);
    setVentaModalTitle("Detalle de venta");
    setShowVentaModal(true);
  };

  const handleDetalleDevolucion = (row) => {
    const id = row[0];

    const venta = ventas.find((v) => String(v.id) === String(id));
    if (!venta) return;

    setVentaSeleccionada(venta);
    setVentaModalTitle("Detalle de devolución");
    setShowVentaModal(true);
  };

  return (
    <main className="flex-grow p-6 bg-neutral-03">
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col h-full mb-4">
        Inicio
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Fila 1, Col 1 */}
        <UserInfoCard
          buttonIcon={<HiOutlineUser className="w-6 h-6" />}
          buttonIconPosition="right"
        />

        {/* Fila 1, Col 2 – Ingresos recientes */}
        <DashboardTableCard
          title="Últimos Ingresos de Inventario"
          headers={inventarioData.headers}
          data={inventarioData.data}
          buttonText="Ir a Ingresos"
          buttonHref="/inventario/ingreso"
          buttonIcon={<HiOutlineArchiveBox className="w-6 h-6" />}
          buttonIconPosition="right"
          onDetailClick={handleDetalleIngreso}
        />

        {/* Fila 2, Col 1 – Ventas recientes */}
        <DashboardTableCard
          title="Últimas Ventas"
          headers={ventasData.headers}
          data={ventasData.data}
          buttonText="Ir a Ventas"
          buttonHref="/ventas"
          buttonIcon={<HiOutlineTag className="w-6 h-6" />}
          buttonIconPosition="right"
          onDetailClick={handleDetalleVenta}
        />

        {/* Fila 2, Col 2 – Devoluciones recientes */}
        <DashboardTableCard
          title="Últimas Devoluciones"
          headers={devolucionesData.headers}
          data={devolucionesData.data}
          buttonText="Ir a Ventas"
          buttonHref="/ventas"
          emptyMessage="No hay devoluciones registradas"
          buttonIcon={<HiOutlineTag className="w-6 h-6" />}
          buttonIconPosition="right"
          onDetailClick={handleDetalleDevolucion}
        />
      </div>

      {/* ======================= */}
      {/* Modal Detalle de Ingreso */}
      {/* ======================= */}
      <Modal
        isOpen={showIngresoModal}
        onClose={() => setShowIngresoModal(false)}
        title="Detalle de Ingreso reciente"
        width="max-w-xl"
      >
        {ingresoSeleccionado && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-text-01 mb-3 border-b border-neutral-02 pb-1">
                Información del ingreso
              </p>
              <div className="space-y-3">
                <InfoRow
                  icon={Tag}
                  label="ID Ingreso"
                  value={ingresoSeleccionado.id}
                />
                <InfoRow
                  icon={User}
                  label="Proveedor"
                  value={ingresoSeleccionado.proveedor}
                />
                <InfoRow
                  icon={Package}
                  label="Producto"
                  value={ingresoSeleccionado.producto}
                />
                <InfoRow
                  icon={Box}
                  label="Cantidad"
                  value={`${ingresoSeleccionado.cantidad} unidades`}
                />
                <InfoRow
                  icon={Calendar}
                  label="Fecha"
                  value={ingresoSeleccionado.fecha}
                />
                <InfoRow
                  icon={DollarSign}
                  label="Total del ingreso"
                  value={`S/. ${ingresoSeleccionado.costoTotal.toFixed(2)}`}
                />
                <InfoRow
                  icon={Tag}
                  label="Tipo"
                  value={
                    ingresoSeleccionado.tipo === "compra"
                      ? "Compra"
                      : "Devolución"
                  }
                />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ======================= */}
      {/* Modal Detalle de Venta / Devolución */}
      {/* ======================= */}
      <Modal
        isOpen={showVentaModal}
        onClose={() => setShowVentaModal(false)}
        title={ventaModalTitle}
        width="max-w-xl"
      >
        {ventaSeleccionada && (
          <div className="space-y-5">
            {/* Datos de la venta */}
            <div>
              <p className="text-xl font-semibold text-[#0F172A]">
                Datos de la venta
              </p>
              <hr className="border-text-02 border-1 mb-3" />
              <div className="space-y-3">
                <InfoRow
                  icon={Edit3}
                  label="ID de la Venta"
                  value={ventaSeleccionada.id}
                />
                <InfoRow
                  icon={Hash}
                  label="Canal"
                  value={ventaSeleccionada.canal}
                />
                <InfoRow
                  icon={MapPin}
                  label="Sucursal"
                  value={ventaSeleccionada.sucursal}
                />
                <InfoRow
                  icon={CreditCard}
                  label="Método de pago"
                  value={ventaSeleccionada.metodo}
                />
                <InfoRow
                  icon={User}
                  label="Vendedor"
                  value={ventaSeleccionada.vendedor}
                />
              </div>
            </div>

            {/* Datos del cliente */}
            <div>
              <p className="text-xl font-semibold text-[#0F172A]">
                Datos del Cliente
              </p>
              <hr className="border-text-02 border-1 mb-3" />
              <div className="space-y-3">
                <InfoRow
                  icon={User}
                  label="Nombre completo"
                  value={ventaSeleccionada.clienteFull}
                />
                <InfoRow
                  icon={CreditCard}
                  label="DNI"
                  value={ventaSeleccionada.dni}
                />
                <InfoRow
                  icon={Phone}
                  label="Teléfono"
                  value={ventaSeleccionada.telefono}
                />
              </div>
            </div>

            <div>
              <p className="text-xl font-semibold text-[#0F172A]">Productos Vendidos</p>
              <hr className="border-text-02 border-1 mb-3" />
              <table className="w-full">
                <thead className="bg-[#1B8EF2]">
                  <tr>
                    <th className="px-2 py-2 text-xs font-medium text-white text-center">Modelo</th>
                    <th className="px-2 py-2 text-xs font-medium text-white text-center">Cantidad</th>
                    <th className="px-2 py-2 text-xs font-medium text-white text-center">Subtotal (S/.)</th>
                    <th className="px-2 py-2 text-xs font-medium text-white text-center">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {ventaSeleccionada.productos.map((producto, index) => (
                    <tr key={index} className="border-b border-[#E4E7EE]">
                      <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{producto.modelo}</td>
                      <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{producto.cantidad}</td>
                      <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{producto.subtotal.toFixed(2)}</td>
                      <td className="px-2 py-2 text-center">
                        <button 
                          onClick={() => handleVerProducto(producto)}
                          className="px-3 py-1 bg-[#1B8EF2] text-white rounded-full text-xs hover:bg-[#1675F2] transition-all"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Resumen */}
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Resumen</p>
              <hr className="border-text-02 border-1 mb-3" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#0F172A]">Subtotal</span>
                  <span className="text-[#0F172A]">
                    S/. {ventaSeleccionada.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B8EF2]">Descuento</span>
                  <span className="text-[#1B8EF2]">
                    S/. {ventaSeleccionada.descuento.toFixed(2)}
                  </span>
                </div>

                {/* Si la venta tiene devoluciones, mostramos el total devuelto */}
                {(() => {
                  const devuelto =
                    ventaSeleccionada.subtotal -
                    ventaSeleccionada.total -
                    ventaSeleccionada.descuento;
                  return devuelto > 0 ? (
                    <div className="flex justify-between">
                      <span className="text-[#F97316]">Total devuelto</span>
                      <span className="text-[#F97316]">
                        S/. {devuelto.toFixed(2)}
                      </span>
                    </div>
                  ) : null;
                })()}

                <hr className="border-[#9ba0ad] border-1" />
                <div className="flex justify-between font-bold pt-1">
                  <span className="text-[#0F172A]">TOTAL</span>
                  <span className="text-[#0F172A]">
                    S/. {ventaSeleccionada.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default InicioPage;
