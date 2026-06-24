export const requestTabs = ["PENDENTE", "APROVADAS", "CONCLUÍDAS"];

export const coordinatorRequests = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    title: "Solicitação #1234 pendente",
    subtitle: "Aguardando validação do setor responsável",
    time: "Há 2 horas",
}));