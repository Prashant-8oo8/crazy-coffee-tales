import React, { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 font-medium text-sm text-gray-300 select-none"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg
          bg-gray-800 text-white
          border border-gray-700
          outline-none
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          w-full
          duration-200
          ${className}`}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-gray-900 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
