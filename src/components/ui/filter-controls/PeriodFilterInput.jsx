'use client';

import { forwardRef, useId, useRef } from 'react';
import { cn } from '@/lib/cn';

const PeriodFilterInput = forwardRef(function PeriodFilterInput(
  {
    className,
    placeholder = 'Período',
    value,
    onChange,
    ...props
  },
  ref
) {
  const inputId = useId();
  const inputRef = useRef(null);

  function setRefs(node) {
    inputRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return placeholder;
    }

    const [year, month, day] = dateValue.split('-');
    return `${day}/${month}/${year}`;
  }

  function handleOpenPicker() {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  }

  return (
    <button
      type="button"
      onClick={handleOpenPicker}
      className={cn(
        'relative inline-flex h-9 w-[140px] cursor-pointer items-center justify-between rounded-2xl border border-[#D1D5DB] bg-white px-4 text-xs font-medium text-[#111827] transition-all duration-200 hover:border-[#103D85] focus-within:border-[#103D85] focus-within:ring-1 focus-within:ring-[#103D85]',
        className
      )}
    >
      <span>{formatDate(value)}</span>

      <input
        id={inputId}
        ref={setRefs}
        type="date"
        value={value}
        onChange={onChange}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        tabIndex={-1}
        {...props}
      />

      <svg
        className="h-4 w-4 text-[#9CA3AF]"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="5"
          width="12"
          height="11"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7 3.5V6.5M13 3.5V6.5M4.5 8.5H15.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
});

export default PeriodFilterInput;
