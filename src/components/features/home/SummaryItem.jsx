import Image from "next/image";

export default function SummaryItem({ iconSrc, iconAlt, label, count }) {
    return (
        <li className="flex w-full items-center justify-between rounded-xl p-4 shadow-lg transition-all hover:scale-[1.03]">
            <div className="flex min-w-0 items-center gap-3">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={25}
                    height={25}
                />
                <p className="truncate">
                    {label}
                </p>
            </div>
            <p className="shrink-0 font-semibold text-[20px]">
                {count}
            </p>
        </li>
    );
}
