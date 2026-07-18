import { useState, useMemo } from "react";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import {
    getStatusCategory,
    getStatusLabel,
    REQUEST_STATUS_FILTER_OPTIONS,
} from "@/lib/utils/requestStatus";


function toIsoDateString(value) {
    if (!value) return "";
    const str = String(value).trim();

    if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);

    const brMatch = str.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (brMatch) return `${brMatch[3]}-${brMatch[2]}-${brMatch[1]}`;

    return "";
}

function formatBrDateString(isoDate) {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
}

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

            const itemIsoDate = toIsoDateString(item.data || item.requestDate);

            if (data && itemIsoDate !== data) {
                return false;
            }

            if (busca) {
                const textoBusca = busca.toLowerCase();
                const textoPesquisavel = `
                    ${item.codigo || ""}
                    ${statusLabel || ""}
                    Lista de ${produtos.length} ${produtos.length === 1 ? "produto" : "produtos"}
                    ${produtos.map((p) => p.nome).join(" ")}
                    ${itemIsoDate}
                    ${formatBrDateString(itemIsoDate)}
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