import React from "react"

const PendingIcon = () => (
    <div className="w-9 h-9 rounded-full bg-[#E5EEFF] flex items-center justify-center shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 13.01 17.75 13.97 17.3 14.8L18.76 16.26C19.54 15.03 20 13.57 20 12C20 7.58 16.42 4 12 4ZM12 18C8.69 18 6 15.31 6 12C6 10.99 6.25 10.03 6.7 9.2L5.24 7.74C4.46 8.97 4 10.43 4 12C4 16.42 7.58 20 12 20V23L16 19L12 15V18Z" fill="#103D85"/>
        </svg>
    </div>
)

export default function RequestItem({ title, subtitle, time, onApprove, onReject, isOdd = false }) {
    return (
        <div className={`grid grid-cols-[1.2fr_1fr_auto] items-center py-3.5 border-b border-gray-200 hover:bg-gray-100/60 transition-colors px-6 ${isOdd ? 'bg-[#F8F9FB]' : 'bg-white'}`}>
            {/* Left side: Icon and Titles */}
            <div className="flex items-center gap-4">
                <PendingIcon />
                <div className="flex flex-col">
                    <p className="font-bold text-[#1E1E1E] text-[15px] leading-tight">
                        {title}
                    </p>
                    <p className="text-gray-400 text-[12px] leading-tight mt-1">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Center: Time */}
            <div className="text-left pl-8">
                <span className="text-[11px] text-gray-500 font-medium">
                    {time}
                </span>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex gap-4">
                <button 
                    onClick={onApprove}
                    className="px-8 py-1.5 rounded-full border border-[#4CAF50] text-[#4CAF50] font-semibold text-[14px] hover:bg-[#4CAF50]/5 transition-colors active:scale-95"
                >
                    Aprovar
                </button>
                <button 
                    onClick={onReject}
                    className="px-8 py-1.5 rounded-full border border-[#F44336] text-[#F44336] font-semibold text-[14px] hover:bg-[#F44336]/5 transition-colors active:scale-95"
                >
                    Recusar
                </button>
            </div>
        </div>
    )
}

