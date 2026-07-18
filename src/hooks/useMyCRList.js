import { useState, useMemo } from "react";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import {
    getStatusCategory,
    getStatusLabel,
    REQUEST_STATUS_FILTER_OPTIONS,
} from "@/lib/utils/requestStatus";

export function useRequestsFilter(solicitacoes = []) {
    const [status, setStatus] = useState("");
    const [data, setData] = useState("");
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('todas');

    const statusDisponiveis = useMemo(() => {
        return REQUEST_STATUS_FILTER_OPTIONS
            .filter((option) => option.value)
            .map((option, index) => ({ id: index + 1, nome: option.label }));
    }, []);

    const solicitacoesFiltradas = useMemo(() => {
        return solicitacoes.filter((item) => {
            const produtos = item.produtos || [];
            const statusSolicitacao = item.status || calcularStatusSolicitacao(produtos);
            const categoria = getStatusCategory(statusSolicitacao, item.statusCategory);
            const statusLabel = getStatusLabel(statusSolicitacao);

            if (abaAtiva === "pendentes" && categoria !== "pendente") {
                return false;
            }

            if (abaAtiva === "concluidas" && categoria !== "concluida") {
                return false;
            }

            if (status && statusLabel !== status) {
                return false;
            }

            if (data && item.data !== data) {
                return false;
            }

            if (busca) {
                const textoBusca = busca.toLowerCase();
                const textoPesquisavel = `
                    ${item.codigo || ""}
                    ${statusLabel || ""}
                    Lista de ${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}
                    ${produtos.map((p) => p.nome).join(" ")}
                    ${item.data || ""}
                    ${item.data ? new Date(`${item.data}T00:00:00`).toLocaleDateString("pt-BR") : ""}
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