import { getStatusLabel } from "@/lib/utils/requestStatus";

export function calcularStatusSolicitacao(produtos = []) {
    if (produtos.length === 0) return "Sem produtos";

    const labels = produtos.map((produto) => getStatusLabel(produto.status));
    const todosIguais = labels.every((label) => label === labels[0]);

    return todosIguais ? labels[0] : "Parcial Aprovado";
}
