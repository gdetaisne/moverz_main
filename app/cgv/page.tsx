import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente (CGV) | Moverz",
  description:
    "Conditions Générales de Vente de Moverz (GSLV) : objet, commande, prix, paiement, droit de rétractation, responsabilité, médiation.",
  alternates: { canonical: "https://devis-demenageur-toulouse.fr/cgv" },
};

export default function CGVPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
            alt="Conditions Générales de Vente"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold">Conditions Générales de Vente</h1>
          <p className="text-white/85 mt-3 max-w-3xl">
            Les présentes conditions s'appliquent aux services proposés par Moverz,
            marque exploitée par GSLV (17290, France).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <div className="space-y-10 text-white/90">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">1. Objet</h2>
              <p>
                Moverz prépare un dossier et met en relation les clients avec des
                déménageurs partenaires en vue de l'émission de devis et de la
                réalisation de prestations de déménagement par ces derniers.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">2. Commande et processus</h2>
              <p>
                Le donneur d'ordre professionnel (déménageur partenaire) conclut un
                contrat avec GSLV pour la préparation du dossier et la mise en
                relation. Les particuliers bénéficient du service sans contrepartie
                financière et ne contractent pas avec GSLV.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">3. Prix et paiement</h2>
              <p>
                Le service est gratuit pour le client. Lorsque le client valide un
                devis, un acompte de 30% est collecté et conservé par Moverz pendant
                15 jours avant reversement au partenaire sélectionné. Les prix des
                prestations sont fixés par le partenaire et figurent sur le devis.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">4. Droit de rétractation</h2>
              <p>
                Les présentes CGV s'appliquent exclusivement à des relations B2B.
                Le droit de rétractation du Code de la consommation ne s'applique
                pas. Toute annulation par le partenaire après lancement des
                opérations peut donner lieu à facturation des frais engagés.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">5. Responsabilité</h2>
              <p>
                Moverz intervient en qualité d'intermédiaire. Les prestations de
                déménagement sont exécutées sous la responsabilité des partenaires
                sélectionnés. Moverz ne saurait être tenu responsable des dommages
                résultant de l'exécution des prestations du partenaire.
              </p>
            </div>

            

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">7. Données personnelles</h2>
              <p>
                Le traitement des données est détaillé dans la <a className="underline text-[#6bcfcf]" href="/politique-confidentialite/">Politique de
                confidentialité</a>.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">8. Droit applicable</h2>
              <p>
                Droit français. Compétence des tribunaux du ressort du domicile du
                consommateur pour les litiges concernés.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


