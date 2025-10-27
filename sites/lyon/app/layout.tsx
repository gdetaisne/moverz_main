import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { buildMetadata, breadcrumbListJsonLd, buildCanonical } from "@/lib/seo-helpers";
import { env } from "@/lib/env";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = buildMetadata({
  title: "Déménageurs Lyon (IA) - 5 devis sous 7 jours",
  description: "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
  siteName: "Moverz Lyon",
  metadataBase: env.SITE_URL,
  pathname: "/",
  ogImagePath: "/og-image.jpg",
});

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
  const breadcrumbLd = breadcrumbListJsonLd([
    { name: 'Accueil', item: buildCanonical(env.SITE_URL, '/') },
  ]);
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} min-h-screen bg-[#04163a] text-white`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />        
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
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Left - Logo and tagline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img 
                src="/logo.png" 
                alt="Logo Moverz" 
                className="h-10 w-10 object-cover rounded-sm"
              />
              <div className="text-lg font-bold text-white">Moverz</div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Simplifiez votre déménagement avec l'IA
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              Propulsé par l'IA
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-sm font-semibold text-white mb-3">Navigation</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/comment-ca-marche" className="hover:text-[#6bcfcf] transition-colors">Comment ça marche</Link></li>
              <li><Link href="/services" className="hover:text-[#6bcfcf] transition-colors">Services</Link></li>
              <li><Link href="/notre-offre" className="hover:text-[#6bcfcf] transition-colors">Tarifs</Link></li>
              <li><Link href="/faq" className="hover:text-[#6bcfcf] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-sm font-semibold text-white mb-3">Contact & Support</div>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/contact" className="hover:text-[#6bcfcf] transition-colors">Contact</Link></li>
              <li><Link href="/partenaires" className="hover:text-[#6bcfcf] transition-colors">Espace partenaires</Link></li>
              <li><Link href="/blog" className="hover:text-[#6bcfcf] transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <div className="text-sm font-semibold text-white mb-3">Légal</div>
            <ul className="space-y-2 text-sm text-white/80 mb-4">
              <li><Link href="/mentions-legales/" className="hover:text-[#6bcfcf] transition-colors">Mentions légales</Link></li>
              <li><Link href="/cgv/" className="hover:text-[#6bcfcf] transition-colors">CGV</Link></li>
              <li><Link href="/politique-confidentialite/" className="hover:text-[#6bcfcf] transition-colors">Politique de confidentialité</Link></li>
            </ul>
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Moverz | Tous droits réservés.
      </div>
    </footer>
  );
}


