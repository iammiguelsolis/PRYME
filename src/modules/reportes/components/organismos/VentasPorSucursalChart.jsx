import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#F29F1B", "#1B8EF2", "#22A2F2", "#34D399", "#A78BFA"];

export const VentasPorSucursalChart = ({ ventas = [] }) => {
  const data = useMemo(() => {
    // Agrupar ventas por sucursal
    const ventasPorSucursal = {};
    
    ventas.forEach(venta => {
      const sucursal = venta.sucursal || "Sin sucursal";
      if (!ventasPorSucursal[sucursal]) {
        ventasPorSucursal[sucursal] = 0;
      }
      ventasPorSucursal[sucursal] += venta.total;
    });

    // Convertir a array para el gráfico
    const resultado = Object.entries(ventasPorSucursal)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return resultado.length > 0 ? resultado : [{ name: "Sin datos", value: 0 }];
  }, [ventas]);

  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-01 mb-1">
          Ventas por sucursal
        </h3>
        <p className="text-xs text-text-02 max-w-md">
          Distribución de ventas entre las diferentes sucursales.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-[260px] h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip 
                formatter={(value) => `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};