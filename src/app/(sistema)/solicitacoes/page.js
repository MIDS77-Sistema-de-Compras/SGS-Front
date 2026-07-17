import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";

export const metadata = {
  title: "Solicitações",
};

export default function TodasSolicitacoes() {
    return (
        <div className="flex flex-col flex-1 gap-6 min-h-0">
            <RequestsContainer />
        </div>
    );
}