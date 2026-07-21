"use client";

import { useEffect, useState } from "react";
import { updateEmailNotificationPreference } from "@/service/users/emailNotifications";

const STORAGE_KEY = "sgs:email-notifications-enabled";

export function useEmailNotifications() {
    const [enabled, setEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored !== null) setEnabled(stored === "true");
        setMounted(true);
    }, []);

    const toggle = () => {
        const next = !enabled;

        setEnabled(next);
        window.localStorage.setItem(STORAGE_KEY, String(next));

        updateEmailNotificationPreference(next).catch((err) => {
            console.warn("Não foi possível sincronizar a preferência de e-mail com o servidor:", err);
        });
    };

    return { enabled, toggle, mounted };
}