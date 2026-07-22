'use client';

import SolicitacoesTabs from '@/lib/utils/requestTabs';
import { useRequestsFilter } from '@/hooks/useMyCRList';
import { useCompradorRequestsList } from '@/hooks/useCompradorRequestsList';
import RequestManagementCard from '@/components/features/solicitacoes-gestao/RequestManagementCard';
import RequestManagementSkeleton from '@/components/features/solicitacoes-gestao/RequestManagementSkeleton';
import SolicitacoesFilter from '../solicitacoes/requestFilter';

const ABAS = [
  { valor: 'todas', label: 'TODAS' },
  { valor: 'pendentes', label: 'EM ANDAMENTO' },
  { valor: 'concluidas', label: 'CONCLUÍDAS' },
];

export default function PurchaseRequestsPage() {
  const { requests, loading, error } = useCompradorRequestsList();

  const {
    filtros: { status, data, busca, abaAtiva },
    acoes: { setStatus, setData, setBusca, setAbaAtiva },
    statusDisponiveis,
    solicitacoesFiltradas
  } = useRequestsFilter(requests);

  return (
    <div className="flex w-full h-full flex-1 flex-col gap-6 overflow-hidden">

      <div className="flex-none">
        <SolicitacoesFilter
          status={status}
          setStatus={setStatus}
          data={data}
          setData={setData}
          busca={busca}
          setBusca={setBusca}
          statusDisponiveis={statusDisponiveis}
        />
      </div>

      <div className="flex flex-col flex-1 min-h-0 dark:bg-[#1A2233] border border-gray-100 shadow-sm dark:border-white/10 rounded-xl overflow-hidden">
        <SolicitacoesTabs
          abaAtiva={abaAtiva}
          setAbaAtiva={setAbaAtiva}
          titulo="Solicitações de Compra"
          abas={ABAS}
        />

        <div className="flex-1 overflow-y-auto px-3 sm:px-5 bg-white dark:bg-[#1A2233]">
          {loading && <RequestManagementSkeleton />}

          {!loading && error && (
            <div className="text-center pt-10 text-sm font-semibold text-[#BA1A1A] dark:text-[#F87171]">
              {error}
            </div>
          )}

          {!loading && !error && solicitacoesFiltradas.length === 0 && (
            <div className="text-gray-400 dark:text-[#C3C6D3] text-center pt-10">
              Nenhuma solicitação de compra encontrada.
            </div>
          )}

          {!loading && !error && solicitacoesFiltradas.length > 0 && (
            <div className="flex flex-col mt-2">
              {solicitacoesFiltradas.map((item) => (
                <RequestManagementCard
                  key={item.id}
                  item={item}
                  hrefBase="/solicitacoes-compra"
                />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
