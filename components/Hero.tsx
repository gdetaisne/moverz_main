"use client";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 2600);

    return () => clearInterval(interval);
  }, []);
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
              Un dossier unique, des déménageurs contrôlés, et enfin des devis vraiment comparables.
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
            <div className="relative rounded-3xl border border-[#dfeaea]/70 bg-white/95 p-6 shadow-2xl text-[#04163a]">
              {/* Header avec badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Processus anti-arnaque
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-[#04163a]">
                    Pourquoi nous faire confiance ?
                  </h3>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>

              {/* Garanties principales */}
              <div className="mt-5 space-y-3">
                {[
                  {
                    icon: "🔒",
                    title: "Dossier anonyme",
                    desc: "Vos coordonnées restent cachées jusqu'à votre choix final.",
                    highlight: true,
                  },
                  {
                    icon: "⚖️",
                    title: "Devis vraiment comparables",
                    desc: "Même volume pour tous = comparaison ligne par ligne.",
                    highlight: true,
                  },
                  {
                    icon: "✓",
                    title: "Déménageurs contrôlés",
                    desc: "Pros vérifiés, assurés, et notés par de vrais clients.",
                    highlight: false,
                  },
                ].map((item, index) => {
                  const isActive = stage === index;
                  return (
                    <div
                      key={item.title}
                      className={`flex items-start gap-3 rounded-xl border p-3.5 transition-all ${
                        isActive
                          ? "border-[#2b7a78]/60 bg-gradient-to-br from-[#e3f4f4] to-[#f5fbfb] shadow-md"
                          : "border-[#eef3f4] bg-[#f6fbfb]"
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xl shadow-sm">
                        {item.icon}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm font-semibold text-[#04163a]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#04163a]/75">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA bas de carte */}
              <div className="mt-5 rounded-xl border border-[#2b7a78]/20 bg-gradient-to-br from-[#e3f4f4] to-white p-4 text-center">
                <p className="text-sm font-semibold text-[#04163a]">
                  Gratuit, rapide, et sans engagement
                </p>
                <p className="mt-1 text-xs text-[#04163a]/70">
                  5+ devis comparables en 24-48h · Aucun appel indésirable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}