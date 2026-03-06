import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="fr" className={`${dmSans.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
