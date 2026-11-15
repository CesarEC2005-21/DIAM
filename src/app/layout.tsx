import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Para Diana | Una Carta de Amor & Celebración",
  description: "Una sorpresa especial llena de amor, recuerdos inolvidables y fiesta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased selection:bg-rose-500 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
