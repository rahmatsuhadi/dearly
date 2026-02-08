import type { Metadata } from "next";
import {
  Inter,
  Outfit,
  Dancing_Script,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dearly.com'), // Ganti dengan domain asli nanti
  title: {
    default: "Dearly - Kirim Kartu Ucapan Digital Bermakna",
    template: "%s | Dearly"
  },
  description: "Platform kartu ucapan digital #1 di Indonesia. Buat dan kirim kartu ucapan interaktif untuk Ulang Tahun, Valentine, Wisuda, dan momen spesial lainnya secara gratis.",
  keywords: [
    "kartu ucapan digital", "greeting card online", "kirim kartu ucapan", 
    "kartu ulang tahun digital", "kartu valentine online", "e-card indonesia",
    "dearly", "kartu ucapan interaktif", "design kartu ucapan"
  ],
  authors: [{ name: "Dearly Team", url: "https://dearly.com" }],
  creator: "Dearly",
  publisher: "Dearly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dearly - Sampaikan Pesanmu Lebih Bermakna",
    description: "Buat momen spesial tak terlupakan dengan kartu ucapan digital interaktif. Pilih template, tulis pesan, dan kirim ke orang tersayang.",
    url: 'https://dearly.com',
    siteName: 'Dearly',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dearly - Kirim Kartu Ucapan Digital',
    description: 'Platform kartu ucapan digital interaktif untuk setiap momen spesial.',
    creator: '@dearly_id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dearly.com',
  },
  category: 'Lifestyle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} ${dancingScript.variable} ${playfair.variable}`}
    >
      <body className="antialiased min-h-screen">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--color-surface)",
                color: "var(--color-text-primary)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-medium)",
                padding: "12px 16px",
              },
              success: {
                iconTheme: {
                  primary: "var(--color-primary-500)",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "white",
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
