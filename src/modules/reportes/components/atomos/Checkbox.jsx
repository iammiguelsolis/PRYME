import React from "react";

export const Checkbox = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none text-text-02">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-primary-01 cursor-pointer"
      />
      {label}
    </label>
  );
};
