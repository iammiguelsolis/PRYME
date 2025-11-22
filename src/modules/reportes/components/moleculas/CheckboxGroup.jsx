// src/modules/reportes/components/moleculas/CheckboxGroup.jsx
import { Checkbox } from "../atomos/Checkbox";

export const CheckboxGroup = ({ title, options, values, onToggle }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-text-01">{title}</p>
      <div className="space-y-1">
        {options.map((opt) => (
          <Checkbox
            key={opt}
            id={opt}
            label={opt}
            checked={values.includes(opt)}
            onChange={() => onToggle(opt)}
          />
        ))}
      </div>
    </div>
  );
};
