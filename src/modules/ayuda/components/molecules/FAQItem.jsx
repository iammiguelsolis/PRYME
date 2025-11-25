import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-02 rounded-xl overflow-hidden bg-neutral-01 transition-all hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-neutral-03/50 transition-colors"
      >
        <span className="font-semibold text-text-01 pr-4">{question}</span>
        {isOpen ? (
          <HiChevronUp className="w-5 h-5 text-primary-01 flex-shrink-0" />
        ) : (
          <HiChevronDown className="w-5 h-5 text-primary-01 flex-shrink-0" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4 pt-2 text-text-02 leading-relaxed border-t border-neutral-03">
          {answer}
        </div>
      )}
    </div>
  );
};