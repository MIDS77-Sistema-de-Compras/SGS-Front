import { useEffect, useState } from "react";

import { getAllLogs } from "@/service/logs";

export function useAuditLogs(fetchLogs = getAllLogs) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadLogs() {
            try {
                setLoading(true);
                setError("");
                const data = await fetchLogs();
                if (!cancelled) setLogs(data);
            } catch (err) {
                if (!cancelled) setError(err.message || "Erro ao carregar registros de auditoria.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadLogs();

        return () => {
            cancelled = true;
        };
    }, [fetchLogs]);

    return { logs, loading, error };
}
