import { ChevronDown } from 'lucide-react';

export const Select = ({ placeholder, options, value, onChange }) => (
  <div className="relative">
    <select 
      value={value} 
      onChange={onChange}
      className="w-full px-4 py-2.5 border border-[#E4E7EE] rounded-full text-sm text-[#0F172A] focus:outline-none focus:border-[#1B8EF2] appearance-none bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0F172A] pointer-events-none" />
  </div>
);
