import { useState } from "react";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function LoginPage({ children }) {
    const [email, setEmail] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        console.log(email);
    }

    return (
        <div className={`flex h-screen ${montserrat.className}`}>

            <div className="flex-1 bg-grandient-to-r from-blue-900 to-blue-500 flex flex items-center justify-center p-16">

                <h1>
                    Olá, <br />
                    Bem-vindo(a) ao <br />
                    Sistema de Gestão <br />
                    de Solicitações
                </h1>

                <div className="right-side">
                    <form onSubmit={handleLogin} className="login-card">

                        <h2>SGS</h2>

                        <input type="text" placeholder="Email ou CPF" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 rounded-xl px-4 outline-none bg-white"/>

                        <button type="submit">Entrar</button>

                    </form>
                </div>
            </div>

        </div>
    )
}
