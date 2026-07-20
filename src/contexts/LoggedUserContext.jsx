"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getLoggedUser } from "@/service/users/me";

const LoggedUserContext = createContext(null);

export function LoggedUserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refetch = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getLoggedUser();
            setUser(data);
            return data;
        } catch (requestError) {
            setError(requestError.message || "Erro ao carregar usuário.");
            throw requestError;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        getLoggedUser()
            .then((data) => {
                if (!cancelled) setUser(data);
            })
            .catch((requestError) => {
                if (!cancelled) {
                    setError(requestError.message || "Erro ao carregar usuário.");
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        error,
        refetch,
        updateUser: setUser,
    }), [user, loading, error, refetch]);

    return (
        <LoggedUserContext.Provider value={value}>
            {children}
        </LoggedUserContext.Provider>
    );
}

export function useLoggedUserContext() {
    const context = useContext(LoggedUserContext);

    if (!context) {
        throw new Error("useLoggedUser deve ser usado dentro de LoggedUserProvider");
    }

    return context;
}
