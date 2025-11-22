export const Input = ({ label, placeholder, value, onChange, disabled = false }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs text-[#0F172A]">{label}</label>}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="px-3 py-2 border border-[#E4E7EE] rounded text-sm text-[#0F172A] placeholder:text-[#BEC2C9] focus:outline-none focus:border-[#1B8EF2] disabled:bg-white disabled:text-[#0F172A] rounded-2xl"
    />
  </div>
);