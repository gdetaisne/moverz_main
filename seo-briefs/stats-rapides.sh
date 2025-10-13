#!/bin/bash

# Script de visualisation rapide des statistiques
# Usage: ./stats-rapides.sh

COMPTEUR_FILE="seo-briefs/COMPTEUR-ARTICLES.md"

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📊 STATISTIQUES RAPIDES - Production Satellites${NC}"
echo "=================================================="

# Extraire le total global
TOTAL_GLOBAL=$(grep "TOTAL :" "$COMPTEUR_FILE" | head -1 | grep -o '[0-9]*/900' | cut -d'/' -f1)
echo -e "${GREEN}🎯 TOTAL GLOBAL: $TOTAL_GLOBAL/900 articles ($(($TOTAL_GLOBAL * 100 / 900))%)${NC}"

echo ""

# Extraire les totaux par ville
echo -e "${YELLOW}📈 PROGRESSION PAR VILLE:${NC}"

for ville in "Lyon" "Marseille" "Montpellier" "Nantes" "Lille" "Nice" "Strasbourg" "Rouen" "Rennes"; do
    TOTAL_VILLE=$(grep "\*\*$ville TOTAL :\*\*" "$COMPTEUR_FILE" | grep -o '[0-9]*/100' | cut -d'/' -f1)
    STATUT=$(grep "\*\*$ville TOTAL :\*\*" "$COMPTEUR_FILE" | grep -o '🔴\|🟡\|🟢\|⚪')
    
    case $STATUT in
        "🟢") echo -e "  $ville: ${GREEN}$TOTAL_VILLE/100 (Complète)${NC}" ;;
        "🟡") echo -e "  $ville: ${YELLOW}$TOTAL_VILLE/100 (En cours)${NC}" ;;
        "🔴") echo -e "  $ville: ${RED}$TOTAL_VILLE/100 (En attente)${NC}" ;;
        "⚪") echo -e "  $ville: $TOTAL_VILLE/100 (Non démarré)" ;;
    esac
done

echo ""

# Extraire la dernière production quotidienne
echo -e "${YELLOW}📅 DERNIÈRE PRODUCTION:${NC}"
LAST_LINE=$(grep -E "^\| [0-9]" "$COMPTEUR_FILE" | tail -1)
if [ ! -z "$LAST_LINE" ]; then
    echo "  $LAST_LINE"
else
    echo "  Aucune production enregistrée"
fi

echo ""

# Calculer la vitesse moyenne (si données disponibles)
echo -e "${YELLOW}⚡ VITESSE DE PRODUCTION:${NC}"
echo "  Objectif: 3 satellites/jour/ville = 9/jour total"
echo "  Actuel: [Calcul automatique à implémenter]"

echo ""

# Prochaine milestone
echo -e "${YELLOW}🎯 PROCHAINE MILESTONE:${NC}"
if [ $TOTAL_GLOBAL -lt 100 ]; then
    echo "  🎉 Premier 100 satellites (Lyon complète)"
elif [ $TOTAL_GLOBAL -lt 300 ]; then
    echo "  🎉 300 satellites (3 villes complètes)"
elif [ $TOTAL_GLOBAL -lt 600 ]; then
    echo "  🎉 600 satellites (6 villes complètes)"
elif [ $TOTAL_GLOBAL -lt 900 ]; then
    echo "  🎉 900 satellites (Mission accomplie!)"
else
    echo "  🎉 MISSION ACCOMPLIE! 900/900 satellites"
fi

echo ""
echo -e "${BLUE}📝 Pour mise à jour: ./update-compteur.sh [ville] [pilier] [satellites] [note]${NC}"
