import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PRYME from '../../../assets/PRYME_fondoBlanco.svg';
import PRYMEPQUEÑO from '../../../assets/LOGO_fondoBlanco.svg';

import { 
  HiOutlineHome, 
  HiOutlineArchiveBox, 
  HiOutlineTag, 
  HiOutlineChartBar,
  HiOutlineQuestionMarkCircle,
  HiOutlineArchiveBoxArrowDown, 
  HiOutlineUser,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';

import SidebarLink from '../moleculas/SidebarLink';
import { IoAccessibilityOutline } from 'react-icons/io5';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-neutral-01 p-4 flex flex-col shadow-lg transition-all duration-300 relative`}
    >
      
      {/* Botón para colapsar/expandir */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-neutral-01 border-2 border-neutral-02 rounded-full p-1 hover:bg-neutral-02 transition-colors z-10"
        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        {isCollapsed ? (
          <HiChevronRight className="w-5 h-5 text-text-01" />
        ) : (
          <HiChevronLeft className="w-5 h-5 text-text-01" />
        )}
      </button>

      {/* Logo */}
      <div title='PRYME' className="mb-2 flex justify-center">
        <img 
          src={isCollapsed ? PRYMEPQUEÑO : PRYME} 
          alt="PRYME" 
          className={isCollapsed ? 'w-10' : 'w-[150px]'}
        />
      </div>

      <hr className="border-text-02 border-2 mb-4" />

      <nav>
        <ul className="space-y-2">

          <li onClick={() => navigate('/inicio')}>
            <SidebarLink
              icon={HiOutlineHome}
              isActive={isActive('/inicio')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Inicio'}
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/inventario')}>
            <SidebarLink
              icon={HiOutlineArchiveBox}
              isActive={isActive('/inventario') && !isActive('/inventario/registrarIngreso')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Inventario'}
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/inventario/registrarIngreso')}>
            <SidebarLink
              icon={HiOutlineArchiveBoxArrowDown}
              isActive={isActive('/inventario/registrarIngreso')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Registrar Ingreso'}
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/ventas')}>
            <SidebarLink
              icon={HiOutlineTag}
              isActive={isActive('/ventas')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Ventas'}
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/reportes')}>
            <SidebarLink
              icon={HiOutlineChartBar}
              isActive={isActive('/reportes')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Reportes'}
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/clientes')}>
            <SidebarLink
              icon={IoAccessibilityOutline}
              isActive={isActive('/clientes')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Clientes'}
            </SidebarLink>
          </li>

          <li onClick={() => navigate('/ayuda')}>
            <SidebarLink
              icon={HiOutlineQuestionMarkCircle}
              isActive={isActive('/ayuda')}
              isCollapsed={isCollapsed}
            >
              {!isCollapsed && 'Ayuda'}
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
            isCollapsed={isCollapsed}
          >
            {!isCollapsed && 'Mi perfil'}
          </SidebarLink>
        </div>
      </div>
    </aside>
  );
};