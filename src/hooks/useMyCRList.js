import { useState, useMemo } from "react";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";

export function useRequestsFilter(solicitacoes = []) {
    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('todas');

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

    const solicitacoesFiltradas = useMemo(() => {
        return solicitacoes.filter((item) => {
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
    }, [solicitacoes, abaAtiva, status, data, busca]);

    return {
        filtros: { status, data, busca, abaAtiva },
        acoes: { setStatus, setData, setBusca, setAbaAtiva },
        statusDisponiveis,
        solicitacoesFiltradas
    };
}