'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { getInputClassName } from './inputVariants';

const PhoneInput = forwardRef(function PhoneInput(
  { placeholder, value, onChange, className, error, ...rest },
  ref
) {
  return (
    <div
      className={cn(
        'flex rounded-xl border border-gray-200 shadow-sm overflow-hidden',
        'focus-within:border-[#103D85] focus-within:ring-0.5 focus-within:ring-[#103D85]',
        error && 'border-[#EA4335] focus-within:border-[#EA4335] focus-within:ring-[#EA4335]',
        className
      )}
    >
      <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-200 text-gray-400 text-sm shrink-0">
        <Image
          src="/images/adm/telefone.png"
          alt="Ícone de telefone"
          width={16}
          height={16}
          className="w-auto h-auto"
        />
      </div>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        className={getInputClassName({
          variant: 'form',
          error,
          hasRightSlot: false,
          className: 'flex-1 min-w-0 border-0 shadow-none ring-0 focus:ring-0 focus:border-0 rounded-none',
        })}
        {...rest}
      />
    </div>
  );
});

export default PhoneInput;
