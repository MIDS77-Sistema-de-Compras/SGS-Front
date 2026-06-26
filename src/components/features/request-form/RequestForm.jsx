"use client";

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
import SolicitacoesTabs from "@/lib/utils/requestTabs";
import { useRequestForm } from "@/hooks/useRequestForm";

export default function RequestForm() {
    const {
        abaAtiva, setAbaAtiva, abas, branch,
        requester, setRequester, phone, setPhone,
        crBranchId, productName, setProductName,
        quantity, setQuantity, unit, setUnit,
        products, crOptions, unitOptions,
        submitting, formError, success,
        handleCrBranchChange, handleAddProduct,
        handleRemoveProduct, handleFilesSelected,
        handleSubmit,
    } = useRequestForm();

    return (
        <div className="border border-[#AAAAAA] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">
            <div className="">
                    <SolicitacoesTabs
                        titulo="Nova Solicitação"
                        abaAtiva={abaAtiva}
                        setAbaAtiva={setAbaAtiva}
                        abas={abas}
                    />
            </div>
        
            <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-5"
            >
                <div className="flex-1 overflow-y-auto p-5">
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
                            <FormField
                                label="Solicitante/Destinatário"
                                required
                                className="col-span-2"
                            >
                                <Input
                                    variant="form"
                                    placeholder="Nome completo do docente..."
                                    value={requester}
                                    onChange={(event) => setRequester(event.target.value)}
                                />
                            </FormField>

                            <FormField label="Ramal" required>
                                <PhoneInput
                                    placeholder="3222-0000"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </FormField>
                        </div>

                        <FormField label="CR e Projeto">
                            <Select
                                name="cr_project"
                                placeholder="Selecione o Centro de Resultado..."
                                options={crOptions}
                                value={crBranchId}
                                onChange={handleCrBranchChange}
                                isRequired
                            />
                        </FormField>
                    </div>

                    {abaAtiva === "produto" ? (
                        <div className="mt-10">
                            <SectionHeader label="PRODUTOS" />

                            <div className="mt-5">
                                <ListProducts products={products} onRemove={handleRemoveProduct} tipo={"produto"} />
                            </div>

                            <div className="flex w-full gap-5">
                                <FormField
                                    label="Produto"
                                    required
                                    className="flex-2"
                                >
                                    <Input
                                        variant="form"
                                        placeholder="Não há produtos cadastrados..."
                                        value={productName}
                                        onChange={(event) => setProductName(event.target.value)}
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
                                        value={quantity}
                                        onChange={(event) => setQuantity(event.target.value)}
                                    />
                                </FormField>

                                <FormField
                                    label="Unidade de Medida"
                                    required
                                    className="col-span-2"
                                >
                                    <Select
                                        name="unit"
                                        placeholder="Selecione..."
                                        options={unitOptions}
                                        value={unit}
                                        onChange={(event) => setUnit(event.target.value)}
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
                        </div>

                    ) : (
                        
                        <div className="mt-10">
                            <SectionHeader label="SERVIÇOS" />

                            <div className="mt-5">
                                <ListProducts products={[]} tipo={"serviço"} />
                            </div>

                            <FormField label="Título do Serviço" required>
                                <Input
                                    variant="form"
                                    placeholder="Digite o título do serviço..."
                                />
                            </FormField>

                            <div className="flex gap-5 items-end">
                                <FormField label="Descrição" required className="flex-1">
                                    <Input
                                        variant="form"
                                        placeholder="Descreva detalhadamente o serviço solicitado..."
                                    />
                                </FormField>

                                <Button
                                    type="button"
                                    variant="primary"
                                    className="w-10 h-10 flex items-center justify-center text-2xl"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    )}

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
                    </div>

                    <div className="flex flex-col items-end mt-5">
                        {formError && (
                            <p className="mb-3 text-sm font-semibold text-[#BA1A1A]">{formError}</p>
                        )}
                        {success && (
                            <p className="mb-3 text-sm font-semibold text-[#2E7D32]">Solicitação criada com sucesso.</p>
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
        </div>
    )
}