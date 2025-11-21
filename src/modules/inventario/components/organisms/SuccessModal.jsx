import { Button } from "../../../../globals/components/atomos/Button";
import { HiCheckCircle } from "react-icons/hi2";

export const SuccessModal = ({ isOpen, onClose, onRegisterAnother }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[380px] text-center animate-fadeIn">

        {/* Icon */}
        <HiCheckCircle className="w-24 h-24 text-primary-01 mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          Ingreso Registrado con Éxito
        </h2>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            size="medium"
            variant="white"
            onClick={onRegisterAnother}
          >
            Registrar otro Ingreso
          </Button>

          <Button
            size="medium"
            variant="secondaryUNO"
            onClick={onClose}
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};
