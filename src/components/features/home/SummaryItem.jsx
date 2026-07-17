import Image from "next/image";

export default function SummaryItem({ iconSrc, iconSrcDark, iconAlt, label, count }) {
    return (
        <li className="flex w-full flex-col items-center gap-1 rounded-xl border border-gray-100 p-3 shadow-sm transition-all hover:scale-[1.03] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:border-transparent sm:p-4 dark:bg-[#303746] dark:border dark:border-white/10">
            <div className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={25}
                    height={25}
                    className="block shrink-0 dark:hidden"
                />
                {iconSrcDark && (
                    <Image
                        src={iconSrcDark}
                        alt={iconAlt}
                        width={25}
                        height={25}
                        className="hidden shrink-0 dark:block"
                    />
                )}
                <p className="max-w-full truncate text-center text-[12px] text-gray-800 sm:text-left sm:text-base dark:text-[#E2E2EA]">
                    {label}
                </p>
            </div>
            <p className="shrink-0 text-[18px] font-semibold text-gray-800 sm:text-[20px] dark:text-[#E2E2EA]">
                {count}
            </p>
        </li>
    );
}