import { Search } from "@/components/features/search/Search";
import RequestForm from "@/components/features/request-form/RequestForm";

export default function NovaSolicitacao() {
    return (
        <div className="flex gap-10 flex-1 min-h-0">
            <div className="flex flex-1 flex-col min-h-0">
                <RequestForm />
            </div>

            <div className="flex flex-col min-h-0">
                <Search />
            </div>
        </div>
    );
}