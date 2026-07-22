"use client";

import ProductAutocomplete from "@/components/features/request-form/ProductAutocomplete";
import ServiceAutocomplete from "@/components/features/request-form/ServiceAutoComplete";
import SearchableSelect from "@/components/ui/select/SearchableSelect";

const inputClass = "border dark:border-white/15 dark:bg-[#1A2233] dark:text-[#E2E2EA] rounded-lg px-3 py-2 w-full text-sm";

function PencilIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
    );
}

function Field({ label, children }) {
    return (
        <div>
            <label className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider block mb-1">
                {label}
            </label>
            {children}
        </div>
    );
}

export default function ProductModal({
    isModalOpen,
    editing,
    canEditRequest,
    isServiceRequest,
    selectedProduct,
    editedProduct,
    setEditedProduct,
    closeModal,
    beginEditing,
    discardEdit,
    handleSave,
    savingEdit,
    crBranchOptions,
    unitOptions,
    optionsLoading,
    selectedCrBranchId,
    setSelectedCrBranchId,
    crBranchLabel,
}) {
    if (!selectedProduct || !editedProduct) return null;

    const update = (field, value) => setEditedProduct((current) => ({ ...current, [field]: value }));

    return (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white dark:bg-[#303746] p-6 sm:p-8 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-100 dark:border-white/10 relative transition-all duration-300 transform ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 dark:text-[#C3C6D3] hover:text-gray-600 dark:hover:text-[#E2E2EA] transition-colors" aria-label="Fechar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>

                <h3 className="text-xl font-bold text-[#103D85] dark:text-[#E2E2EA] mb-2">Informações Adicionais</h3>
                <p className="text-sm text-gray-500 dark:text-[#C3C6D3] mb-4">
                    Item: <span className="font-semibold text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.code || `SERV-${selectedProduct.id}`} - {selectedProduct.nome}</span>
                </p>

                <div className="space-y-4 mb-6">
                    <Field label="Nome">
                        {editing ? (
                            isServiceRequest ? (
                                <ServiceAutocomplete
                                    value={editedProduct.nome || ""}
                                    onChange={(value) => update("nome", value)}
                                    onSelectProvision={(provision) => setEditedProduct((current) => ({
                                        ...current,
                                        provisionId: provision.id,
                                        nome: provision.name,
                                        totalValue: provision.totalValue ?? "",
                                        description: provision.description ?? "",
                                    }))}
                                    placeholder="Digite para buscar um serviço..."
                                />
                            ) : (
                                <ProductAutocomplete
                                    value={editedProduct.nome || ""}
                                    onChange={(value) => update("nome", value)}
                                    onSelectProduct={(product) => update("nome", product.name)}
                                    placeholder="Digite o nome do produto..."
                                />
                            )
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA] break-all">{selectedProduct.nome}</span>
                        )}
                    </Field>

                    {isServiceRequest ? (
                        <>
                            <Field label="Valor">
                                {editing ? (
                                    <input type="number" min="0.01" step="0.01" value={editedProduct.totalValue ?? ""} onChange={(event) => update("totalValue", event.target.value)} className={inputClass} />
                                ) : (
                                    <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">
                                        {Number(selectedProduct.totalValue || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </span>
                                )}
                            </Field>
                            <Field label="Descrição">
                                {editing ? (
                                    <textarea value={editedProduct.description || ""} onChange={(event) => update("description", event.target.value)} className={inputClass} rows={3} />
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-[#C3C6D3] break-all">{selectedProduct.description || "-"}</p>
                                )}
                            </Field>
                        </>
                    ) : (
                        <>
                            <Field label="Variação">
                                {editing ? (
                                    <input value={editedProduct.variation || ""} onChange={(event) => update("variation", event.target.value)} className={inputClass} />
                                ) : (
                                    <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.variation || "-"}</span>
                                )}
                            </Field>
                            <Field label="Quantidade">
                                {editing ? (
                                    <input type="number" min="0.01" step="0.01" value={editedProduct.quantity ?? ""} onChange={(event) => update("quantity", event.target.value)} className={inputClass} />
                                ) : (
                                    <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.quantity ?? "-"}</span>
                                )}
                            </Field>
                            <Field label="Unidade de Medida">
                                {editing ? (
                                    <SearchableSelect
                                        name="measurementUnit"
                                        placeholder={optionsLoading ? "Carregando..." : "Selecione a unidade..."}
                                        options={unitOptions}
                                        value={editedProduct.unit || ""}
                                        onChange={(event) => update("unit", event.target.value)}
                                        isRequired
                                    />
                                ) : (
                                    <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{selectedProduct.unit || "-"}</span>
                                )}
                            </Field>
                        </>
                    )}

                    <Field label="CR e Filial">
                        {editing ? (
                            <SearchableSelect
                                name="crBranch"
                                placeholder={optionsLoading ? "Carregando..." : "Selecione o CR e Projeto..."}
                                options={crBranchOptions}
                                value={selectedCrBranchId}
                                onChange={(event) => setSelectedCrBranchId(event.target.value)}
                                isRequired
                            />
                        ) : (
                            <span className="text-sm text-gray-700 dark:text-[#E2E2EA]">{crBranchLabel || "-"}</span>
                        )}
                    </Field>

                    <Field label="Informações Adicionais">
                        {editing ? (
                            <textarea
                                value={isServiceRequest ? (editedProduct.additionalInformation || "") : (editedProduct.additionalInformations || "")}
                                onChange={(event) => update(isServiceRequest ? "additionalInformation" : "additionalInformations", event.target.value)}
                                className={inputClass}
                                rows={3}
                            />
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-[#C3C6D3] leading-relaxed break-all">{selectedProduct.additionalInfo || "-"}</p>
                        )}
                    </Field>

                    {!editing && (
                        <div className="bg-gray-50 dark:bg-[#1A2233] p-4 rounded-xl border border-gray-100 dark:border-white/10">
                            <h4 className="text-xs font-bold text-gray-400 dark:text-[#C3C6D3] uppercase tracking-wider mb-1">Motivo / Parecer do Supervisor:</h4>
                            <p className="text-sm text-gray-600 dark:text-[#C3C6D3] leading-relaxed">
                                {selectedProduct.status === "Aprovado"
                                    ? "A solicitação cumpre com os requisitos técnicos da unidade."
                                    : selectedProduct.status === "Recusado" || selectedProduct.status === "Reprovado"
                                        ? "A solicitação foi recusada durante a análise."
                                        : "Aguardando análise do supervisor responsável."}
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    {canEditRequest && (
                        <button
                            type="button"
                            onClick={editing ? discardEdit : beginEditing}
                            disabled={savingEdit}
                            className="inline-flex items-center gap-2 bg-gray-500 dark:bg-gray-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors shadow-sm disabled:opacity-60"
                        >
                            {!editing && <PencilIcon />}
                            {editing ? "Descartar edições" : "Editar"}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={editing ? handleSave : closeModal}
                        disabled={savingEdit || (editing && optionsLoading)}
                        className="bg-[#103D85] dark:bg-[#1A4A9E] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-sm disabled:opacity-60"
                    >
                        {savingEdit ? "Salvando..." : editing ? "Salvar alterações" : "Entendido"}
                    </button>
                </div>
            </div>
        </div>
    );
}