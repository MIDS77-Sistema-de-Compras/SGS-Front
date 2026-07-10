'use client';

import Image from 'next/image';
import { cn } from '@/lib/cn';

export default function FileDropzone({
  icon,
  iconDark,
  iconAlt = '',
  title,
  description,
  variant = 'default',
  iconVariant = 'gray',
  className,
  children,
  onFilesSelected,
  accept,
}) {

  const handleDragOver = (event) => {
    if (!onFilesSelected) return;
    event.preventDefault();
  };

  const handleDrop = (event) => {
    if (!onFilesSelected) return;
    event.preventDefault();
    onFilesSelected(event.dataTransfer.files);
  };

  const handleInputChange = (event) => {
    if (!onFilesSelected) return;
    onFilesSelected(event.target.files);
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center border border-[#00000020] dark:border-white/15 border-dashed rounded-xl pt-1 pb-5 px-2',
        variant === 'muted' ? 'bg-gray-100 dark:bg-[#303746]' : 'dark:bg-[#303746]',
        className
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children ?? (
        <div className="flex flex-col items-center pt-5">
          <div
            className={cn(
              'mb-2 rounded-full',
              iconVariant === 'white' ? 'bg-white dark:bg-[#E2E2EA]/25 p-4 mb-4' : 'bg-gray-100 dark:bg-[#E2E2EA]/25 p-5'
            )}
          >
            {icon && (
              <>
                <Image src={icon} alt={iconAlt} className={iconDark ? "block dark:hidden" : "dark:invert dark:brightness-90"} />
                {iconDark && <Image src={iconDark} alt={iconAlt} className="hidden dark:block" />}
              </>
            )}
          </div>
          {title && (
            <p
              className={cn(
                'text-[#103D85] dark:text-[#E2E2EA]',
                iconVariant === 'white'
                  ? 'font-semibold'
                  : 'font-bold text-[14px]'
              )}
            >
              {title}
            </p>
          )}
          {description && (
            <p className="text-[12px] text-[#747782] dark:text-[#C3C6D3]">{description}</p>
          )}
          {onFilesSelected && (
            <label className="relative mt-4 cursor-pointer text-sm font-semibold text-[#103D85] dark:text-[#C3C6D3] hover:underline">
              Selecionar arquivos
              <input
                type="file"
                className="absolute w-0 h-0 p-0 m-0 opacity-0 overflow-hidden"
                accept={accept}
                multiple
                onChange={handleInputChange}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}