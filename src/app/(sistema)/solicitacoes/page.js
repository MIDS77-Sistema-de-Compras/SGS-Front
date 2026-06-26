import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";

export default function TodasSolicitacoes() {
    return (
        <div className="flex-1 bg-white pb-12 overflow-y-auto font-sans flex flex-col gap-6">
            <RequestsContainer />
        </div>
    );
}