import Image from "next/image"

export default function ActivityItem({ iconSrc, iconAlt, title, subtitle, time }) {
    return (
        <li className="-mx-5 flex items-center justify-between  px-4 py-3 transition-all hover:bg-gray-100 active:scale-[0.99]">
            <div className="flex min-w-0 items-center gap-5">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={35}
                    height={35}
                />
                <div className="min-w-0">
                    <p className="truncate font-semibold">
                        {title}
                    </p>
                    <p className="truncate text-[12px]">
                        {subtitle}
                    </p>
                </div>
            </div>
            <p className="shrink-0 text-[12px]">
                {time}
            </p>
        </li>
    )
}
