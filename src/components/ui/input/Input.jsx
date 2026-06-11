'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { getInputClassName } from './inputVariants';

const Input = forwardRef(function Input(
  {
    type = 'text',
    variant = 'auth',
    iconSrc,
    iconAlt = 'Ícone',
    error,
    className,
    ...props
  },
  ref
) {
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
      <input
        ref={ref}
        type={type}
        aria-invalid={error ? true : undefined}
        className={getInputClassName({ variant, iconSrc, error, hasRightSlot: false, className })}
        {...props}
      />
    </div>
  );
});

export { Input };
export default Input;
