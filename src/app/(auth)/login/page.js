"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Input } from "@/components/login/Input";
import { Button } from "@/components/login/Button";
import AuthBackground from "@/components/login/AuthBackground";
import FormCard from "@/components/login/FormCard";
import { ModalTermos } from "@/components/login/ModalTermos";
import { ModalPoliticas } from "@/components/login/ModalPoliticas";

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
            <AuthBackground>
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
                            placeholder="E-mail ou número de CPF"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            iconSrc="/images/icons/user.png"
                            iconAlt="Icone de usuario"
                        />
                        <Input
                            type="password"
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
                            className="w-full py-3 bg-[#4B84F4] hover:bg-[#3b71f3] text-white font-semibold rounded-lg transition-colors"
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
            </AuthBackground>

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