'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { normalizeOptions } from './selectVariants';

const GAP = 4;
const VIEWPORT_MARGIN = 8;
const MAX_HEIGHT = 224;

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
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const updatePosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - VIEWPORT_MARGIN;

    const openUp = spaceBelow < Math.min(MAX_HEIGHT, 160) && spaceAbove > spaceBelow;
    const maxHeight = Math.max(0, Math.min(MAX_HEIGHT, openUp ? spaceAbove : spaceBelow));

    setMenuStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      maxHeight,
      zIndex: 60,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + GAP }
        : { top: rect.bottom + GAP }),
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (
        containerRef.current?.contains(event.target) ||
        menuRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    }
    function handleKey(event) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  function handleSelect(option) {
    onChange?.({ target: { name, value: option.value } });
    setIsOpen(false);
  }

  const menu = (
    <ul
      ref={menuRef}
      role="listbox"
      style={menuStyle}
      className="overflow-y-auto scrollbar-thin rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/15 dark:bg-[#303746]"
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
  );

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={isRequired || undefined}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm outline-none transition-all',
          'bg-white border border-gray-100 shadow-sm text-gray-800',
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

      {mounted && isOpen && !disabled && menuStyle &&
        createPortal(menu, document.body)}
    </div>
  );
}