import { HiOutlineChartBar } from 'react-icons/hi2';
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../globals/components/atomos/Button";

export const StatCard = ({ icon: Icon, title, value }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 flex-col items-start justify-between bg-primary-02 rounded-2xl p-5 text-white w-[300px]">
      <div title={title} className="flex items-center gap-4 mb-2">
        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
          <Icon size={30} className="opacity-90" />
        </div>
        <span className="text-2xl font-semibold">{title}</span>
      </div>

      <p title={value} className="text-3xl font-bold mb-4">{value}</p>

      <Button 
        size="small"
        variant="white"
        icon={<HiOutlineChartBar className="w-5 h-5" />}
        iconPosition="right"
        onClick={() => navigate('/reportes')}
      >
        Ir a Reportes
      </Button>
    </div>
  );
};
