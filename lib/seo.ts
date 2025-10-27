import type { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs rennes',
  defaultTitle: 'Déménageurs rennes - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: 'https://www.rennes-demenageur.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.rennes-demenageur.fr',
    siteName: 'Déménageurs rennes',
    images: [
      {
        url: 'https://www.rennes-demenageur.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs rennes - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageursrennes',
    site: '@demenageursrennes',
    cardType: 'summary_large_image',
  },
};
