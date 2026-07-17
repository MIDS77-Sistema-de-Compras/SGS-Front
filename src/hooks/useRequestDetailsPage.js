import { useState } from "react";
import { useParams } from "next/navigation";
import { useRequestDetails } from "@/hooks/useRequestDetails";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";
import { getStatusColor, getStatusLabel } from "@/lib/utils/requestStatus";

export function useRequestDetailsPage() {
  const { id } = useParams();
  const { request: solicitacao, loading, error, refetch } = useRequestDetails(id);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [editedProductsByRequestId, setEditedProductsByRequestId] = useState({});

  const localProducts = editedProductsByRequestId[id] || solicitacao?.produtos || [];
  const localServices = solicitacao?.servicos || [];
  const isServiceRequest = localProducts.length === 0 && localServices.length > 0;

  const statusGeral = getStatusLabel(solicitacao?.status || calcularStatusSolicitacao(localProducts));
  const corGeral = getStatusColor(statusGeral);

  const openModal = (item) => {
    setSelectedProduct(item);
    setEditedProduct({ ...item });
    setEditing(false);
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const openEditModal = (item) => {
    setSelectedProduct(item);
    setEditedProduct({ ...item });
    setEditing(true);
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const handleSave = () => {
    try {
      setEditedProductsByRequestId((prev) => ({
        ...prev,
        [id]: localProducts.map((item) => (item.id === editedProduct.id ? editedProduct : item)),
      }));
      closeModal();
      setNotification({ type: "success", message: "Solicitação atualizada com sucesso!" });
      setTimeout(() => setNotification(null), 3000);
    } catch {
      setNotification({ type: "error", message: "Erro ao editar solicitação" });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return {
    id, solicitacao, loading, error, refetch,
    localProducts, localServices, isServiceRequest,
    statusGeral, corGeral,
    selectedProduct, isModalOpen, editing, editedProduct, setEditedProduct,
    notification, setNotification,
    openModal, openEditModal, closeModal, handleSave,
  };
}