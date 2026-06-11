'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const variantStyles = {
  primary: 'bg-[#103D85] hover:bg-[#0b2a5c] text-white border-[#103D85]',
  outline: 'bg-white text-[#103D85] border-gray-200 hover:bg-gray-100',
  auth: 'bg-[#5D8EF7] hover:bg-[#4B84F4] text-white border-[#5D8EF7] shadow-md active:scale-[0.98]',
};

const sizeStyles = {
  sm: 'h-10 px-4 text-xs font-bold',
  md: 'h-11 px-4 text-sm font-semibold',
  lg: 'h-14 px-4 text-base font-semibold',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'sm',
    type = 'button',
    fullWidth = false,
    isLoading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'rounded-xl border flex items-center justify-center gap-2 shadow-sm transition-all duration-200',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        isLoading && 'opacity-70 cursor-wait',
        disabled && !isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
});

export default Button;
