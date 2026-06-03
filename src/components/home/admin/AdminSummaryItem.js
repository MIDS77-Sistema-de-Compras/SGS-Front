export default function AdminSummaryItem({ icon, label, count, barColor = "#103D85", isLarge = false, className = "" }) {
    if (isLarge) {
        return (
            <div className={`relative flex flex-col items-center justify-center rounded-2xl border border-gray-200 shadow-md px-6 py-6 overflow-hidden bg-white ${className}`}>
                <div
                    className="absolute top-0 left-0 right-0 h-[5px]"
                    style={{ backgroundColor: barColor }}
                />
                <p 
                    className="text-[20px] font-bold tracking-wider text-center leading-tight uppercase mb-4"
                    style={{ color: barColor }}
                >
                    {label}
                </p>
                <div className="flex items-center gap-7">
                    <div className="flex-shrink-0">
                        {icon}
                    </div>
                    <p className="text-[64px] font-extrabold text-black leading-none">{count}</p>
                </div>
            </div>
        )
    }
    return (
        <div className={`relative bg-white rounded-xl shadow-md border border-gray-100 px-4 pt-5 pb-4 overflow-hidden ${className}`}>
            <div
                className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full"
                style={{ backgroundColor: barColor }}
            />
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <p className="text-[10px] text-gray-400 leading-tight">
                        {label}
                    </p>
                    <p className="text-[28px] font-bold text-gray-800 leading-tight mt-0.5">
                        {count}
                    </p>
                </div>
            </div>
        </div>
    )
}
