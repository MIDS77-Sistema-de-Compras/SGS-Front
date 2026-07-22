// O backend serializa LocalDateTime sem offset de fuso (ex: "2026-07-22T22:18:00"),
// mas o valor gravado é o relógio do servidor, que em produção roda em UTC. Sem essa
// conversão, o `new Date(...)` do navegador interpreta a string como se já fosse
// horário local, atrasando/adiantando toda exibição de data em algumas horas.
export function parseApiDate(value) {
    if (!value) return null;

    const hasTimezone = /Z$|[+-]\d{2}:?\d{2}$/.test(value);
    const date = new Date(hasTimezone ? value : `${value}Z`);

    return Number.isNaN(date.getTime()) ? null : date;
}

export function calcularTempoDecorrido(dataApi) {
    const dataSolicitacao = parseApiDate(dataApi);
    if (!dataSolicitacao) return "";

    const agora = new Date();
    const diferencaMs = agora - dataSolicitacao;

    if (diferencaMs < 0) return "Agora mesmo";

    const minutos = Math.floor(diferencaMs / (1000 * 60));
    const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
    const dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

    if (minutos < 1) return "Agora mesmo";
    if (minutos < 60) return `Há ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    if (horas < 24) return `Há ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    return `Há ${dias} ${dias === 1 ? 'dia' : 'dias'}`;
}