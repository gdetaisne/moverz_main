#!/bin/bash

# Script pour forcer le rebuild d'un site sur CapRover
# Usage: ./force-rebuild.sh <site>

if [ $# -eq 0 ]; then
  echo "Usage: ./force-rebuild.sh <site>"
  echo "Sites disponibles: bordeaux, marseille, lyon, toulouse, nice, nantes, strasbourg, lille, rennes, rouen"
  exit 1
fi

SITE=$1
APP_NAME="dd-$SITE"

echo "🔄 FORCE REBUILD: $SITE"
echo "======================"
echo ""

# Créer un fichier de force rebuild
echo "FORCE REBUILD $(date +%s) - $(date)" > force-rebuild-$(date +%s).txt

# Commit et push pour déclencher le webhook
git add force-rebuild-*.txt
git commit -m "🔄 FORCE REBUILD $SITE - $(date)

- Fichier de force rebuild créé
- Déclenchement webhook CapRover
- App: $APP_NAME"

echo "📤 Push vers GitHub pour déclencher webhook..."
git push

echo ""
echo "🎯 REBUILD DÉCLENCHÉ !"
echo ""
echo "Vérifiez dans CapRover app '$APP_NAME' que le déploiement a commencé."