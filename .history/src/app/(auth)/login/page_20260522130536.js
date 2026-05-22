"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function LoginPage() {

    const [email, setEmail] = useState("");

        const [senha, setSenha] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        console.log(email);
    }

    return (
        <main className={`min-h-screen w-full bg-gradient-to-r from-[#003C97] to-[#4B84F4] flex items-center justify-between px-24 ${montserrat.className}`}>
            <div className="max-w-[700px]">
                <h1 className="text-white text-5xl font-bold leading-tight">
                    Olá, <br />
                    Bem-vindo(a) ao <br />
                    Sistema de Gestão <br />
                    de Solicitações
                </h1>

            </div>
            <form onSubmit={handleLogin} className=" w-[420px] bg-[#00337C] rounded-[32px] px-10py-12 flex flex-col gap-6 shadow-2xl"
            >

                <h2 className="text-white text-6xl font-bold text-center mb-2">
                    SGS
                </h2>

                <p>Insira suas credenciais para acessar o sistema</p>
                <input
                    type="text"
                    placeholder="Email ou CPF"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl px-4 outline-none bg-white outline-none text-lg"
                />

                  <input
                    type="text"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-xl px-4 outline-none bg-white outline-none text-lg"
                />

                <button
                    type="submit"
                    className="h-14 rounded-xl bg-[#5D8EF7] text-white font-semibold hover:bg-blue-400 transition"
                >
                    Entrar
                </button>

            </form>


        </main >
    );
}