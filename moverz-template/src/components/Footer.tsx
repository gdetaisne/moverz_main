import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-white/5">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="text-lg font-semibold">Déménageurs {{city_name}} (IA)</div>
          <p className="mt-3 text-white/90 max-w-xs">30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Simple, précis, transparent.</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Propulsé par l'IA
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Navigation</div>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><Link href="/services/" className="hover:text-white">Services</Link></li>
            <li><Link href="/{{citySlug}}" className="hover:text-white">Zones desservies</Link></li>
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
      <div className="pb-10 text-center text-xs text-white/50">© {new Date().getFullYear()} Déménageurs {{city_name}}</div>
    </footer>
  );
}

