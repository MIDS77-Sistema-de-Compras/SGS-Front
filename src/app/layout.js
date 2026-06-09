import { Montserrat } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from '@/contexts/NotificationContext';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "SGS-Front",
  description: "Projeto Final - Sistema de Compras - FrontEnd",
  icons: {
    icon: "/images/logos/sgc.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}