"use client";

export default function ProductTableRow({ item, isProfessor, statusCores, openModal, openEditModal }) {
    return (
        <tr className="hover:bg-gray-50/40 transition-colors">
            <td 
                className="py-5 px-6 text-left text-base text-gray-700 font-medium truncate w-[100px] cursor-pointer" 
                onClick={() => openModal(item)}
            >
                {item.code} {item.nome}
            </td>
            <td 
                className="py-5 px-10 text-left text-base text-gray-500 truncate w-[20px] cursor-pointer" 
                onClick={() => openModal(item)}
            >
                {item.variation}
            </td>
            <td className="py-5 px-4 text-center text-base text-gray-600 font-medium">
                {item.quantity} {item.unit?.toLowerCase()}
            </td>
            <td className="py-5 px-4 text-center text-base">
                <button
                    onClick={() => openModal(item)}
                    className="text-gray-400 underline underline-offset-2 hover:text-gray-600 text-sm transition-colors"
                >
                    Ver mais
                </button>
            </td>
            <td className="py-5 px-6 text-center relative">
                <span className={`inline-block text-center text-sm font-bold text-white px-5 py-1.5 rounded-full w-33 shadow-sm tracking-wide ${statusCores[item.status] || "bg-gray-400"}`}>
                    {item.status}
                </span>
                {isProfessor && item.status === "Em análise" && (
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