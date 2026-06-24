'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import SolicitacoesTabs from "@/lib/utils/requestTabs";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import SolicitacoesFilter from "./requestFilter";
import SolicitacoesTable from "./requestTable";

export default function RequestsContainer({ solicitacoesIniciais }) {
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

    const solicitacoesFiltradas = (solicitacoesIniciais || []).filter((item) => {
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
                ${item.produtos.map((p) => p.nome).join(" ")}
                ${item.data}
            `.toLowerCase();

            if (!textoPesquisavel.includes(textoBusca)) {
                return false;
            }
        }

        return true;
    });

    return (
        <>
            <SolicitacoesFilter
                status={status}
                setStatus={setStatus}
                data={data}
                setData={setData}
                busca={busca}
                setBusca={setBusca}
                statusDisponiveis={statusDisponiveis}
            />

            <div className="bg-white border border-[#AAAAAA] rounded-2xl overflow-hidden">
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
        </>
    );
}