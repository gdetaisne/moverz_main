#!/bin/bash

echo "🔍 AUDIT AUTOMATISÉ - PHASE 1"
echo "=============================="
echo "Date: $(date)"
echo ""
echo "📊 Analyse de 9 sites en cours..."
echo ""

# Initialisation du rapport
report_file="AUDIT_PHASE1_REPORT.md"
cat > $report_file << 'EOFMD'
# 📊 RAPPORT D'AUDIT PHASE 1 - AUTOMATISÉ

Date: $(date)
Sites audités: 9

---

EOFMD

total_issues=0

for city in strasbourg rouen lyon marseille toulouse nice nantes lille rennes; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 AUDIT: $(echo $city | tr '[:lower:]' '[:upper:]')"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    site_issues=0
    
    # Ajouter au rapport
    echo "" >> $report_file
    echo "## 📍 $(echo $city | tr '[:lower:]' '[:upper:]')" >> $report_file
    echo "" >> $report_file
    
    # 1. CONFIGURATION FILES
    echo "1️⃣  CONFIGURATION FILES"
    
    # next.config.cjs
    if [ -f "sites/$city/next.config.cjs" ]; then
        echo "   ✅ next.config.cjs présent"
        echo "- ✅ next.config.cjs présent" >> $report_file
    else
        echo "   ❌ next.config.cjs MANQUANT"
        echo "- ❌ next.config.cjs MANQUANT" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # postcss.config.cjs
    if [ -f "sites/$city/postcss.config.cjs" ]; then
        echo "   ✅ postcss.config.cjs présent"
        echo "- ✅ postcss.config.cjs présent" >> $report_file
    else
        echo "   ❌ postcss.config.cjs MANQUANT"
        echo "- ❌ postcss.config.cjs MANQUANT" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Dockerfile
    if [ -f "sites/$city/Dockerfile" ]; then
        echo "   ✅ Dockerfile présent"
        echo "- ✅ Dockerfile présent" >> $report_file
    else
        echo "   ❌ Dockerfile MANQUANT"
        echo "- ❌ Dockerfile MANQUANT" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # captain-definition
    if [ -f "sites/$city/captain-definition" ]; then
        echo "   ✅ captain-definition présent"
        echo "- ✅ captain-definition présent" >> $report_file
    else
        echo "   ❌ captain-definition MANQUANT"
        echo "- ❌ captain-definition MANQUANT" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # package.json type: module
    if grep -q '"type": "module"' sites/$city/package.json 2>/dev/null; then
        echo "   ✅ package.json type: module"
        echo "- ✅ package.json type: module" >> $report_file
    else
        echo "   ❌ package.json type: module MANQUANT"
        echo "- ❌ package.json type: module MANQUANT" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    echo ""
    
    # 2. STRUCTURE CONTENU
    echo "2️⃣  STRUCTURE CONTENU"
    
    # Comptage pages
    total_pages=$(find sites/$city/app -name "page.tsx" -not -path "*/blog/*" 2>/dev/null | wc -l | xargs)
    echo "   📄 Pages (hors blog): $total_pages"
    echo "- 📄 Pages (hors blog): $total_pages" >> $report_file
    
    # Quartiers
    quartiers_count=$(ls -1 sites/$city/app/$city/ 2>/dev/null | grep -v "page.tsx" | wc -l | xargs)
    echo "   🏘️  Quartiers: $quartiers_count"
    echo "- 🏘️  Quartiers: $quartiers_count" >> $report_file
    
    # Corridors
    corridors_count=$(ls -1 sites/$city/app/ 2>/dev/null | grep "$city-vers" | wc -l | xargs)
    echo "   🛣️  Corridors: $corridors_count"
    echo "- 🛣️  Corridors: $corridors_count" >> $report_file
    
    # Services
    services_count=$(ls -1 sites/$city/app/services/ 2>/dev/null | grep -v "page.tsx" | wc -l | xargs)
    echo "   💼 Services: $services_count"
    echo "- 💼 Services: $services_count" >> $report_file
    
    echo ""
    
    # 3. QUALITÉ CONTENU
    echo "3️⃣  QUALITÉ CONTENU"
    
    # Références Bordeaux
    bordeaux_refs=$(grep -r "bordeaux\|Bordeaux" sites/$city/app/ sites/$city/components/ 2>/dev/null | grep -v "node_modules" | grep -v ".next" | wc -l | xargs)
    if [ "$bordeaux_refs" -eq 0 ]; then
        echo "   ✅ Aucune référence Bordeaux"
        echo "- ✅ Aucune référence Bordeaux" >> $report_file
    else
        echo "   ⚠️  $bordeaux_refs références Bordeaux trouvées"
        echo "- ⚠️  $bordeaux_refs références Bordeaux trouvées" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # URLs majuscules dans Header
    capital_urls=$(grep -E "href=.*/$city/[A-Z]" sites/$city/components/Header.tsx 2>/dev/null | wc -l | xargs)
    if [ "$capital_urls" -eq 0 ]; then
        echo "   ✅ URLs Header en minuscules"
        echo "- ✅ URLs Header en minuscules" >> $report_file
    else
        echo "   ❌ $capital_urls URLs avec majuscules"
        echo "- ❌ $capital_urls URLs avec majuscules" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Dossiers services avec bordeaux
    bordeaux_services=$(ls -1 sites/$city/app/services/ 2>/dev/null | grep "bordeaux" | wc -l | xargs)
    if [ "$bordeaux_services" -eq 0 ]; then
        echo "   ✅ Services renommés (pas de 'bordeaux')"
        echo "- ✅ Services renommés" >> $report_file
    else
        echo "   ❌ $bordeaux_services dossiers services 'bordeaux'"
        echo "- ❌ $bordeaux_services dossiers services 'bordeaux'" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    echo ""
    
    # 4. NAVIGATION
    echo "4️⃣  NAVIGATION"
    
    # Cohérence Header vs Pages
    header_zones=$(grep -A 10 "const zonesItems = \[" sites/$city/components/Header.tsx 2>/dev/null | grep "href:" | grep -o "/$city/[^']*" | sort)
    real_zones=$(ls -1 sites/$city/app/$city/ 2>/dev/null | grep -v "page.tsx" | sed 's|^|/'"$city"'/|' | sort)
    
    if [ "$header_zones" == "$real_zones" ]; then
        echo "   ✅ Header cohérent avec pages"
        echo "- ✅ Header cohérent avec pages" >> $report_file
    else
        echo "   ⚠️  Incohérence Header vs pages"
        echo "- ⚠️  Incohérence Header vs pages" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Corridors auto-référents
    auto_corridor=$(ls -1 sites/$city/app/ 2>/dev/null | grep "$city-vers-$city" | wc -l | xargs)
    if [ "$auto_corridor" -eq 0 ]; then
        echo "   ✅ Pas de corridor auto-référent"
        echo "- ✅ Pas de corridor auto-référent" >> $report_file
    else
        echo "   ❌ Corridor auto-référent détecté"
        echo "- ❌ Corridor auto-référent détecté" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    echo ""
    
    # 5. GIT & DÉPLOIEMENT
    echo "5️⃣  GIT & DÉPLOIEMENT"
    
    # Vérifier .git
    if [ -d "sites/$city/.git" ]; then
        echo "   ✅ Repo Git initialisé"
        echo "- ✅ Repo Git initialisé" >> $report_file
        
        # Dernier commit
        last_commit=$(cd sites/$city && git log -1 --format="%h - %s" 2>/dev/null)
        echo "   📝 Dernier commit: $last_commit"
        echo "- 📝 Dernier commit: $last_commit" >> $report_file
    else
        echo "   ❌ Repo Git non initialisé"
        echo "- ❌ Repo Git non initialisé" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    echo ""
    echo ""
    
    # Score
    if [ "$site_issues" -eq 0 ]; then
        echo "🎉 SCORE: ✅ PARFAIT (0 problème)"
        echo "" >> $report_file
        echo "**🎉 SCORE: ✅ PARFAIT (0 problème)**" >> $report_file
    elif [ "$site_issues" -le 3 ]; then
        echo "✅ SCORE: 🟡 BON ($site_issues problèmes mineurs)"
        echo "" >> $report_file
        echo "**✅ SCORE: 🟡 BON ($site_issues problèmes mineurs)**" >> $report_file
    else
        echo "⚠️  SCORE: 🔴 ATTENTION ($site_issues problèmes)"
        echo "" >> $report_file
        echo "**⚠️  SCORE: 🔴 ATTENTION ($site_issues problèmes)**" >> $report_file
    fi
    
    echo ""
    echo ""
    
    total_issues=$((total_issues + site_issues))
done

# Résumé final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ FINAL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat >> $report_file << EOFMD

---

## 📊 RÉSUMÉ FINAL

EOFMD

if [ "$total_issues" -eq 0 ]; then
    echo "✅✅✅ TOUS LES SITES SONT PARFAITS ✅✅✅"
    echo "Total problèmes: 0"
    echo "" >> $report_file
    echo "✅✅✅ **TOUS LES SITES SONT PARFAITS** ✅✅✅" >> $report_file
    echo "" >> $report_file
    echo "**Total problèmes: 0**" >> $report_file
else
    echo "⚠️  Total problèmes détectés: $total_issues"
    echo "" >> $report_file
    echo "⚠️  **Total problèmes détectés: $total_issues**" >> $report_file
fi

echo ""
echo "📄 Rapport détaillé sauvegardé: $report_file"
echo ""

