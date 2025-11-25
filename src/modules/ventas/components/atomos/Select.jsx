import { HiChevronDown } from 'react-icons/hi2';

export const Select = ({
  title = '',
  id,
  name,
  value,
  onChange,
  children,
  error = false,        // 👈 nuevo prop
  disabled = false,     // 👈 opcional
  className = '',       // 👈 opcional por si quieres extender estilos
}) => {
  return (
    <div title={title} className="relative w-full">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full appearance-none px-3 py-2 rounded-2xl shadow-sm 
          focus:outline-none focus:ring-2 text-text-02 
          ${error
            ? 'border border-red-500 focus:ring-red-500'
            : 'border border-neutral-02 focus:ring-primary-01'}
          ${className}
        `}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-02">
        <HiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};
