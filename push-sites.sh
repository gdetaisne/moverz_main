#!/bin/bash
# Push tous les sites vers leurs repos GitHub individuels

cd /Users/guillaumestehelin/moverz_main

for site in marseille lyon montpellier bordeaux nantes lille nice strasbourg rouen rennes toulouse; do
  echo "📦 Pushing $site..."
  cd sites/$site
  git add -A 2>/dev/null || true
  git commit -m "feat: Nouveaux piliers SEO et corrections" 2>/dev/null || echo "  Rien à committer"
  git push origin main 2>&1 | tail -3
  cd ../..
  echo ""
done

echo "✅ Terminé !"

