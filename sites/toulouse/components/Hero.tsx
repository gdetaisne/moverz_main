"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* Gradient background using brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#04163a] via-[#2b7a78] to-[#04163a]"></div>

      {/* Decoration elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6bcfcf]/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left side text block */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight animate-fade-in">
              Préparez votre déménagement en 30 minutes — recevez 5 devis précis sous 7 jours.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
              Téléversez vos photos, notre IA estime le volume et nous vous connectons aux meilleurs déménageurs certifiés.
            </p>
            <div className="mt-8">
              <a
                href="/inventaire-ia/"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#04163a] hover:bg-white/95 hover:scale-105 transition-all duration-300 shadow-xl"
                aria-label="Commencer votre devis de déménagement gratuit"
              >
                Obtenez mes devis gratuits
              </a>
            </div>
            
            {/* Social proof */}
            <div className="mt-8 text-sm text-white/90">
              <p className="font-medium">+ 1200 déménagements analysés — Satisfaction 4.9/5 ⭐</p>
            </div>
          </div>

          {/* Right side - Clean professional visual */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-72 w-full md:h-96 lg:h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#2b7a78]/20 to-[#6bcfcf]/20 border border-white/20 shadow-2xl">
              {/* Professional mockup interface */}
              <div className="absolute inset-0 p-8">
                <div className="h-full bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-white/60 text-sm font-medium">Moverz IA</div>
                  </div>
                  
                  {/* Content area */}
                  <div className="p-6 space-y-6">
                    {/* Upload section */}
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#6bcfcf]/20 flex items-center justify-center">
                          📷
                        </div>
                        <div>
                          <div className="text-white font-medium">Photos uploadées</div>
                          <div className="text-white/60 text-sm">12 images analysées</div>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-[#6bcfcf] h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-[#2b7a78]/20 flex items-center justify-center">
                          🤖
                        </div>
                        <div>
                          <div className="text-white font-medium">Analyse IA</div>
                          <div className="text-white/60 text-sm">Volume estimé: 28 m³</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#6bcfcf]"></div>
                        <div className="w-2 h-2 rounded-full bg-white/30"></div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          ✅
                        </div>
                        <div>
                          <div className="text-white font-medium">5 devis générés</div>
                          <div className="text-white/60 text-sm">Prêts sous 7 jours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#6bcfcf] text-[#04163a] px-5 py-3 rounded-full text-sm font-bold shadow-xl">
              🤖 Propulsé par l'IA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}