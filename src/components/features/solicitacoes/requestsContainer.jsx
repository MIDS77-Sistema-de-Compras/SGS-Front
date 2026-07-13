'use client';

import { useRouter } from "next/navigation";
import SolicitacoesTabs from "@/lib/utils/requestTabs";
import { useRequestsList } from "@/hooks/useRequestsList";
import { getMyRequests } from "@/service/requests";
import { useRequestsFilter } from "@/hooks/useMyCRList";
import SolicitacoesFilter from "./requestFilter";
import SolicitacoesTable from "./requestTable";
import RequestsTableSkeleton from "./RequestsTableSkeleton";

export default function RequestsContainer({ solicitacoesIniciais = [] }) {
    const router = useRouter();
    
    const { requests: solicitacoes, loading, error } = useRequestsList(solicitacoesIniciais, getMyRequests);

    const {
        filtros: { status, data, busca, abaAtiva },
        acoes: { setStatus, setData, setBusca, setAbaAtiva },
        statusDisponiveis,
        solicitacoesFiltradas
    } = useRequestsFilter(solicitacoes);

    const abas = [
        { valor: 'todas', label: 'TODAS' },
        { valor: 'pendentes', label: 'PENDENTES' },
        { valor: 'concluidas', label: 'CONCLUÍDAS' },
    ];

    const solicitacoesOrdenadas = [...solicitacoesFiltradas].sort((a, b) => {
        return new Date(b.data) - new Date(a.data);
    });

    return (
        <>
            <SolicitacoesFilter
                status={status}
                setStatus={setStatus}
                data={data}
                setData={setData}
                busca={busca}
                setBusca={setBusca}
                statusDisponiveis={statusDisponiveis}
            />

            <div className="flex flex-1 flex-col bg-white dark:bg-[#1A2233] border border-[#AAAAAA] dark:border-white/10 rounded-2xl overflow-hidden">
                <SolicitacoesTabs
                    abaAtiva={abaAtiva}
                    setAbaAtiva={setAbaAtiva}
                    titulo="Minhas Solicitações"
                    abas={abas}
                />

                <div className="h-[550px] overflow-y-auto bg-white dark:bg-[#1A2233]">
                    {loading && <RequestsTableSkeleton />}

                    {!loading && error && (
                        <div className="p-6 text-center text-sm font-semibold text-[#BA1A1A] dark:text-[#F87171]">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <SolicitacoesTable
                            itens={solicitacoesOrdenadas} 
                            onItemClick={(id) => router.push(`/solicitacoes/${id}`)}
                        />
                    )}
                </div>
            </div>
        </>
    );
}