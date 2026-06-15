export function calcularTempoDecorrido(dataApi) {
    if (!dataApi) return "";

    const agora = new Date();
    const dataSolicitacao = new Date(dataApi);
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