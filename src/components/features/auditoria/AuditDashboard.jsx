"use client";

import { useEffect, useMemo, useState } from "react";
import AuditFilters from "./AuditFilters";
import AuditHeader from "./AuditHeader";
import AuditLogTable from "./AuditLogTable";
import AuditPagination from "./AuditPagination";
import AuditSummaryCards from "./AuditSummaryCards";
import { getAuditLogs } from "@/service/auditLogs";

const LOGS_PER_PAGE = 6;

function formatActionLabel(typeAction) {
    if (!typeAction) return "—";

    return typeAction
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function formatTimestamp(timestamp) {
    if (!timestamp) return { display: "—", date: "" };

    const parsed = new Date(timestamp);
    const date = parsed.toLocaleDateString("pt-BR");
    const time = parsed.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    return { display: `${date}\n${time}`, date };
}

function mapLog(log) {
    const { display, date } = formatTimestamp(log.timestamp);

    return {
        id: log.id,
        user: log.userAgentName || "—",
        level: log.userAgentRole || "—",
        action: formatActionLabel(log.typeAction),
        actionId: log.typeAction,
        description: log.description || "—",
        affectedUser: log.userTargetName || "—",
        request: log.request ? `#${log.request}` : "—",
        timestamp: display,
        date,
    };
}

export default function AuditDashboard() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const data = await getAuditLogs();
                if (!cancelled) setLogs((Array.isArray(data) ? data : []).map(mapLog));
            } catch (e) {
                if (!cancelled) setLoadError(e.message || "Erro ao carregar os registros de auditoria.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    const actionOptions = useMemo(() => {
        const unique = new Map();
        logs.forEach((log) => {
            if (log.actionId && !unique.has(log.actionId)) {
                unique.set(log.actionId, { value: log.actionId, label: log.action });
            }
        });
        return Array.from(unique.values());
    }, [logs]);

    const stats = useMemo(() => {
        const today = new Date().toLocaleDateString("pt-BR");
        const todayCount = logs.filter((log) => log.date === today).length;
        const loginCount = logs.filter((log) => log.actionId === "LOGAR").length;
        const impersonationCount = logs.filter((log) => log.actionId === "LOGAR_COMO_USUARIO").length;

        return [
            { id: "total", label: "Total de Registros", value: String(logs.length), color: "#103D85", background: "#EBF0F9", icon: "records" },
            { id: "today", label: "Ações de Hoje", value: String(todayCount), color: "#16A34A", background: "#DCFCE7", icon: "calendar" },
            { id: "login-attempts", label: "Logins", value: String(loginCount), color: "#D97706", background: "#FEF3C7", icon: "login" },
            { id: "critical-alerts", label: "Ações como Usuário", value: String(impersonationCount), color: "#DC2626", background: "#FEE2E2", icon: "alert" },
        ];
    }, [logs]);

    const filteredLogs = useMemo(() => logs.filter((log) => {
        const searchableContent = `${log.id} ${log.user} ${log.level} ${log.action} ${log.description} ${log.affectedUser} ${log.request} ${log.timestamp}`.toLowerCase();
        return (!searchTerm || searchableContent.includes(searchTerm.toLowerCase()))
            && (!actionType || log.actionId === actionType)
            && (!period || log.date.includes(period));
    }), [actionType, logs, period, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredLogs.length / LOGS_PER_PAGE));
    const page = Math.min(currentPage, totalPages);
    const paginatedLogs = filteredLogs.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

    function updateFilter(setter) {
        return (value) => {
            setter(value);
            setCurrentPage(1);
        };
    }

    return (
        <div className="flex flex-1 flex-col pb-4 gap-6">
            <AuditHeader />
            <AuditSummaryCards stats={stats} />
            <section className="flex-1 bg-white border border-gray-300 rounded-[14px] shadow-sm overflow-hidden flex flex-col">
                <AuditFilters searchTerm={searchTerm} actionType={actionType} period={period} actionOptions={actionOptions} onSearchChange={updateFilter(setSearchTerm)} onActionChange={updateFilter(setActionType)} onPeriodChange={updateFilter(setPeriod)} />
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    {loading
                        ? <p className="px-6 py-8 text-center text-sm text-gray-500">Carregando registros...</p>
                        : loadError
                            ? <p className="px-6 py-8 text-center text-sm text-red-500">{loadError}</p>
                            : <AuditLogTable logs={paginatedLogs} />}
                </div>
                <AuditPagination currentPage={page} totalPages={totalPages} totalRecords={filteredLogs.length} pageSize={LOGS_PER_PAGE} onPageChange={setCurrentPage} />
            </section>
        </div>
    );
}
