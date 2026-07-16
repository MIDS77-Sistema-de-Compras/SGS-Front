import RequestFormCR from "@/components/features/cr-form/crForm";
import { Search } from "@/components/features/search/Search";

export const metadata = {
    title: "Cadastro de CR",
};

export default function CadastrarCR() {
    return (
        <div className="scroll-native flex flex-col xl:flex-row gap-6 xl:gap-10 flex-1 min-h-0 overflow-y-auto xl:overflow-visible pr-2 xl:pr-0">

            <div className="flex flex-col xl:flex-1 xl:min-h-0">
                <RequestFormCR />
            </div>

            <div className="w-full xl:w-auto flex flex-col shrink-0 xl:min-h-0">
                <Search />
            </div>
        </div>
    );
}