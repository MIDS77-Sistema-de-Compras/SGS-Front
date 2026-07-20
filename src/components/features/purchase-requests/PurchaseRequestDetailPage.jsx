"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import ProductTable from "@/components/features/solicitacoes/ProductTable";
import ProductModal from "@/components/features/solicitacoes/ProductModal";
import Button from "@/components/ui/button/Button";
import { useRequestDetails } from "@/hooks/useRequestDetails";
import { useCompradorItemStatusFlow } from "@/hooks/useCompradorItemStatusFlow";
import {
    getStatusColor,
    getStatusLabel,
    keepOnlyApprovedItemsIfPartial,
    COMPRADOR_STATUS_OPTIONS,
} from "@/lib/utils/requestStatus";

function formatDisplayDate(date) {
    if (!date) return "-";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("pt-BR");
}

export default function PurchaseRequestDetailPage() {
    const { id } = useParams();
    const { request: solicitacaoBruta, loading, error, refetch } = useRequestDetails(id);
    const solicitacao = solicitacaoBruta ? keepOnlyApprovedItemsIfPartial(solicitacaoBruta) : null;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notification, setNotification] = useState(null);

    const localProducts = solicitacao?.produtos || [];
    const localServices = solicitacao?.servicos || [];
    const isServiceRequest = localProducts.length === 0 && localServices.length > 0;
    const itensEmAnalise = isServiceRequest ? localServices : localProducts;

    const {
        itemDecisions,
        saving,
        hasPendingChanges,
        handleItemStatusChange,
        handleSaveChanges,
    } = useCompradorItemStatusFlow({
        requestId: id,
        items: itensEmAnalise,
        isServiceRequest,
        refetch,
        setNotification,
    });

    const statusGeral = getStatusLabel(solicitacao?.status);
    const corGeral = getStatusColor(solicitacao?.status);

    const openModal = (item) => {
        setSelectedProduct(item);
        setTimeout(() => setIsModalOpen(true), 10);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProduct(null), 300);
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 dark:text-[#C3C6D3] text-lg">Carregando solicitação...</p>
            </div>
        );
    }

    if (error || !solicitacao) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 dark:text-[#C3C6D3] text-lg mb-4">{error || "Solicitação não encontrada."}</p>
                    <Link href="/solicitacoes-compra" className="text-[#103D85] dark:text-[#5D8EF7] underline">
                        Voltar para solicitações
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-0">
            {notification && (
                <div className={`fixed top-4 right-4 z-50 max-w-[calc(100vw-2rem)] px-5 py-3 rounded-xl text-white shadow-sm ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                    <div className="flex items-center gap-3">
                        <span>{notification.message}</span>
                        <button onClick={() => setNotification(null)} className="hover:opacity-80">×</button>
                    </div>
                </div>
            )}

            <div className="w-full">
                <div className="border border-gray-100 shadow-sm dark:border-white/10 dark:bg-[#1A2233] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">
                    <div className="flex items-center gap-3 px-5 py-3">
                        <Link href="/solicitacoes-compra" className="text-[#103D85] dark:text-[#5D8EF7] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Link>
                        <h3 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[18px] sm:text-[22px]">Detalhes Solicitação</h3>
                    </div>

                    <hr className="border-gray-100 dark:border-white/10 mb-6" />

                    <div className="mb-6 px-4 sm:px-6">
                        <div className="flex flex-col gap-3 min-[1350px]:flex-row min-[1350px]:items-center min-[1350px]:justify-between">
                            <div className="flex flex-col gap-1 min-w-0 min-[1350px]:flex-row min-[1350px]:items-baseline min-[1350px]:gap-4">
                                <h4 className="text-[16px] sm:text-[18px] min-[1350px]:text-[20px] font-bold text-gray-900 dark:text-[#E2E2EA]">
                                {solicitacao.codigo} : Lista de{" "}
                                {isServiceRequest ? localServices.length : localProducts.length}{" "}
                                {isServiceRequest
                                    ? localServices.length === 1
                                        ? "serviço"
                                        : "serviços"
                                    : localProducts.length === 1
                                        ? "produto"
                                        : "produtos"}
                                </h4>
                                <span className="text-gray-600 dark:text-[#C3C6D3] text-[13px] sm:text-sm min-[1350px]:text-[16px] font-medium whitespace-nowrap min-[1350px]:px-7">
                                    Realizada em: {formatDisplayDate(solicitacao.data)}
                                </span>
                            </div>
                            <span className={`inline-block w-fit shrink-0 whitespace-nowrap text-center text-[12px] sm:text-[13px] font-semibold text-white py-1 px-3 rounded-full min-w-[140px] min-[1350px]:min-w-[150px] shadow-sm tracking-wide min-[1350px]:mr-8 ${corGeral}`}>
                                {statusGeral}
                            </span>
                        </div>
                    </div>

                    <ProductTable
                        localProducts={itensEmAnalise}
                        openModal={openModal}
                        isServiceRequest={isServiceRequest}
                        showItemDecisions
                        itemDecisions={itemDecisions}
                        itemStatusOptions={COMPRADOR_STATUS_OPTIONS}
                        onItemStatusChange={handleItemStatusChange}
                    />
                </div>

      <div className="flex justify-stretch sm:justify-end pt-5">
    {hasPendingChanges ? (
        <Button
            variant="primary"
            fullWidth
            className="sm:w-auto px-11 py-3 rounded-xl"
            isLoading={saving}
            onClick={handleSaveChanges}
        >
            Salvar alterações
        </Button>
    ) : (
        <Link
            href="/solicitacoes-compra"
            className="w-full sm:w-auto text-center bg-[#103D85] dark:bg-[#1A4A9E] text-white font-bold text-sm px-11 py-3 rounded-xl hover:bg-[#0c2f66] dark:hover:bg-[#2456b0] transition-colors shadow-sm"
        >
            Fechar produtos
        </Link>
    )}
</div>
            </div>

            <ProductModal
                isModalOpen={isModalOpen}
                editing={false}
                selectedProduct={selectedProduct}
                editedProduct={selectedProduct}
                setEditedProduct={() => {}}
                closeModal={closeModal}
                handleSave={closeModal}
                crBranchLabel={solicitacao.crBranchLabel}
            />
        </div>
    );
}
