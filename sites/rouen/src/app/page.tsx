import HeaderTemplate from "@/components/HeaderTemplate";

export default function Home() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      <HeaderTemplate />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Template Moverz
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Template de base pour la génération de sites de déménagement multi-villes
          </p>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Fonctionnalités du template
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Génération automatique</h3>
                <p className="text-white/70">Génération de sites complets à partir de données JSON</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">SEO optimisé</h3>
                <p className="text-white/70">Métadonnées et structure optimisées pour chaque ville</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Design responsive</h3>
                <p className="text-white/70">Interface moderne et adaptative sur tous les écrans</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Contenu dynamique</h3>
                <p className="text-white/70">Injection automatique de données spécifiques à chaque ville</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}