'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/cn';

const GAP = 4;
const VIEWPORT_MARGIN = 8;
const PANEL_WIDTH = 296;

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function parseIsoDate(value) {
  if (!value || typeof value !== 'string') return null;

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatBrDate(value) {
  const date = parseIsoDate(value);
  if (!date) return '';
  return date.toLocaleDateString('pt-BR');
}

function isSameDay(a, b) {
  return (
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function DatePicker({
  name,
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
  disabled = false,
  isRequired = false,
  error,
  className,
  buttonClassName,
}) {
  const selectedDate = parseIsoDate(value);

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) setViewDate(parseIsoDate(value) || new Date());
  }, [isOpen, value]);

  const updatePosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const panelWidth = Math.min(PANEL_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
    const panelHeight = 360;

    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - VIEWPORT_MARGIN;
    const openUp = spaceBelow < panelHeight && spaceAbove > spaceBelow;

    const left = Math.max(
      VIEWPORT_MARGIN,
      Math.min(rect.left, window.innerWidth - panelWidth - VIEWPORT_MARGIN)
    );

    setMenuStyle({
      position: 'fixed',
      left,
      width: panelWidth,
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

  function emitChange(newValue) {
    onChange?.({ target: { name, value: newValue } });
  }

  function handleDayClick(date) {
    emitChange(toIsoDate(date));
    setIsOpen(false);
  }

  function handleClear(event) {
    event.stopPropagation();
    emitChange('');
    setIsOpen(false);
  }

  function handleToday() {
    const today = new Date();
    setViewDate(today);
    emitChange(toIsoDate(today));
    setIsOpen(false);
  }

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();

  function getDaysInMonth() {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, prevMonthTotalDays - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  }

  const panel = (
    <div
      ref={menuRef}
      role="dialog"
      aria-label="Calendário"
      style={menuStyle}
      className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-white/15 dark:bg-[#303746]"
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-sm font-semibold text-gray-800 dark:text-[#E2E2EA]">
          {MONTH_NAMES[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            aria-label="Mês anterior"
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-[#103D85]/10 hover:text-[#103D85] dark:text-[#C3C6D3] dark:hover:bg-white/10 dark:hover:text-[#5D8EF7]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            aria-label="Próximo mês"
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-[#103D85]/10 hover:text-[#103D85] dark:text-[#C3C6D3] dark:hover:bg-white/10 dark:hover:text-[#5D8EF7]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="flex h-8 items-center justify-center text-[11px] font-semibold uppercase text-gray-400 dark:text-[#8A8FA3]"
          >
            {label}
          </span>
        ))}

        {getDaysInMonth().map(({ date, isCurrentMonth }) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleDayClick(date)}
              className={cn(
                'flex h-8 w-full items-center justify-center rounded-lg text-[13px] transition-colors',
                isCurrentMonth
                  ? 'text-gray-700 dark:text-[#E2E2EA]'
                  : 'text-gray-300 dark:text-white/25',
                !isSelected && 'hover:bg-[#103D85]/10 dark:hover:bg-white/10',
                isToday && !isSelected &&
                  'font-semibold text-[#103D85] ring-1 ring-inset ring-[#103D85]/40 dark:text-[#5D8EF7] dark:ring-[#5D8EF7]/40',
                isSelected &&
                  'bg-[#103D85] font-semibold text-white hover:bg-[#0c2f66] dark:bg-[#1A4A9E] dark:hover:bg-[#2456b0]'
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 dark:border-white/10">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-[#C3C6D3] dark:hover:bg-white/10 dark:hover:text-[#E2E2EA]"
        >
          Limpar
        </button>
        <button
          type="button"
          onClick={handleToday}
          className="rounded-lg px-2 py-1 text-xs font-semibold text-[#103D85] transition-colors hover:bg-[#103D85]/10 dark:text-[#5D8EF7] dark:hover:bg-white/10"
        >
          Hoje
        </button>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-required={isRequired || undefined}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-base sm:text-sm outline-none transition-all',
          'bg-white border border-gray-100 shadow-sm text-gray-800',
          'focus:border-[#103D85] focus:ring-0.5 focus:ring-[#103D85]',
          'dark:bg-[#303746] dark:border-white/15 dark:text-[#E2E2EA]',
          'dark:focus:border-[#1A4A9E] dark:focus:ring-[#1A4A9E]',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          error && 'border-[#BA1A1A] focus:border-[#BA1A1A]',
          buttonClassName
        )}
      >
        <span className={cn('truncate', !value && 'text-gray-400 dark:text-[#8A8FA3]')}>
          {value ? formatBrDate(value) : placeholder}
        </span>
        <span className="flex shrink-0 items-center gap-1">
          {value && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Limpar data"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') handleClear(event);
              }}
              className="rounded p-0.5 opacity-40 transition-opacity hover:opacity-80"
            >
              <X size={14} />
            </span>
          )}
          <CalendarIcon size={16} className="opacity-40" />
        </span>
      </button>

      {mounted && isOpen && !disabled && menuStyle &&
        createPortal(panel, document.body)}
    </div>
  );
}