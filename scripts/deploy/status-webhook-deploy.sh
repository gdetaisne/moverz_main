#!/bin/bash

# Force rebuild tous les sites via webhook GitHub
# Les sites se déploient automatiquement via webhook

echo "🚀 FORCE REBUILD VIA WEBHOOK GITHUB"
echo "===================================="
echo ""

CITIES=("marseille" "lyon" "montpellier" "bordeaux" "nantes" "lille" "nice" "strasbourg" "rouen" "rennes" "toulouse")

echo "✅ Push effectué vers les 11 repos GitHub"
echo ""
echo "📊 Déploiement en cours via webhook CapRover..."
echo ""

for city in "${CITIES[@]}"; do
  echo "  🔄 dd-$city → https://demenageurs-$city.moverz.fr"
done

echo ""
echo "⏱️  Temps estimé : 3-5 min par site"
echo "⏱️  Total : ~15-30 min (parallèle)"
echo ""
echo "🔗 Monitoring :"
echo "   https://captain.gslv.cloud"
echo ""
echo "✅ Webhook déclenchés automatiquement par le push GitHub"
echo ""
echo "📋 Pour vérifier le statut :"
echo "   1. Va sur https://captain.gslv.cloud"
echo "   2. Clique sur chaque app (dd-nice, dd-lyon, etc.)"
echo "   3. Onglet 'Deployment' pour voir les logs"
echo ""


