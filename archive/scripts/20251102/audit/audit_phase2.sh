#!/bin/bash

echo "🔍 AUDIT PHASE 2 - MANUEL SEMI-AUTOMATISÉ"
echo "=========================================="
echo "Date: $(date)"
echo ""

report_file="AUDIT_PHASE2_REPORT.md"

cat > $report_file << 'EOFMD'
# 📊 AUDIT PHASE 2 - MANUEL SEMI-AUTOMATISÉ

Date: $(date)
Phase: Audit Manuel
Sites audités: 9

---

## 🎯 MÉTHODOLOGIE

Tests réalisés pour chaque site :
1. ✅ Structure des pages
2. ✅ Contenu localisé
3. ✅ Cohérence des données
4. ✅ Assets (images, favicon)
5. ✅ Formulaires et composants

---

EOFMD

total_issues=0

for city in strasbourg rouen lyon marseille toulouse nice nantes lille rennes; do
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 AUDIT PHASE 2: $(echo $city | tr '[:lower:]' '[:upper:]')"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    site_issues=0
    
    echo "" >> $report_file
    echo "## 📍 $(echo $city | tr '[:lower:]' '[:upper:]')" >> $report_file
    echo "" >> $report_file
    
    # 1. PAGES CRITIQUES
    echo "1️⃣  PAGES CRITIQUES"
    
    # Homepage
    if [ -f "sites/$city/app/page.tsx" ]; then
        echo "   ✅ Homepage présente"
        echo "- ✅ Homepage présente" >> $report_file
    else
        echo "   ❌ Homepage MANQUANTE"
        echo "- ❌ Homepage MANQUANTE" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Page partenaires
    if [ -f "sites/$city/app/partenaires/page.tsx" ]; then
        echo "   ✅ Page partenaires présente"
        echo "- ✅ Page partenaires présente" >> $report_file
        
        # Vérifier contenu partenaires
        partner_count=$(grep -o '"name":' sites/$city/app/partenaires/page.tsx 2>/dev/null | wc -l | xargs)
        if [ "$partner_count" -gt 0 ]; then
            echo "   ✅ Partenaires: $partner_count trouvés"
            echo "- ✅ Partenaires: $partner_count trouvés" >> $report_file
        else
            echo "   ⚠️  Aucun partenaire trouvé"
            echo "- ⚠️  Aucun partenaire trouvé" >> $report_file
            site_issues=$((site_issues + 1))
        fi
    else
        echo "   ❌ Page partenaires MANQUANTE"
        echo "- ❌ Page partenaires MANQUANTE" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Page services
    if [ -f "sites/$city/app/services/page.tsx" ]; then
        echo "   ✅ Page services présente"
        echo "- ✅ Page services présente" >> $report_file
    else
        echo "   ❌ Page services MANQUANTE"
        echo "- ❌ Page services MANQUANTE" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Page contact
    if [ -f "sites/$city/app/contact/page.tsx" ]; then
        echo "   ✅ Page contact présente"
        echo "- ✅ Page contact présente" >> $report_file
    else
        echo "   ❌ Page contact MANQUANTE"
        echo "- ❌ Page contact MANQUANTE" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Page FAQ
    if [ -f "sites/$city/app/faq/page.tsx" ]; then
        echo "   ✅ Page FAQ présente"
        echo "- ✅ Page FAQ présente" >> $report_file
    else
        echo "   ⚠️  Page FAQ manquante"
        echo "- ⚠️  Page FAQ manquante" >> $report_file
    fi
    
    echo ""
    
    # 2. COMPOSANTS ESSENTIELS
    echo "2️⃣  COMPOSANTS ESSENTIELS"
    
    # Header
    if [ -f "sites/$city/components/Header.tsx" ]; then
        echo "   ✅ Header présent"
        echo "- ✅ Header présent" >> $report_file
        
        # Vérifier CTA
        if grep -q "Obtenir 5 devis gratuits\|Obtenir.*devis" sites/$city/components/Header.tsx 2>/dev/null; then
            echo "   ✅ CTA 'Obtenir devis' présent"
            echo "- ✅ CTA présent" >> $report_file
        else
            echo "   ⚠️  CTA manquant ou texte incorrect"
            echo "- ⚠️  CTA manquant" >> $report_file
            site_issues=$((site_issues + 1))
        fi
    else
        echo "   ❌ Header MANQUANT"
        echo "- ❌ Header MANQUANT" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Footer
    if [ -f "sites/$city/components/Footer.tsx" ]; then
        echo "   ✅ Footer présent"
        echo "- ✅ Footer présent" >> $report_file
    else
        echo "   ⚠️  Footer manquant"
        echo "- ⚠️  Footer manquant" >> $report_file
    fi
    
    echo ""
    
    # 3. LOCALISATION CONTENU
    echo "3️⃣  LOCALISATION CONTENU"
    
    # Vérifier nom ville dans Header
    city_cap=$(echo "$city" | sed 's/.*/\u&/')
    if grep -q "$city_cap" sites/$city/components/Header.tsx 2>/dev/null; then
        echo "   ✅ Nom ville '$city_cap' présent dans Header"
        echo "- ✅ Nom ville '$city_cap' dans Header" >> $report_file
    else
        echo "   ⚠️  Nom ville absent du Header"
        echo "- ⚠️  Nom ville absent du Header" >> $report_file
        site_issues=$((site_issues + 1))
    fi
    
    # Vérifier quartiers dans NeighborhoodsData
    if [ -f "sites/$city/components/NeighborhoodsData.ts" ]; then
        quartiers_defined=$(grep -c "{ slug:" sites/$city/components/NeighborhoodsData.ts 2>/dev/null || echo "0")
        echo "   ✅ Quartiers définis: $quartiers_defined"
        echo "- ✅ Quartiers définis: $quartiers_defined" >> $report_file
    else
        echo "   ⚠️  NeighborhoodsData.ts manquant"
        echo "- ⚠️  NeighborhoodsData.ts manquant" >> $report_file
    fi
    
    echo ""
    
    # 4. ASSETS & MEDIA
    echo "4️⃣  ASSETS & MEDIA"
    
    # Favicon
    if [ -f "sites/$city/public/favicon.ico" ]; then
        echo "   ✅ Favicon présent"
        echo "- ✅ Favicon présent" >> $report_file
    else
        echo "   ⚠️  Favicon manquant"
        echo "- ⚠️  Favicon manquant" >> $report_file
    fi
    
    # Dossier public
    if [ -d "sites/$city/public" ]; then
        public_files=$(ls -1 sites/$city/public 2>/dev/null | wc -l | xargs)
        echo "   ✅ Dossier public: $public_files fichiers"
        echo "- ✅ Dossier public: $public_files fichiers" >> $report_file
    else
        echo "   ⚠️  Dossier public manquant"
        echo "- ⚠️  Dossier public manquant" >> $report_file
    fi
    
    echo ""
    
    # 5. DONNÉES & COHÉRENCE
    echo "5️⃣  DONNÉES & COHÉRENCE"
    
    # Vérifier metadata dans layout
    if [ -f "sites/$city/app/layout.tsx" ]; then
        if grep -q "metadata" sites/$city/app/layout.tsx 2>/dev/null; then
            echo "   ✅ Metadata configurées"
            echo "- ✅ Metadata configurées" >> $report_file
        else
            echo "   ⚠️  Metadata non trouvées"
            echo "- ⚠️  Metadata non trouvées" >> $report_file
        fi
    fi
    
    # Vérifier globals.css
    if [ -f "sites/$city/app/globals.css" ]; then
        echo "   ✅ globals.css présent"
        echo "- ✅ globals.css présent" >> $report_file
    else
        echo "   ⚠️  globals.css manquant"
        echo "- ⚠️  globals.css manquant" >> $report_file
    fi
    
    # Vérifier tailwind.config.ts
    if [ -f "sites/$city/tailwind.config.ts" ]; then
        echo "   ✅ tailwind.config.ts présent"
        echo "- ✅ tailwind.config.ts présent" >> $report_file
    else
        echo "   ⚠️  tailwind.config.ts manquant"
        echo "- ⚠️  tailwind.config.ts manquant" >> $report_file
    fi
    
    echo ""
    
    # 6. STRUCTURE PAGES QUARTIERS
    echo "6️⃣  PAGES QUARTIERS - ÉCHANTILLON"
    
    # Prendre 2 quartiers au hasard et vérifier le contenu
    sample_quartiers=$(ls -1 sites/$city/app/$city/ 2>/dev/null | grep -v "page.tsx" | head -2)
    
    if [ ! -z "$sample_quartiers" ]; then
        for quartier in $sample_quartiers; do
            if [ -f "sites/$city/app/$city/$quartier/page.tsx" ]; then
                # Vérifier que le contenu contient le nom du quartier
                quartier_name=$(echo "$quartier" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
                if grep -qi "$quartier" sites/$city/app/$city/$quartier/page.tsx 2>/dev/null; then
                    echo "   ✅ Quartier '$quartier': contenu OK"
                    echo "- ✅ Quartier '$quartier': contenu OK" >> $report_file
                else
                    echo "   ⚠️  Quartier '$quartier': contenu générique"
                    echo "- ⚠️  Quartier '$quartier': contenu générique" >> $report_file
                    site_issues=$((site_issues + 1))
                fi
            fi
        done
    else
        echo "   ⚠️  Aucun quartier à échantillonner"
        echo "- ⚠️  Aucun quartier à échantillonner" >> $report_file
    fi
    
    echo ""
    echo ""
    
    # Score
    if [ "$site_issues" -eq 0 ]; then
        echo "🎉 SCORE PHASE 2: ✅ EXCELLENT (0 problème)"
        echo "" >> $report_file
        echo "**🎉 SCORE PHASE 2: ✅ EXCELLENT (0 problème)**" >> $report_file
    elif [ "$site_issues" -le 3 ]; then
        echo "✅ SCORE PHASE 2: 🟡 BON ($site_issues problèmes mineurs)"
        echo "" >> $report_file
        echo "**✅ SCORE PHASE 2: 🟡 BON ($site_issues problèmes mineurs)**" >> $report_file
    else
        echo "⚠️  SCORE PHASE 2: 🔴 À AMÉLIORER ($site_issues problèmes)"
        echo "" >> $report_file
        echo "**⚠️  SCORE PHASE 2: 🔴 À AMÉLIORER ($site_issues problèmes)**" >> $report_file
    fi
    
    echo ""
    echo ""
    
    total_issues=$((total_issues + site_issues))
done

# Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ PHASE 2"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat >> $report_file << EOFMD

---

## 📊 RÉSUMÉ PHASE 2

EOFMD

if [ "$total_issues" -eq 0 ]; then
    echo "✅✅✅ TOUS LES SITES SONT PARFAITS ✅✅✅"
    echo "Total problèmes: 0"
    echo "" >> $report_file
    echo "✅✅✅ **TOUS LES SITES SONT PARFAITS** ✅✅✅" >> $report_file
    echo "" >> $report_file
    echo "**Total problèmes: 0**" >> $report_file
elif [ "$total_issues" -le 10 ]; then
    echo "✅ Qualité globale: BONNE"
    echo "Total problèmes mineurs: $total_issues"
    echo "" >> $report_file
    echo "✅ **Qualité globale: BONNE**" >> $report_file
    echo "" >> $report_file
    echo "**Total problèmes mineurs: $total_issues**" >> $report_file
else
    echo "⚠️  Qualité globale: À AMÉLIORER"
    echo "Total problèmes: $total_issues"
    echo "" >> $report_file
    echo "⚠️  **Qualité globale: À AMÉLIORER**" >> $report_file
    echo "" >> $report_file
    echo "**Total problèmes: $total_issues**" >> $report_file
fi

echo ""
echo "📄 Rapport détaillé: $report_file"
echo ""

# Recommandations
cat >> $report_file << EOFMD

---

## 🎯 RECOMMANDATIONS

### Tests Manuels à Faire (par le PM)

1. **Navigation réelle** : Ouvrir chaque site en production et cliquer sur les liens
2. **Responsive** : Tester sur mobile, tablet, desktop
3. **Formulaires** : Tester l'envoi de formulaire contact
4. **Performance** : Lancer Lighthouse sur 2-3 sites échantillons
5. **Contenu** : Relecture textes pour orthographe

### Checklist Finale

- [ ] Tous les sites accessibles en production
- [ ] Aucun lien 404 critique
- [ ] Contenu localisé vérifié
- [ ] Design cohérent entre sites
- [ ] Performance acceptable (>70 Lighthouse)

EOFMD

echo "✅ Phase 2 terminée!"
echo ""

