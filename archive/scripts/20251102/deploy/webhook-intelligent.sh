#!/bin/bash

# Webhook intelligent pour déploiement sélectif
# Usage: ./webhook-intelligent.sh <site> <commit_message>

if [ $# -lt 2 ]; then
  echo "Usage: ./webhook-intelligent.sh <site> <commit_message>"
  echo "Sites disponibles: lille, marseille, lyon, toulouse, nice, nantes, strasbourg, rennes, rouen"
  exit 1
fi

SITE=$1
COMMIT_MSG="$2"
APP_NAME="dd-$SITE"

echo "🎯 DÉPLOIEMENT SÉLECTIF: $SITE"
echo "=============================="
echo ""

# Vérifier que le site existe
if [ ! -d "sites/$SITE" ]; then
  echo "❌ Erreur: Le site '$SITE' n'existe pas"
  exit 1
fi

# Créer captain-definition pour ce site
echo "{
  \"schemaVersion\": 2,
  \"dockerfilePath\": \"./sites/$SITE/Dockerfile\"
}" > captain-definition

# Commit avec message spécifique
git add captain-definition
git commit -m "$COMMIT_MSG

🎯 Déploiement automatique: $SITE
- App CapRover: $APP_NAME
- Dockerfile: sites/$SITE/Dockerfile
- Déclenché par webhook GitHub"

# Push
git push

echo ""
echo "✅ Déploiement déclenché pour $APP_NAME"
echo "📋 CapRover va automatiquement redéployer $APP_NAME"
