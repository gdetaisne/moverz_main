#!/bin/bash

# Script pour vérifier les articles satellites non indexés par Google
# Date: 29 Octobre 2025

CITIES=(marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier)

echo "🔍 VÉRIFICATION ARTICLES SATELLITES NON INDEXÉS"
echo "================================================"
echo ""

for CITY in "${CITIES[@]}"; do
  echo "🏙️  $CITY"
  echo "────────────────────────────────────────"
  
  SATELLITES_DIR="sites/$CITY/content/blog/satellites"
  
  if [ ! -d "$SATELLITES_DIR" ]; then
    echo "   ⚠️  Dossier satellites non trouvé"
    echo ""
    continue
  fi
  
  # Compter les articles satellites
  TOTAL=$(find "$SATELLITES_DIR" -name "*.md" -not -name "PILIER*" | wc -l | xargs)
  echo "   📝 Articles satellites: $TOTAL"
  
  # Liste des articles
  echo "   📄 Articles:"
  find "$SATELLITES_DIR" -name "*.md" -not -name "PILIER*" -exec basename {} .md \; | sort | sed 's/^/      - /'
  
  echo ""
done

echo "📊 RÉSUMÉ"
echo "────────────────────────────────────────"
echo ""
echo "💡 Prochaines étapes pour améliorer l'indexation:"
echo ""
echo "1. Vérifier que chaque article a:"
echo "   - title, description, date dans le frontmatter"
echo "   - Minimum 300 mots de contenu"
echo "   - Liens internes vers d'autres articles"
echo ""
echo "2. Soumettre le sitemap à Google Search Console"
echo ""
echo "3. Créer des liens internes depuis les articles piliers"
echo "   vers les satellites"
echo ""

