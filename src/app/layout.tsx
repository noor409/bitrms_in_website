import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { lightThemeVars } from "@/lib/theme-vars";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
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

const themeInitScript = `
  try {
    if (localStorage.getItem('theme') === 'light') {
      var el = document.documentElement;
      el.setAttribute('data-theme', 'light');
      var vars = ${JSON.stringify(lightThemeVars)};
      for (var key in vars) el.style.setProperty(key, vars[key]);
    }
  } catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
