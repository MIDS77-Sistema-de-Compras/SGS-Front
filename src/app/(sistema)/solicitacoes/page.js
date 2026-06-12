'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import SolicitacoesFilter from "@/components/features/supervisor/requestFilter";
import SolicitacoesTable from "@/components/features/supervisor/requestTable";
import SolicitacoesTabs from "@/lib/utils/requestTabs";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";


export default function TodasSolicitacoes() {

    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('todas');
    const router = useRouter();

    const statusDisponiveis = [
        { id: 1, nome: "Em análise" },
        { id: 2, nome: "Reprovado" },
        { id: 3, nome: "Parcial Aprovado" },
        { id: 4, nome: "Aprovado" }
    ];

    const abas = [
        { valor: 'todas', label: 'TODAS' },
        { valor: 'pendentes', label: 'PENDENTES' },
        { valor: 'concluidas', label: 'CONCLUÍDAS' },
    ];

    const solicitacoes = [
        { id: 1, codigo: "CR-0013", data: "2026-03-10", produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" },
            { id: 3, nome: "Monitor", status: "Reprovado" }
        ]},
        { id: 2, codigo: "CR-1377", data: "2026-03-12", produtos: [
            { id: 1, nome: "Mouse", status: "Em análise" },
            { id: 2, nome: "Teclado", status: "Em análise" }
        ]},
        { id: 3, codigo: "CR-2606", data: "2026-04-12", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" }
        ]},
        { id: 4, codigo: "CR-0020", data: "2026-04-15", produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" },
            { id: 3, nome: "Monitor", status: "Reprovado" }
        ]},
        { id: 5, codigo: "CR-1567", data: "2026-04-30", produtos: [
            { id: 1, nome: "Mouse", status: "Em análise" },
            { id: 2, nome: "Teclado", status: "Em análise" }
        ]},
        { id: 6, codigo: "CR-2093", data: "2026-05-01", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" },
            { id: 3, nome: "Monitor", status: "Aprovado" }
        ]},
        { id: 7, codigo: "CR-3048", data: "2026-05-05", produtos: [
            { id: 1, nome: "Mouse", status: "Aprovado" },
            { id: 2, nome: "Teclado", status: "Reprovado" }
        ]},
        { id: 8, codigo: "CR-4009", data: "2026-05-12", produtos: [
            { id: 1, nome: "Mouse", status: "Reprovado" },
            { id: 2, nome: "Teclado", status: "Aprovado" },
            { id: 3, nome: "Monitor", status: "Aprovado" }
        ]}
    ];

    const solicitacoesFiltradas = solicitacoes.filter((item) => {
        const statusSolicitacao = calcularStatusSolicitacao(item.produtos);

        if (abaAtiva === "pendentes" && statusSolicitacao !== "Em análise") {
            return false;
        }

        if (
            abaAtiva === "concluidas" &&
            (statusSolicitacao === "Em análise" || statusSolicitacao === "Reprovado")
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
        <div className="flex-1 bg-white pb-12 overflow-y-auto font-sans flex flex-col gap-6">

            <SolicitacoesFilter
                status={status}
                setStatus={setStatus}
                data={data}
                setData={setData}
                busca={busca}
                setBusca={setBusca}
                statusDisponiveis={statusDisponiveis}
            />

            <div className="bg-white border border-[#797979] rounded-2xl overflow-hidden">
                <SolicitacoesTabs
                    abaAtiva={abaAtiva}
                    setAbaAtiva={setAbaAtiva}
                    titulo="Minhas Solicitações"
                    abas={abas}
                />

                <div className="h-[550px] overflow-y-auto bg-white">
                    <SolicitacoesTable
                        itens={solicitacoesFiltradas}
                        onItemClick={(id) => router.push(`/solicitacoes/${id}`)}
                    />
                </div>
            </div>
        </div>
    );
}