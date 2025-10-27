import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | Moverz",
  description:
    "CGU de Moverz (GSLV) — fonctionnement du service gratuit pour particuliers, rôle d'intermédiaire B2B, paiements mandataires, données (60 jours).",
  alternates: { canonical: "https://devis-demenageur-toulouse.fr/cgu" },
};

export default function CGUPage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
            alt="CGU Moverz"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold">Conditions Générales d'Utilisation</h1>
          <p className="text-white/85 mt-3 max-w-3xl">
            Les présentes CGU encadrent l'utilisation du service Moverz, opéré par
            GSLV (RCS La Rochelle 914 499 876), sans préjudice des documents
            contractuels conclus entre professionnels.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl text-white/90 space-y-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">1. Objet et périmètre</h2>
            <p>
              Moverz est un service gratuit pour les particuliers permettant de
              préparer un dossier (photos, informations utiles), de générer un
              inventaire/estimation et d'être mis en relation avec des déménageurs
              partenaires. GSLV agit comme intermédiaire B2B: aucun contrat de
              prestation n'est conclu avec les consommateurs et aucune facturation
              ne leur est adressée par GSLV.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">2. Accès et comptes</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Création automatique d'un identifiant de session anonyme.</li>
              <li>Un email peut être collecté pour communiquer sur la demande.</li>
              <li>
                Suppression des données personnelles (y compris photos et email)
                sous 60 jours après la création du dossier ou l'absence d'action.
              </li>
            </ul>
            <p className="mt-2 text-white/80">Conseil: si vous partagez l'accès à votre ordinateur, pensez à vous déconnecter ou à utiliser une fenêtre privée.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">3. Description du service</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Photos → analyse IA → inventaire → estimation → demandes de devis.</li>
              <li>Suppression automatique des photos sous 60 jours.</li>
              <li>Service gratuit pour les particuliers; mise en relation possible avec plusieurs déménageurs.</li>
              <li>Estimation indicative: pas de garantie de résultat ni d'exactitude.</li>
              <li>GSLV n'est pas un prestataire de déménagement.</li>
            </ul>
            <p className="mt-2 text-white/80">Exemple: si une lampe non photographiée n'apparaît pas dans l'inventaire, signalez-la avant l'envoi aux partenaires pour une estimation plus fidèle.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">4. Conditions financières</h2>
            <p>
              B2C: le service est gratuit. GSLV peut encaisser, en qualité de
              mandataire du déménageur (merchant of record = déménageur), un acompte
              par carte via un prestataire de services de paiement. Si le client ne
              retient finalement aucun déménageur et que l'acompte n'a pas encore été
              reversé au partenaire, GSLV procède au remboursement sous 5 jours
              ouvrés. Aucun frais n'est retenu. Après reversement, toute demande
              relève du déménageur.
            </p>
            <p className="mt-2">
              B2B: les partenaires sont facturés lors du versement de l'acompte.
              Les modalités du prestataire de paiement et la gestion des litiges
              (dont chargebacks) s'appliquent entre le déménageur et le PSP. GSLV
              peut assister mais n'assume aucune responsabilité à ce titre.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">5. Responsabilités</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>GSLV agit comme intermédiaire technique.</li>
              <li>Les prestations des déménageurs (qualité, délais, sinistres, prix) relèvent de leur responsabilité.</li>
              <li>Le service est fourni « tel quel » et sans garantie d'aucune sorte.</li>
              <li>
                Dans les limites permises par la loi, GSLV n'est pas responsable des
                dommages indirects, pertes de données, manque à gagner ou indisponibilités.
              </li>
            </ul>
            <p className="mt-2 text-white/80">En pratique, nous aidons à clarifier les dossiers et à fluidifier les échanges, mais le contrat et l'exécution appartiennent au professionnel choisi.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">6. Données, IA et cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Photos et données personnelles supprimées sous 60 jours.</li>
              <li>Pas d'utilisation des contenus des utilisateurs pour entraîner des modèles.</li>
              <li>Les fournisseurs d'IA et de vision peuvent varier dans le temps (ex. OpenAI, Anthropic, Google Vision, AWS Rekognition).</li>
              <li>Cookies techniques strictement nécessaires dans l'application; pas de cookies non nécessaires sur le site public (susceptible d'évoluer).</li>
            </ul>
            <p className="mt-2 text-white/80">Vous gardez la propriété de vos photos; nous les utilisons uniquement pour votre dossier et nous les supprimons automatiquement.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">7. Sécurité et intégrité</h2>
            <p>
              GSLV met en œuvre des mesures raisonnables de sécurité. Tout usage
              abusif (spam, attaques, extraction massive) peut conduire à la
              suspension d'accès.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">8. Modifications</h2>
            <p>
              Le service et les CGU peuvent évoluer. L'information est réalisée sur
              le site ou par email le cas échéant. La poursuite d'usage vaut
              acceptation des modifications.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">9. Droit applicable</h2>
            <p>
              Droit français. Juridiction compétente: Tribunal judiciaire de La
              Rochelle, sous réserve des règles d'ordre public applicables.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-3">10. Contact</h2>
            <p>
              Support et demandes RGPD: gdetaisne@gmail.com — Adresse postale: 5
              rue Jean Coyttar, 17290 Thairé, France.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


