import { useState } from "react";
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function LoginPage({ children }) {
    return (
        <html lang="pt-br">
            <body className={montserrat.className}>
                <div className="login-container">

                    <div className="left-side"></div>

                    <h1>
                        Olá, <br />
                        Bem-vindo(a) ao <br />
                        Sistema de Gestão <br />
                        de Solicitações
                    </h1>

                    <div className="right-side">
                        <form onSubmit={handleLogin} className="login-card">

                            <h2>SGS</h2>

                            <input type="text" placeholder="Email ou CPF" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <button type="submit">Entrar</button>

                        </form>
                    </div>


                </div>
            </body>
        </html >)
}
