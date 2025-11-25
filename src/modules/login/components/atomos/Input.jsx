export const Input = ({ type = 'text', id, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      className="w-full px-3 py-2 border border-neutral-02 rounded-2xl rounded-3xl shadow-sm text-text-02 bg-neutral-01 focus:bg-neutral-01 focus:outline-none"
      onChange={onChange}
    />
  );
};