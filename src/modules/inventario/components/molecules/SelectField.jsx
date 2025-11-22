import { Label } from "../atoms/Label";
import { Select } from "../atoms/Select";

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