import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

/**
 * Componente para headers de tabla con funcionalidad de ordenamiento
 * Mejora la heurística H-7: Flexibilidad y eficiencia de uso
 * Permite a usuarios avanzados ordenar datos rápidamente
 * 
 * @param {string} column - Identificador único de la columna
 * @param {string} label - Texto a mostrar en el header
 * @param {string} sortColumn - Columna actualmente ordenada
 * @param {string} sortDirection - Dirección del ordenamiento ('asc' o 'desc')
 * @param {Function} onSort - Función callback para manejar el ordenamiento
 * @param {boolean} sortable - Si la columna es ordenable (default: true)
 * @param {string} className - Clases CSS adicionales
 */
export const SortableTableHeader = ({ 
  column, 
  label, 
  sortColumn, 
  sortDirection, 
  onSort,
  sortable = true,
  className = ''
}) => {
  const isActive = sortColumn === column;
  
  const handleClick = () => {
    if (!sortable) return;
    onSort(column);
  };

  return (
    <th 
      className={`px-2 py-3 text-xs font-medium text-white text-center ${sortable ? 'cursor-pointer hover:bg-blue-600 transition-colors' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-1">
        <span>{label}</span>
        {sortable && (
          <span className="inline-flex items-center">
            {!isActive && (
              <ChevronsUpDown className="w-3 h-3 opacity-50" />
            )}
            {isActive && sortDirection === 'asc' && (
              <ChevronUp className="w-3 h-3" />
            )}
            {isActive && sortDirection === 'desc' && (
              <ChevronDown className="w-3 h-3" />
            )}
          </span>
        )}
      </div>
    </th>
  );
};