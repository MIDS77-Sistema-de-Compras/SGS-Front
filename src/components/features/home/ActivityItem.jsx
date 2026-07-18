import Image from "next/image";

export default function ActivityItem({ iconSrc, iconAlt, title, subtitle, time, onClick }) {
    return (
        <li
            onClick={onClick}
            className={`flex items-center justify-between gap-3 rounded-lg px-1 py-3 transition-all hover:bg-gray-100 active:scale-[0.98] dark:hover:bg-white/5 ${onClick ? "cursor-pointer" : ""}`}
        >
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={35}
                    height={35}
                    className="h-[28px] w-[28px] shrink-0 sm:h-[35px] sm:w-[35px]"
                />
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800 sm:text-base dark:text-[#E2E2EA]">
                        {title}
                    </p>
                    <p className="truncate text-[11px] text-gray-500 sm:text-[12px] dark:text-[#C3C6D3]">
                        {subtitle}
                    </p>
                </div>
            </div>
            <p className="shrink-0 text-[11px] text-gray-500 sm:text-[12px] dark:text-[#C3C6D3]">
                {time}
            </p>
        </li>
    );
}