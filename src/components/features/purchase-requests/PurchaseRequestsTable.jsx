'use client';

import Link from 'next/link';
import AdditionalInfoButton from '@/components/ui/additional-info-button/AdditionalInfoButton';

const tableColumns = [
  'Data',
  'Produto',
  'Variação',
  'Quantidade',
  'Status',
  ' ',
];

function MobileCard({ request }) {
  return (
    <Link
      href={`/solicitacoes-compra/${request.id}`}
      aria-label="Ver detalhes"
      className="block rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#303746] p-4 shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-gray-400 dark:text-[#A0A5B5]">
            {request.data || request.requestDate}
          </p>
          <p className="mt-0.5 font-semibold text-gray-800 dark:text-[#E2E2EA] break-words">
            {request.product}
          </p>
        </div>
        <span className="shrink-0 text-[22px] leading-none text-[#103D85] dark:text-[#5D8EF7]">
          ›
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
        <div>
          <dt className="text-gray-400 dark:text-[#9AA0B4] text-[10px] font-semibold uppercase tracking-wider">
            Variação
          </dt>
          <dd className="text-gray-600 dark:text-[#C3C6D3] break-words">
            {request.variation}
          </dd>
        </div>
        <div>
          <dt className="text-gray-400 dark:text-[#9AA0B4] text-[10px] font-semibold uppercase tracking-wider">
            Quantidade
          </dt>
          <dd className="text-gray-600 dark:text-[#C3C6D3] break-words">
            {request.quantity}
          </dd>
        </div>
      </dl>

      <div className="mt-3">
        <AdditionalInfoButton status={request.additionalInfoStatus} />
      </div>
    </Link>
  );
}

export default function PurchaseRequestsTable({ requests = [] }) {
  return (
    <section className="flex flex-col h-full w-full overflow-hidden min-h-0 rounded-xl border border-gray-100 shadow-sm dark:border-white/10 dark:bg-[#1A2233] px-4 sm:px-5 py-2">
      <div className="border-[#AAAAAA] pt-2 pb-3">
        <h1 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[18px] sm:text-[22px]">
          Solicitações de compra
        </h1>
      </div>

      <div className="lg:hidden max-h-[560px] overflow-y-auto space-y-3 pb-3 pr-1">
        {requests.length > 0 ? (
          requests.map((request) => (
            <MobileCard key={request.id} request={request} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-400 dark:text-[#C3C6D3]">
            Nenhuma solicitação encontrada.
          </p>
        )}
      </div>

      <div className="hidden lg:grid grid-cols-[0.9fr_1.2fr_1fr_1.7fr_200px_60px] min-[1350px]:grid-cols-[0.9fr_1.2fr_1fr_1.7fr_260px_72px] items-center rounded-xl bg-[#F0F0F0] dark:bg-[#303746] py-3 text-center font-semibold text-[13px] min-[1350px]:text-base text-[#103D85] dark:text-[#E2E2EA]">
        {tableColumns.map((column, index) => (
          <span key={index}>{column}</span>
        ))}
      </div>

      <div className="hidden lg:block flex-1 overflow-y-auto pr-2 mt-2">
        {requests.map((request) => (
          <Link
            key={request.id}
            href={`/solicitacoes-compra/${request.id}`}
            className="grid min-h-16 grid-cols-[0.9fr_1.2fr_1fr_1.7fr_200px_60px] min-[1350px]:grid-cols-[0.9fr_1.2fr_1fr_1.7fr_260px_72px] items-center border-b border-[#f0f0f0] dark:border-white/10 text-center text-[12px] min-[1350px]:text-[14px] text-[#111827] dark:text-[#C3C6D3] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            aria-label="Ver detalhes"
          >
            <span className="truncate px-1 min-[1350px]:whitespace-normal" title={request.data || request.requestDate}>{request.data || request.requestDate}</span>
            <span className="truncate px-1 min-[1350px]:whitespace-normal" title={request.product}>{request.product}</span>
            <span className="truncate px-1 min-[1350px]:whitespace-normal" title={request.variation}>{request.variation}</span>
            <span className="truncate px-1" title={request.quantity}>{request.quantity}</span>

            <div className="flex justify-center">
              <AdditionalInfoButton status={request.additionalInfoStatus} />
            </div>

            <span className="text-[26px] text-[#103D85] dark:text-[#5D8EF7] px-5 py-2">
              ›
            </span>
          </Link>
        ))}

        {requests.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400 dark:text-[#C3C6D3]">
            Nenhuma solicitação encontrada.
          </p>
        )}
      </div>
    </section>
  );
}