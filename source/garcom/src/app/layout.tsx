import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Garçom",
  keywords: ["garçom", "projeto garçom", "next.js", "react"],
  description: "Garçom - Sistema de gerenciamento de pedidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
