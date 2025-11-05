#!/bin/bash

# Script pour pousser le monorepo principal vers GitHub
# Usage: ./scripts/deploy/push-main.sh

set -e

echo "🚀 PUSH MONOREPO PRINCIPAL"
echo "=========================="
echo ""

# Vérifier s'il y a des changements
if git diff --quiet && git diff --cached --quiet; then
  echo "✅ Aucun changement à committer"
  echo ""
  echo "ℹ️  Repo déjà à jour sur GitHub"
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
echo "🔗 Repo: https://github.com/gdetaisne/moverz_main-3"
echo ""

