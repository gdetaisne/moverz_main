#!/bin/bash

# Script de validation et suivi de progression - Résolution 404s
# Exécute l'analyse et compare avec les objectifs

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  VALIDATION & SUIVI DE PROGRESSION - 404s                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 1. Exécuter l'analyse
echo "🔍 Exécution de l'analyse des 404s..."
node "$SCRIPT_DIR/analyze-404.mjs" > /dev/null 2>&1

# 2. Lire les résultats
ANALYSIS_FILE="$ROOT_DIR/404-analysis.json"

if [ ! -f "$ANALYSIS_FILE" ]; then
  echo "❌ Fichier 404-analysis.json introuvable"
  exit 1
fi

# Extraire les métriques (nécessite jq)
if ! command -v jq &> /dev/null; then
  echo "⚠️  jq n'est pas installé. Installation recommandée: brew install jq"
  echo ""
  echo "📊 Consultez manuellement: $ANALYSIS_FILE"
  exit 0
fi

TOTAL_LINKS=$(jq '.summary.totalBrokenLinks' "$ANALYSIS_FILE")
TOTAL_ARTICLES=$(jq '.summary.totalArticles' "$ANALYSIS_FILE")

SLUGS_INCORRECTS=$(jq '.categorized["slugs-incorrects"] | length' "$ANALYSIS_FILE")
ARTICLES_MANQUANTS=$(jq '.categorized["articles-manquants"] | length' "$ANALYSIS_FILE")
PREFIXES_VILLES=$(jq '.categorized["prefixes-villes"] | length' "$ANALYSIS_FILE")

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ÉTAT ACTUEL                                               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
printf "   Total liens cassés:        ${RED}%'d${NC}\n" $TOTAL_LINKS
printf "   Total articles:            ${GREEN}%'d${NC}\n" $TOTAL_ARTICLES
printf "   Taux:                      ${YELLOW}%.2f${NC} erreurs/article\n" $(echo "scale=2; $TOTAL_LINKS / $TOTAL_ARTICLES" | bc)

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  RÉPARTITION PAR TYPE                                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
printf "   🏷️  Slugs incorrects:       ${YELLOW}%'d${NC} (%.1f%%)\n" $SLUGS_INCORRECTS $(echo "scale=1; $SLUGS_INCORRECTS * 100 / $TOTAL_LINKS" | bc)
printf "   📄 Articles manquants:     ${RED}%'d${NC} (%.1f%%)\n" $ARTICLES_MANQUANTS $(echo "scale=1; $ARTICLES_MANQUANTS * 100 / $TOTAL_LINKS" | bc)
printf "   🏙️  Préfixes villes:        ${BLUE}%'d${NC} (%.1f%%)\n" $PREFIXES_VILLES $(echo "scale=1; $PREFIXES_VILLES * 100 / $TOTAL_LINKS" | bc)

# 3. Objectifs et progression
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  OBJECTIFS & PROGRESSION                                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

INITIAL_404=2970
TARGET_PHASE1=1806
TARGET_PHASE2=1618
TARGET_PHASE4=50
TARGET_FINAL=0

function show_progress() {
  local current=$1
  local target=$2
  local phase_name=$3
  
  if [ $current -le $target ]; then
    printf "   ${GREEN}✅ $phase_name atteint${NC}\n"
    printf "      Objectif: %'d | Actuel: ${GREEN}%'d${NC} | ${GREEN}Réussi!${NC}\n" $target $current
  else
    local diff=$((current - target))
    printf "   ${YELLOW}⏳ $phase_name en cours${NC}\n"
    printf "      Objectif: %'d | Actuel: ${YELLOW}%'d${NC} | Reste: ${RED}-%'d${NC}\n" $target $current $diff
  fi
  echo ""
}

show_progress $TOTAL_LINKS $TARGET_PHASE1 "Phase 1 (Préfixes)"
show_progress $TOTAL_LINKS $TARGET_PHASE2 "Phase 2 (Slugs)"
show_progress $TOTAL_LINKS $TARGET_PHASE4 "Phase 4 (Catégories)"
show_progress $TOTAL_LINKS $TARGET_FINAL "Objectif final"

