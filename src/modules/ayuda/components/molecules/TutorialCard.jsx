import { CategoryIcon } from '../atoms/CategoryIcon';
import { HiArrowRight } from 'react-icons/hi2';

export const TutorialCard = ({ icon, title, description, steps, color, onOpen }) => {
  return (
    <div className="bg-neutral-01 border border-neutral-02 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
         onClick={onOpen}>
      <div className="flex items-start gap-4 mb-4">
        <CategoryIcon icon={icon} color={color} />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-01 mb-1 group-hover:text-primary-01 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-02">{description}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-text-02">
            <span className="w-6 h-6 rounded-full bg-primary-01/10 text-primary-01 flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {index + 1}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-primary-01 font-semibold text-sm group-hover:gap-3 transition-all">
        Ver tutorial completo
        <HiArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};