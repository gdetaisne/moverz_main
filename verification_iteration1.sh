#!/bin/bash

echo "🔍 VÉRIFICATION POST-ITÉRATION 1"
echo "================================="
echo ""

total_errors=0

for city in strasbourg rouen lyon marseille toulouse nice nantes lille rennes; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 SITE: $(echo $city | tr '[:lower:]' '[:upper:]')"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    site_errors=0
    
    # 1. Vérifier majuscules dans Header
    capital_hrefs=$(grep -E "href=.*/$city/[A-Z]" sites/$city/components/Header.tsx 2>/dev/null | wc -l | xargs)
    if [ "$capital_hrefs" -gt 0 ]; then
        echo "❌ URLs majuscules dans Header: $capital_hrefs"
        site_errors=$((site_errors + capital_hrefs))
    else
        echo "✅ URLs Header: OK (pas de majuscules)"
    fi
    
    # 2. Vérifier dossiers services
    bordeaux_services=$(ls -1 sites/$city/app/services/ 2>/dev/null | grep "bordeaux" | wc -l | xargs)
    if [ "$bordeaux_services" -gt 0 ]; then
        echo "❌ Dossiers services 'bordeaux': $bordeaux_services"
        site_errors=$((site_errors + bordeaux_services))
    else
        echo "✅ Dossiers services: OK (renommés)"
    fi
    
    # 3. Vérifier corridors auto-référents
    auto_corridor=$(ls -1 sites/$city/app/ 2>/dev/null | grep "$city-vers-$city" | wc -l | xargs)
    if [ "$auto_corridor" -gt 0 ]; then
        echo "❌ Corridor auto-référent: $auto_corridor"
        site_errors=$((site_errors + auto_corridor))
    else
        echo "✅ Corridors: OK (pas d'auto-référence)"
    fi
    
    # 4. Lyon spécifique
    if [ "$city" == "lyon" ]; then
        doublon=$(ls -1 sites/lyon/app/lyon/ 2>/dev/null | grep "presqu-ile\|bron\|villeurbanne" | wc -l | xargs)
        if [ "$doublon" -gt 0 ]; then
            echo "❌ Doublons Lyon: $doublon"
            site_errors=$((site_errors + doublon))
        else
            echo "✅ Lyon: OK (pas de doublons)"
        fi
    fi
    
    echo ""
    echo "📊 SCORE $city: $site_errors erreurs"
    total_errors=$((total_errors + site_errors))
    echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSULTAT FINAL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
if [ "$total_errors" -eq 0 ]; then
    echo "✅✅✅ AUCUNE ERREUR DÉTECTÉE ! ✅✅✅"
else
    echo "⚠️  Total erreurs restantes: $total_errors"
fi
echo ""
