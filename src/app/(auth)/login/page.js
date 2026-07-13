"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input/Input";
import { PasswordInput } from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";
import { loginUser } from "@/service/auth/auth-login";

export default function LoginPage() {
    useDocumentTitle("Login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [keepConnected, setKeepConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Informe seu e-mail/CPF e senha para entrar.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await loginUser(email.trim(), password);

            if (!res || res.status) {
                setError(res?.message || "Login falhou. Tente novamente mais tarde.");
                return;
            }

            const token = res.text || res.token || res.message;

            if (!token) {
                setError("Token nao retornado pela API.");
                return;
            }

            const cookieOptions = {
                secure: window.location.protocol === "https:",
                sameSite: "lax",
                path: "/",
            };

            if (keepConnected) {
                cookieOptions.expires = 365;
            }

            Cookies.set("jwt", token, cookieOptions);

            try {
                const payloadBase64 = token.split(".")[1];
                const decodedPayload = JSON.parse(atob(payloadBase64));

                const userRole = decodedPayload.role;
                const userName = decodedPayload.name || decodedPayload.nome || "Usuario";
                const extraCookieOptions = keepConnected ? { expires: 365, path: "/" } : { path: "/" };

                if (userRole) {
                    Cookies.set("role", userRole, extraCookieOptions);
                }

                Cookies.set("name", userName, extraCookieOptions);
            } catch (decodeError) {
                console.warn("Nao foi possivel decodificar a role do token", decodeError);
            }

            router.push("/");
            router.refresh();
        } catch (loginError) {
            setError(loginError.message || "Nao foi possivel entrar. Verifique suas credenciais e se a API esta online.");
        } finally {
            setIsLoading(false);
        }
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
                        placeholder="E-mail ou numero de CPF"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        iconSrc="/images/icons/user.png"
                        iconAlt="Icone de usuario"
                    />
                    <PasswordInput
                        variant="auth"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        iconSrc="/images/icons/password.png"
                        iconAlt="Icone da senha"
                    />
                </div>

                {error && (
                    <p className="mt-4 text-xs font-medium text-red-100">
                        {error}
                    </p>
                )}

                <div className="mt-20">
                    <Button
                        type="submit"
                        variant="auth"
                        size="lg"
                        fullWidth
                        isLoading={isLoading}
                    >
                        Entrar
                    </Button>
                </div>

                <div className="flex justify-between items-center text-xs text-white mt-4">
                    <label className="flex items-center gap-2 cursor-pointer select-none opacity-80 hover:opacity-100">
                        <input
                            type="checkbox"
                            name="time"
                            checked={keepConnected}
                            onChange={(e) => setKeepConnected(e.target.checked)}
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
