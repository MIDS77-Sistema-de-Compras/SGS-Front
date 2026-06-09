import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled,
  ...props
}) {

  const baseStyles = "h-10 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#103D85] hover:bg-[#0b2a5c] text-white border-[#103D85] disabled:hover:bg-[#103D85]",
    outline: "bg-white text-[#103D85] border-gray-200 hover:bg-gray-100 disabled:hover:bg-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}