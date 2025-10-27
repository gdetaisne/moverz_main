import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Déménageurs Rouen (IA) - 5 devis sous 7 jours",
    template: "%s | Déménageurs Rouen (IA)",
  },
  description:
    "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
  metadataBase: new URL("https://devis-demenageur-rouen.fr"),
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
    url: 'https://devis-demenageur-rouen.fr',
    siteName: 'Déménageurs Rouen (IA)',
    title: 'Déménageurs Rouen (IA) - 5 devis sous 7 jours',
    description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
    images: [
      {
        url: 'https://devis-demenageur-rouen.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs Rouen (IA) - Devis IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Déménageurs Rouen (IA) - 5 devis sous 7 jours',
    description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
    images: ['https://devis-demenageur-rouen.fr/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://devis-demenageur-rouen.fr',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#2b7a78',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} min-h-screen bg-[#04163a] text-white`}>        
        <GoogleAnalytics />
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-white/5">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className="h-12 w-12 object-contain rounded-sm" sizes="48px" />
            <div className="flex flex-col leading-tight">
              <span className="text-white uppercase font-extrabold text-sm md:text-base">Devis</span>
              <span className="text-white uppercase font-extrabold text-sm md:text-base">Déménageur</span>
              <span className="text-white uppercase font-extrabold text-sm md:text-base">Rouen</span>
            </div>
          </div>
          <div className="text-lg font-semibold">Déménageurs Rouen (IA)</div>
          <p className="mt-3 text-white/90 max-w-xs">30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Simple, précis, transparent.</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Propulsé par l’IA
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Navigation</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/services/" className="hover:text-white">Services</Link></li>
            <li><Link href="/rouen" className="hover:text-white">Zones desservies</Link></li>
            <li><Link href="/partenaires/" className="hover:text-white">Partenaires</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Ressources</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/faq/" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Légal</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/mentions-legales/" className="hover:text-white">Mentions légales</Link></li>
            <li><Link href="/politique-confidentialite/" className="hover:text-white">Confidentialité</Link></li>
            <li><Link href="/cgv/" className="hover:text-white">CGV</Link></li>
          </ul>
        </div>
      </div>
      <div className="pb-10 text-center text-xs text-white/50">© {new Date().getFullYear()} Déménageurs Rouen</div>
    </footer>
  );
}


