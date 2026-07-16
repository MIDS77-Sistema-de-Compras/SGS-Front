import RequestDetailsView from "@/components/features/solicitacoes/RequestDetailsView";

export default function DetalhesGestao() {
  return <RequestDetailsView mode="gestao" title="Detalhes solicitação" backHref="/solicitacoes/gestao" />;
}