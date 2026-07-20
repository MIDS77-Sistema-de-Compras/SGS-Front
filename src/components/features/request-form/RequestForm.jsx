"use client";

import { useState } from "react";
import Image from "next/image";
import SearchableSelect from "@/components/ui/select/SearchableSelect";
import FileDropzone from "@/components/ui/upload/FileDropzone";
import ListProducts from "./ListProducts";
import send from "../../../../public/images/icons/send.svg";
import file from "../../../../public/images/icons/file.svg";
import fileWhite from "../../../../public/images/icons/fileWhite.svg";
import FormField from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/input/Input";
import PhoneInput from "@/components/ui/input/PhoneInput";
import SectionHeader from "@/components/ui/layout/SectionHeader";
import Button from "@/components/ui/button/Button";
import SolicitacoesTabs from "@/lib/utils/requestTabs";
import { useRequestForm } from "@/hooks/useRequestForm";
import ServiceAutocomplete from "./ServiceAutoComplete";
import ProductAutocomplete from './ProductAutocomplete';
import ProductRequestTable from "./local-csv-viewer/ProductRequestTable";
import ProvisionRequestTable from "./local-csv-viewer/ProvisionRequestTable";

// this needs componentization
export default function RequestForm() {
    const {
        abaAtiva, setAbaAtiva,
        abas,
        branchId,
        branchOptions,
        requester, setRequester,
        phone, setPhone,
        crBranchId, setCrBranchId,
        productName, setProductName,
        variation, setVariation,
        quantity, setQuantity,
        unit, setUnit,
        additionalInfo, setAdditionalInfo,
        serviceName, setServiceName,
        serviceValue, setServiceValue,
        serviceAdditionalInfo, setServiceAdditionalInfo,
        products, setProducts,
        services, setServices,
        crOptions,
        unitOptions,
        submitting, setSubmitting,
        formError, setFormError,
        success, setSuccess,
        handleBranchChange, handleCrBranchChange,
        handleAddProduct, handleRemoveProduct,
        handleAddService, handleRemoveService,
        handleFilesSelected, handleRemoveAttachment,
        handleSubmit,
        attachments, setAttachments,
        csvData, setCsvData,
        csvError, setCsvError,
        csvType,
        isProcessing, setIsProcessing,
        handleImportSubmit,
        handleConfirmImport
    } = useRequestForm();

    function formatFileSize(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    return (
        <div className="border border-gray-100 shadow-sm dark:border-white/10 dark:bg-[#1A2233] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">
            <SolicitacoesTabs
                titulo="Nova Solicitação"
                abaAtiva={abaAtiva}
                setAbaAtiva={setAbaAtiva}
                abas={abas}
            />

            {abaAtiva !== "importing" ? (
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 overflow-y-auto"
                >
                    <div className="flex-1 overflow-y-auto p-5">
                        <SectionHeader label="INFORMAÇÕES GERAIS" />

                        <FormField label="Filial Pagadora" required>
                            <SearchableSelect
                                name="branch"
                                placeholder="Digite para filtrar e selecione a Filial..."
                                options={branchOptions}
                                value={branchId || ""}
                                onChange={handleBranchChange}
                                isRequired
                            />
                        </FormField>

                        <div className="mt-10">
                            <SectionHeader label="IDENTIFICAÇÃO E CENTRO DE CUSTO" />

                        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-5">
                            <FormField
                                label="Solicitante/Destinatário"
                                required
                                className="sm:col-span-2"
                            >
                                <Input
                                    variant="form"
                                    placeholder="Nome completo do docente..."
                                    value={requester || ""}
                                    onChange={(event) => setRequester(event.target.value)}
                                />
                            </FormField>

                                <FormField label="Ramal" required>
                                    <PhoneInput
                                        placeholder="3222-0000"
                                        value={phone || ""}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </FormField>
                            </div>

                            <FormField label="CR e Projeto" required>
                                <SearchableSelect
                                    name="cr_project"
                                    placeholder="Digite para filtrar e selecione o Centro de Resultado..."
                                    emptyMessage={
                                        branchId
                                            ? "Nenhum CR encontrado para a Filial selecionada"
                                            : "Nenhuma opção encontrada"
                                    }
                                    options={crOptions}
                                    value={crBranchId || ""}
                                    onChange={handleCrBranchChange}
                                    isRequired
                                />
                            </FormField>
                        </div>

                    {abaAtiva === "produto" ? (
                        <div className="mt-10">
                            <SectionHeader label="PRODUTOS" />


                            <div className="flex flex-col md:flex-row w-full gap-5">
                                <FormField
                                    label="Produto"
                                    required
                                    className="flex-2"
                                >
                                    <ProductAutocomplete
                                        value={productName}
                                        onChange={setProductName}
                                        onSelectProduct={(product) => {
                                            setProductName(product.name);
                                        }}
                                        placeholder="Digite o nome do produto..."
                                    />
                                </FormField>

                                <FormField
                                    label="Variação"
                                    className="flex-1"
                                >
                                    <Input
                                        variant="form"
                                        placeholder="Ex: Tamanho G, Azul..."
                                        value={variation || ""}
                                        onChange={(event) => setVariation(event.target.value)}
                                    />
                                </FormField>

                                    <FormField
                                        label="Quantidade"
                                        required
                                        className="flex-1"
                                    >
                                        <Input
                                            type="number"
                                            variant="form"
                                            placeholder="Ex: 2"
                                            min="0"
                                            step="0.01"
                                            value={quantity || ""}
                                            onChange={(event) => setQuantity(event.target.value)}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Unidade de Medida"
                                        required
                                        className="col-span-2"
                                    >
                                        <SearchableSelect
                                            name="unit"
                                            placeholder="Digite para filtrar e selecione..."
                                            options={unitOptions}
                                            value={unit || ""}
                                            onChange={(event) => setUnit(event.target.value)}
                                            isRequired
                                        />
                                    </FormField>
                                </div>

                                <div className="flex w-full gap-5">
                                    <FormField label="Informações Adicionais" className="flex-1">
                                        <Input
                                            variant="form"
                                            placeholder="Informações adicionais do produto..."
                                            value={additionalInfo || ""}
                                            onChange={(event) => setAdditionalInfo(event.target.value)}
                                        />
                                    </FormField>
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="w-10 h-10 mt-auto flex items-center justify-center text-2xl"
                                        onClick={handleAddProduct}
                                    >
                                        +
                                    </Button>
                                </div>

                                <div className="mt-5">
                                    <ListProducts products={products} onRemove={handleRemoveProduct} tipo={"produto"} />
                                </div>
                            </div>

                        ) : (

                            <div className="mt-10">
                                <SectionHeader label="SERVIÇOS" />

                             <div className="flex flex-col md:flex-row w-full gap-5">
                                 <FormField label="Título do Serviço" required className="flex-2">
                                    <ServiceAutocomplete
                                        placeholder="Digite para buscar um serviço..."
                                        value={serviceName}
                                        onChange={setServiceName}
                                        onSelectProvision={(provision) => {
                                            setServiceValue(String(provision.totalValue ?? ""));
                                            setServiceAdditionalInfo(provision.description ?? "");
                                        }}
                                    />
                                </FormField>

                                    <FormField label="Valor" required className="flex-1">
                                        <Input
                                            type="number"
                                            variant="form"
                                            placeholder="Ex: 150.00"
                                            min="0"
                                            step="0.01"
                                            value={serviceValue || ""}
                                            onChange={(event) => setServiceValue(event.target.value)}
                                        />
                                    </FormField>
                                </div>

                                <div className="flex gap-5 items-end">
                                    <FormField label="Informações Adicionais" required className="flex-1">
                                        <Input
                                            variant="form"
                                            placeholder="Informações adicionais do serviço..."
                                            value={serviceAdditionalInfo}
                                            onChange={(event) => setServiceAdditionalInfo(event.target.value)}
                                        />
                                    </FormField>

                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="w-10 h-10 flex items-center justify-center text-2xl"
                                        onClick={handleAddService}
                                    >
                                        +
                                    </Button>
                                </div>

                                <div className="mt-5">
                                    <ListProducts products={services} onRemove={handleRemoveService} tipo={"serviço"} />
                                </div>
                            </div>
                        )}

                        <div className="mt-10">
                            <SectionHeader label="ANEXOS" />

                            <div className="mt-5">
                                <FileDropzone
                                    icon={file}
                                    iconDark={fileWhite}
                                    iconAlt="File Icon"
                                    title="Arraste seus documentos aqui"
                                    description="Formatos aceitos: PDF, JPG, PNG, DOCX e CSV (máx 10MB)"
                                    accept=".pdf,.jpg,.jpeg,.png,.docx,.csv"
                                    onFilesSelected={handleFilesSelected}
                                />

                                {attachments.length > 0 && (
                                    <ul className="mt-3 flex flex-col gap-2">
                                        {attachments.map((f, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between rounded-lg border border-[#AAAAAA] px-4 py-2 text-sm"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <span className="truncate font-medium text-[#103D85]">
                                                        {f.name}
                                                    </span>
                                                    <span className="shrink-0 text-[#747782]">
                                                        {formatFileSize(f.size)}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveAttachment(index)}
                                                    className="ml-3 shrink-0 font-bold text-[#BA1A1A] hover:opacity-70"
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-end mt-5">
                            {formError && (
                                <p className="mb-3 text-sm font-semibold text-[#BA1A1A] dark:text-[#F87171]">{formError}</p>
                            )}
                            {success && (
                                <p className="mb-3 text-sm font-semibold text-[#2E7D32] dark:text-[#4ADE80]">Solicitação criada com sucesso.</p>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                className="py-3 px-7 text-[14px] font-semibold"
                                isLoading={submitting}
                            >
                                <span className="flex gap-5">
                                    FINALIZAR SOLICITAÇÃO
                                    <Image
                                        src={send}
                                        alt="Paper Plane Send Icon"
                                        width={15}
                                        height={21}
                                    />
                                </span>
                            </Button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-6">
                        <SectionHeader label="Importar Produtos via CSV" />
                        <p className="text-[14px] mt-2 text-gray-600 dark:text-gray-300">
                            Faça upload do arquivo CSV exportado do Google Sheets. O arquivo deve seguir o formato do modelo fornecido.
                        </p>
                    </div>

                    <div className="mb-6">
                        <FileDropzone
                            icon={file}
                            iconDark={fileWhite}
                            iconAlt="CSV Icon"
                            title="Arraste seu arquivo CSV aqui"
                            description="Formatos aceitos: CSV (máx 10MB)"
                            accept=".csv"
                            onFilesSelected={handleFilesSelected}
                        />
                    </div>

                    {csvError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600">
                            {csvError}
                        </div>
                    )}

                    {attachments.length > 0 && csvData.length === 0 && !isProcessing && (
                        <div className="mb-6">
                            <ul className="mt-3 flex flex-col gap-2 mb-4">
                                {attachments.map((f, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between rounded-lg border border-[#AAAAAA] px-4 py-2 text-sm"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="truncate font-medium text-[#103D85]">
                                                {f.name}
                                            </span>
                                            <span className="shrink-0 text-[#747782]">
                                                {formatFileSize(f.size)}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAttachment(index)}
                                            className="ml-3 shrink-0 font-bold text-[#BA1A1A] hover:opacity-70"
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant="primary"
                                onClick={handleImportSubmit}
                                isLoading={isProcessing}
                            >
                                {isProcessing ? 'Processando...' : 'Processar CSV'}
                            </Button>
                        </div>
                    )}

                    {csvData && csvData.length > 0 && !isProcessing && (
                        <>
                            {/* NOTA: O algoritmo de conversão está em BETA e pode apresentar comportamento instável */}
                            {csvType === "product" && ( <><ProductRequestTable csvData={csvData} /></> )}
                            {csvType === "provision" && ( <><ProvisionRequestTable csvData={csvData} /></> )}

                            <div className="mb-6 flex justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setCsvData([]);
                                        setCsvError("");
                                    }}
                                    className="mr-3"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleConfirmImport}
                                    isLoading={isProcessing}
                                    className="px-6 py-2"
                                >
                                    {isProcessing ? 'Importando...' : 'Confirmar Importação'}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}