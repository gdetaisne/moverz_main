import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `FAQ — Déménagement à ${city.nameCapitalized} | Déménageurs ${city.nameCapitalized} (IA)`,
  description:
    `Questions clés déménagement à ${city.nameCapitalized} : prix, délais, stationnement. Réponses pratiques + 3–5 devis en 7 jours.`,
  alternates: {
    canonical: getCanonicalUrl('faq'),
  },
  openGraph: {
    title: `FAQ Déménagement ${city.nameCapitalized}`,
    description: `Toutes vos questions sur le déménagement à ${city.nameCapitalized}`,
    url: getCanonicalUrl('faq'),
    type: 'website',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


