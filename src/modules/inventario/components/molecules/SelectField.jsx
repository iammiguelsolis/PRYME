import { Label } from "../atoms/Label";
import { Select } from "../atoms/Select";

export const SelectField = ({ id, label, error, children, ...props }) => {
  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} error={!!error} {...props}>
        {children}
      </Select>
      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
