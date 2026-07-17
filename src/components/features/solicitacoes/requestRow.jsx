import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import StatusBadge from "./statusBadge";

export default function SolicitacaoRow({ item, onClick }) {
    const produtos = item.produtos || [];
    const statusSolicitacao = item.status || calcularStatusSolicitacao(produtos);
    const quantidadeProdutos = produtos.length;
    const dataFormatada = item.data
        ? new Date(item.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })
        : "-";

    return (
        <div
            onClick={onClick}
            className="py-4 xl:py-5 border-b border-gray-100 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition"
        >
            <div className="flex flex-col gap-3 px-4 sm:px-6 xl:grid xl:grid-cols-3 xl:flex-1 xl:items-center xl:gap-12 2xl:gap-20">
                <span className="font-bold text-[#333333] dark:text-[#E2E2EA] break-words xl:whitespace-nowrap">
                    {item.codigo}
                    {quantidadeProdutos > 0 && `: Lista de ${quantidadeProdutos} ${quantidadeProdutos === 1 ? "produto" : "produtos"}`}
                </span>

                <div className="flex items-center justify-between gap-4 xl:contents">
                    <span className="text-[#555555] dark:text-[#C3C6D3] whitespace-nowrap">
                        {dataFormatada}
                    </span>

                    <div className="flex justify-end shrink-0">
                        <StatusBadge status={statusSolicitacao} className="px-4 text-[15px] min-w-[150px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}