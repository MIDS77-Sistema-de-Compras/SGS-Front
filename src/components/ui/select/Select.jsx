'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { getSelectClassName, normalizeOptions } from './selectVariants';

const Select = forwardRef(function Select(
  {
    name,
    options = [],
    placeholder,
    label,
    required,
    isRequired,
    variant = 'form',
    iconSrc,
    iconAlt = 'Ícone',
    error,
    className,
    ...props
  },
  ref
) {
  const normalizedOptions = normalizeOptions(options);
  const placeholderText = placeholder ?? label ?? 'Selecione...';
  const isFieldRequired = required ?? isRequired;

  return (
    <div className="relative flex items-center w-full">
      {iconSrc && (
        <div className="absolute left-4 pointer-events-none z-10">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={24}
            height={24}
            className="opacity-60"
          />
        </div>
      )}

      <select
        ref={ref}
        name={name}
        required={isFieldRequired}
        aria-invalid={error ? true : undefined}
        className={getSelectClassName({ variant, iconSrc, error, className })}
        {...props}
      >
        <option value="" disabled hidden>
          {placeholderText}
        </option>
        {normalizedOptions.length === 0 ? (
          <option value="" disabled>
            Nenhuma opção disponível
          </option>
        ) : (
          normalizedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>

      <div className="absolute right-4 pointer-events-none opacity-40" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-600 dark:text-[#E2E2EA]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  );
});

export { Select };
export default Select;
