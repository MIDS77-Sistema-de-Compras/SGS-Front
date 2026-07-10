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
            className="flex text-lg items-center justify-between py-5 border-b border-gray-200 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition"
        >
            <div className="flex items-center gap-20 px-6">
                <span className="font-bold text-[#333333] dark:text-[#E2E2EA] text-[16px]">
                    {item.codigo}
                    {quantidadeProdutos > 0 && `: Lista de ${quantidadeProdutos} ${quantidadeProdutos === 1 ? "produto" : "produtos"}`}
                </span>

                <span className="text-lg text-[#555555] dark:text-[#C3C6D3] px-6 text-[16px]">
                    {dataFormatada}
                </span>
            </div>

            <div className="px-6">
                <StatusBadge status={statusSolicitacao} className="px-4 min-w-[150px]" />
            </div>
        </div>
    );
}