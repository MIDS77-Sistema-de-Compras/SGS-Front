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
            description="Gerencie onde e como você irá receber as suas notificações"
            action={
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className={`text-xs font-bold ${active ? "text-[#103D85]" : "text-gray-400"}`}>
                            {active ? "Ativado" : "Desativado"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {active ? "Clique para desativar" : "Clique para ativar"}
                        </p>
                    </div>
                    <div
                        onClick={() => setActive(!active)}
                        className={`w-11 h-6 rounded-full relative cursor-pointer flex items-center transition-all duration-200 ${active ? "bg-[#103D85]" : "bg-gray-300"}`}
                    >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-sm absolute transition-all duration-200 ${active ? "right-0.5" : "left-0.5"}`} />
                    </div>
                </div>
            }
        />
    );
}