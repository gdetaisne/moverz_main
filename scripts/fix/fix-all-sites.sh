#!/bin/bash

# Script pour appliquer toutes les corrections à tous les sites
# Basé sur les corrections validées sur Lyon

echo "🔧 APPLICATION DES CORRECTIONS À TOUS LES SITES"
echo "============================================="
echo ""

# Fonction pour obtenir les quartiers d'une ville
get_quartiers() {
    local city="$1"
    case "$city" in
        "bordeaux") echo "bastide cauderan chartrons merignac pessac" ;;
        "lille") echo "vieux-lille euralille centre-ville saint-sauveur waizemmes" ;;
        "marseille") echo "vieux-port panier cours-julien canebiere plaine" ;;
        "nantes") echo "centre-ville ile-nantes chantenay malakoff breil" ;;
        "nice") echo "vieux-nice promenade-anglais carre-d-or garibaldi port" ;;
        "rennes") echo "centre-ville thabor saint-anne cleunay villejean" ;;
        "rouen") echo "centre-ville saint-marc coteaux-sud saint-sever joli-mai" ;;
        "strasbourg") echo "centre-ville petite-france neudorf cronenbourg neuhof" ;;
        "toulouse") echo "centre-ville capitole saint-aubin saint-cyprien ramonville" ;;
        *) echo "quartier1 quartier2 quartier3 quartier4 quartier5" ;;
    esac
}

# Fonction pour corriger un site
fix_site() {
    local city="$1"
    local quartiers="$2"
    local site_dir="sites/$city"
    
    echo "🔧 Correction de $city..."
    
    # Vérifier que le site existe
    if [ ! -d "$site_dir" ]; then
        echo "   ❌ Site $city non trouvé"
        return 1
    fi
    
    cd "$site_dir" || return 1
    
    # 1. Corriger les services
    echo "   📋 1. Correction des services..."
    if [ -d "app/services" ]; then
        cd app/services
        for service in demenagement-economique-bordeaux demenagement-premium-bordeaux demenagement-standard-bordeaux; do
            if [ -d "$service" ]; then
                new_name=$(echo "$service" | sed "s/bordeaux/$city/g")
                mv "$service" "$new_name"
                echo "     ✅ $service → $new_name"
            fi
        done
        cd ../..
    fi
    
    # 2. Corriger les quartiers
    echo "   📋 2. Correction des quartiers..."
    if [ -d "app/$city" ]; then
        cd "app/$city"
        
        # Quartiers actuels de Bordeaux
        bordeaux_quartiers=("bastide" "cauderan" "chartrons" "merignac" "pessac")
        
        # Renommer les dossiers
        i=0
        for bordeaux_quartier in "${bordeaux_quartiers[@]}"; do
            if [ -d "$bordeaux_quartier" ]; then
                # Prendre le quartier correspondant de la ville
                new_quartier=$(echo "$quartiers" | cut -d' ' -f$((i+1)))
                if [ -n "$new_quartier" ]; then
                    mv "$bordeaux_quartier" "$new_quartier"
                    echo "     ✅ $bordeaux_quartier → $new_quartier"
                fi
            fi
            ((i++))
        done
        cd ../..
    fi
    
    # 3. Corriger les références dans les fichiers
    echo "   📋 3. Correction des références..."
    
    # Services
    if [ -d "app/services" ]; then
        find app/services -name "*.tsx" -exec sed -i '' "s/bordeaux/$city/g" {} \;
        echo "     ✅ Services : bordeaux → $city"
    fi
    
    # Quartiers
    if [ -d "app/$city" ]; then
        # Remplacer les anciens noms de quartiers par les nouveaux
        find "app/$city" -name "*.tsx" -exec sed -i '' "s/bastide/$(echo "$quartiers" | cut -d' ' -f1)/g" {} \;
        find "app/$city" -name "*.tsx" -exec sed -i '' "s/cauderan/$(echo "$quartiers" | cut -d' ' -f2)/g" {} \;
        find "app/$city" -name "*.tsx" -exec sed -i '' "s/chartrons/$(echo "$quartiers" | cut -d' ' -f3)/g" {} \;
        find "app/$city" -name "*.tsx" -exec sed -i '' "s/merignac/$(echo "$quartiers" | cut -d' ' -f4)/g" {} \;
        find "app/$city" -name "*.tsx" -exec sed -i '' "s/pessac/$(echo "$quartiers" | cut -d' ' -f5)/g" {} \;
        echo "     ✅ Quartiers : références mises à jour"
    fi
    
    # 4. Corriger les noms de variables avec tirets
    echo "   📋 4. Correction des variables..."
    
    # Lister tous les quartiers et corriger leurs variables
    if [ -d "app/$city" ]; then
        for quartier_dir in "app/$city"/*; do
            if [ -d "$quartier_dir" ]; then
                quartier_name=$(basename "$quartier_dir")
                # Convertir le nom en camelCase pour la variable
                var_name=$(echo "$quartier_name" | sed 's/-\([a-z]\)/\U\1/g')
                # Remplacer dans les fichiers
                find "$quartier_dir" -name "*.tsx" -exec sed -i '' "s/${quartier_name}Data/${var_name}Data/g" {} \;
            fi
        done
        echo "     ✅ Variables : tirets → camelCase"
    fi
    
    # 5. Test de build
    echo "   📋 5. Test de build..."
    if npm run build > /dev/null 2>&1; then
        echo "     ✅ Build réussi"
    else
        echo "     ❌ Erreur de build"
        return 1
    fi
    
    echo "   ✅ $city corrigé avec succès"
    echo ""
    
    cd - > /dev/null
}

# Liste des villes à corriger
cities="bordeaux lille marseille nantes nice rennes rouen strasbourg toulouse"

# Appliquer les corrections à tous les sites
for city in $cities; do
    quartiers=$(get_quartiers "$city")
    fix_site "$city" "$quartiers"
done

echo "🎉 TOUTES LES CORRECTIONS APPLIQUÉES !"
echo "====================================="
echo ""
echo "📊 Sites corrigés :"
ls sites/ | grep -v bordeaux-reference
echo ""
echo "🧪 Pour tester un site :"
echo "   cd sites/[ville] && PORT=400[1-9] npm run dev"
