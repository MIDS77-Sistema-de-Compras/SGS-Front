import { TriangleAlert } from 'lucide-react';

export default function AdminAlertItem({ count, label = "Alertas" }) {
    return (
        <li className="flex w-full items-center justify-between rounded-xl p-3 sm:p-4 shadow-sm transition-all hover:scale-[1.01] bg-red-50 dark:bg-red-500/10 dark:border dark:border-red-500/30">
            <div className="flex min-w-0 items-center gap-3">
                <TriangleAlert size={28} strokeWidth={2} className="text-[#c00202] dark:text-red-400" />
                <p className="truncate text-red-700 dark:text-red-400 font-semibold">
                    {label}
                </p>
            </div>
            <p className="shrink-0 font-semibold text-[18px] sm:text-[20px] text-red-700 dark:text-red-400">
                {String(count).padStart(2, "0")}
            </p>
        </li>
    );
}