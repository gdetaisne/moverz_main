import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente (CGV) | Moverz",
  description: "Conditions générales de vente entre Moverz et les professionnels partenaires.",
  alternates: { canonical: 'https://moverz.fr/cgv/' },
};

export default function CGVPage() {
  return (
    <main className="bg-hero min-h-screen">
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Conditions Générales de Vente</h1>
          <p className="text-lg text-white/75 mb-12">
            Conditions applicables aux relations B2B entre Moverz et ses partenaires professionnels.
          </p>

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Champ d'application</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Les présentes CGV s'appliquent exclusivement aux relations commerciales entre GSLV (Moverz) et 
                  les entreprises de déménagement partenaires.
                </p>
                <p><strong className="text-white">Important :</strong> Les particuliers ne sont pas clients de Moverz. 
                Aucune facturation n'est émise aux consommateurs finaux.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Services fournis</h2>
              <div className="space-y-3 text-white/80">
                <p>Moverz fournit aux déménageurs partenaires :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Des dossiers clients qualifiés (analyse IA, inventaire standardisé)</li>
                  <li>Un espace d'accès aux demandes</li>
                  <li>Un support technique et commercial</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Tarification</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Les partenaires rémunèrent Moverz selon un modèle de commission au succès : un pourcentage 
                  du montant du devis uniquement si le client choisit ce partenaire ET que le déménagement a lieu.
                </p>
                <p>Détails tarifaires communiqués dans le contrat partenaire individuel.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Obligations des partenaires</h2>
              <div className="space-y-3 text-white/80">
                <p>Les déménageurs partenaires s'engagent à :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintenir leurs assurances professionnelles à jour</li>
                  <li>Respecter les délais de chiffrage (48h recommandées)</li>
                  <li>Ne pas contacter directement les clients (anonymat jusqu'au choix)</li>
                  <li>Informer Moverz en cas de déménagement confirmé</li>
                  <li>Respecter les prix et conditions du devis transmis</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Facturation et paiement</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Les factures sont émises mensuellement. Délai de paiement : 30 jours nets. 
                  En cas de retard, des pénalités de 3 fois le taux d'intérêt légal s'appliquent.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Résiliation</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Le partenariat peut être résilié par l'une ou l'autre partie avec un préavis de 30 jours. 
                  Les dossiers en cours restent dus jusqu'à leur finalisation.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact partenaires</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Pour devenir partenaire ou toute question commerciale : <a href="mailto:contact@moverz.fr" className="text-[#6BCFCF] hover:text-white transition-colors">contact@moverz.fr</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

