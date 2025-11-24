import { DashboardCard } from '../atomos/DashboardCard';
import { DashboardCardHeader } from '../moleculas/DashboardCardHeader';
import { Button } from '../../../../globals/components/atomos/Button';
import FOTO from '../../../../assets/images/3d_avatar_21.png';

import { useNavigate } from 'react-router-dom';

// Campo de información con ancho ampliado
const UserInfoField = ({ label, value }) => (
  <div className="border-2 border-primary-01 rounded-2xl p-3 mb-3 w-full max-w-[380px]">
    <div className="text-xs text-primary-02">{label}</div>
    <div className="font-semibold text-text-02">{value}</div>
  </div>
);

const UserInfoCard = ({buttonIcon, buttonIconPosition}) => {

  const navigate = useNavigate();
  return (
    <DashboardCard>
      <DashboardCardHeader title="Información del Trabajador" />
      
      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row items-start md:items-start gap-6">
        
        {/* Avatar */}
        <div className="flex-shrink-0 ms-5">
          <img 
            src={FOTO}
            alt="Avatar" 
            className="rounded-full object-cover"
            width={250}
          />
        </div>
        
        {/* Campos de Info */}
        <div className="w-full max-w-[300px] ms-5">
          <UserInfoField label="ID de Trabajador" value="23200338" />
          <UserInfoField label="Nombre" value="Miguel Alonso Solis Cunza" />
          <UserInfoField label="Sucursal" value="Lima Centro" />
          <UserInfoField label="Total Ventas este Mes" value="15" />
        </div>
      </div>
      
      {/* Espaciador */}
      <div className="flex-grow"></div>
      
      {/* Botón */}
      <div className="mt-4">
        <Button size="medium" variant="secondaryUNO" icon={buttonIcon} iconPosition={buttonIconPosition} onClick={() => navigate("/perfil")}>
          Ir a Perfil
        </Button>
      </div>
    </DashboardCard>
  );
};

export default UserInfoCard;
