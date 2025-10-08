// Configuration SEO générique - Les valeurs seront remplacées par Handlebars
export const defaultSEO = {
  titleTemplate: '%s | {{{city_name}}} Déménageur',
  defaultTitle: 'Déménageurs {{{city_name}}} - 5 devis sous 7 jours',
  canonical: '{{{domain}}}',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '{{{domain}}}',
    siteName: 'Déménageurs {{{city_name}}}',
    images: [
      {
        url: '{{{domain}}}/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs {{{city_name}}} - Devis IA',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@moverz_fr',
    site: '@moverz_fr',
    cardType: 'summary_large_image',
  },
};
