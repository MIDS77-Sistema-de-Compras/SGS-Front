import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import StatusBadge from "./statusBadge";
import { isRequestEditable } from "@/lib/utils/requestStatus";
import { getUserRole } from "@/lib/utils/getUserRole";

export default function SolicitacaoRow({ item, onClick, onEdit }) {
    const produtos = item.produtos || [];
    const servicos = item.servicos || [];
    const statusSolicitacao = item.status || calcularStatusSolicitacao(produtos);
    const quantidadeProdutos = produtos.length;
    const isService = quantidadeProdutos === 0 && servicos.length > 0;
    const itemCount = isService ? servicos.length : quantidadeProdutos;
    const currentRole = (getUserRole() || "").replace(/^ROLE_/, "");
    const canEdit = isRequestEditable(statusSolicitacao)
        && ["DOCENTE", "SUPERVISOR", "COORDENADOR"].includes(currentRole);
    const dataFormatada = item.data
        ? new Date(item.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })
        : "-";

    return (
        <div
            onClick={onClick}
            className="py-4 xl:py-5 border-b border-gray-100 dark:border-white/10 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition"
        >
            <div className="flex flex-col gap-3 px-4 sm:px-6 xl:grid xl:grid-cols-3 xl:flex-1 xl:items-center xl:gap-12 2xl:gap-20">
                <span className="text-[#555555] dark:text-[#C3C6D3] whitespace-nowrap">
                    {dataFormatada}
                </span>

                <div className="flex items-center justify-between gap-4 xl:contents">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="font-bold text-[#333333] dark:text-[#E2E2EA] break-words xl:whitespace-nowrap">
                            {item.codigo}
                            {itemCount > 0 && `: Lista de ${itemCount} ${isService ? (itemCount === 1 ? "serviço" : "serviços") : (itemCount === 1 ? "produto" : "produtos")}`}
                        </span>
                        {canEdit && onEdit && (
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onEdit(item.id);
                                }}
                                className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-[#103D85]/10 hover:text-[#103D85] dark:hover:bg-[#5D8EF7]/10 dark:hover:text-[#5D8EF7]"
                                aria-label={`Editar ${item.codigo}`}
                                title="Editar solicitação"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="flex justify-end shrink-0">
                        <StatusBadge status={statusSolicitacao} className="px-4 text-[15px] min-w-[150px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
