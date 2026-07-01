"use client";

import Link from 'next/link';
import AdditionalInfoButton from '@/components/ui/additional-info-button/AdditionalInfoButton';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase text-[#103D85]">
        {label}
      </span>
      <span className="text-sm font-medium text-[#111827]">{value}</span>
    </div>
  );
}

export default function PurchaseRequestDetailPage({ request }) {

  const router = useRouter();

  if (!request) {
    return (
      <section className="w-full rounded-2xl border border-[#A3A3A3] bg-white p-6">
        <h1 className="text-2xl font-semibold text-[#103D85]">
          Solicitação não encontrada
        </h1>
        <Link
          href="/comprador/solicitacao"
          className="mt-4 inline-flex text-sm font-semibold text-[#103D85] hover:underline"
        >
          Voltar para solicitações
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full rounded-2xl border border-[#A3A3A3] bg-white">
      <div className="flex items-center justify-between border-b border-[#A3A3A3] px-6 py-4">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-[#103D85] hover:bg-gray-100 p-1 mr-1 rounded-full transition-colors flex items-center justify-center"
            title="Voltar"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[26px] font-semibold text-[#103D85]">
            Detalhe da solicitação
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <DetailItem label="Produto" value={request.product} />
        <DetailItem label="Variação" value={request.variation} />
        <DetailItem label="Quantidade" value={request.quantity} />
        <DetailItem label="Data da solicitação" value={request.requestDate} />
        <DetailItem label="Solicitante" value={request.requester} />

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase text-[#103D85]">
            Informações adicionais
          </span>
          <AdditionalInfoButton status={request.additionalInfoStatus} />
        </div>

        <div className="md:col-span-2">
          <DetailItem label="Descrição" value={request.description} />
        </div>
      </div>
    </section>
  );
}
