#!/bin/bash

echo "🔄 MISE À JOUR DE TOUS LES SITES AVEC LES NOUVEAUX COMPOSANTS"
echo "============================================================"
echo ""

# Liste des sites
SITES=("toulouse" "bordeaux" "marseille" "lyon" "nantes" "lille" "nice" "strasbourg" "rennes" "rouen" "montpellier")

for site in "${SITES[@]}"; do
  echo "📦 Mise à jour du site: $site"
  
  # Copier les nouveaux composants
  cp components/Guarantees.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  Guarantees.tsx déjà présent ou erreur"
  cp components/KeyStats.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  KeyStats.tsx déjà présent ou erreur"
  cp components/PartnerCTA.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  PartnerCTA.tsx déjà présent ou erreur"
  cp components/ZonesCovered.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  ZonesCovered.tsx déjà présent ou erreur"
  
  # Copier les composants mis à jour
  cp components/Header.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  Header.tsx déjà présent ou erreur"
  cp components/Hero.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  Hero.tsx déjà présent ou erreur"
  cp components/HowItWorks.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  HowItWorks.tsx déjà présent ou erreur"
  cp components/PhotoGuidelines.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  PhotoGuidelines.tsx déjà présent ou erreur"
  cp components/PricingPreview.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  PricingPreview.tsx déjà présent ou erreur"
  cp components/Testimonials.tsx sites/$site/components/ 2>/dev/null || echo "  ⚠️  Testimonials.tsx déjà présent ou erreur"
  
  # Copier les fichiers principaux
  cp app/page.tsx sites/$site/app/                            || echo "  ⚠️  page.tsx erreur"
  cp app/layout.tsx sites/$site/app/                          || echo "  ⚠️  layout.tsx erreur"
  cp app/globals.css sites/$site/app/                         || echo "  ⚠️  globals.css erreur"
  
  echo "  ✅ $site mis à jour"
  echo ""
done

echo "🎉 MISE À JOUR TERMINÉE !"
echo "========================"
echo ""
echo "Tous les sites ont été mis à jour avec les nouveaux composants."
echo "Vous pouvez maintenant déployer chaque site individuellement."
