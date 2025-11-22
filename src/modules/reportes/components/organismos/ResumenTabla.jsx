// src/modules/reportes/components/organismos/ResumenTabla.jsx
import { MetricRow } from "../moleculas/MetricRow";

const rows = [
  {
    fecha: "15/11/2025",
    sucursal: "Mega Plaza",
    total: "S/ 3,450.00",
    productos: 12,
    devoluciones: "No",
  },
  {
    fecha: "15/11/2025",
    sucursal: "Plaza Norte",
    total: "S/ 2,800.00",
    productos: 9,
    devoluciones: "No",
  },
  {
    fecha: "14/11/2025",
    sucursal: "Plaza San Miguel",
    total: "S/ 4,120.00",
    productos: 15,
    devoluciones: "Sí",
  },
  {
    fecha: "14/11/2025",
    sucursal: "Mega Plaza",
    total: "S/ 1,780.00",
    productos: 6,
    devoluciones: "No",
  },
  {
    fecha: "13/11/2025",
    sucursal: "Plaza Norte",
    total: "S/ 5,230.00",
    productos: 18,
    devoluciones: "No",
  },
];

export const ResumenTabla = () => {
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
              <th className="px-4 py-2 font-semibold text-center">
                N° productos
              </th>
              <th className="px-4 py-2 font-semibold text-center">
                Devoluciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral-01">
            {rows.map((row) => (
              <MetricRow key={`${row.fecha}-${row.sucursal}`} {...row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
