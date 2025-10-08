#!/bin/bash

# Script pour créer des branches par site
# Usage: ./setup-branches.sh

echo "🌿 CRÉATION DES BRANCHES PAR SITE"
echo "=================================="
echo ""

sites=(lille marseille lyon toulouse nice nantes strasbourg rennes rouen)

for site in "${sites[@]}"; do
  echo "🌿 Création branche: deploy-$site"
  
  # Créer et basculer sur la branche
  git checkout -b "deploy-$site"
  
  # Créer captain-definition pour ce site
  echo "{
    \"schemaVersion\": 2,
    \"dockerfilePath\": \"./sites/$site/Dockerfile\"
  }" > captain-definition
  
  # Commit initial
  git add captain-definition
  git commit -m "🎯 Branche déploiement $site

- Captain-definition configuré pour $site
- App CapRover: dd-$site
- Dockerfile: sites/$site/Dockerfile"
  
  # Push la branche
  git push -u origin "deploy-$site"
  
  # Revenir sur main
  git checkout main
  
  echo "✅ Branche deploy-$site créée"
  echo ""
done

echo "🎉 TOUTES LES BRANCHES CRÉÉES !"
echo ""
echo "📋 Configuration CapRover par app:"
echo ""
for site in "${sites[@]}"; do
  echo "  App: dd-$site"
  echo "    Repository: gdetaisne/moverz_main"
  echo "    Branch: deploy-$site"
  echo "    Username: gdetaisne"
  echo "    Password: [ton token GitHub]"
  echo ""
done
