'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

export const additionalInfoStatusOptions = {
  ajustes: {
    label: 'Ajustes do solicitante',
    className: 'bg-[#F59E0B] hover:bg-[#D97706]',
  },
  entregue: {
    label: 'Entregue',
    className: 'bg-[#22C55E] hover:bg-[#16A34A]',
  },
  atrasada: {
    label: 'Atrasada',
    className: 'bg-[#EF4444] hover:bg-[#DC2626]',
  },
  cancelado: {
    label: 'Pedido cancelado',
    className: 'bg-[#6B7280] hover:bg-[#4B5563]',
  },
  parcial: {
    label: 'Recebimento parcial',
    className: 'bg-[#F97316] hover:bg-[#EA580C]',
  },
  atendimento: {
    label: 'Em atendimento',
    className: 'bg-[#06B6D4] hover:bg-[#0891B2]',
  },
};

const AdditionalInfoButton = forwardRef(function AdditionalInfoButton(
  {
    status = 'ajustes',
    children,
    options = additionalInfoStatusOptions,
    onStatusChange,
    type = 'button',
    className,
    ...props
  },
  ref
) {
  const currentStatus = options[status] ?? options.ajustes;
  const label = children ?? currentStatus.label;
  const baseClasses =
    'inline-flex w-[210px] items-center justify-center rounded-2xl px-4 py-2 text-center font-medium leading-none text-white transition-all duration-200';

  if (onStatusChange) {
    return (
      <select
        ref={ref}
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className={cn(
          baseClasses,
          'cursor-pointer appearance-none border-0 text-center outline-none',
          currentStatus.className,
          className
        )}
        {...props}
      >
        {Object.entries(options).map(([value, option]) => (
          <option key={value} value={value} className="bg-white text-[#103D85]">
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        baseClasses,
        currentStatus.className,
        className
      )}
      {...props}
    >
      {label}
    </button>
  );
});

export default AdditionalInfoButton;
