const SidebarLink = ({ children, icon, isActive = false, onClick, isCollapsed = false }) => {
  const IconComponent = icon;

  const baseClasses =
    "flex items-center w-full px-4 py-3 rounded-lg text-md font-medium transition-colors duration-200 cursor-pointer";

  const activeClasses = isActive
    ? "bg-neutral-03 text-primary-01"
    : "text-text-02 hover:bg-neutral-03/60";

  return (
    <div 
      title={isCollapsed ? (children === "Inventario" ? "Inventario (Productos e Ingresos)" : children) : ""} 
      onClick={onClick} 
      className={`${baseClasses} ${activeClasses} ${isCollapsed ? 'justify-center px-2' : ''}`}
    >
      <IconComponent className={`${isCollapsed ? 'w-7 h-7' : 'w-6 h-6'} ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
      {!isCollapsed && <span>{children}</span>}
    </div>
  );
};

export default SidebarLink;