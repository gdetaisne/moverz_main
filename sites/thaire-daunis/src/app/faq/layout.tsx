import cityData from "@/lib/city-data";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Déménagement à {cityData.city_name}",
  description:
    "Toutes les réponses sur le déménagement à {cityData.city_name} : prix, volume en m³, cartons, autorisations de stationnement, périodes, etc.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
