import { cn } from '@/lib/cn';

export default function FormField({ label, required, children, className, htmlFor }) {
    return (
        <div className={cn(className)}>
            <label
                htmlFor={htmlFor}
                className="block text-[12px] font-bold text-[#103D85]/70 dark:text-[#C3C6D3] mb-2 pt-4 pb-px"
            >
                {label}
                {required && <span className="text-[#BA1A1A]">&nbsp;*</span>}
            </label>
            {children}
        </div>
    );
}