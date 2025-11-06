import type { WithContext, BreadcrumbList } from 'schema-dts';
import { env } from '@/lib/env';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  // Convertir URLs relatives en absolues pour Google
  const baseUrl = env.SITE_URL.endsWith('/') ? env.SITE_URL.slice(0, -1) : env.SITE_URL;
  
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.label,
    // URL absolue requise pour Google
    item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

