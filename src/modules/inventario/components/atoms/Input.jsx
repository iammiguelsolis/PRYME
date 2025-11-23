export const Input = ({ id, type = "text", placeholder, value, onChange, ...rest }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value || ''}
    onChange={onChange}
    className="w-full border border-neutral-03 rounded-lg px-3 py-2 text-text-02 focus:outline-none focus:ring-2 focus:ring-primary-01"
    {...rest}
  />
);