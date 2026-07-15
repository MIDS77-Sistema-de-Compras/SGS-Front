import RequestFormCR from "@/components/features/cr-form/crForm";
import { Search } from "@/components/features/search/Search";

export const metadata = {
    title: "Cadastro de CR",
};

export default function CadastrarCR() {
    return (
        <div className="flex flex-col xl:flex-row gap-10 xl:flex-1 xl:min-h-0">

            <div className="flex flex-col xl:flex-1 xl:min-h-0">
                <RequestFormCR />
            </div>

            <div className="w-full xl:w-auto flex flex-col xl:min-h-0">
                <Search />
            </div>
        </div>
    );
}