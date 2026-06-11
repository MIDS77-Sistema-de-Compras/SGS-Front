import Image from "next/image"

export default function ActivityItem({ iconSrc, iconAlt, title, subtitle, time }) {
    return (
        <li className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-2 transition-all active:scale-[0.98]">
            <div className="flex gap-5 items-center">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={35}
                    height={35}
                />
                <div>
                    <p className="font-semibold">
                        {title}
                    </p>
                    <p className="text-[12px]">
                        {subtitle}
                    </p>
                </div>
            </div>
            <p className="text-[12px]">
                {time}
            </p>
        </li>
    )
}