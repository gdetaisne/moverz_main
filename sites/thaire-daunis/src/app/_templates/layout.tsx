import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// Template de métadonnées avec variables Handlebars
export const metadata: Metadata = {
  title: {
    default: "Déménageurs {{city_name}} (IA) - 5 devis sous 7 jours",
    template: "%s | Déménageurs {{city_name}} (IA)",
  },
  description:
    "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
  metadataBase: new URL("{{domain}}"),
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
    url: '{{domain}}',
    siteName: 'Déménageurs {{city_name}} (IA)',
    title: 'Déménageurs {{city_name}} (IA) - 5 devis sous 7 jours',
    description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
    images: [
      {
        url: '{{domain}}/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs {{city_name}} (IA) - Devis IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Déménageurs {{city_name}} (IA) - 5 devis sous 7 jours',
    description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
    images: ['{{domain}}/og-image.jpg'],
  },
  alternates: {
    canonical: '{{domain}}',
  },
  verification: {
    google: '{{googleVerification}}',
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
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
