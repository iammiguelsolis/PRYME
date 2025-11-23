import { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const VentasPorMesChart = ({ ventas = [] }) => {
  const data = useMemo(() => {
    // Agrupar ventas por mes
    const ventasPorMes = {};
    
    ventas.forEach(venta => {
      const fecha = new Date(venta.fecha);
      const mesIndex = fecha.getMonth();
      const mesNombre = meses[mesIndex];
      
      if (!ventasPorMes[mesNombre]) {
        ventasPorMes[mesNombre] = 0;
      }
      ventasPorMes[mesNombre] += venta.total;
    });

    // Convertir a array para el gráfico (mostrar últimos 6 meses con datos)
    const resultado = meses
      .map(mes => ({
        mes,
        ventas: ventasPorMes[mes] || 0
      }))
      .filter(item => item.ventas > 0);

    // Si no hay datos, mostrar datos de ejemplo
    if (resultado.length === 0) {
      return [
        { mes: "Oct", ventas: 0 },
        { mes: "Nov", ventas: ventas.reduce((sum, v) => sum + v.total, 0) },
      ];
    }

    return resultado.length > 0 ? resultado : [{ mes: "Nov", ventas: 0 }];
  }, [ventas]);

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
            <Tooltip 
              formatter={(value) => [`S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 'Ventas']}
            />
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