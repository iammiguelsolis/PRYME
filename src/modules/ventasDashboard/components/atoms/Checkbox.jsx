import { Check } from 'lucide-react';

export const Checkbox = ({ checked, onChange }) => (
  <div 
    onClick={onChange} 
    className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center ${checked ? 'bg-[#1B8EF2] border-[#1B8EF2]' : 'border-[#1B8EF2] bg-white'}`}
  >
    {checked && <Check size={14} className="text-white" />}
  </div>
);