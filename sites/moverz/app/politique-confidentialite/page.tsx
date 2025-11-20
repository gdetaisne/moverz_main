import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Moverz",
  description: "Politique de confidentialité et protection des données personnelles de Moverz conforme au RGPD.",
  alternates: { canonical: 'https://moverz.fr/politique-confidentialite/' },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="bg-hero min-h-screen">
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Politique de confidentialité</h1>
          <p className="text-lg text-white/75 mb-12">
            Moverz respecte votre vie privée et s'engage à protéger vos données personnelles conformément au RGPD.
          </p>

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Données collectées</h2>
              <div className="space-y-3 text-white/80">
                <p>Nous collectons uniquement les données nécessaires au bon fonctionnement du service :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Informations de contact (nom, email, téléphone)</li>
                  <li>Adresses de départ et d'arrivée</li>
                  <li>Photos de vos pièces/meubles (pour l'analyse IA)</li>
                  <li>Dates et services souhaités</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Utilisation des données</h2>
              <div className="space-y-3 text-white/80">
                <p>Vos données sont utilisées uniquement pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Créer et traiter votre dossier de déménagement</li>
                  <li>Transmettre votre demande aux déménageurs sélectionnés</li>
                  <li>Vous envoyer les devis reçus</li>
                  <li>Améliorer nos services (analyse anonymisée)</li>
                </ul>
                <p className="pt-3"><strong className="text-white">Nous ne vendons jamais vos données à des tiers.</strong></p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Vos droits RGPD</h2>
              <div className="space-y-3 text-white/80">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Droit d'accès :</strong> consulter vos données</li>
                  <li><strong className="text-white">Droit de rectification :</strong> corriger vos données</li>
                  <li><strong className="text-white">Droit d'effacement :</strong> supprimer vos données</li>
                  <li><strong className="text-white">Droit d'opposition :</strong> refuser le traitement</li>
                  <li><strong className="text-white">Droit à la portabilité :</strong> récupérer vos données</li>
                </ul>
                <p className="pt-3">
                  Pour exercer ces droits : <a href="mailto:contact@moverz.fr" className="text-[#6BCFCF] hover:text-white transition-colors">contact@moverz.fr</a>
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sécurité et conservation</h2>
              <div className="space-y-3 text-white/80">
                <p>Vos données sont stockées de manière sécurisée sur des serveurs situés en France (Paris).</p>
                <p>Durée de conservation : 3 ans après votre dernier contact, ou suppression immédiate sur demande.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
              <div className="space-y-3 text-white/80">
                <p>Nous utilisons uniquement des cookies essentiels au fonctionnement du site (session, préférences).</p>
                <p>Aucun cookie publicitaire ou de tracking tiers n'est utilisé.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

