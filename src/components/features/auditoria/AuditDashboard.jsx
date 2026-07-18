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
import StatCard from "@/components/features/gerenciar-users/StatCard";
import Button from "@/components/ui/button/Button";
import Dropdown from "@/components/ui/select/Dropdown";
import DatePicker from "@/components/ui/select/DatePicker";
import { useAuditLogs } from "@/hooks/useAuditLogs";
import AuditTableSkeleton from "./AuditTableSkeleton";

function formatActionType(action) {
    if (!action || action.length <= 20) return action;

    return action.trim().replace(/\s+\S*$/, "");
}

function getSortableDate(log) {
    if (!log.date) return new Date(0);

    const timeMatch = log.timestamp?.match(/(\d{2}):(\d{2})/);
    const time = timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : "00:00";

    return new Date(`${log.date}T${time}`);
}

export default function AuditDashboard() {
    const { logs = [], loading, error } = useAuditLogs();

    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");
    const [selectedLog, setSelectedLog] = useState(null);

    const sortedLogs = useMemo(() => {
        return [...logs].sort((a, b) => getSortableDate(b) - getSortableDate(a));
    }, [logs]);

    const actionOptions = useMemo(() => {
        const seen = new Map();
        sortedLogs.forEach((log) => {
            if (log.actionId && !seen.has(log.actionId)) {
                seen.set(log.actionId, formatActionType(log.action));
            }
        });
        return Array.from(seen, ([value, label]) => ({ value, label }));
    }, [sortedLogs]);

    const stats = useMemo(() => {
        const today = new Date().toLocaleDateString("pt-BR");
        const todayCount = sortedLogs.filter((log) => log.date === today || log.timestamp?.startsWith(today)).length;
        const loginCount = sortedLogs.filter((log) => log.actionId?.toUpperCase().includes("LOGAR")).length;
        const impersonationCount = sortedLogs.filter((log) => log.actionId === "LOGAR_COMO_USUARIO").length;

        return {
            total: sortedLogs.length,
            today: todayCount,
            logins: loginCount,
            impersonation: impersonationCount,
        };
    }, [sortedLogs]);

    const filteredLogs = useMemo(() => {
        let formattedPeriod = "";
        if (period) {
            const [year, month, day] = period.split("-");
            formattedPeriod = `${day}/${month}/${year}`;
        }

        return sortedLogs.filter((log) => {
            const searchableContent = `${log.id} ${log.user} ${log.level} ${log.action} ${log.affectedUser} ${log.request} ${log.timestamp}`.toLowerCase();

            const matchesSearch = !searchTerm || searchableContent.includes(searchTerm.toLowerCase());
            const matchesAction = !actionType || log.actionId === actionType;
            const matchesPeriod = !period || log.date === formattedPeriod;

            return matchesSearch && matchesAction && matchesPeriod;
        });
    }, [sortedLogs, actionType, period, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleActionChange = (valueOrEvent) => {
        const val = valueOrEvent?.target ? valueOrEvent.target.value : valueOrEvent;
        setActionType(val);
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    function handleExport() {
        const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
        const headers = ["ID", "Usuário", "Nível", "Ação", "Usuário Afetado", "Solicitação", "Data/Hora"];
        const rows = filteredLogs.map((log) => [
            log.id,
            clean(log.user),
            clean(log.level),
            clean(log.action),
            clean(log.affectedUser),
            clean(log.request),
            clean(log.timestamp),
        ]);

        const csvContent =
            "﻿" +
            [headers, ...rows]
                .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(";"))
                .join("\r\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `auditoria_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

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

                            <DatePicker
                                className="w-full"
                                value={period}
                                onChange={handlePeriodChange}
                                placeholder="Período"
                            />

                            <Button
                                variant="outline"
                                onClick={handleExport}
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
                    {loading ? (
                        <AuditTableSkeleton />
                    ) : error ? (
                        <p className="px-6 py-8 text-center text-sm text-red-500 dark:text-[#F08B92]">
                            {error}
                        </p>
                    ) : (
                        <AuditLogTable
                            logs={filteredLogs}
                            onSelectLog={setSelectedLog}
                        />
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