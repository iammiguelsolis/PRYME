import { useState } from "react";
import { FileText, Sheet, Calendar, CheckCircle2, Download, X } from "lucide-react";

const CheckboxCard = ({ icon: Icon, label, isSelected, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
      isSelected
        ? "border-primary-01 bg-primary-01/5"
        : "border-neutral-03 bg-white hover:border-neutral-02"
    }`}
  >
    <div
      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
        isSelected ? "bg-primary-01 text-white" : "bg-neutral-03 text-text-02"
      }`}
    >
      <Icon size={20} />
    </div>
    <span className={`font-medium ${isSelected ? "text-primary-01" : "text-text-02"}`}>
      {label}
    </span>
    {isSelected && (
      <CheckCircle2
        size={20}
        className="absolute top-3 right-3 text-primary-01"
      />
    )}
  </button>
);

const InfoCheckbox = ({ label, isSelected, onToggle }) => (
  <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-03/50 cursor-pointer transition-colors">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={onToggle}
      className="w-5 h-5 rounded border-2 border-neutral-02 text-primary-01 focus:ring-2 focus:ring-primary-01/20"
    />
    <span className="text-text-02 font-medium">{label}</span>
  </label>
);

export const ExportReportModal = ({ isOpen, onClose }) => {
  const [formatos, setFormatos] = useState([]);
  const [informacion, setInformacion] = useState([]);
  const [mes, setMes] = useState("");
  const [errors, setErrors] = useState({ formatos: false, informacion: false });

  const toggleFormato = (value) => {
    setFormatos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setErrors((prev) => ({ ...prev, formatos: false }));
  };

  const toggleInfo = (value) => {
    setInformacion((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setErrors((prev) => ({ ...prev, informacion: false }));
  };

  const handleExport = () => {
    const newErrors = {
      formatos: formatos.length === 0,
      informacion: informacion.length === 0
    };

    setErrors(newErrors);

    if (newErrors.formatos || newErrors.informacion) {
      return;
    }
    
    const formatosTexto = formatos.join(" y ");
    const infoTexto = informacion.join(", ");
    const mesTexto = mes ? ` del mes ${mes}` : "";
    
    console.log(`✅ Exportando ${infoTexto} en formato ${formatosTexto}${mesTexto}`);
    
    // Resetear y cerrar
    setFormatos([]);
    setInformacion([]);
    setMes("");
    setErrors({ formatos: false, informacion: false });
    onClose();
  };

  const meses = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-01 to-primary-02 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Download size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Exportar Reporte</h2>
              <p className="text-white/80 text-sm">Genera reportes personalizados</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-2xl font-light leading-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Formato Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-text-01 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-01 rounded-full"></div>
              Formato de Exportación
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <CheckboxCard
                icon={FileText}
                label="PDF"
                isSelected={formatos.includes("PDF")}
                onToggle={() => toggleFormato("PDF")}
              />
              <CheckboxCard
                icon={Sheet}
                label="Excel"
                isSelected={formatos.includes("Excel")}
                onToggle={() => toggleFormato("Excel")}
              />
            </div>
            {errors.formatos && (
              <div className="flex items-center gap-2 text-state-03 text-sm font-medium bg-state-03/10 px-4 py-2 rounded-lg animate-shake">
                Selecciona al menos un formato de exportación
              </div>
            )}
          </div>

          {/* Información Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-text-01 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-01 rounded-full"></div>
              Información a Incluir
            </h3>
            <div className="bg-neutral-03/30 rounded-xl p-4 space-y-1">
              <InfoCheckbox
                label="Ventas"
                isSelected={informacion.includes("Ventas")}
                onToggle={() => toggleInfo("Ventas")}
              />
              <InfoCheckbox
                label="Inventario"
                isSelected={informacion.includes("Inventario")}
                onToggle={() => toggleInfo("Inventario")}
              />
              <InfoCheckbox
                label="Devoluciones"
                isSelected={informacion.includes("Devoluciones")}
                onToggle={() => toggleInfo("Devoluciones")}
              />
            </div>
            {errors.informacion && (
              <div className="flex items-center gap-2 text-state-03 text-sm font-medium bg-state-03/10 px-4 py-2 rounded-lg animate-shake">
                <span className="text-lg">⚠️</span>
                Selecciona al menos un tipo de información
              </div>
            )}
          </div>

          {/* Filtro por Mes */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-text-01 flex items-center gap-2">
              <div className="w-1.5 h-5 bg-primary-01 rounded-full"></div>
              Filtro de Periodo <span className="text-neutral-02 text-sm font-normal">(Opcional)</span>
            </h3>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-02" size={20} />
              <select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-neutral-03 rounded-xl text-text-02 font-medium focus:border-primary-01 focus:outline-none transition-colors"
              >
                <option value="">Todos los meses</option>
                {meses.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-03/30 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg font-medium text-text-02 bg-white border-2 border-neutral-03 hover:bg-neutral-03/50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="px-6 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-primary-01 to-primary-02 hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Download size={18} />
            Exportar Reporte
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};