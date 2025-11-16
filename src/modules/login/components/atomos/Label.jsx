export const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-text-03 mb-1"
    >
      {children}
    </label>
  );
};