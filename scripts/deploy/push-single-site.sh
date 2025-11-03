#!/bin/bash

# Script pour pousser UN SEUL site vers son repo GitHub individuel
# Usage: ./scripts/deploy/push-single-site.sh nice

set -e

# Vérifier qu'un site est fourni
if [ -z "$1" ]; then
  echo "❌ ERREUR: Vous devez spécifier un site"
  echo ""
  echo "Usage: ./scripts/deploy/push-single-site.sh <ville>"
  echo ""
  echo "Villes disponibles:"
  echo "  nice, lille, lyon, marseille, toulouse, bordeaux,"
  echo "  nantes, strasbourg, rouen, rennes, montpellier"
  echo ""
  exit 1
fi

SITE=$1

# Vérifier que le dossier existe
if [ ! -d "sites/$SITE" ]; then
  echo "❌ ERREUR: Le dossier sites/$SITE n'existe pas"
  exit 1
fi

# Vérifier que c'est un repo Git
if [ ! -d "sites/$SITE/.git" ]; then
  echo "❌ ERREUR: sites/$SITE n'a pas de repo Git"
  echo "   Initialiser d'abord avec: cd sites/$SITE && git init"
  exit 1
fi

echo "🚀 PUSH SITE: $SITE"
echo "═══════════════════════════════════════"
echo ""

# Aller dans le dossier du site
cd "sites/$SITE"

# Vérifier s'il y a des changements
if git diff --quiet && git diff --cached --quiet; then
  echo "ℹ️  Aucun changement à committer pour $SITE"
  echo ""
else
  # Afficher les fichiers modifiés
  echo "📝 Fichiers modifiés:"
  git status --short
  echo ""
  
  # Ajouter tous les fichiers
  git add -A
  
  # Demander confirmation du commit
  echo "💬 Message de commit (ou Enter pour message auto):"
  read -r COMMIT_MSG
  
  if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="feat: Mise à jour $SITE - $(date '+%Y-%m-%d %H:%M')"
  fi
  
  # Commit
  git commit -m "$COMMIT_MSG"
  echo "✅ Commit créé"
  echo ""
fi

# Push vers le repo individuel
echo "📤 Push vers GitHub (dd-$SITE)..."
git push origin main

echo ""
echo "═══════════════════════════════════════"
echo "✅ SITE $SITE POUSSÉ SUR GITHUB !"
echo ""
echo "🔗 Repo: https://github.com/gdetaisne/dd-$SITE"
echo "🚀 CapRover va déployer automatiquement (~3-5min)"
echo "📊 Monitoring: https://captain.moverz.fr"
echo ""

