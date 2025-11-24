// inventarioDashboard/components/organismos/InventarioTableCard.jsx

import { Link } from "react-router-dom";
import { Button } from "../../../../globals/components/atomos/Button";
import { DashboardCardHeader } from "../molecules/DashboardCardHeader";

const InventarioTableCard = ({
  title,              // string: "Lista de productos"
  subtitle,           // string opcional: "Resultados según filtros..."
  headers = [],       // array de strings
  items = [],         // array de objetos/filas
  renderRow,          // (item, index) => <tr>...</tr>
  buttonText,         // texto botón principal opcional
  linkTo,             // ruta botón principal
  buttonIcon,         // icono botón
  buttonIconPosition = "right",
  emptyMessage = "No hay datos para mostrar",
  className = "",
}) => {
  return (
    <div className={`bg-neutral-01 rounded-3xl shadow-md border border-neutral-02 p-4 ${className}`}>
      {/* Header: título + subtítulo + botón opcional */}
      <div className=" flex items-center justify-center mb-3 space-x-4">
        

        <DashboardCardHeader title={title} />

        {buttonText && linkTo && (
          <Link to={linkTo}>
            <Button
              size="small"
              variant="secondaryUNO"
              icon={buttonIcon}
              iconPosition={buttonIconPosition}
              className="flex items-center gap-2"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>

      {/* Tabla */}
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          {headers.length > 0 && (
            <thead className="bg-neutral-02/60">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-3 py-2 text-[11px] font-semibold text-text-01 text-center uppercase tracking-wide"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td
                  colSpan={headers.length || 1}
                  className="px-3 py-6 text-sm text-center text-neutral-03"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventarioTableCard;
