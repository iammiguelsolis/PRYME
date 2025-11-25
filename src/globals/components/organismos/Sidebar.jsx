import { useNavigate, useLocation } from 'react-router-dom';
import PRYME from '../../../assets/PRYME_fondoBlanco.svg';

import { 
  HiOutlineHome, 
  HiOutlineArchiveBox, 
  HiOutlineTag, 
  HiOutlineChartBar,
  HiOutlineQuestionMarkCircle, 
  HiOutlineUser,          // 👈 nuevo icono
} from 'react-icons/hi2';

import SidebarLink from '../moleculas/SidebarLink';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 h-screen bg-neutral-01 p-4 flex flex-col shadow-lg">
      
      <div title='PRYME' className="mb-2">
        <img src={PRYME} alt="PRYME" width={150} />
      </div>

      <hr className="border-text-02 border-2 mb-4" />

      <nav>
        <ul className="space-y-2">

          <li onClick={() => navigate('/inicio')}>
            <SidebarLink
              icon={HiOutlineHome}
              isActive={isActive('/inicio')}
            >
              Inicio
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/inventario')}>
            <SidebarLink
              icon={HiOutlineArchiveBox}
              isActive={isActive('/inventario') && !isActive('/inventario/registrarIngreso')}
            >
              Inventario
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/inventario/registrarIngreso')}>
            <SidebarLink
              icon={HiOutlineArchiveBox}
              isActive={isActive('/inventario/registrarIngreso')}
            >
              Registrar Ingreso
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/ventas')}>
            <SidebarLink
              icon={HiOutlineTag}
              isActive={isActive('/ventas')}
            >
              Ventas
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/reportes')}>
            <SidebarLink
              icon={HiOutlineChartBar}
              isActive={isActive('/reportes')}
            >
              Reportes
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/ayuda')}>
            <SidebarLink
              icon={HiOutlineQuestionMarkCircle}
              isActive={isActive('/ayuda')}
            >
              Ayuda
            </SidebarLink>
          </li>

        </ul>
      </nav>

      {/* Empuja el resto hacia abajo */}
      <div className="flex-grow" />

      {/* Zona inferior: Perfil */}
      <div className="pt-3 border-t border-neutral-02 mt-3">
        <div onClick={() => navigate('/perfil')}>
          <SidebarLink
            icon={HiOutlineUser}
            isActive={isActive('/perfil')}
          >
            Mi perfil
          </SidebarLink>
        </div>
      </div>
    </aside>
  );
};
