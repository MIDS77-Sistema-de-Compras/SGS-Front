'use client'

import sgs from "../../public/images/logos/sgc.png";
import senai from "../../public/images/logos/senai-white.png";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

// :)
const possiblePhrases = [
    "Algo deu terrívelmente errado!",
    "Ocorreu um erro fatal no sistema!",
    "Um erro interno acabou acontecendo.",
    "Ops! Algo deu errado!"
]

export default function GlobalErrorPage(){
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(Math.floor(Math.random()*possiblePhrases.length))
    }, []);

    return (
        <html lang="pt-BR" className={montserrat.variable}>
            <head>
                <title>Ocorreu um erro!</title>
            </head>
            <body className="bg-gradient-to-br from-[#002663] via-[#003C97] to-[#4B84F4]">
                <div className="h-screen flex flex-col gap-4 items-center justify-center">
                    <div className="max-h-1/2 rounded-xl p-4 flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center text-white">
                            <strong>{possiblePhrases[index]}</strong>
                            <sub className="mt-2 mb-10">Recarregue a página e, se o erro persistir, contate a equipe de suporte através do email abaixo.</sub>
                            <Link href="mailto:suporte.senai.sgs@gmail.com" className="text-blue-300">suporte.senai.sgs@gmail.com</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="py-0 px-15">
                            <Image src={senai} alt="SENAI" width={120} className="block border-0 max-w-[120px] h-auto" />
                        </div>
                        <div className="py-0 px-15">
                            <Image src={sgs} alt="SGS" width={80} className="block border-0 max-w-[80px] h-auto" />
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}