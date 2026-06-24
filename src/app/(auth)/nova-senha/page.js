"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";
import { newPassword } from "@/service/auth/auth-recovery";

export default function NovaSenhaPage() {
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const token = useSearchParams().get('token');

    const router = useRouter();

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    useEffect(() => {
        if(senha != confirmar){
            setError("As senhas não são iguais");
            setIsDisabled(true);
        }else{
            setError(null);
            setIsDisabled(false);
        }
    }, [senha, confirmar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: degeneralize the error "Dados Inválidos".
        try{
            const res = await newPassword(senha, token);
            console.log(res);

            if(res){
                router.push("/login");
            }

        }catch(error){
            setError(error.message || "Ocorreu um erro inesperado.");
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
                    Alterar senha
                </h2>
                <p className="text-white/60 text-[13px] mb-8">
                    Defina sua nova senha de acesso ao sistema.
                </p>

                <div className="flex flex-col gap-4">
                    <PasswordInput
                        variant="auth"
                        placeholder="Nova senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone de senha"
                    />
                    <PasswordInput
                        variant="auth"
                        placeholder="Confirmar nova senha"
                        value={confirmar}
                        onChange={(e) => setConfirmar(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone de senha"
                    />
                </div>

                <p className="text-red-500">{error}</p>

                <div className="mt-8">
                    <Button
                        type="submit"
                        variant="auth"
                        size="lg"
                        fullWidth
                        disabled={isDisabled}
                    >
                        Alterar senha
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
