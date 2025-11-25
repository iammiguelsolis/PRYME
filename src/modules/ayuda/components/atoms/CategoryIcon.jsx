
export const CategoryIcon = ({ icon: Icon, color = "bg-primary-01" }) => {
  return (
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-sm`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  );
};