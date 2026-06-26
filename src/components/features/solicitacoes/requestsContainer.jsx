'use client';

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SolicitacoesTabs from "@/lib/utils/requestTabs";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import { useRequestsList } from "@/hooks/useRequestsList";
import SolicitacoesFilter from "./requestFilter";
import SolicitacoesTable from "./requestTable";

export default function RequestsContainer({ solicitacoesIniciais = [] }) {
    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('todas');
    const router = useRouter();
    const { requests: solicitacoes, loading, error } = useRequestsList(solicitacoesIniciais);

    const statusDisponiveis = useMemo(() => {
        const baseStatuses = ["Em análise", "Reprovado", "Parcial Aprovado", "Aprovado"];
        const apiStatuses = solicitacoes
            .map((item) => item.status || calcularStatusSolicitacao(item.produtos || []))
            .filter(Boolean);

        return [...new Set([...baseStatuses, ...apiStatuses])].map((nome, index) => ({
            id: index + 1,
            nome,
        }));
    }, [solicitacoes]);

    const abas = [
        { valor: 'todas', label: 'TODAS' },
        { valor: 'pendentes', label: 'PENDENTES' },
        { valor: 'concluidas', label: 'CONCLUÍDAS' },
    ];

    const solicitacoesFiltradas = solicitacoes.filter((item) => {
        const produtos = item.produtos || [];
        const statusSolicitacao = item.status || calcularStatusSolicitacao(produtos);

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
                ${item.codigo || ""}
                ${statusSolicitacao || ""}
                Lista de ${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}
                ${produtos.map((p) => p.nome).join(" ")}
                ${item.data || ""}
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

            <div className="flex flex-1 flex-col bg-white border border-[#AAAAAA] rounded-2xl overflow-hidden">
                <SolicitacoesTabs
                    abaAtiva={abaAtiva}
                    setAbaAtiva={setAbaAtiva}
                    titulo="Minhas Solicitações"
                    abas={abas}
                />

                <div className="h-[550px] overflow-y-auto bg-white">
                    {loading && (
                        <div className="p-6 text-center text-sm text-gray-500">Carregando solicitações...</div>
                    )}

                    {!loading && error && (
                        <div className="p-6 text-center text-sm font-semibold text-[#BA1A1A]">{error}</div>
                    )}

                    {!loading && !error && (
                        <SolicitacoesTable
                            itens={solicitacoesFiltradas}
                            onItemClick={(id) => router.push(`/solicitacoes/${id}`)}
                        />
                    )}
                </div>
            </div>
        </>
    );
}