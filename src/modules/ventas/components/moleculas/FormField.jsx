// ../moleculas/FormField.jsx
import { Input } from "../atomos/Input";
import { Label } from "../atomos/Label";

export const FormField = (props) => {
  const { id, label, title, ...rest } = props;

  return (
    <div title={title || ""} className="flex flex-col gap-1 w-full">
      {label && (
        <Label htmlFor={id} className="text-xs text-[#0F172A]">
          {label}
        </Label>
      )}
      <Input id={id} {...rest} />
    </div>
  );
};
