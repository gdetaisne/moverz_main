"use client";
import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-hero" />
        <div className="absolute inset-0 bg-white/0" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Préparez votre déménagement en 30 minutes</h1>
            <p className="mt-3 text-lg md:text-xl text-white/90">Envoyez vos photos, recevez 5 devis fiables sous 7 jours — sans appels ni formulaires, l'IA s'occupe de tout.</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-white/80 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <Image src="/logo.png" alt="Logo Moverz" width={16} height={16} className="rounded-[3px]" />
                <span>Propulsé par Moverz IA</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15"><span className="h-1 w-1 rounded-full bg-white/50" />Déménageurs vérifiés</span>
            </div>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="/inventaire-ia/" className="btn-primary" aria-label="Obtenez vos devis gratuits">Obtenez vos devis gratuits</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="absolute -inset-6 hidden rounded-3xl bg-black/20 blur-3xl lg:block" />
            <div className="relative rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md md:p-6">
              <div className="flex items-center justify-between text-sm text-white/70">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <span className="h-2 w-2 rounded-full bg-green-400/80" />
                </div>
                <Image src="/logo.png" alt="Logo Moverz" width={18} height={18} className="rounded-sm" />
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">📷</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">Photos uploadées</div>
                      <div className="text-xs text-white/70">12 images analysées</div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-2 w-2/3 animate-[progress_2.2s_ease-out_infinite] rounded-full bg-[#6bcfcf]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">🤖</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">Analyse IA</div>
                      <div className="text-xs text-white/70">Volume estimé: 28 m³</div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#6bcfcf]" />
                        <span className="h-2 w-2 rounded-full bg-white/30" />
                        <span className="h-2 w-2 rounded-full bg-white/30" />
                        <span className="h-2 w-2 rounded-full bg-white/30" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">✅</div>
                    <div>
                      <div className="text-white font-medium">5 devis générés</div>
                      <div className="text-xs text-white/70">Prêts sous 7 jours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-5 -right-3 rounded-full bg-[#6bcfcf] px-4 py-2 text-sm font-semibold text-[#04163a] shadow-lg flex items-center gap-2">
              <Image src="/logo.png" alt="Logo Moverz" width={16} height={16} className="rounded-[3px]" />
              <span>Propulsé par Moverz IA</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}