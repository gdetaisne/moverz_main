#!/bin/bash

# PHASE 1 - OPTION B : Commenter ligne cleanSlug qui retire -ville
# Durée : 30 minutes
# Impact : Résout ~170 URLs (articles existants)

echo "🔧 PHASE 1 : Correction lib/blog.ts (Option B)"
echo "================================================"
echo ""

CITIES=("marseille" "toulouse" "lyon" "bordeaux" "nantes" "lille" "nice" "strasbourg" "rouen" "rennes" "montpellier")

BACKUP_DIR="backups/blog-ts-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Création des backups dans $BACKUP_DIR"
echo ""

for city in "${CITIES[@]}"; do
    BLOG_TS="sites/$city/lib/blog.ts"
    
    if [ ! -f "$BLOG_TS" ]; then
        echo "❌ $city : blog.ts introuvable"
        continue
    fi
    
    echo "📍 Traitement de $city..."
    
    # Backup
    cp "$BLOG_TS" "$BACKUP_DIR/blog-$city.ts.backup"
    echo "   ✅ Backup créé"
    
    # Identifier quelle ville est dans le pattern actuel
    if grep -q "/-${city}\$/.*to: ''" "$BLOG_TS"; then
        CURRENT_PATTERN="${city}"
        echo "   ✅ Pattern correct trouvé: /-${city}\$/"
    elif grep -q "/-bordeaux\$/.*to: ''" "$BLOG_TS"; then
        CURRENT_PATTERN="bordeaux"
        echo "   ⚠️  Pattern incorrect trouvé: /-bordeaux\$/ (devrait être /-${city}\$/)"
    else
        echo "   ⚠️  Aucun pattern de nettoyage ville trouvé"
        CURRENT_PATTERN=""
    fi
    
    if [ -n "$CURRENT_PATTERN" ]; then
        # Commenter la ligne qui retire -ville en fin de slug
        sed -i.tmp "s/{ from: \/-${CURRENT_PATTERN}\$\/, to: '' },/\/\/ { from: \/-${CURRENT_PATTERN}\$\/, to: '' },  \/\/ ✅ Option B: Garder ville dans slug (SEO local)/" "$BLOG_TS"
        rm "${BLOG_TS}.tmp"
        echo "   ✅ Ligne commentée"
        
        # Vérifier que la modification a été faite
        if grep -q "// { from: /-${CURRENT_PATTERN}" "$BLOG_TS"; then
            echo "   ✅ Modification validée"
        else
            echo "   ❌ Échec de la modification"
            # Restaurer backup
            cp "$BACKUP_DIR/blog-$city.ts.backup" "$BLOG_TS"
            echo "   ↩️  Backup restauré"
        fi
    fi
    
    echo ""
done

echo "================================================"
echo "✅ PHASE 1 TERMINÉE"
echo ""
echo "📊 Résumé:"
echo "   • 11 villes traitées"
echo "   • Backups dans: $BACKUP_DIR"
echo "   • Ligne cleanSlug commentée"
echo ""
echo "🔄 Prochaines étapes:"
echo "   1. Redémarrer les serveurs dev (si actifs)"
echo "   2. Tester quelques URLs pour vérifier"
echo "   3. Re-run l'analyse: node scripts/analyze-404.mjs"
echo ""
echo "💡 Rollback si besoin:"
echo "   for city in ${CITIES[@]}; do"
echo "     cp $BACKUP_DIR/blog-\$city.ts.backup sites/\$city/lib/blog.ts"
echo "   done"
echo ""

