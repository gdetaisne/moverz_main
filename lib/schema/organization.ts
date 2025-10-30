import type { WithContext, Organization } from 'schema-dts';

export interface OrganizationInput {
  name: string;
  url: string;
  logo: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    postalCode?: string;
    addressCountry: string;
  };
  sameAs?: string[]; // Réseaux sociaux
}

export function buildOrganizationSchema(input: OrganizationInput): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: input.name,
    url: input.url,
    logo: input.logo,
    description: input.description,
    telephone: input.telephone,
    email: input.email,
    address: input.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: input.address.streetAddress,
          addressLocality: input.address.addressLocality,
          postalCode: input.address.postalCode,
          addressCountry: input.address.addressCountry,
        }
      : undefined,
    sameAs: input.sameAs,
  };
}

