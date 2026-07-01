"use client";

import { useEffect, useMemo, useState } from "react";
import SummaryItem from "./SummaryItem";
import { requestsService } from "@/service/requests";
import { normalizeText } from "@/components/features/notifications/notificationUtils";

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
        const status = normalizeText(request.statusName || "").replace(/_/g, " ");

        if (status.includes("aprov")) {
            return { ...counts, approved: counts.approved + 1 };
        }

        if (status.includes("recus")) {
            return { ...counts, refused: counts.refused + 1 };
        }

        if (status.includes("pend") || status.includes("aguard") || status.includes("andamento") || status.includes("atendimento")) {
            return { ...counts, pending: counts.pending + 1 };
        }

        return counts;
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

    useEffect(() => {
        let isMounted = true;

        async function loadRequests() {
            try {
                const data = await requestsService.findMine();

                if (isMounted) {
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

    const counts = useMemo(() => getSummaryCounts(requests), [requests]);

    return (
        <div className="w-[430px] shrink-0 border border-[#AAAAAA] dark:border-white/10 rounded-xl px-5 py-3 shadow-lg dark:bg-[#1A2233]">
            <div className="flex justify-between mb-7">
                <h2 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">
                    Resumo
                </h2>
                <p className="text-[#103D85] dark:text-[#C3C6D3] text-[12px]">
                    Minhas <br /> solicitações
                </p>
            </div>

            {isLoading && (
                <p className="text-sm text-[#666666]">Carregando resumo...</p>
            )}

            {!isLoading && error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {!isLoading && !error && (
                <ul className="flex flex-col gap-4">
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
