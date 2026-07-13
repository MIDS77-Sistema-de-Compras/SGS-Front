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
        <div>
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