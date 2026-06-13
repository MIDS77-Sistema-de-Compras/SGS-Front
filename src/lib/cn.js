import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: [
        'primary',
        'primary-hover',
        'auth',
        'error',
        'error-required',
        'success',
        'success-bg',
        'error-bg',
      ],
    },
  },
});

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
