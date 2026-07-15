"use client";

import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export default function ProductTableRow({ item, openModal, canDecideItem = false, onApproveItem, onRejectItem }) {
    return (
        <tr className="hover:bg-gray-50/40 dark:hover:bg-white/5 transition-colors">
            <td 
                className="py-3 pl-6 text-left text-base text-gray-700 dark:text-[#E2E2EA] font-medium truncate w-[100px] cursor-pointer" 
                onClick={() => openModal(item)}
            >
                {item.code} {item.nome}
            </td>
            <td 
                className="py-3 pl-10 text-left text-base text-gray-500 dark:text-[#C3C6D3] truncate w-[20px] cursor-pointer" 
                onClick={() => openModal(item)}
            >
                {item.variation}
            </td>
            <td className="py-3 text-center text-base text-gray-600 dark:text-[#C3C6D3] font-medium">
                {item.quantity} {item.unit?.toLowerCase()}
            </td>
            <td className="py-3 pl-5 text-center text-base">
                <button
                    onClick={() => openModal(item)}
                    className="text-gray-400 dark:text-[#5D8EF7] underline underline-offset-2 hover:text-gray-600 dark:hover:text-[#7BA5F9] text-sm transition-colors"
                >
                    Ver mais
                </button>
            </td>
            <td className="py-3 text-center relative">
                <span className={`inline-block text-center text-[14px] font-semibold text-white py-1 px-3 rounded-full min-w-[150px] shadow-sm tracking-wide ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                </span>
                {canDecideItem && (
                    <div className="flex justify-center gap-2 mt-2">
                        <button
                            onClick={() => onApproveItem(item)}
                            className="rounded-full bg-green-600 text-white text-xs font-bold px-4 py-1 hover:opacity-90 transition-opacity"
                        >
                            Aprovar
                        </button>
                        <button
                            onClick={() => onRejectItem(item)}
                            className="rounded-full bg-red-600 text-white text-xs font-bold px-4 py-1 hover:opacity-90 transition-opacity"
                        >
                            Recusar
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}