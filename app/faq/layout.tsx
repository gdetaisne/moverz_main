import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Déménagement à lyon | Déménageurs lyon (IA)",
  description:
    "Toutes les réponses sur le déménagement à lyon : prix, volume en m³, cartons, quartiers difficiles, autorisations de stationnement, périodes, etc.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


