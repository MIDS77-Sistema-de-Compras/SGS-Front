"use client";

import SearchableSelect from "@/components/ui/select/SearchableSelect";

export default function ProductModal({
    isModalOpen,
    editing,
    selectedProduct,
    editedProduct,
    setEditedProduct,
    closeModal,
    handleSave,
    crBranchOptions,
    crBranchOptionsLoading,
    selectedCrBranchId,
    setSelectedCrBranchId,
    crBranchLabel,
}) {
    if (!selectedProduct) return null;

    return (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white dark:bg-[#303746] p-8 rounded-2xl max-w-md w-full shadow-xl border border-gray-100 dark:border-white/10 relative transition-all duration-300 transform ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 dark:text-[#C3C6D3] hover:text-gray-600 dark:hover:text-[#E2E2EA] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                    </svg>
                </button>

                <h3 className="text-xl font-bold text-[#103D85] dark:text-[#E2E2EA] mb-2">Informações Adicionais</h3>
                <p className="text-sm text-gray-500 dark:text-[#C3C6D3] mb-4">
                    Item: <span className="font-semibold text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.code} - {selectedProduct.nome}</span>
                </p>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block mb-1">Nome</label>
                        {editing ? (
                            <input value={editedProduct.nome} onChange={(e) => setEditedProduct({ ...editedProduct, nome: e.target.value })} className="border dark:border-white/15 dark:bg-[#1A2233] dark:text-[#E2E2EA] rounded-lg px-3 py-2 w-full text-sm" />
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA] break-all">{selectedProduct.nome}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block">Variação</label>
                        {editing ? (
                            <input value={editedProduct.variation} onChange={(e) => setEditedProduct({ ...editedProduct, variation: e.target.value })} className="border dark:border-white/15 dark:bg-[#1A2233] dark:text-[#E2E2EA] rounded-lg px-3 py-2 w-full text-sm" />
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.variation}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block mb-1">Quantidade</label>
                        {editing ? (
                            <input type="number" value={editedProduct.quantity} onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })} className="border dark:border-white/15 dark:bg-[#1A2233] dark:text-[#E2E2EA] rounded-lg px-3 py-2 w-full text-sm" />
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.quantity}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block mb-1">Unidade de Medida</label>
                        {editing ? (
                            <select value={editedProduct.unit} onChange={(e) => setEditedProduct({ ...editedProduct, unit: e.target.value })} className="border dark:border-white/15 dark:bg-[#1A2233] dark:text-[#E2E2EA] rounded-lg px-3 py-2 w-full text-sm">
                                <option value="UNIDADE">Unidade</option>
                                <option value="CAIXA">Caixa</option>
                                <option value="PACOTE">Pacote</option>
                                <option value="KG">Kg</option>
                                <option value="LITRO">Litro</option>
                            </select>
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.unit}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block mb-1">CR e Filial</label>
                        {editing ? (
                            <SearchableSelect
                                name="crBranch"
                                placeholder={crBranchOptionsLoading ? "Carregando..." : "Selecione o CR e Projeto..."}
                                options={crBranchOptions}
                                value={selectedCrBranchId}
                                onChange={(e) => setSelectedCrBranchId(e.target.value)}
                                isRequired
                            />
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{crBranchLabel}</span>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block mb-1">Informações Adicionais</label>
                        {editing ? (
                            <textarea value={editedProduct.additionalInfo} onChange={(e) => setEditedProduct({ ...editedProduct, additionalInfo: e.target.value })} className="border dark:border-white/15 dark:bg-[#1A2233] dark:text-[#E2E2EA] rounded-lg px-3 py-2 w-full text-sm" rows={3} />
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-[#C3C6D3] leading-relaxed break-all">{selectedProduct.additionalInfo}</p>
                        )}
                    </div>

                    {!editing && (
                        <div className="bg-gray-50 dark:bg-[#1A2233] p-4 rounded-xl border border-gray-100 dark:border-white/10">
                            <h4 className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider mb-1">Motivo / Parecer do Supervisor:</h4>
                            <p className="text-sm text-gray-600 dark:text-[#C3C6D3] leading-relaxed">
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
                        <button onClick={handleSave} className="bg-green-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                            Concluir
                        </button>
                    )}
                    <button onClick={closeModal} className="bg-[#103D85] dark:bg-[#1A4A9E] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                        {editing ? "Cancelar" : "Entendido"}
                    </button>
                </div>
            </div>
        </div>
    );
}