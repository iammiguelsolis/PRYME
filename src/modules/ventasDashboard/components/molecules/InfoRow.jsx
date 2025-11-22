export const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-1">

    {/* ICONO — Estilo mejorado */}
    <div className="w-8 h-8 rounded-full border border-primary-02 bg-white 
                    flex items-center justify-center shadow-sm flex-shrink-0">
      <Icon size={18} className="text-primary-02" />
    </div>

    {/* TEXTOS */}
    <div className="leading-tight">
      <p className="text-sm font-semibold text-[#0F172A]">{value}</p>
      <p className="text-xs text-[#BEC2C9]">{label}</p>
    </div>

  </div>
);
