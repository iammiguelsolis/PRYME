import { HiMagnifyingGlass } from 'react-icons/hi2';

export const SearchInput = ({ value, onChange, placeholder = "Buscar en la ayuda..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <HiMagnifyingGlass className="h-5 w-5 text-neutral-02" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border-2 border-neutral-02 rounded-2xl text-text-02 placeholder:text-neutral-02 focus:outline-none focus:border-primary-01 focus:ring-2 focus:ring-primary-01/20 transition-all"
      />
    </div>
  );
};