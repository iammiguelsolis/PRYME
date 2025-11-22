import { useState } from "react";

// Íconos
import {
  HiCurrencyDollar,
  HiShoppingBag,
  HiCube,
  HiArrowPath,
  HiOutlineArrowUpOnSquare,
} from "react-icons/hi2";

// Átomos y Organismos del módulo Reportes
import { KpiCard } from "../components/atomos/KpiCard";
import { VentasPorMesChart } from "../components/organismos/VentasPorMesChart";
import { ProductosVendidosChart } from "../components/organismos/ProductosVendidosChart";
import { VentasPorSucursalChart } from "../components/organismos/VentasPorSucursalChart";
import { ResumenTabla } from "../components/organismos/ResumenTabla";

// Modal
import { ExportReportModal } from "../components/organismos/ExportReportModal";

// Botón Global
import { Button } from "../../../globals/components/atomos/Button.jsx";


const Reportes = () => {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 h-[calc(100vh-80px)] overflow-y-auto pr-2 bg-neutral-03 h-full">


      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="flex items-center text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 mb-4 w-full">
          Reportes
        </h1>

        {/* BOTÓN EXPORTAR */}
        <Button
          type="button"
          variant="secondaryUNO"
          size="medium"
          className="flex items-center gap-2 -mt-3 "
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
          value="S/ 127,140"
          change={12.5}
        />
        <KpiCard
          icon={HiShoppingBag}
          title="Número de ventas"
          value="1,248"
          change={8.2}
        />
        <KpiCard
          icon={HiCube}
          title="Total productos vendidos"
          value="3,567"
          change={15.3}
        />
        <KpiCard
          icon={HiArrowPath}
          title="Devoluciones realizadas"
          value="23"
          change={-3.1}
        />
      </div>

      {/* GRÁFICOS SUPERIORES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VentasPorMesChart />
        <ProductosVendidosChart />
      </div>

      {/* GRÁFICO SUCURSALES */}
      <VentasPorSucursalChart />

      {/* TABLA RESUMEN */}
      <ResumenTabla />

      {/* MODAL DE EXPORTAR */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};

export default Reportes;
