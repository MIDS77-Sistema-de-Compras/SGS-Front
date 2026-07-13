import { cn } from '@/lib/cn';

export default function SectionHeader({ label, className }) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="w-1 h-4 bg-[#103D85] dark:bg-[#E2E2EA] rounded-xl" aria-hidden="true" />
            <h2 className="text-sm font-bold text-[#103D85] dark:text-[#E2E2EA] tracking-widest">
                {label}
            </h2>
        </div>
    );
}