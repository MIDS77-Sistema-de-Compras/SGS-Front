'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const variantStyles = {
  primary: 'bg-[#103D85] hover:bg-[#0b2a5c] text-white border-[#103D85] dark:bg-[#1A4A9E] dark:hover:bg-[#2456b0] dark:border-[#1A4A9E]',
  outline: 'bg-white text-[#103D85] border-gray-100 hover:bg-gray-100 dark:bg-[#303746] dark:text-[#E2E2EA] dark:border-white/15 dark:hover:bg-white/5',
  auth: 'bg-[#5D8EF7] hover:bg-[#4B84F4] text-white border-[#5D8EF7] shadow-md active:scale-[0.98]',
  success: 'bg-[#4CAF50] hover:bg-[#37823A] text-white border-[#10B981] hover:border-[#047857] dark:bg-[#37823A] dark:hover:bg-[#2b652e] dark:border-[#37823A]',
  danger: 'bg-[#E30613] hover:bg-[#9F0009] text-white border-[#E30613] hover:border-[#9F0009] dark:bg-[#C62834] dark:hover:bg-[#A01F29] dark:border-[#C62834]',
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