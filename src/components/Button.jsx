import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg
        ${bgColor}
        ${textColor}
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}
        transition duration-200 ease-in-out
        font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
