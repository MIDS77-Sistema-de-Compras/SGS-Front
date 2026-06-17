"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import ProductTable from "@/components/features/solicitacoes/ProductTable";
import ProductModal from "@/components/features/solicitacoes/ProductModal";

const solicitacoes = [
    {
        id: 1,
        codigo: "CR-0013",
        data: "2026-03-10",
        produtos: [
            { code: "MOU-001", nome: "Mouse Gamer RGB Wireless Pro Max Edição Limitada", status: "Reprovado", variation: "Mouse Ergonômico Sem Fio Recarregável Edition", quantity: 1, unit: "UNIDADE", additionalInfo: "Equipamento para estação de trabalho.", cr: "CR-Blumenau" },
            { code: "TEC-001", nome: "Teclado", status: "Reprovado", variation: "Teclado Mecânico", quantity: 1, unit: "UNIDADE", additionalInfo: "Reposição de teclado danificado.", cr: "CR-Blumenau" },
            { code: "MON-001", nome: "Monitor", status: "Reprovado", variation: "Monitor 24\" Full HD", quantity: 1, unit: "UNIDADE", additionalInfo: "Monitor para laboratório de informática.", cr: "CR-Blumenau" }
        ]
    },
    {
        id: 2,
        codigo: "CR-1377",
        data: "2026-03-12",
        produtos: [
            { code: "MOU-002", nome: "Mouse", status: "Em análise", variation: "Mouse Ergonômico", quantity: 2, unit: "UNIDADE", additionalInfo: "Equipamento para estação de trabalho.", cr: "CR-Florianópolis" },
            { code: "TEC-002", nome: "Teclado", status: "Em análise", variation: "Teclado Sem Fio", quantity: 2, unit: "UNIDADE", additionalInfo: "Teclados para sala de reunião.", cr: "CR-Florianópolis" }
        ]
    },
    {
        id: 3,
        codigo: "CR-2606",
        data: "2026-04-12",
        produtos: [
            { code: "MOU-003", nome: "Mouse", status: "Aprovado", variation: "Mouse Ergonômico", quantity: 3, unit: "UNIDADE", additionalInfo: "Reposição de estoque.", cr: "CR-Joinville" },
            { code: "TEC-003", nome: "Teclado", status: "Aprovado", variation: "Teclado Mecânico", quantity: 3, unit: "UNIDADE", additionalInfo: "Reposição de estoque.", cr: "CR-Joinville" }
        ]
    },
    {
        id: 4,
        codigo: "CR-0020",
        data: "2026-04-15",
        produtos: [
            { code: "MOU-004", nome: "Mouse", status: "Reprovado", variation: "Mouse USB", quantity: 1, unit: "UNIDADE", additionalInfo: "Substituição de equipamento com defeito.", cr: "CR-Blumenau" },
            { code: "TEC-004", nome: "Teclado", status: "Reprovado", variation: "Teclado ABNT2", quantity: 1, unit: "UNIDADE", additionalInfo: "Substituição de equipamento com defeito.", cr: "CR-Blumenau" },
            { code: "MON-002", nome: "Monitor", status: "Reprovado", variation: "Monitor 27\" 4K", quantity: 1, unit: "UNIDADE", additionalInfo: "Upgrade de monitor para designer.", cr: "CR-Blumenau" }
        ]
    },
    {
        id: 5,
        codigo: "CR-1567",
        data: "2026-04-30",
        produtos: [
            { code: "MOU-005", nome: "Mouse", status: "Em análise", variation: "Mouse Sem Fio", quantity: 2, unit: "UNIDADE", additionalInfo: "Uso em apresentações.", cr: "CR-Florianópolis" },
            { code: "TEC-005", nome: "Teclado", status: "Em análise", variation: "Teclado Compacto", quantity: 2, unit: "UNIDADE", additionalInfo: "Uso em apresentações.", cr: "CR-Florianópolis" }
        ]
    },
    {
        id: 6,
        codigo: "CR-2093",
        data: "2026-05-01",
        produtos: [
            { code: "MOU-006", nome: "Mouse", status: "Aprovado", variation: "Mouse Ergonômico", quantity: 5, unit: "UNIDADE", additionalInfo: "Reposição geral de laboratório.", cr: "CR-Joinville" },
            { code: "TEC-006", nome: "Teclado", status: "Aprovado", variation: "Teclado Mecânico", quantity: 5, unit: "UNIDADE", additionalInfo: "Reposição geral de laboratório.", cr: "CR-Joinville" },
            { code: "MON-003", nome: "Monitor", status: "Aprovado", variation: "Monitor 24\" Full HD", quantity: 5, unit: "UNIDADE", additionalInfo: "Reposição geral de laboratório.", cr: "CR-Joinville" }
        ]
    },
    {
        id: 7,
        codigo: "CR-3048",
        data: "2026-05-05",
        produtos: [
            { code: "MOU-007", nome: "Mouse", status: "Aprovado", variation: "Mouse USB", quantity: 1, unit: "UNIDADE", additionalInfo: "Equipamento para novo colaborador.", cr: "CR-Blumenau" },
            { code: "TEC-007", nome: "Teclado", status: "Reprovado", variation: "Teclado Gamer", quantity: 1, unit: "UNIDADE", additionalInfo: "Teclado gamer não se enquadra na política de compras.", cr: "CR-Blumenau" }
        ]
    },
    {
        id: 8,
        codigo: "CR-4009",
        data: "2026-05-12",
        produtos: [
            { code: "MOU-008", nome: "Mouse", status: "Reprovado", variation: "Mouse Vertical", quantity: 2, unit: "UNIDADE", additionalInfo: "Solicitação para ergonomia.", cr: "CR-Florianópolis" },
            { code: "TEC-008", nome: "Teclado", status: "Aprovado", variation: "Teclado Sem Fio", quantity: 2, unit: "UNIDADE", additionalInfo: "Reposição aprovada.", cr: "CR-Florianópolis" },
            { code: "MON-004", nome: "Monitor", status: "Aprovado", variation: "Monitor 22\" HD", quantity: 2, unit: "UNIDADE", additionalInfo: "Reposição aprovada.", cr: "CR-Florianópolis" }
        ]
    }
];

