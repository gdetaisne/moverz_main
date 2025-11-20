import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — Notre mission | Moverz",
  description:
    "Moverz est le comparateur anti-arnaque de déménageurs. Notre mission : des devis vraiment comparables, des pros contrôlés, 0 spam.",
  alternates: {
    canonical: 'https://moverz.fr/a-propos/',
  },
};

export default function AProposPage() {
  return (
    <main className="bg-hero min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Notre histoire
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Le comparateur{" "}
              <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
                anti-arnaque
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              Notre mission : rendre le marché du déménagement transparent et comparer des devis vraiment comparables.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-[#04141f]">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Notre constat</h2>
              <div className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
                <p>
                  En 2022, après avoir vécu plusieurs mauvaises expériences de déménagement (devis incomparables, arnaques, 
                  harcèlement téléphonique), nous avons décidé de créer Moverz.
                </p>
                <p>
                  <strong className="text-white">Le problème</strong> : les comparateurs existants se contentent de transmettre vos 
                  coordonnées à des déménageurs sans aucun contrôle. Résultat : 10 appels en 1 heure, des devis incomparables 
                  (chacun estime un volume différent), et parfois des arnaques.
                </p>
                <p>
                  <strong className="text-white">Notre solution</strong> : un inventaire IA unique → tous les déménageurs chiffrent 
                  sur la même base. Dossier anonyme → vous décidez qui vous contacte. Déménageurs contrôlés → solvabilité + 0 litige.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              Nos valeurs
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ce qui guide nos décisions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🎯",
                title: "Transparence totale",
                description: "Pas de frais cachés, pas de pro douteux. Tout est vérifié, contrôlé et affiché clairement.",
              },
              {
                icon: "🛡️",
                title: "Protection client",
                description: "Votre dossier reste anonyme. Les déménageurs ne vous contactent que si vous le souhaitez.",
              },
              {
                icon: "⚡",
                title: "Efficacité",
                description: "Un seul dossier, un seul inventaire IA, 5+ devis en quelques jours. Simple et rapide.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative space-y-4 text-center">
                  <div className="text-5xl">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 md:py-24 bg-[#04141f]">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              Équipe
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Une petite équipe, de grandes ambitions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Moverz est développé par une équipe de 2 personnes basée à Paris :
                </p>
                <ul className="space-y-3 pl-6">
                  <li className="flex items-start gap-3">
                    <span className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-[#6BCFCF]/20 text-[#6BCFCF] text-sm font-bold mt-0.5">G</span>
                    <div>
                      <strong className="text-white">Guillaume</strong> — Développeur full-stack, expert en IA et scraping de données. 
                      Responsable de l'algorithme d'analyse de photos et de la sélection des déménageurs.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-[#6BCFCF]/20 text-[#6BCFCF] text-sm font-bold mt-0.5">L</span>
                    <div>
                      <strong className="text-white">Lucie</strong> — Product Manager, spécialiste UX et SEO. Responsable du tunnel de 
                      conversion et de la satisfaction client.
                    </div>
                  </li>
                </ul>
                <p className="pt-4">
                  Nous sommes joignables directement par email à{" "}
                  <a href="mailto:contact@moverz.fr" className="text-[#6BCFCF] hover:text-white transition-colors font-medium">
                    contact@moverz.fr
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="text-center space-y-4 mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              En quelques chiffres
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Moverz aujourd'hui
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { value: "11", label: "Villes couvertes", suffix: "" },
              { value: "1200+", label: "Clients servis", suffix: "" },
              { value: "4.9", label: "Note moyenne", suffix: "/5" },
              { value: "50+", label: "Déménageurs partenaires", suffix: "" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#6BCFCF] mb-2">
                  {stat.value}
                  <span className="text-2xl text-white/60">{stat.suffix}</span>
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-[#04141f]">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#6BCFCF]/20 bg-gradient-to-br from-[#6BCFCF]/5 to-[#4FB8B8]/10 p-8 md:p-12 text-center">
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Rejoignez les 1200+ clients satisfaits
              </h2>
              <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                Créez votre dossier en 5 minutes et comparez 5+ devis de déménageurs contrôlés.
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

