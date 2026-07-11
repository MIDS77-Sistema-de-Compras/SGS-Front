"use client";

import { useMemo, useState } from "react";
import { 
    ClipboardList, 
    Calendar, 
    LogIn, 
    ShieldAlert,
    Search,
    ChevronDown
} from "lucide-react";
import AuditLogTable from "./AuditLogTable";
import { auditActionOptions, auditLogs, levelStyles } from "./auditData";
import StatCard from "@/components/features/gerenciar-users/StatCard";
import Button from "@/components/ui/button/Button";

export default function AuditDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");

    const totalUsers = 124;
    const activeUsers = 110;
    const inactiveUsers = 14;
    const totalProfiles = Object.keys(levelStyles).length;

    const filteredLogs = useMemo(() => {
        return auditLogs.filter((log) => {
            const searchableContent = `${log.id} ${log.user} ${log.level} ${log.action} ${log.affectedUser} ${log.request} ${log.timestamp}`.toLowerCase();
            
            const matchesSearch = !searchTerm || searchableContent.includes(searchTerm.toLowerCase());
            const matchesAction = !actionType || log.actionId === actionType;
            const matchesPeriod = !period || log.date.includes(period);

            return matchesSearch && matchesAction && matchesPeriod;
        });
    }, [actionType, period, searchTerm]);

    return (
        <div className="flex flex-1 flex-col w-full h-full">
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
                    value={totalUsers}
                    icon={ClipboardList}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="Ações de Hoje"
                    value={activeUsers}
                    icon={Calendar}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatCard
                    title="Tentativas de Login"
                    value={inactiveUsers}
                    icon={LogIn}
                    iconBg="bg-orange-100"
                    iconColor="text-orange-500"
                />
                <StatCard
                    title="Alertas Críticos"
                    value={totalProfiles}
                    icon={ShieldAlert}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
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

                        <div className="relative w-full sm:w-44">
                            <select
                                className="w-full appearance-none border border-gray-200 dark:border-white/15 dark:bg-[#303746] text-gray-700 dark:text-[#E2E2EA] py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E]"
                                value={actionType}
                                onChange={(e) => setActionType(e.target.value)}
                            >
                                <option value="">Tipo de ação</option>
                                {auditActionOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-[#C3C6D3]">
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        <div className="relative w-full sm:w-40">
                            <input
                                type="date"
                                placeholder="Período"
                                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#103D85]/20 focus:border-[#103D85] dark:focus:border-[#1A4A9E]"
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

                <AuditLogTable logs={filteredLogs} />
            </div>
        </div>
    );
}