'use client';

import { useMemo, useState } from 'react';
import SolicitacoesTabs from '@/lib/utils/requestTabs';
import { useRequestsList } from '@/hooks/useRequestsList';
import { useCRSearch } from '@/hooks/useCRSearch';
import { updateRequestStatus } from '@/service/requests';
import ToastNotification from '@/components/ui/notifications/ToastNotification';
import { Modal } from '@/components/ui/overlay/Modal';
import Button from '@/components/ui/button/Button';
import RequestManagementFilters from './RequestManagementFilters';
import RequestManagementCard from './RequestManagementCard';
import RequestManagementSkeleton from './RequestManagementSkeleton';

const ABAS = [
    { valor: 'pendentes', label: 'Pendentes' },
    { valor: 'andamento', label: 'Em Andamento' },
    { valor: 'aprovadas', label: 'Aprovadas' },
    { valor: 'concluidas', label: 'Concluídas' },
];

const STATUS_POR_ABA = {
    pendentes: ['Aguardando aprovação'],
    andamento: [
        'Em atendimento',
        'Atrasada',
        'Aguardando comprador',
        'Solicitando orçamento',
        'Recebimento Parcial',
        'Fundo Rotativo',
        'CD central',
        'Solicitado pelo portal',
    ],
    aprovadas: ['Aprovado'],
    concluidas: ['Entregue', 'Cancelado', 'Recusado', 'Pedido Cancelado'],
};

const MENSAGENS_VAZIO = {
    pendentes: 'Nenhuma solicitação pendente encontrada.',
    andamento: 'Nenhuma solicitação em andamento encontrada.',
    aprovadas: 'Nenhuma solicitação aprovada encontrada.',
    concluidas: 'Nenhuma solicitação concluída encontrada.',
};

export default function RequestsManagement() {
    const { requests, loading, error } = useRequestsList();
    const { filteredCRs: crs } = useCRSearch();

    const [abaAtiva, setAbaAtiva] = useState('pendentes');
    const [status, setStatus] = useState('');
    const [cr, setCr] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [busca, setBusca] = useState('');

    const [overrides, setOverrides] = useState({});
    const [decidingId, setDecidingId] = useState(null);
    const [notification, setNotification] = useState(null);

    const [rejectTarget, setRejectTarget] = useState(null);
    const [justificativa, setJustificativa] = useState('');
    const [justificativaErro, setJustificativaErro] = useState('');

    const supervisores = useMemo(() => {
        const nomes = crs.flatMap((crBranch) => crBranch.responsibleUsersName || []);
        return [...new Set(nomes)];
    }, [crs]);

    const itensComOverrides = useMemo(() => {
        return requests.map((item) => (
            overrides[item.id] ? { ...item, status: overrides[item.id] } : item
        ));
    }, [requests, overrides]);

    const itensFiltrados = useMemo(() => {
        const statusPermitidos = STATUS_POR_ABA[abaAtiva] || [];

        return itensComOverrides.filter((item) => {
            if (!statusPermitidos.includes(item.status)) return false;
            if (status && item.status !== status) return false;
            if (cr && String(item.crBranchId) !== String(cr)) return false;

            if (supervisor && !(item.crBranch?.responsibleUsersName || []).includes(supervisor)) {
                return false;
            }

            if (busca) {
                const texto = busca.toLowerCase();
                const pesquisavel = `${item.codigo || ''} ${item.requesterName || ''} ${item.status || ''}`.toLowerCase();
                if (!pesquisavel.includes(texto)) return false;
            }

            return true;
        });
    }, [itensComOverrides, abaAtiva, status, cr, supervisor, busca]);

    function openRejectModal(item) {
        setRejectTarget(item);
        setJustificativa('');
        setJustificativaErro('');
    }

    function closeRejectModal() {
        setRejectTarget(null);
        setJustificativa('');
        setJustificativaErro('');
    }

    function confirmReject() {
        if (!justificativa.trim()) {
            setJustificativaErro('A justificativa é obrigatória para recusar.');
            return;
        }

        const item = rejectTarget;
        closeRejectModal();
        handleDecisao(item, 'Recusado', justificativa.trim());
    }

    async function handleDecisao(item, novoStatus, justification = null) {
        setDecidingId(item.id);
        setOverrides((prev) => ({ ...prev, [item.id]: novoStatus }));

        try {
            await updateRequestStatus(item.id, novoStatus, justification);

            setNotification({
                type: 'success',
                message: novoStatus === 'Aprovado'
                    ? 'Solicitação aprovada com sucesso.'
                    : 'Solicitação recusada.',
            });
        } catch (err) {
            setOverrides((prev) => {
                const next = { ...prev };
                delete next[item.id];
                return next;
            });

            setNotification({
                type: 'error',
                message: err.message || 'Não foi possível atualizar a solicitação.',
            });
        } finally {
            setDecidingId(null);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <ToastNotification notification={notification} setNotification={setNotification} />

            <RequestManagementFilters
                status={status}
                setStatus={setStatus}
                cr={cr}
                setCr={setCr}
                supervisor={supervisor}
                setSupervisor={setSupervisor}
                busca={busca}
                setBusca={setBusca}
                crs={crs}
                supervisores={supervisores}
            />

            <div className="bg-white dark:bg-[#1A2233] border border-[#797979] dark:border-white/10 rounded-2xl overflow-hidden">
                <SolicitacoesTabs
                    abaAtiva={abaAtiva}
                    setAbaAtiva={setAbaAtiva}
                    titulo="Gestão de Solicitações"
                    abas={ABAS}
                />

                <div className="h-[500px] overflow-y-auto px-6 bg-white dark:bg-[#1A2233]">
                    {loading && <RequestManagementSkeleton />}

                    {!loading && error && (
                        <div className="text-center pt-10 text-sm font-semibold text-[#BA1A1A] dark:text-[#F87171]">
                            {error}
                        </div>
                    )}

                    {!loading && !error && itensFiltrados.length === 0 && (
                        <div className="text-gray-400 dark:text-[#C3C6D3] text-center pt-10">
                            {MENSAGENS_VAZIO[abaAtiva]}
                        </div>
                    )}

                    {!loading && !error && itensFiltrados.length > 0 && (
                        <div className="flex flex-col">
                            {itensFiltrados.map((item) => (
                                <RequestManagementCard
                                    key={item.id}
                                    item={item}
                                    onApprove={(request) => handleDecisao(request, 'Aprovado')}
                                    onReject={(request) => openRejectModal(request)}
                                    isDeciding={decidingId === item.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={!!rejectTarget}
                onClose={closeRejectModal}
                title="Recusar solicitação"
                height="h-auto"
                maxWidth="max-w-[480px]"
            >
                <p className="text-sm text-gray-600 dark:text-[#C3C6D3]">
                    Informe o motivo da recusa da solicitação {rejectTarget?.codigo}.
                </p>

                <textarea
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                    rows={4}
                    placeholder="Descreva o motivo da recusa..."
                    className="w-full border border-gray-300 dark:border-white/15 dark:bg-[#303746] dark:text-[#E2E2EA] dark:placeholder:text-[#C3C6D3] rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#103D85] dark:focus:ring-[#1A4A9E]"
                />

                {justificativaErro && (
                    <p className="text-xs font-medium text-[#BA1A1A] dark:text-[#F87171]">{justificativaErro}</p>
                )}

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={closeRejectModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant="danger"
                        className="rounded-full"
                        isLoading={decidingId === rejectTarget?.id}
                        onClick={confirmReject}
                    >
                        Confirmar recusa
                    </Button>
                </div>
            </Modal>
        </div>
    );
}