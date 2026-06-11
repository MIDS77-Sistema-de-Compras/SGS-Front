'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  contentClassName,
  maxWidth = 'max-w-[550px]',
  height = 'h-[500px]',
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);

      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    }

    setIsAnimating(false);

    const timer = setTimeout(() => setShouldRender(false), 200);
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out',
        isAnimating ? 'opacity-100' : 'opacity-0',
        className
      )}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          'bg-white text-gray-800 w-full rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ease-out',
          maxWidth,
          height,
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 id="modal-title" className="text-base font-semibold text-gray-700 mx-auto">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-200/60 hover:bg-gray-200 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div
          className={cn(
            'flex-1 overflow-y-auto p-6 text-sm leading-relaxed text-gray-600 space-y-4 text-justify',
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
