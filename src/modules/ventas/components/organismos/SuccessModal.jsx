import { HiCheckCircle } from 'react-icons/hi2';
import { Modal } from '../moleculas/Modal';
import { Button } from '../../../../globals/components/atomos/Button';

export const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title,
  message, // <-- Agregado
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center text-center">
        <HiCheckCircle className="w-24 h-24 text-primary-01" />
        
        <h2 className="text-2xl font-bold text-text-01 mt-4 mb-2">
          {title}
        </h2>

        {message && (
          <p className="text-gray-500 mb-6">{message}</p>
        )}
        
        <div className="flex space-x-4 mt-4">
          <Button size="medium" variant="complementary" onClick={onPrimaryAction}>
            {primaryActionText}
          </Button>
          <Button size="medium" variant="complementary" onClick={onSecondaryAction}>
            {secondaryActionText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};