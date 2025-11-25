export const Select = ({
  id,
  value,
  onChange,
  children,
  error = false,    // 👈 nuevo
  className = '',   // 👈 opcional
  ...rest
}) => (
  <select
    id={id}
    value={value || ''}
    onChange={onChange}
    className={`
      w-full rounded-lg px-3 py-2 text-text-02 bg-white
      focus:outline-none focus:ring-2
      ${error
        ? 'border border-red-500 focus:ring-red-500'
        : 'border border-neutral-03 focus:ring-primary-01'}
      ${className}
    `}
    {...rest}
  >
    {children}
  </select>
);
