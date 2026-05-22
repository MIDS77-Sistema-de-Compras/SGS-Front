"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function LoginPage() {
    const [email, setEmail] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        console.log(email);
    }

    return (
        <div className={`flex h-screen ${montserrat.className}`}>

            <div className="flex-1 bg-gradient-to-r from-blue-900 to-blue-500 flex items-center justify-center p-16">

                <h1 className="text-white text-5xl font-bold leanding-tight">
                    Olá, <br />
                    Bem-vindo(a) ao <br />
                    Sistema de Gestão <br />
                    de Solicitações
                </h1>
            </div>
            <div className="flex-1 flex item-center justify-center bg-gray-100">
                <form onSubmit={handleLogin} className="w-[400px] bg-blue-900 p-10 rounded-3xl flex flex-col">

                    <h2>SGS</h2>

                    <input type="text" placeholder="Email ou CPF" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 rounded-xl px-4 outline-none bg-white" />

                    <button
                        type="submit"
                        className="h-14 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-400 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>

    )
}
