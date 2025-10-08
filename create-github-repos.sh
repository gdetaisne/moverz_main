#!/bin/bash

echo "🚀 CRÉATION DES REPOS GITHUB"
echo "============================"
echo ""

# Liste des repos à créer
repos=(dd-lille dd-marseille dd-lyon dd-toulouse dd-nice dd-nantes dd-strasbourg dd-rennes dd-rouen)

echo "📋 REPOS À CRÉER :"
for repo in "${repos[@]}"; do
    echo "  - $repo"
done

echo ""
echo "🔑 Tu as besoin de :"
echo "  1. Token GitHub avec permissions 'repo'"
echo "  2. Nom d'utilisateur GitHub (gdetaisne)"
echo ""

read -p "Token GitHub: " GITHUB_TOKEN
read -p "Username GitHub [gdetaisne]: " GITHUB_USER
GITHUB_USER=${GITHUB_USER:-gdetaisne}

echo ""
echo "🚀 CRÉATION DES REPOS..."

for repo in "${repos[@]}"; do
    echo ""
    echo "📁 Création de $repo..."
    
    # Créer le repo GitHub
    curl -X POST \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/user/repos \
      -d '{
        "name": "'$repo'",
        "description": "Site de déménagement '${repo#dd-}'",
        "private": false,
        "auto_init": false
      }'
    
    if [ $? -eq 0 ]; then
        echo "✅ Repo $repo créé"
        
        # Initialiser le repo local
        cd "../temp-repos/$repo"
        git init
        git add .
        git commit -m "🎯 Initial commit - Site de déménagement ${repo#dd-}

- Site Next.js pour ${repo#dd-}
- Configuration CapRover
- Dockerfile et captain-definition
- Prêt pour déploiement !"
        
        # Ajouter le remote et push
        git branch -M main
        git remote add origin "https://github.com/$GITHUB_USER/$repo.git"
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Code pushé vers $repo"
        else
            echo "❌ Erreur lors du push vers $repo"
        fi
        
        cd "../../moverz_main"
    else
        echo "❌ Erreur lors de la création de $repo"
    fi
done

echo ""
echo "🎉 CRÉATION TERMINÉE !"
echo ""
echo "📋 CONFIGURATION CAPROVER :"
echo ""
for repo in "${repos[@]}"; do
    app_name="$repo"
    echo "  App: $app_name"
    echo "    Repository: $GITHUB_USER/$repo"
    echo "    Branch: main"
    echo "    Username: $GITHUB_USER"
    echo "    Password: [ton token GitHub]"
    echo ""
done
