#!/bin/bash

# 🧹 SCRIPT DE NETTOYAGE ET REDÉMARRAGE
# Supprime tous les sites et prépare un redémarrage propre

set -e

echo "🧹 NETTOYAGE COMPLET - REDÉMARRAGE"
echo "=================================="
echo ""

# 1. Arrêter tous les serveurs Next.js
echo "1️⃣ Arrêt des serveurs Next.js..."
pkill -f "next dev" 2>/dev/null || echo "   Aucun serveur à arrêter"
sleep 2

# 2. Supprimer tous les sites générés
echo "2️⃣ Suppression des sites générés..."
if [ -d "sites" ]; then
    rm -rf sites/*
    echo "   ✅ Dossier sites/ nettoyé"
else
    echo "   ℹ️  Dossier sites/ n'existe pas"
fi

# 3. Supprimer les repos temporaires
echo "3️⃣ Suppression des repos temporaires..."
if [ -d "temp-repos" ]; then
    rm -rf temp-repos/*
    echo "   ✅ Dossier temp-repos/ nettoyé"
else
    echo "   ℹ️  Dossier temp-repos/ n'existe pas"
fi

# 4. Nettoyer les caches Node.js
echo "4️⃣ Nettoyage des caches..."
if [ -d "moverz-template" ]; then
    cd moverz-template
    rm -rf node_modules/.cache 2>/dev/null || true
    echo "   ✅ Cache template nettoyé"
    cd ..
fi

# 5. Vérifier l'état du template
echo "5️⃣ Vérification du template..."
if [ -d "moverz-template" ]; then
    echo "   ✅ Template présent"
    echo "   📋 Composants disponibles :"
    ls moverz-template/src/components/ 2>/dev/null | head -5 || echo "      Aucun composant trouvé"
    echo "   📋 Scripts disponibles :"
    ls moverz-template/scripts/ 2>/dev/null | head -5 || echo "      Aucun script trouvé"
else
    echo "   ❌ Template manquant !"
    exit 1
fi

# 6. Vérifier les données des villes
echo "6️⃣ Vérification des données..."
if [ -d "moverz-template/data" ]; then
    echo "   ✅ Données disponibles :"
    ls moverz-template/data/*.json 2>/dev/null | wc -l | xargs echo "      Fichiers JSON :"
    ls moverz-template/data/*.json 2>/dev/null | head -3 || echo "      Aucun fichier trouvé"
else
    echo "   ❌ Données manquantes !"
    exit 1
fi

echo ""
echo "✅ NETTOYAGE TERMINÉ"
echo "==================="
echo ""
echo "📊 ÉTAT ACTUEL :"
echo "   - Sites générés : 0"
echo "   - Template : ✅ Prêt"
echo "   - Données : ✅ Disponibles"
echo "   - Scripts : ✅ Disponibles"
echo ""
echo "🚀 PRÊT POUR LA RÉGÉNÉRATION"
echo ""
echo "📋 PROCHAINES ÉTAPES :"
echo "   1. Corriger le template (assets, composants)"
echo "   2. Tester sur un site pilote"
echo "   3. Générer tous les sites"
echo "   4. Déployer via CapRover"
echo ""
echo "💡 Commandes utiles :"
echo "   - Test template : node moverz-template/tests/run-all-tests.js"
echo "   - Génération : node moverz-template/scripts/generate-site-robust-fixed.js marseille"
echo "   - Validation : cd sites/marseille && npm run build"
echo ""