# 4. Progression globale
PERCENT_COMPLETE=$(echo "scale=1; ($INITIAL_404 - $TOTAL_LINKS) * 100 / $INITIAL_404" | bc)

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  PROGRESSION GLOBALE                                       ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
printf "   Initial:     %'d 404s\n" $INITIAL_404
printf "   Actuel:      ${YELLOW}%'d${NC} 404s\n" $TOTAL_LINKS
printf "   Corrigé:     ${GREEN}%'d${NC} 404s\n" $((INITIAL_404 - TOTAL_LINKS))
printf "   Progression: ${GREEN}%.1f%%${NC}\n" $PERCENT_COMPLETE

# Barre de progression
BAR_WIDTH=50
FILLED=$(echo "scale=0; $BAR_WIDTH * $PERCENT_COMPLETE / 100" | bc)
EMPTY=$((BAR_WIDTH - FILLED))

printf "\n   ["
for i in $(seq 1 $FILLED); do printf "█"; done
for i in $(seq 1 $EMPTY); do printf "░"; done
printf "] %.1f%%\n" $PERCENT_COMPLETE

# 5. Top villes problématiques
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  TOP 5 VILLES PROBLÉMATIQUES                               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

jq -r '.summary.cities | sort_by(-.brokenLinks) | .[:5] | .[] | "   \(.city | ascii_upcase | .[0:15])\t\(.brokenLinks) liens cassés (\(.filesWithIssues) fichiers)"' "$ANALYSIS_FILE"

# 6. Recommandations
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  PROCHAINES ACTIONS RECOMMANDÉES                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

if [ $PREFIXES_VILLES -gt 100 ]; then
  echo "   🔴 Priorité 1: Exécuter Phase 1 (Préfixes villes)"
  echo "      $ bash scripts/phase1-fix-ville-prefixes.sh"
  echo ""
fi

if [ $SLUGS_INCORRECTS -gt 50 ] && [ $PREFIXES_VILLES -le 100 ]; then
  echo "   🟡 Priorité 2: Corriger les slugs incorrects"
  echo "      $ bash scripts/phase2-fix-categories.mjs"
  echo ""
fi

if [ $ARTICLES_MANQUANTS -gt 100 ] && [ $PREFIXES_VILLES -le 100 ]; then
  echo "   🟡 Priorité 3: Analyser articles manquants"
  echo "      $ node scripts/analyze-missing-articles-detailed.mjs"
  echo ""
fi

if [ $TOTAL_LINKS -le 100 ]; then
  echo "   🟢 Dernière ligne droite!"
  echo "      $ node scripts/analyze-missing-articles-detailed.mjs"
  echo "      Puis créer les derniers articles manquants"
  echo ""
fi

if [ $TOTAL_LINKS -eq 0 ]; then
  echo ""
  echo "   ${GREEN}🎉 BRAVO! AUCUN 404 DÉTECTÉ!${NC}"
  echo ""
  echo "   Étapes finales:"
  echo "   1. Mettre à jour les sitemaps"
  echo "   2. Tester crawl complet"
  echo "   3. Soumettre à Google Search Console"
  echo ""
fi

# 7. Historique (si fichier existe)
HISTORY_FILE="$ROOT_DIR/404-progress-history.json"

if [ -f "$HISTORY_FILE" ]; then
  # Ajouter nouvelle entrée
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  ENTRY=$(jq -n \
    --arg ts "$TIMESTAMP" \
    --argjson total "$TOTAL_LINKS" \
    --argjson slugs "$SLUGS_INCORRECTS" \
    --argjson missing "$ARTICLES_MANQUANTS" \
    --argjson prefixes "$PREFIXES_VILLES" \
    '{timestamp: $ts, total: $total, slugs: $slugs, missing: $missing, prefixes: $prefixes}')
  
  jq ". += [$ENTRY]" "$HISTORY_FILE" > "${HISTORY_FILE}.tmp" && mv "${HISTORY_FILE}.tmp" "$HISTORY_FILE"
else
  # Créer historique
  TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  echo '[{"timestamp":"'$TIMESTAMP'","total":'$TOTAL_LINKS',"slugs":'$SLUGS_INCORRECTS',"missing":'$ARTICLES_MANQUANTS',"prefixes":'$PREFIXES_VILLES'}]' > "$HISTORY_FILE"
fi

echo ""
echo "📊 Historique mis à jour: $HISTORY_FILE"
echo ""

