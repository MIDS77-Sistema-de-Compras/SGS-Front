import Button from '@/components/ui/button/Button';
import StatusBadge from '@/components/features/solicitacoes/statusBadge';
import { calcularTempoDecorrido } from '@/lib/utils/calculateTime';
import { getStatusColor, getStatusLabel } from '@/lib/utils/requestStatus';
import Link from 'next/link';

export default function RequestManagementCard({ item, onApprove, onReject, isDeciding = false }) {
    const quantidadeProdutos = item.produtos?.length || 0;
    const titulo = `${item.codigo}${quantidadeProdutos > 0
        ? `: Lista de ${quantidadeProdutos} ${quantidadeProdutos === 1 ? 'produto' : 'produtos'}`
        : ''}`;

    const responsaveis = item.crBranch?.responsibleUsersName || [];
    const subtitulo = [
        item.requesterName && `Solicitado por ${item.requesterName}`,
        responsaveis.length > 0 && `Responsável: ${responsaveis.join(', ')}`,
    ].filter(Boolean).join(' · ');

    const podeDecidir = getStatusLabel(item.status) === 'Aguardando aprovação';

    return (
        <Link
            href={`/solicitacoes/gestao/${item.id}`}
            className="group block"
        >
            <div className="hover:bg-gray-100 dark:hover:bg-white/5 px-2 rounded-xl flex flex-col gap-3 py-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6 transition-colors">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0 ${getStatusColor(item.status)}`} />

                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[15px] sm:text-base text-[#333333] dark:text-[#E2E2EA] break-words xl:truncate">
                            {titulo}
                        </span>

                        {subtitulo && (
                            <span className="text-xs sm:text-sm text-gray-400 dark:text-[#C3C6D3] break-words xl:truncate">
                                {subtitulo}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className="grid grid-cols-[70px_1fr] items-center gap-x-3 gap-y-2 pl-9 sm:flex sm:items-center sm:gap-4 sm:pl-11 xl:gap-6 xl:pl-0 xl:shrink-0"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                >
                    <span className="text-xs text-gray-400 dark:text-[#C3C6D3] whitespace-nowrap sm:min-w-[70px] xl:text-right">
                        {calcularTempoDecorrido(item.data)}
                    </span>

                    <div className="justify-self-end sm:ml-auto xl:ml-0">
                        <StatusBadge status={item.status} className="px-3 min-w-[150px] xl:px-4 xl:min-w-[170px]" />
                    </div>

                    {podeDecidir && (
                        <div className="col-start-2 justify-self-end flex gap-2 sm:col-auto xl:gap-3">
                            <Button
                                variant="success"
                                className="rounded-full px-4 xl:px-6 max-h-[28px] xl:max-h-[30px]"
                                isLoading={isDeciding}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    onApprove(item);
                                }}
                            >
                                Aprovar
                            </Button>
                            <Button
                                variant="danger"
                                className="rounded-full px-4 xl:px-6 max-h-[28px] xl:max-h-[30px]"
                                isLoading={isDeciding}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    onReject(item);
                                }}
                            >
                                Recusar
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-auto h-px w-[92%] bg-gray-100/80 dark:bg-white/5 group-last:hidden" />
        </Link>
    );
}