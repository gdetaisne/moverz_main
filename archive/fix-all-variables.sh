#!/bin/bash

echo "🔧 CORRECTION COMPLÈTE DES NOMS DE VARIABLES"
echo "============================================"
echo ""

# Aller dans le dossier dd-lille
cd ../temp-repos/dd-lille

# Trouver et corriger TOUS les fichiers avec des tirets dans les noms de variables
echo "📁 Recherche et correction de tous les fichiers..."

# Utiliser find pour trouver tous les fichiers .tsx et .ts
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  if grep -q "const.*-" "$file"; then
    echo "🔧 Correction de $file..."
    
    # Remplacer les patterns courants
    sed -i '' 's/const \([a-zA-Z]*\)-\([a-zA-Z]*\)/const \1\2/g' "$file"
    sed -i '' 's/const \([a-zA-Z]*\)-\([a-zA-Z]*\)-\([a-zA-Z]*\)/const \1\2\3/g' "$file"
    
    # Patterns spécifiques pour Lille
    sed -i '' 's/lille-vers-/lilleVers/g' "$file"
    sed -i '' 's/euralille-lille/euralilleLille/g' "$file"
    sed -i '' 's/fives-lille/fivesLille/g' "$file"
    sed -i '' 's/vauban-lille/vaubanLille/g' "$file"
    sed -i '' 's/vieux-lille/vieuxLille/g' "$file"
    sed -i '' 's/wazemmes-lille/wazemmesLille/g' "$file"
    
    echo "✅ $file corrigé"
  fi
done

echo ""
echo "🎉 CORRECTION TERMINÉE !"
