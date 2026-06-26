'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export const statusFilterOptions = [
  { value: 'ajustes', label: 'Ajustes do solicitante' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'atrasada', label: 'Atrasada' },
  { value: 'cancelado', label: 'Pedido cancelado' },
  { value: 'parcial', label: 'Recebimento parcial' },
  { value: 'atendimento', label: 'Em atendimento' },
];

const StatusFilterSelect = forwardRef(function StatusFilterSelect(
  {
    options = statusFilterOptions,
    placeholder = 'Status',
    className,
    ...props
  },
  ref
) {
  return (
    <div className="relative inline-flex w-[140px] items-center">
      <select
        ref={ref}
        className={cn(
          'h-9 w-full appearance-none rounded-2xl border border-[#D1D5DB] bg-white px-4 pr-10 text-xs font-medium text-[#111827] outline-none transition-all duration-200 hover:border-[#103D85] focus:border-[#103D85] focus:ring-1 focus:ring-[#103D85]',
          className
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute right-4 h-4 w-4 text-[#6B7280]"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});

export default StatusFilterSelect;
