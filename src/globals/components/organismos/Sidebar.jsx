import { useState } from 'react';
import PRYME from '../../../assets/PRYME_fondoBlanco.svg'

import { 
  HiOutlineHome, 
  HiOutlineArchiveBox, 
  HiOutlineTag, 
  HiOutlineChartBar 
} from 'react-icons/hi2';

import SidebarLink from '../moleculas/SidebarLink';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('inicio');

  return (
    <aside className="w-64 h-screen bg-neutral-01 p-4 flex flex-col shadow-lg">
      
      <div className="mb-2">
        <img src={PRYME} alt="PRYME" width={150} />
      </div>

      <hr className="border-text-02 border-2 mb-4" />

      
      <nav>
        <ul className="space-y-2">
          <li onClick={() => setActiveLink('inicio')}>
            <SidebarLink 
              href="#" 
              icon={HiOutlineHome} 
              isActive={activeLink === 'inicio'}
            >
              Inicio
            </SidebarLink>
          </li>

          <li onClick={() => setActiveLink('inventario')}>
            <SidebarLink 
              href="#" 
              icon={HiOutlineArchiveBox} 
              isActive={activeLink === 'inventario'}
            >
              Inventario
            </SidebarLink>
          </li>

          <li onClick={() => setActiveLink('ventas')}>
            <SidebarLink 
              href="#" 
              icon={HiOutlineTag} 
              isActive={activeLink === 'ventas'}
            >
              Ventas
            </SidebarLink>
          </li>

          <li onClick={() => setActiveLink('reportes')}>
            <SidebarLink 
              href="#" 
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

export default Sidebar;