"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import ProductTable from "@/components/features/solicitacoes/ProductTable";
import ProductModal from "@/components/features/solicitacoes/ProductModal";
import RequestDetailsSkeleton from "@/components/features/solicitacoes/RequestDetailsSkeleton";
import { useRequestDetails } from "@/hooks/useRequestDetails";
import { calcularStatusSolicitacao } from "@/lib/utils/calculateRequestStatus";

const STATUS_CORES = {
    "Em análise": "bg-[#EDAE28]",
    "Aguardando aprovação": "bg-[#EDAE28]",
    "Pendente": "bg-[#EDAE28]",
    "Reprovado": "bg-[#E30613]",
    "Parcial Aprovado": "bg-[#0084FF]",
    "Aprovado": "bg-[#4CAF50]",
    "Auto-Aprovado": "bg-[#8E44AD]",
    "Sem produtos": "bg-gray-400",
};

function formatDisplayDate(date) {
    if (!date) return "-";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("pt-BR");
}

export default function MyRequests() {
    const { id } = useParams();
    const { request: solicitacao, loading, error } = useRequestDetails(id);

    const isProfessor = true;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [notification, setNotification] = useState(null);
    const [editedProductsByRequestId, setEditedProductsByRequestId] = useState({});
    const localProducts = editedProductsByRequestId[id] || solicitacao?.produtos || [];

    const statusGeral = solicitacao?.status || calcularStatusSolicitacao(localProducts);
    const corGeral = STATUS_CORES[statusGeral] || "bg-gray-400";

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
            setEditedProductsByRequestId(prev => ({
                ...prev,
                [id]: localProducts.map(item => item.id === editedProduct.id ? editedProduct : item),
            }));
            closeModal();
            setNotification({ type: "success", message: "Solicitação atualizada com sucesso!" });
            setTimeout(() => setNotification(null), 3000);
        } catch {
            setNotification({ type: "error", message: "Erro ao editar solicitação" });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (loading) {
        return <RequestDetailsSkeleton />;
    }

    if (error || !solicitacao) {
        return (
            <div className="flex-1 flex items-center justify-center font-sans">
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">{error || "Solicitação não encontrada."}</p>
                    <Link href="/solicitacoes" className="text-[#103D85] underline">
                        Voltar para solicitações
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-0 font-sans">
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-white shadow-lg ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                    <div className="flex items-center gap-3">
                        <span>{notification.message}</span>
                        <button onClick={() => setNotification(null)} className="hover:opacity-80">×</button>
                    </div>
                </div>
            )}

            <div className="w-full">
                <div className="border border-[#AAAAAA] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">
                    <div className="flex items-center gap-3 px-5 py-3">
                        <Link href="/solicitacoes" className="text-[#103D85] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Link>
                        <h3 className="text-[#103D85] font-bold text-[22px]">Minhas solicitações</h3>
                    </div>

                    <hr className="border-gray-400 mb-6" />

                    <div className="flex items-center justify-between mb-6 px-6">
                        <div className="flex items-baseline gap-4">
                            <h4 className="text-[20px] font-bold text-gray-900">
                                {solicitacao.codigo} : Lista de {localProducts.length} {localProducts.length === 1 ? "produto" : "produtos"}
                            </h4>
                            <span className="text-gray-600 text-base font-medium px-7 text-[16px]">
                                Realizada em: {formatDisplayDate(solicitacao.data)}
                            </span>
                        </div>
                        <span className={`inline-block text-center text-[13px] font-semibold text-white py-1 rounded-full min-w-[150px] shadow-sm tracking-wide mr-8 ${corGeral}`}>
                            {statusGeral}
                        </span>
                    </div>

                    <ProductTable 
                        localProducts={localProducts}
                        isProfessor={isProfessor}
                        statusCores={STATUS_CORES}
                        openModal={openModal}
                        openEditModal={openEditModal}
                    />
                </div>

                <div className="flex justify-end pt-5">
                    <Link
                        href="/solicitacoes"
                        className="bg-[#103D85] text-white font-bold text-sm px-11 py-3 rounded-xl hover:bg-[#0c2f66] transition-colors shadow-sm"
                    >
                        Fechar produtos
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
        </div>
    );
}
