"use client";

import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export default function ProductTableRow({
    item,
    openModal,
    showItemDecisions = false,
    decision = null,
    isDeciding = false,
    onAcceptItem,
    onRejectItem,
}) {
    const tdHoverAndRoundedClass = "transition-colors mt-2 group-hover:bg-gray-50 dark:group-hover:bg-white/10 first:rounded-l-xl last:rounded-r-xl";

    return (
        <tr className="group">
            <td 
                className={`py-3 pl-6 text-left text-base text-gray-700 dark:text-[#E2E2EA] font-medium truncate w-[100px] cursor-pointer ${tdHoverAndRoundedClass}`} 
                onClick={() => openModal(item)}
            >
                {item.code} {item.nome}
            </td>
            <td 
                className={`py-3 pl-10 text-left text-base text-gray-500 dark:text-[#C3C6D3] truncate w-[20px] cursor-pointer ${tdHoverAndRoundedClass}`} 
                onClick={() => openModal(item)}
            >
                {item.variation}
            </td>
            <td className={`py-3 text-center text-base text-gray-600 dark:text-[#C3C6D3] font-medium ${tdHoverAndRoundedClass}`}>
                {item.quantity} {item.unit?.toLowerCase()}
            </td>
            <td className={`py-3 pl-5 text-center text-base ${tdHoverAndRoundedClass}`}>
                <button
                    onClick={() => openModal(item)}
                    className="text-gray-400 dark:text-[#5D8EF7] underline underline-offset-2 hover:text-gray-600 dark:hover:text-[#7BA5F9] text-sm transition-colors"
                >
                    Ver mais
                </button>
            </td>
            <td className={`py-3 text-center relative ${tdHoverAndRoundedClass}`}>
                {showItemDecisions ? (
                    <div className="flex items-center justify-center" title={getStatusLabel(item.status)}>
                        <span className={`inline-block w-6 h-6 rounded-full shadow-sm ${getStatusColor(item.status)}`} />
                    </div>
                ) : (
                    <span className={`inline-block text-center text-[14px] font-semibold text-white py-1 px-3 rounded-full min-w-[150px] shadow-sm tracking-wide ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                    </span>
                )}
            </td>

            {showItemDecisions && (
                <td className={`py-3 text-center ${tdHoverAndRoundedClass}`}>
                    {decision ? (
                        <span
                            className={`inline-block text-center text-[14px] font-semibold py-1 px-3 rounded-full tracking-wide border ${
                                decision === "Aceito"
                                    ? "text-green-600 border-green-600 dark:text-green-400 dark:border-green-400"
                                    : "text-[#BA1A1A] border-[#BA1A1A] dark:text-[#F87171] dark:border-[#F87171]"
                            }`}
                        >
                            {decision}
                        </span>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => onAcceptItem?.(item)}
                                disabled={isDeciding}
                                className="text-[13px] font-semibold text-green-600 border border-green-600 rounded-full px-3 py-1 hover:bg-green-50 dark:hover:bg-green-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Aprovar
                            </button>
                            <button
                                onClick={() => onRejectItem?.(item)}
                                disabled={isDeciding}
                                className="text-[13px] font-semibold text-[#BA1A1A] border border-[#BA1A1A] rounded-full px-3 py-1 hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Recusar
                            </button>
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
}