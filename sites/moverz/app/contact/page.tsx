import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Nous contacter | Moverz",
  description:
    "Contactez l'équipe Moverz par email ou téléphone. Support disponible du lundi au vendredi, 9h-18h. Réponse sous 24h.",
  alternates: {
    canonical: 'https://moverz.fr/contact/',
  },
};

export default function ContactPage() {
  return (
    <main className="bg-hero min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Support réactif
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Contactez{" "}
              <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
                notre équipe
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              Une question, un problème ou une suggestion ? Nous sommes là pour vous aider.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
              <div className="relative space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 text-[#6BCFCF] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Par Email</h2>
                <p className="text-white/70 leading-relaxed">
                  Support disponible 7j/7. Réponse sous 24h.
                </p>
                <a
                  href="mailto:contact@moverz.fr"
                  className="inline-flex items-center gap-2 text-[#6BCFCF] hover:text-white transition-colors font-medium"
                >
                  <span>contact@moverz.fr</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Téléphone */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
              <div className="relative space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 text-[#6BCFCF] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Par Téléphone</h2>
                <p className="text-white/70 leading-relaxed">
                  Lun-Ven, 9h-18h (hors jours fériés)
                </p>
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center gap-2 text-[#6BCFCF] hover:text-white transition-colors font-medium"
                >
                  <span>01 23 45 67 89</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Prompt */}
          <div className="mt-12 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-8 md:p-10 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="relative space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Consultez d'abord notre FAQ
              </h2>
              <p className="text-white/80 max-w-xl mx-auto leading-relaxed">
                Vous y trouverez peut-être la réponse à votre question plus rapidement.
              </p>
              <a
                href="/faq/"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
              >
                <span>Voir la FAQ</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Infos pratiques */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Informations pratiques</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
                <div className="text-3xl mb-3">⏱️</div>
                <h3 className="text-lg font-bold text-white mb-2">Horaires Support</h3>
                <p className="text-sm text-white/70">
                  Lun-Ven: 9h-18h<br />
                  Sam-Dim: Email uniquement
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="text-lg font-bold text-white mb-2">Délai de Réponse</h3>
                <p className="text-sm text-white/70">
                  Email: &lt; 24h<br />
                  Téléphone: Immédiat
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
                <div className="text-3xl mb-3">🇫🇷</div>
                <h3 className="text-lg font-bold text-white mb-2">Support Français</h3>
                <p className="text-sm text-white/70">
                  Équipe basée à Paris<br />
                  Français natif
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#6BCFCF]/20 bg-gradient-to-br from-[#6BCFCF]/5 to-[#4FB8B8]/10 p-8 md:p-12 text-center">
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Prêt à comparer des devis ?
              </h2>
              <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                Créez votre dossier en 5 minutes et recevez 5+ devis de déménageurs contrôlés.
              </p>
              <a
                href="/choisir-ville/"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                <span>Comparer 5+ devis gratuitement</span>
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

