export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Déménageurs Bordeaux (IA)",
    "description": "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
    "url": "https://www.devis-demenageur-bordeaux.fr",
    "telephone": "+33-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bordeaux",
      "addressRegion": "Nouvelle-Aquitaine",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.8378,
      "longitude": -0.5792
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bordeaux"
      },
      {
        "@type": "City",
        "name": "Mérignac"
      },
      {
        "@type": "City",
        "name": "Pessac"
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



