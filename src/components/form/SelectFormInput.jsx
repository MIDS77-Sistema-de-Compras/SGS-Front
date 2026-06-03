"use client";
import Image from "next/image";

// had to rewrite everything.
export default function SelectFormInput({
    label, name, options, isRequired, className = "", iconSrc, iconAlt = "Ícone"
}) {
    return (
        <div className="relative flex items-center w-full">

            {iconSrc && (
                <div className="absolute left-4 pointer-events-none z-10">
                    <Image src={iconSrc} alt={iconAlt} width={24} height={24} className="opacity-60" />
                </div>
            )}

            <select
                name={name}
                required={isRequired}
                className={`
                    h-10.5 rounded-xl bg-white text-sm w-full
                    outline-none border border-gray-200 shadow-sm
                    focus:border-[#5D8EF7] focus:shadow-none
                    transition-all text-gray-800 appearance-none
                    [&::-ms-reveal]:hidden
                    [&::-webkit-credentials-auto-fill-button]:hidden
                    ${iconSrc ? "pl-14 pr-10" : "px-4 pr-10"}
                    ${className}
                `}
            >
                <option value="" disabled hidden>{label}</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt}>{opt}</option>
                ))}
            </select>

            <div className="absolute right-4 pointer-events-none opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>

        </div>
    );
}