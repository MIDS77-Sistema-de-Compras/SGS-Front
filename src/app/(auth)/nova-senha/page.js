"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/login/Input";
import { Button } from "@/components/login/Button";
import AuthBackground from "@/components/login/AuthBackground";
import FormCard from "@/components/login/FormCard";

export default function NovaSenhaPage() {
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        router.push("/login");
    }

    return (
        <AuthBackground>
            <FormCard onSubmit={handleSubmit} showBackLink backHref="/autenticacao">

                <h2 className="text-white text-2xl font-bold mb-2">
                    Alterar senha
                </h2>
                <p className="text-white/60 text-[13px] mb-8">
                    Defina sua nova senha de acesso ao sistema.
                </p>

                <div className="flex flex-col gap-4">
                    <Input
                        type="password"
                        placeholder="Nova senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone de senha"
                    />
                    <Input
                        type="password"
                        placeholder="Confirmar nova senha"
                        value={confirmar}
                        onChange={(e) => setConfirmar(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone de senha"
                    />
                </div>

                <div className="mt-8">
                    <Button
                        type="submit"
                        className="w-full py-3 bg-[#4B84F4] hover:bg-[#3b71f3] text-white font-semibold rounded-lg transition-colors"
                    >
                        Alterar senha
                    </Button>
                </div>

            </FormCard>
        </AuthBackground>
    );
}