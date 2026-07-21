"use client";

import Link from "next/link";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import ProductTable from "@/components/features/solicitacoes/ProductTable";
import ProductModal from "@/components/features/solicitacoes/ProductModal";
import RequestDetailsSkeleton from "@/components/features/solicitacoes/RequestDetailsSkeleton";
import RequestAttachments from "@/components/features/solicitacoes/RequestAttachments";
import RejectionModal from "@/components/ui/overlay/RejectionModal";
import Button from "@/components/ui/button/Button";
import { useRequestDetailsPage } from "@/hooks/useRequestDetailsPage";
import { useItemApprovalFlow } from "@/hooks/useItemApprovalFlow";
import { isFinalizedForSupervisor } from "@/lib/utils/requestStatus";

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
    id, solicitacao, loading, error, refetch,
    localProducts, localServices, isServiceRequest, canEditRequest,
    statusGeral, corGeral,
    selectedProduct, isModalOpen, editing, editedProduct, setEditedProduct,
    selectedCrBranchId, setSelectedCrBranchId,
    crBranchOptions, unitOptions, optionsLoading, savingEdit,
    notification, setNotification,
    openModal, openEditModal, beginEditing, discardEdit, closeModal, handleSave,
  } = useRequestDetailsPage({ ownRequest: mode === "minhas" });

  const itemsEmAnalise = isServiceRequest ? localServices : localProducts;
  const isFinalizada = isAnalysis && isFinalizedForSupervisor(solicitacao?.status);
  const editHref = mode === "gestao"
    ? `/solicitacoes/gestao/${id}/editar`
    : `/solicitacoes/${id}/editar`;

  const {
    itemDecisions,
    rejectItemTarget,
    setRejectItemTarget,
    saving,
    hasPendingChanges,
    handleAcceptItem,
    openRejectModal,
    handleRejectItem,
    handleSaveChanges,
  } = useItemApprovalFlow({
    requestId: id,
    items: itemsEmAnalise,
    isServiceRequest,
    refetch,
    setNotification,
  });

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
                <div className="flex min-w-0 items-center gap-2">
                  <h4 className="text-[16px] sm:text-[18px] min-[1350px]:text-[20px] font-bold text-gray-900 dark:text-[#E2E2EA]">
                    {solicitacao.codigo} : Lista de{" "}
                    {isServiceRequest ? localServices.length : localProducts.length}{" "}
                    {isServiceRequest
                      ? localServices.length === 1 ? "serviço" : "serviços"
                      : localProducts.length === 1 ? "produto" : "produtos"}
                  </h4>
                  {canEditRequest && (
                    <Link
                      href={editHref}
                      className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-[#103D85]/10 hover:text-[#103D85] dark:hover:bg-[#5D8EF7]/10 dark:hover:text-[#5D8EF7]"
                      aria-label={`Editar ${solicitacao.codigo}`}
                      title="Editar solicitação"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </Link>
                  )}
                </div>
                <span className="text-gray-600 dark:text-[#C3C6D3] text-[13px] sm:text-sm min-[1350px]:text-[16px] font-medium whitespace-nowrap min-[1350px]:px-7">
                  Realizada em: {formatDisplayDate(solicitacao.data)}
                </span>
              </div>
              <span className={`inline-block shrink-0 whitespace-nowrap text-center text-[12px] sm:text-[13px] min-[1350px]:text-[14px] font-semibold text-white py-1 px-3 rounded-full min-w-[140px] min-[1350px]:min-w-[150px] shadow-sm tracking-wide ${corGeral}`}>
                {statusGeral}
              </span>
            </div>
          </div>

          {isFinalizada && (
            <div className="mx-4 sm:mx-6 mb-6 rounded-xl border border-[#103D85]/20 bg-[#103D85]/5 dark:border-[#5D8EF7]/20 dark:bg-[#5D8EF7]/5 px-4 py-3 text-sm text-[#103D85] dark:text-[#5D8EF7]">
              Esta solicitação já foi finalizada e seguiu para o fluxo do comprador — não pode mais ser editada aqui.
            </div>
          )}

          <ProductTable
            localProducts={itemsEmAnalise}
            isProfessor={isProfessor}
            openModal={openModal}
            openEditModal={openEditModal}
            isServiceRequest={isServiceRequest}
            showItemDecisions={isAnalysis && !isFinalizada}
            itemDecisions={itemDecisions}
            saving={saving}
            onAcceptItem={handleAcceptItem}
            onRejectItem={openRejectModal}
          />

          <RequestAttachments
            attachments={solicitacao.attachments}
            onError={(message) => setNotification({ type: "error", message })}
          />
        </div>

        <div className="flex justify-stretch sm:justify-end pt-5">
          {hasPendingChanges ? (
            <Button
              variant="primary"
              className="w-full sm:w-auto px-11 py-3 rounded-xl"
              isLoading={saving}
              onClick={handleSaveChanges}
            >
              Salvar alterações
            </Button>
          ) : (
            <Link
              href={backHref}
              className="w-full sm:w-auto text-center bg-[#103D85] dark:bg-[#1A4A9E] text-white font-bold text-sm px-11 py-3 rounded-xl hover:bg-[#0c2f66] dark:hover:bg-[#2456b0] transition-colors shadow-sm"
            >
              Fechar solicitação
            </Link>
          )}
        </div>
      </div>

      <ProductModal
        isModalOpen={isModalOpen}
        editing={editing}
        canEditRequest={canEditRequest}
        isServiceRequest={isServiceRequest}
        selectedProduct={selectedProduct}
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
        closeModal={closeModal}
        beginEditing={beginEditing}
        discardEdit={discardEdit}
        handleSave={handleSave}
        savingEdit={savingEdit}
        crBranchOptions={crBranchOptions}
        unitOptions={unitOptions}
        optionsLoading={optionsLoading}
        selectedCrBranchId={selectedCrBranchId}
        setSelectedCrBranchId={setSelectedCrBranchId}
        crBranchLabel={solicitacao?.crBranch
          ? `${solicitacao.crBranch.crCode} - ${solicitacao.crBranch.crName}${solicitacao.crBranch.branchName ? ` | ${solicitacao.crBranch.branchName}` : ""}`
          : "-"}
      />

      {isAnalysis && (
        <RejectionModal
          isOpen={!!rejectItemTarget}
          onClose={() => setRejectItemTarget(null)}
          onConfirm={handleRejectItem}
          title="Recusar item"
          description={`Informe o motivo da recusa do item "${rejectItemTarget?.nome || rejectItemTarget?.descricao || ""}".`}
        />
      )}
    </div>
  );
}