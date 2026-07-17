"use client";

import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export default function ProductTableRow({
    item,
    openModal,
    showItemDecisions = false,
    decision = null,
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
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => onAcceptItem?.(item)}
                            title={decision === "Aprovado" ? "Clique para desfazer" : "Aprovar item"}
                            className={`text-[13px] font-semibold rounded-full px-3 py-1 border transition-colors ${
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
                            className={`text-[13px] font-semibold rounded-full px-3 py-1 border transition-colors ${
                                decision === "Recusado"
                                    ? "bg-[#BA1A1A] border-[#BA1A1A] text-white hover:bg-[#a01717]"
                                    : "text-[#BA1A1A] border-[#BA1A1A] hover:bg-red-50 dark:hover:bg-red-500/10"
                            }`}
                        >
                            Recusar
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
}