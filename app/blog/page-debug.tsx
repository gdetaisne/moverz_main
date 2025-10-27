import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blog Debug - Test Simple",
  description: "Version simplifiée pour debug",
}

export default function BlogDebugPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Blog Debug - Version Simplifiée
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Cette version ne charge aucune donnée externe. Si cette page fonctionne, 
              le problème vient du chargement des articles de blog.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Test de fonctionnement
            </h2>
            <p className="text-white/80">
              Si vous voyez cette page, le problème vient du système de chargement des articles.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
