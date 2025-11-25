import { HiOutlineInformationCircle, HiOutlineXMark } from 'react-icons/hi2';
import { useState } from 'react';

/**
 * Componente de ayuda contextual que muestra información guía en procesos complejos
 * Ayuda a cumplir la heurística H-10: Ayuda y documentación
 */
export const ContextualHelp = ({ 
  title = "Guía rápida",
  steps = [],
  tips = [],
  variant = "info", // info, warning, success
  dismissible = true,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const variants = {
    info: {
      bg: "bg-blue-50",
      border: "border-primary-01",
      icon: "text-primary-01",
      text: "text-primary-02"
    },
    warning: {
      bg: "bg-orange-50",
      border: "border-complementary-01",
      icon: "text-complementary-01",
      text: "text-complementary-02"
    },
    success: {
      bg: "bg-green-50",
      border: "border-state-01",
      icon: "text-state-01",
      text: "text-state-01"
    }
  };

  const style = variants[variant];

  return (
    <div className={`${style.bg} border-2 ${style.border} rounded-2xl p-5 ${className} animate-fade-in`}>
      <div className="flex items-start gap-4">
        {/* Ícono */}
        <div className={`flex-shrink-0 w-10 h-10 ${style.border} border-2 rounded-xl flex items-center justify-center ${style.bg}`}>
          <HiOutlineInformationCircle className={`w-6 h-6 ${style.icon}`} />
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-lg font-bold ${style.text}`}>{title}</h3>
            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className={`${style.icon} hover:opacity-70 transition-opacity`}
                title="Cerrar guía"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pasos */}
          {steps.length > 0 && (
            <div className="space-y-2 mb-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full ${style.border} border-2 ${style.icon} font-bold text-sm flex items-center justify-center`}>
                    {index + 1}
                  </span>
                  <p className="text-sm text-text-01 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tips */}
          {tips.length > 0 && (
            <div className="mt-4 pt-3 border-t border-current/20">
              <p className={`text-xs font-semibold ${style.text} mb-2`}>💡 Consejos:</p>
              <ul className="space-y-1">
                {tips.map((tip, index) => (
                  <li key={index} className="text-xs text-text-02 flex gap-2">
                    <span className={style.icon}>•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Componente compacto de ayuda inline para campos específicos
 */
export const InlineHelp = ({ text, className = "" }) => {
  return (
    <div className={`flex items-start gap-2 text-s text-text-02 ${className}`}>
      <HiOutlineInformationCircle className="w-4 h-4 text-primary-01 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </div>
  );
};