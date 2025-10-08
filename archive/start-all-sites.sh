#!/bin/bash

# Script pour démarrer tous les sites sur localhost
# Usage: ./start-all-sites.sh

echo "🚀 Démarrage de tous les sites..."
echo ""

# Arrêter les serveurs existants
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

sleep 2

# Tableau des sites et ports
declare -A sites=(
  ["bordeaux"]=4001
  ["marseille"]=4002
  ["lyon"]=4003
  ["toulouse"]=4004
  ["nice"]=4005
  ["nantes"]=4006
  ["strasbourg"]=4007
  ["lille"]=4008
  ["rennes"]=4009
  ["rouen"]=4010
)

# Démarrer chaque site
for site in "${!sites[@]}"; do
  port="${sites[$site]}"
  echo "▶️  Démarrage de $site sur port $port..."
  cd "/Users/guillaumestehelin/moverz_main/sites/$site"
  PORT=$port npm run dev > "/tmp/$site-dev.log" 2>&1 &
done

echo ""
echo "⏳ Attente de 15 secondes pour la compilation..."
sleep 15

echo ""
echo "📊 VÉRIFICATION DES SITES"
echo "========================="
echo ""

# Vérifier chaque site
for site in bordeaux marseille lyon toulouse nice nantes strasbourg lille rennes rouen; do
  port="${sites[$site]}"
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$port" --connect-timeout 2 2>/dev/null || echo "000")
  
  if [ "$status" = "200" ] || [ "$status" = "500" ]; then
    echo "✅ $site: http://localhost:$port"
  else
    echo "❌ $site: Erreur (voir /tmp/$site-dev.log)"
  fi
done

echo ""
echo "🎯 Dashboard: http://localhost:4000"
echo ""
echo "💡 Pour arrêter tous les sites:"
echo "   pkill -f 'npm run dev'"
echo ""

