import type { Metadata } from "next";

export type BuildMetadataInput = {
  title: string;
  description: string;
  siteName: string;
  metadataBase: string; // absolute origin, e.g. https://example.com
  pathname?: string; // e.g. /blog/slug
  ogImagePath?: string; // e.g. /og-image.jpg
  noindex?: boolean;
};

export function buildCanonical(metadataBase: string, pathname: string = "/"): string {
  const base = metadataBase.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    siteName,
    metadataBase,
    pathname = "/",
    ogImagePath = "/og-image.jpg",
    noindex,
  } = input;

  const canonical = buildCanonical(metadataBase, pathname);

  return {
    title,
    description,
    metadataBase: new URL(metadataBase),
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: buildCanonical(metadataBase, ogImagePath),
          width: 1200,
          height: 630,
          alt: `${siteName} - Aperçu`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [buildCanonical(metadataBase, ogImagePath)],
    },
  } as Metadata;
}

// JSON-LD helpers

export function organizationJsonLd(name: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
  };
}

export function serviceJsonLd(params: {
  name: string;
  providerName: string;
  areaServed?: string | string[];
  url?: string;
}) {
  const { name, providerName, areaServed, url } = params;
  const data: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: {
      "@type": "Organization",
      name: providerName,
    },
  };
  if (areaServed) data.areaServed = areaServed;
  if (url) data.url = url;
  return data;
}

export function articleJsonLd(params: {
  headline: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  url?: string;
  image?: string;
}) {
  const { headline, description, datePublished, dateModified, authorName = 'Moverz', url, image } = params;
  const data: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    author: { "@type": "Organization", name: authorName },
  };
  if (description) data.description = description;
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;
  if (url) data.url = url;
  if (image) data.image = image;
  return data;
}

export function breadcrumbListJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: it.name,
      item: it.item,
    })),
  };
}


