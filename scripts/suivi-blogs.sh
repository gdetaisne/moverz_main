#!/bin/bash

# Script de suivi automatisé de la production de blogs
# Usage: ./scripts/suivi-blogs.sh [--json] [--ville VILLE]

SITES_DIR="/Users/guillaumestehelin/moverz_main-1/sites"
OUTPUT_JSON=false
SPECIFIC_VILLE=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --json)
      OUTPUT_JSON=true
      shift
      ;;
    --ville)
      SPECIFIC_VILLE="$2"
      shift 2
      ;;
    *)
      echo "Usage: $0 [--json] [--ville VILLE]"
      exit 1
      ;;
  esac
done

# Fonction pour compter les articles d'une ville
count_ville() {
  local ville=$1
  local blog_dir="$SITES_DIR/$ville/content/blog"
  
  if [ ! -d "$blog_dir" ]; then
    echo "0:0:0"
    return
  fi
  
  # Compter piliers
  local piliers=$(find "$blog_dir" -maxdepth 2 -name "*.md" ! -path "*/satellites/*" ! -name "README.md" 2>/dev/null | wc -l | xargs)
  
  # Compter satellites
  local satellites=0
  if [ -d "$blog_dir/satellites" ]; then
    satellites=$(find "$blog_dir/satellites" -maxdepth 1 -name "*.md" ! -name "README.md" ! -name "BATCH*.md" 2>/dev/null | wc -l | xargs)
  fi
  
  local total=$((piliers + satellites))
  echo "$piliers:$satellites:$total"
}

# Fonction pour obtenir le statut
get_status() {
  local total=$1
  if [ $total -ge 100 ]; then
    echo "COMPLET"
  elif [ $total -ge 90 ]; then
    echo "QUASI-COMPLET"
  elif [ $total -ge 50 ]; then
    echo "EN_COURS"
  else
    echo "PRIORITAIRE"
  fi
}

# Fonction pour obtenir l'icône de statut
get_status_icon() {
  local total=$1
  if [ $total -ge 100 ]; then
    echo "✅"
  elif [ $total -ge 90 ]; then
    echo "⚠️"
  elif [ $total -ge 50 ]; then
    echo "🔶"
  else
    echo "🔴"
  fi
}

# Fonction pour afficher une barre de progression
progress_bar() {
  local progress=$1
  local width=20
  local filled=$((progress * width / 100))
  
  printf "["
  for i in $(seq 1 $width); do
    if [ $i -le $filled ]; then
      printf "█"
    else
      printf "░"
    fi
  done
  printf "]"
}

# Si ville spécifique demandée
if [ -n "$SPECIFIC_VILLE" ]; then
  result=$(count_ville "$SPECIFIC_VILLE")
  IFS=':' read -r piliers satellites total <<< "$result"
  status=$(get_status $total)
  icon=$(get_status_icon $total)
  
  if [ "$OUTPUT_JSON" = true ]; then
    cat << EOF
{
  "ville": "$SPECIFIC_VILLE",
  "piliers": $piliers,
  "satellites": $satellites,
  "total": $total,
  "objectif": 100,
  "progression": $total,
  "manquant": $((100 - total)),
  "statut": "$status"
}
EOF
  else
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "$icon $(echo ${SPECIFIC_VILLE:0:1} | tr '[:lower:]' '[:upper:]')${SPECIFIC_VILLE:1}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 Piliers: $piliers articles"
    echo "🛰️  Satellites: $satellites articles"
    echo "📈 Total: $total/100 articles ($((total))%)"
    echo "📉 Manquant: $((100 - total)) articles"
    echo "🎯 Statut: $status"
    echo ""
    printf "Progression: "
    progress_bar $total
    printf " %d%%\n" $total
  fi
  exit 0
fi

# Vue d'ensemble de tous les sites
VILLES=(bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse)

if [ "$OUTPUT_JSON" = true ]; then
  # Format JSON
  echo "{"
  echo "  \"date\": \"$(date +%Y-%m-%d)\","
  echo "  \"sites\": ["
  
  first=true
  for ville in "${VILLES[@]}"; do
    result=$(count_ville "$ville")
    IFS=':' read -r piliers satellites total <<< "$result"
    status=$(get_status $total)
    
    if [ "$first" = false ]; then
      echo ","
    fi
    first=false
    
    cat << EOF
    {
      "nom": "$ville",
      "piliers": $piliers,
      "satellites": $satellites,
      "total": $total,
      "progression": $total,
      "statut": "$status",
      "manquant": $((100 - total))
    }
EOF
  done
  
  echo ""
  echo "  ]"
  echo "}"
else
  # Format texte
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║        SUIVI PRODUCTION BLOGS - $(date +%d/%m/%Y)          ║"
  echo "╚════════════════════════════════════════════════════════════╝"
  echo ""
  
  total_global=0
  sites_complets=0
  
  for ville in "${VILLES[@]}"; do
    result=$(count_ville "$ville")
    IFS=':' read -r piliers satellites total <<< "$result"
    status=$(get_status $total)
    icon=$(get_status_icon $total)
    
    total_global=$((total_global + total))
    if [ $total -ge 100 ]; then
      sites_complets=$((sites_complets + 1))
    fi
    
    ville_cap=$(echo ${ville:0:1} | tr '[:lower:]' '[:upper:]')${ville:1}
    printf "%s %-12s │ %3d/100 │ " "$icon" "$ville_cap" "$total"
    progress_bar $total
    printf " │ P:%2d S:%3d\n" "$piliers" "$satellites"
  done
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📊 RÉSUMÉ GLOBAL"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Total articles: $total_global / 1100 ($((total_global * 100 / 1100))%)"
  echo "Sites complets: $sites_complets / 11"
  echo "Articles manquants: $((1100 - total_global))"
  echo ""
  
  # Calcul ETA
  if [ $((1100 - total_global)) -gt 0 ]; then
    jours_restants=$(((1100 - total_global) / 4))
    date_fin=$(date -v+${jours_restants}d +%d/%m/%Y 2>/dev/null || date -d "+${jours_restants} days" +%d/%m/%Y 2>/dev/null || echo "N/A")
    echo "🎯 ETA (4 articles/jour): $jours_restants jours → $date_fin"
  else
    echo "🎉 OBJECTIF ATTEINT !"
  fi
fi

