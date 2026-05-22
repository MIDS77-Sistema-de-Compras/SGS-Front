import Image from "next/image";

export function Input({
    type = "text", placeholder, value, onChange, className = ""
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`
                h-14 rounded-xl px-4 bg-white text-lg w-full
                outline-none border border-transparent focus:border-[#5D8EF7] 
                transition-all text-gray-800 ${className}
            `}
        />
    )
}