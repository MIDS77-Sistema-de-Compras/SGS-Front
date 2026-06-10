import Image from "next/image";
import SelectFormInput from "../form/SelectFormInput";
import UploadFileInput from "../form/UploadFileInput";
import ListProducts from "./ListProducts";
import send from "../../../public/images/icons/send.svg";
import FormField from "../adm/FormField";
import { Input } from "../login/Input";
import PhoneInput from "../adm/PhoneInput";
import SectionHeader from "../adm/SectionHeader";
import Button from '@/components/form/Button';

export default function RequestForm() {

    const inputClass = "!h-auto py-2.5 !text-sm !border-gray-200 !rounded-xl !shadow-sm !bg-white focus:!border-[#103D85] focus:!ring-0.5 focus:!ring-[#103D85]"

    return (
        <div className="border border-[#AAAAAA] rounded-xl flex flex-1 flex-col overflow-hidden min-h-0">

            <div className="px-5 py-3 border border-transparent border-b-[#AAAAAA]">
                <h1 className="text-[#103D85] font-bold text-[22px]">Nova Solicitação</h1>
            </div>

            <form
                action={"won't do now since the API isn't done yet"}
                className="flex-1 overflow-y-auto p-5"
            >
                {/* general infos */}
                <SectionHeader label="INFORMAÇÕES GERAIS" />

                <FormField label="Filial Pagadora">
                    <SelectFormInput name={"branch"} options={["Senai", "SESI"]} isRequired={true} />
                </FormField>

                {/* ident & costs */}
                <div className="mt-10">
                    <SectionHeader label="IDENTIFICAÇÃO E CENTRO DE CUSTO" />

                    <div className="grid grid-cols-3 items-center gap-5">
                        <FormField label="Solicitante/Destinatário" required className="col-span-2">
                            <Input placeholder="Nome completo do destinatário..." className={inputClass} />
                        </FormField>
                        <FormField label="Ramal" required>
                            <PhoneInput placeholder={"3344"} className={inputClass} />
                        </FormField>
                    </div>

                    <FormField label="CR e Projeto">
                        <SelectFormInput name={"cr_project"} label={"Selecione o Centro de Resultado..."} options={["Senai", "SESI"]} isRequired={true} />
                    </FormField>

                </div>

                {/* products */}
                <div className="mt-10">
                    <SectionHeader label="PRODUTOS" />

                    <div className="mt-5">
                        <ListProducts products={[{ id: "PROD-001", name: "Produto Placeholder" }, { id: "PROD-002", name: "Produto Placeholder" }] /* you might aswell unadd those placeholders to see the empty state of the component */} />
                    </div>

                    <div className="flex w-full gap-5">
                        <FormField label="Produto" required className="flex-2">
                            <Input placeholder="Não há produtos cadastrados..." className={inputClass} />
                        </FormField>

                        <FormField label="Quantidade" required className="flex-1">
                            <Input type="number" placeholder="Ex: 2" className={inputClass} />
                        </FormField>

                        <FormField label="Unidade de Medida" required className="col-span-2">
                            <SelectFormInput name={"unit"} label={"Selecione..."} options={["L", "g"]} />
                        </FormField>

                        <Button variant="primary" className="w-11 h-11 mt-auto flex items-center justify-center text-[18px]">
                            +
                        </Button>
                    </div>

                </div>

                {/* pins */}
                <div className="mt-10">
                    <SectionHeader label="ANEXOS" />

                    <div className="mt-5">
                        <UploadFileInput />
                    </div>

                </div>

                <div className="flex flex-col items-end mt-5">
                    <Button type="submit" variant="primary" className="items-center">
                        FINALIZAR SOLICITAÇÃO
                        <Image
                            src={send}
                            alt="Paper Plane Send Icon"
                            width={10}
                            height={10}
                            className="w-4 h-auto"
                        />
                    </Button>
                </div>
            </form>
        </div>
    )
}