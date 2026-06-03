import Image from "next/image"

export default function SummaryItem({ iconSrc, iconAlt, label, count }) {
    return (
        <li className="flex p-4 shadow-lg rounded-xl items-center gap-40 hover:scale-[1.03]">
            <div className="flex gap-3 items-center">
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    width={25}
                    height={25}
                />
                <p>
                    {label}
                </p>
            </div>
            <p className="font-semibold text-[20px]">
                {count}
            </p>
        </li>
    )
}