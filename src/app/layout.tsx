import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Treningsplanlegger",
  description:
    "Planleggingsverktøy for fotballøkter med øktplan, øvelsesbibliotek og kampverktøy",
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
