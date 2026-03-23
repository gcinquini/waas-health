import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, DM_Sans } from "next/font/google";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

// Configuración de fuentes para la estética de Salud/Estética
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Esta variable la usa el CSS para los títulos Serif
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // Esta variable la usa el CSS para el texto normal
});

export const metadata: Metadata = {
  title: "Gino Salud & Estética | Web-as-a-Service",
  description: "Plataforma profesional para centros de salud y estética.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {/* Aquí se renderiza el Hero y los Services */}
        {children}

        {/* Botón flotante global */}
        <WhatsAppButton />
      </body>
    </html>
  );
}