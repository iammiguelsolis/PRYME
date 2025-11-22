// src/modules/reportes/components/moleculas/MetricRow.jsx
export const MetricRow = ({ fecha, sucursal, total, productos, devoluciones }) => {
  return (
    <tr className="border-b last:border-b-0 border-neutral-03">
      <td className="px-4 py-2 text-xs text-text-02">{fecha}</td>
      <td className="px-4 py-2 text-xs text-text-02">{sucursal}</td>
      <td className="px-4 py-2 text-xs font-semibold text-text-01">{total}</td>
      <td className="px-4 py-2 text-xs text-center text-text-02">{productos}</td>
      <td className="px-4 py-2 text-xs text-center">
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-medium ${
            devoluciones === "Sí"
              ? "bg-state-03/10 text-state-03"
              : "bg-state-01/10 text-state-01"
          }`}
        >
          {devoluciones}
        </span>
      </td>
    </tr>
  );
};
