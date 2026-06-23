"use client";

import { useState, useEffect } from "react";
import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";
import { api } from "@/service/api";

export default function TodasSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await api.get('/requests');

                // Mapeamento corrigido baseado na sua base de dados PostgreSQL
                const dadosMapeados = response.map(req => {
                    // 1. Tratamento do Código
                    const codigoVisual = `CR-${String(req.id).padStart(4, '0')}`;

                    // 2. Tratamento da Data
                    let dataAjustada = req.requestDate || req.request_date || req.date || req.data;
                    if (Array.isArray(dataAjustada)) {
                        const d = new Date(dataAjustada[0], dataAjustada[1] - 1, dataAjustada[2]);
                        dataAjustada = d.toISOString();
                    }

                    // 3. Tratamento do Status do Banco (Convertendo Número para Texto)
                    // Pega o status_id da solicitação (ajuste os números conforme as regras do seu banco)
                    const statusId = req.statusId || req.status_id || req.status || 1;
                    let statusTexto = "Em andamento"; // Padrão para o número 1

                    if (statusId === 2) statusTexto = "Aprovado";
                    if (statusId === 3) statusTexto = "Reprovado";

                    return {
                        id: req.id,
                        codigo: codigoVisual,
                        data: dataAjustada,
                        status: statusTexto, // Enviando o status já traduzido da Solicitação!

                        produtos: (req.items || req.products || req.produtos || []).map(prod => {
                            // Se os produtos também tiverem status numérico, traduzimos aqui também
                            const prodStatusId = prod.statusId || prod.status_id || prod.status || 1;
                            let prodStatusTexto = "Em andamento";
                            if (prodStatusId === 2) prodStatusTexto = "Aprovado";
                            if (prodStatusId === 3) prodStatusTexto = "Reprovado";

                            return {
                                id: prod.id,
                                nome: prod.name || prod.nome || "Produto genérico",
                                status: prodStatusTexto
                            };
                        })
                    };
                });

                setSolicitacoes(dadosMapeados);
            } catch (err) {
                console.error("Erro ao buscar solicitações:", err);

                setError(err.message || "Erro ao carregar a lista de solicitações.");
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitacoes();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 bg-white flex items-center justify-center font-sans">
                <p className="text-gray-500">A carregar solicitações...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 bg-white flex items-center justify-center font-sans text-red-500 fw-bold">
                <p>Ocorreu um erro: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white pb-12 overflow-y-auto font-sans flex flex-col gap-6">
            <RequestsContainer solicitacoesIniciais={solicitacoes} />
        </div>
    );
}