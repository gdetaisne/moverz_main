import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | Moverz",
  description:
    "Mentions légales de Moverz (GSLV) : éditeur, hébergeur, responsabilité, propriété intellectuelle et données personnelles.",
  alternates: {
    canonical: 'https://moverz.fr/mentions-legales/',
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="bg-hero min-h-screen">
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Mentions légales</h1>
          <p className="text-lg text-white/75 mb-12">
            Informations légales conformément aux articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 (LCEN).
          </p>

          <div className="space-y-8">
            {/* Éditeur */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Éditeur du site</h2>
              <div className="space-y-2 text-white/80">
                <p><strong className="text-white">Raison sociale :</strong> GSLV (société par actions simplifiée)</p>
                <p><strong className="text-white">Marque exploitée :</strong> Moverz</p>
                <p><strong className="text-white">Siège social :</strong> 5 rue Jean Coyttar, 17290 Thairé, France</p>
                <p><strong className="text-white">SIREN :</strong> 914 499 876</p>
                <p><strong className="text-white">SIRET :</strong> 914 499 876 00011</p>
                <p><strong className="text-white">RCS :</strong> La Rochelle</p>
                <p><strong className="text-white">TVA intracommunautaire :</strong> FR43914499876</p>
                <p><strong className="text-white">Capital social :</strong> 1 000,00 €</p>
                <p><strong className="text-white">Directeur de la publication :</strong> Guillaume Stehelin</p>
                <p><strong className="text-white">Contact :</strong> <a href="mailto:contact@moverz.fr" className="text-[#6BCFCF] hover:text-white transition-colors">contact@moverz.fr</a></p>
              </div>
            </div>

            {/* Hébergement */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Hébergement</h2>
              <div className="space-y-2 text-white/80">
                <p><strong className="text-white">Hébergeur :</strong> Hostinger International Ltd.</p>
                <p><strong className="text-white">Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
                <p><strong className="text-white">VAT :</strong> CY10301365E</p>
                <p><strong className="text-white">Localisation du serveur :</strong> France (Paris)</p>
              </div>
            </div>

            {/* Activité */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Activité</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Moverz propose un service de préparation de dossier et de mise en relation avec des entreprises de 
                  déménagement partenaires. La comparaison des devis et le choix final appartiennent au client.
                </p>
                <p>
                  GSLV agit exclusivement en tant qu'intermédiaire B2B et facture ses prestations aux professionnels partenaires. 
                  Aucun contrat de prestation n'est conclu avec les consommateurs finaux.
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Propriété intellectuelle</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  L'ensemble des contenus du site (textes, graphismes, logos, marques et bases de données) est protégé par le 
                  droit de la propriété intellectuelle. Toute reproduction, adaptation ou représentation, totale ou partielle, 
                  sans autorisation écrite préalable est interdite.
                </p>
              </div>
            </div>

            {/* Responsabilité */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Responsabilité</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Les informations sont fournies à titre indicatif. Malgré le soin apporté, Moverz ne saurait être responsable 
                  des erreurs, indisponibilités ou dommages indirects. Les devis sont émis par des partenaires tiers sous leur 
                  responsabilité.
                </p>
              </div>
            </div>

            {/* Données personnelles */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Données personnelles</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Le traitement des données est décrit dans notre{" "}
                  <a href="/politique-confidentialite/" className="text-[#6BCFCF] hover:text-white transition-colors underline">
                    Politique de confidentialité
                  </a>
                  . Conformément au RGPD, vous disposez de droits d'accès, de rectification, d'opposition, de limitation et 
                  d'effacement.
                </p>
                <p>
                  <strong className="text-white">Contact RGPD :</strong> <a href="mailto:contact@moverz.fr" className="text-[#6BCFCF] hover:text-white transition-colors">contact@moverz.fr</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

