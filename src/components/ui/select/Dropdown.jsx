'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { normalizeOptions } from './selectVariants';

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
  className,
  buttonClassName,
}) {
  const normalized = normalizeOptions(options);
  const selected = normalized.find((o) => String(o.value) === String(value ?? ''));

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-3 text-sm text-gray-700 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85]',
          'dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:focus:border-[#1A4A9E]',
          buttonClassName
        )}
      >
        <span className={cn(!selected && 'text-gray-400 dark:text-[#C3C6D3]')}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'text-gray-500 transition-transform dark:text-[#C3C6D3]',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full min-w-max overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-white/15 dark:bg-[#303746]"
        >
          {normalized.map((option) => {
            const isSelected = String(option.value) === String(value ?? '');
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 px-4 py-2 text-left text-sm transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-white/5',
                    isSelected
                      ? 'bg-[#103D85]/10 font-medium text-[#103D85] dark:bg-[#1A4A9E]/25 dark:text-[#5D8EF7]'
                      : 'text-gray-700 dark:text-[#E2E2EA]'
                  )}
                >
                  {option.label}
                  {isSelected && <Check size={14} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}