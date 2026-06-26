"use client";

import UserProfile from "@/components/features/settings/UserProfile";
import SystemPreferences from "@/components/features/settings/SystemPreferences";
import Notifications from "@/components/features/settings/Notifications";

export default function Settings() {
    return (
        <div className="flex flex-col flex-1 min-h-0">

            <header className="mb-5">
                <h1 className="text-[22px] font-bold text-[#1E3A8A] tracking-tight font-sans">Configurações</h1>
                <p className="text-gray-400 mt-1">Gerencie suas preferências e configurações do sistema</p>
            </header>

            <div className="flex flex-col gap-5 w-full">
                <UserProfile />
                <SystemPreferences />
                <Notifications />
            </div>

        </div>
    );
}