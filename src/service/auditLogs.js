import { api } from "./api";

/**
 * Busca os registros de auditoria no backend (GET /logs).
 * Aceita filtros opcionais: typeAction, agentEmail, startDate, endDate.
 */
export async function getAuditLogs(filters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    const query = params.toString();

    try {
        return await api.get(`/logs${query ? `?${query}` : ""}`);
    } catch (e) {
        console.error("Erro ao buscar registros de auditoria: ", e);
        throw e;
    }
}
