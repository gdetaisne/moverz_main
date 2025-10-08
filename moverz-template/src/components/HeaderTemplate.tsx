// HeaderTemplate.tsx - Placeholder pour la génération
import React from 'react';

interface HeaderTemplateProps {
  cityName?: string;
}

const HeaderTemplate: React.FC<HeaderTemplateProps> = ({ cityName = "{{city_name}}" }) => {
  return (
    <header className="bg-white/5 backdrop-blur border-b border-white/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">
              Déménageurs {cityName}
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/services" className="text-white/80 hover:text-white transition-colors">
              Services
            </a>
            <a href="/quartiers" className="text-white/80 hover:text-white transition-colors">
              Quartiers
            </a>
            <a href="/partenaires" className="text-white/80 hover:text-white transition-colors">
              Partenaires
            </a>
            <a href="/blog" className="text-white/80 hover:text-white transition-colors">
              Blog
            </a>
            <a href="/faq" className="text-white/80 hover:text-white transition-colors">
              FAQ
            </a>
            <a href="/contact" className="bg-[#6bcfcf] text-white px-4 py-2 rounded-lg hover:bg-[#5bb8b8] transition-colors">
              Obtenir des devis
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderTemplate;
