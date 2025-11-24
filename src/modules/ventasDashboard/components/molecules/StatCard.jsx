import { Link } from "react-router-dom";
import { HiOutlineChartBar } from 'react-icons/hi2';

import { Button } from "../../../../globals/components/atomos/Button";


export const StatCard = ({ icon: Icon, title, value }) => (
  <div className="flex gap-4 flex-col items-start justify-between bg-gradient-to-br from-[#1B8EF2] to-[#1675F2] rounded-2xl p-5 text-white w-[300px]">
    <div className="flex items-center gap-4 mb-2">
      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
        <Icon size={30} className="opacity-90" />
      </div>
      <span className="text-2xl font-semibold">{title}</span>
    </div>

    <p className="text-3xl font-bold mb-4">{value}</p>


    <Button 
      size="small"
      variant="white"
      icon={<HiOutlineChartBar  className="w-5 h-5"/>}
      iconPosition='right'
    >
      <Link to="/reportes" className="text-blue">
        Ir a Reportes
      </Link>
      
    </Button>
  </div>
);
