"use client";

import { useMemo, useState } from "react";
import AuditFilters from "./AuditFilters";
import AuditHeader from "./AuditHeader";
import AuditLogTable from "./AuditLogTable";
import AuditPagination from "./AuditPagination";
import AuditSummaryCards from "./AuditSummaryCards";
import { auditActionOptions, auditLogs, auditStats } from "./auditData";
import AuditDetailsModal from "./AuditDetailsModal";

const LOGS_PER_PAGE = 6;

export default function AuditDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [actionType, setActionType] = useState("");
    const [period, setPeriod] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLog, setSelectedLog] = useState(null);

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

    return (
        <div className="flex flex-1 flex-col pb-4 gap-6">
            <AuditHeader />
            <AuditSummaryCards stats={auditStats} />
            <section className="flex-1 bg-white border border-gray-300 rounded-[14px] shadow-sm overflow-hidden flex flex-col">
                <AuditFilters searchTerm={searchTerm} actionType={actionType} period={period} actionOptions={auditActionOptions} onSearchChange={updateFilter(setSearchTerm)} onActionChange={updateFilter(setActionType)} onPeriodChange={updateFilter(setPeriod)} />
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    <AuditLogTable
                        logs={paginatedLogs}
                        onSelectLog={setSelectedLog}
                    />
                </div>
                <AuditPagination currentPage={page} totalPages={totalPages} totalRecords={filteredLogs.length} pageSize={LOGS_PER_PAGE} onPageChange={setCurrentPage} />
            </section>
            <AuditDetailsModal
                open={!!selectedLog}
                data={selectedLog}
                onClose={() => setSelectedLog(null)}
            />
        </div>
    );
}
