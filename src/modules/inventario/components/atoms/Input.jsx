export const Input = ({ type = 'text', id, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-neutral-02 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-01 text-text-02"
    />
  );
};