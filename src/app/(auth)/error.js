'use client'

import { errorPossiblePhrases } from "@/lib/utils/errorPhraseLib";
import Image from "next/image";
import { useEffect, useState } from "react";
import sgs from "../../../public/images/logos/sgc.png";
import FormCard from "@/components/features/auth/FormCard";
import { ModalTermos } from "@/components/features/auth/ModalTermos";
import { ModalPoliticas } from "@/components/features/auth/ModalPoliticas";

export default function ErrorPage({error}){
    const [index, setIndex] = useState(0);

    const [modalTermosOpen, setModalTermosOpen] = useState(false);
    const [modalPoliticasOpen, setModalPoliticasOpen] = useState(false);

    useEffect(() => {
        setIndex(Math.floor(Math.random()*errorPossiblePhrases.length));
    }, [])

    return (
        <div className="text-white">
            <FormCard onTermosClick={() => setModalTermosOpen(true)} onPoliticasClick={() => setModalTermosOpen(true)}>
                <p className="mt-5 font-semibold">{errorPossiblePhrases[index]}</p>
                <p className="text-xs mt-4">Motivo do erro:</p>
                <p className="font-semibold">- {error.message}</p>
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