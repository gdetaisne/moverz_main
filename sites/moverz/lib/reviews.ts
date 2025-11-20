/**
 * Avis clients Moverz (hub national)
 * Avis génériques de clients de toutes les villes
 */

interface Review {
  author: string;
  city: string;
  summary: string;
  body: string;
  rating: number;
}

export const MOVERZ_REVIEWS: Review[] = [
  {
    author: "Sophie M.",
    city: "Lyon",
    summary: "Enfin des devis comparables",
    body: "J'ai comparé 6 devis sur la même base grâce à Moverz. J'ai économisé 340€ en choisissant un déménageur fiable. Sans spam, tout par email, parfait.",
    rating: 5,
  },
  {
    author: "Thomas D.",
    city: "Marseille",
    summary: "Plus de devis alignés que prévu",
    body: "7 devis reçus en 5 jours, tous sur le même volume. Aucun appel intempestif. Le dossier anonyme change tout, on garde la main.",
    rating: 5,
  },
  {
    author: "Claire B.",
    city: "Nice",
    summary: "Processus clair et sécurisé",
    body: "Les déménageurs étaient tous bien notés et assurés. Le fait qu'ils chiffrent tous le même dossier permet de voir qui est honnête. Merci Moverz.",
    rating: 5,
  },
  {
    author: "Antoine L.",
    city: "Bordeaux",
    summary: "Gain de temps incroyable",
    body: "Un seul dossier au lieu de 5 visites techniques. J'ai reçu mes devis en 4 jours. Économie de 280€ par rapport au premier devis que j'avais eu.",
    rating: 5,
  },
  {
    author: "Marie P.",
    city: "Toulouse",
    summary: "0 spam, top !",
    body: "Aucun appel commercial non souhaité. Tout s'est passé par email, j'ai pu comparer tranquillement. Les déménageurs étaient tous pros.",
    rating: 5,
  },
  {
    author: "Lucas R.",
    city: "Nantes",
    summary: "Vraiment sans engagement",
    body: "J'avais peur de recevoir des dizaines d'appels. Zéro. Les devis sont arrivés par email, j'ai choisi celui qui me convenait. Simple et efficace.",
    rating: 5,
  },
  {
    author: "Émilie G.",
    city: "Strasbourg",
    summary: "Des pros contrôlés",
    body: "Tous les déménageurs avaient de bonnes assurances et de vrais avis. Le comparateur filtre vraiment les arnaqueurs.",
    rating: 5,
  },
  {
    author: "Julien K.",
    city: "Lille",
    summary: "Prix justes et transparents",
    body: "Avec 5 devis sur la même base, j'ai pu voir qui gonflait les prix. Choisi un déménageur honnête à 1850€ au lieu de 2400€.",
    rating: 5,
  },
  {
    author: "Camille T.",
    city: "Rennes",
    summary: "Rapide et sans stress",
    body: "Dossier créé en 10 minutes, 5 devis reçus en une semaine. Anonymat respecté. Déménagement réussi avec le pro choisi.",
    rating: 5,
  },
];

/**
 * Récupère des avis aléatoires
 */
export function getRandomReviews(count: number = 3): Review[] {
  const shuffled = [...MOVERZ_REVIEWS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Calcule la note moyenne
 */
export function getAverageRating(reviews: Review[] = MOVERZ_REVIEWS): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Compte total d'avis
 */
export function getTotalReviews(): number {
  return MOVERZ_REVIEWS.length;
}

