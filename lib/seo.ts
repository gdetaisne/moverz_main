import type { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs strasbourg',
  defaultTitle: 'Déménageurs strasbourg - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: 'https://www.strasbourg-demenageur.fr',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.strasbourg-demenageur.fr',
    siteName: 'Déménageurs strasbourg',
    images: [
      {
        url: 'https://www.strasbourg-demenageur.fr/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs strasbourg - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageursstrasbourg',
    site: '@demenageursstrasbourg',
    cardType: 'summary_large_image',
  },
};
