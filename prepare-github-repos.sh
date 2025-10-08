#!/bin/bash

# Script de préparation des repos GitHub pour déploiement
# Usage: ./prepare-github-repos.sh

echo "🔧 PRÉPARATION DES REPOS GITHUB"
echo "================================"
echo ""

# Définir les sites et domaines
declare -A sites=(
  ["bordeaux"]="bordeaux-demenageur.fr"
  ["marseille"]="devis-demenageur-marseille.fr"
  ["lyon"]="devis-demenageur-lyon.fr"
  ["toulouse"]="devis-demenageur-toulousain.fr"
  ["nice"]="devis-demenageur-nice.fr"
  ["nantes"]="devis-demenageur-nantes.fr"
  ["strasbourg"]="devis-demenageur-strasbourg.fr"
  ["lille"]="devis-demenageur-lille.fr"
  ["rennes"]="devis-demenageur-rennes.fr"
  ["rouen"]="devis-demenageur-rouen.fr"
)

BASE_DIR="/Users/guillaumestehelin/moverz_main/sites"

# Vérifier que GitHub CLI est installé
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) n'est pas installé"
    echo ""
    echo "📥 Installation :"
    echo "   brew install gh"
    echo ""
    echo "Ou utilise l'interface web GitHub pour créer les repos manuellement"
    exit 1
fi

# Se connecter à GitHub
echo "🔐 Connexion à GitHub..."
gh auth status || gh auth login

echo ""
echo "📋 ÉTAPE 1 : CRÉER .gitignore DANS CHAQUE SITE"
echo "==============================================="

for site in "${!sites[@]}"; do
  echo "  → $site..."
  
  cat > "$BASE_DIR/$site/.gitignore" << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
.vercel
.netlify

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env.production

# Vercel
.vercel

# Logs
/tmp/*.log
*.log

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
EOF
  
done

echo "✅ .gitignore créés"
echo ""
echo "📋 ÉTAPE 2 : INITIALISER GIT DANS CHAQUE SITE"
echo "=============================================="

for site in "${!sites[@]}"; do
  cd "$BASE_DIR/$site"
  
  if [ ! -d ".git" ]; then
    echo "  → Initialisation git pour $site..."
    git init
    git add .
    git commit -m "🎉 Initial commit - Site $site

- Site Next.js généré depuis moverz-template
- Domaine: ${sites[$site]}
- Date: $(date +%Y-%m-%d)
"
    echo "✅ Git initialisé pour $site"
  else
    echo "⏭️  Git déjà initialisé pour $site"
  fi
done

echo ""
echo "📋 ÉTAPE 3 : OPTIONS POUR CRÉER LES REPOS GITHUB"
echo "================================================"
echo ""
echo "🤔 Veux-tu :"
echo ""
echo "  1) Créer les repos GitHub AUTOMATIQUEMENT (via gh CLI)"
echo "  2) Obtenir les commandes pour créer les repos MANUELLEMENT"
echo ""
read -p "Choix (1 ou 2) : " choice

if [ "$choice" = "1" ]; then
  echo ""
  echo "🚀 Création automatique des repos GitHub..."
  echo ""
  
  for site in "${!sites[@]}"; do
    cd "$BASE_DIR/$site"
    domain="${sites[$site]}"
    
    echo "📦 Création du repo pour $site ($domain)..."
    
    # Créer le repo GitHub
    gh repo create "moverz-$site" \
      --public \
      --description "Site de déménagement pour $site - $domain" \
      --source=. \
      --remote=origin \
      --push
    
    if [ $? -eq 0 ]; then
      echo "✅ Repo créé : https://github.com/$(gh api user -q .login)/moverz-$site"
    else
      echo "❌ Erreur pour $site"
    fi
    
    echo ""
  done
  
  echo "🎉 REPOS CRÉÉS !"
  
else
  echo ""
  echo "📝 COMMANDES À EXÉCUTER MANUELLEMENT"
  echo "===================================="
  echo ""
  echo "Option A : Via GitHub CLI (recommandé)"
  echo "--------------------------------------"
  echo ""
  
  for site in "${!sites[@]}"; do
    domain="${sites[$site]}"
    echo "# $site ($domain)"
    echo "cd $BASE_DIR/$site"
    echo "gh repo create moverz-$site --public --description \"Site de déménagement pour $site - $domain\" --source=. --remote=origin --push"
    echo ""
  done
  
  echo ""
  echo "Option B : Via Interface Web GitHub"
  echo "-----------------------------------"
  echo ""
  echo "1. Aller sur https://github.com/new"
  echo "2. Pour chaque site :"
  echo ""
  
  for site in "${!sites[@]}"; do
    domain="${sites[$site]}"
    echo "   • Nom du repo: moverz-$site"
    echo "     Description: Site de déménagement pour $site - $domain"
    echo "     Public"
    echo "     Puis :"
    echo "       cd $BASE_DIR/$site"
    echo "       git remote add origin https://github.com/VOTRE-USERNAME/moverz-$site.git"
    echo "       git push -u origin main"
    echo ""
  done
fi

echo ""
echo "📊 RÉSUMÉ"
echo "========="
echo ""
echo "✅ .gitignore créés dans tous les sites"
echo "✅ Git initialisé dans tous les sites"
echo ""

if [ "$choice" = "1" ]; then
  echo "✅ Repos GitHub créés"
  echo ""
  echo "🚀 PROCHAINE ÉTAPE : Déploiement sur Vercel"
  echo ""
  echo "1. Aller sur https://vercel.com"
  echo "2. Connecter avec GitHub"
  echo "3. Import chaque repo moverz-*"
  echo "4. Configurer les domaines"
else
  echo "⏳ Repos GitHub à créer (voir commandes ci-dessus)"
  echo ""
  echo "Après avoir créé les repos :"
  echo "  → Relancer ce script avec option 1"
  echo "  → Ou suivre les commandes manuelles"
fi

echo ""
echo "📖 Voir GUIDE_DEPLOIEMENT.md pour la suite"
echo ""


