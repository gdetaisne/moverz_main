#!/bin/bash

# Script de vérification du maillage interne - Site Rennes
# Usage: ./verify-maillage-rennes.sh

echo "╔════════════════════════════════════════════════╗"
echo "║   AUDIT MAILLAGE INTERNE - RENNES             ║"
echo "║   Date: $(date +%Y-%m-%d)                        ║"
echo "╚════════════════════════════════════════════════╝"
echo

# Définir le répertoire du site
SITE_DIR="/Users/guillaumestehelin/moverz_main/sites/rennes"
BLOG_DIR="$SITE_DIR/content/blog"
SATELLITES_DIR="$BLOG_DIR/satellites"
PILIERS_DIR="$BLOG_DIR/demenagement-rennes"
GARDE_MEUBLE_DIR="$BLOG_DIR/garde-meuble-rennes"

# Vérifier l'existence des répertoires
if [ ! -d "$SATELLITES_DIR" ]; then
  echo "❌ Erreur: Répertoire satellites introuvable"
  exit 1
fi

echo "═══════════════════════════════════════════════════"
echo "📊 1. STATISTIQUES GLOBALES"
echo "═══════════════════════════════════════════════════"
echo

# Compter articles
nb_satellites=$(find "$SATELLITES_DIR" -name "*.md" | wc -l | tr -d ' ')
nb_piliers_dem=$(find "$PILIERS_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
nb_piliers_gm=$(find "$GARDE_MEUBLE_DIR" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
nb_piliers=$((nb_piliers_dem + nb_piliers_gm))
total_articles=$((nb_satellites + nb_piliers))

echo "📁 Articles inventoriés:"
echo "   - Satellites:        $nb_satellites"
echo "   - Piliers:           $nb_piliers"
echo "   - TOTAL:             $total_articles"
echo

# Compter liens totaux
total_liens=$(grep -r "](/blog/" "$BLOG_DIR" 2>/dev/null | wc -l | tr -d ' ')
liens_satellites=$(grep -r "](/blog/" "$SATELLITES_DIR" 2>/dev/null | wc -l | tr -d ' ')
liens_piliers=$(grep -r "](/blog/" "$PILIERS_DIR" "$GARDE_MEUBLE_DIR" 2>/dev/null | wc -l | tr -d ' ')

echo "🔗 Liens internes détectés:"
echo "   - Dans satellites:   $liens_satellites"
echo "   - Dans piliers:      $liens_piliers"
echo "   - TOTAL:             $total_liens"
echo

# Calculer ratio
if [ $total_articles -gt 0 ]; then
  ratio=$(echo "scale=2; $total_liens / $total_articles" | bc)
  echo "📊 Ratio liens/article: $ratio"
  
  # Objectif
  objectif=360
  progression=$(echo "scale=1; $total_liens * 100 / $objectif" | bc)
  echo "🎯 Objectif:            $objectif liens"
  echo "📈 Progression:         $progression%"
else
  echo "📊 Ratio: N/A"
fi

echo
echo "═══════════════════════════════════════════════════"
echo "📋 2. ANALYSE PAR COCON"
echo "═══════════════════════════════════════════════════"
echo

# Fonction pour compter satellites et liens par catégorie
analyze_cocon() {
  local category=$1
  local pilier_name=$2
  
  # Compter satellites de cette catégorie
  local count=$(grep -l "category: \"$category\"" "$SATELLITES_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
  
  if [ $count -gt 0 ]; then
    # Compter liens dans ces satellites
    local liens=0
    for file in $(grep -l "category: \"$category\"" "$SATELLITES_DIR"/*.md 2>/dev/null); do
      local file_liens=$(grep -c "](/blog/" "$file" 2>/dev/null)
      liens=$((liens + file_liens))
    done
    
    # Calculer moyenne
    local moyenne=0
    if [ $count -gt 0 ]; then
      moyenne=$(echo "scale=1; $liens / $count" | bc)
    fi
    
    # Afficher
    printf "%-35s %3s satellites | %4s liens | %4s moy\n" "$pilier_name" "$count" "$liens" "$moyenne"
    
    # Verdict
    if [ $(echo "$moyenne >= 3" | bc) -eq 1 ]; then
      echo "   ✅ Maillage conforme (≥3 liens/article)"
    elif [ $(echo "$moyenne >= 2" | bc) -eq 1 ]; then
      echo "   ⚠️  Maillage moyen (2-3 liens/article)"
    elif [ $(echo "$moyenne > 0" | bc) -eq 1 ]; then
      echo "   ❌ Maillage insuffisant (<2 liens/article)"
    else
      echo "   ❌ Aucun maillage détecté"
    fi
    echo
  fi
}

analyze_cocon "demenageur-rennes" "Déménageur Rennes"
analyze_cocon "demenagement-piano-rennes" "Déménagement Piano"
analyze_cocon "location-camion-rennes" "Location Camion"
analyze_cocon "demenageur-rennes-prix" "Prix Déménageur"
analyze_cocon "garde-meuble-rennes" "Garde-Meuble"
analyze_cocon "demenagement-pas-cher-rennes" "Déménagement Pas Cher"
analyze_cocon "demenagement-international-rennes" "International"
analyze_cocon "aide-demenagement-rennes" "Aide Déménagement"
analyze_cocon "petit-demenagement-rennes" "Petit Déménagement"
analyze_cocon "demenagement-entreprise-rennes" "Entreprise"

echo "═══════════════════════════════════════════════════"
echo "⚠️  3. SATELLITES SOUS-MAILLÉS (<2 liens)"
echo "═══════════════════════════════════════════════════"
echo

# Lister satellites avec moins de 2 liens
sous_mailles=0
for file in "$SATELLITES_DIR"/*.md; do
  count=$(grep -c "](/blog/" "$file" 2>/dev/null)
  if [ $count -lt 2 ]; then
    sous_mailles=$((sous_mailles + 1))
    basename_file=$(basename "$file")
    printf "   %-50s %s lien(s)\n" "$basename_file" "$count"
  fi
done

if [ $sous_mailles -eq 0 ]; then
  echo "   ✅ Tous les satellites ont au moins 2 liens"
else
  echo
  echo "   ⚠️  $sous_mailles satellites sous-maillés détectés"
fi

echo
echo "═══════════════════════════════════════════════════"
echo "🔍 4. ANALYSE PILIERS"
echo "═══════════════════════════════════════════════════"
echo

# Analyser chaque pilier
for pilier_dir in "$PILIERS_DIR" "$GARDE_MEUBLE_DIR"; do
  if [ -d "$pilier_dir" ]; then
    for file in "$pilier_dir"/*.md; do
      if [ -f "$file" ]; then
        basename_file=$(basename "$file" .md)
        count=$(grep -c "](/blog/" "$file" 2>/dev/null)
        printf "%-45s %3s liens\n" "$basename_file" "$count"
        
        if [ $count -ge 10 ]; then
          echo "   ✅ Maillage riche (≥10 liens vers satellites)"
        elif [ $count -ge 5 ]; then
          echo "   ⚠️  Maillage partiel (5-10 liens)"
        elif [ $count -gt 0 ]; then
          echo "   ❌ Maillage insuffisant (<5 liens)"
        else
          echo "   ❌ Aucun lien détecté"
        fi
        echo
      fi
    done
  fi
done

echo "═══════════════════════════════════════════════════"
echo "🔗 5. VÉRIFICATION LIENS CASSÉS (échantillon)"
echo "═══════════════════════════════════════════════════"
echo

# Extraire quelques URLs uniques
temp_liens=$(mktemp)
grep -rh "](/blog/" "$BLOG_DIR" 2>/dev/null | \
  grep -o "](/blog/[^)]*)" | \
  sed 's/](//' | sed 's/)//' | \
  sort -u | head -20 > "$temp_liens"

liens_casses=0
while IFS= read -r url; do
  # Construire chemin fichier
  file_path="$SITE_DIR/content$url.md"
  
  if [ ! -f "$file_path" ]; then
    echo "   ❌ Lien cassé: $url"
    liens_casses=$((liens_casses + 1))
  fi
done < "$temp_liens"

rm "$temp_liens"

if [ $liens_casses -eq 0 ]; then
  echo "   ✅ Aucun lien cassé détecté (échantillon 20 URLs)"
else
  echo
  echo "   ⚠️  $liens_casses lien(s) cassé(s) détecté(s)"
fi

echo
echo "═══════════════════════════════════════════════════"
echo "📊 6. RÉSUMÉ ET RECOMMANDATIONS"
echo "═══════════════════════════════════════════════════"
echo

# Calcul état global
if [ $total_liens -ge 360 ]; then
  etat="✅ EXCELLENT"
  reco="Maintenir la qualité du maillage et continuer le monitoring."
elif [ $total_liens -ge 180 ]; then
  etat="⚠️  BON (en progression)"
  reco="Compléter le maillage des cocons restants pour atteindre 360+ liens."
elif [ $total_liens -ge 100 ]; then
  etat="⚠️  MOYEN"
  reco="Accélérer le retrofit. Prioriser cocons à fort trafic (Déménageur, Prix)."
elif [ $total_liens -gt 0 ]; then
  etat="❌ INSUFFISANT"
  reco="Retrofit urgent nécessaire sur tous les satellites."
else
  etat="❌ CRITIQUE (aucun maillage)"
  reco="Démarrer immédiatement le retrofit selon plan PLAN-MAILLAGE-RENNES-2025.md"
fi

echo "État actuel:      $etat"
echo "Total liens:      $total_liens / 360 objectif"
echo "Ratio moyen:      $ratio liens/article (objectif: 3.5)"
echo
echo "Recommandation:"
echo "   $reco"

echo
echo "═══════════════════════════════════════════════════"
echo "✅ Audit terminé"
echo "═══════════════════════════════════════════════════"
echo
echo "Pour plus de détails, consultez: PLAN-MAILLAGE-RENNES-2025.md"
echo

