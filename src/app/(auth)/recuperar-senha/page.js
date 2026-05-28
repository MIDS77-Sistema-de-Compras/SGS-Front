"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/login/Input";
import { Button } from "@/components/login/Button";
import FormCard from "@/components/login/FormCard";

export default function RecuperarSenhaPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        router.push("/autenticacao");
    }

    return (
        <FormCard onSubmit={handleSubmit} showBackLink backHref="/login">

            <h2 className="text-white text-2xl font-bold mb-2">
                Recuperar senha
            </h2>
            <p className="text-white/60 text-[13px] mb-8">
                Insira seu e-mail ou CPF cadastrado para receber as instruções de redefinição.
            </p>

            <Input
                type="text"
                placeholder="E-mail ou número de CPF"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                iconSrc="/images/iconeUsuario.png"
                iconAlt="Icone de usuario"
            />

            <div className="mt-8">
                <Button
                    type="submit"
                    className="w-full py-3 bg-[#4B84F4] hover:bg-[#3b71f3] text-white font-semibold rounded-lg transition-colors"
                >
                    Enviar instruções
                </Button>
            </div>

        </FormCard>
    );
}