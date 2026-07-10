import RequestFormCR from "@/components/features/cr-form/crForm";
import { Search } from "@/components/features/search/Search";

export const metadata = {
  title: "Cadastro de CR",
};

export default function CadastrarCR() {
    return (
        <div className="flex gap-10 flex-1 min-h-0">

            <div className="flex flex-1 flex-col min-h-0">
                <RequestFormCR />
            </div>

            <div className="flex flex-col min-h-0">
                <Search />
            </div>
        </div>
    );
}