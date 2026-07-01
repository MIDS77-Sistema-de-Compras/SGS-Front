"use client";

export default function ThemeToggle({ darkMode, onChange }) {
    return (
        <div className="relative flex bg-[#103D85] p-1 rounded-full">
            {/* Fundo branco que desliza entre os dois botões */}
            <span
                className={`absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                    darkMode ? "translate-x-full" : "translate-x-0"
                }`}
                style={{ left: "4px", width: "calc(50% - 4px)" }}
            />

            <button
                onClick={() => onChange(false)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold transition-colors duration-300 flex items-center gap-2 ${
                    !darkMode ? "text-[#103D85]" : "text-white/70 hover:text-white"
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/><path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/><path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
                Claro
            </button>
            <button
                onClick={() => onChange(true)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs font-bold transition-colors duration-300 flex items-center gap-2 ${
                    darkMode ? "text-[#103D85]" : "text-white/70 hover:text-white"
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
                Escuro
            </button>
        </div>
    );
}