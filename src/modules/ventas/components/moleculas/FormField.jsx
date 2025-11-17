import { Input } from "../atomos/Input";
import { Label } from "../atomos/Label";

export const FormField = (props) => {
  return (
    <div className="w-full">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input {...props} />
    </div>
  );
};