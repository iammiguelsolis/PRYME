import { Label } from "../atomos/Label";
import { Select } from "../atomos/Select";

export const SelectField = ({ id, label, children, ...props }) => {
  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <Select id={id} {...props}>
        {children}
      </Select>
    </div>
  );
};