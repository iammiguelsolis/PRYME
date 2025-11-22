import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../globals/components/atomos/Button";
import { FormField } from "../moleculas/FormField";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

      navigate("/inicio");
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8 md:p-12">
      <h2 className="text-4xl font-bold text-text-03 mb-8 text-center">
        ¡Bienvenido!
      </h2>

      <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
        <FormField
          label="ID de Trabajador"
          type="text"
          id="employee-id"
          name="employee-id"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <FormField
          label="Contraseña"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-8 flex items-center justify-center">
          <Button size="medium" variant="complementary" type="submit">
            Iniciar Sesión
          </Button>
        </div>
      </form>
    </div>
  );
};
