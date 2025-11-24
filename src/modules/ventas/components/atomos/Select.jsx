import { HiChevronDown } from 'react-icons/hi2';

export const Select = ({ title='', id, name, value, onChange, children }) => {
  return (
    <div title={title} className="relative w-full">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none px-3 py-2 border border-neutral-02 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-01 text-text-02"
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-02">
        <HiChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};