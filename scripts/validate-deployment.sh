#!/bin/bash

# Script de validation des déploiements
# Usage: ./validate-deployment.sh <site> <url>

if [ $# -ne 2 ]; then
  echo "Usage: ./validate-deployment.sh <site> <url>"
  echo "Exemple: ./validate-deployment.sh strasbourg https://devis-demenageur-strasbourg.fr"
  exit 1
fi

SITE=$1
URL=$2

echo "🔍 VALIDATION DU DÉPLOIEMENT: $SITE"
echo "================================"
echo ""

# Vérifier que le captain-definition n'existe pas à la racine (pollution)
if [ -f "captain-definition" ]; then
  echo "❌ ERREUR: captain-definition trouvé à la racine (pollution détectée)"
  echo "   Contenu:"
  cat captain-definition
  exit 1
fi

echo "✅ Pas de pollution captain-definition à la racine"

# Vérifier la page d'accueil
echo "🌐 Test de la page d'accueil..."
if curl -s -o /dev/null -w "%{http_code}" "$URL" | grep -q "200"; then
  echo "✅ Page d'accueil accessible (200)"
else
  echo "❌ Page d'accueil inaccessible"
  exit 1
fi

# Vérifier que le contenu correspond au bon site
echo "🔍 Vérification du contenu..."
CONTENT_CHECK=$(curl -s "$URL" | grep -i "$SITE" | head -1)
if [ -n "$CONTENT_CHECK" ]; then
  echo "✅ Contenu correspondant au site $SITE trouvé"
else
  echo "❌ Contenu ne correspond pas au site $SITE"
  echo "   Recherché: $SITE"
  echo "   Contenu trouvé: $(curl -s "$URL" | grep -i "demenageur" | head -1)"
  exit 1
fi

# Vérifier le blog
echo "📚 Test de la page blog..."
BLOG_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/blog")
if [ "$BLOG_STATUS" = "200" ]; then
  echo "✅ Page blog accessible (200)"
else
  echo "❌ Page blog inaccessible ($BLOG_STATUS)"
  echo "   Ceci peut indiquer des erreurs Server Components"
  exit 1
fi

echo ""
echo "🎉 VALIDATION RÉUSSIE !"
echo "   Site: $SITE"
echo "   URL: $URL"
echo "   Tous les tests sont passés"
