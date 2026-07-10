'use client';

import { useRequestsFilter } from '@/hooks/useMyCRList';
import PurchaseRequestsTable from './PurchaseRequestsTable';
import SolicitacoesFilter from '../solicitacoes/requestFilter';
import { purchaseRequestsMock } from './purchaseRequestsMock';

export default function PurchaseRequestsPage({ solicitacoesIniciais = [] }) {
  const solicitacoes = purchaseRequestsMock; 

  const {
    filtros: { status, data, busca },
    acoes: { setStatus, setData, setBusca },
    statusDisponiveis,
    solicitacoesFiltradas
  } = useRequestsFilter(solicitacoes);

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

      <div className="flex-1 min-h-0">
        <PurchaseRequestsTable requests={solicitacoesFiltradas} />
      </div>
      
    </div>
  );
}