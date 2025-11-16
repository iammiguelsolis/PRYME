import { DashboardCard } from '../atomos/DashboardCard';
import { DashboardCardHeader } from '../moleculas/DashboardCardHeader';
import { Button } from '../../../../globals/components/atomos/Button';

const DashboardTableCard = ({ title, headers, data, buttonText, buttonHref = "#" }) => {
  return (
    <DashboardCard>
      <DashboardCardHeader title={title} />
      
      <div className="overflow-x-auto">
        <table className="w-full border border-primary-01 rounded-xl overflow-hidden">
          <thead className="bg-primary-01 text-text-03">
            <tr>
              {headers.map(header => (
                <th key={header} className="p-3 text-left font-semibold">
                  {header}
                </th>
              ))}
              <th className="p-3 text-left font-semibold">Detalle</th>
            </tr>
          </thead>
          
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-neutral-03 text-text-02">
                {row.map((cell, i) => (
                  <td key={i} className="p-3">{cell}</td>
                ))}
                
                <td>
                  <Button 
                    size="small" variant="white"
                  >
                    Ver detalle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="mt-4">
        <Button 
          size="medium" variant="secondaryUNO"
        >
          {buttonText}
        </Button>
      </div>
    </DashboardCard>
  );
};

export default DashboardTableCard;