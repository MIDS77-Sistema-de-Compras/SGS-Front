"use client";

import { useMemo, useState } from "react";
import { 
    ClipboardList, 
    Calendar, 
    LogIn, 
    ShieldAlert,
    Search
} from "lucide-react";
import AuditLogTable from "./AuditLogTable";
import AuditDetailsModal from "./AuditDetailsModal";
import StatCard from "@/components/features/gerenciar-users/StatCard";
import Button from "@/components/ui/button/Button";
import Dropdown from "@/components/ui/select/Dropdown";
import { useAuditLogs } from "@/hooks/useAuditLogs";

export default function AuditDashboard() {
    const { logs, loading, error } = useAuditLogs();

    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");

    const [selectedLog, setSelectedLog] = useState(null);

    const actionOptions = useMemo(() => {
        const seen = new Map();
        logs.forEach((log) => {
            if (log.actionId && !seen.has(log.actionId)) {
                seen.set(log.actionId, log.action);
            }
        });
        return Array.from(seen, ([value, label]) => ({ value, label }));
    }, [logs]);

    const stats = useMemo(() => {
        const today = new Date();
        const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        return {
            total: logs.length,
            today: logs.filter((log) => log.date === todayISO).length,
            logins: logs.filter((log) => log.actionId.toUpperCase().includes("LOGAR")).length,
            critical: logs.filter((log) => /DESATI|EXCLU|REMOV|ATUALI/.test(log.actionId.toUpperCase())).length,
        };
    }, [logs]);

    const filteredLogs = useMemo(() => {
        return logs.filter((log) => {
            const searchableContent = `${log.id} ${log.user} ${log.level} ${log.action} ${log.affectedUser} ${log.request} ${log.timestamp}`.toLowerCase();

            const matchesSearch = !searchTerm || searchableContent.includes(searchTerm.toLowerCase());
            const matchesAction = !actionType || log.actionId === actionType;
            const matchesPeriod = !period || log.date === period;

            return matchesSearch && matchesAction && matchesPeriod;
        });
    }, [logs, actionType, period, searchTerm]);

    return (
        <div className="flex flex-1 flex-col w-full h-full pb-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-[#103D85] dark:text-[#E2E2EA] mb-1">
                    Auditoria
                </h1>
                <p className="text-gray-500 dark:text-[#C3C6D3] text-sm">
                    Monitore e acompanhe as ações realizadas no sistema
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                    title="Alertas Críticos"
                    value={stats.critical}
                    icon={ShieldAlert}
                    iconBg="bg-purple-100 dark:bg-[#7C3AED]/20"
                    iconColor="text-purple-600 dark:text-[#B48CF7]"
                />
            </div>
            
            <div className="flex flex-1 flex-col min-h-0 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 mb-4 overflow-hidden bg-white dark:bg-[#1A2233]">
                
                <div className="p-4 border-b border-gray-100 dark:border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4">
                    
                    <div className="flex flex-wrap w-full lg:w-auto items-center gap-4">
                        <div className="relative w-full sm:w-72">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar por usuário, ação, nível..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Dropdown
                            className="w-full sm:w-44"
                            value={actionType}
                            onChange={setActionType}
                            placeholder="Tipo de ação"
                            options={[{ value: "", label: "Tipo de ação" }, ...actionOptions]}
                        />

                        <div className="relative w-full sm:w-40">
                            <input
                                type="date"
                                className="w-full pl-4 pr-3 py-2 border border-gray-200 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E] dark:[color-scheme:dark]"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex w-full lg:w-auto items-center justify-end gap-3">
                        <Button
                            variant="outline"
                            className="bg-[#E6F0FF] dark:bg-[#303746] text-[#103D85] dark:text-[#E2E2EA] border-transparent hover:bg-[#D4E5FF] dark:hover:bg-white/5 w-full sm:w-auto"
                        >
                            Exportar
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
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