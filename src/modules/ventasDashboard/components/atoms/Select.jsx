import { ChevronDown } from 'lucide-react';

export const Select = ({ title='', label, options, value, onChange, disabled = false }) => (
  <div title={title} className="flex flex-col gap-1">
    {label && <label className="text-xs text-[#0F172A]">{label}</label>}
    <div className="relative">
      <select 
        title={options.find(opt => opt.value === value)?.label}
        value={value} 
        onChange={onChange} 
        disabled={disabled}
        className="w-full px-3 py-2 border border-[#E4E7EE] rounded text-sm text-[#0F172A] focus:outline-none focus:border-[#1B8EF2] appearance-none bg-white disabled:text-[#BEC2C9] rounded-2xl"
      >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F172A] pointer-events-none" />
    </div>
  </div>
);