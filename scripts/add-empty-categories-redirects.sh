#!/bin/bash

# Script pour ajouter les redirections catégories blog vides → /blog
# Boss 30 oct 2025 - Fix CSV liens cassés

CITIES=("bordeaux" "lille" "lyon" "marseille" "montpellier" "nantes" "nice" "rennes" "rouen" "strasbourg" "toulouse")

# Catégories vides à rediriger
EMPTY_CATS=(
  "etudiant"
  "urgent"
  "devis"
  "longue-distance"
)

echo "🔧 AJOUT REDIRECTIONS CATÉGORIES VIDES"
echo "======================================="
echo ""

for CITY in "${CITIES[@]}"; do
  CONFIG_FILE="sites/$CITY/next.config.mjs"
  
  if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "⚠️  Pas de next.config.mjs pour $CITY, skip"
    continue
  fi
  
  echo "📝 $CITY"
  
  # Vérifier si la section redirects existe
  if ! grep -q "async redirects()" "$CONFIG_FILE"; then
    echo "   ⚠️  Pas de section redirects(), skip"
    continue
  fi
  
  # Ajouter les redirections pour chaque catégorie vide
  for CAT in "${EMPTY_CATS[@]}"; do
    # Vérifier si la redirection existe déjà
    if grep -q "/blog/$CAT\"" "$CONFIG_FILE"; then
      echo "   ✓ /blog/$CAT déjà redirigé"
    else
      # Trouver la ligne de fermeture de redirects() et insérer avant
      # On cherche "return [" et on ajoute après
      sed -i.bak "/return \[/a\\
      // CATÉGORIES VIDES → /blog\\
      { source: '/blog/$CAT', destination: '/blog', permanent: true }," "$CONFIG_FILE"
      echo "   ✅ Ajouté /blog/$CAT → /blog"
    fi
  done
  
  echo ""
done

echo ""
echo "✅ TERMINÉ ! Vérifiez et committez."

