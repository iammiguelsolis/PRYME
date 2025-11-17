import { HiCheckCircle } from 'react-icons/hi2';
import { Modal } from '../moleculas/Modal';
import { Button } from '../../../../globals/components/atomos/Button';

export const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title, 
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-center">
        {/* Icono de Éxito */}
        <HiCheckCircle className="w-24 h-24 text-primary-01" />
        
        {/* Título */}
        <h2 className="text-2xl font-bold text-text-01 mt-4 mb-8">
          {title}
        </h2>
        
        {/* Botones de Acción */}
        <div className="flex space-x-4">
          <Button 
            size="medium" variant="complementary"
            onClick={onPrimaryAction}
          >
            {primaryActionText}
          </Button>
          <Button 
            size="medium" variant="complementary"
            onClick={onSecondaryAction}
          >
            {secondaryActionText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};