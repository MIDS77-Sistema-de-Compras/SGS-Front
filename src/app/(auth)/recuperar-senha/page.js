"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";
import { recoveryEmail } from "@/service/auth/auth-recovery";

export default function RecuperarSenhaPage() {
    useDocumentTitle("Recuperar Senha");

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [msgClass, setMsgClass] = useState("text-[#4B84F4]");

    const [disableBtn, setDisabled] = useState(false);

    const router = useRouter();

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await recoveryEmail(email);
            setMsg(res.text);
            setDisabled(true); // this is a pretty dumb way to prevent spamming the button, and it needs to be enhanced

        }catch(error){
            setMsgClass("text-red-500");
            setMsg(error.message || "Ocorreu um erro inesperado.");
        }
    }

    return (
        <div>
            <FormCard
                onSubmit={handleSubmit}
                showBackLink backHref="/login"
                onTermosClick={() => setModalTermosOpen(true)}
                onPoliticasClick={() => setModalPoliticasOpen(true)}
            >

                <h2 className="text-white text-2xl font-bold mb-2">
                    Recuperar senha
                </h2>
                <p className="text-white/60 text-[13px] mb-8">
                    Insira seu e-mail ou CPF cadastrado para receber as instruções de redefinição.
                </p>

                <Input
                    type="text"
                    variant="auth"
                    placeholder="E-mail ou número de CPF"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    iconSrc="/images/icons/user.png"
                    iconAlt="Icone de usuario"
                />

                <p className={msgClass}>{msg}</p>

                <div className="mt-8">
                    <Button
                        type="submit"
                        variant="auth"
                        size="lg"
                        fullWidth
                        disabled={disableBtn}
                    >
                        Enviar instruções
                    </Button>
                </div>

            </FormCard>

            <ModalTermos
                isOpen={modalTermosOpen}
                onClose={() => setModalTermosOpen(false)}
            />
            <ModalPoliticas
                isOpen={modalPoliticasOpen}
                onClose={() => setModalPoliticasOpen(false)}
            />
        </div>
    );
}
