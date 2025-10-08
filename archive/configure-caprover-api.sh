#!/bin/bash

# Configuration pour dd-lille
APP_NAME="dd-lille"
CAPTAIN_DEFINITION_PATH="sites/lille/captain-definition"

# URL de ton CapRover (remplace par la tienne)
CAPROVER_URL="https://captain.gslv.cloud"

# Token CapRover (à récupérer dans CapRover → Settings → Access Token)
CAPROVER_TOKEN="YOUR_TOKEN_HERE"

echo "Configuration de $APP_NAME avec Captain Definition Path: $CAPTAIN_DEFINITION_PATH"

# Commande pour configurer via API
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

echo "Configuration terminée !"
