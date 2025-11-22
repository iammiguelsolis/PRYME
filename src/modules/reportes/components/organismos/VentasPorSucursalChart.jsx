// src/modules/reportes/components/organismos/VentasPorSucursalChart.jsx
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Mega Plaza", value: 45000 },
  { name: "Plaza Norte", value: 28000 },
  { name: "Plaza San Miguel", value: 38000 },
];

const COLORS = ["#F29F1B", "#1B8EF2", "#22A2F2"];

export const VentasPorSucursalChart = () => {
  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md p-6 flex flex-col gap-4">
      
      {/* Título y descripción */}
      <div>
        <h3 className="text-sm font-semibold text-text-01 mb-1">
          Ventas por sucursal
        </h3>
        <p className="text-xs text-text-02 max-w-md">
          Distribución de ventas entre Mega Plaza, Plaza Norte y Plaza San Miguel.
        </p>
      </div>

      {/* 🔥 GRÁFICO CENTRADO */}
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
