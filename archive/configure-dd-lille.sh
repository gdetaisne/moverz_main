#!/bin/bash

echo "🔧 CONFIGURATION DD-LILLE VIA API CAPROVER"
echo "=========================================="
echo ""

# Configuration
APP_NAME="dd-lille"
CAPROVER_URL="https://captain.gslv.cloud"
CAPTAIN_DEFINITION_PATH="sites/lille/captain-definition"

echo "📋 Configuration :"
echo "  App: $APP_NAME"
echo "  URL: $CAPROVER_URL"
echo "  Captain Definition Path: $CAPTAIN_DEFINITION_PATH"
echo ""

echo "🔑 Pour continuer, tu as besoin de :"
echo "  1. Ton token CapRover (Settings → Access Token)"
echo "  2. Ton token GitHub"
echo ""

read -p "Token CapRover: " CAPROVER_TOKEN
read -p "Token GitHub: " GITHUB_TOKEN

echo ""
echo "🚀 Configuration de l'app..."

# Étape 1: Configurer le repository
echo "1. Configuration du repository GitHub..."
curl -X POST "$CAPROVER_URL/api/v2/user/apps/appDefinitions/update" \
  -H "Content-Type: application/json" \
  -H "x-captain-auth: $CAPROVER_TOKEN" \
  -d '{
    "appName": "'$APP_NAME'",
    "hasPersistentData": false,
    "description": "Site de déménagement Lille",
    "instanceCount": 1,
    "captainDefinitionRelativeFilePath": "'$CAPTAIN_DEFINITION_PATH'"
  }'

echo ""
echo "2. Configuration du déploiement GitHub..."
curl -X POST "$CAPROVER_URL/api/v2/user/apps/appDefinitions/update" \
  -H "Content-Type: application/json" \
  -H "x-captain-auth: $CAPROVER_TOKEN" \
  -d '{
    "appName": "'$APP_NAME'",
    "repoInfo": {
      "repo": "gdetaisne/moverz_main",
      "branch": "main",
      "user": "gdetaisne",
      "password": "'$GITHUB_TOKEN'"
    }
  }'

echo ""
echo "✅ Configuration terminée !"
echo "🎯 App $APP_NAME configurée avec :"
echo "   - Repository: gdetaisne/moverz_main"
echo "   - Captain Definition Path: $CAPTAIN_DEFINITION_PATH"
echo ""
echo "🚀 Va dans CapRover et clique sur 'Deploy' pour l'app $APP_NAME"
