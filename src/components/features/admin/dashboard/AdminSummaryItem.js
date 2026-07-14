

export default function AdminSummaryItem({ icon, label, count, className = "" }) {
    return (
        <li
            className={`flex w-full items-center justify-between rounded-xl p-4 shadow-sm transition-all hover:scale-[1.01] dark:bg-[#303746] dark:border dark:border-white/10 ${className}`}
        >
            <div className="flex min-w-0 items-center gap-3">
                {icon}
                <p className="truncate text-gray-800 dark:text-[#E2E2EA]">
                    {label}
                </p>
            </div>
            <p className="shrink-0 font-semibold text-[20px] text-gray-800 dark:text-[#E2E2EA]">
                {count}
            </p>
        </li>
    );
}