export const Select = ({ id, value, onChange, children, ...rest }) => (
  <select
    id={id}
    value={value || ''}
    onChange={onChange}
    className="w-full border border-neutral-03 rounded-lg px-3 py-2 text-text-02 focus:outline-none focus:ring-2 focus:ring-primary-01 bg-white"
    {...rest}
  >
    {children}
  </select>
);