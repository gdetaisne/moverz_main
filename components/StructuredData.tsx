export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Déménageurs Rouen (IA)",
    "description": "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
    "url": "https://www.devis-demenageur-rouen.fr",
    "telephone": "+33-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rouen",
      "addressRegion": "Normandie",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 49.4432,
      "longitude": 1.0993
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Rouen"
      },
      {
        "@type": "City",
        "name": "Le Havre"
      },
      {
        "@type": "City",
        "name": "Caen"
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


