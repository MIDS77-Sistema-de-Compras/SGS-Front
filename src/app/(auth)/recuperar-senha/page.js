"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";

export default function RecuperarSenhaPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        router.push("/autenticacao");
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

                <div className="mt-8">
                    <Button
                        type="submit"
                        variant="auth"
                        size="lg"
                        fullWidth
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
