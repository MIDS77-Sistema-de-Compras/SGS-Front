export default function AdminSummaryItem({ icon, label, count, barColor = "#103D85", isLarge = false, className = "" }) {
    return (
        <article className={`relative flex items-center gap-2 overflow-hidden rounded-lg border border-gray-200 bg-white px-2.5 py-2 shadow-md ${isLarge ? "row-span-2" : ""} ${className}`}>
            <div className="absolute left-2 top-0 h-[3px] rounded-b-full" style={{ right: "0.5rem", backgroundColor: barColor }} />
            <div className="flex shrink-0 items-center justify-center">{icon}</div>
            <div className="min-w-0"><p className="text-[10px] leading-tight text-gray-500">{label}</p><p className={`${isLarge ? "text-[34px]" : "text-[27px]"} font-bold leading-tight text-black`}>{count}</p></div>
        </article>
    );
}