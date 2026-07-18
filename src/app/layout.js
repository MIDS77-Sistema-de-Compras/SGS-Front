import { Montserrat } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from '@/contexts/NotificationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    default: "SGS",
    template: "SGS | %s",
  },
  description: "Projeto Final - Sistema de Compras - FrontEnd",
  icons: {
    icon: "/images/logos/favicon-sgs.png"
  }
};

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

export default function RootLayout({ children }) {
  console.group();
  console.log("%cBem-Vindo ao %cSGS!\n%cNão cole comandos que você desconhece aqui, pois eles podem ser %cmaliciosos!", 
      "font-size: 25px; font-weight: semibold;", 
      "font-size: 25px; font-weight: bold; color: #2577fa", 
      "font-size-12px", "color: red");
  console.groupEnd();

  return (
    <html lang="pt-BR" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <Script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}