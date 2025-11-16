const SidebarLink = ({ children, icon, href = "#", isActive = false }) => {
  // El prop 'icon' será un componente que pasaremos, ej: <HiOutlineHome />
  const IconComponent = icon;

  // Clases base para todos los enlaces
  const baseClasses = "flex items-center w-full px-4 py-3 rounded-lg text-md font-medium transition-colors duration-200";

  // Clases condicionales que cambian según 'isActive'
  const activeClasses = isActive 
    ? "bg-neutral-03 text-primary-01"  // Estilo activo: fondo gris, texto azul
    : "text-text-02 hover:bg-neutral-03/60"; // Estilo inactivo: texto gris, hover sutil

  return (
    <a href={href} className={`${baseClasses} ${activeClasses}`}>
      {/* El color del icono se hereda del 'text-primary-01' o 'text-text-02' */}
      <IconComponent className="w-6 h-6 mr-3" />
      <span>{children}</span>
    </a>
  );
};

export default SidebarLink;