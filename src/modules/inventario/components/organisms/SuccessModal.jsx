import { Button } from "../../../../globals/components/atomos/Button";
import { HiCheckCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export const SuccessModal = ({
  title = "Ingreso Registrado con Éxito",
  isOpen,
  onClose,
  onRegisterAnother,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const isIngreso = title === "Ingreso Registrado con Éxito";

  // Botón principal (izquierda)
  const handlePrimary = () => {
    if (onRegisterAnother) {
      onRegisterAnother();   // la función ya decide qué hacer (limpiar o abrir modal)
    }
  };

  // Botón secundario (derecha)
  const handleSecondary = () => {
    if (isIngreso) {
      // Caso ingreso: volver a Inventario
      onClose();
      navigate("/inventario");
    } else {
      // Caso producto: solo cerrar el modal
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[380px] text-center animate-fadeIn">

        <HiCheckCircle className="w-24 h-24 text-primary-01 mx-auto mb-4" />

        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          {title}
        </h2>

        <div className="flex gap-4 justify-center">
          <Button
            size="medium"
            variant="white"
            onClick={handlePrimary}
          >
            {isIngreso ? "Registrar otro ingreso" : "Añadir otro producto"}
          </Button>

          <Button
            size="medium"
            variant="secondaryUNO"
            onClick={handleSecondary}
          >
            {isIngreso ? "Volver" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
