"use client";

import Image from "next/image";
import Select from "@/components/ui/select/Select";
import send from "../../../../public/images/icons/send.svg";
import FormField from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/input/Input";
import SectionHeader from "@/components/ui/layout/SectionHeader";
import Button from "@/components/ui/button/Button";
import { useCreateCr } from "@/hooks/useCreateCr";

export default function RequestFormCR() {
    const {
        formData,
        errors,
        isLoading,
        sectors,
        sectorsLoading,
        branches,
        branchesLoading,
        supervisors,
        supervisorsLoading,
        handleChange,
        handleSubmit,
    } = useCreateCr();

    const supervisorOptions = (excludeId) =>
        supervisors
            .filter((supervisor) => String(supervisor.id) !== String(excludeId))
            .map((supervisor) => ({ value: String(supervisor.id), label: supervisor.name }));

    return (
         <div className="border border-[#AAAAAA] dark:border-white/10 dark:bg-[#1A2233] rounded-xl flex flex-col overflow-hidden">

            <div className="px-5 py-3 border border-transparent border-b-[#AAAAAA] dark:border-b-white/10">
                <h1 className="text-[#103D85] dark:text-[#E2E2EA] font-bold text-[22px]">Cadastrar CR</h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-5"
            >
                <SectionHeader label="IDENTIFICAÇÃO DE CR" />

                <FormField label="Nome do CR" required className="col-span-2">
                    <Input
                        variant="form"
                        placeholder="Nome do CR"
                        value={formData.nome}
                        onChange={(e) => handleChange('nome', e.target.value)}
                        error={errors.nome}
                    />
                    {errors.nome && (
                        <span className="text-[11px] text-[#BA1A1A] mt-1 block">{errors.nome}</span>
                    )}
                </FormField>

                <FormField label="Descrição" className="col-span-2">
                    <Input
                        variant="form"
                        placeholder="Descrição do CR (opcional)"
                        value={formData.descricao}
                        onChange={(e) => handleChange('descricao', e.target.value)}
                        error={errors.descricao}
                    />
                    {errors.descricao && (
                        <span className="text-[11px] text-[#BA1A1A] mt-1 block">{errors.descricao}</span>
                    )}
                </FormField>

                <div className="grid grid-cols-2 items-center gap-x-5">

                    <FormField label="Código" required className="col-span-1">
                        <Input
                            variant="form"
                            placeholder="3333-7777"
                            value={formData.codigo}
                            onChange={(e) => handleChange('codigo', e.target.value)}
                            error={errors.codigo}
                        />
                        {errors.codigo && (
                            <span className="text-[11px] text-[#BA1A1A] mt-1 block">{errors.codigo}</span>
                        )}
                    </FormField>

                    <FormField label="CR Master" required>
                        <div className="flex items-center gap-3 py-2 select-none">
                            <button
                                type="button"
                                onClick={() => handleChange('master', !formData.master)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    formData.master ? 'bg-[#103D85] dark:bg-[#1A4A9E]' : 'bg-gray-200 dark:bg-white/20'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        formData.master ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                            <div className="flex flex-col text-left min-w-[100px]">
                                <span className={`text-[13px] font-bold leading-none ${formData.master ? 'text-[#103D85] dark:text-[#E2E2EA]' : 'text-gray-500 dark:text-[#C3C6D3]'}`}>
                                    {formData.master ? 'Ativado' : 'Desativado'}
                                </span>
                                <span className="text-[10px] text-gray-400 dark:text-[#C3C6D3] font-normal">
                                    {formData.master ? 'Clique para desativar' : 'Clique para ativar'}
                                </span>
                            </div>
                        </div>
                    </FormField>

                    <FormField label="Bloco responsável" required>
                        <Select
                            name="sector"
                            placeholder={sectorsLoading ? "Carregando blocos..." : "Associar a um bloco responsável"}
                            value={formData.sectorName}
                            onChange={(e) => handleChange('sectorName', e.target.value)}
                            options={sectors.map((sector) => sector.name)}
                            error={errors.sectorName}
                            disabled={sectorsLoading}
                            isRequired
                        />
                        {errors.sectorName && (
                            <span className="text-[11px] text-[#BA1A1A] mt-1 block">{errors.sectorName}</span>
                        )}
                    </FormField>

                    <FormField label="Filial" required className="col-span-2">
                        <Select
                            name="branch"
                            placeholder={branchesLoading ? "Carregando filiais..." : "Selecione a filial vinculada"}
                            value={formData.branchId}
                            onChange={(e) => handleChange('branchId', e.target.value)}
                            options={branches.map((branch) => ({ value: String(branch.id), label: branch.name }))}
                            error={errors.branchId}
                            disabled={branchesLoading}
                            isRequired
                        />
                        {errors.branchId && (
                            <span className="text-[11px] text-[#BA1A1A] mt-1 block">{errors.branchId}</span>
                        )}
                    </FormField>

                    <FormField label="Supervisor responsável 1">
                        <Select
                            name="responsibleUserId1"
                            placeholder={supervisorsLoading ? "Carregando supervisores..." : "Selecione (opcional)"}
                            value={formData.responsibleUserId1}
                            onChange={(e) => handleChange('responsibleUserId1', e.target.value)}
                            options={supervisorOptions(formData.responsibleUserId2)}
                            disabled={supervisorsLoading}
                        />
                    </FormField>

                    <FormField label="Supervisor responsável 2">
                        <Select
                            name="responsibleUserId2"
                            placeholder={supervisorsLoading ? "Carregando supervisores..." : "Selecione (opcional)"}
                            value={formData.responsibleUserId2}
                            onChange={(e) => handleChange('responsibleUserId2', e.target.value)}
                            options={supervisorOptions(formData.responsibleUserId1)}
                            disabled={supervisorsLoading}
                        />
                    </FormField>

                </div>

                <div className="flex flex-col items-end mt-5">
                    <Button
                        type="submit"
                        variant="primary"
                        className="py-3 px-7 text-[14px] font-semibold"
                        isLoading={isLoading}
                    >
                        <span className="flex gap-5">CADASTRAR CR
                            <Image
                                src={send}
                                alt="Paper Plane Send Icon"
                                width={15}
                                height={21}
                            />
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    )
}