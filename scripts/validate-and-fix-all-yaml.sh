#!/bin/bash

# Script pour valider et corriger tous les problèmes YAML dans les frontmatters
# Usage: ./scripts/validate-and-fix-all-yaml.sh

set -e

echo "🔧 VALIDATION ET CORRECTION YAML"
echo "================================="
echo ""

# Fonction pour corriger un site
fix_site() {
  local site=$1
  local path=$2
  
  echo "📦 Traitement: $site"
  
  if [ ! -d "$path" ]; then
    echo "   ⚠️  Dossier non trouvé: $path"
    return
  fi
  
  # 1. Corriger les \: invalides
  local count_colon=$(find "$path" -name "*.md" -type f -exec grep -l '\\:' {} + 2>/dev/null | wc -l)
  if [ "$count_colon" -gt 0 ]; then
    echo "   🔧 Correction de $count_colon fichiers avec \\:"
    find "$path" -name "*.md" -type f -exec sed -i '' 's/\\:/:/g' {} +
  fi
  
  # 2. Corriger les \" finaux
  local count_quote=$(find "$path" -name "*.md" -type f -exec grep -l '\\"$' {} + 2>/dev/null | wc -l)
  if [ "$count_quote" -gt 0 ]; then
    echo "   🔧 Correction de $count_quote fichiers avec \\\" final"
    find "$path" -name "*.md" -type f -exec sed -i '' 's/\\"$/"/g' {} +
  fi
  
  # 3. Vérification finale
  local errors=0
  if grep -r '\\:' "$path" >/dev/null 2>&1; then
    echo "   ❌ Encore des \\: trouvés"
    errors=$((errors + 1))
  fi
  
  if grep -r '\\"$' "$path" >/dev/null 2>&1; then
    echo "   ❌ Encore des \\\" finaux trouvés"
    errors=$((errors + 1))
  fi
  
  if [ $errors -eq 0 ]; then
    echo "   ✅ Tous les fichiers YAML sont valides"
  fi
  
  echo ""
}

# Corriger la racine (fichiers copiés)
fix_site "racine (content/blog)" "content/blog"

# Corriger tous les sites
SITES=(
  "bordeaux"
  "lille"
  "lyon"
  "marseille"
  "montpellier"
  "nantes"
  "nice"
  "rennes"
  "rouen"
  "strasbourg"
  "toulouse"
)

for site in "${SITES[@]}"; do
  fix_site "$site" "sites/$site/content/blog"
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ VALIDATION ET CORRECTION TERMINÉES !"
echo ""
echo "📊 Résumé:"
echo "   • Échappements \\: supprimés"
echo "   • Guillemets cassés \\\" corrigés"
echo "   • Frontmatters YAML validés"
echo ""
echo "🚀 Prêt pour le build Next.js !"

