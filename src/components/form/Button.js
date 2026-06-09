import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  ...props 
}) {
  
  const baseStyles = "h-10 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors duration-200";
  
  const variants = {
    primary: "bg-[#103D85] hover:bg-[#0b2a5c] text-white border-[#103D85]",
    outline: "bg-white text-[#103D85] border-gray-200 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}