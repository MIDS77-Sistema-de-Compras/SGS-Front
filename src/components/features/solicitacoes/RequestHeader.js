"use client";

import Link from "next/link";

export default function RequestHeader({ isSupervisor, codigo, data, totalProducts, statusGeral, corGeral }) {
    return (
        <>
            <div className="flex items-center gap-3 mb-6">
                <Link href="/solicitacoes" className="text-[#103D85] hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </Link>
                <h3 className="text-3xl font-bold text-[#103D85] tracking-tight">Minhas solicitações</h3>
            </div>

            <hr className="border-gray-400 mb-6 -mx-6" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-4">
                    <h4 className="text-2xl font-bold text-gray-900">
                        {isSupervisor ? "Painel Supervisor" : codigo} : Lista de {totalProducts} {totalProducts === 1 ? "produto" : "produtos"}
                    </h4>
                    <span className="text-gray-600 text-base font-medium">
                        Realizada em: {isSupervisor ? "Atual" : new Date(data).toLocaleDateString('pt-BR')}
                    </span>
                </div>
                <span className={`inline-block text-center text-sm font-bold text-white px-6 py-1.5 rounded-full w-33 shadow-sm tracking-wide mr-10 ${corGeral}`}>
                    {statusGeral}
                </span>
            </div>
        </>
    );
}