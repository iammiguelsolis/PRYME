import { useState, useMemo } from "react";
import {
  HiCurrencyDollar,
  HiShoppingBag,
  HiCube,
  HiArrowPath,
  HiOutlineArrowUpOnSquare,
} from "react-icons/hi2";

import { KpiCard } from "../components/atomos/KpiCard";
import { VentasPorMesChart } from "../components/organismos/VentasPorMesChart";
import { ProductosVendidosChart } from "../components/organismos/ProductosVendidosChart";
import { VentasPorSucursalChart } from "../components/organismos/VentasPorSucursalChart";
import { ResumenTabla } from "../components/organismos/ResumenTabla";
import { ExportReportModal } from "../components/organismos/ExportReportModal";
import { Button } from "../../../globals/components/atomos/Button.jsx";

// Contextos
import { useInventario } from "../../../context/InventarioContext";
import { useVentas } from "../../../context/VentasContext";

const Reportes = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  
  const { ingresos } = useInventario();
  const { ventas } = useVentas();

  // Calcular KPIs dinámicamente
  const kpis = useMemo(() => {
    // Ingresos totales (suma de todas las ventas)
    const ingresosTotales = ventas.reduce((sum, v) => sum + v.total, 0);
    
    // Número de ventas
    const numeroVentas = ventas.length;
    
    // Total productos vendidos
    const productosVendidos = ventas.reduce((sum, v) => 
      sum + v.productos.reduce((pSum, p) => pSum + p.cantidad, 0), 0
    );
    
    // Devoluciones (ventas donde total < subtotal - descuento)
    const devoluciones = ventas.filter(v => 
      v.total < (v.subtotal - v.descuento) || v.productos.length === 0
    ).length;

    return {
      ingresosTotales,
      numeroVentas,
      productosVendidos,
      devoluciones
    };
  }, [ventas]);

  return (
    <div className="p-6 space-y-6 h-[calc(100vh-80px)] overflow-y-auto pr-2 bg-neutral-03 h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="flex items-center text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 mb-4 w-full">
          Reportes
        </h1>
        <Button
          type="button"
          variant="secondaryUNO"
          size="medium"
          className="flex items-center gap-2 -mt-3"
          onClick={() => setIsExportOpen(true)}
        >
          <HiOutlineArrowUpOnSquare className="w-6 h-5" />
          Exportar
        </Button>
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

      {/* GRÁFICOS SUPERIORES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VentasPorMesChart ventas={ventas} />
        <ProductosVendidosChart ventas={ventas} />
      </div>

      {/* GRÁFICO SUCURSALES */}
      <VentasPorSucursalChart ventas={ventas} />

      {/* TABLA RESUMEN */}
      <ResumenTabla ventas={ventas} />

      {/* MODAL DE EXPORTAR */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};

export default Reportes;