import { useEffect, useState } from "react";

import { getAllRequests } from "@/service/requests";

export function useRequestsList(initialRequests = [], fetchRequests = getAllRequests) {
    const [requests, setRequests] = useState(initialRequests);
    const [loading, setLoading] = useState(initialRequests.length === 0);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadRequests() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchRequests();
                if (!cancelled) setRequests(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Erro ao carregar solicitações.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadRequests();

        return () => {
            cancelled = true;
        };
    }, [fetchRequests]);

    return { requests, loading, error };
}