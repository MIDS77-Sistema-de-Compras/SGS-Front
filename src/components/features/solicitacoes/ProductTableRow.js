"use client";

import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export default function ProductTableRow({ item, isProfessor, openModal, openEditModal }) {
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
                {isProfessor && getStatusLabel(item.status) === "Aguardando aprovação" && (
                    <button
                        onClick={() => openEditModal(item)}
                        title="Editar solicitação"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                        </svg>
                    </button>
                )}
            </td>
        </tr>
    );
}