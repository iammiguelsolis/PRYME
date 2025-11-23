import { useMemo } from "react";
import { MetricRow } from "../moleculas/MetricRow";

export const ResumenTabla = ({ ventas = [] }) => {
  const rows = useMemo(() => {
    return ventas.slice(0, 10).map(venta => {
      // Formatear fecha
      const fecha = new Date(venta.fecha);
      const fechaFormateada = fecha.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // Contar productos
      const numProductos = venta.productos.reduce((sum, p) => sum + p.cantidad, 0);

      // Verificar si tiene devolución
      const tieneDevoluciones = venta.total < (venta.subtotal - venta.descuento) || venta.productos.length === 0;

      return {
        fecha: fechaFormateada,
        sucursal: venta.sucursal,
        total: `S/ ${venta.total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`,
        productos: numProductos,
        devoluciones: tieneDevoluciones ? "Sí" : "No"
      };
    });
  }, [ventas]);

  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md p-4">
      <h3 className="text-sm font-semibold text-text-01 mb-3">
        Resumen de ventas del periodo
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary-01 text-text-03 text-xs">
              <th className="px-4 py-2 font-semibold">Fecha</th>
              <th className="px-4 py-2 font-semibold">Sucursal</th>
              <th className="px-4 py-2 font-semibold">Total de la venta</th>
              <th className="px-4 py-2 font-semibold text-center">N° productos</th>
              <th className="px-4 py-2 font-semibold text-center">Devoluciones</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-01">
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <MetricRow key={`${row.fecha}-${row.sucursal}-${index}`} {...row} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No hay ventas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};