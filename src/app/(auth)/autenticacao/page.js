"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";

export default function AutenticacaoPage() {
    useDocumentTitle("Autenticação");

    const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
    const router = useRouter();

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    function handleChange(value, index) {
        const novo = [...codigo];
        novo[index] = value.slice(-1);
        setCodigo(novo);

        if (value && index < 5) {
            document.getElementById(`digit-${index + 1}`)?.focus();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit chamado");
        router.push("/nova-senha");
    }

    return (
        <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[540px] min-[1350px]:max-w-[580px] flex justify-center">
            <FormCard
                onSubmit={handleSubmit}
                showBackLink backHref="/login"
                onTermosClick={() => setModalTermosOpen(true)}
                onPoliticasClick={() => setModalPoliticasOpen(true)}
            >

                <h2 className="text-white text-2xl font-bold mb-2">
                    Autenticação em Dois Fatores
                </h2>
                <p className="text-white/60 text-[13px] mb-8">
                    Digite o código de verificação enviado para o seu e-mail cadastrado.
                </p>

                <div className="flex gap-3 justify-center mb-8">
                    {codigo.map((val, i) => (
                        <input
                            key={i}
                            id={`digit-${i}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={val}
                            onChange={(e) => handleChange(e.target.value, i)}
                            className="w-12 h-14 text-center text-white text-xl font-semibold bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-[#4B84F4] transition-colors"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-[#4B84F4] hover:bg-[#3b71f3] text-white font-semibold rounded-lg transition-colors"
                >
                    Verificar
                </button>

                <p className="text-center text-white/50 text-xs mt-4">
                    Não recebeu o e-mail?{" "}
                    <button
                        type="button"
                        onClick={() => {
                            console.log("Reenviando e-mail")
                        }}
                        className="text-[#4B84F4] hover:underline bg-transparent border-none p-0 cursos-pointer"
                    >
                        Enviar novamente
                    </button>
                </p>

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
