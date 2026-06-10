'use client';

import TopBar from "@/components/topbar/Topbar";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/login/Input";

export default function TodasSolicitacoes() {

    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('todas');

    const statusDisponiveis = [
        { id: 1, nome: "Em análise" },
        { id: 2, nome: "Reprovado" },
        { id: 3, nome: "Parcial Aprovado" },
        { id: 4, nome: "Aprovado" }
    ]

    const STATUS_CORES = {
        "Em análise": "bg-[#EDAE28]",
        "Reprovado": "bg-[#E30613]",
        "Parcial Aprovado": "bg-[#0084FF]",
        "Aprovado": "bg-[#4CAF50]"
    };

   const solicitacoes = [
    {
        id: 1,
        codigo: "CR-0013",
        data: "2026-03-10",
        produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" },
            { id: 3, nome: "Monitor", status: "Reprovado" }
        ]
    },
    {
        id: 2,
        codigo: "CR-1377",
        data: "2026-03-12",
        produtos: [
            { id: 1, nome: "Mouse", status: "Em análise" },
            { id: 2, nome: "Teclado", status: "Em análise" }
        ]
    },
    {
        id: 3,
        codigo: "CR-2606",
        data: "2026-04-12",
        produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" }
        ]
    },
     {
        id: 4,
        codigo: "CR-0020",
        data: "2026-04-15",
        produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" },
            { id: 3, nome: "Monitor", status: "Reprovado" }
        ]
    },
    {
        id: 5,
        codigo: "CR-1567",
        data: "2026-04-30",
        produtos: [
            { id: 1, nome: "Mouse", status: "Em análise" },
            { id: 2, nome: "Teclado", status: "Em análise" }
        ]
    },
     {
        id: 6,
        codigo: "CR-2093",
        data: "2026-05-01",
        produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" },
            { id: 3, nome: "Monitor", status: "Aprovado" }
        ]
    },
    {
        id: 7,
        codigo: "CR-3048",
        data: "2026-05-05",
        produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]
    },
    {
        id: 8,
        codigo: "CR-4009",
        data: "2026-05-12",
        produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" },
            { id: 3, nome: "Monitor", status: "Aprovado" }
        ]
    }
    ];

    return (
        <div className="absolute inset-y-0 right-0 w-[1500px] left-[260px] bg-[#FFFFFF] px-12 pb-12 overflow-y-auto font-sans flex flex-col gap-6">
            <TopBar />

            {/* Filtros */}
            <div className="bg-white rounded-xl border border-[#797979] flex flex-row justify-between p-2">
                <div className='flex flex-row items-center px-4'>
                    <Image
                        src={'/images/icons/filtrar.png'}
                        alt="Ícone de filtros"
                        height={21}
                        width={21}
                        className="w-5 h-5"
                    >

                    </Image>

                    <div className='text-xl text-[#133D87] pl-3 pr-64'>
                        <p>Filtrar</p>
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none pl-3 w-[200px] py-2 border border-[#797979] rounded-xl text-sm text-[#374151] bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#103D85]"
                    >

                        <option value="">Status</option>
                        {statusDisponiveis.map((item) => (
                            <option key={item.id} value={item.nome}>
                                {item.nome}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="relative">
                        <Input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="!h-auto py-2 text-sm !border-[#797979]"
                        />
                </div>

                <div className='flex flex-row items-center w-[400px] px-3 border border-[#797979] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#103D85]'>
                    <Image
                        src={'/images/icons/lupa.png'}
                        alt="Ícone de lupa"
                        height={21}
                        width={21}
                        className="w-5 h-5"
                    >
                    </Image>

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className='pl-2 w-full py-2 text-sm focus:outline-none focus:ring-0 border-none bg-transparent'
                    />
                </div>
            </div>

            <div className="bg-white border border-[#797979] rounded-2xl overflow-hidden">
                <div className="flex justify-between items-end px-6 pt-4 border-b border-[#797979]">

                    <h2 className="text-4xl font-bold text-[#133D87] pb-3">
                        Minhas Solicitações
                    </h2>

                    {/* ABAS */}
                    <div className="flex gap-3">
                        <button
                                onClick={() => setAbaAtiva('todas')}
                                className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border border-[#797979]
                                    ${
                                        abaAtiva === 'todas'
                                            ? 'border-b-white text-[#133D87] font-semibold bg-white'
                                            : 'text-gray-500 bg-white'
                                    }`}
                            >
                                TODAS
                        </button>
                        <button
                                onClick={() => setAbaAtiva('pendentes')}
                                className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border border-[#797979]
                                    ${
                                        abaAtiva === 'pendentes'
                                            ? 'border-b-white text-[#133D87] font-semibold bg-white'
                                            : 'text-gray-500 bg-white'
                                    }`}
                            >
                                PENDENTES
                        </button>
                        <button
                                onClick={() => setAbaAtiva('concluidas')}
                                className={`py-2 min-w-[150px] rounded-t-[18px] mb-[-1px] border border-[#797979]
                                    ${
                                        abaAtiva === 'concluidas'
                                            ? 'border-b-white text-[#133D87] font-semibold bg-white'
                                            : 'text-gray-500 bg-white'
                                    }`}
                            >
                                CONCLUÍDAS
                        </button>
                    </div>

                </div>

                <div className="h-[550px] overflow-y-auto bg-white">
                    {(() => {
                        const solicitacoesFiltradas = solicitacoes.filter((item) => {
                            const statusSolicitacao = calcularStatusSolicitacao(item.produtos);

                            if (abaAtiva === "pendentes" && statusSolicitacao !== "Em análise") {
                                return false;
                            }

                            if (
                                abaAtiva === "concluidas" &&
                                (statusSolicitacao === "Em análise" ||
                                statusSolicitacao === "Reprovado")
                            ) {
                                return false;
                            }

                            if (status && statusSolicitacao !== status) {
                                return false;
                            }

                            if (data && item.data !== data) {
                                return false;
                            }

                            if (busca) {
                                const textoBusca = busca.toLowerCase();

                                const textoPesquisavel = `
                                    ${item.codigo}
                                    ${statusSolicitacao}
                                    Lista de ${item.produtos.length} ${item.produtos.length === 1 ? "produto" : "produtos"}
                                    ${item.produtos.map(produto => produto.nome).join(" ")}
                                    ${item.data}
                                `.toLowerCase();

                                if (!textoPesquisavel.includes(textoBusca)) {
                                    return false;
                                }
                            }

                            return true;
                        });

                        return (
                            <div className="flex flex-col">
                                {solicitacoesFiltradas.map((item) => {
                                    const statusSolicitacao = calcularStatusSolicitacao(item.produtos);

                                        const corDefinida =
                                            STATUS_CORES[statusSolicitacao] || "bg-gray-400";

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex text-lg items-center justify-between py-5 border-b border-gray-200"
                                        >
                                            <div className="flex items-center gap-20 px-6">
                                                <span className="font-bold text-[#333333]">
                                                    {item.codigo}: Lista de {item.produtos.length}{" "}
                                                    {item.produtos.length === 1 ? "produto" : "produtos"}
                                                </span>

                                                <span className="text-lg text-[#555555] px-6">
                                                    {new Date(item.data).toLocaleDateString('pt-BR')}
                                                </span>
                                            </div>

                                            <div className="px-6">
                                                <button
                                                    className={`px-6 py-1 text-white text-base rounded-full min-w-[180px] ${corDefinida}`}
                                                >
                                                    {statusSolicitacao}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );

                      
                    })()}
                </div>
            </div>
        </div>
    )
}

function calcularStatusSolicitacao(produtos) {
    const todosAprovados = produtos.every(
        produto => produto.status === "Aprovado"
    );

    const todosReprovados = produtos.every(
        produto => produto.status === "Reprovado"
    );

    const todosEmAnalise = produtos.every(
        produto => produto.status === "Em análise"
    );

    if (todosAprovados) {
        return "Aprovado";
    }

    if (todosReprovados) {
        return "Reprovado";
    }

    if (todosEmAnalise) {
        return "Em análise";
    }

    return "Parcial Aprovado";
}