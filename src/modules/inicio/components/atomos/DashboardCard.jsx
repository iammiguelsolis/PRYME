export const DashboardCard = ({ children, className = "" }) => {
  return (
    <div 
      className={`bg-neutral-01 rounded-2xl shadow-md p-4 flex flex-col h-full ${className}`}
    >
      {children}
    </div>  
  );
};