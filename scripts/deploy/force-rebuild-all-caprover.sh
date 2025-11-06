#!/bin/bash

# Script pour forcer le rebuild de tous les sites CapRover via CLI
# Usage: ./scripts/deploy/force-rebuild-all-caprover.sh [--yes]

set -e

SKIP_CONFIRM=false
if [[ "$1" == "--yes" ]] || [[ "$1" == "-y" ]]; then
  SKIP_CONFIRM=true
fi

CAPROVER_URL="${CAPROVER_URL:-https://captain.gslv.cloud}"
CAPROVER_NAME="${CAPROVER_NAME:-captain-01}"

echo "🚀 FORCE REBUILD TOUS LES SITES CAPROVER"
echo "=========================================="
echo ""

# Vérifier si caprover CLI est installé
if ! command -v caprover &> /dev/null; then
  echo "❌ CapRover CLI non installé"
  echo "   Installation: npm install -g caprover"
  exit 1
fi

# Vérifier la connexion
echo "🔍 Vérification connexion CapRover..."
echo ""

if ! caprover list | grep -q "$CAPROVER_NAME"; then
  echo "⚠️  Pas connecté à $CAPROVER_NAME"
  echo ""
  echo "📋 Connexion requise..."
  echo "   Exécute: caprover login -h $CAPROVER_URL -n $CAPROVER_NAME"
  echo ""
  echo "   OU si ton URL est différente:"
  echo "   caprover login -h <ton-url-caprover> -n $CAPROVER_NAME"
  exit 1
fi

CONNECTED_INFO=$(caprover list 2>&1 | grep ">>" || echo "")
if [ -z "$CONNECTED_INFO" ]; then
  echo "⚠️  Connexion non détectée"
  echo "   Exécute: caprover login -h $CAPROVER_URL -n $CAPROVER_NAME"
  exit 1
fi

echo "✅ Connecté: $CONNECTED_INFO"
echo ""

# Liste des apps à rebuild
# MODIFIABLE : Décommente la section souhaitée

# Option A : Sites modifiés récemment (par défaut)
APPS_TO_REBUILD=(
  "dd-nantes"
  "dd-rennes"
  "dd-lyon"
  "dd-bordeaux"
)

# Option B : Tous les 11 sites déménagement
# APPS_TO_REBUILD=(
#   "dd-marseille"
#   "dd-lyon"
#   "dd-montpellier"
#   "dd-bordeaux"
#   "dd-nantes"
#   "dd-lille"
#   "dd-nice"
#   "dd-strasbourg"
#   "dd-rouen"
#   "dd-rennes"
#   "dd-toulouse"
# )

echo "📦 Apps à rebuild:"
for app in "${APPS_TO_REBUILD[@]}"; do
  echo "   - $app"
done
echo ""

# Confirmation (sauf si --yes)
if [ "$SKIP_CONFIRM" = false ]; then
  read -p "Continuer ? (o/N): " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[OoYy]$ ]]; then
    echo "❌ Annulé"
    exit 1
  fi
else
  echo "⚡ Mode auto (--yes) - Pas de confirmation"
  echo ""
fi

# Fonction pour rebuild une app
rebuild_app() {
  local app_name=$1
  
  echo "📦 Rebuild $app_name..."
  
  # Utiliser curl direct avec l'API (plus fiable que CLI en mode non-interactif)
  # Obtenir le token depuis les credentials stockés localement par CapRover
  # OU utiliser le script alternatif avec mot de passe
  
  # Note: Le CLI caprover a des bugs en mode non-interactif
  # On utilise donc curl avec authentification basique ou le script alternatif
  echo "   ⚠️  CLI CapRover ne fonctionne pas en mode non-interactif"
  echo "   💡 Utilise: ./scripts/deploy/force-rebuild-caprover-direct.sh"
  echo "      OU rebuild manuel depuis le dashboard"
  return 1
}

# Rebuild toutes les apps
SUCCESS=0
FAILED=0

for app in "${APPS_TO_REBUILD[@]}"; do
  if rebuild_app "$app"; then
    ((SUCCESS++))
  else
    ((FAILED++))
  fi
  echo ""
  sleep 1  # Petit délai entre chaque rebuild
done

echo "═══════════════════════════════════════"
echo "✅ Rebuilds déclenchés: $SUCCESS"
if [ $FAILED -gt 0 ]; then
  echo "❌ Échecs: $FAILED"
fi
echo ""
echo "⏱️  Durée estimée : ~3-5 min par app"
echo "📊 Monitoring : $CAPROVER_URL"

