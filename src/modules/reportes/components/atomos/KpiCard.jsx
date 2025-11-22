// src/modules/reportes/components/atomos/KpiCard.jsx
export const KpiCard = ({ icon: Icon, title, value, change }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-neutral-01 rounded-2xl shadow-md px-6 py-4 flex flex-col gap-1 border border-neutral-03">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-text-02 flex items-center gap-2">
          <span className="inline-flex h-7 w-7 rounded-full bg-secondary-01/10 text-secondary-01 items-center justify-center">
            <Icon className="w-4 h-4" />
          </span>
          {title}
        </p>
      </div>

      <p className="text-2xl font-bold text-text-01 mt-1">{value}</p>

      <p
        className={`text-xs font-semibold mt-1 ${
          isPositive ? "text-state-01" : "text-state-03"
        }`}
      >
        {isPositive ? "+" : ""}
        {change}%
      </p>
    </div>
  );
};
