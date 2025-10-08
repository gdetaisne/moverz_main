#!/bin/bash

# Script de déploiement complet de tous les sites
# Usage: ./deploy-all-sites.sh

set -e

echo "🚀 DÉPLOIEMENT COMPLET DE TOUS LES SITES"
echo "========================================"
echo ""

# Configuration
GITHUB_TOKEN="${GITHUB_TOKEN}"
GITHUB_USERNAME="gdetaisne"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ Erreur: GITHUB_TOKEN non défini"
  echo "Définissez-le avec: export GITHUB_TOKEN='votre_token'"
  exit 1
fi

# Fonction pour créer un repo GitHub s'il n'existe pas
create_github_repo() {
  local repo_name=$1
  echo "📦 Vérification du repo GitHub: $repo_name"
  
  # Vérifier si le repo existe
  if curl -s -H "Authorization: token $GITHUB_TOKEN" \
       "https://api.github.com/repos/$GITHUB_USERNAME/$repo_name" | grep -q '"id"'; then
    echo "✅ Le repo $repo_name existe déjà"
  else
    echo "🆕 Création du repo $repo_name..."
    curl -s -H "Authorization: token $GITHUB_TOKEN" \
         -d "{\"name\":\"$repo_name\",\"private\":false,\"auto_init\":false}" \
         https://api.github.com/user/repos > /dev/null
    echo "✅ Repo $repo_name créé"
    echo "⏳ Attente de la disponibilité du repo (5s)..."
    sleep 5
  fi
}

# Fonction pour déployer un site
deploy_site() {
  local city=$1
  local repo_name=$2
  local site_dir="sites/$city"
  
  echo ""
  echo "🏗️  DÉPLOIEMENT: $city -> $repo_name"
  echo "========================================="
  
  # Vérifier que le site existe
  if [ ! -d "$site_dir" ]; then
    echo "❌ Erreur: Le site $site_dir n'existe pas"
    return 1
  fi
  
  # Créer le repo GitHub
  create_github_repo "$repo_name"
  
  # Aller dans le répertoire du site
  cd "$site_dir"
  
  # Initialiser Git si nécessaire
  if [ ! -d ".git" ]; then
    echo "🔧 Initialisation du dépôt Git..."
    git init
    git add .
    git commit -m "Initial commit - Site $city"
  else
    echo "🔧 Dépôt Git existant, ajout des modifications..."
    git add .
    if git diff --cached --quiet; then
      echo "ℹ️  Aucune modification à commiter"
    else
      git commit -m "Update site $city - $(date +%Y-%m-%d)" || echo "ℹ️  Rien à commiter"
    fi
  fi
  
  # Ajouter le remote GitHub
  if git remote | grep -q "^origin$"; then
    echo "🔧 Remote origin existant, mise à jour..."
    git remote set-url origin "https://github.com/$GITHUB_USERNAME/$repo_name.git"
  else
    echo "🔧 Ajout du remote origin..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/$repo_name.git"
  fi
  
  # Configurer le credential helper pour utiliser le token
  git config credential.helper store
  echo "https://$GITHUB_TOKEN:x-oauth-basic@github.com" > ~/.git-credentials
  
  # Pousser vers GitHub
  echo "📤 Push vers GitHub..."
  git push -u origin main --force 2>&1 | grep -v "Password" || true
  
  echo "✅ $city déployé sur GitHub"
  
  # Retour au répertoire principal
  cd ../..
}

# Liste des sites à déployer (format: city:repo_name)
SITES=(
  "strasbourg:dd-strasbourg"
  "rouen:dd-rouen"
  "lyon:dd-lyon"
  "marseille:dd-marseille"
  "toulouse:dd-toulouse"
  "nice:dd-nice"
  "nantes:dd-nantes"
  "lille:dd-lille"
  "rennes:dd-rennes"
)

# Déployer tous les sites
echo "📋 Sites à déployer: ${#SITES[@]}"
echo ""

for site_info in "${SITES[@]}"; do
  city="${site_info%%:*}"
  repo_name="${site_info##*:}"
  deploy_site "$city" "$repo_name"
  sleep 2  # Pause pour éviter de surcharger l'API GitHub
done

echo ""
echo "🎉 DÉPLOIEMENT TERMINÉ !"
echo "======================"
echo ""
echo "📊 Résumé:"
echo "  • ${#SITES[@]} sites déployés sur GitHub"
echo ""
echo "🌐 Prochaines étapes:"
echo "  1. Vérifier les repos sur GitHub"
echo "  2. CapRover va automatiquement déployer via les webhooks"
echo "  3. Attendre 2-3 minutes pour chaque build"
echo "  4. Vérifier les sites en ligne"
echo ""
echo "🔗 Repos GitHub:"
for site_info in "${SITES[@]}"; do
  repo_name="${site_info##*:}"
  echo "  • https://github.com/$GITHUB_USERNAME/$repo_name"
done
