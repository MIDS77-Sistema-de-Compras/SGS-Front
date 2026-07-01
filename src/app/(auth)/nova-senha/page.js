"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/input/PasswordInput";
import Button from "@/components/ui/button/Button";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";
import { newPassword } from "@/service/auth/auth-recovery";
import NewPasswordForm from "@/components/features/auth/NewPasswordForm";

export default function NovaSenhaPage() {

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

export default function NovaSenhaPage() {
    return (
        <Suspense fallback={null}>
            <NovaSenhaContent />
        </Suspense>
    );
}
