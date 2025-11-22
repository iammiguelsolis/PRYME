// src/modules/reportes/components/organismos/ProductosVendidosChart.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { producto: "Nike Air Max", ventas: 120 },
  { producto: "Adidas Ultraboost", ventas: 95 },
  { producto: "Puma RS-X", ventas: 80 },
  { producto: "Reebok Classic", ventas: 75 },
  { producto: "New Balance 574", ventas: 70 },
];

export const ProductosVendidosChart = () => {
  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md p-4 h-[280px] flex flex-col">
      <h3 className="text-sm font-semibold text-text-01 mb-3">
        Top productos vendidos
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" />
            <XAxis dataKey="producto" angle={-20} textAnchor="end" height={50} stroke="#BEC2C9" />
            <YAxis stroke="#BEC2C9" />
            <Tooltip />
            <Bar dataKey="ventas" fill="#1B8EF2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
