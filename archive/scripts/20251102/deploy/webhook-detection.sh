#!/bin/bash

# Webhook avec détection des changements
# Usage: ./webhook-detection.sh

echo "🔍 DÉTECTION DES CHANGEMENTS"
echo "============================"
echo ""

# Détecter les sites modifiés dans le dernier commit
MODIFIED_SITES=()

# Vérifier chaque site
sites=(lille marseille lyon toulouse nice nantes strasbourg rennes rouen)

for site in "${sites[@]}"; do
  # Vérifier si des fichiers du site ont changé
  if git diff HEAD~1 HEAD --name-only | grep -q "^sites/$site/"; then
    MODIFIED_SITES+=("$site")
    echo "✅ $site modifié"
  fi
done

if [ ${#MODIFIED_SITES[@]} -eq 0 ]; then
  echo "ℹ️  Aucun site modifié dans ce commit"
  exit 0
fi

echo ""
echo "🚀 DÉPLOIEMENT DES SITES MODIFIÉS"
echo "=================================="

for site in "${MODIFIED_SITES[@]}"; do
  echo ""
  echo "🎯 Déploiement de $site..."
  
  # Créer captain-definition
  echo "{
    \"schemaVersion\": 2,
    \"dockerfilePath\": \"./sites/$site/Dockerfile\"
  }" > captain-definition
  
  # Commit de déploiement
  git add captain-definition
  git commit -m "🚀 Déploiement automatique: $site

- Détecté par webhook GitHub
- App CapRover: dd-$site
- Déclenché par modification de sites/$site/"

  echo "✅ $site prêt pour déploiement"
done

# Push tous les commits
git push

echo ""
echo "🎉 DÉPLOIEMENTS DÉCLENCHÉS !"
echo "Sites concernés: ${MODIFIED_SITES[*]}"
