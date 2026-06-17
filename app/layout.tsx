import type { Metadata } from "next";
import { Inter, Oswald, Outfit } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pagurai | Contenido, automatización y pauta con IA",
  description:
    "Sistemas para producir contenido, correr campañas y generar ventas a escala con menos fricción.",
  icons: {
    icon: "/assets/images/favicon/favicon-dark.png",
    shortcut: "/assets/images/favicon/favicon-dark.png",
    apple: "/assets/images/favicon/favicon-light.png",
  },
  openGraph: {
    title: "Pagurai | AI Visual Systems",
    description:
      "Contenido, automatización, pauta digital y landing pages para marcas eCommerce.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${oswald.variable} ${outfit.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
