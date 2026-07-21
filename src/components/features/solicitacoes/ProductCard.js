"use client";

import { getStatusColor, getStatusLabel, getCustomStatusColor } from "@/lib/utils/requestStatus";
import Dropdown from "@/components/ui/select/Dropdown";

export default function ProductCard({
    item,
    openModal,
    isServiceRequest = false,
    showItemDecisions = false,
    decision = null,
    onAcceptItem,
    onRejectItem,
    itemStatusOptions = null,
    onItemStatusChange,
    customStatusColorMap = null,
}) {
    const customColor = getCustomStatusColor(item.status, customStatusColorMap);
    return (
        <div
            onClick={() => openModal(item)}
            className="rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#303746] p-4 shadow-sm cursor-pointer hover:border-[#103D85]/20 dark:hover:border-[#5D8EF7]/30 hover:shadow-md transition-all"
        >
            <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-[15px] text-gray-800 dark:text-[#E2E2EA] break-words min-w-0">
                    {isServiceRequest ? item.nome : `${item.code} ${item.nome}`}
                </p>
                <span className="shrink-0 text-[22px] leading-none text-[#103D85] dark:text-[#5D8EF7]">
                    ›
                </span>
            </div>

            <div className="my-3 h-px bg-gray-100 dark:bg-white/10" />

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                    <dt className="text-gray-400 dark:text-[#9AA0B4] text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                        {isServiceRequest ? "Código" : "Variação"}
                    </dt>
                    <dd className="text-[#355C9C] dark:text-[#C3C6D3] font-medium break-words">
                        {isServiceRequest ? `SERV-${item.id}` : (item.variation || "—")}
                    </dd>
                </div>
                <div>
                    <dt className="text-gray-400 dark:text-[#9AA0B4] text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                        {isServiceRequest ? "Informações" : "Quantidade"}
                    </dt>
                    <dd className="text-[#355C9C] dark:text-[#C3C6D3] font-medium break-words">
                        {isServiceRequest
                            ? (item.description || item.additionalInfo || "—")
                            : `${item.quantity} ${item.unit?.toLowerCase() || ""}`}
                    </dd>
                </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                {showItemDecisions ? (
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-block w-5 h-5 rounded-full shadow-sm shrink-0 ${customColor ? "" : getStatusColor(item.status)}`}
                            style={customColor ? { backgroundColor: customColor } : undefined}
                        />
                        <span className="text-sm font-medium text-gray-600 dark:text-[#C3C6D3]">
                            {getStatusLabel(item.status)}
                        </span>
                    </div>
                ) : (
                    <span
                        className={`inline-block whitespace-nowrap text-center text-[12px] font-semibold text-white py-1.5 px-4 rounded-full min-w-[140px] shadow-sm tracking-wide ${customColor ? "" : getStatusColor(item.status)}`}
                        style={customColor ? { backgroundColor: customColor } : undefined}
                    >
                        {getStatusLabel(item.status)}
                    </span>
                )}

                {showItemDecisions && (
                    itemStatusOptions ? (
                        <div className="w-full min-w-[170px]" onClick={(e) => e.stopPropagation()}>
                            <Dropdown
                                name={`item-status-${item.id}`}
                                value={decision || ""}
                                onChange={(e) => onItemStatusChange?.(item, e.target.value)}
                                placeholder={getStatusLabel(item.status)}
                                options={itemStatusOptions}
                                buttonClassName="py-1.5 text-[13px]"
                            />
                        </div>
                    ) : (
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => onAcceptItem?.(item)}
                                title={decision === "Aprovado" ? "Clique para desfazer" : "Aprovar item"}
                                className={`text-[13px] font-semibold rounded-full px-4 py-1 border transition-colors ${
                                    decision === "Aprovado"
                                        ? "bg-green-600 border-green-600 text-white hover:bg-green-700"
                                        : "text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-500/10"
                                }`}
                            >
                                Aprovar
                            </button>
                            <button
                                onClick={() => onRejectItem?.(item)}
                                title={decision === "Recusado" ? "Clique para desfazer" : "Recusar item"}
                                className={`text-[13px] font-semibold rounded-full px-4 py-1 border transition-colors ${
                                    decision === "Recusado"
                                        ? "bg-[#BA1A1A] border-[#BA1A1A] text-white hover:bg-[#a01717]"
                                        : "text-[#BA1A1A] border-[#BA1A1A] hover:bg-red-50 dark:hover:bg-red-500/10"
                                }`}
                            >
                                Recusar
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
