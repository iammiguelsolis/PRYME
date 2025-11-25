export const Input = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,         // 👈 nuevo prop
  className = "",
  ...rest
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value || ""}
    onChange={onChange}
    className={`
      w-full rounded-lg px-3 py-2 text-text-02 focus:outline-none 
      focus:ring-2 
      ${error 
        ? "border-red-500 focus:ring-red-500" 
        : "border-neutral-03 focus:ring-primary-01"}
      ${className}
    `}
    {...rest}
  />
);
