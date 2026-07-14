"use client";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Suspense, useEffect, useState } from "react";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";
import NewPasswordForm from "@/components/features/auth/NewPasswordForm";

export default function NovaSenhaPage() {
    useDocumentTitle("Nova Senha");

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    return (
        <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[540px] min-[1350px]:max-w-[580px] flex justify-center">
            <Suspense fallback={<div>Carregando..</div>}>
                <NewPasswordForm />
            </Suspense>

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