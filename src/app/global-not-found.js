'use client'

import Button from "@/components/ui/button/Button";
import notfoundperson from "../../public/images/etc/notfound-person.png";
import Image from "next/image";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function NotFoundPage(){
    const router = useRouter();

    return(
        <html lang="pt-BR" className={montserrat.variable}>
        <head>
            <title>Não encontrado!</title>
        </head>
        <body>
            <div className="h-screen flex items-center justify-center">
                <div className="max-h-1/2 bg-gray-200 rounded-xl p-4 flex flex-col items-center gap-4">
                    <Image src={notfoundperson} alt="Pessoa perdida com um mapa" width={150} loading="eager" />
                    <div className="flex flex-col items-center">
                        <strong>Página não encontrada!</strong>
                        <sub className="mt-2 mb-10">Por aqui! O botão te guiará de volta.</sub>
                        <Button onClick={() => {router.push("/"); router.refresh()}}>
                            Retornar ao hub inicial
                        </Button>
                    </div>
                </div>
            </div>
        </body>
        </html>
    )
}