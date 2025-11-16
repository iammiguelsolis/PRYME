
import { Button } from "../../../../globals/components/atomos/Button";
import { FormField } from "../moleculas/FormField";

export const LoginForm = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-8 md:p-12">
      <h2 className="text-4xl font-bold text-text-03 mb-8 text-center">
        ¡Bienvenido!
      </h2>
      <form className="flex gap-2 flex-col">
        <FormField
          label="ID de Trabajador"
          type="text"
          id="employee-id"
          name="employee-id"
        />
        <FormField
          label="Contraseña"
          type="password"
          id="password"
          name="password"
        />
        <div className="mt-8 flex items-center justify-center">
          <Button size="medium" variant="complementary" >
            Iniciar Sesión
          </Button>
        </div>
      </form>
    </div>
  );
};