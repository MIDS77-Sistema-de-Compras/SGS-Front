"use client";

import { useState } from "react";
import { Input } from "@/components/login/Input";
import { Button } from "@/components/login/Button";
import Image from "next/image"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        console.log({ email, senha });
    }

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#002663] via-[#003C97] to-[#4B84F4] flex items-center justify-between px-16 lg:px-28 relative py-12">

            <div className="flex flex-col justify-between h-[80vh] max-w-[600px]">

                <h1 className="text-white text-5xl font-bold leading-tight">
                    Olá, <br />
                    Bem-vindo(a) ao <br />
                    Sistema de Gestão <br />
                    de Solicitações
                </h1>
            </div>

            <div className="flex items-center gap-6 mt-auto">
                <Image
                    src="/images/logos/senaiLogo.png"
                    alt="Logo SENAI"
                    width={140}
                    height={35}
                    className="object-contain"
                />
                <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                    <Image src="/images/logos/facebookLogo.png" alt="Facebook" width={18} height={18} className="opacity-90 hover:opacity-100 cursor-pointer" />
                    <Image src="/images/logos/youtubeLogo.png" alt="YouTube" width={18} height={18} className="opacity-90 hover:opacity-100 cursor-pointer" />
                    <Image src="/images/logos/xLogo.png" alt="X" width={16} height={16} className="opacity-90 hover:opacity-100 cursor-pointer" />
                    <Image src="/images/logos/linkedinLogo.png" alt="LinkedIn" width={18} height={18} className="opacity-90 hover:opacity-100 cursor-pointer" />
                    <Image src="/images/logos/instagramLogo.png" alt="Instagram" width={18} height={18} className="opacity-90 hover:opacity-100 cursor-pointer" />
                </div>
            </div>

            <form onSubmit={handleLogin} className=" w-[420px] bg-[#00337C] rounded-[32px] px-10 py-12 flex flex-col gap-6 shadow-2xl">

                <h2 className="text-white text-6xl font-bold text-center mb-2">
                    SGS
                </h2>

                <p className="text-white">Insira suas credenciais para acessar o sistema</p>
                <div>
                    <Input
                        type="text"
                        placeholder="Email ou CPF"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <Button type="submit">
                    Entrar
                </Button>

                <div className=" flex justify-between mb-10">
                    <div className="flex ">

                        <input
                            type="checkbox"
                            name="time"
                        />
                        <p className="text-white">Mantenha-me conectado</p>
                    </div>

                    <p className="font-bold text-white">Esqueceu sua senha?</p>
                </div>

                <div className=" flex justify-between">
                    <p className="font-bold text-white">Termos de Uso</p>
                    <p className="font-bold text-white">Políticas de privacidade</p>
                </div>
            </form>

            <Image src="/images/logos/facebookLogo.png" alt="logoFaceBook" width={10} height={10} />
            <Image src="/images/logos/youtubeLogo.png" alt="logoFaceBook" width={10} height={10} />
            <Image src="/images/logos/xLogo.png" alt="logoFaceBook" width={10} height={10} />
            <Image src="/images/logos/linkedinLogo.png" alt="logoFaceBook" width={10} height={10} />
            <Image src="/images/logos/instagramLogo.png" alt="logoFaceBook" width={10} height={10} />

            <Image src="/images/logos/senaiLogo.png" alt="logoFaceBook" width={35} height={35} />


        </main >
    );
}