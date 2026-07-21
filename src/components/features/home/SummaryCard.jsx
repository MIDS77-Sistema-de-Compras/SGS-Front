"use client";

import { useEffect, useMemo, useState } from "react";
import SummaryItem from "./SummaryItem";
import SummaryCardSkeleton from "./SummaryCardSkeleton";
import { requestsService, getAllRequests } from "@/service/requests";
import { resolveRequestStatus, getStatusLabel, isVisibleToComprador } from "@/lib/utils/requestStatus";
import { getUserRole } from "@/lib/utils/getUserRole";

const summaryConfig = [
    {
        id: "pending",
        iconSrc: "/images/home/solPendente.png",
        iconSrcDark: "/images/home/solPendente-darktheme.svg",
        iconAlt: "Icone Solicitações Pendentes",
        label: "Pendentes",
    },
    {
        id: "approved",
        iconSrc: "/images/home/solAprovada.png",
        iconSrcDark: "/images/home/solAprovada-darktheme.svg",
        iconAlt: "Icone Solicitações Aprovadas",
        label: "Aprovadas",
    },
    {
        id: "refused",
        iconSrc: "/images/home/solRecusada.png",
        iconSrcDark: "/images/home/solRecusada-darktheme.svg",
        iconAlt: "Icone Solicitações Recusadas",
        label: "Recusadas",
    },
];

function getSummaryCounts(requests) {
    return requests.reduce((counts, request) => {
        const { key } = resolveRequestStatus(request.statusName);

        if (key === "aprovado") {
            return { ...counts, approved: counts.approved + 1 };
        }

        if (key === "recusado") {
            return { ...counts, refused: counts.refused + 1 };
        }

        if (key === "aguardando_aprovacao" || key === "em_atendimento") {
            return { ...counts, pending: counts.pending + 1 };
        }

        return counts;
    }, {
        pending: 0,
        approved: 0,
        refused: 0,
    });
}

// Para o comprador as solicitações vêm sempre pra ele (não existe "comprador
// responsável" no back) — o resumo cobre todas as que já chegaram na etapa de
// compra. Aprovadas = já entregues; Recusadas = pedido cancelado; o resto ainda
// está em andamento (Aprovado, Em atendimento, Atrasada, Parcialmente atendida etc.).
function getCompradorSummaryCounts(requests) {
    return requests.reduce((counts, request) => {
        const label = getStatusLabel(request.statusName);

        if (label === "Entregue") {
            return { ...counts, approved: counts.approved + 1 };
        }

        if (label === "Cancelado") {
            return { ...counts, refused: counts.refused + 1 };
        }

        return { ...counts, pending: counts.pending + 1 };
    }, {
        pending: 0,
        approved: 0,
        refused: 0,
    });
}

function formatCount(value) {
    return String(value).padStart(2, "0");
}

export default function SummaryCard() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [isComprador, setIsComprador] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const comprador = getUserRole() === "COMPRADOR";

        async function loadRequests() {
            try {
                const data = comprador
                    ? (await getAllRequests()).filter((request) => isVisibleToComprador(request.statusName))
                    : await requestsService.findMine();

                if (isMounted) {
                    setIsComprador(comprador);
                    setRequests(Array.isArray(data) ? data : []);
                    setError("");
                }
            } catch {
                if (isMounted) {
                    setError("Nao foi possivel carregar o resumo.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadRequests();

        return () => {
            isMounted = false;
        };
    }, []);

    const counts = useMemo(
        () => (isComprador ? getCompradorSummaryCounts(requests) : getSummaryCounts(requests)),
        [requests, isComprador]
    );

    return (
        <div className="w-full lg:w-[360px] min-[1350px]:w-[430px] lg:shrink-0 border border-gray-100 dark:border-white/10 rounded-xl px-4 sm:px-5 py-4 sm:py-3 shadow-sm dark:bg-[#1A2233]">
            <div className="flex items-start justify-between gap-3 mb-5 sm:mb-7">
                <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[18px] sm:text-[22px]">
                    Resumo
                </h2>
                <p className="shrink-0 text-right text-[#103D85] dark:text-[#C3C6D3] text-[11px] sm:text-[12px] leading-tight">
                    Minhas <br /> solicitações
                </p>
            </div>

            {isLoading && <SummaryCardSkeleton />}

            {!isLoading && error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {!isLoading && !error && (
                <ul className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-4">
                    {summaryConfig.map((item) => (
                        <SummaryItem
                            key={item.id}
                            {...item}
                            count={formatCount(counts[item.id])}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}