"use client";

import UserProfile from "@/components/features/settings/UserProfile";
import SystemPreferences from "@/components/features/settings/SystemPreferences";
import Notifications from "@/components/features/settings/Notifications";

export default function Settings() {
    return (
        <div className="flex flex-col flex-1 min-h-0">

            <header className="mb-12">
                <h1 className="text-5xl font-bold text-[#1E3A8A] tracking-tight font-sans">Configurações</h1>
                <p className="text-gray-400 text-lg mt-2">Gerencie suas preferências e configurações do sistema</p>
            </header>

            <div className="flex flex-col gap-6 w-full">
                <UserProfile />
                <SystemPreferences />
                <Notifications />
            </div>

        </div>
    );
}