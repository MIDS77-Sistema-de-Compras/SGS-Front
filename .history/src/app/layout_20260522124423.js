import "./globals.css";

export const metadata = {
  title: "SGS-Front",
  description: "Projeto Final - Sistema de Compras - FrontEnd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="flex-1 flex flex-col min-w-0 mt-5">
          {children}
        </main>
      </body>
    </html>
  );
}
