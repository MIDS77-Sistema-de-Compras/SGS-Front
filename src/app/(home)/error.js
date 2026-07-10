'use client'

import { useEffect, useState } from "react";
import errorRobot from "../../../public/images/etc/error-robot.png";
import Image from "next/image";
import { errorPossiblePhrases } from "@/lib/utils/errorPhraseLib";

export default function ErrorPage({error}){
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(Math.floor(Math.random()*errorPossiblePhrases.length));
    }, [])

    return (
        <div className="h-screen flex flex-col justify-center mx-20">
            <div className="max-h-1/2 ">
                <Image src={errorRobot} alt="Ícone de um robô quebrado" width={100} loading="eager" className="-mx-2" />
                <h3 className="text-xl font-semibold mt-3">{errorPossiblePhrases[index]}</h3>
                <p className="text-xs mt-4">Motivo do erro:</p>
                <p className="text-black font-semibold">- {error.message}</p>
            </div>
        </div>
    )
}