import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://treninger.aftenbladet.no"),
  title: {
    default: "Treningsplanlegger",
    template: "%s · Treningsplanlegger",
  },
  description:
    "Planleggingsverktøy for fotballøkter med øktplan, øvelsesbibliotek og kampverktøy",
  openGraph: {
    title: "Treningsplanlegger",
    description:
      "Bygg komplette økter med øvelsesbibliotek, utstyrsoversikt og kampverktøy",
    type: "website",
    locale: "nb_NO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Treningsplanlegger",
    description:
      "Planlegg fotballøkter med klubbens øvelser, deling og utskrift",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
