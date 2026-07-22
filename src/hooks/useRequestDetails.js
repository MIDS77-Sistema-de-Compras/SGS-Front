import { useCallback, useEffect, useState } from "react";

import { getRequestById } from "@/service/requests";

export function useRequestDetails(id, { ownRequest = false } = {}) {
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(Boolean(id));
    const [error, setError] = useState("");

    const loadRequest = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError("");
            const data = await getRequestById(id, { ownRequest });
            setRequest(data);
        } catch (err) {
            setError(err.message || "Erro ao carregar solicitação.");
        } finally {
            setLoading(false);
        }
    }, [id, ownRequest]);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            if (!id) return;
            try {
                setLoading(true);
                setError("");
                const data = await getRequestById(id, { ownRequest });
                if (!cancelled) setRequest(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Erro ao carregar solicitação.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [id, ownRequest]);

    return { request, loading, error, refetch: loadRequest };
}
