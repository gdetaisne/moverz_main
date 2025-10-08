'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#04163a]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold text-white group-hover:text-[#6bcfcf] transition-colors">
              Déménageurs {{city_name}}
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#6bcfcf] text-[#04163a] font-semibold">
              IA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/services/"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="/{{citySlug}}"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Quartiers
            </Link>
            <Link
              href="/partenaires/"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Partenaires
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/faq/"
              className="text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-lg hover:bg-[#2b7a78]/90 transition-all duration-300"
            >
              Obtenir des devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#6bcfcf] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/services/"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/{{citySlug}}"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quartiers
              </Link>
              <Link
                href="/partenaires/"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partenaires
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/faq/"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-2xl bg-[#2b7a78] px-5 text-sm font-medium text-white shadow-lg hover:bg-[#2b7a78]/90 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Obtenir des devis
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


