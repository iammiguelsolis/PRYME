// inventarioDashboard/components/organismos/InventarioTableCard.jsx

import { Link } from "react-router-dom";
import { Button } from "../../../../globals/components/atomos/Button";
import { InventoryCardHeader } from "../molecules/InventoryCardHeader";

const InventarioTableCard = ({
  title,
  subtitle,
  headers = [],
  items = [],
  renderRow,
  buttonText,
  linkTo,
  buttonIcon,
  buttonIconPosition = "right",
  emptyMessage = "No hay datos para mostrar",
  className = "",
}) => {
  return (
    <div className={`bg-neutral-01 rounded-3xl shadow-md border border-neutral-02 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <InventoryCardHeader title={title} />
        {buttonText && linkTo && (
          <Link to={linkTo}>
            <Button
              size="small"
              variant="secondaryUNO"
              icon={buttonIcon}
              iconPosition={buttonIconPosition}
              className="flex items-center gap-2 -mt-4"
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </div>

      {/* Contenedor con scroll */}
      <div className="overflow-hidden rounded-lg border border-neutral-02">
        <div className="overflow-x-auto max-h-[430px] overflow-y-auto">
          <table className="w-full text-sm">
            {headers.length > 0 && (
              <thead className="bg-primary-02 sticky top-0 z-10">
                <tr>
                  {headers.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-3 py-2 text-[11px] font-semibold text-text-03 text-center uppercase tracking-wide"
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
    </div>
  );
};

export default InventarioTableCard;