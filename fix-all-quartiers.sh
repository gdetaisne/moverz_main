#!/bin/bash

echo "🔧 CORRECTION DE TOUTES LES PAGES QUARTIERS"
echo "==========================================="
echo ""

# Fonction pour corriger les quartiers d'un site
fix_quartiers() {
    local city=$1
    local site_dir="sites/$city"
    
    echo "🔧 Correction des quartiers de $city..."
    
    if [ ! -d "$site_dir" ]; then
        echo "❌ Dossier $site_dir non trouvé"
        return 1
    fi
    
    cd "$site_dir" || return 1
    
    # Définir les quartiers et communes selon la ville
    case $city in
        "marseille")
            quartier1_title="Le Vieux-Port"
            quartier1_slug="vieux-port"
            quartier2_title="La Plaine"
            quartier2_slug="plaine"
            quartier3_title="Le Panier"
            quartier3_slug="panier"
            quartier4_title="Endoume"
            quartier4_slug="endoume"
            quartier5_title="La Joliette"
            quartier5_slug="joliette"
            quartier6_title="La Canebière"
            quartier6_slug="canebiere"
            quartier7_title="Le Cours Julien"
            quartier7_slug="cours-julien"
            quartier8_title="Château-Gombert"
            quartier8_slug="chateau-gombert"
            quartier9_title="Les Calanques"
            quartier9_slug="calanques"
            quartier10_title="Saint-Victor"
            quartier10_slug="saint-victor"
            
            commune1_title="Aubagne"
            commune1_slug="aubagne"
            commune2_title="Aix-en-Provence"
            commune2_slug="aix-en-provence"
            commune3_title="Allauch"
            commune3_slug="allauch"
            commune4_title="Plan-de-Cuques"
            commune4_slug="plan-de-cuques"
            commune5_title="La Ciotat"
            commune5_slug="ciotat"
            ;;
        "lyon")
            quartier1_title="La Presqu'île"
            quartier1_slug="presquile"
            quartier2_title="La Croix-Rousse"
            quartier2_slug="croix-rousse"
            quartier3_title="Vieux Lyon"
            quartier3_slug="vieux-lyon"
            quartier4_title="Part-Dieu"
            quartier4_slug="part-dieu"
            quartier5_title="Confluence"
            quartier5_slug="confluence"
            quartier6_title="Brotteaux"
            quartier6_slug="brotteaux"
            quartier7_title="Montchat"
            quartier7_slug="montchat"
            quartier8_title="Guillotière"
            quartier8_slug="guillotiere"
            quartier9_title="Gerland"
            quartier9_slug="gerland"
            quartier10_title="Tête d'Or"
            quartier10_slug="tete-dor"
            
            commune1_title="Villeurbanne"
            commune1_slug="villeurbanne"
            commune2_title="Vénissieux"
            commune2_slug="venissieux"
            commune3_title="Saint-Fons"
            commune3_slug="saint-fons"
            commune4_title="Oullins"
            commune4_slug="oullins"
            commune5_title="Caluire-et-Cuire"
            commune5_slug="caluire-et-cuire"
            ;;
        "toulouse")
            quartier1_title="Capitole"
            quartier1_slug="capitole"
            quartier2_title="Saint-Cyprien"
            quartier2_slug="saint-cyprien"
            quartier3_title="Carmes"
            quartier3_slug="carmes"
            quartier4_title="Jean Jaurès"
            quartier4_slug="jean-jaures"
            quartier5_title="Compans"
            quartier5_slug="compans"
            quartier6_title="Matabiau"
            quartier6_slug="matabiau"
            quartier7_title="Mirail"
            quartier7_slug="mirail"
            quartier8_title="Rangueil"
            quartier8_slug="rangueil"
            quartier9_title="Purpan"
            quartier9_slug="purpan"
            quartier10_title="Borderouge"
            quartier10_slug="borderouge"
            
            commune1_title="Blagnac"
            commune1_slug="blagnac"
            commune2_title="Colomiers"
            commune2_slug="colomiers"
            commune3_title="Tournefeuille"
            commune3_slug="tournefeuille"
            commune4_title="Muret"
            commune4_slug="muret"
            commune5_title="Cugnaux"
            commune5_slug="cugnaux"
            ;;
        "nice")
            quartier1_title="Vieux Nice"
            quartier1_slug="vieux-nice"
            quartier2_title="Promenade des Anglais"
            quartier2_slug="promenade-anglais"
            quartier3_title="Cimiez"
            quartier3_slug="cimiez"
            quartier4_title="Libération"
            quartier4_slug="liberation"
            quartier5_title="Port"
            quartier5_slug="port"
            quartier6_title="Mantega"
            quartier6_slug="mantega"
            quartier7_title="Fabron"
            quartier7_slug="fabron"
            quartier8_title="Pasteur"
            quartier8_slug="pasteur"
            quartier9_title="Garibaldi"
            quartier9_slug="garibaldi"
            quartier10_title="Saint-Roch"
            quartier10_slug="saint-roch"
            
            commune1_title="Cannes"
            commune1_slug="cannes"
            commune2_title="Antibes"
            commune2_slug="antibes"
            commune3_title="Grasse"
            commune3_slug="grasse"
            commune4_title="Menton"
            commune4_slug="menton"
            commune5_title="Monaco"
            commune5_slug="monaco"
            ;;
        "nantes")
            quartier1_title="Centre-ville"
            quartier1_slug="centre-ville"
            quartier2_title="Ile de Nantes"
            quartier2_slug="ile-nantes"
            quartier3_title="Malakoff"
            quartier3_slug="malakoff"
            quartier4_title="Dervallières"
            quartier4_slug="dervallieres"
            quartier5_title="Beaulieu"
            quartier5_slug="beaulieu"
            quartier6_title="Chantenay"
            quartier6_slug="chantenay"
            quartier7_title="Breil"
            quartier7_slug="breil"
            quartier8_title="Doulon"
            quartier8_slug="doulon"
            quartier9_title="Saint-Donatien"
            quartier9_slug="saint-donatien"
            quartier10_title="Procé"
            quartier10_slug="proce"
            
            commune1_title="Saint-Herblain"
            commune1_slug="saint-herblain"
            commune2_title="Rezé"
            commune2_slug="reze"
            commune3_title="Vertou"
            commune3_slug="vertou"
            commune4_title="Orvault"
            commune4_slug="orvault"
            commune5_title="Carquefou"
            commune5_slug="carquefou"
            ;;
        "strasbourg")
            quartier1_title="Grande Île"
            quartier1_slug="grande-ile"
            quartier2_title="Neudorf"
            quartier2_slug="neudorf"
            quartier3_title="Cronenbourg"
            quartier3_slug="cronenbourg"
            quartier4_title="Hautepierre"
            quartier4_slug="hautepierre"
            quartier5_title="Esplanade"
            quartier5_slug="esplanade"
            quartier6_title="Orangerie"
            quartier6_slug="orangerie"
            quartier7_title="Contades"
            quartier7_slug="contades"
            quartier8_title="Gare"
            quartier8_slug="gare"
            quartier9_title="Robertsau"
            quartier9_slug="robertsau"
            quartier10_title="Koenigshoffen"
            quartier10_slug="koenigshoffen"
            
            commune1_title="Illkirch-Graffenstaden"
            commune1_slug="illkirch-graffenstaden"
            commune2_title="Schiltigheim"
            commune2_slug="schiltigheim"
            commune3_title="Bischheim"
            commune3_slug="bischheim"
            commune4_title="Hoenheim"
            commune4_slug="hoenheim"
            commune5_title="Ostwald"
            commune5_slug="ostwald"
            ;;
        "lille")
            quartier1_title="Vieux Lille"
            quartier1_slug="vieux-lille"
            quartier2_title="Centre"
            quartier2_slug="centre"
            quartier3_title="Wazemmes"
            quartier3_slug="wazemmes"
            quartier4_title="Moulins"
            quartier4_slug="moulins"
            quartier5_title="Lomme"
            quartier5_slug="lomme"
            quartier6_title="Saint-Maurice"
            quartier6_slug="saint-maurice"
            quartier7_title="Fives"
            quartier7_slug="fives"
            quartier8_title="Hellemmes"
            quartier8_slug="hellemmes"
            quartier9_title="Faubourg de Béthune"
            quartier9_slug="faubourg-bethune"
            quartier10_title="Vauban"
            quartier10_slug="vauban"
            
            commune1_title="Roubaix"
            commune1_slug="roubaix"
            commune2_title="Tourcoing"
            commune2_slug="tourcoing"
            commune3_title="Villeneuve-d'Ascq"
            commune3_slug="villeneuve-d-ascq"
            commune4_title="Lambersart"
            commune4_slug="lambersart"
            commune5_title="Marcq-en-Barœul"
            commune5_slug="marcq-en-baroeul"
            ;;
        "rennes")
            quartier1_title="Centre-ville"
            quartier1_slug="centre-ville"
            quartier2_title="Thabor"
            quartier2_slug="thabor"
            quartier3_title="Villejean"
            quartier3_slug="villejean"
            quartier4_title="Beaulieu"
            quartier4_slug="beaulieu"
            quartier5_title="Cleunay"
            quartier5_slug="cleunay"
            quartier6_title="Saint-Hélier"
            quartier6_slug="saint-helier"
            quartier7_title="Bréquigny"
            quartier7_slug="brequigny"
            quartier8_title="Le Blosne"
            quartier8_slug="blosne"
            quartier9_title="Maurepas"
            quartier9_slug="maurepas"
            quartier10_title="Longchamp"
            quartier10_slug="longchamp"
            
            commune1_title="Saint-Grégoire"
            commune1_slug="saint-gregoire"
            commune2_title="Cesson-Sévigné"
            commune2_slug="cesson-sevigne"
            commune3_title="Pacé"
            commune3_slug="pace"
            commune4_title="Betton"
            commune4_slug="betton"
            commune5_title="Montgermont"
            commune5_slug="montgermont"
            ;;
        "rouen")
            quartier1_title="Centre-ville"
            quartier1_slug="centre-ville"
            quartier2_title="Saint-Marc"
            quartier2_slug="saint-marc"
            quartier3_title="Joli-Mai"
            quartier3_slug="joli-mai"
            quartier4_title="Coteaux-Sud"
            quartier4_slug="coteaux-sud"
            quartier5_title="Saint-Sever"
            quartier5_slug="saint-sever"
            quartier6_title="Rive-Droite"
            quartier6_slug="rive-droite"
            quartier7_title="Rive-Gauche"
            quartier7_slug="rive-gauche"
            quartier8_title="Mont-Saint-Aignan"
            quartier8_slug="mont-saint-aignan"
            quartier9_title="Bois-Guillaume"
            quartier9_slug="bois-guillaume"
            quartier10_title="Bihorel"
            quartier10_slug="bihorel"
            
            commune1_title="Mont-Saint-Aignan"
            commune1_slug="mont-saint-aignan"
            commune2_title="Bois-Guillaume"
            commune2_slug="bois-guillaume"
            commune3_title="Bihorel"
            commune3_slug="bihorel"
            commune4_title="Déville-lès-Rouen"
            commune4_slug="deville-les-rouen"
            commune5_title="Le Grand-Quevilly"
            commune5_slug="grand-quevilly"
            ;;
    esac
    
    # 1. Corriger NeighborhoodsData.ts
    if [ -f "components/NeighborhoodsData.ts" ]; then
        echo "  📝 Correction de NeighborhoodsData.ts..."
        
        cat > "components/NeighborhoodsData.ts" << EOF
