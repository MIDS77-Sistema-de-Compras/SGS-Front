



"use client";


import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";


const solicitacoes = [
    {
        id: 1,
        codigo: "CR-0013",
        data: "2026-03-10",
        produtos: [
            { code: "MOU-001", nome: "Mouse", status: "Reprovado", variation: "Mouse Ergonômico", quantity: 1, unit: "UNIDADE", additionalInfo: "Equipamento para estação de trabalho.", cr: "CR-Blumenau" },
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
    "Aprovado": "bg-[#4CAF50]"
};


function calcularStatusSolicitacao(produtos) {
    if (produtos.every(p => p.status === "Aprovado")) return "Aprovado";
    if (produtos.every(p => p.status === "Reprovado")) return "Reprovado";
    if (produtos.every(p => p.status === "Em análise")) return "Em análise";
    return "Parcial Aprovado";
}


export default function MyRequests() {
    const { id } = useParams();


    const solicitacao = solicitacoes.find(s => s.id === Number(id));
    const products = solicitacao?.produtos ?? [];


    const isProfessor = true;


    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [notification, setNotification] = useState(null);
    const [localProducts, setLocalProducts] = useState(products);


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
                <div className="bg-white rounded-3xl border border-gray-400 shadow-sm p-6 mb-6 h-[601px] flex flex-col">


                    <div className="flex items-center gap-3 mb-6">
                        <Link href="/solicitacoes" className="text-[#103D85] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Link>
                        <h3 className="text-2xl font-bold text-[#103D85] tracking-tight">Minhas solicitações</h3>
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
                        <span className={`inline-block text-center text-xs font-bold text-white px-5 py-1.5 rounded-full w-32 shadow-sm tracking-wide mr-16 ${corGeral}`}>
                          {statusGeral}
                        </span>
                    </div>


                    <div className="w-full flex-1 overflow-y-auto">
                        <table className="w-full border-collapse">
                            <thead className="sticky top-0 z-10">
                                <tr className="bg-[#EEF2F6]">
                                    <th className="py-3 px-6 text-left text-sm font-bold text-[#103D85] rounded-l-xl w-1/3">Produto</th>
                                    <th className="py-3 px-4 text-left text-sm font-bold text-[#103D85] w-1/4">Variação</th>
                                    <th className="py-3 px-4 text-center text-sm font-bold text-[#103D85] w-24">Quantidade</th>
                                    <th className="py-3 px-4 text-center text-sm font-bold text-[#103D85] w-32">Informações adicionais</th>
                                    <th className="py-3 px-6 text-center text-sm font-bold text-[#103D85] rounded-r-xl w-32">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {localProducts.length > 0 ? (
                                    localProducts.map((item) => (
                                        <tr key={item.code} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="py-5 px-6 text-left text-sm text-gray-700 font-medium">
                                                {item.code} {item.nome}
                                            </td>
                                            <td className="py-5 px-4 text-left text-sm text-gray-500">
                                                {item.variation}
                                            </td>
                                            <td className="py-5 px-4 text-center text-sm text-gray-600 font-medium">
                                                {item.quantity} {item.unit?.toLowerCase()}
                                            </td>
                                            <td className="py-5 px-4 text-center text-sm">
                                                <button
                                                    onClick={() => openModal(item)}
                                                    className="text-gray-400 underline underline-offset-2 hover:text-gray-600 text-xs transition-colors"
                                                >
                                                    Ver mais
                                                </button>
                                            </td>
                                            <td className="py-5 px-6 text-center relative">
                                                <span className={`inline-block text-center text-xs font-bold text-white px-5 py-1.5 rounded-full w-32 shadow-sm tracking-wide ${STATUS_CORES[item.status] || "bg-gray-400"}`}>
                                                    {item.status}
                                                </span>
                                                {isProfessor && item.status === "Em análise" && (
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        title="Editar solicitação"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-600 transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                                            <path d="m15 5 4 4"/>
                                                        </svg>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                                            Nenhum produto encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
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


            {selectedProduct && (
                <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}>
                    <div className={`bg-white p-8 rounded-2xl max-w-md w-full shadow-xl border border-gray-100 relative transition-all duration-300 transform ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                            </svg>
                        </button>


                        <h3 className="text-xl font-bold text-[#103D85] mb-2">Informações Adicionais</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Item: <span className="font-semibold text-gray-700">{selectedProduct.code} - {selectedProduct.nome}</span>
                        </p>


                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Nome</label>
                                {editing ? (
                                    <input value={editedProduct.nome} onChange={(e) => setEditedProduct({ ...editedProduct, nome: e.target.value })} className="border rounded-lg px-3 py-2 w-full text-sm" />
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.nome}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Variação</label>
                                {editing ? (
                                    <input value={editedProduct.variation} onChange={(e) => setEditedProduct({ ...editedProduct, variation: e.target.value })} className="border rounded-lg px-3 py-2 w-full text-sm" />
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.variation}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Quantidade</label>
                                {editing ? (
                                    <input type="number" value={editedProduct.quantity} onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })} className="border rounded-lg px-3 py-2 w-full text-sm" />
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.quantity}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Unidade de Medida</label>
                                {editing ? (
                                    <select value={editedProduct.unit} onChange={(e) => setEditedProduct({ ...editedProduct, unit: e.target.value })} className="border rounded-lg px-3 py-2 w-full text-sm">
                                        <option value="UNIDADE">Unidade</option>
                                        <option value="CAIXA">Caixa</option>
                                        <option value="PACOTE">Pacote</option>
                                        <option value="KG">Kg</option>
                                        <option value="LITRO">Litro</option>
                                    </select>
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.unit}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Informações Adicionais</label>
                                {editing ? (
                                    <textarea value={editedProduct.additionalInfo} onChange={(e) => setEditedProduct({ ...editedProduct, additionalInfo: e.target.value })} className="border rounded-lg px-3 py-2 w-full text-sm" rows={3} />
                                ) : (
                                    <p className="text-sm text-gray-600 leading-relaxed">{selectedProduct.additionalInfo}</p>
                                )}
                            </div>


                            {!editing && (
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Motivo / Parecer do Supervisor:</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {selectedProduct.status === "Aprovado"
                                            ? "A solicitação cumpre com os requisitos técnicos da unidade e o orçamento está dentro do limite estipulado para o trimestre corrente."
                                            : selectedProduct.status === "Reprovado"
                                            ? "A compra foi recusada temporariamente pois identificamos itens similares disponíveis no estoque central da instituição para remanejamento."
                                            : "Aguardando análise do supervisor responsável."}
                                    </p>
                                </div>
                            )}
                        </div>


                        <div className="flex justify-end gap-3">
                            {editing && (
                                <button onClick={handleSave} className="bg-green-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                                    Concluir
                                </button>
                            )}
                            <button onClick={closeModal} className="bg-[#103D85] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                                {editing ? "Cancelar" : "Entendido"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}