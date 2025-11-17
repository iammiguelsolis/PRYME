import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PRYME from '../../../assets/PRYME_fondoBlanco.svg'

import { 
  HiOutlineHome, 
  HiOutlineArchiveBox, 
  HiOutlineTag, 
  HiOutlineChartBar 
} from 'react-icons/hi2';

import SidebarLink from '../moleculas/SidebarLink';

export const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('inicio');
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-neutral-01 p-4 flex flex-col shadow-lg">
      
      <div className="mb-2">
        <img src={PRYME} alt="PRYME" width={150} />
      </div>

      <hr className="border-text-02 border-2 mb-4" />

      <nav>
        <ul className="space-y-2">

          <li onClick={() => { setActiveLink('inicio'); navigate('/inicio'); }}>
            <SidebarLink
              icon={HiOutlineHome}
              isActive={activeLink === 'inicio'}
            >
              Inicio
            </SidebarLink>
          </li>

          <li onClick={() => { setActiveLink('inventario'); navigate('/inventario'); }}>
            <SidebarLink
              icon={HiOutlineArchiveBox}
              isActive={activeLink === 'inventario'}
            >
              Inventario
            </SidebarLink>
          </li>

          <li onClick={() => { setActiveLink('ventas'); navigate('/ventas'); }}>
            <SidebarLink
              icon={HiOutlineTag}
              isActive={activeLink === 'ventas'}
            >
              Ventas
            </SidebarLink>
          </li>

          <li onClick={() => { setActiveLink('reportes'); navigate('/reportes'); }}>
            <SidebarLink
              icon={HiOutlineChartBar}
              isActive={activeLink === 'reportes'}
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
