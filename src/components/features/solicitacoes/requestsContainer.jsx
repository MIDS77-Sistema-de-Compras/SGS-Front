"use client";

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
    const [abaAtiva, setAbaAtiva] = useState("todas");
    const router = useRouter();

    const statusDisponiveis = [
        { id: 1, nome: "Em an\u00e1lise" },
        { id: 2, nome: "Reprovado" },
        { id: 3, nome: "Parcial Aprovado" },
        { id: 4, nome: "Aprovado" },
    ];

    const abas = [
        { valor: "todas", label: "TODAS" },
        { valor: "pendentes", label: "PENDENTES" },
        { valor: "concluidas", label: "CONCLU\u00cdDAS" },
    ];

    const solicitacoesFiltradas = (solicitacoesIniciais || []).filter((item) => {
        const statusSolicitacao = item.status || calcularStatusSolicitacao(item.produtos);

        if (abaAtiva === "pendentes" && statusSolicitacao !== "Em an\u00e1lise") {
            return false;
        }

        if (
            abaAtiva === "concluidas" &&
            (statusSolicitacao === "Em an\u00e1lise" || statusSolicitacao === "Reprovado")
        ) {
            return false;
        }

        if (status && statusSolicitacao !== status) {
            return false;
        }

        if (data && item.data?.slice(0, 10) !== data) {
            return false;
        }

        if (busca) {
            const textoBusca = busca.toLowerCase();
            const textoPesquisavel = `
                ${item.codigo}
                ${statusSolicitacao}
                ${item.produtos.length > 0 ? `Lista de ${item.produtos.length} ${item.produtos.length === 1 ? "produto" : "produtos"}` : ""}
                ${item.produtos.map((produto) => produto.nome).join(" ")}
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
        </>
    );
}