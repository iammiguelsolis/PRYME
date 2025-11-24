import { Tooltip } from "recharts";

const SidebarLink = ({ children, icon, isActive = false, onClick }) => {
  const IconComponent = icon;

  const baseClasses =
    "flex items-center w-full px-4 py-3 rounded-lg text-md font-medium transition-colors duration-200 cursor-pointer";

  const activeClasses = isActive
    ? "bg-neutral-03 text-primary-01"
    : "text-text-02 hover:bg-neutral-03/60";

  return (
    <div title={`${children}`} onClick={onClick} className={`${baseClasses} ${activeClasses}` }>
      <IconComponent className="w-6 h-6 mr-3" />
      <span>{children}</span>
    </div>
  );
};

export default SidebarLink;
