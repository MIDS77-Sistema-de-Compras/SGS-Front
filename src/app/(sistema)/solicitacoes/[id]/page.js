"use client";


import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function MyRequests() {


    const isProfessor = true;
    const isSupervisor = false;


    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [notification, setNotification] = useState(null);


    const [search, setSearch] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [selectedCr, setSelectedCr] = useState("Todos");


    const crOptions = [
        { id: "todos", label: "CR", value: "Todos" },
        { id: "blu", label: "CR-Blumenau", value: "CR-Blumenau" },
        { id: "flo", label: "CR-Florianópolis", value: "CR-Florianópolis" },
        { id: "joi", label: "CR-Joinville", value: "CR-Joinville" }
    ];


    const initialProducts = isSupervisor
        ? [
            {
                code: "IMP-002",
                name: "Impressora",
                variation: "Epson Eco Tank",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Solicitado pelo supervisor da unidade.",
                status: "Auto-Aprovado",
                cr: "CR-Blumenau"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 3,
                unit: "UNIDADE",
                additionalInfo: "Reposição de estoque do laboratório.",
                status: "Auto-Aprovado",
                cr: "CR-Florianópolis"
            }
          ]
        : [
            {
                code: "IMP-002",
                name: "Impressora",
                variation: "Epson Eco Tank",
                quantity: 2,
                unit: "UNIDADE",
                additionalInfo: "Necessário para impressão de relatórios.",
                status: "Em Análise",
                cr: "CR-Blumenau"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "MOU-003",
                name: "Mouse",
                variation: "Mouse Ergonômico",
                quantity: 1,
                unit: "UNIDADE",
                additionalInfo: "Equipamento para estação de trabalho.",
                status: "Aprovado",
                cr: "CR-Florianópolis"
            },
            {
                code: "LEI-022",
                name: "Leite",
                variation: "Leite Italac Desnatado",
                quantity: 3,
                unit: "CAIXA",
                additionalInfo: "Uso interno.",
                status: "Reprovado",
                cr: "CR-Blumenau"
            }
        ];


    const [products, setProducts] = useState(initialProducts);


    const filteredProducts = products.filter((item) => {
        const matchesCr = selectedCr === "Todos" || item.cr === selectedCr;
        const matchesNameFilter = item.name.toLowerCase().includes(nameFilter.toLowerCase());


        const searchTerms = search.toLowerCase();
        const matchesGeneralSearch =
            item.name.toLowerCase().includes(searchTerms) ||
            item.code.toLowerCase().includes(searchTerms) ||
            item.variation.toLowerCase().includes(searchTerms);


        return matchesCr && matchesNameFilter && matchesGeneralSearch;
    });


    const getGeneralStatus = () => {
        const statuses = products.map(p => p.status);


        if (statuses.every(s => s === "Em Análise")) return "Em Análise";
        if (statuses.every(s => s === "Auto-Aprovado")) return "Auto-Aprovado";
        if (statuses.every(s => s === "Aprovado")) return "Aprovado";
        if (statuses.every(s => s === "Reprovado")) return "Reprovado";


        return "Parcial Aprovado";
    };


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


    const handleSave = async () => {
        try {
            setProducts((prev) =>
                prev.map((item) =>
                    item.code === editedProduct.code ? editedProduct : item
                )
            );


            closeModal();


            setNotification({
                type: "success",
                message: "Solicitação updated"
            });


            setNotification({
                type: "success",
                message: "Solicitação atualizada"
            });


            setTimeout(() => setNotification(null), 3000);
        } catch {
            setNotification({
                type: "error",
                message: "Erro ao editar solicitação"
            });


            setTimeout(() => setNotification(null), 3000);
        }
    };


    return (
        <div className="flex-1 p-0 font-sans">
            {notification && (
                <div
                    className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl text-white shadow-lg ${
                        notification.type === "success" ? "bg-green-600" : "bg-red-600"
                    }`}
                >
                    <div className="flex item-center gap-3">
                        <span>{notification.message}</span>
                        <button onClick={() => setNotification(null)}>✕</button>
                    </div>
                </div>
            )}


            <div className="w-full">
                <div className="bg-white rounded-3xl border border-gray-400 shadow-sm p-6 mb-6 h-[601px] flex flex-col">


                    <div className="flex items-center gap-3 mb-6">
                        <button className="text-[#103D85] hover:opacity-80 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <h3 className="text-2xl font-bold text-[#103D85] tracking-tight">Minhas solicitações</h3>
                    </div>


                    <hr className="border-gray-400 mb-6" />


                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-baseline gap-4">
                            <h4 className="text-xl font-bold text-gray-900">CR-0013 : Lista de produtos</h4>
                            <span className="text-gray-400 text-xs font-medium">Realizada em: 12/03/2024</span>
                        </div>
                        <span
                            className={`text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-sm mr-16.5 ${
                                getGeneralStatus() === "Aprovado"
                                    ? "bg-[#4CAF50]"
                                    : getGeneralStatus() === "Reprovado"
                                    ? "bg-[#E50012]"
                                    : getGeneralStatus() === "Auto-Aprovado"
                                    ? "bg-[#8E44AD]"
                                    : getGeneralStatus() === "Em Análise"
                                    ? "bg-[#FFC107]"
                                    : "bg-[#007BFF]"
                            }`}
                        >
                            {getGeneralStatus()}
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
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50/40 transition-colors">
                                            <td className="py-5 px-6 text-left text-sm text-gray-700 font-medium">
                                                {item.code} {item.name}
                                            </td>
                                            <td className="py-5 px-4 text-left text-sm text-gray-500">
                                                {item.variation}
                                            </td>
                                            <td className="py-5 px-4 text-center text-sm text-gray-600 font-medium">
                                                {item.quantity} {item.unit ? item.unit.toLowerCase() : ""}
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
                                                <span
                                                    className={`inline-block text-center text-xs font-bold text-white px-5 py-1.5 rounded-full w-33 shadow-sm tracking-wide ${
                                                        item.status === "Aprovado"
                                                            ? "bg-[#4CAF50]"
                                                            : item.status === "Reprovado"
                                                            ? "bg-[#E50012]"
                                                            : item.status === "Auto-Aprovado"
                                                            ? "bg-[#8E44AD]"
                                                            : "bg-[#FFC107]"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>


                                               
                                                {isProfessor && item.status === "Em Análise" && (
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        title="Editar solicitação"
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-600 transition-colors flex-shrink-0"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                                            Nenhum produto encontrado para os filtros selecionados.
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
                <div
                    className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
                        isModalOpen ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div
                        className={`bg-white p-8 rounded-2xl max-w-md w-full shadow-xl border border-gray-100 relative transition-all duration-300 transform ${
                            isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                        }`}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>


                        <h3 className="text-xl font-bold text-[#103D85] mb-2">Informações Adicionais</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Item: <span className="font-semibold text-gray-700">{selectedProduct.code} - {selectedProduct.name}</span>
                        </p>


                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Nome</label>
                                {editing ? (
                                    <input
                                        value={editedProduct.name}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                                        className="border rounded-lg px-3 py-2 w-full text-sm"
                                    />
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.name}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Variação</label>
                                {editing ? (
                                    <input
                                        value={editedProduct.variation}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, variation: e.target.value })}
                                        className="border rounded-lg px-3 py-2 w-full text-sm"
                                    />
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.variation}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Quantidade</label>
                                {editing ? (
                                    <input
                                        type="number"
                                        value={editedProduct.quantity}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })}
                                        className="border rounded-lg px-3 py-2 w-full text-sm"
                                    />
                                ) : (
                                    <span className="text-sm text-gray-700">{selectedProduct.quantity}</span>
                                )}
                            </div>


                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Unidade de Medida</label>
                                {editing ? (
                                    <select
                                        value={editedProduct.unit}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, unit: e.target.value })}
                                        className="border rounded-lg px-3 py-2 w-full text-sm"
                                    >
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
                                    <textarea
                                        value={editedProduct.additionalInfo}
                                        onChange={(e) => setEditedProduct({ ...editedProduct, additionalInfo: e.target.value })}
                                        className="border rounded-lg px-3 py-2 w-full text-sm"
                                        rows={3}
                                    />
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
                                            : selectedProduct.status === "Auto-Aprovado"
                                            ? "Solicitação originada por Supervisor. Processo elegível para fluxo de aprovação direta."
                                            : "Aguardando análise do supervisor responsável."}
                                    </p>
                                </div>
                            )}
                        </div>


                        <div className="flex justify-end gap-3">
                            {editing && (
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                                >
                                    Concluir
                                </button>
                            )}


                            <button
                                onClick={closeModal}
                                className="bg-[#103D85] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                            >
                                {editing ? "Cancelar" : "Entendido"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

