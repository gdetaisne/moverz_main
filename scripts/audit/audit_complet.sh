#!/bin/bash

echo "🔍 AUDIT COMPLET DE TOUS LES SITES"
echo "===================================="
echo ""

for city in strasbourg rouen lyon marseille toulouse nice nantes lille rennes; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 SITE: $(echo $city | tr '[:lower:]' '[:upper:]')"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    # 1. Header - Zones desservies
    echo "1️⃣  ZONES DESSERVIES (Header.tsx)"
    echo "   Liens dans le menu:"
    grep -A 10 "const zonesItems = \[" sites/$city/components/Header.tsx | grep "href:" | sed 's/.*href: /   /' | sed "s/',//" | head -6
    
    echo ""
    echo "   Pages quartiers réelles:"
    ls -1 sites/$city/app/$city/ 2>/dev/null | grep -v "page.tsx" | sed 's/^/   \/'"$city"'\//' || echo "   ⚠️  Aucune page quartier"
    
    # Vérifier cohérence
    header_zones=$(grep -A 10 "const zonesItems = \[" sites/$city/components/Header.tsx | grep "href:" | grep -o "/$city/[^']*" | sort)
    real_zones=$(ls -1 sites/$city/app/$city/ 2>/dev/null | grep -v "page.tsx" | sed 's|^|/'"$city"'/|' | sort)
    
    if [ "$header_zones" != "$real_zones" ]; then
        echo "   ❌ INCOHÉRENCE DÉTECTÉE entre Header et pages réelles"
    else
        echo "   ✅ Cohérence OK"
    fi
    
    echo ""
    
    # 2. Pages corridors
    echo "2️⃣  PAGES CORRIDORS (ville-vers-ville)"
    corridor_count=$(ls -1 sites/$city/app/ 2>/dev/null | grep "$city-vers" | wc -l | xargs)
    echo "   Nombre de corridors: $corridor_count"
    ls -1 sites/$city/app/ 2>/dev/null | grep "$city-vers" | sed 's/^/   /'
    
    echo ""
    
    # 3. Services
    echo "3️⃣  PAGES SERVICES"
    service_count=$(ls -1 sites/$city/app/services/ 2>/dev/null | grep -v "page.tsx" | wc -l | xargs)
    echo "   Nombre de services: $service_count"
    
    # Vérifier références Bordeaux dans services
    bordeaux_in_services=$(grep -r "bordeaux" sites/$city/app/services/ 2>/dev/null | grep -v "node_modules" | wc -l | xargs)
    if [ "$bordeaux_in_services" -gt 0 ]; then
        echo "   ⚠️  $bordeaux_in_services références 'bordeaux' trouvées dans services"
    fi
    
    echo ""
    
    # 4. Partenaires
    echo "4️⃣  PAGE PARTENAIRES"
    if [ -f "sites/$city/app/partenaires/page.tsx" ]; then
        # Compter les partenaires
        partner_count=$(grep -o '"name":' sites/$city/app/partenaires/page.tsx 2>/dev/null | wc -l | xargs)
        echo "   Nombre de partenaires: $partner_count"
        
        # Vérifier références Bordeaux
        bordeaux_in_partners=$(grep -i "bordeaux\|bordelais" sites/$city/app/partenaires/page.tsx 2>/dev/null | wc -l | xargs)
        if [ "$bordeaux_in_partners" -gt 0 ]; then
            echo "   ❌ $bordeaux_in_partners références Bordeaux trouvées"
        else
            echo "   ✅ Pas de référence Bordeaux"
        fi
    else
        echo "   ❌ Page partenaires manquante"
    fi
    
    echo ""
    
    # 5. Vérifications globales
    echo "5️⃣  VÉRIFICATIONS GLOBALES"
    
    # Références Bordeaux dans tout le site
    total_bordeaux=$(grep -r "bordeaux\|Bordeaux\|bordelais" sites/$city/app/ sites/$city/components/ 2>/dev/null | grep -v "node_modules" | grep -v ".next" | wc -l | xargs)
    if [ "$total_bordeaux" -gt 0 ]; then
        echo "   ⚠️  $total_bordeaux références 'Bordeaux' dans le site"
    else
        echo "   ✅ Aucune référence Bordeaux"
    fi
    
    # Vérifier domaine
    wrong_domain=$(grep -r "demenageur-bordeaux\|bordeaux-demenageur" sites/$city/ 2>/dev/null | grep -v "node_modules" | grep -v ".next" | wc -l | xargs)
    if [ "$wrong_domain" -gt 0 ]; then
        echo "   ❌ $wrong_domain références au mauvais domaine"
    fi
    
    # Vérifier majuscules dans hrefs
    capital_hrefs=$(grep -r "href=.*/$city" sites/$city/components/Header.tsx 2>/dev/null | grep -E "href.*[A-Z]" | wc -l | xargs)
    if [ "$capital_hrefs" -gt 0 ]; then
        echo "   ❌ Majuscules détectées dans les hrefs du Header"
    fi
    
    echo ""
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ AUDIT TERMINÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
