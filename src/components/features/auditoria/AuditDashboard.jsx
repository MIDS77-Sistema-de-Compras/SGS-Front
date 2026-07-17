"use client";

import { useMemo, useState } from "react";
import AuditFilters from "./AuditFilters";
import AuditHeader from "./AuditHeader";
import AuditLogTable from "./AuditLogTable";
import AuditPagination from "./AuditPagination";
import AuditSummaryCards from "./AuditSummaryCards";
import { auditActionOptions, auditLogs, auditStats } from "./auditData";

const LOGS_PER_PAGE = 6;

export default function AuditDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredLogs = useMemo(() => auditLogs.filter((log) => {
        const searchableContent = `${log.id} ${log.user} ${log.level} ${log.action} ${log.affectedUser} ${log.request} ${log.timestamp}`.toLowerCase();
        return (!searchTerm || searchableContent.includes(searchTerm.toLowerCase()))
            && (!actionType || log.actionId === actionType)
            && (!period || log.date.includes(period));
    }), [actionType, period, searchTerm]);

    const totalPages = Math.max(1, Math.ceil(filteredLogs.length / LOGS_PER_PAGE));
    const page = Math.min(currentPage, totalPages);
    const paginatedLogs = filteredLogs.slice((page - 1) * LOGS_PER_PAGE, page * LOGS_PER_PAGE);

    function updateFilter(setter) {
        return (value) => {
            setter(value);
            setCurrentPage(1);
        };
    }

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
        <div className="flex flex-1 flex-col pb-4 gap-6">
            <AuditHeader />
            <AuditSummaryCards stats={auditStats} />
            <section className="flex-1 bg-white border border-gray-300 rounded-[14px] shadow-sm overflow-hidden flex flex-col">
                <AuditFilters searchTerm={searchTerm} actionType={actionType} period={period} actionOptions={auditActionOptions} onSearchChange={updateFilter(setSearchTerm)} onActionChange={updateFilter(setActionType)} onPeriodChange={updateFilter(setPeriod)} onExport={handleExport} />
                <div className="flex-1 overflow-x-auto overflow-y-auto"><AuditLogTable logs={paginatedLogs} /></div>
                <AuditPagination currentPage={page} totalPages={totalPages} totalRecords={filteredLogs.length} pageSize={LOGS_PER_PAGE} onPageChange={setCurrentPage} />
            </section>
        </div>
    );
}
