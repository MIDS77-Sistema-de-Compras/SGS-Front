"use client";

import { useEffect, useState } from "react";
import { getLoggedUser } from "@/service/users/me";

export function useLoggedUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const data = await getLoggedUser();
                if (!cancelled) setUser(data);
            } catch (e) {
                if (!cancelled) setError(e.message || "Erro ao carregar usuário.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    return { user, loading, error };
}