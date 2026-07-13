'use client'

import Button from "@/components/ui/button/Button";
import notFoundPerson from "../../public/images/etc/notfound-person.png";
import Image from "next/image";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = saved ? saved === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function NotFoundPage(){
    const router = useRouter();

    return(
        <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
        <head>
            <title>Não encontrado!</title>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body className="bg-white dark:bg-[#1A2233]">
            <div className="h-screen flex items-center justify-center">
                <div className="max-h-1/2 bg-gray-200 dark:bg-[#303746] rounded-xl p-4 flex flex-col items-center gap-4">
                    <Image src={notFoundPerson} alt="Pessoa perdida com um mapa" width={150} loading="eager" className="dark:invert dark:brightness-90" />
                    <div className="flex flex-col items-center">
                        <strong className="text-gray-900 dark:text-[#E2E2EA]">Página não encontrada!</strong>
                        <sub className="mt-2 mb-10 text-gray-600 dark:text-[#C3C6D3]">Por aqui! O botão te guiará de volta.</sub>
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