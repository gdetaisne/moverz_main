#!/bin/bash

# Script pour préparer les sites pour Google Search Console
# Usage: ./setup-search-console.sh

echo "🔍 PRÉPARATION GOOGLE SEARCH CONSOLE"
echo "======================================"
echo ""

# Liste des villes/sites
SITES=(
    "marseille"
    "lyon"
    "lille"
    "toulouse"
    "bordeaux"
    "nantes"
    "nice"
    "rennes"
    "rouen"
    "strasbourg"
)

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "Sites à configurer :"
for site in "${SITES[@]}"; do
    echo "  - $site"
done
echo ""

echo "📋 ÉTAPES À SUIVRE :"
echo ""
echo "1️⃣  VÉRIFICATION PAR DNS (Recommandé si domaine unique)"
echo "   → Ajoutez UNE SEULE fois dans votre DNS"
echo "   → Tous les sous-domaines seront vérifiés automatiquement"
echo ""
echo "2️⃣  VÉRIFICATION PAR FICHIER HTML (Si domaines multiples)"
echo "   → Pour chaque site, téléchargez le fichier HTML de Google"
echo "   → Placez-le dans : sites/[ville]/public/"
echo "   → Exemple : sites/marseille/public/google123abc.html"
echo ""
echo "3️⃣  VÉRIFICATION PAR BALISE META (Alternative)"
echo "   → Ajoutez la balise <meta> dans sites/[ville]/app/layout.tsx"
echo "   → Section <head>"
echo ""

echo "💡 MÉTHODE RECOMMANDÉE : DNS"
echo "   Gain de temps énorme si vous avez un domaine principal"
echo ""

read -p "Voulez-vous créer les dossiers publics manquants ? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    for site in "${SITES[@]}"; do
        if [ ! -d "sites/$site/public" ]; then
            mkdir -p "sites/$site/public"
            echo "${GREEN}✅ Créé : sites/$site/public${NC}"
        else
            echo "${BLUE}ℹ️  Existe déjà : sites/$site/public${NC}"
        fi
    done
fi

echo ""
echo "✅ PRÉPARATION TERMINÉE"
echo ""
echo "🔗 PROCHAINES ÉTAPES :"
echo "   1. Allez sur https://search.google.com/search-console"
echo "   2. Ajoutez votre propriété (Domaine ou Préfixe URL)"
echo "   3. Suivez les instructions de vérification"
echo "   4. Répétez pour chaque site si nécessaire"
echo ""
echo "📊 Une fois vérifiés :"
echo "   - Soumettez les sitemaps : /sitemap.xml"
echo "   - Configurez les paramètres régionaux"
echo "   - Demandez l'indexation des pages principales"
echo ""

