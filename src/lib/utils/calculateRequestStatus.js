export function calcularStatusSolicitacao(produtos) {
    // Se não tem produto, não tem como calcular status de produto. Retorna null ou "Sem produtos"
    if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
        return "Sem produtos"; 
    }

    const todosAprovados = produtos.every(p => p.status === "Aprovado");
    const todosReprovados = produtos.every(p => p.status === "Reprovado");
    const todosEmAnalise = produtos.every(p => p.status === "Em análise"); // ou "Em andamento", dependendo do que o Java manda nos produtos

    if (todosAprovados) return "Aprovado";
    if (todosReprovados) return "Reprovado";
    if (todosEmAnalise) return "Em análise";

    return "Parcial Aprovado";
}