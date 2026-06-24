"use client";

import { useEffect, useState } from "react";
import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";
import { api } from "@/service/api";

export default function TodasSolicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await api.get("/requests");
                const dadosMapeados = response.map((req) => ({
                    id: req.id,
                    codigo: `CR-${String(req.id).padStart(4, "0")}`,
                    data: req.requestDate,
                    status: req.statusName,
                    produtos: [],
                }));

                setSolicitacoes(dadosMapeados);
            } catch (err) {
                console.error("Erro ao buscar solicitacoes:", err);
                setError(err.message || "Erro ao carregar a lista de solicitacoes.");
            } finally {
                setLoading(false);
            }
        };

        fetchSolicitacoes();
    }, []);

    if (loading) {
        return <div className="flex-1 bg-white flex items-center justify-center font-sans"><p className="text-gray-500">A carregar solicitacoes...</p></div>;
    }

    if (error) {
        return <div className="flex-1 bg-white flex items-center justify-center font-sans text-red-500 fw-bold"><p>Ocorreu um erro: {error}</p></div>;
    }

    return <div className="flex-1 bg-white pb-12 overflow-y-auto font-sans flex flex-col gap-6"><RequestsContainer solicitacoesIniciais={solicitacoes} /></div>;
}