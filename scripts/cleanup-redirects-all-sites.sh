#!/bin/bash
# Script pour supprimer les redirections cross-ville sur toutes les villes

set -e

SITES=("nice" "marseille" "lyon" "bordeaux" "nantes" "lille" "strasbourg" "rouen" "rennes" "montpellier")

echo "🧹 NETTOYAGE REDIRECTIONS CROSS-VILLE - 10 VILLES"
echo "=================================================="
echo ""

for SITE in "${SITES[@]}"; do
  echo "📍 $SITE"
  echo "--------"
  
  cd "/Users/guillaumestehelin/moverz_main-2/sites/$SITE"
  
  # Compter redirections avant
  BEFORE=$(grep -c "source:" next.config.mjs 2>/dev/null || echo "0")
  echo "   Redirections avant: $BEFORE"
  
  # Backup
  cp next.config.mjs next.config.mjs.backup
  
  # Supprimer bloc cross-ville (lignes entre "Nettoyage massif" et "Fichiers BATCH")
  # On va utiliser sed pour supprimer entre deux patterns
  
  # Pattern de début: "WILDCARDS : Toutes les URLs" ou similaire
  # Pattern de fin: "Fichiers BATCH" ou "QUARTIERS" ou "Catégories vides"
  
  # Pour l'instant, on va lire le fichier et identifier manuellement
  echo "   → Analyse manuelle nécessaire"
  echo ""
done

echo "✅ Analyse terminée"
echo ""
echo "⚠️  Script incomplet - Nécessite analyse manuelle de chaque ville"

