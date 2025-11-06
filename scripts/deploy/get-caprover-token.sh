#!/bin/bash

# Script pour obtenir le token CapRover via CLI
# Usage: ./scripts/deploy/get-caprover-token.sh

set -e

echo "🔑 OBTENIR TOKEN CAPROVER VIA CLI"
echo "=================================="
echo ""

# Vérifier si caprover CLI est installé
if ! command -v caprover &> /dev/null; then
  echo "❌ CapRover CLI n'est pas installé"
  echo ""
  echo "📦 Installation..."
  npm install -g caprover
  
  if ! command -v caprover &> /dev/null; then
    echo "❌ Échec installation. Vérifie que npm/node sont installés."
    exit 1
  fi
  
  echo "✅ CapRover CLI installé"
  echo ""
fi

echo "📋 Étapes suivantes :"
echo ""
echo "1. Connecte-toi à CapRover :"
echo "   caprover login -h captain.moverz.fr"
echo ""
echo "2. Une fois connecté, essaie d'obtenir le token :"
echo "   caprover api-token"
echo ""
echo "   OU si cette commande n'existe pas :"
echo "   caprover api generate-token"
echo ""
echo "   OU vérifie les commandes disponibles :"
echo "   caprover --help"
echo "   caprover api --help"
echo ""
echo "3. Si le CLI ne génère pas de token directement,"
echo "   tu peux utiliser le CLI pour rebuild directement :"
echo ""
echo "   Pour rebuild une app :"
echo "   caprover deploy -h captain.moverz.fr -a dd-nantes --tarFile /tmp/dummy.tar"
echo ""
echo "   Mais cette méthode nécessite un tarball, donc pas pratique."
echo ""
echo "💡 RECOMMANDATION :"
echo "   Pour 2 apps seulement (dd-nantes, dd-rennes),"
echo "   la méthode manuelle via le Dashboard est plus rapide :"
echo ""
echo "   1. Dashboard → dd-nantes → Deployment → Force Rebuild"
echo "   2. Dashboard → dd-rennes → Deployment → Force Rebuild"
echo ""
echo "   Total : ~10 minutes"

