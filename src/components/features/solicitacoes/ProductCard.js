"use client";

import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export default function ProductCard({
    item,
    openModal,
    isServiceRequest = false,
    showItemDecisions = false,
    decision = null,
    isDeciding = false,
    onAcceptItem,
    onRejectItem,
}) {
    return (
        <div
            onClick={() => openModal(item)}
            className="rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#303746] p-4 shadow-sm cursor-pointer hover:border-[#103D85]/20 dark:hover:border-[#5D8EF7]/30 hover:shadow-md transition-all"
        >
            <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-[15px] text-gray-800 dark:text-[#E2E2EA] break-words min-w-0">
                    {item.code} {item.nome}
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
                        {item.variation || "—"}
                    </dd>
                </div>
                <div>
                    <dt className="text-gray-400 dark:text-[#9AA0B4] text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                        {isServiceRequest ? "Informações" : "Quantidade"}
                    </dt>
                    <dd className="text-[#355C9C] dark:text-[#C3C6D3] font-medium break-words">
                        {item.quantity} {item.unit?.toLowerCase()}
                    </dd>
                </div>
            </dl>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                {showItemDecisions ? (
                    <div className="flex items-center gap-2">
                        <span className={`inline-block w-5 h-5 rounded-full shadow-sm shrink-0 ${getStatusColor(item.status)}`} />
                        <span className="text-sm font-medium text-gray-600 dark:text-[#C3C6D3]">
                            {getStatusLabel(item.status)}
                        </span>
                    </div>
                ) : (
                    <span className={`inline-block whitespace-nowrap text-center text-[12px] font-semibold text-white py-1.5 px-4 rounded-full min-w-[140px] shadow-sm tracking-wide ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                    </span>
                )}

                {showItemDecisions && (
                    decision ? (
                        <span
                            className={`inline-block text-center text-[13px] font-semibold py-1 px-3 rounded-full tracking-wide border ${
                                decision === "Aceito"
                                    ? "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400"
                                    : "text-[#BA1A1A] border-[#BA1A1A] dark:text-[#F87171] dark:border-[#F87171]"
                            }`}
                        >
                            {decision}
                        </span>
                    ) : (
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => onAcceptItem?.(item)}
                                disabled={isDeciding}
                                className="text-[13px] font-semibold text-green-600 border border-green-600 rounded-full px-4 py-1 hover:bg-green-50 dark:hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Aprovar
                            </button>
                            <button
                                onClick={() => onRejectItem?.(item)}
                                disabled={isDeciding}
                                className="text-[13px] font-semibold text-[#BA1A1A] border border-[#BA1A1A] rounded-full px-4 py-1 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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