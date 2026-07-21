import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useRequestDetails } from "@/hooks/useRequestDetails";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import { getStatusColor, getStatusLabel, isRequestEditable } from "@/lib/utils/requestStatus";
import { api, getPageContent } from "@/service/api";
import { editFullRequest, getAllMeasurementUnits } from "@/service/createProductRequest";
import { getUserRole } from "@/lib/utils/getUserRole";
import { useNotification } from "@/contexts/NotificationContext";

export function useRequestDetailsPage({ ownRequest = false } = {}) {
  const { id } = useParams();
  const { request: solicitacao, loading, error, refetch } = useRequestDetails(id, { ownRequest });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [selectedCrBranchId, setSelectedCrBranchId] = useState("");
  const [crBranchOptions, setCrBranchOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const { showNotification } = useNotification();
  
  const setNotification = (payload) => {
    if (payload?.message) showNotification(payload.message, payload.type);
  };

  const localProducts = solicitacao?.produtos || [];
  const localServices = solicitacao?.servicos || [];
  const isServiceRequest = localProducts.length === 0 && localServices.length > 0;
  const currentRole = (getUserRole() || "").replace(/^ROLE_/, "");
  const canEditRequest = isRequestEditable(solicitacao?.status)
    && ["DOCENTE", "SUPERVISOR", "COORDENADOR"].includes(currentRole);

  const statusGeral = getStatusLabel(solicitacao?.status || calcularStatusSolicitacao(localProducts));
  const corGeral = getStatusColor(statusGeral);

  useEffect(() => {
    if (!isModalOpen || !canEditRequest || crBranchOptions.length > 0) return;

    let cancelled = false;
    async function loadOptions() {
      try {
        setOptionsLoading(true);
        const [crs, units] = await Promise.all([
          api.get("/cr-branches?size=1000"),
          getAllMeasurementUnits(),
        ]);
        if (cancelled) return;

        setCrBranchOptions(getPageContent(crs).map((cr) => ({
          value: String(cr.id),
          label: `${cr.crCode} - ${cr.crName}${cr.branchName ? ` | ${cr.branchName}` : ""}`,
        })));
        setUnitOptions(getPageContent(units).map((unit) => ({
          value: unit.name,
          label: unit.abbreviation ? `${unit.name} (${unit.abbreviation})` : unit.name,
        })));
      } catch (optionError) {
        setNotification({ type: "error", message: optionError.message || "Erro ao carregar opções de edição." });
      } finally {
        if (!cancelled) setOptionsLoading(false);
      }
    }
    loadOptions();
    return () => { cancelled = true; };
  }, [canEditRequest, crBranchOptions.length, isModalOpen]);

  const openModal = (item) => {
    setSelectedProduct(item);
    setEditedProduct({ ...item });
    setSelectedCrBranchId(String(solicitacao?.crBranchId || solicitacao?.crBranch?.id || ""));
    setEditing(false);
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const openEditModal = (item) => {
    openModal(item);
    if (canEditRequest) setEditing(true);
  };

  const beginEditing = () => {
    setEditedProduct({ ...selectedProduct });
    setSelectedCrBranchId(String(solicitacao?.crBranchId || solicitacao?.crBranch?.id || ""));
    setEditing(true);
  };

  const discardEdit = () => {
    setEditedProduct({ ...selectedProduct });
    setSelectedCrBranchId(String(solicitacao?.crBranchId || solicitacao?.crBranch?.id || ""));
    setEditing(false);
  };

  const closeModal = () => {
    setEditing(false);
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleSave = async () => {
    if (!editedProduct || !selectedCrBranchId) return;

    try {
      setSavingEdit(true);
      const payload = {
        crBranchId: Number(selectedCrBranchId),
        retainedAttachmentIds: (solicitacao.attachments || []).map((attachment) => attachment.id),
      };

      if (isServiceRequest) {
        payload.provisions = localServices.map((service) => {
          const item = service.id === editedProduct.id ? editedProduct : service;
          return {
            provisionId: item.provisionId || null,
            name: item.nome,
            totalValue: Number(item.totalValue),
            description: item.description || item.additionalInfo,
            additionalInformation: item.additionalInformation ?? item.additionalInfo ?? "",
          };
        });
      } else {
        payload.products = localProducts.map((product) => {
          const item = product.id === editedProduct.id ? editedProduct : product;
          return {
            productName: item.nome,
            variation: item.variation || "",
            measurementUnit: item.unit,
            quantity: Number(item.quantity),
            additionalInformations: item.additionalInformations ?? item.additionalInfo ?? "",
          };
        });
      }

      await editFullRequest({ id, payload });
      await refetch();
      closeModal();
      showNotification("Solicitação atualizada com sucesso!", "success");
    } catch (saveError) {
      showNotification(saveError.message || "Erro ao editar solicitação.", "error");
    } finally {
      setSavingEdit(false);
    }
  };

  return {
    id, solicitacao, loading, error, refetch,
    localProducts, localServices, isServiceRequest, canEditRequest,
    statusGeral, corGeral,
    selectedProduct, isModalOpen, editing, editedProduct, setEditedProduct,
    selectedCrBranchId, setSelectedCrBranchId,
    crBranchOptions, unitOptions, optionsLoading, savingEdit,
    setNotification,
    openModal, openEditModal, beginEditing, discardEdit, closeModal, handleSave,
  };
}