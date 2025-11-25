import { Input } from "../atomos/Input";
import { Label } from "../atomos/Label";

export const FormField = (props) => {
  const { id, label, title, error, ...rest } = props;

  return (
    <div title={title || ""} className="flex flex-col gap-1 w-full">
      {label && (
        <Label htmlFor={id} className="text-xs text-[#0F172A]">
          {label}
        </Label>
      )}

      {/* Input ya sabe pintar el borde rojo si recibe error */}
      <Input id={id} error={!!error} {...rest} />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};
