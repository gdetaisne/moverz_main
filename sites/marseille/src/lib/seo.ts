import type { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs Bordeaux',
  defaultTitle: 'Déménageurs Bordeaux - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: 'https://www.bordeaux-demenageur.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.bordeaux-demenageur.fr',
    siteName: 'Déménageurs Bordeaux',
    images: [
      {
        url: 'https://www.bordeaux-demenageur.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs Bordeaux - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageursbordeaux',
    site: '@demenageursbordeaux',
    cardType: 'summary_large_image',
  },
};
