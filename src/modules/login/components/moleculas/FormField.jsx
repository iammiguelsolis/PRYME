import { Input } from "../atomos/Input";
import { Label } from "../atomos/Label";

export const FormField = ({ label, type, id, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};