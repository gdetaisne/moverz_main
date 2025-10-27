import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Moverz",
  description:
    "Politique RGPD de Moverz (GSLV) : bases légales, finalités, durées de conservation, droits des personnes, sous-traitants, cookies.",
  alternates: { canonical: "https://devis-demenageur-toulouse.fr/politique-confidentialite" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
            alt="Politique de confidentialité"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold">Politique de confidentialité</h1>
          <p className="text-white/85 mt-3 max-w-3xl">
            Ce document décrit la manière dont Moverz, marque exploitée par GSLV
            (17290, France) traite vos données personnelles conformément au RGPD
            et à la loi Informatique et Libertés.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <div className="space-y-10 text-white/90">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Responsable de traitement</h2>
              <p>
                GSLV (17290, France) — contact: gdetaisne@gmail.com. Marque: Moverz.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Données collectées</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identité et contact: nom, email, téléphone.</li>
                <li>Contenu du dossier: photos des pièces/objets, contraintes, préférences.</li>
                <li>Traces techniques: logs, adresse IP, user-agent (sécurité et analytics).</li>
                <li>Échanges et sélection de devis.</li>
              </ul>
              <p className="mt-2 text-white/80">Nous limitons la collecte au strict nécessaire. Exemple: seules les photos utiles au calcul d'inventaire sont demandées; vous pouvez flouter des éléments personnels.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Finalités et bases légales</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fourniture du service et mise en relation — exécution du contrat (art. 6-1-b).</li>
                <li>Support client et prévention des fraudes — intérêt légitime (art. 6-1-f).</li>
                <li>Facturation au partenaire, obligations légales — respect d'obligation (art. 6-1-c).</li>
                <li>Amélioration du service et statistiques — consentement lorsque requis.</li>
              </ul>
              <p className="mt-2 text-white/80">Nous n'utilisons pas vos contenus pour entraîner des modèles IA sans votre accord. Les mesures d'audience sont limitées et non nominatives.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Durées de conservation</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Photos, inventaires et coordonnées: suppression sous 60 jours.</li>
                <li>Logs techniques non identifiants: durée raisonnable de sécurité.</li>
                <li>Documents comptables: 10 ans (obligation légale).</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Destinataires et transferts</h2>
              <p>
                Vos données sont partagées avec nos déménageurs partenaires aux fins
                d'émission de devis, et avec nos sous-traitants techniques (hébergeur
                et outils analytiques). Les traitements sont hébergés majoritairement
                dans l'UE. En cas de transfert hors UE, des garanties appropriées sont
                mises en place (clauses contractuelles types).
              </p>
              <p className="mt-2">
                Sous-traitants principaux: hébergeur VPS en France (Hostinger), Neon.tech (PostgreSQL),
                et fournisseurs IA/vision susceptibles d'évoluer (ex. OpenAI, Anthropic, Google Vision, AWS Rekognition). La liste à jour peut être
                communiquée sur demande.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Droits des personnes</h2>
              <p>
                Vous disposez des droits d'accès, rectification, effacement, limitation,
                opposition, portabilité, et du droit de définir des directives
                post-mortem. Pour exercer: gdetaisne@gmail.com. Réponse sous 30 jours.
              </p>
              <p className="mt-2">Contact postal: 5 rue Jean Coyttar, 17290 Thairé. Réclamation: CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Cookies et traceurs</h2>
              <p>
                L'application peut utiliser des cookies strictement nécessaires au fonctionnement.
                Aucun cookie non nécessaire n'est déposé sur le site public à ce jour. Ces éléments sont susceptibles d'évoluer.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Sécurité</h2>
              <p>
                Mesures raisonnables de sécurité sont mises en œuvre (chiffrement en transit, contrôle d'accès, journalisation). Aucune décision automatisée produisant des effets juridiques n'est prise. En cas d'incident, nous notifierons la CNIL et, si nécessaire, les personnes concernées.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-white/80">
                <li>Bonnes pratiques recommandées: ne chargez pas de documents d'identité; évitez les visages si possible.</li>
                <li>Vous pouvez demander l'effacement anticipé de vos données via email.</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
              <p>
                Pour toute question: gdetaisne@gmail.com — 5 rue Jean Coyttar, 17290 Thairé, France.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


