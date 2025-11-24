export const InfoRow = ({ icon: Icon, label, value, iconBg = 'bg-[#1B8EF2]' }) => (
  <div className="flex items-start gap-3">
    <div className={`w-7 h-7 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={14} className="text-white" />
    </div>
    <div className="leading-tight">
      <p className="text-xs text-[#BEC2C9]">{label}</p>
      <p className="text-sm text-[#0F172A] font-medium">{value}</p>
    </div>
  </div>
);