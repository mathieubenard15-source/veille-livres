import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Veille Livres",
  description:
    "Veille éditoriale hebdomadaire — sorties livres non-fiction en France",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <Nav />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
