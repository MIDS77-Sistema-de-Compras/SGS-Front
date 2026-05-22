import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
})

export const metadata = {
  title: "SGS-Front",
  description: "Projeto Final - Sistema de Compras - FrontEnd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
          {children}
      </body>
    </html>
  );
}
