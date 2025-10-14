#!/bin/bash

# Script pour appliquer toutes les corrections sur tous les sites

set -e

echo "🔧 CORRECTION COMPLÈTE DE TOUS LES SITES"
echo "========================================="
echo ""

SITES=(
  "bordeaux"
  "lille"
  "lyon"
  "marseille"
  "montpellier"
  "nantes"
  "nice"
  "rennes"
  "rouen"
  "strasbourg"
  "toulouse"
)

for site in "${SITES[@]}"; do
  echo "📦 Correction du site: $site"

  # 1. Appliquer le layout 2 colonnes inventaire IA (copier depuis Lille)
  echo "   - Layout 2 colonnes inventaire IA"
  cp sites/lille/app/inventaire-ia/page.tsx sites/$site/app/inventaire-ia/page.tsx
  # Adapter les liens pour chaque ville
  sed -i '' "s|/devis-demenagement-lille/|/devis-demenagement-$site/|g" sites/$site/app/inventaire-ia/page.tsx

  # 2. Corriger le Dockerfile pour copie sélective
  echo "   - Dockerfile copie sélective"
  sed -i '' 's|COPY sites/.*/. .|COPY sites/'$site'/app ./app\
COPY sites/'$site'/components ./components\
COPY sites/'$site'/lib ./lib\
COPY sites/'$site'/public ./public\
COPY sites/'$site'/content ./content\
COPY sites/'$site'/scripts ./scripts\
COPY sites/'$site'/package.json ./package.json\
COPY sites/'$site'/tsconfig.json ./tsconfig.json\
COPY sites/'$site'/next.config.mjs ./next.config.mjs\
COPY sites/'$site'/next-sitemap.config.js ./next-sitemap.config.js\
COPY sites/'$site'/postcss.config.cjs ./postcss.config.cjs\
COPY sites/'$site'/middleware.js ./middleware.js\
COPY sites/'$site'/tailwind.config.ts ./tailwind.config.ts\
COPY sites/'$site'/components.json ./components.json\
COPY sites/'$site'/next-env.d.ts ./next-env.d.ts|' sites/$site/Dockerfile

  # 3. Ajouter cache buster unique
  echo "   - Cache buster unique"
  sed -i '' "s|RUN echo \"FORCE REBUILD.*\"|RUN echo \"FORCE REBUILD $site COMPLETE-\$(date +%s)\"|" sites/$site/Dockerfile

  # 4. Corriger les erreurs de syntaxe dans LocalPage.tsx
  echo "   - Correction syntaxe LocalPage.tsx"
  # Ajouter point-virgule manquant après return
  sed -i '' 's|    description: `.*`,$|    description: `.*`,\
  };|' sites/$site/app/_templates/LocalPage.tsx
  sed -i '' 's|^  }$|  };|' sites/$site/app/_templates/LocalPage.tsx

  # 5. Corriger les problèmes YAML dans les frontmatters Markdown
  echo "   - Correction YAML frontmatters"
  find sites/$site/content/blog -name "*.md" -type f -exec sed -i '' 's/\\:/:/g' {} +
  find sites/$site/content/blog -name "*.md" -type f -exec sed -i '' 's/\\"$/"/g' {} +

  echo "   ✅ $site corrigé"
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ TOUS LES SITES ONT ÉTÉ CORRIGÉS !"
echo ""
echo "📋 Corrections appliquées:"
echo "   • Layout 2 colonnes inventaire IA"
echo "   • Dockerfile copie sélective"
echo "   • Cache buster unique par site"
echo "   • Correction syntaxe LocalPage.tsx"
echo "   • Correction YAML frontmatters"
echo ""
echo "🚀 Prêt pour commit et push !"
