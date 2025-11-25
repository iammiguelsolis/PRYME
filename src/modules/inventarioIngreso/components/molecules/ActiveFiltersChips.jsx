import { X } from 'lucide-react';

/**
 * Componente para mostrar filtros activos como chips removibles
 * Ayuda a la heurística H-6: Reconocimiento antes que recuerdo
 * Los usuarios pueden ver y remover filtros sin tener que recordar qué seleccionaron
 * 
 * @param {Object} filters - Objeto con los filtros activos
 * @param {Function} onRemoveFilter - Función para remover un filtro específico
 * @param {Object} filterLabels - Mapeo de keys a labels legibles
 * @param {Object} valueLabels - Mapeo opcional de valores a labels legibles
 */
export const ActiveFiltersChips = ({ 
  filters, 
  onRemoveFilter, 
  filterLabels = {},
  valueLabels = {}
}) => {
  // Obtener solo los filtros que tienen valor
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    return value !== '' && value !== null && value !== undefined;
  });

  // Si no hay filtros activos, no mostrar nada
  if (activeFilters.length === 0) {
    return null;
  }

  // Función para obtener el label del valor
  const getValueLabel = (key, value) => {
    if (valueLabels[key] && valueLabels[key][value]) {
      return valueLabels[key][value];
    }
    return value;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3 mt-2">
      <span className="text-sm font-medium text-text-01">
        Filtros activos:
      </span>
      
      {activeFilters.map(([key, value]) => (
        <div
          key={key}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-01 text-white rounded-full text-sm"
        >
          <span className="font-medium">
            {filterLabels[key] || key}:
          </span>
          <span>
            {getValueLabel(key, value)}
          </span>
          <button
            onClick={() => onRemoveFilter(key)}
            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
            aria-label={`Remover filtro ${filterLabels[key] || key}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};