#!/bin/bash

# Script de duplication automatique des sites
# Basé sur le site Bordeaux de référence

echo "🚀 DUPLICATION AUTOMATIQUE DES SITES"
echo "===================================="
echo ""

# Liste des villes à créer
cities="lyon toulouse nice nantes strasbourg lille rennes rouen bordeaux"

# Site de référence
REFERENCE="bordeaux-reference"
SOURCE_DIR="sites/$REFERENCE"

echo "📋 Villes à créer : $cities"
echo "📁 Source : $SOURCE_DIR"
echo ""

# Vérifier que la source existe
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Erreur : Le dossier source $SOURCE_DIR n'existe pas"
    exit 1
fi

# Fonction pour obtenir la région d'une ville
get_region() {
    local city="$1"
    case "$city" in
        "lyon") echo "Auvergne-Rhône-Alpes" ;;
        "toulouse") echo "Occitanie" ;;
        "nice") echo "Provence-Alpes-Côte d'Azur" ;;
        "nantes") echo "Pays de la Loire" ;;
        "strasbourg") echo "Grand Est" ;;
        "lille") echo "Hauts-de-France" ;;
        "rennes") echo "Bretagne" ;;
        "rouen") echo "Normandie" ;;
        "bordeaux") echo "Nouvelle-Aquitaine" ;;
        *) echo "Région" ;;
    esac
}

# Fonction de duplication pour une ville
duplicate_city() {
    local city="$1"
    local region=$(get_region "$city")
    local target_dir="sites/$city"
    
    echo "🏗️ Création de $city ($region)..."
    
    # Supprimer l'ancien dossier s'il existe
    if [ -d "$target_dir" ]; then
        rm -rf "$target_dir"
        echo "   🗑️ Ancien dossier supprimé"
    fi
    
    # Copier depuis la référence
    cp -r "$SOURCE_DIR" "$target_dir"
    echo "   📋 Copie terminée"
    
    # Nettoyer les fichiers Git
    rm -rf "$target_dir/.git"
    echo "   🧹 Fichiers Git nettoyés"
    
    # Adapter les références dans tous les fichiers
    echo "   🔄 Adaptation des références..."
    
    # Remplacement global des noms
    find "$target_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -exec sed -i '' "s/Bordeaux/$city/g" {} \;
    find "$target_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -exec sed -i '' "s/bordeaux/$city/g" {} \;
    find "$target_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -exec sed -i '' "s/BORDEAUX/$(echo $city | tr '[:lower:]' '[:upper:]')/g" {} \;
    
    # Remplacement des domaines
    find "$target_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -exec sed -i '' "s/bordeaux-demenageur\.fr/devis-demenageur-$city\.fr/g" {} \;
    
    # Remplacement des régions
    find "$target_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -exec sed -i '' "s/Nouvelle-Aquitaine/$region/g" {} \;
    find "$target_dir" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" \) -exec sed -i '' "s/Aquitaine/$region/g" {} \;
    
    # Renommer les dossiers de pages
    if [ -d "$target_dir/app/bordeaux" ]; then
        mv "$target_dir/app/bordeaux" "$target_dir/app/$city"
        echo "   📁 Dossier pages renommé"
    fi
    
    if [ -d "$target_dir/app/quartiers-bordeaux" ]; then
        mv "$target_dir/app/quartiers-bordeaux" "$target_dir/app/quartiers-$city"
        echo "   📁 Dossier quartiers renommé"
    fi
    
    # Renommer les pages de destinations
    for dir in "$target_dir/app"/bordeaux-vers-*; do
        if [ -d "$dir" ]; then
            new_name=$(basename "$dir" | sed "s/bordeaux-vers-/$city-vers-/")
            mv "$dir" "$target_dir/app/$new_name"
            echo "   📁 $dir → $new_name"
        fi
    done
    
    echo "   ✅ $city créé avec succès"
    echo ""
}

# Créer tous les sites
for city in $cities; do
    duplicate_city "$city"
done

echo "🎉 DUPLICATION TERMINÉE !"
echo "========================"
echo ""
echo "📊 Sites créés :"
ls -la sites/ | grep -v bordeaux-reference
echo ""
echo "🧪 Pour tester un site :"
echo "   cd sites/[ville] && npm install && npm run build"
echo ""
echo "🚀 Pour lancer un serveur :"
echo "   cd sites/[ville] && PORT=400[1-9] npm run dev"
