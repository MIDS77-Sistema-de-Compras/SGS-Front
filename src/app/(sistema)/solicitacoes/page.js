import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";

export const metadata = {
  title: "Solicitações",
};

export default function TodasSolicitacoes() {
    return (
        <div className="flex flex-col flex-1 bg-white dark:bg-[#1A2233] overflow-y-auto flex flex-col gap-6">
            <RequestsContainer />
        </div>
    );
}