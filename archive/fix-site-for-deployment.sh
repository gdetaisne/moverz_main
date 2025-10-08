#!/bin/bash

# Script de correction universel pour préparer un site au déploiement
# Usage: ./fix-site-for-deployment.sh <chemin_du_site> <nom_ville>

SITE_DIR="$1"
CITY_NAME="$2"

if [ -z "$SITE_DIR" ] || [ -z "$CITY_NAME" ]; then
    echo "❌ Usage: ./fix-site-for-deployment.sh <chemin_du_site> <nom_ville>"
    echo "   Exemple: ./fix-site-for-deployment.sh ../temp-repos/dd-lille Lille"
    exit 1
fi

if [ ! -d "$SITE_DIR" ]; then
    echo "❌ Le répertoire $SITE_DIR n'existe pas."
    exit 1
fi

cd "$SITE_DIR" || exit 1

echo "🔧 CORRECTION DU SITE POUR $CITY_NAME"
echo "=========================================="

# 1. Remplacer toutes les variables Handlebars
echo "1️⃣ Remplacement des variables Handlebars..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) | while read file; do
  if grep -q "{{.*city_name.*}}" "$file"; then
    sed -i '' "s/{{{city_name}}}/$CITY_NAME/g" "$file"
    sed -i '' "s/{{city_name}}/$CITY_NAME/g" "$file"
    echo "   ✅ $file"
  fi
done

# 2. Corriger les noms de fonctions avec tirets
echo ""
echo "2️⃣ Correction des noms de fonctions avec tirets..."
find src/app -type f -name "*.tsx" | while read file; do
  if grep -q "export default function.*-.*Page" "$file"; then
    # Extraire le nom de la fonction et le corriger
    sed -i '' -E 's/export default function ([a-zA-Z]+)-([a-zA-Z]+)Page\(\)/export default function \1\2Page()/g' "$file"
    echo "   ✅ $file"
  fi
done

# 3. Corriger les noms de variables avec tirets
echo ""
echo "3️⃣ Correction des noms de variables avec tirets..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) | while read file; do
  if grep -q "const.*-.*Data" "$file"; then
    sed -i '' -E 's/const ([a-zA-Z]+)-([a-zA-Z]+)Data/const \1\2Data/g' "$file"
    echo "   ✅ $file"
  fi
done

# 4. Créer HeaderTemplate.tsx si manquant
echo ""
echo "4️⃣ Vérification de HeaderTemplate.tsx..."
if [ ! -f "src/components/HeaderTemplate.tsx" ]; then
    cat > src/components/HeaderTemplate.tsx << 'EOF'
// src/components/HeaderTemplate.tsx
// Placeholder - Le Header est géré par RootLayout
import React from 'react';

const HeaderTemplate: React.FC = () => {
  return null;
};

export default HeaderTemplate;
EOF
    echo "   ✅ HeaderTemplate.tsx créé"
else
    echo "   ✅ HeaderTemplate.tsx existe déjà"
fi

# 5. Créer content/blog si manquant
echo ""
echo "5️⃣ Vérification du dossier content/blog..."
if [ ! -d "content/blog" ]; then
    mkdir -p content/blog
    cat > content/blog/README.md << 'EOF'
# Blog Content

Les articles de blog seront ajoutés ici ultérieurement.
EOF
    echo "   ✅ content/blog créé"
else
    echo "   ✅ content/blog existe déjà"
fi

# 6. Vérifier/Corriger le Dockerfile
echo ""
echo "6️⃣ Vérification du Dockerfile..."
if grep -q "npm ci --only=production" Dockerfile; then
    sed -i '' 's/npm ci --only=production/npm ci/g' Dockerfile
    echo "   ✅ Dockerfile corrigé (npm ci)"
else
    echo "   ✅ Dockerfile OK"
fi

# 7. Créer .gitignore si manquant
echo ""
echo "7️⃣ Vérification du .gitignore..."
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
node_modules/
.next/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.tsbuildinfo
EOF
    echo "   ✅ .gitignore créé"
else
    echo "   ✅ .gitignore existe déjà"
fi

echo ""
echo "🎉 CORRECTIONS TERMINÉES !"
echo ""
echo "📋 Prochaines étapes :"
echo "   1. cd $SITE_DIR"
echo "   2. npm install"
echo "   3. npm run build (pour tester)"
echo "   4. git add ."
echo "   5. git commit -m \"🔧 Corrections pour déploiement\""
echo "   6. git push origin main"

