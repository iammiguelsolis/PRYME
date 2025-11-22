// src/modules/reportes/components/organismos/ExportReportModal.jsx
import { useState } from "react";
import { CheckboxGroup } from "../moleculas/CheckboxGroup";
import { SelectMeses } from "../moleculas/SelectMeses";
import { Button } from "../../../../globals/components/atomos/Button.jsx";



export const ExportReportModal = ({ isOpen, onClose }) => {
  const [formatos, setFormatos] = useState([]);
  const [informacion, setInformacion] = useState([]);
  const [mes, setMes] = useState(null);

  if (!isOpen) return null;

  const toggleFormato = (value) => {
    setFormatos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleInfo = (value) => {
    setInformacion((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleExport = () => {
    // Simulación de exportación (solo frontend)
    alert("Reporte exportado correctamente (simulado, solo frontend).");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-01 rounded-2xl shadow-2xl w-[430px] max-w-full p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-01">Exportar reporte</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-02 hover:text-text-01 text-xl leading-none"
          >
            ×
          </button>
        </header>

        <CheckboxGroup
          title="Selecciona qué formato quieres exportar:"
          options={["PDF", "Excel"]}
          values={formatos}
          onToggle={toggleFormato}
        />

        <CheckboxGroup
          title="Selecciona qué información quieres exportar:"
          options={["Ventas", "Inventario", "Devoluciones"]}
          values={informacion}
          onToggle={toggleInfo}
        />

        <SelectMeses value={mes} onChange={setMes} />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="white"
            size="medium"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={handleExport}
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
};
