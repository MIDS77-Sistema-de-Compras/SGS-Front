import Button from '@/components/ui/button/Button';
import StatusBadge, { getStatusCor } from '@/components/features/solicitacoes/statusBadge';
import { calcularTempoDecorrido } from '@/lib/utils/calculateTime';

const STATUS_AGUARDANDO_APROVACAO = 'Aguardando aprovação';

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

    const podeDecidir = item.status === STATUS_AGUARDANDO_APROVACAO;

    return (
        <div className="flex items-center justify-between gap-6 py-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-4 min-w-0">
                <div className={`w-7 h-7 rounded-full shrink-0 ${getStatusCor(item.status)}`} />

                <div className="flex flex-col min-w-0">
                    <span className="text-lg font-bold text-[#333333] truncate">
                        {titulo}
                    </span>

                    {subtitulo && (
                        <span className="text-sm text-gray-400 truncate">
                            {subtitulo}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
                <span className="text-xs text-gray-400 min-w-[70px] text-right whitespace-nowrap">
                    {calcularTempoDecorrido(item.requestDate)}
                </span>

                <StatusBadge status={item.status} className="px-4 min-w-[170px]" />

                {podeDecidir && (
                    <div className="flex gap-3">
                        <Button
                            variant="success"
                            className="rounded-full px-6"
                            isLoading={isDeciding}
                            onClick={() => onApprove(item)}
                        >
                            Aprovar
                        </Button>
                        <Button
                            variant="danger"
                            className="rounded-full px-6"
                            isLoading={isDeciding}
                            onClick={() => onReject(item)}
                        >
                            Recusar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
