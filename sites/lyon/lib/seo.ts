import type { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs lyon',
  defaultTitle: 'Déménageurs lyon - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: 'https://www.lyon-demenageur.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.lyon-demenageur.fr',
    siteName: 'Déménageurs lyon',
    images: [
      {
        url: 'https://www.lyon-demenageur.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs lyon - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageurslyon',
    site: '@demenageurslyon',
    cardType: 'summary_large_image',
  },
};
