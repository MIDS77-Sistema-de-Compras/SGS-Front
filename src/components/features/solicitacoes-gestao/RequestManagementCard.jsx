"use client";

import Button from '@/components/ui/button/Button';
import StatusBadge from '@/components/features/solicitacoes/statusBadge';
import { calcularTempoDecorrido } from '@/lib/utils/calculateTime';
import { getStatusColor, getStatusLabel } from '@/lib/utils/requestStatus';
import { useRouter } from 'next/navigation';
import { getUserRole } from '@/lib/utils/getUserRole';

export default function RequestManagementCard({ item, onApprove, onReject, isDeciding = false, hrefBase = '/solicitacoes/gestao' }) {
    const router = useRouter();
    const currentRole = (getUserRole() || '').replace(/^ROLE_/, '');
    
    const servicos = item.servicos || [];
    const produtos = item.produtos || [];
    const isServiceRequest = servicos.length > 0;
    const itens = isServiceRequest ? servicos : produtos;
    const quantidadeItens = itens.length;

    const titulo = `${item.codigo}${quantidadeItens > 0
        ? `: Lista de ${quantidadeItens} ${isServiceRequest
            ? quantidadeItens === 1 ? 'serviço' : 'serviços'
            : quantidadeItens === 1 ? 'produto' : 'produtos'
        }`
        : ''}`;

    const responsaveis = item.crBranch?.responsibleUsersName || [];
    const subtitulo = [
        item.requesterName && `Solicitado por ${item.requesterName}`,
        responsaveis.length > 0 && `Responsável: ${responsaveis.join(', ')}`,
    ].filter(Boolean).join(' · ');

    const podeDecidir = getStatusLabel(item.status) === 'Aguardando aprovação';
    const podeEditar = podeDecidir && ['SUPERVISOR', 'COORDENADOR'].includes(currentRole);

    return (
        <div
            role="link"
            tabIndex={0}
            onClick={() => router.push(`${hrefBase}/${item.id}`)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') router.push(`${hrefBase}/${item.id}`);
            }}
            className="group block cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5">
            <div className="px-2 rounded-xl flex flex-col gap-3 py-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6 transition-colors">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0 ${getStatusColor(item.status)}`} />

                    <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                            {podeEditar && (
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        router.push(`${hrefBase}/${item.id}/editar`);
                                    }}
                                    className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-[#103D85]/10 hover:text-[#103D85] dark:hover:bg-[#5D8EF7]/10 dark:hover:text-[#5D8EF7]"
                                    aria-label={`Editar ${item.codigo}`}
                                    title="Editar solicitação"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20h9" />
                                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                    </svg>
                                </button>
                            )}
                            <span className="font-bold text-[15px] sm:text-base text-[#333333] dark:text-[#E2E2EA] break-words xl:truncate">
                                {titulo}
                            </span>
                        </div>

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
        </div>
    );
}
