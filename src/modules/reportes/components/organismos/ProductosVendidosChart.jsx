import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const ProductosVendidosChart = ({ ventas = [] }) => {
  const data = useMemo(() => {
    // Agrupar productos por modelo y sumar cantidades
    const productosPorModelo = {};
    
    ventas.forEach(venta => {
      venta.productos.forEach(producto => {
        const modelo = producto.modelo;
        if (!productosPorModelo[modelo]) {
          productosPorModelo[modelo] = 0;
        }
        productosPorModelo[modelo] += producto.cantidad;
      });
    });

    // Convertir a array y ordenar por ventas (top 5)
    const resultado = Object.entries(productosPorModelo)
      .map(([producto, cantidad]) => ({ producto, ventas: cantidad }))
      .sort((a, b) => b.ventas - a.ventas)
      .slice(0, 5);

    return resultado.length > 0 ? resultado : [{ producto: "Sin datos", ventas: 0 }];
  }, [ventas]);

  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md p-4 h-[280px] flex flex-col">
      <h3 className="text-sm font-semibold text-text-01 mb-3">
        Top productos vendidos
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" />
            <XAxis 
              dataKey="producto" 
              angle={-20} 
              textAnchor="end" 
              height={50} 
              stroke="#BEC2C9"
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="#BEC2C9" />
            <Tooltip 
              formatter={(value) => [value, 'Unidades vendidas']}
            />
            <Bar dataKey="ventas" fill="#1B8EF2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};