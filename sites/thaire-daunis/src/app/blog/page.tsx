import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Déménagement Thairé d'Aunis - Conseils et Actualités",
  description: "Découvrez nos conseils pour réussir votre déménagement à Thairé d'Aunis. Guides pratiques, astuces et actualités.",
};

export default function BlogPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop"
            alt="Blog déménagement Thairé d'Aunis"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Blog Déménagement Thairé d'Aunis
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Conseils, guides pratiques et actualités pour réussir votre déménagement.
            </p>
          </div>
        </div>
      </section>

      {/* Contenu Blog */}
      <Section>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Message pour l'instant */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-[#2b7a78]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#6bcfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-white mb-4">
                Articles à venir
              </h2>
              
              <p className="text-white/80 mb-6">
                Nous préparons des articles de qualité pour vous accompagner dans votre déménagement à Thairé d'Aunis.
              </p>

              <div className="space-y-3 text-left max-w-md mx-auto mb-8">
                <div className="flex items-start gap-3 text-white/70">
                  <svg className="w-5 h-5 text-[#6bcfcf] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Guides pratiques déménagement</span>
                </div>
                <div className="flex items-start gap-3 text-white/70">
                  <svg className="w-5 h-5 text-[#6bcfcf] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Astuces économies et organisation</span>
                </div>
                <div className="flex items-start gap-3 text-white/70">
                  <svg className="w-5 h-5 text-[#6bcfcf] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Actualités et réglementation</span>
                </div>
              </div>

              <a
                href="/faq"
                className="inline-flex items-center gap-2 text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition duration-300"
              >
                En attendant, consultez notre FAQ
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white/5">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Prêt à déménager ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Obtenez rapidement des devis de déménageurs professionnels à Thairé d'Aunis.
          </p>
          <a
            href="/inventaire-ia/"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-6 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 transition duration-300"
          >
            3+ devis gratuis
          </a>
        </div>
      </Section>
    </main>
  );
}

