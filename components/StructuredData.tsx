import { organizationJsonLd } from '@/lib/seo-helpers';
import { env } from '@/lib/env';

export default function StructuredData() {
  // Par défaut: Organization générique pour le domaine courant
  const structuredData = organizationJsonLd('Moverz', env.SITE_URL);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


