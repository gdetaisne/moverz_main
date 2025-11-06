'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isZonesDropdownOpen, setIsZonesDropdownOpen] = useState(false);
  const zonesDropdownRef = useRef<HTMLDivElement>(null);

  // Fermer les dropdowns quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (zonesDropdownRef.current && !zonesDropdownRef.current.contains(event.target as Node)) {
        setIsZonesDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Gestion du clavier pour les dropdowns
  const handleKeyDown = (event: React.KeyboardEvent, dropdownType: 'zones') => {
    if (event.key === 'Escape') {
      if (dropdownType === 'zones') {
        setIsZonesDropdownOpen(false);
      }
    }
  };

  // Tracking des clics
  const trackClick = (label: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('track', { 
        detail: { cat: 'nav', act: 'click', lbl: label } 
      }));
    }
  };

  const zonesItems = [
    { href: '/bordeaux', label: 'bordeaux' },
    { href: '/bordeaux/chartrons', label: 'Chartrons' },
    { href: '/bordeaux/cauderan', label: 'Caudéran' },
    { href: '/bordeaux/bastide', label: 'Bastide' },
    { href: '/bordeaux/merignac', label: 'Mérignac' },
    { href: '/bordeaux/pessac', label: 'Pessac' },
  ];


  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3"
          onClick={() => trackClick('logo')}
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-16 w-16 object-cover rounded-sm"
          />
          <div className="text-white font-semibold tracking-tight text-sm md:text-base leading-tight flex flex-col">
            <span>Devis</span>
            <span>Déménageur</span>
            <span>Bordeaux</span>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {/* Comment ça marche Button */}
          <Link 
            href="/comment-ca-marche" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('comment-ca-marche')}
          >
            Comment ça marche
          </Link>

          {/* Services Button */}
          <Link 
            href="/services" 
            className="hover:text-brand-secondary transition-colors"
            onClick={() => trackClick('services')}
          >
            Services
          </Link>

          {/* Zones Desservies Dropdown */}
          <div 
            ref={zonesDropdownRef}
            className="relative"
            onKeyDown={(e) => handleKeyDown(e, 'zones')}
          >
            <button
              className="hover:text-brand-secondary transition-colors flex items-center gap-1"
              onClick={() => setIsZonesDropdownOpen(!isZonesDropdownOpen)}
              onKeyDown={(e) => e.key === 'Enter' && setIsZonesDropdownOpen(!isZonesDropdownOpen)}
              aria-haspopup="menu"
              aria-expanded={isZonesDropdownOpen}
            >
              Zones desservies
              <svg 
                className={`w-4 h-4 transition-transform ${isZonesDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isZonesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur rounded-lg shadow-lg border border-white/20 py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Zones de départ
                </div>
                {zonesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                    onClick={() => {
                      setIsZonesDropdownOpen(false);
                      trackClick(`zones-${item.label.toLowerCase()}`);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Destinations fréquentes
                </div>
                <Link
                  href="/bordeaux-vers-paris"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-paris');
                  }}
                >
                  bordeaux → Paris
                </Link>
                <Link
                  href="/bordeaux-vers-lyon"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-lyon');
                  }}
                >
                  bordeaux → Lyon
                </Link>
                <Link
                  href="/bordeaux-vers-toulouse"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-toulouse');
                  }}
                >
                  bordeaux → Toulouse
                </Link>
              </div>
            )}
          </div>

          <Link 
