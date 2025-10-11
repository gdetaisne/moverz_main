#!/bin/bash

echo "🔧 CORRECTION DES DONNÉES DE TOUS LES SITES"
echo "=========================================="
echo ""

# Fonction pour corriger un site
fix_site() {
    local city=$1
    local site_dir="sites/$city"
    
    echo "🔧 Correction de $city..."
    
    if [ ! -d "$site_dir" ]; then
        echo "❌ Dossier $site_dir non trouvé"
        return 1
    fi
    
    cd "$site_dir" || return 1
    
    # Définir les quartiers selon la ville
    case $city in
        "marseille")
            quartier1="Le Vieux-Port"
            quartier2="La Plaine"
            quartier3="Le Panier"
            quartier4="Endoume"
            quartier5="La Joliette"
            ;;
        "lyon")
            quartier1="La Presqu'île"
            quartier2="La Croix-Rousse"
            quartier3="Vieux Lyon"
            quartier4="Part-Dieu"
            quartier5="Confluence"
            ;;
        "toulouse")
            quartier1="Capitole"
            quartier2="Saint-Cyprien"
            quartier3="Carmes"
            quartier4="Jean Jaurès"
            quartier5="Compans"
            ;;
        "nice")
            quartier1="Vieux Nice"
            quartier2="Promenade des Anglais"
            quartier3="Cimiez"
            quartier4="Libération"
            quartier5="Port"
            ;;
        "nantes")
            quartier1="Centre-ville"
            quartier2="Ile de Nantes"
            quartier3="Malakoff"
            quartier4="Dervallières"
            quartier5="Beaulieu"
            ;;
        "strasbourg")
            quartier1="Grande Île"
            quartier2="Neudorf"
            quartier3="Cronenbourg"
            quartier4="Hautepierre"
            quartier5="Esplanade"
            ;;
        "lille")
            quartier1="Vieux Lille"
            quartier2="Centre"
            quartier3="Wazemmes"
            quartier4="Moulins"
            quartier5="Lomme"
            ;;
        "rennes")
            quartier1="Centre-ville"
            quartier2="Thabor"
            quartier3="Villejean"
            quartier4="Beaulieu"
            quartier5="Cleunay"
            ;;
        "rouen")
            quartier1="Centre-ville"
            quartier2="Saint-Marc"
            quartier3="Joli-Mai"
            quartier4="Coteaux-Sud"
            quartier5="Saint-Sever"
            ;;
    esac
    
    # 1. Corriger NeighborhoodsTeaser.tsx
    if [ -f "components/NeighborhoodsTeaser.tsx" ]; then
        echo "  📝 Correction des zones couvertes..."
        
        cat > "components/NeighborhoodsTeaser.tsx" << EOF
import Link from "next/link";

export default function NeighborhoodsTeaser() {
  // Quartiers populaires avec liens vers les pages zones desservies
  const picks = [
    { title: "$quartier1", href: "/$city/$(echo $quartier1 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')" },
    { title: "$quartier2", href: "/$city/$(echo $quartier2 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')" },
    { title: "$quartier3", href: "/$city/$(echo $quartier3 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')" },
    { title: "$quartier4", href: "/$city/$(echo $quartier4 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')" },
    { title: "$quartier5", href: "/$city/$(echo $quartier5 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')" },
  ];
  
  return (
    <div>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Zones couvertes</h2>
        <Link href="/quartiers-$city" className="text-sm text-[#6bcfcf] underline">Voir tous les quartiers</Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {picks.map((p) => (
          <Link key={p.title} href={p.href} className="card-glass rounded-2xl p-4 hover:translate-y-[2px] hover:shadow-lg transition">
            <div className="text-white font-medium">{p.title}</div>
            <div className="text-white/70 text-xs mt-1">Déménageurs locaux</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
EOF
    fi
    
    # 2. Corriger le CTA du Header
    if [ -f "components/Header.tsx" ]; then
        echo "  📝 Correction du CTA header..."
        sed -i '' 's/Obtenez vos devis précis gratuitement/Obtenir 5 devis gratuits/g' components/Header.tsx
    fi
    
    # 3. Corriger les zones dans le Header (version simplifiée)
    if [ -f "components/Header.tsx" ]; then
        echo "  📝 Correction des zones dans le header..."
        
        # Remplacer les destinations fréquentes
        sed -i '' "s/strasbourg → Paris/$city → Paris/g" components/Header.tsx
        sed -i '' "s/strasbourg → Lyon/$city → Lyon/g" components/Header.tsx
        sed -i '' "s/strasbourg → Toulouse/$city → Toulouse/g" components/Header.tsx
        sed -i '' "s/href=\"\/strasbourg-vers-paris\"/href=\"\/$city-vers-paris\"/g" components/Header.tsx
        sed -i '' "s/href=\"\/strasbourg-vers-lyon\"/href=\"\/$city-vers-lyon\"/g" components/Header.tsx
        sed -i '' "s/href=\"\/strasbourg-vers-toulouse\"/href=\"\/$city-vers-toulouse\"/g" components/Header.tsx
        
        # Remplacer les zones de départ
        sed -i '' "/{ href: '\/strasbourg\/chartrons', label: 'Chartrons' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/strasbourg\/cauderan', label: 'Caudéran' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/strasbourg\/bastide', label: 'Bastide' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/strasbourg\/merignac', label: 'Mérignac' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/strasbourg\/pessac', label: 'Pessac' }/d" components/Header.tsx
        
        # Ajouter les nouvelles zones après { href: '/strasbourg', label: 'strasbourg' }
        sed -i '' "/{ href: '\/strasbourg', label: 'strasbourg' }/a\\
    { href: '/$city/$(echo $quartier1 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')', label: '$quartier1' },\\
    { href: '/$city/$(echo $quartier2 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')', label: '$quartier2' },\\
    { href: '/$city/$(echo $quartier3 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')', label: '$quartier3' },\\
    { href: '/$city/$(echo $quartier4 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')', label: '$quartier4' },\\
    { href: '/$city/$(echo $quartier5 | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/à/a/g' | sed 's/é/e/g' | sed 's/è/e/g' | sed 's/ê/e/g' | sed 's/ô/o/g' | sed 's/ç/c/g')', label: '$quartier5' }," components/Header.tsx
        
        # Remplacer la référence à strasbourg dans zonesItems
        sed -i '' "s/{ href: '\/strasbourg', label: 'strasbourg' }/{ href: '\/$city', label: '$city' }/" components/Header.tsx
    fi
    
    echo "  ✅ $city corrigé"
    cd - > /dev/null
}

# Corriger tous les sites
fix_site "marseille"
fix_site "lyon"
fix_site "toulouse"
fix_site "nice"
fix_site "nantes"
fix_site "strasbourg"
fix_site "lille"
fix_site "rennes"
fix_site "rouen"

echo ""
echo "🎉 TOUS LES SITES CORRIGÉS !"
echo "============================"
echo ""
echo "✅ Zones couvertes : Quartiers corrects pour chaque ville"
echo "✅ CTA Header : 'Obtenir 5 devis gratuits'"
echo "✅ Zones dropdown : Quartiers de chaque ville"
echo "✅ Destinations : Liens vers les bonnes pages"
echo ""
echo "🔄 Redémarre tes serveurs pour voir les changements !"