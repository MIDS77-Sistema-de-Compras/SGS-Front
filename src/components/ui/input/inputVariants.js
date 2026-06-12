import { cn } from '@/lib/cn';

export const inputVariantStyles = {
  auth: 'h-14 text-lg bg-white border border-transparent focus:border-[#5D8EF7] text-gray-800',
  form: 'h-auto py-2.5 text-sm bg-white border border-gray-200 shadow-sm focus:border-[#103D85] focus:ring-0.5 focus:ring-[#103D85] text-gray-800 placeholder:text-[#6B7280]',
};

export function getInputClassName({ variant = 'auth', iconSrc, error, hasRightSlot, className }) {
  return cn(
    'rounded-xl outline-none transition-all w-full',
    '[&::-ms-reveal]:hidden',
    '[&::-webkit-credentials-auto-fill-button]:hidden',
    inputVariantStyles[variant],
    iconSrc ? 'pl-14' : 'px-4',
    hasRightSlot && (variant === 'auth' ? 'pr-12' : 'pr-10'),
    !hasRightSlot && !iconSrc && 'px-4',
    !hasRightSlot && iconSrc && 'pr-4',
    error && 'border-[#EA4335] focus:border-[#EA4335] focus:ring-[#EA4335]',
    className
  );
}
