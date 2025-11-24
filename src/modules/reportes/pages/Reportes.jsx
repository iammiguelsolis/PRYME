import { useState, useMemo } from "react";
import {
  HiCurrencyDollar,
  HiShoppingBag,
  HiCube,
  HiArrowPath,
  HiOutlineArrowUpOnSquare,
  HiChartBar,
  HiDocumentText,
} from "react-icons/hi2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useVentas } from "../../../context/VentasContext";
import { useInventario } from "../../../context/InventarioContext";

const COLORS = {
  primary: '#1B8EF2',
  secondary: '#22A2F2',
  complementary: '#F29F1B',
  success: '#2FAE90',
  warning: '#EBD950',
  danger: '#D06D49',
};

const KpiCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-8 h-8" style={{ color: COLORS.primary }} />
      {change && (
        <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      )}
    </div>
    <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ${className}`}>
    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b-2" style={{ borderColor: COLORS.primary }}>
      {title}
    </h3>
    {children}
  </div>
);

const ResumenCard = ({ ventas }) => {
  const resumen = useMemo(() => {
    const totalVentas = ventas.length;
    const ingresoTotal = ventas.reduce((sum, v) => sum + v.total, 0);
    const promedioVenta = totalVentas > 0 ? ingresoTotal / totalVentas : 0;
    const productosVendidos = ventas.reduce((sum, v) => 
      sum + v.productos.reduce((pSum, p) => pSum + p.cantidad, 0), 0
    );

    return { totalVentas, ingresoTotal, promedioVenta, productosVendidos };
  }, [ventas]);

  return (
    <div className="rounded-lg shadow-lg p-6 text-white bg-blue-500">
      <div className="flex items-center gap-3 mb-4">
        <HiDocumentText className="w-8 h-8" />
        <h3 className="text-xl font-bold">Resumen General de Ventas</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
          <p className="text-sm text-blue-100 mb-1 font-semibold">Total de Ventas</p>
          <p className="text-3xl font-bold">{resumen.totalVentas}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
          <p className="text-sm text-blue-100 mb-1 font-semibold">Ingreso Total</p>
          <p className="text-3xl font-bold">S/ {resumen.ingresoTotal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
          <p className="text-sm text-blue-100 mb-1 font-semibold">Promedio por Venta</p>
          <p className="text-3xl font-bold">S/ {resumen.promedioVenta.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
          <p className="text-sm text-blue-100 mb-1 font-semibold">Productos Vendidos</p>
          <p className="text-3xl font-bold">{resumen.productosVendidos}</p>
        </div>
      </div>
    </div>
  );
};

const Reportes = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  // Obtener datos de los contextos
  const { ventas } = useVentas();
  const { ingresos } = useInventario();

  const kpis = useMemo(() => {
    const ingresosTotales = ventas.reduce((sum, v) => sum + v.total, 0);
    const numeroVentas = ventas.length;
    const productosVendidos = ventas.reduce((sum, v) => 
      sum + v.productos.reduce((pSum, p) => pSum + p.cantidad, 0), 0
    );
    const devoluciones = ingresos.filter(i => i.tipo === 'devolucion').length;

    return { ingresosTotales, numeroVentas, productosVendidos, devoluciones };
  }, [ventas, ingresos]);

  // Datos para gráficos
  const ventasPorMes = useMemo(() => {
    const meses = {};
    ventas.forEach(v => {
      const fecha = new Date(v.fecha);
      const mesNombre = fecha.toLocaleDateString('es-PE', { month: 'long' });
      const mesCapitalizado = mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1);
      meses[mesCapitalizado] = (meses[mesCapitalizado] || 0) + v.total;
    });
    return Object.entries(meses).map(([name, ventas]) => ({ name, ventas }));
  }, [ventas]);

  const productosPorMes = useMemo(() => {
    const meses = {};
    ventas.forEach(v => {
      const fecha = new Date(v.fecha);
      const mesNombre = fecha.toLocaleDateString('es-PE', { month: 'long' });
      const mesCapitalizado = mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1);
      const cantidad = v.productos.reduce((sum, p) => sum + p.cantidad, 0);
      meses[mesCapitalizado] = (meses[mesCapitalizado] || 0) + cantidad;
    });
    return Object.entries(meses).map(([name, productos]) => ({ name, productos }));
  }, [ventas]);

  const ventasPorSucursal = useMemo(() => {
    const sucursales = {};
    ventas.forEach(v => {
      const sucursal = v.sucursal || 'Sin especificar';
      sucursales[sucursal] = (sucursales[sucursal] || 0) + v.total;
    });
    return Object.entries(sucursales).map(([name, value]) => ({ name, value }));
  }, [ventas]);

  const ventasPorCanal = useMemo(() => {
    const canales = {};
    ventas.forEach(v => {
      const canal = v.canal || 'Directo';
      canales[canal] = (canales[canal] || 0) + v.total;
    });
    return Object.entries(canales).map(([name, value]) => ({ name, value }));
  }, [ventas]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#E4E7EE' }}>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.6s ease-out;
        }
      `}</style>
      
      <div className="mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-l flex-1 mr-4 font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
            Reportes
          </h1>
          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 text-white font-semibold -mt-4 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: COLORS.primary }}
          >
            <HiOutlineArrowUpOnSquare className="w-5 h-5" />
            Exportar
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard
            icon={HiCurrencyDollar}
            title="Ingresos totales"
            value={`S/ ${kpis.ingresosTotales.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
            change={12.5}
          />
          <KpiCard
            icon={HiShoppingBag}
            title="Número de ventas"
            value={kpis.numeroVentas.toLocaleString()}
            change={8.2}
          />
          <KpiCard
            icon={HiCube}
            title="Total productos vendidos"
            value={kpis.productosVendidos.toLocaleString()}
            change={15.3}
          />
          <KpiCard
            icon={HiArrowPath}
            title="Devoluciones realizadas"
            value={kpis.devoluciones.toString()}
            change={-3.1}
          />
        </div>

        {/* RESUMEN DESTACADO */}
        <ResumenCard ventas={ventas} />

        {/* GRÁFICOS EN GRID 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Ventas por Mes (S/)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                />
                <YAxis 
                  tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '2px solid #1B8EF2',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                  formatter={(value) => [`S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 'Ventas']}
                />
                <Bar 
                  dataKey="ventas" 
                  fill={COLORS.primary} 
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Productos Vendidos por Mes">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productosPorMes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                />
                <YAxis 
                  tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '2px solid #2FAE90',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                  formatter={(value) => [value, 'Productos']}
                />
                <Bar 
                  dataKey="productos" 
                  fill={COLORS.success} 
                  radius={[8, 8, 0, 0]}
                  animationDuration={1200}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Ventas por Sucursal (S/)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorSucursal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EE" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                />
                <YAxis 
                  tick={{ fill: '#334155', fontSize: 13, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '2px solid #22A2F2',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                  formatter={(value) => [`S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 'Ventas']}
                />
                <Bar 
                  dataKey="value" 
                  fill={COLORS.secondary} 
                  radius={[8, 8, 0, 0]}
                  animationDuration={1400}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Distribución por Canal de Venta">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ventasPorCanal}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1600}
                >
                  {ventasPorCanal.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={[COLORS.complementary, COLORS.warning, COLORS.danger, COLORS.primary, COLORS.success, COLORS.secondary][index % 6]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '2px solid #F29F1B',
                    borderRadius: '8px',
                    fontWeight: 600
                  }}
                  formatter={(value) => [`S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 'Ventas']}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Modal de Exportar */}
        {isExportOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full animate-fade-in-scale">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Exportar Reporte</h2>
              <div className="space-y-3">
                <button 
                  className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  Exportar como PDF
                </button>
                <button 
                  className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: COLORS.success }}
                >
                  Exportar como Excel
                </button>
                <button 
                  onClick={() => setIsExportOpen(false)}
                  className="w-full font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: '#BEC2C9', color: '#0F172A' }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reportes;