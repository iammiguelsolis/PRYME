import { DashboardCard } from '../atomos/DashboardCard';
import { DashboardCardHeader } from '../moleculas/DashboardCardHeader';
import { Button } from '../../../../globals/components/atomos/Button';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from "react-icons/fa";

const DashboardTableCard = ({
  title,
  headers,
  data,
  buttonText,
  buttonHref = "#",
  buttonIcon,
  buttonIconPosition,
  emptyMessage = "No hay registros para mostrar",
  onDetailClick,   // 👈 callback para “Ver detalle”
}) => {
  const navigate = useNavigate();

  return (
    <DashboardCard>
      <DashboardCardHeader title={title} />
      
      <div className="overflow-x-auto">
        <table className="w-full border border-primary-01 rounded-xl overflow-hidden">
          <thead className="bg-primary-01 text-text-03">
            <tr>
              {headers.map((header) => (
                <th key={header} className="p-3 text-center font-semibold">
                  {header}
                </th>
              ))}
              <th className="p-3 text-center font-semibold">Detalle</th>
            </tr>
          </thead>
          
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-03 text-text-02"
                >
                  {row.map((cell, i) => (
                    <td key={i} className="p-2 text-center">
                      {cell}
                    </td>
                  ))}

                  <td className="p-2 text-center">
                    <Button
                      size="small"
                      variant="white"
                      icon={<FaInfoCircle className="w-5 h-5" />}
                      iconPosition="right"
                      onClick={() => {
                        if (onDetailClick) {
                          onDetailClick(row, index); // 👈 devolvemos la fila a Inicio
                        }
                      }}
                    >
                      Ver detalle
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="px-4 py-6 text-sm text-center text-neutral-03"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-grow" />

      {/* El botón de abajo sigue navegando al módulo completo si lo deseas */}
      <div className="mt-4">
        <Button
          size="medium"
          variant="secondaryUNO"
          icon={buttonIcon}
          iconPosition={buttonIconPosition}
          onClick={() => navigate(buttonHref)}
        >
          {buttonText}
        </Button>
      </div>
    </DashboardCard>
  );
};

export default DashboardTableCard;
