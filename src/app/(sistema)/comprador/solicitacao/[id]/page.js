import Link from 'next/link';
import AdditionalInfoButton from '@/components/ui/additional-info-button/AdditionalInfoButton';
import { mockRequests } from '@/components/features/purchase-requests/purchaseRequestsMock';

export default async function DetailRequest({ params }) {
  const { id } = await params;
  const request = mockRequests.find((item) => item.id === Number(id));
  const items = request?.items ?? [];

  if (!request) {
    return (
      <main className="flex w-full flex-col gap-8">
        <h1 className="text-[32px] font-medium text-[#111827]">
          Detalhe da solicitação
        </h1>

        <section className="rounded-xl border border-[#A3A3A3] bg-white p-6">
          <p className="text-sm text-[#111827]">Solicitação não encontrada.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col gap-8">
      <h1 className="text-[32px] font-medium text-[#111827]">
        Detalhe da solicitação
      </h1>

      <section className="min-h-[455px] overflow-hidden rounded-xl border border-[#A3A3A3] bg-white">
        <header className="flex items-center justify-between border-b border-[#A3A3A3] px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/comprador/solicitacao"
              className="text-3xl leading-none text-[#103D85]"
              aria-label="Voltar para solicitações"
            >
              ‹
            </Link>

            <h2 className="text-2xl font-bold text-[#103D85]">
              {request.variation}
            </h2>
          </div>

          <span className="text-sm text-[#111827]">
            Realizada em: {request.data}
          </span>
        </header>

        <div className="px-4 py-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#111827]">
              {items.length} resultados
            </h3>

            <AdditionalInfoButton
              status={request.additionalInfoStatus}
              className="h-5 w-[110px] text-[10px]"
            >
              Em análise
            </AdditionalInfoButton>
          </div>

          <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_0.9fr_1fr_48px] items-center rounded-xl bg-[#F0F0F0] px-4 py-3 text-center text-sm font-bold text-[#103D85]">
            <span>Produto</span>
            <span>Variação</span>
            <span>Quantidade</span>
            <span>Und. Medida</span>
            <span>Status</span>
            <span />
          </div>

          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid min-h-16 grid-cols-[1.3fr_1.3fr_0.8fr_0.9fr_1fr_48px] items-center border-b border-[#D1D5DB] px-4 text-center text-sm text-[#111827]"
              >
                <span>{item.product}</span>
                <span>{item.variation}</span>
                <span>{item.quantity}</span>
                <span>{item.unitMeasure}</span>
                <div className="flex justify-center">
                  <AdditionalInfoButton
                    status={item.status}
                    className="h-5 w-[110px] text-[10px]"
                  >
                    Em análise
                  </AdditionalInfoButton>
                </div>
                <span className="text-xl text-[#111827]">›</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
