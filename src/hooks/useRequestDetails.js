import { useEffect, useState } from "react";

import { getRequestById } from "@/service/requests";

export function useRequestDetails(id) {
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(Boolean(id));
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        async function loadRequest() {
            try {
                setLoading(true);
                setError("");
                const data = await getRequestById(id);
                if (!cancelled) setRequest(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Erro ao carregar solicitação.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadRequest();

        return () => {
            cancelled = true;
        };
    }, [id]);

    return { request, loading, error };
}