import type { Metadata } from 'next'
import { getAllBlogPosts, getPilierPosts } from '@/lib/blog';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: "Blog Déménagement Rouen - Guides & Conseils Experts | Moverz",
  description: "Guides complets et conseils d'experts pour réussir votre déménagement à Rouen. Astuces budget, checklist, comparatifs, conseils pratiques. Articles rédigés par des professionnels.",
  alternates: {
    canonical: `https://www.devis-demenageur-rouen.fr/blog`,
  },
  openGraph: {
    title: "Blog Déménagement Rouen - Tous nos guides pratiques",
    description: "Conseils d'experts, guides détaillés et astuces pour déménager sereinement à Rouen.",
    url: `https://www.devis-demenageur-rouen.fr/blog`,
    type: 'website',
  },
}

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const pilierPosts = getPilierPosts();
  const satellitePosts = allPosts.filter(post => post.type === 'satellite');

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2000&auto=format&fit=crop"
            alt="Blog déménagement - Guides et conseils"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" }
              ]}
            />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 mt-6">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-white">Guides & Conseils Experts</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Guides Déménagement Rouen
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Conseils d'experts et guides complets pour réussir votre déménagement. 
              Prix, astuces, comparatifs : tout ce que vous devez savoir avant de déménager.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Pilier Premium */}
      <section className="section">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              📖 Nos Guides Complets
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Guides exhaustifs rédigés par des experts du déménagement. 
              Tout ce que vous devez savoir pour réussir votre projet.
            </p>
          </div>

          <div className="grid gap-8">
            {pilierPosts.slice(0, 3).map((post, index) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                className="group"
              >
                <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b7a78] via-[#6bcfcf] to-[#2b7a78] p-[2px] hover:shadow-2xl hover:shadow-[#6bcfcf]/20 transition-all duration-500">
                  {/* Effet brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className="relative bg-[#04163a] rounded-3xl p-8 md:p-10">
                    <div className="grid md:grid-cols-[1fr_300px] gap-8 items-center">
                      {/* Contenu */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl">{['🏆', '💰', '🎯'][index]}</span>
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-[#6bcfcf] text-[#04163a]">
                            Guide #{index + 1}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-[#6bcfcf] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-lg text-white/80 leading-relaxed line-clamp-2">
                          {post.meta_description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span>{post.word_count.toLocaleString()} mots</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{Math.ceil(post.word_count / 200)} min lecture</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(post.publish_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-center md:justify-end">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#6bcfcf] text-[#04163a] font-bold text-lg group-hover:bg-white group-hover:scale-105 transition-all duration-300 shadow-lg">
                          Lire le guide
                          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Autres guides piliers (si > 3) */}
          {pilierPosts.length > 3 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-6">Autres Guides Complets</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pilierPosts.slice(3).map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                    className="group"
                  >
                    <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-[#6bcfcf]/50 transition-all duration-300 overflow-hidden h-full">
                      <div className="p-6 h-full flex flex-col">
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6bcfcf] text-[#04163a]">
                            📚 Guide Complet
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-3">
                          {post.title}
                        </h3>
                        <p className="text-white/80 mb-4 line-clamp-3 flex-grow text-sm">
                          {post.meta_description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/60 mt-auto">
                          <span>{post.word_count.toLocaleString()} mots</span>
                          <span className="text-[#6bcfcf] font-medium group-hover:text-white">
                            Lire →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Articles Satellites */}
      {satellitePosts.length > 0 && (
        <section className="section bg-white/5">
          <div className="container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                📝 Tous nos Articles
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Conseils pratiques et astuces pour approfondir chaque aspect de votre déménagement
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {satellitePosts.map((post) => (
                <Link 
                  key={post.slug} 
                  href={`/blog/${post.cleanCategory}/${post.cleanSlug}`}
                  className="group"
                >
                  <article className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-[#6bcfcf]/10 transition-all duration-300 overflow-hidden h-full">
                    <div className="p-5 h-full flex flex-col">
                      <h3 className="text-base font-semibold text-white group-hover:text-[#6bcfcf] transition-colors mb-3 line-clamp-2 flex-grow">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>{post.word_count} mots</span>
                        <span className="text-[#6bcfcf] group-hover:text-white transition-colors">
                          Lire →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b7a78] via-[#6bcfcf] to-[#2b7a78] p-[2px]">
            <div className="relative bg-[#04163a] rounded-3xl p-8 md:p-12 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6bcfcf]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2b7a78]/10 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="text-5xl mb-4">🚀</div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Prêt à déménager à Rouen ?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  Comparez gratuitement les devis de déménageurs professionnels à Rouen. 
                  Rapide, gratuit, et sans engagement.
                </p>
                <Link 
                  href="/inventaire-ia" 
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#6bcfcf] text-[#04163a] font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Obtenir 5 devis gratuits
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
