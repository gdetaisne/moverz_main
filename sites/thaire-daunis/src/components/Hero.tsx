"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2000&auto=format&fit=crop"
          alt="Déménagement professionnel à Thairé d&#x27;Aunis"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-\[#04163a\]/95 via-\[#2b7a78\]/90 to-\[#04163a\]/95"></div>
      </div>

      {/* Decoration elements */}
      <div className="absolute inset-0 bg-grid-white/\[0.02\] bg-\[size:60px_60px\]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Texte */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              
            </p>
            <div className="mt-6">
              <a
                href="/inventaire-ia/"
                className="inline-flex rounded-xl bg-white px-6 py-3 text-lg font-semibold text-\[#04163a\] hover:bg-white/90 transition duration-300 shadow-lg"
                aria-label="Commencer votre devis de déménagement gratuit"
              >
                3+ devis gratuis
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
                <span>+150+ clients satisfaits</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                <span>Note moyenne 4.8/5</span>
              </div>
            </div>
          </div>

          {/* Image illustrative - AI Mockup */}
          <div className="relative order-first lg:order-last">
            <div className="relative h-64 w-full md:h-96 lg:h-[420px] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
              <Image 
                src="/images/hero/hero-ai-mockup.jpg"
                alt="Estimation de volume en m³ à partir de photos — déménagement à Thairé d&#x27;Aunis"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                quality={90}
              />
              {/* Filigrane Thairé d&#x27;Aunis - Place emblématique */}
              <div className="absolute inset-0 bg-gradient-to-t from-\[#04163a\]/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-white/60">
                <span className="font-medium">🏛️ Thairé d&#x27;Aunis</span>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-\[#6bcfcf\] text-\[#04163a\] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🤖 Propulsé par l'IA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}