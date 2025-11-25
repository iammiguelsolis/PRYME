import { ChevronDown } from 'lucide-react';

export const Select = ({ title='', placeholder, options, value, onChange }) => (
  <div title={title} className="relative">
    {title && <label className="text-s text-neutral-01 ml-1">{title}</label>}
    <div className='relative'>
      <select 
        value={value} 
        onChange={onChange}
        className="w-full px-3 py-2 border border-[#E4E7EE] rounded text-sm text-[#0F172A] focus:outline-none focus:border-[#1B8EF2] appearance-none bg-white disabled:text-[#BEC2C9] rounded-2xl"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F172A] pointer-events-none" />
    </div>
  </div>
);
