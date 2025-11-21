import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

export const FormField = (props) => {
  return (
    <div className="w-full">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input {...props} />
    </div>
  );
};