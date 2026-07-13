import RequestsContainer from "@/components/features/solicitacoes/requestsContainer";

export const metadata = {
  title: "Solicitações",
};

export default function TodasSolicitacoes() {
    return (
        <div className="flex-1 bg-white dark:bg-[#1A2233] pb-12 overflow-y-auto font-sans flex flex-col gap-6">
            <RequestsContainer />
        </div>
    );
}