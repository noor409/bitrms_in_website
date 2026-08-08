import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bitrms.in"),
  title: {
    default: "BITRMS Technologies | Green Hydrogen, Cyber Security, ERP & Telecom Infrastructure",
    template: "%s | BITRMS Technologies",
  },
  description:
    "BITRMS Technologies delivers engineering expertise across green hydrogen, cyber security, Odoo ERP with facial recognition, RMS telecom infrastructure, and carbon & climate solutions.",
  openGraph: {
    title: "BITRMS Technologies",
    description:
      "Engineering a smarter, safer, cleaner future — green hydrogen, cyber security, ERP & facial recognition, telecom infrastructure, and carbon & climate solutions.",
    siteName: "BITRMS Technologies",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
