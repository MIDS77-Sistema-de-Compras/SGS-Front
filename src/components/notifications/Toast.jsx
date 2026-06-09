// src/components/notifications/Toast.jsx
'use client';

import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles = {
    success: {
      bgColor: 'bg-[#E6FDF0]', 
      borderColor: 'border-[#34A853]', 
      iconColor: 'text-[#34A853]',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    error: {
      bgColor: 'bg-[#FCE8E6]', 
      borderColor: 'border-[#EA4335]', 
      iconColor: 'text-[#EA4335]',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className={`flex items-center justify-between w-full max-w-md p-4 rounded-r-md border-l-[6px] shadow-lg transition-all duration-300 animate-slide-in ${currentStyle.bgColor} ${currentStyle.borderColor}`}>
      
      <div className="flex items-center gap-3">
        <span className={currentStyle.iconColor}>
          {currentStyle.icon}
        </span>
        <p className="text-sm font-medium text-[#202124]">
          {message}
        </p>
      </div>

      <button 
        onClick={onClose} 
        className="text-[#1A1A1A] hover:opacity-70 transition-opacity p-1"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}