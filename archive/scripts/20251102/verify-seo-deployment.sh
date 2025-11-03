#!/bin/bash

# Script de vérification des optimisations SEO déployées
# Teste les 11 sites pour confirmer que les changements sont actifs

SITES=(
  "marseille:https://devis-demenageur-marseille.fr"
  "toulouse:https://devis-demenageur-toulousain.fr"
  "lyon:https://devis-demenageur-lyon.fr"
  "bordeaux:https://www.bordeaux-demenageur.fr"
  "nantes:https://devis-demenageur-nantes.fr"
  "lille:https://devis-demenageur-lille.fr"
  "nice:https://devis-demenageur-nice.fr"
  "strasbourg:https://devis-demenageur-strasbourg.fr"
  "rouen:https://devis-demenageur-rouen.fr"
  "rennes:https://devis-demenageur-rennes.fr"
  "montpellier:https://devis-demenageur-montpellier.fr"
)

echo "🔍 VÉRIFICATION DÉPLOIEMENT SEO"
echo "================================"
echo ""

for site in "${SITES[@]}"; do
  IFS=':' read -r city url <<< "$site"
  echo "📍 $city ($url)"
  
  # Récupérer le HTML
  HTML=$(curl -sS "$url")
  
  # Test 1: Title contient "Comparateur"
  if echo "$HTML" | grep -q '<title>Comparateur Déménagement'; then
    echo "   ✅ Title optimisé (Comparateur)"
  else
    echo "   ❌ Title non optimisé"
  fi
  
  # Test 2: Description contient "40%"
  if echo "$HTML" | grep -q 'Économisez jusqu.*40%'; then
    echo "   ✅ Description avec '40% économies'"
  else
    echo "   ⚠️  Description sans '40%'"
  fi
  
  # Test 3: FAQPage présent
  if echo "$HTML" | grep -q '"@type":"FAQPage"'; then
    echo "   ✅ Schema FAQPage actif"
  else
    echo "   ❌ Schema FAQPage manquant"
  fi
  
  # Test 4: Téléphone présent
  if echo "$HTML" | grep -q '"+33633046059"'; then
    echo "   ✅ Téléphone 06.33.04.60.59"
  else
    echo "   ⚠️  Téléphone manquant"
  fi
  
  # Test 5: Plus de "(IA)" dans title
  if echo "$HTML" | grep -q '<title>.*\(IA\)'; then
    echo "   ❌ '(IA)' encore présent"
  else
    echo "   ✅ '(IA)' retiré du title"
  fi
  
  echo ""
done

echo "================================"
echo "✅ Vérification terminée"

