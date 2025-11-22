// src/modules/reportes/components/moleculas/SelectMeses.jsx
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const SelectMeses = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (mes) => {
    onChange(mes);
    setOpen(false);
  };

  const label = value || "Seleccione una opción.";

  return (
    <div className="w-full">
      <p className="text-sm font-semibold text-text-01 mb-1">Mes:</p>

      {/* Botón tipo select */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full bg-secondary-02/50 hover:bg-secondary-02 text-text-01 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-01"
      >
        <span>{label}</span>
        <HiChevronDown className="w-5 h-5 text-text-02" />
      </button>

      {/* Lista desplegable */}
      {open && (
        <div className="mt-2 w-full bg-secondary-02/40 rounded-xl border border-secondary-02 max-h-60 overflow-y-auto shadow-lg">
          {MESES.map((mes) => (
            <button
              key={mes}
              type="button"
              onClick={() => handleSelect(mes)}
              className={`w-full text-left px-4 py-2 text-sm text-text-01 hover:bg-secondary-02 ${
                value === mes ? "bg-secondary-02/80 font-semibold" : ""
              }`}
            >
              {mes}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
