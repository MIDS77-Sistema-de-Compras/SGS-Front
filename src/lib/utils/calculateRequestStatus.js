export function calcularStatusSolicitacao(produtos = []) {
    if (produtos.length === 0) return "Sem produtos";

    const todosAprovados = produtos.every(p => p.status === "Aprovado");
    const todosReprovados = produtos.every(p => p.status === "Reprovado");
    const todosEmAnalise = produtos.every(p => p.status === "Em análise");

    if (todosAprovados) return "Aprovado";
    if (todosReprovados) return "Reprovado";
    if (todosEmAnalise) return "Em análise";

    return "Parcial Aprovado";
}