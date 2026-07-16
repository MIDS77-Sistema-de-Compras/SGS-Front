"use client";

import { useMemo, useState } from "react";
import {
    ClipboardList,
    Calendar,
    LogIn,
    ShieldAlert,
    Search,
    Download,
} from "lucide-react";

import AuditLogTable from "./AuditLogTable";
import AuditDetailsModal from "./AuditDetailsModal";
import AuditPagination from "./AuditPagination";
import StatCard from "@/components/features/gerenciar-users/StatCard";
import Button from "@/components/ui/button/Button";
import Dropdown from "@/components/ui/select/Dropdown";
import { useAuditLogs } from "@/hooks/useAuditLogs";

const LOGS_PER_PAGE = 10;

function formatActionType(action) {
    if (!action || action.length <= 20) return action;

    return action.trim().replace(/\s+\S*$/, "");
}

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
    const { logs = [], loading, error } = useAuditLogs();

    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLog, setSelectedLog] = useState(null);

    const actionOptions = useMemo(() => {
        const seen = new Map();
        logs.forEach((log) => {
            if (log.actionId && !seen.has(log.actionId)) {
                seen.set(log.actionId, formatActionType(log.action));
            }
        });
        return Array.from(seen, ([value, label]) => ({ value, label }));
    }, [logs]);

    const stats = useMemo(() => {
        const today = new Date().toLocaleDateString("pt-BR");
        const todayCount = logs.filter((log) => log.date === today).length;
        const loginCount = logs.filter((log) => log.actionId?.toUpperCase().includes("LOGAR")).length;
        const impersonationCount = logs.filter((log) => log.actionId === "LOGAR_COMO_USUARIO").length;

        return {
            total: logs.length,
            today: todayCount,
            logins: loginCount,
            impersonation: impersonationCount,
        };
    }, [logs]);

    const filteredLogs = useMemo(() => {
        let formattedPeriod = "";
        if (period) {
            const [year, month, day] = period.split("-");
            formattedPeriod = `${day}/${month}/${year}`;
        }

        return logs.filter((log) => {
            const searchableContent = `${log.id} ${log.user} ${log.level} ${log.action} ${log.affectedUser} ${log.request} ${log.timestamp}`.toLowerCase();

            const matchesSearch = !searchTerm || searchableContent.includes(searchTerm.toLowerCase());
            const matchesAction = !actionType || log.actionId === actionType;
            const matchesPeriod = !period || log.date === formattedPeriod;

            return matchesSearch && matchesAction && matchesPeriod;
        });
    }, [logs, actionType, period, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredLogs.length / LOGS_PER_PAGE));
    const page = Math.min(currentPage, totalPages);
    const paginatedLogs = filteredLogs.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleActionChange = (valueOrEvent) => {
        const val = valueOrEvent?.target ? valueOrEvent.target.value : valueOrEvent;
        setActionType(val);
        setCurrentPage(1);
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col w-full h-full gap-4 lg:gap-5">
            <div className="space-y-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-[#103D85] dark:text-[#E2E2EA]">
                    Auditoria
                </h1>
                <p className="text-sm text-gray-500 dark:text-[#C3C6D3]">
                    Monitore e acompanhe as ações realizadas no sistema
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
                <StatCard
                    title="Total de Registros"
                    value={stats.total}
                    icon={ClipboardList}
                    iconBg="bg-blue-100 dark:bg-[#1A4A9E]/25"
                    iconColor="text-blue-600 dark:text-[#7FA9F5]"
                />

                <StatCard
                    title="Ações de Hoje"
                    value={stats.today}
                    icon={Calendar}
                    iconBg="bg-green-100 dark:bg-[#16A34A]/20"
                    iconColor="text-green-600 dark:text-[#5FD68A]"
                />

                <StatCard
                    title="Tentativas de Login"
                    value={stats.logins}
                    icon={LogIn}
                    iconBg="bg-orange-100 dark:bg-[#D97706]/20"
                    iconColor="text-orange-500 dark:text-[#F0B95B]"
                />

                <StatCard
                    title="Ações como Usuário"
                    value={stats.impersonation}
                    icon={ShieldAlert}
                    iconBg="bg-red-100 dark:bg-[#DC2626]/20"
                    iconColor="text-red-600 dark:text-[#F08B92]"
                />
            </div>

            <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-[#1A2233] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="p-4 lg:p-5 border-b border-gray-100 dark:border-white/10">
                    <div className="flex flex-col gap-3 lg:gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_220px_180px_auto] gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar por usuário, ação, nível..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-100 shadow-sm dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E]"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>

                            <Dropdown
                                className="w-full"
                                value={actionType}
                                onChange={handleActionChange}
                                placeholder="Tipo de ação"
                                options={[{ value: "", label: "Tipo de ação" }, ...actionOptions]}
                            />

                            <input
                                type="date"
                                className="w-full pl-4 pr-3 shadow-sm py-2.5 border border-gray-100 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E] dark:[color-scheme:dark]"
                                value={period}
                                onChange={handlePeriodChange}
                            />

                            <Button
                                variant="outline"
                                className="w-full xl:w-auto bg-[#E6F0FF] dark:bg-[#303746] text-[#103D85] dark:text-[#E2E2EA] border-transparent hover:bg-[#D4E5FF] dark:hover:bg-white/5 rounded-xl px-4 py-2.5"
                            >
                                <span className="inline-flex items-center justify-center gap-2">
                                    <Download size={16} />
                                    Exportar
                                </span>
                            </Button>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-[#A0A5B5]">
                            <span>{filteredLogs.length} registro(s) encontrado(s)</span>
                            <span className="hidden sm:block">Atualizado agora</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-h-0 flex flex-col justify-between">
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <p className="px-6 py-8 text-center text-sm text-gray-500 dark:text-[#C3C6D3]">
                                Carregando registros...
                            </p>
                        ) : error ? (
                            <p className="px-6 py-8 text-center text-sm text-red-500 dark:text-[#F08B92]">
                                {error}
                            </p>
                        ) : (
                            <AuditLogTable
                                logs={paginatedLogs}
                                onSelectLog={setSelectedLog}
                            />
                        )}
                    </div>

                    {!loading && !error && filteredLogs.length > 0 && (
                        <div className="border-t border-gray-100 dark:border-white/10 p-4">
                            <AuditPagination
                                currentPage={page}
                                totalPages={totalPages}
                                totalRecords={filteredLogs.length}
                                pageSize={LOGS_PER_PAGE}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>

            <AuditDetailsModal
                open={!!selectedLog}
                data={selectedLog}
                onClose={() => setSelectedLog(null)}
            />
        </div>
    );
}