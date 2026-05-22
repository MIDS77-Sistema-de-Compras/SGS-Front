import "./globals.css";

export const metadata = {
  title: "SGS-Front",
  description: "Projeto Final - Sistema de Compras - FrontEnd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <main >
          {children}
        </main>
      </body>
    </html>
  );
}
