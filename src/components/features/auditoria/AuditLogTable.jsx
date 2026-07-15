import { ChevronsUpDown, ChevronRight, Clock, User } from "lucide-react";
import LevelBadge from "./LevelBadge";

const columns = [
    { label: "ID", width: "w-[8%]", sortable: true },
    { label: "Usuário", width: "w-[22%]", sortable: true },
    { label: "Nível", width: "w-[12%]", sortable: true },
    { label: "Tipo", width: "w-[15%]", sortable: true },
    { label: "Usuário Afetado", width: "w-[18%]", sortable: false },
    { label: "Solicitação", width: "w-[12%]", sortable: false },
    { label: "Timestamp", width: "w-[13%]", sortable: true },
];

function MobileCard({ log, onSelect }) {
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
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-[#C3C6D3]">
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
    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-[#1A2233]">
            <div className="lg:hidden p-3 space-y-3 max-h-[560px] overflow-y-auto">
                {logs.length > 0 ? (
                    logs.map((log) => (
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

            <div className="hidden lg:block flex-1 min-h-0 overflow-auto">
                <table className="w-full min-w-[980px] text-left border-collapse table-fixed">
                    <thead className="sticky top-0 z-10 bg-[#F8FAFC] dark:bg-[#303746]">
                        <tr className="text-sm font-semibold text-gray-700 dark:text-[#E2E2EA]">
                            {columns.map((col) => (
                                <th key={col.label} className={`py-3 px-4 font-medium ${col.width}`}>
                                    {col.sortable ? (
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-[#103D85] dark:hover:text-[#5D8EF7] transition-colors">
                                            {col.label}
                                            <ChevronsUpDown size={14} className="text-gray-400" />
                                        </div>
                                    ) : (
                                        col.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-sm bg-white dark:bg-[#1A2233]">
                        {logs.map((log) => (
                            <tr
                                key={log.id}
                                onClick={() => onSelectLog(log)}
                                className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <td className="py-3 px-4 text-gray-700 dark:text-[#E2E2EA] font-medium">
                                    {log.id}
                                </td>

                                <td className="py-3 px-4 font-medium text-gray-800 dark:text-[#E2E2EA] truncate">
                                    {log.user}
                                </td>

                                <td className="py-3 px-4">
                                    <LevelBadge level={log.level} />
                                </td>

                                <td className="py-3 px-4 text-gray-600 dark:text-[#C3C6D3] truncate">
                                    {log.action}
                                </td>

                                <td className="py-3 px-4 text-gray-500 dark:text-[#C3C6D3] truncate">
                                    {log.affectedUser || "-"}
                                </td>

                                <td className="py-3 px-4 text-gray-500 dark:text-[#C3C6D3] truncate">
                                    {log.request || "-"}
                                </td>

                                <td className="py-3 px-4 text-gray-400 dark:text-[#A0A5B5] whitespace-nowrap">
                                    {log.timestamp}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {logs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-sm text-gray-500 dark:text-[#C3C6D3]">
                            Nenhum registro encontrado.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}