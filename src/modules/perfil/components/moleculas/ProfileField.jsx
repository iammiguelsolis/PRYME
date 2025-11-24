const ProfileField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-text-01">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full px-3 py-2 
          rounded-xl 
          border border-neutral-02 
          bg-white 
          text-sm text-text-01
          focus:outline-none 
          focus:ring-2 focus:ring-primary-01 
          focus:border-transparent
        "
      />
    </div>
  );
};

export default ProfileField;
