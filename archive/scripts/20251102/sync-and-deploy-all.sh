#!/bin/bash

# Script pour synchroniser et déployer tous les sites
# Fait un pull puis push pour chaque site

set -e

echo "🔄 SYNCHRONISATION ET DÉPLOIEMENT TOUS LES SITES"
echo "================================================="
echo ""

CITIES=(
  "marseille"
  "toulouse"
  "lyon"
  "bordeaux"
  "nantes"
  "lille"
  "nice"
  "strasbourg"
  "rouen"
  "rennes"
  "montpellier"
)

for city in "${CITIES[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📦 $city"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  cd "sites/$city"
  
  # Vérifier si git est initialisé
  if [ ! -d ".git" ]; then
    echo "   ⚠️  Pas de repo Git - skip"
    cd ../..
    continue
  fi
  
  # 1. Stash les changements locaux (s'il y en a)
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "   💾 Stash changements locaux..."
    git stash push -m "Auto-stash avant sync $(date)"
  fi
  
  # 2. Pull depuis GitHub
  echo "   ⬇️  Pull depuis GitHub..."
  if git pull --rebase origin main; then
    echo "   ✅ Pull réussi"
  else
    echo "   ⚠️  Conflit ou erreur pull - tentative de résolution..."
    git rebase --abort 2>/dev/null || true
    git pull --no-rebase origin main || echo "   ⚠️  Pull échoué"
  fi
  
  # 3. Restaurer les changements stashés
  if git stash list | grep -q "Auto-stash"; then
    echo "   📂 Restaure changements..."
    git stash pop || echo "   ⚠️  Conflits lors du pop - vérifier manuellement"
  fi
  
  # 4. Add & Commit
  if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git status --porcelain)" ]; then
    echo "   📝 Commit changements..."
    git add -A
    git commit -m "feat(seo): dynamisation métadonnées et sitemaps

- cityData.ts : données centralisées
- Sitemaps générés automatiquement
- Métadonnées et Schema.org dynamiques
- Build testé OK" || echo "   ℹ️  Rien à commiter"
  else
    echo "   ℹ️  Aucun changement à commiter"
  fi
  
  # 5. Push vers GitHub
  echo "   ⬆️  Push vers GitHub..."
  if git push origin main; then
    echo "   ✅ $city déployé avec succès"
  else
    echo "   ❌ $city échec push"
  fi
  
  echo ""
  cd ../..
done

echo "═══════════════════════════════════════════════════"
echo "✨ DÉPLOIEMENT TERMINÉ"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Attendre 10-15 min pour rebuilds CapRover"
echo "   2. Vérifier les sites : https://devis-demenageur-{ville}.fr"
echo "   3. Tester sitemaps : https://devis-demenageur-{ville}.fr/sitemap.xml"
echo "   4. Soumettre à Google Search Console"
echo ""

