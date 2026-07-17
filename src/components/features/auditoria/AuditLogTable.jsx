"use client";

import { useMemo, useState } from "react";
import { ChevronsUpDown, ChevronUp, ChevronDown, ChevronRight, Clock, User } from "lucide-react";
import LevelBadge from "./LevelBadge";

const columns = [
    { label: "ID", field: "id", type: "number", width: "w-[8%]", sortable: true },
    { label: "Usuário", field: "user", type: "text", width: "w-[22%]", sortable: true },
    { label: "Nível", field: "level", type: "text", width: "w-[12%]", sortable: true },
    { label: "Tipo", field: "action", type: "text", width: "w-[15%]", sortable: true },
    { label: "Usuário Afetado", field: "affectedUser", width: "w-[18%]", sortable: false },
    { label: "Solicitação", field: "request", width: "w-[12%]", sortable: false },
    { label: "Timestamp", field: "timestamp", type: "date", width: "w-[13%]", sortable: true },
];

const CRITICAL_ACTION_REGEX = /DESATI|EXCLU|REMOV|ATUALI/;

function isCriticalAction(log) {
    return CRITICAL_ACTION_REGEX.test((log.actionId || "").toUpperCase());
}

function parseBrDate(value) {
    if (!value) return null;

    const [datePart, timePart = "00:00"] = String(value).split(" ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    if (!day || !month || !year) return null;

    return new Date(year, month - 1, day, hours || 0, minutes || 0);
}

function compareValues(a, b, type) {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    if (type === "number") {
        return Number(a) - Number(b);
    }

    if (type === "date") {
        const dateA = parseBrDate(a);
        const dateB = parseBrDate(b);
        if (dateA && dateB) {
            return dateA.getTime() - dateB.getTime();
        }
    }

    return String(a).localeCompare(String(b), "pt", { numeric: true, sensitivity: "base" });
}

function MobileCard({ log, onSelect }) {
    const critical = isCriticalAction(log);

    return (
        <button
            type="button"
            onClick={() => onSelect(log)}
            className="w-full text-left p-3 sm:p-4 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#1A2233] hover:border-[#103D85]/20 dark:hover:border-[#5D8EF7]/30 hover:shadow-sm transition-all"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-[#A0A5B5]">
                        <Clock size={14} />
                        <span>{log.timestamp}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 min-w-0">
                        <User size={16} className="text-gray-400 flex-shrink-0" />
                        <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-[#E2E2EA] truncate">
                            {log.user}
                        </p>
                    </div>
                </div>

                <ChevronRight size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
            </div>

            <div className="mt-2.5 sm:mt-3 flex items-center gap-2 flex-wrap">
                <LevelBadge level={log.level} />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${critical
                        ? "bg-purple-100 text-purple-600 dark:bg-[#7C3AED]/20 dark:text-[#B48CF7] font-semibold"
                        : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-[#C3C6D3]"
                    }`}>
                    {log.action}
                </span>
            </div>

            {(log.affectedUser || log.request) && (
                <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2 text-[13px] sm:text-sm">
                    {log.affectedUser && (
                        <div>
                            <p className="text-gray-500 dark:text-[#A0A5B5] text-xs uppercase tracking-wide">
                                Usuário afetado
                            </p>
                            <p className="text-gray-700 dark:text-[#C3C6D3] break-all">
                                {log.affectedUser}
                            </p>
                        </div>
                    )}

                    {log.request && (
                        <div>
                            <p className="text-gray-500 dark:text-[#A0A5B5] text-xs uppercase tracking-wide">
                                Solicitação
                            </p>
                            <p className="text-gray-700 dark:text-[#C3C6D3]">{log.request}</p>
                        </div>
                    )}
                </div>
            )}
        </button>
    );
}

export default function AuditLogTable({ logs, onSelectLog }) {
    const [sortField, setSortField] = useState("timestamp");
    const [sortDirection, setSortDirection] = useState("desc");

    function handleSort(column) {
        if (!column.sortable) return;

        if (sortField === column.field) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(column.field);
            setSortDirection("asc");
        }
    }

    const sortedLogs = useMemo(() => {
        if (!sortField) return logs;

        const column = columns.find((col) => col.field === sortField);
        const type = column?.type ?? "text";

        return [...logs].sort((a, b) => {
            const result = compareValues(a[sortField], b[sortField], type);
            return sortDirection === "asc" ? result : -result;
        });
    }, [logs, sortField, sortDirection]);

    function renderSortIcon(column) {
        if (sortField !== column.field) {
            return <ChevronsUpDown size={14} className="text-gray-400" />;
        }
        return sortDirection === "asc"
            ? <ChevronUp size={14} className="text-[#103D85] dark:text-[#5D8EF7]" />
            : <ChevronDown size={14} className="text-[#103D85] dark:text-[#5D8EF7]" />;
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 w-full bg-white dark:bg-[#1A2233] overflow-hidden">
            {/* ===== Mobile/tablet: cards ===== */}
            <div className="lg:hidden p-3 space-y-3 max-h-[560px] overflow-y-auto">
                {sortedLogs.length > 0 ? (
                    sortedLogs.map((log) => (
                        <MobileCard key={log.id} log={log} onSelect={onSelectLog} />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-sm text-gray-500 dark:text-[#C3C6D3]">
                            Nenhum registro encontrado.
                        </p>
                    </div>
                )}
            </div>

            <div className="hidden lg:block flex-1 min-h-0 w-full overflow-auto pr-2 pb-2">
                <table className="w-full text-left border-separate border-spacing-0 table-fixed min-w-[860px]">
                    <thead>
                        <tr className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA]">
                            {columns.map((col) => (
                                <th
                                    key={col.label}
                                    className={`sticky top-0 z-10 py-3 px-4 font-medium bg-[#F8FAFC] dark:bg-[#303746] shadow-[0_1px_0_0_rgba(243,244,246,1)] dark:shadow-[0_1px_0_0_#303746] ${col.width}`}
                                >
                                    {col.sortable ? (
                                        <div
                                            onClick={() => handleSort(col)}
                                            className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7]"
                                        >
                                            {col.label} {renderSortIcon(col)}
                                        </div>
                                    ) : (
                                        col.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-sm bg-white dark:bg-[#1A2233]">
                        {sortedLogs.map((log) => {
                            const critical = isCriticalAction(log);

                            return (
                                <tr
                                    key={log.id}
                                    onClick={() => onSelectLog(log)}
                                    className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    <td className="py-2.5 px-4 w-[8%] text-gray-700 dark:text-[#E2E2EA] font-medium">
                                        {log.id}
                                    </td>

                                    <td className="py-2.5 px-4 w-[22%] font-medium text-gray-800 dark:text-[#E2E2EA] truncate">
                                        {log.user}
                                    </td>

                                    <td className="py-2.5 px-4 w-[12%]">
                                        <LevelBadge level={log.level} />
                                    </td>

                                    <td className="py-2.5 px-4 w-[15%] truncate">
                                        {critical ? (
                                            <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-600 dark:bg-[#7C3AED]/20 dark:text-[#B48CF7]">
                                                {log.action}
                                            </span>
                                        ) : (
                                            <span className="text-gray-600 dark:text-[#C3C6D3]">
                                                {log.action}
                                            </span>
                                        )}
                                    </td>

                                    <td className="py-2.5 px-4 w-[18%] text-gray-500 dark:text-[#C3C6D3] truncate">
                                        {log.affectedUser || "-"}
                                    </td>

                                    <td className="py-2.5 px-4 w-[12%] text-gray-500 dark:text-[#C3C6D3] truncate">
                                        {log.request}
                                    </td>

                                    <td className="py-2.5 px-4 w-[13%] text-gray-400 dark:text-[#A0A5B5] whitespace-nowrap">
                                        {log.timestamp}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {logs.length === 0 && (
                    <p className="px-6 py-8 text-center text-sm text-gray-500 dark:text-[#C3C6D3]">
                        Nenhum registro encontrado.
                    </p>
                )}
            </div>
        </div>
    );
}