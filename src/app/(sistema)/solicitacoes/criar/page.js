import { Search } from "@/components/features/search/Search";
import RequestForm from "@/components/features/request-form/RequestForm";

export const metadata = {
  title: "Cadastro de Solicitação",
};

export default function NovaSolicitacao() {
    return (
        <div className="scroll-native flex flex-col min-[1450px]:flex-row gap-6 min-[1450px]:gap-10 flex-1 min-h-0 overflow-y-auto min-[1450px]:overflow-visible pr-2 min-[1450px]:pr-0 max-[1449px]:pb-60">

            <div className="flex flex-col min-[1450px]:flex-1 min-[1450px]:min-h-0">
                <RequestForm />
            </div>

            <div className="w-full min-[1450px]:w-auto flex flex-col shrink-0 min-[1450px]:min-h-0">
                <Search />
            </div>
        </div>
    );
}