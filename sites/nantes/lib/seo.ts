import type { DefaultSeoProps } from 'next-seo';
import { env } from '@/lib/env';

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Déménageurs nantes',
  defaultTitle: 'Déménageurs nantes - 5 devis sous 7 jours',
  description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
  canonical: env.SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: env.SITE_URL,
    siteName: 'Déménageurs nantes',
    images: [
      {
        url: `${env.SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Déménageurs nantes - Devis IA',
      },
    ],
  },
  twitter: {
    handle: '@demenageursnantes',
    site: '@demenageursnantes',
    cardType: 'summary_large_image',
  },
};
