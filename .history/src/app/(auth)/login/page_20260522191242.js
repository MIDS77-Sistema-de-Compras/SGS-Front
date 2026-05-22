"use client";

import { useState } from "react";
import { Input } from "@/components/login/Input";
import { Button } from "@/components/login/Button";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleLogin(e) {
        e.preventDefault();
        console.log({ email, senha });
    }

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-[#002663] via-[#003C97] to-[#4B84F4] flex items-center justify-between px-16 lg:px-28 relative py-12">

            <div className="flex flex-col justify-between h-[40vh] max-w-[800px]">

                <div className="text-white mt-4">
                    <p className="text-4xl font-light tracking-wide">Olá,</p>
                    <p className="text-4xl font-light tracking-wide mt-1">Bem-vindo(a) ao</p>
                    <h1 className="text-5xl font-bold leading-tight mt-4">
                        Sistema de Gestão <br /> de Solicitações
                    </h1>
                </div>

                <div className="flex items-center gap-6">
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
            </div>

            <form onSubmit={handleLogin} className="w-[580px] h-[580px] bg-[#0A2E6B] rounded-[24px] px-10 py-12 flex flex-col gap-6 shadow-2xl border border-white/5">

                <h2 className="text-white text-6xl font-black text-center tracking-wider mt-2">
                    SGS
                </h2>
                <Image src="/images/logos/sgcLogo.png" alt="Sgc" width={20} height={18} className="opacity-90 hover:opacity-100 cursor-pointer" />


                <p className="text-white text-[13px] font-medium opacity-90 text-left mb-1">
                    Insira suas credenciais para acessar o sistema
                </p>

                <div className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="E-mail ou número de CPF"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <div className="mt-2">
                    <Button type="submit" className="w-full py-3 bg-[#4B84F4] hover:bg-[#3b71f3] text-white font-semibold rounded-lg transition-colors">
                        Entrar
                    </Button>
                </div>

                <div className="flex justify-between items-center text-xs text-white mt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none opacity-80 hover:opacity-100">
                        <input
                            type="checkbox"
                            name="time"
                            className="accent-[#4B84F4] rounded bg-transparent border-white/40"
                        />
                        <span>Mantenha-me conectado</span>
                    </label>
                    <a href="#" className="hover:underline opacity-90 hover:opacity-100">
                        Esqueceu sua senha?
                    </a>
                </div>

                <div className="flex justify-between text-[11px] text-white/60 underline mt-6">
                    <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                    <a href="#" className="hover:text-white transition-colors">Políticas de privacidade</a>
                </div>
            </form>

        </main>
    );
}