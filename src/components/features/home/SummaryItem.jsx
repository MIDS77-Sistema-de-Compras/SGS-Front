import Image from "next/image"

export default function SummaryItem({ iconSrc, iconSrcDark, iconAlt, label, count }) {
    return (
        <li className="flex p-4 shadow-lg rounded-xl items-center gap-40 hover:scale-[1.03] dark:bg-[#303746] dark:border dark:border-white/10">
            <div className="flex gap-3 items-center">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={25}
                    height={25}
                    className="block dark:hidden"
                />
                {iconSrcDark && (
                    <Image
                        src={iconSrcDark}
                        alt={iconAlt}
                        width={25}
                        height={25}
                        className="hidden dark:block"
                    />
                )}
                <p className="text-gray-800 dark:text-[#E2E2EA]">
                    {label}
                </p>
            </div>
            <p className="font-semibold text-[20px] text-gray-800 dark:text-[#E2E2EA]">
                {count}
            </p>
        </li>
    )
}