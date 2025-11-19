#!/bin/bash

# Script pour pousser le monorepo principal vers GitHub
# Usage: ./scripts/deploy/push-main.sh

set -e

echo "🚀 PUSH MONOREPO PRINCIPAL"
echo "=========================="
echo ""

# Vérifier s'il y a des changements dans le working tree
if git diff --quiet && git diff --cached --quiet; then
  echo "✅ Aucun changement à committer"
  echo ""
  echo "📤 Push vers origin main (s'assurer que les commits locaux sont bien sur GitHub)..."
  git push origin main
  echo ""
  echo "ℹ️  Push effectué (si des commits locaux étaient en avance sur origin)."
  exit 0
fi

# Afficher les fichiers modifiés
echo "📝 Fichiers modifiés :"
git status --short
echo ""

# Ajouter tous les fichiers
git add -A

# Message de commit auto
COMMIT_MSG="feat: Update $(date '+%Y-%m-%d %H:%M')"

echo "💬 Message de commit : $COMMIT_MSG"
echo ""

# Commit
git commit -m "$COMMIT_MSG"

echo "✅ Commit créé"
echo ""

# Push vers GitHub
echo "📤 Push vers origin main..."
git push origin main

echo ""
echo "═══════════════════════════════════════"
echo "✅ MONOREPO PRINCIPAL POUSSÉ SUR GITHUB"
echo ""
echo "🔗 Repo: https://github.com/gdetaisne/moverz_main"
echo ""

