#!/bin/bash

echo "🔧 CORRECTION DES NOMS DE VARIABLES AVEC TIRETS"
echo "=============================================="
echo ""

# Aller dans le dossier dd-lille
cd ../temp-repos/dd-lille

# Trouver tous les fichiers avec des variables contenant des tirets
echo "📁 Recherche des fichiers avec des variables invalides..."

# Corriger les fichiers de destinations
files=(
  "src/app/lille-vers-bruxelles/page.tsx"
  "src/app/lille-vers-lyon/page.tsx"
  "src/app/lille-vers-marseille/page.tsx"
  "src/app/lille-vers-paris/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "🔧 Correction de $file..."
    
    # Remplacer les noms de variables avec tirets par des underscores
    sed -i '' 's/const lille-vers-/const lilleVers/g' "$file"
    sed -i '' 's/lille-vers-/lilleVers/g' "$file"
    
    echo "✅ $file corrigé"
  else
    echo "❌ $file non trouvé"
  fi
done

echo ""
echo "🎉 CORRECTION TERMINÉE !"
echo ""
echo "📋 Test du build..."
npm run build
