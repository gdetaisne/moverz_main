import { CITIES } from '@/lib/cities';

export default function CitiesGrid() {
  return (
    <section className="py-16 md:py-24 bg-[#04141f]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF] mb-4">
            Nos villes couvertes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            11 villes en France
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Sélectionnez votre ville pour comparer 5+ devis de déménageurs contrôlés
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map((city) => (
            <a
              key={city.slug}
              href={`${city.url}/devis-gratuits/`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-[#6BCFCF] transition-colors">
                  {city.nameCapitalized}
                </h3>
                <p className="text-white/60 text-sm mb-3">
                  {city.region}
                </p>
                <p className="text-white/75 text-sm leading-relaxed">
                  {city.description}
                </p>
                <span className="absolute bottom-6 right-6 text-white/40 group-hover:text-[#6BCFCF] group-hover:translate-x-1 transition-all text-xl">
                  →
                </span>
              </div>

              {/* Glow effect au hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
            </a>
          ))}
        </div>

        {/* CTA supplémentaire en bas */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/60 mb-4">
            Vous ne trouvez pas votre ville ?
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 text-[#6BCFCF] hover:text-white transition-colors duration-300 font-medium"
          >
            <span>Contactez-nous</span>
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