const STATUS_CORES = {
    "Em análise": "bg-[#FFC107]",
    "Reprovado": "bg-[#E50012]",
    "Parcial Aprovado": "bg-[#007BFF]",
    "Aprovado": "bg-[#4CAF50]",
    "Auto-Aprovado": "bg-[#8E44AD]"
};

function calcularStatusSolicitacao(produtos) {
    if (produtos.every(p => p.status === "Aprovado")) return "Aprovado";
    if (produtos.every(p => p.status === "Reprovado")) return "Reprovado";
    if (produtos.every(p => p.status === "Em análise")) return "Em análise";
    if (produtos.every(p => p.status === "Auto-Aprovado")) return "Auto-Aprovado";
    return "Parcial Aprovado";
}

export default function MyRequests() {
    const { id } = useParams();

    const isProfessor = true;
    const isSupervisor = false;

    const solicitacao = solicitacoes.find(s => s.id === Number(id));

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [notification, setNotification] = useState(null);
    const [localProducts, setLocalProducts] = useState(solicitacao?.produtos ?? []);

    const statusGeral = calcularStatusSolicitacao(localProducts);
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
            setLocalProducts(prev =>
                prev.map(item => item.code === editedProduct.code ? editedProduct : item)
            );
            closeModal();
            setNotification({ type: "success", message: "Solicitação atualizada com sucesso!" });
            setTimeout(() => setNotification(null), 3000);
        } catch {
            setNotification({ type: "error", message: "Erro ao editar solicitação" });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    if (!solicitacao) {
        return (
            <div className="flex-1 flex items-center justify-center font-sans">
                <div className="text-center">
                    <p className="text-gray-500 text-lg mb-4">Solicitação não encontrada.</p>
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
                        <button onClick={() => setNotification(null)} className="hover:opacity-80">✕</button>
                    </div>
                </div>
            )}

            <div className="w-full">
                
                <div className="bg-white rounded-3xl border border-gray-400 shadow-sm p-6 mb-6 min-h-[500px] flex flex-col">

                    <div className="flex items-center gap-3 mb-6">
                        <Link href="/solicitacoes" className="text-[#103D85] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Link>
                        <h3 className="text-3xl font-bold text-[#103D85] tracking-tight">Minhas solicitações</h3>
                    </div>

                    <hr className="border-gray-400 mb-6 -mx-6" />

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-4">
                            <h4 className="text-2xl font-bold text-gray-900">
                                {solicitacao.codigo} : Lista de {localProducts.length} {localProducts.length === 1 ? "produto" : "produtos"}
                            </h4>
                            <span className="text-gray-600 text-base font-medium">
                                Realizada em: {new Date(solicitacao.data).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        <span className={`inline-block text-center text-sm font-bold text-white px-6 py-1.5 rounded-full w-33 shadow-sm tracking-wide mr-10 ${corGeral}`}>
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

                <div className="flex justify-end">
                    <Link
                        href="/solicitacoes"
                        className="bg-[#103D85] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#0c2f66] transition-colors shadow-sm"
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