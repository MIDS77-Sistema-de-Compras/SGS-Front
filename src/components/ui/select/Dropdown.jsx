'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { normalizeOptions } from './selectVariants';

export default function Dropdown({
  name,
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
  disabled = false,
  isRequired = false,
  error,
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

  function handleSelect(option) {
    onChange?.({ target: { name, value: option.value } });
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={isRequired || undefined}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-all',
          'bg-white border border-gray-200 shadow-sm text-gray-800',
          'focus:border-[#103D85] focus:ring-0.5 focus:ring-[#103D85]',
          'dark:bg-[#303746] dark:border-white/15 dark:text-[#E2E2EA]',
          'dark:focus:border-[#1A4A9E] dark:focus:ring-[#1A4A9E]',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          error && 'border-[#BA1A1A] focus:border-[#BA1A1A]',
          buttonClassName
        )}
      >
        <span className={cn('truncate', !selected && 'text-gray-400 dark:text-[#8A8FA3]')}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 opacity-40 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && !disabled && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-20 mt-1 max-h-56 w-full overflow-y-auto scrollbar-thin rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/15 dark:bg-[#303746]"
        >
          {normalized.length === 0 ? (
            <li className="px-4 py-2.5 text-sm text-gray-400 dark:text-[#8A8FA3]">
              Nenhuma opção encontrada
            </li>
          ) : (
            normalized.map((option) => {
              const isSelected = String(option.value) === String(value ?? '');
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm cursor-pointer',
                      'text-gray-800 hover:bg-[#103D85]/10 dark:text-[#E2E2EA] dark:hover:bg-white/10',
                      isSelected && 'font-semibold'
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <Check size={14} className="shrink-0" />}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}