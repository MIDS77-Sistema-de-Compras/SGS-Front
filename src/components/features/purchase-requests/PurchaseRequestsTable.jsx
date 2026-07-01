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
    <section className="w-full overflow-hidden rounded-2xl border border-[#A3A3A3] bg-white">
      <div className="border-[#A3A3A3] px-6 py-2">
        <h1 className="text-[26px] font-semibold text-[#103D85]">
          Solicitações de compra
        </h1>
      </div>

      <div className="px-5 py-2">
        <div className="pr-4">
          <div className="grid grid-cols-[0.9fr_1.2fr_1fr_1.7fr_260px_72px] items-center rounded-2xl bg-[#F0F0F0] px-6 py-3 text-center text-sm font-semibold text-[#103D85]">
            {tableColumns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>
        </div>

        <div className="max-h-[360px] overflow-y-auto pr-2">
          {requests.map((request) => (
            <div
              key={request.id}
              className="grid min-h-16 grid-cols-[0.9fr_1.2fr_1fr_1.7fr_260px_72px] items-center border-b border-[#A3A3A3] px-6 text-center text-xs text-[#111827]"
            >
              <span>{request.data || request.requestDate}</span>
              <span>{request.product}</span>
              <span>{request.variation}</span>
              <span>{request.quantity}</span>
              <div className="flex justify-center">
                <AdditionalInfoButton status={request.additionalInfoStatus} />
              </div>
              <Link
                href={`/comprador/solicitacao/${request.id}`}
                className="mx-auto text-3xl leading-none text-[#103D85]"
                aria-label="Ver detalhes"
              >
                ›
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
