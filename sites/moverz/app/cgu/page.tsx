import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | Moverz",
  description: "Conditions générales d'utilisation du service Moverz.",
  alternates: { canonical: 'https://moverz.fr/cgu/' },
};

export default function CGUPage() {
  return (
    <main className="bg-hero min-h-screen">
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Conditions Générales d'Utilisation</h1>
          <p className="text-lg text-white/75 mb-12">
            En utilisant Moverz, vous acceptez les présentes conditions.
          </p>

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Objet du service</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Moverz est un service de préparation de dossier et de mise en relation avec des entreprises de déménagement. 
                  Nous analysons vos besoins, créons un dossier standardisé, et le transmettons à des déménageurs sélectionnés.
                </p>
                <p><strong className="text-white">Moverz n'est pas un déménageur</strong> et ne réalise pas de déménagements.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Utilisation du service</h2>
              <div className="space-y-3 text-white/80">
                <p>Le service est gratuit pour les particuliers. Vous vous engagez à :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fournir des informations exactes et complètes</li>
                  <li>Ne pas utiliser le service à des fins frauduleuses</li>
                  <li>Ne pas créer de faux dossiers</li>
                  <li>Respecter les déménageurs et notre équipe support</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Responsabilités</h2>
              <div className="space-y-3 text-white/80">
                <p><strong className="text-white">Moverz :</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>S'engage à transmettre votre dossier à des déménageurs contrôlés</li>
                  <li>Ne garantit pas l'acceptation des devis par les déménageurs</li>
                  <li>N'est pas responsable des prix, délais ou qualité des prestations des déménageurs</li>
                </ul>
                <p className="pt-3"><strong className="text-white">Vous :</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Choisissez librement le déménageur</li>
                  <li>Signez un contrat directement avec le déménageur choisi</li>
                  <li>Êtes responsable du paiement et du suivi avec le déménageur</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Disponibilité</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Nous nous efforçons de maintenir le service disponible 24/7, mais ne pouvons garantir une disponibilité 
                  absolue (maintenance, pannes, etc.).
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Modification des CGU</h2>
              <div className="space-y-3 text-white/80">
                <p>
                  Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications entrent en vigueur dès 
                  leur publication sur le site.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Loi applicable</h2>
              <div className="space-y-3 text-white/80">
                <p>Les présentes CGU sont régies par le droit français. Tout litige relève de la compétence des tribunaux français.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

