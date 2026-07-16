import { Search } from "@/components/features/search/Search";
import RequestForm from "@/components/features/request-form/RequestForm";

export const metadata = {
  title: "Cadastro de Solicitação",
};

export default function NovaSolicitacao() {
    return (
        <div className="flex flex-col xl:flex-row gap-10 xl:flex-1 xl:min-h-0">

            <div className="flex flex-col xl:flex-1 xl:min-h-0">
                <RequestForm />
            </div>

            <div className="w-full xl:w-auto flex flex-col xl:min-h-0">
                <Search />
            </div>
        </div>
    );
}