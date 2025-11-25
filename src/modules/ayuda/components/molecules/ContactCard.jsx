import { CategoryIcon } from '../atoms/CategoryIcon';
import { Button } from '../../../../globals/components/atomos/Button';

export const ContactCard = ({ icon, title, description, buttonText, buttonAction, color = "bg-primary-01" }) => {
  return (
    <div className="bg-neutral-01 border border-neutral-02 rounded-2xl p-6 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <CategoryIcon icon={icon} color={color} />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-01 mb-2">{title}</h3>
          <p className="text-sm text-text-02 mb-4">{description}</p>
          <Button
            size="small"
            variant="secondaryUNO"
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};