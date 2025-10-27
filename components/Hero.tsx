"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* Fond dégradé sans photo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/95" />

      {/* Decoration elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Texte */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Préparez votre déménagement en 30 minutes → recevez 5 devis précis gratuitement sous 7 jours
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Votre dossier complet, sans stress. Estimation fiable, prix transparents, partenaires de confiance.
            </p>
            <div className="mt-6">
              <a
                href="/inventaire-ia/"
                className="inline-flex rounded-xl bg-white px-6 py-3 text-lg font-semibold text-[#04163a] hover:bg-white/90 transition duration-300 shadow-lg"
                aria-label="Commencer votre devis de déménagement gratuit"
              >
                Obtenez vos devis précis gratuitement
              </a>
            </div>
            
            {/* Social proof */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">👤</div>
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">👤</div>
                  <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs">👤</div>
                </div>
                <span>+1200 clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                <span>Note moyenne 4,9/5</span>
              </div>
            </div>
          </div>

          {/* Panneau verré avec les 3 étapes */}
          <div className="relative order-first lg:order-last">
            {/* Fenêtre principale */}
            <div className="relative w-full min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] rounded-3xl border border-white/15 bg-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
              {/* Halo */}
              <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

              {/* Badge IA fixé en haut à droite */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4">
                <div className="relative bg-[#6bcfcf]/90 text-[#04163a] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg ring-1 ring-white/40 backdrop-blur-md">
                  <span className="pointer-events-none absolute -inset-1 rounded-full bg-[#6bcfcf]/30 animate-ping" />
                  <span className="relative">🤖 Propulsé par l'IA</span>
                </div>
              </div>

              {/* Barre de titre */}
              <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="text-xs font-semibold tracking-wide text-white/80">Moverz IA</div>
                <div className="w-12" />
              </div>

              {/* Contenu */}
              <div className="relative z-10 grid h-full grid-rows-3 gap-4 p-4 md:p-6">
                {/* Étape 1 */}
                <div className="rounded-2xl bg-white/8 p-4 md:p-5 border border-white/10 shadow-inner shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:bg-white/10 transition-all duration-300 transform-gpu hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-lg">📷</div>
                    <div className="flex-1">
                      <div className="text-sm md:text-base font-semibold">Photos uploadées</div>
                      <div className="text-xs md:text-sm text-white/70">12 images analysées</div>
                    </div>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 transition-[width] duration-700 ease-out" style={{ width: "68%" }} />
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="rounded-2xl bg-white/8 p-4 md:p-5 border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:bg-white/10 transition-all duration-300 transform-gpu hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-lg">🤖</div>
                    <div className="flex-1">
                      <div className="text-sm md:text-base font-semibold">Analyse IA</div>
                      <div className="text-xs md:text-sm text-white/70">Volume estimé: 28 m³</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="rounded-2xl bg-white/8 p-4 md:p-5 border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:bg-white/10 transition-all duration-300 transform-gpu hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/20 border border-emerald-300/30 text-lg text-emerald-200">✅</div>
                    <div className="flex-1">
                      <div className="text-sm md:text-base font-semibold">5 devis générés</div>
                      <div className="text-xs md:text-sm text-white/70">Prêts sous 7 jours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lueur extérieure */}
              <div className="absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}