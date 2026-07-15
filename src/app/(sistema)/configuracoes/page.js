"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import UserProfile from "@/components/features/settings/UserProfile";
import SystemPreferences from "@/components/features/settings/SystemPreferences";
import Notifications from "@/components/features/settings/Notifications";

export default function Settings() {
    useDocumentTitle("Configurações");

    return (
        <div className="flex flex-col flex-1 min-h-0">

            <header className="mb-5">
                <h1 className="text-xl sm:text-[22px] font-bold text-[#1E3A8A] dark:text-[#E2E2EA] tracking-tight font-sans">Configurações</h1>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-[#C3C6D3] mt-1">Gerencie suas preferências e configurações do sistema</p>
            </header>

            <div className="flex flex-col gap-5 w-full">
                <UserProfile />
                <SystemPreferences />
                <Notifications />
            </div>

        </div>
    );
}