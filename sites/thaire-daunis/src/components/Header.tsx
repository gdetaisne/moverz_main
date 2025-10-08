"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [cityName, setCityName] = useState("Thairé d&#x27;Aunis");
  const [cityNameWords, setCityNameWords] = useState(["Thairé d&#x27;Aunis"]);

  useEffect(() => {
    // Dans un site généré, ces valeurs seront remplacées par Handlebars
    const currentCityName = "Thairé d&#x27;Aunis";
    setCityName(currentCityName);
    setCityNameWords(currentCityName.split(' '));
  }, []);

  const trackClick = (element: string) => {
    // Analytics tracking
    console.log(`Click tracked: ${element}`);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 text-white font-semibold tracking-tight text-lg md:text-xl leading-tight"
          onClick={() => trackClick('logo')}
        >
          <img 
            src="/logo.svg" 
            alt="Moverz Logo" 
            className="w-8 h-8"
          />
          <div>
            {cityNameWords.map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/comment-ca-marche" className="text-white/80 hover:text-white transition">Comment ça marche</Link>
          <Link href="/services" className="text-white/80 hover:text-white transition">Services</Link>
          <Link href="/zones-desservies" className="text-white/80 hover:text-white transition">Zones desservies</Link>
          <Link href="/partenaires" className="text-white/80 hover:text-white transition">Partenaires</Link>
          <Link href="/blog" className="text-white/80 hover:text-white transition">Blog</Link>
          <Link href="/faq" className="text-white/80 hover:text-white transition">FAQ</Link>
          <Link 
            href="/inventaire-ia/" 
            className="inline-flex h-9 items-center justify-center rounded-2xl bg-[#6bcfcf] px-4 text-sm font-semibold text-[#04163a] shadow-lg hover:bg-[#6bcfcf]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bcfcf]/50 transition duration-300"
          >
            3+ devis gratuis
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}
