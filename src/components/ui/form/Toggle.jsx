"use client";

export default function Toggle({ active, onChange, label }) {
    return (
        <div className="flex items-center gap-3">
            {label && (
                <span className={`text-xs font-bold transition-colors ${active ? "text-[#103D85]" : "text-gray-400"}`}>
                    {label}
                </span>
            )}
            <div
                onClick={() => onChange(!active)}
                className={`w-11 h-6 rounded-full relative cursor-pointer flex items-center transition-all duration-200 ${active ? "bg-[#103D85]" : "bg-gray-300"}`}
            >
                <div className={`bg-white w-5 h-5 rounded-full shadow-sm absolute transition-all duration-200 ${active ? "right-0.5" : "left-0.5"}`} />
            </div>
        </div>
    );
}