import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Template simple pour démonstration
export const metadata: Metadata = {
  title: {
    default: "Moverz Template - Déménageurs IA",
    template: "%s | Moverz Template",
  },
  description:
    "Template de démonstration pour le système multi-sites Moverz. 30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours.",
  metadataBase: new URL("https://template.moverz.fr"),
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
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://template.moverz.fr',
    siteName: 'Moverz Template',
    title: 'Moverz Template - Déménageurs IA',
    description: 'Template de démonstration pour le système multi-sites Moverz. 30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours.',
    images: [
      {
        url: 'https://template.moverz.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Moverz Template - Devis IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moverz Template - Déménageurs IA',
    description: 'Template de démonstration pour le système multi-sites Moverz. 30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours.',
    images: ['https://template.moverz.fr/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://template.moverz.fr',
  },
  verification: {
    google: 'template-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#04163a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-[#04163a] text-white`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}