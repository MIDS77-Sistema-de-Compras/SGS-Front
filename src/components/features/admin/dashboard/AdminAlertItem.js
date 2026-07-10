import { TriangleAlert } from 'lucide-react';

export default function AdminAlertItem({ count, label = "Alertas" }) {
    return (
        <li className="flex w-full items-center justify-between rounded-xl p-4 shadow-lg transition-all hover:scale-[1.01] bg-red-50 dark:bg-[#3A2430] dark:border dark:border-white/10">
            <div className="flex min-w-0 items-center gap-3">
                <TriangleAlert size={28} color="#c00202" strokeWidth={2} />
                <p className="truncate text-red-700 dark:text-red-300 font-semibold">
                    {label}
                </p>
            </div>
            <p className="shrink-0 font-semibold text-[20px] text-red-700 dark:text-red-300">
                {String(count).padStart(2, "0")}
            </p>
        </li>
    );
}