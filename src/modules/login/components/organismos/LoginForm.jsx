import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../globals/components/atomos/Button";
import { FormField } from "../moleculas/FormField";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employeeId == 'a' && password == 'a') {
      navigate("/inicio");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-400/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Credenciales Incorrectas
            </h3>
            <p className="text-gray-700 mb-6">
              El ID de trabajador o la contraseña son incorrectos. Por favor, intenta nuevamente.
            </p>
            <Button
              size="small"
              variant="complementary"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

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
    </>
  );
};