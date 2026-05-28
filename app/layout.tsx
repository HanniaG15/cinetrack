import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CineTrack — Descubre Películas y Series",
  description:
    "Explora las películas y series más populares, busca tus favoritas y guarda tu watchlist personal.",
  metadataBase: new URL("https://cinetrack.vercel.app"),
  openGraph: {
    title: "CineTrack",
    description: "Descubre películas y series en tendencia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
