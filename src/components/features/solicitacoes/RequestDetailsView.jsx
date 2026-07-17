"use client";

import { useState } from "react";
import Link from "next/link";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import ProductTable from "@/components/features/solicitacoes/ProductTable";
import ProductModal from "@/components/features/solicitacoes/ProductModal";
import RequestDetailsSkeleton from "@/components/features/solicitacoes/RequestDetailsSkeleton";
import RejectionModal from "@/components/ui/overlay/RejectionModal";
import { useRequestDetailsPage } from "@/hooks/useRequestDetailsPage";

function formatDisplayDate(date) {
  if (!date) return "-";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "-";
  return parsedDate.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export default function RequestDetailsView({ title, backHref, mode }) {
  useDocumentTitle(title);
  const isAnalysis = mode === "gestao";
  const isProfessor = true;

  const {
    solicitacao, loading, error,
    localProducts, localServices, isServiceRequest,
    statusGeral, corGeral,
    selectedProduct, isModalOpen, editing, editedProduct, setEditedProduct,
    notification, setNotification,
    openModal, openEditModal, closeModal, handleSave,
  } = useRequestDetailsPage();

  const [itemDecisions, setItemDecisions] = useState({});
  const [decidingItemId, setDecidingItemId] = useState(null);
  const [rejectItemTarget, setRejectItemTarget] = useState(null);

  const handleAcceptItem = async (item) => {
    setDecidingItemId(item.id);
    try {
      setItemDecisions((prev) => ({ ...prev, [item.id]: "Aceito" }));
    } finally {
      setDecidingItemId(null);
    }
  };

  const handleRejectItem = async (justificativa) => {
    const item = rejectItemTarget;
    setDecidingItemId(item.id);
    try {
      setItemDecisions((prev) => ({ ...prev, [item.id]: "Recusado" }));
      setRejectItemTarget(null);
    } finally {
      setDecidingItemId(null);
    }
  };

  if (loading) return <RequestDetailsSkeleton />;

  if (error || !solicitacao) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-[#C3C6D3] text-lg mb-4">
            {error || "Solicitação não encontrada."}
          </p>
          <Link href={backHref} className="text-[#103D85] dark:text-[#5D8EF7] underline">
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-0">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-white shadow-lg ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          <div className="flex items-center gap-3">
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="hover:opacity-80">×</button>
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="border border-gray-100 shadow-sm dark:border-white/10 dark:bg-[#1A2233] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">
          <div className="flex items-center gap-3 px-5 py-3">
            <Link href={backHref} className="text-[#103D85] dark:text-[#5D8EF7] hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
            <h3 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">{title}</h3>
          </div>

          <hr className="border-gray-100 dark:border-white/10 mb-6" />

          <div className="mb-6 px-4 sm:px-6">
            <div className="flex items-start justify-between gap-3 min-[1350px]:items-center">
              <div className="flex flex-col gap-1 min-w-0 min-[1350px]:flex-row min-[1350px]:items-baseline min-[1350px]:gap-4">
                <h4 className="text-[16px] sm:text-[18px] min-[1350px]:text-[20px] font-bold text-gray-900 dark:text-[#E2E2EA]">
                  {solicitacao.codigo} : Lista de{" "}
                  {isServiceRequest ? localServices.length : localProducts.length}{" "}
                  {isServiceRequest
                    ? localServices.length === 1 ? "serviço" : "serviços"
                    : localProducts.length === 1 ? "produto" : "produtos"}
                </h4>
                <span className="text-gray-600 dark:text-[#C3C6D3] text-[13px] sm:text-sm min-[1350px]:text-[16px] font-medium whitespace-nowrap min-[1350px]:px-7">
                  Realizada em: {formatDisplayDate(solicitacao.data)}
                </span>
              </div>
              <span className={`inline-block shrink-0 whitespace-nowrap text-center text-[12px] sm:text-[13px] min-[1350px]:text-[14px] font-semibold text-white py-1 px-3 rounded-full min-w-[140px] min-[1350px]:min-w-[150px] shadow-sm tracking-wide ${corGeral}`}>
                {statusGeral}
              </span>
            </div>
          </div>

          <ProductTable
            localProducts={isServiceRequest ? localServices : localProducts}
            isProfessor={isProfessor}
            openModal={openModal}
            openEditModal={openEditModal}
            isServiceRequest={isServiceRequest}
            showItemDecisions={isAnalysis}
            itemDecisions={itemDecisions}
            decidingItemId={decidingItemId}
            onAcceptItem={handleAcceptItem}
            onRejectItem={(item) => setRejectItemTarget(item)}
          />
        </div>

        <div className="flex justify-stretch sm:justify-end pt-5">
          <Link
            href={backHref}
            className="w-full sm:w-auto text-center bg-[#103D85] dark:bg-[#1A4A9E] text-white font-bold text-sm px-11 py-3 rounded-xl hover:bg-[#0c2f66] dark:hover:bg-[#2456b0] transition-colors shadow-sm"
          >
            Fechar solicitação
          </Link>
        </div>
      </div>

      <ProductModal
        isModalOpen={isModalOpen}
        editing={editing}
        selectedProduct={selectedProduct}
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
        closeModal={closeModal}
        handleSave={handleSave}
      />

      {isAnalysis && (
        <RejectionModal
          isOpen={!!rejectItemTarget}
          onClose={() => setRejectItemTarget(null)}
          onConfirm={handleRejectItem}
          isLoading={decidingItemId === rejectItemTarget?.id}
          title="Recusar item"
          description={`Informe o motivo da recusa do item "${rejectItemTarget?.nome || rejectItemTarget?.descricao || ""}".`}
        />
      )}
    </div>
  );
}