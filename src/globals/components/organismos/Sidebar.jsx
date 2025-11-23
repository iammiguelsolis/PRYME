import { useNavigate, useLocation } from 'react-router-dom';
import PRYME from '../../../assets/PRYME_fondoBlanco.svg';

import { 
  HiOutlineHome, 
  HiOutlineArchiveBox, 
  HiOutlineTag, 
  HiOutlineChartBar 
} from 'react-icons/hi2';

import SidebarLink from '../moleculas/SidebarLink';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar qué link está activo basado en la URL actual
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 h-screen bg-neutral-01 p-4 flex flex-col shadow-lg">
      
      <div className="mb-2">
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
              isActive={isActive('/inventario')}
            >
              Inventario
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

        </ul>
      </nav>

      <div className="flex-grow"></div>
    </aside>
  );
};