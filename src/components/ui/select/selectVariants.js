import { cn } from '@/lib/cn';

export const selectVariantStyles = {
  form: 'h-auto py-2.5 text-sm bg-white border border-gray-100 shadow-sm focus:border-[#103D85] focus:ring-0.5 focus:ring-[#103D85] text-gray-800 dark:bg-[#303746] dark:border-white/15 dark:text-[#E2E2EA] dark:focus:border-[#1A4A9E] dark:focus:ring-[#1A4A9E]',
  auth: 'h-14 text-lg bg-white border border-transparent focus:border-[#5D8EF7] text-gray-800 dark:bg-[#303746] dark:text-[#E2E2EA]',
};

export function getSelectClassName({ variant = 'form', iconSrc, error, className }) {
  return cn(
    'rounded-xl outline-none transition-all w-full appearance-none',
    selectVariantStyles[variant],
    iconSrc ? 'pl-14 pr-10' : 'px-4 pr-10',
    error && 'border-[#EA4335] focus:border-[#EA4335] focus:ring-[#EA4335]',
    className
  );
}

export function normalizeOptions(options = []) {
  return options.map((option) => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    }

    return option;
  });
}
