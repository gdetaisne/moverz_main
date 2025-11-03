#!/bin/bash
# Nettoyage automatisé des redirections cross-ville sur toutes les villes

set -e

echo "🧹 NETTOYAGE CROSS-VILLE - 11 VILLES"
echo "===================================="
echo ""

declare -A RESULTS

# Lyon
echo "📍 LYON"
cd /Users/guillaumestehelin/moverz_main-2/sites/lyon
BEFORE=$(grep -c "source:" next.config.mjs)
# Déjà fait manuellement
git add next.config.mjs
git commit -m "cleanup(redirects): Suppression redirections quartiers Bordeaux cross-ville" || true
git push origin main 2>&1 | tail -1
AFTER=$(grep -c "source:" next.config.mjs)
RESULTS[lyon]="$BEFORE → $AFTER"
echo "✅ Lyon: ${RESULTS[lyon]}"
echo ""

# Montpellier  
echo "📍 MONTPELLIER"
cd /Users/guillaumestehelin/moverz_main-2/sites/montpellier
# Chercher et supprimer quartiers Bordeaux + URLs Toulouse
echo "   Analyse..."
grep -n "QUARTIERS BORDEAUX\|TOULOUSE" next.config.mjs | head -3
echo ""

# Nantes
echo "📍 NANTES"
cd /Users/guillaumestehelin/moverz_main-2/sites/nantes
echo "   Analyse..."
grep -n "QUARTIERS BORDEAUX\|/toulouse" next.config.mjs | head -3
echo ""

# Lille
echo "📍 LILLE"
cd /Users/guillaumestehelin/moverz_main-2/sites/lille
echo "   Analyse..."
grep -n "Bordeaux\|/toulouse" next.config.mjs | head -3
echo ""

# Rouen
echo "📍 ROUEN"
cd /Users/guillaumestehelin/moverz_main-2/sites/rouen
echo "   Analyse..."
grep -n "BORDEAUX\|/toulouse" next.config.mjs | head -3
echo ""

# Rennes
echo "📍 RENNES"
cd /Users/guillaumestehelin/moverz_main-2/sites/rennes
echo "   Analyse..."
grep -n "BORDEAUX\|TOULOUSE" next.config.mjs | head -5
echo ""

# Strasbourg
echo "📍 STRASBOURG"
cd /Users/guillaumestehelin/moverz_main-2/sites/strasbourg
echo "   Analyse..."
grep -n "BORDEAUX\|/toulouse" next.config.mjs | head -3
echo ""

echo "═══════════════════════════════════"
echo "✅ ANALYSE TERMINÉE"

