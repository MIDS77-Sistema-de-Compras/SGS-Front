"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Select from "@/components/ui/select/Select";
import FileDropzone from "@/components/ui/upload/FileDropzone";
import ListProducts from "./ListProducts";
import send from "../../../../public/images/icons/send.svg";
import file from "../../../../public/images/icons/file.svg";
import FormField from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/input/Input";
import PhoneInput from "@/components/ui/input/PhoneInput";
import SectionHeader from "@/components/ui/layout/SectionHeader";
import Button from "@/components/ui/button/Button";
import { api } from "@/service/api";
import { createFullRequest, getInitialStatusName, getAllMeasurementUnits } from "@/service/createProductRequest";

export default function RequestForm() {

    const [attachments, setAttachments] = useState([]);
    const [branch, setBranch] = useState("");
    const [requester, setRequester] = useState("");
    const [phone, setPhone] = useState("");
    const [crBranchId, setCrBranchId] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [products, setProducts] = useState([]);
    const [crOptions, setCrOptions] = useState([]);
    const [unitOptions, setUnitOptions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function loadData() {
            try {
                const [crs, units] = await Promise.all([
                    api.get("/cr-branches"),
                    getAllMeasurementUnits(),
                ]);
                if (!cancelled) {
                    setCrOptions(
                        crs.map((cr) => ({
                            value: String(cr.id),
                            label: `${cr.crCode} - ${cr.crName}`,
                            branchName: cr.branchName ?? "",
                        }))
                    );
                    setUnitOptions(
                        units.map((u) => ({
                            value: u.name,
                            label: u.abbreviation ? `${u.name} (${u.abbreviation})` : u.name,
                        }))
                    );
                }
            } catch {

            }
        }
        loadData();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
    async function loadCurrentUser() {
        try {
            const me = await api.get("/users/me");
            setRequester(me.name ?? "");
            setPhone(me.extensionNumber ?? "");
        } catch {
        }
    }
    loadCurrentUser();
    }, []);

    function handleAddProduct() {
        setFormError("");

        const qtd = Number(quantity);

        if (!productName.trim() || !unit || !quantity) {
            setFormError("Preencha nome, quantidade e unidade do produto antes de adicionar.");
            return;
        }
        if (qtd < 1) {
            setFormError("A quantidade do produto deve ser no mínimo 1.");
            return;
        }

        setProducts((prev) => [
            ...prev,
            {
                id: `${productName}-${Date.now()}`,
                name: productName.trim(),
                productName: productName.trim(),
                measurementUnit: unit,
                quantity: qtd,
                additionalInformations: additionalInfo.trim(),
            },
        ]);

        setProductName("");
        setQuantity("");
        setUnit("");
        setAdditionalInfo("");
    }

    function handleRemoveProduct(id) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }

    function handleFilesSelected(fileList) {
        const novos = Array.from(fileList).map((f) => ({
            id: `${f.name}-${f.size}-${Date.now()}`,
            name: f.name,
            size: f.size,
            file: f,
        }));
        setAttachments((prev) => [...prev, ...novos]);
    }

    function handleRemoveAttachment(id) {
        setAttachments((prev) => prev.filter((a) => a.id !== id));
    }

    function formatSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setFormError("");
        setSuccess(false);

        if (!crBranchId) {
            setFormError("Selecione o CR e Projeto.");
            return;
        }
        if (products.length === 0) {
            setFormError("Adicione pelo menos um produto à solicitação.");
            return;
        }
        if (products.some((p) => p.quantity < 1)) {
            setFormError("Todos os produtos devem ter quantidade no mínimo 1.");
            return;
        }

        try {
            setSubmitting(true);

            const statusName = await getInitialStatusName();
            if (!statusName) {
                setFormError("Nenhum status disponível para criar a solicitação.");
                return;
            }

            await createFullRequest({
                crBranchId: Number(crBranchId),
                statusName,
                products,
            });

            setSuccess(true);
            setBranch("");
            setRequester("");
            setPhone("");
            setCrBranchId("");
            setProducts([]);
            setAttachments([]);
        } catch (err) {
            setFormError(err.message || "Erro ao criar a solicitação.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="border border-[#AAAAAA] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">

            <div className="px-5 py-3 border border-transparent border-b-[#AAAAAA]">
                <h1 className="text-[#103D85] font-bold text-[22px]">Nova Solicitação</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5">
                <SectionHeader label="INFORMAÇÕES GERAIS" />

                <FormField label="Filial Pagadora">
                    <Input
                        variant="form"
                        placeholder="Definida pelo CR selecionado"
                        value={branch}
                        readOnly
                        disabled
                    />
                </FormField>

                <div className="mt-10">
                    <SectionHeader label="IDENTIFICAÇÃO E CENTRO DE CUSTO" />

                    <div className="grid grid-cols-3 items-center gap-5">
                        <FormField label="Solicitante/Destinatário" className="col-span-2">
                            <Input
                                variant="form"
                                placeholder="Preenchido automaticamente com o usuário logado"
                                value={requester}
                                readOnly
                                disabled
                            />
                        </FormField>
                        <FormField label="Ramal">
                            <PhoneInput
                                placeholder="Automático"
                                value={phone}
                                readOnly
                                disabled
                            />
                        </FormField>
                    </div>

                    <FormField label="CR e Projeto" required>
                        <Select
                            name="cr_project"
                            placeholder="Selecione o Centro de Resultado..."
                            options={crOptions}
                            value={crBranchId}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                setCrBranchId(selectedId);
                                const selectedCr = crOptions.find((c) => c.value === selectedId);
                                setBranch(selectedCr?.branchName ?? "");
                            }}
                            isRequired
                        />
                    </FormField>
                </div>

                <div className="mt-10">
                    <SectionHeader label="PRODUTOS" />

                    <div className="mt-5 mb-5">
                        <ListProducts products={products} onRemove={handleRemoveProduct} />
                    </div>

                    <div className="flex w-full gap-5">
                        <FormField label="Produto" required className="flex-2">
                            <Input
                                variant="form"
                                placeholder="Nome do produto..."
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </FormField>

                        <FormField label="Quantidade" required className="flex-1">
                            <Input
                                type="number"
                                min="1"
                                variant="form"
                                placeholder="Ex: 2"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </FormField>

                        <FormField label="Unidade de Medida" required className="flex-1">
                            <Select
                                name="unit"
                                placeholder="Selecione..."
                                options={unitOptions}
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />
                        </FormField>
                    </div>

                    <div className="flex w-full gap-5 items-end mt-1">
                        <FormField label="Informações adicionais do produto" className="flex-1">
                            <Input
                                variant="form"
                                placeholder="Observações, marca, especificações..."
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                            />
                        </FormField>

                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleAddProduct}
                            className="w-11 h-11 flex items-center justify-center text-2xl shrink-0"
                        >
                            +
                        </Button>
                    </div>
                </div>

                <div className="mt-10">
                    <SectionHeader label="ANEXOS" />

                    <div className="mt-5">
                        <FileDropzone
                            icon={file}
                            iconAlt="File Icon"
                            title="Arraste seus documentos aqui"
                            description="Formatos aceitos: PDF, JPG, PNG e DOCX (máx 20MB)"
                            accept=".pdf,.jpg,.jpeg,.png,.docx"
                            onFilesSelected={handleFilesSelected}
                        />
                    </div>

                    {attachments.length > 0 && (
                        <div className="mt-4 flex flex-col gap-2">
                            {attachments.map((att) => (
                                <div
                                    key={att.id}
                                    className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg px-4 py-3"
                                >
                                    <span className="text-[14px] text-gray-800 truncate min-w-0">{att.name}</span>
                                    <div className="flex items-center gap-4 shrink-0">
                                        <span className="text-[12px] text-neutral-500">{formatSize(att.size)}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAttachment(att.id)}
                                            className="text-gray-400 hover:text-[#BA1A1A] transition-colors"
                                            aria-label="Remover anexo"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"/>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {formError && (
                    <p className="mt-5 text-sm text-[#BA1A1A] text-right">{formError}</p>
                )}
                {success && (
                    <p className="mt-5 text-sm text-[#34A853] text-right">Solicitação criada com sucesso!</p>
                )}

                <div className="flex flex-col items-end mt-5">
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={submitting}
                        className="py-3 px-7 text-[14px] font-semibold"
                    >
                        <span className="flex gap-5">
                            {submitting ? "ENVIANDO..." : "FINALIZAR SOLICITAÇÃO"}
                            <Image src={send} alt="Paper Plane Send Icon" width={15} height={21} />
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    );
}