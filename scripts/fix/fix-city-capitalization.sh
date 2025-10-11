#!/bin/bash

echo "🔧 CORRECTION DE LA CAPITALISATION DES NOMS DE VILLES"
echo "===================================================="
echo ""

# Fonction pour corriger la capitalisation d'un site
fix_capitalization() {
    local city=$1
    local city_capitalized=$2
    local site_dir="sites/$city"
    
    echo "🔧 Correction de la capitalisation pour $city_capitalized..."
    
    if [ ! -d "$site_dir" ]; then
        echo "❌ Dossier $site_dir non trouvé"
        return 1
    fi
    
    cd "$site_dir" || return 1
    
    # 1. Corriger le Header (destinations fréquentes et zones de départ)
    if [ -f "components/Header.tsx" ]; then
        echo "  📝 Correction du Header..."
        
        # Corriger les destinations fréquentes
        sed -i '' "s/$city → Paris/$city_capitalized → Paris/g" components/Header.tsx
        sed -i '' "s/$city → Lyon/$city_capitalized → Lyon/g" components/Header.tsx
        sed -i '' "s/$city → Toulouse/$city_capitalized → Toulouse/g" components/Header.tsx
        
        # Corriger les zones de départ (label dans zonesItems)
        sed -i '' "s/label: '$city'/label: '$city_capitalized'/g" components/Header.tsx
        
        # Corriger le titre du site dans le header
        sed -i '' "s/Déménageurs $city (IA)/Déménageurs $city_capitalized (IA)/g" components/Header.tsx
    fi
    
    # 2. Corriger la page quartiers
    if [ -f "app/quartiers-$city/page.tsx" ]; then
        echo "  📝 Correction de la page quartiers..."
        
        # Corriger le titre et la description
        sed -i '' "s/Déménagement à $city/Déménagement à $city_capitalized/g" "app/quartiers-$city/page.tsx"
        sed -i '' "s/à $city :/à $city_capitalized :/g" "app/quartiers-$city/page.tsx"
        sed -i '' "s/($city)/($city_capitalized)/g" "app/quartiers-$city/page.tsx"
    fi
    
    # 3. Corriger NeighborhoodsData.ts (urlForQuartier)
    if [ -f "components/NeighborhoodsData.ts" ]; then
        echo "  📝 Correction de NeighborhoodsData.ts..."
        
        # Corriger l'URL pour inclure le nom capitalisé
        sed -i '' "s/\/devis-demenagement-$city-/\/devis-demenagement-$city_capitalized-/g" components/NeighborhoodsData.ts
    fi
    
    # 4. Corriger la page principale de la ville
    if [ -f "app/$city/page.tsx" ]; then
        echo "  📝 Correction de la page principale..."
        
        # Corriger les références dans les métadonnées et le contenu
        sed -i '' "s/$city/$city_capitalized/g" "app/$city/page.tsx"
    fi
    
    # 5. Corriger toutes les pages de quartiers individuelles
    if [ -d "app/$city" ]; then
        echo "  📝 Correction des pages de quartiers individuelles..."
        
        for quartier_file in "app/$city"/*.tsx; do
            if [ -f "$quartier_file" ]; then
                # Corriger les références à la ville dans les pages de quartiers
                sed -i '' "s/($city)/($city_capitalized)/g" "$quartier_file"
                sed -i '' "s/à $city/à $city_capitalized/g" "$quartier_file"
            fi
        done
    fi
    
    # 6. Corriger les pages de corridors (vers autres villes)
    for corridor_file in "app/$city-vers-"*.tsx; do
        if [ -f "$corridor_file" ]; then
            echo "  📝 Correction de $corridor_file..."
            # Corriger les références dans les corridors
            sed -i '' "s/$city →/$city_capitalized →/g" "$corridor_file"
            sed -i '' "s/De $city/De $city_capitalized/g" "$corridor_file"
            sed -i '' "s/à $city/à $city_capitalized/g" "$corridor_file"
        fi
    done
    
    # 7. Corriger les pages de services
    if [ -f "app/services/page.tsx" ]; then
        echo "  📝 Correction de la page services..."
        sed -i '' "s/$city/$city_capitalized/g" "app/services/page.tsx"
    fi
    
    # 8. Corriger les autres composants
    for component_file in components/*.tsx; do
        if [ -f "$component_file" ]; then
            # Corriger les références à la ville dans les composants
            sed -i '' "s/$city/$city_capitalized/g" "$component_file"
        fi
    done
    
    echo "  ✅ $city_capitalized corrigé"
    cd - > /dev/null
}

# Corriger tous les sites
fix_capitalization "marseille" "Marseille"
fix_capitalization "lyon" "Lyon"
fix_capitalization "toulouse" "Toulouse"
fix_capitalization "nice" "Nice"
fix_capitalization "nantes" "Nantes"
fix_capitalization "strasbourg" "Strasbourg"
fix_capitalization "lille" "Lille"
fix_capitalization "rennes" "Rennes"
fix_capitalization "rouen" "Rouen"

echo ""
echo "🎉 CAPITALISATION CORRIGÉE SUR TOUS LES SITES !"
echo "==============================================="
echo ""
echo "✅ Destinations fréquentes : 'Rouen → Paris' au lieu de 'rouen → Paris'"
echo "✅ Zones de départ : 'Rouen' au lieu de 'rouen'"
echo "✅ Titres de sites : 'Déménageurs Rouen (IA)' au lieu de 'Déménageurs rouen (IA)'"
echo "✅ Pages quartiers : 'Déménagement à Rouen' au lieu de 'Déménagement à rouen'"
echo "✅ Toutes les références : Capitalisées correctement"
echo ""
echo "🔄 Redémarre tes serveurs pour voir les changements !"



