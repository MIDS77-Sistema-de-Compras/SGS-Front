import RequestFormCR from "@/components/features/cr-form/crForm";
import { Search } from "@/components/features/search/Search";

export default function CadastrarCR() {
    return (
     
        <div className="flex flex-row items-start gap-10 w-full min-h-0">
            
            <RequestFormCR />
            <Search />

        </div>
    );
}