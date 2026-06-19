export default function AdminAlertItem({ count = 5 }) {
    return (
        <div className="relative bg-white rounded-2xl shadow-md border border-red-200 px-6 py-6 overflow-hidden flex flex-col items-center justify-center w-full">
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-red-500" />
            <p className="text-[20px] font-bold text-red-600 tracking-wider uppercase text-center leading-tight mb-4">
                Alertas<br />Críticos
            </p>
            <div className="flex items-center gap-7">
                <div className="w-[110px] h-[110px] rounded-2xl bg-[#FFF5F5] border border-[#FEE2E2] flex items-center justify-center">
                    <svg width="72" height="72" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4L6 14V24C6 34.5 13.5 44.08 24 46C34.5 44.08 42 34.5 42 24V14L24 4Z"
                            fill="#FEE2E2" stroke="#DC2626" strokeWidth="3" strokeLinejoin="round" />
                        <line x1="24" y1="16" x2="24" y2="28" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />
                        <circle cx="24" cy="35" r="2.5" fill="#DC2626" />
                    </svg>
                </div>
                <p className="text-[64px] font-extrabold text-black leading-none">
                    {count}
                </p>
            </div>
        </div>
    )
}
