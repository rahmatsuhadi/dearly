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
  title: "Cardify - Digital Greeting Cards",
  description:
    "Create beautiful digital greeting cards for any occasion. Share love, joy, and celebrations with personalized cards.",
  keywords: [
    "greeting cards",
    "digital cards",
    "birthday",
    "valentine",
    "anniversary",
    "celebration",
  ],
  authors: [{ name: "Cardify" }],
  openGraph: {
    title: "Cardify - Digital Greeting Cards",
    description: "Create beautiful digital greeting cards for any occasion",
    type: "website",
  },
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
