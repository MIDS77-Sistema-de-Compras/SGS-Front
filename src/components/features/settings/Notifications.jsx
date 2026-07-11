"use client";

import { useState } from "react";
import SettingsCard from "@/components/ui/layout/SettingsCard";

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
);

export default function Notifications() {
    const [active, setActive] = useState(true);

    return (
        <SettingsCard
            icon={<BellIcon />}
            title="Notificações"
            description="Receber notificações por e-mail"
            action={
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className={`text-xs font-bold ${active ? "text-[#103D85] dark:text-[#E2E2EA]" : "text-gray-400 dark:text-[#C3C6D3]"}`}>
                            {active ? "Ativado" : "Desativado"}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-[#C3C6D3]">
                            {active ? "Clique para desativar" : "Clique para ativar"}
                        </p>
                    </div>
                    <div
                        onClick={() => setActive(!active)}
                        className={`w-11 h-6 rounded-full relative cursor-pointer flex items-center transition-colors duration-300 ${active ? "bg-[#103D85] dark:bg-[#1A4A9E]" : "bg-gray-300 dark:bg-[#E2E2EA]/25"}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-sm absolute transition-transform duration-300 ease-in-out ${active ? "translate-x-5.5" : "translate-x-0.5"}`} />
                    </div>
                </div>
            }
        />
    );
}