#!/bin/bash

# Script pour déployer un site spécifique
# Usage: ./deploy-site.sh lille

if [ $# -eq 0 ]; then
  echo "Usage: ./deploy-site.sh <site>"
  echo "Sites disponibles: bordeaux, marseille, lyon, toulouse, nice, nantes, strasbourg, lille, rennes, rouen"
  exit 1
fi

SITE=$1
APP_NAME="dd-$SITE"

echo "🚀 DÉPLOIEMENT DU SITE: $SITE"
echo "=============================="
echo ""

# Vérifier que le site existe
if [ ! -d "sites/$SITE" ]; then
  echo "❌ Erreur: Le site '$SITE' n'existe pas dans sites/$SITE"
  exit 1
fi

echo "📋 Configuration pour $SITE:"
echo "  App CapRover: $APP_NAME"
echo "  Repository: gdetaisne/moverz_main"
echo "  Branch: main"
echo "  Captain Definition Path: sites/$SITE/captain-definition"
echo ""

# Créer un captain-definition à la racine pour ce site spécifique
echo "{
  \"schemaVersion\": 2,
  \"dockerfilePath\": \"./sites/$SITE/Dockerfile\"
}" > captain-definition

echo "✅ Créé captain-definition à la racine pour $SITE"

# Commit et push
git add captain-definition
git commit -m "🎯 Déploiement $SITE

- Captain-definition configuré pour $SITE
- Dockerfile: sites/$SITE/Dockerfile
- App CapRover: $APP_NAME
- Prêt pour déploiement !"

echo ""
echo "📤 Push vers GitHub..."
git push

echo ""
echo "🧹 Nettoyage post-déploiement..."
# Supprimer le captain-definition temporaire pour éviter la pollution
git rm captain-definition
git commit -m "🧹 Nettoyage: suppression captain-definition temporaire post-déploiement $SITE"
git push

echo ""
echo "🎉 DÉPLOIEMENT PRÊT ET NETTOYÉ !"
echo ""
echo "📋 Maintenant dans CapRover pour $APP_NAME:"
echo "  1. Va dans l'onglet 'Déploiement'"
echo "  2. Configure:"
echo "     Repository: gdetaisne/moverz_main"
echo "     Branch: main"
echo "     Username: gdetaisne"
echo "     Password: [ton token GitHub]"
echo "  3. Clique sur 'Save & Deploy'"
echo ""
echo "💡 Le captain-definition à la racine pointe vers sites/$SITE/Dockerfile"
