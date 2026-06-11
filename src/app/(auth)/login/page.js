"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input/Input";
import { PasswordInput } from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    const router = useRouter();
    function handleLogin(e) {
        e.preventDefault();

        const tokenBackend = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...exampletoken";
        Cookies.set("token", tokenBackend, {
            expires: 1,
            secure: true,
            sameSite: "strict",
        });
        router.push("/");
    }

    return (
        <div>
            <FormCard
                onSubmit={handleLogin}
                onTermosClick={() => setModalTermosOpen(true)}
                onPoliticasClick={() => setModalPoliticasOpen(true)}
            >

                <p className="text-white text-[13px] font-medium opacity-90 text-left mb-6">
                    Insira suas credenciais para acessar o sistema
                </p>

                <div className="flex flex-col gap-4">
                    <Input
                        type="text"
                        variant="auth"
                        placeholder="E-mail ou número de CPF"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        iconSrc="/images/icons/user.png"
                        iconAlt="Icone de usuario"
                    />
                    <PasswordInput
                        variant="auth"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone da senha"
                    />
                </div>

                <div className="mt-20">
                    <Button
                        type="submit"
                        variant="auth"
                        size="lg"
                        fullWidth
                    >
                        Entrar
                    </Button>
                </div>

                <div className="flex justify-between items-center text-xs text-white mt-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none opacity-80 hover:opacity-100">
                        <input
                            type="checkbox"
                            name="time"
                            className="accent-[#4B84F4] rounded bg-transparent border-white/40"
                        />
                        <span>Mantenha-me conectado</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => router.push("/recuperar-senha")}
                        className="hover:underline opacity-90 hover:opacity-100 cursor-pointer bg-transparent border-0 p-0 text-inherit text-xs"
                    >
                        Esqueceu sua senha?
                    </button>
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