export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "$quartier1_slug",      title: "$quartier1_title" },
  { slug: "$quartier2_slug",      title: "$quartier2_title" },
  { slug: "$quartier3_slug",      title: "$quartier3_title" },
  { slug: "$quartier4_slug",      title: "$quartier4_title" },
  { slug: "$quartier5_slug",      title: "$quartier5_title" },
  { slug: "$quartier6_slug",      title: "$quartier6_title" },
  { slug: "$quartier7_slug",      title: "$quartier7_title" },
  { slug: "$quartier8_slug",      title: "$quartier8_title" },
  { slug: "$quartier9_slug",      title: "$quartier9_title" },
  { slug: "$quartier10_slug",     title: "$quartier10_title" },
];

export const COMMUNES: Item[] = [
  { slug: "$commune1_slug",       title: "$commune1_title" },
  { slug: "$commune2_slug",       title: "$commune2_title" },
  { slug: "$commune3_slug",       title: "$commune3_title" },
  { slug: "$commune4_slug",       title: "$commune4_title" },
  { slug: "$commune5_slug",       title: "$commune5_title" },
];

export function urlForQuartier(slug: string) {
  return \`/devis-demenagement-$city-\${slug}/\`;
}
export function urlForCommune(slug: string) {
  return \`/devis-demenagement-\${slug}/\`;
}
EOF
    fi
    
    # 2. Corriger la page quartiers
    if [ -f "app/quartiers-$city/page.tsx" ]; then
        echo "  📝 Correction de la page quartiers..."
        
        # Remplacer les descriptions dans les métadonnées
        sed -i '' "s/Chartrons, Caudéran, Bastide, Saint-Pierre, Mériadeck…/$quartier1_title, $quartier2_title, $quartier3_title, $quartier4_title, $quartier5_title…/" "app/quartiers-$city/page.tsx"
        sed -i '' "s/Mérignac, Pessac, Talence, Bègles, Villenave-d'Ornon/$commune1_title, $commune2_title, $commune3_title, $commune4_title, $commune5_title/" "app/quartiers-$city/page.tsx"
    fi
    
    # 3. Corriger le Header (zones de départ)
    if [ -f "components/Header.tsx" ]; then
        echo "  📝 Correction des zones de départ dans le header..."
        
        # Remplacer les zones de départ par les bons quartiers
        sed -i '' "/{ href: '\/$city\/chartrons', label: 'Chartrons' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/$city\/cauderan', label: 'Caudéran' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/$city\/bastide', label: 'Bastide' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/$city\/merignac', label: 'Mérignac' }/d" components/Header.tsx
        sed -i '' "/{ href: '\/$city\/pessac', label: 'Pessac' }/d" components/Header.tsx
        
        # Ajouter les nouvelles zones après { href: '/$city', label: '$city' }
        sed -i '' "/{ href: '\/$city', label: '$city' }/a\\
    { href: '/$city/$quartier1_slug', label: '$quartier1_title' },\\
    { href: '/$city/$quartier2_slug', label: '$quartier2_title' },\\
    { href: '/$city/$quartier3_slug', label: '$quartier3_title' },\\
    { href: '/$city/$quartier4_slug', label: '$quartier4_title' },\\
    { href: '/$city/$quartier5_slug', label: '$quartier5_title' }," components/Header.tsx
    fi
    
    echo "  ✅ $city corrigé"
    cd - > /dev/null
}

# Corriger tous les sites
fix_quartiers "marseille"
fix_quartiers "lyon"
fix_quartiers "toulouse"
fix_quartiers "nice"
fix_quartiers "nantes"
fix_quartiers "strasbourg"
fix_quartiers "lille"
fix_quartiers "rennes"
fix_quartiers "rouen"

echo ""
echo "🎉 TOUTES LES PAGES QUARTIERS CORRIGÉES !"
echo "========================================="
echo ""
echo "✅ NeighborhoodsData.ts : Quartiers et communes spécifiques à chaque ville"
echo "✅ Page quartiers : Descriptions mises à jour"
echo "✅ Zones de départ : Quartiers corrects dans le header"
echo ""
echo "🔄 Redémarre tes serveurs pour voir les changements !"



