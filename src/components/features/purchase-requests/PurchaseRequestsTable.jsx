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

export default function PurchaseRequestsTable({ requests = [] }) {
  return (
    <section className="flex flex-col h-full w-full overflow-hidden min-h-0 rounded-xl border border-[#AAAAAA] px-5 py-2">
      <div className="border-[#AAAAAA] pt-2 pb-3">
        <h1 className="text-[#103D85] font-bold text-[22px]">
          Solicitações de compra
        </h1>
      </div>

      <div className="grid grid-cols-[0.9fr_1.2fr_1fr_1.7fr_260px_72px] items-center rounded-xl bg-[#F0F0F0] py-3 text-center font-semibold text-[#103D85]">
        {tableColumns.map((column, index) => (
          <span key={index}>{column}</span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 mt-2">
        {requests.map((request) => (
          <Link
            key={request.id}
            href={`/solicitacoes-compra/${request.id}`}
            className="grid min-h-16 grid-cols-[0.9fr_1.2fr_1fr_1.7fr_260px_72px] items-center border-b border-[#f0f0f0] text-center text-[14px] text-[#111827] hover:bg-gray-50 transition-colors"
            aria-label="Ver detalhes"
          >
            <span>{request.data || request.requestDate}</span>
            <span>{request.product}</span>
            <span>{request.variation}</span>
            <span>{request.quantity}</span>

            <div className="flex justify-center">
              <AdditionalInfoButton status={request.additionalInfoStatus} />
            </div>

            <span className="text-[26px] text-[#103D85] px-5 py-2">
              ›
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}