"use client";

import SettingsCard from "@/components/ui/layout/SettingsCard";
import { useEmailNotifications } from "@/hooks/useEmailNotifications";

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);

export default function Notifications() {
    const { enabled, toggle, mounted } = useEmailNotifications();

    return (
        <SettingsCard
            icon={<BellIcon />}
            title="Notificações"
            description="Receber notificações por e-mail"
            action={
                mounted ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="text-right">
                            <p className={`text-[10px] sm:text-xs font-bold ${enabled ? "text-[#103D85] dark:text-[#E2E2EA]" : "text-gray-400 dark:text-[#C3C6D3]"}`}>
                                {enabled ? "Ativado" : "Desativado"}
                            </p>
                            <p className="hidden xs:block text-[9px] sm:text-xs text-gray-400 dark:text-[#C3C6D3] whitespace-nowrap">
                                {enabled ? "Clique para desativar" : "Clique para ativar"}
                            </p>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            aria-label="Receber notificações por e-mail"
                            onClick={toggle}
                            className={`w-9 h-5 sm:w-11 sm:h-6 rounded-full relative cursor-pointer flex items-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#103D85]/40 dark:focus-visible:ring-[#5D8EF7]/40 ${enabled ? "bg-[#103D85] dark:bg-[#1A4A9E]" : "bg-gray-300 dark:bg-[#E2E2EA]/25"
                                }`}
                        >
                            <span
                                className="bg-white w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm absolute [--knob-on:18px] sm:[--knob-on:22px]"
                                style={{
                                    transform: enabled ? "translateX(var(--knob-on))" : "translateX(2px)",
                                    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            />
                        </button>
                    </div>
                ) : (
                    <div className="w-[140px] h-[42px] rounded-full bg-gray-200 dark:bg-white/10" aria-hidden="true" />
                )
            }
        />
    );
}