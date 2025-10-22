"use client";
import Link from "next/link";

export default function PartnerCTA() {
  return (
    <section className="py-16 md:py-24 bg-[#2b7a78] rounded-3xl">
      <div className="container max-w-5xl mx-auto px-4 md:px-6 text-center">
        <div className="text-5xl mb-6">🤝</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Vous êtes déménageur ? Rejoignez notre réseau partenaire.
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Accédez à des leads qualifiés et développez votre activité avec notre plateforme IA.
        </p>
        <Link
          href="/partenaires"
          className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#2b7a78] hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Je deviens partenaire
        </Link>
      </div>
    </section>
  );
}

