#!/bin/bash

echo "🚀 PUSH MANUEL VERS GITHUB"
echo "=========================="
echo ""

echo "📋 REPOS À CRÉER MANUELLEMENT :"
echo ""
echo "1. Va sur GitHub.com"
echo "2. Clique sur 'New repository'"
echo "3. Crée ces 9 repos :"
echo ""

repos=(dd-lille dd-marseille dd-lyon dd-toulouse dd-nice dd-nantes dd-strasbourg dd-rennes dd-rouen)

for repo in "${repos[@]}"; do
    echo "  - $repo (public, sans README, sans .gitignore)"
done

echo ""
echo "4. Une fois créés, lance ce script :"
echo "   ./push-to-github-manual.sh push"
echo ""

if [ "$1" = "push" ]; then
    echo "🚀 PUSH VERS GITHUB..."
    echo ""
    
    for repo in "${repos[@]}"; do
        echo "📁 Push de $repo..."
        cd "../temp-repos/$repo"
        
        # Ajouter le remote (supposer qu'il existe)
        git remote add origin "https://github.com/gdetaisne/$repo.git" 2>/dev/null || true
        
        # Push
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ $repo pushé avec succès"
        else
            echo "❌ Erreur lors du push de $repo"
        fi
        
        cd "../../moverz_main"
        echo ""
    done
    
    echo "🎉 PUSH TERMINÉ !"
    echo ""
    echo "📋 CONFIGURATION CAPROVER :"
    echo ""
    for repo in "${repos[@]}"; do
        echo "  App: $repo"
        echo "    Repository: gdetaisne/$repo"
        echo "    Branch: main"
        echo "    Username: gdetaisne"
        echo "    Password: [ton token GitHub]"
        echo ""
    done
fi
