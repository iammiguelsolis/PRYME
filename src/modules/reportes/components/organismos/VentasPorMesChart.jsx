// src/modules/reportes/components/organismos/VentasPorMesChart.jsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { mes: "Ene", ventas: 12000 },
  { mes: "Feb", ventas: 13500 },
  { mes: "Mar", ventas: 11800 },
  { mes: "Abr", ventas: 16000 },
  { mes: "May", ventas: 17500 },
  { mes: "Jun", ventas: 14000 },
];

export const VentasPorMesChart = () => {
  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md p-4 h-[280px] flex flex-col">
      <h3 className="text-sm font-semibold text-text-01 mb-3">
        Ventas por mes
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" />
            <XAxis dataKey="mes" stroke="#BEC2C9" />
            <YAxis stroke="#BEC2C9" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ventas"
              stroke="#1B8EF2"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
