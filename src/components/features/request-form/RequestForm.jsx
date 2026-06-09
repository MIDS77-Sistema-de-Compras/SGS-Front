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

export default function RequestForm() {

    return (
        <div className="border border-[#AAAAAA] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">

            <div className="px-5 py-3 border border-transparent border-b-[#AAAAAA]">
                <h1 className="text-[#103D85] font-bold text-[22px]">Nova Solicitação</h1>
            </div>

            <form 
                action={"won't do now since the API isn't done yet"} 
                className="flex-1 overflow-y-auto p-5"
            >
                <SectionHeader label="INFORMAÇÕES GERAIS" />

                <div className="grid grid-cols-2 items-center gap-5">
                    <FormField label="Filial Pagadora">
                        <Select name="branch" options={["Senai", "SESI"]} isRequired />
                    </FormField>
                    <FormField label="Data de Solicitação">
                        <Input type="date" variant="form" />
                    </FormField>
                </div>

                <div className="mt-10">
                    <SectionHeader label="IDENTIFICAÇÃO E CENTRO DE CUSTO" />

                    <div className="grid grid-cols-3 items-center gap-5">
                        <FormField label="Solicitante/Destinatário" required className="col-span-2">
                            <Input variant="form" placeholder="Nome completo do docente..." />
                        </FormField>
                        <FormField label="Ramal" required>
                            <PhoneInput placeholder="3222-0000" />
                        </FormField>
                    </div>

                    <FormField label="CR e Projeto">
                        <Select name="cr_project" placeholder="Selecione o Centro de Resultado..." options={["Senai", "SESI"]} isRequired />
                    </FormField>

                </div>

                <div className="mt-10">
                    <SectionHeader label="PRODUTOS" />

                    <div className="mt-5">
                        <ListProducts products={[]} />
                    </div>

                    <div className="flex w-full gap-5">
                        <FormField label="Produto" required className="flex-2">
                            <Input variant="form" placeholder="Não há produtos cadastrados..." />
                        </FormField>

                        <FormField label="Quantidade" required className="flex-1">
                            <Input type="number" variant="form" placeholder="Ex: 2" />
                        </FormField>

                        <FormField label="Unidade de Medida" required className="col-span-2">
                            <Select name="unit" placeholder="Selecione..." options={["L", "g"]} />
                        </FormField>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-11 h-11 mt-auto flex items-center justify-center text-2xl"
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
                        />
                    </div>

                </div>

                <div className="flex flex-col items-end mt-5">
                    <Button
                        type="submit"
                        variant="primary"
                        className="py-3 px-7 text-[14px] font-semibold"
                    >
                        <span className="flex gap-5">FINALIZAR SOLICITAÇÃO 
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
