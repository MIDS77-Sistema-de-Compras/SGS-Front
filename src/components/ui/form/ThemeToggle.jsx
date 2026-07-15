"use client";

export default function ThemeToggle({ darkMode, onChange }) {
    return (
        <div className="relative flex bg-[#103D85] dark:bg-[#E2E2EA]/25 p-[3px] sm:p-1 rounded-full">
            <span
                className="absolute top-[3px] bottom-[3px] sm:top-1 sm:bottom-1 rounded-full bg-white dark:bg-[#E2E2EA] shadow-sm"
                style={{
                    left: "3px",
                    width: "calc(50% - 3px)",
                    transform: darkMode ? "translateX(100%)" : "translateX(0)",
                    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            />

            <button
                onClick={() => onChange(false)}
                className={`relative z-10 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-colors duration-300 flex items-center gap-1 sm:gap-2 ${
                    !darkMode ? "text-[#103D85] dark:text-[#1A2233]" : "text-white/70 hover:text-white dark:text-[#E2E2EA] dark:hover:text-[#E2E2EA]"
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/><path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/><path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
                <span className="hidden sm:inline">Claro</span>
            </button>
            <button
                onClick={() => onChange(true)}
                className={`relative z-10 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold transition-colors duration-300 flex items-center gap-1 sm:gap-2 ${
                    darkMode ? "text-[#103D85] dark:text-[#1A2233]" : "text-white/70 hover:text-white dark:text-[#E2E2EA] dark:hover:text-[#E2E2EA]"
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
                <span className="hidden sm:inline">Escuro</span>
            </button>
        </div>
    );
}