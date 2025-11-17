"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/90 via-[#06263a]/80 to-[#0b3b46]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Processus IA anti-arnaque
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Le seul comparateur où vous comparez
              <span className="text-[#6bcfcf]"> vraiment</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-xl mx-auto lg:mx-0">
              En 3 étapes : calcul de votre volume, dossier anonyme, puis 5+ devis fiables à comparer.
            </p>
            <ul className="mt-6 space-y-3 text-base md:text-lg text-white/90">
              {[
                "Volume identique pour tous les déménageurs",
                "Dossier anonyme jusqu’à votre choix",
                "5+ devis fiables à comparer (gratuit)",
              ].map((text) => (
                <li
                  key={text}
                  className="flex items-start gap-3 justify-center lg:justify-start"
                >
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#6bcfcf]/50 bg-white/5 text-[#6bcfcf] shadow-sm">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 13.5L9.5 18L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center justify-center sm:flex-row lg:justify-start">
              <a
                href="/inventaire-ia/"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3 text-base md:text-lg"
                aria-label="Comparez 5+ devis gratuitement"
              >
                Comparez 5+ devis gratuitement
                <span className="text-xl leading-none">→</span>
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="absolute -inset-6 hidden rounded-3xl bg-black/20 blur-3xl lg:block" />
            <div className="relative rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6bcfcf]" />
                Votre dossier en 3 étapes
              </div>

              <ol className="mt-5 space-y-4 text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-[#6bcfcf] border border-[#6bcfcf]/60">
                    1
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold">Constituez votre dossier en 5 minutes</p>
                    <p className="text-xs text-white/75">
                      Photos ou infos rapides sans photos : un seul dossier complet, prêt à être chiffré.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-[#6bcfcf] border border-[#6bcfcf]/60">
                    2
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold">Nous contactons les déménageurs pour vous</p>
                    <p className="text-xs text-white/75">
                      Dossier anonyme envoyé uniquement à des déménageurs contrôlés, avec le même volume pour
                      tous.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-[#6bcfcf] border border-[#6bcfcf]/60">
                    3
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold">Comparez 5+ devis fiables en un coup d’œil</p>
                    <p className="text-xs text-white/75">
                      Tous les déménageurs chiffrent sur le même dossier : vous comparez enfin ligne par
                      ligne, sans mauvaises surprises.
                    </p>
                  </div>
                </li>
              </ol>

              <div className="mt-5 rounded-xl border border-white/10 bg-[#04163a]/70 px-3 py-2 text-[11px] text-white/75">
                <span className="font-semibold">En résumé :</span> un seul dossier bien structuré, 5+ devis
                filtrés, et un comparatif clair pour choisir votre déménageur.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}