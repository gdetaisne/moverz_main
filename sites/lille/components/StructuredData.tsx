export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Déménageurs Lille (IA)",
    "description": "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
    "url": "https://www.devis-demenageur-lille.fr",
    "telephone": "+33-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lille",
      "addressRegion": "Hauts-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.6292,
      "longitude": 3.0573
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Lille"
      },
      {
        "@type": "City",
        "name": "Roubaix"
      },
      {
        "@type": "City",
        "name": "Tourcoing"
      }
    ],
    "priceRange": "€€",
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


