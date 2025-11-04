#!/bin/bash
# 💾 Commit .cursor/ Safe - Commit sécurisé avec protections anti-modifications accidentelles
#
# Usage:
#   ./tools/tasks/scripts/commit-cursor-safe.sh
#   ou: bash tools/tasks/scripts/commit-cursor-safe.sh
#
# Contexte:
#   Ce script est utilisé à l'ÉTAPE 8 du workflow "Cursor, clean tasks"
#   Il sécurise SEULEMENT la partie commit/push (pas le logging/documentation)
#
# Date: 2025-11-04
# Auteur: Guillaume + Cursor

set -e  # Stop on error

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧹 CLEAN TASKS - Workflow Sécurisé${NC}"
echo "=================================="
echo ""

# ÉTAPE 1 : Vérification état git AVANT toute chose
echo -e "${YELLOW}🔍 Vérification état git...${NC}"
echo ""

# Vérifier s'il y a des modifications non staged
UNSTAGED_FILES=$(git status --porcelain | grep "^ M" | wc -l | xargs)
UNTRACKED_FILES=$(git status --porcelain | grep "^??" | wc -l | xargs)
STAGED_FILES=$(git status --porcelain | grep "^M" | wc -l | xargs)

# Vérifier s'il y a des modifications HORS .cursor/
NON_CURSOR_MODS=$(git status --porcelain | grep -v "^\s*M\s*.cursor/" | grep -v "^??" | wc -l | xargs)

if [[ $NON_CURSOR_MODS -gt 0 ]]; then
  echo -e "${RED}⚠️  ATTENTION : Modifications détectées HORS .cursor/${NC}"
  echo ""
  echo "Fichiers modifiés hors .cursor/ :"
  git status --porcelain | grep -v "^\s*M\s*.cursor/" | grep -v "^??"
  echo ""
  echo -e "${YELLOW}Ces modifications NE DOIVENT PAS être incluses dans le commit cleaning.${NC}"
  echo ""
  
  read -p "Veux-tu STASHER ces modifications pour les traiter plus tard ? (y/n) " -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${BLUE}💾 Sauvegarde des modifications hors .cursor/...${NC}"
    
    # Stasher SEULEMENT les fichiers non .cursor/
    # On va utiliser une approche différente : stasher tout puis réappliquer .cursor/
    git stash push -m "WIP: Sauvegarde avant clean-tasks ($(date '+%Y-%m-%d %H:%M'))"
    
    echo -e "${GREEN}✅ Modifications sauvegardées dans stash${NC}"
    echo "   Tu pourras les récupérer plus tard avec: git stash pop"
    echo ""
  else
    echo ""
    echo -e "${RED}❌ Annulation du clean-tasks${NC}"
    echo "   Raison: Risque de commiter des modifications non voulues"
    echo ""
    echo "Options:"
    echo "  1. Commit manuellement les modifs hors .cursor/ d'abord"
    echo "  2. Stasher manuellement: git stash"
    echo "  3. Relancer ce script"
    exit 1
  fi
fi

echo -e "${GREEN}✅ Aucune modification hors .cursor/ détectée${NC}"
echo ""

# ÉTAPE 2 : Identifier les fichiers .cursor/ modifiés
echo -e "${BLUE}📝 Fichiers .cursor/ modifiés :${NC}"
echo ""

CURSOR_MODS=$(git status --porcelain .cursor/ | wc -l | xargs)

if [[ $CURSOR_MODS -eq 0 ]]; then
  echo "   Aucun fichier .cursor/ modifié."
  echo ""
  read -p "Continuer quand même ? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Annulé."
    exit 0
  fi
else
  git status --short .cursor/
  echo ""
fi

# ÉTAPE 3 : Staging SEULEMENT .cursor/
echo -e "${YELLOW}📦 Staging SEULEMENT les fichiers .cursor/...${NC}"

git add .cursor/

echo -e "${GREEN}✅ Fichiers .cursor/ staged${NC}"
echo ""

# ÉTAPE 4 : Vérification AVANT commit
echo -e "${BLUE}🔍 Vérification des fichiers qui seront commités...${NC}"
echo ""

STAGED_COUNT=$(git diff --cached --name-only | wc -l | xargs)

if [[ $STAGED_COUNT -eq 0 ]]; then
  echo "   Aucun fichier staged."
  echo ""
  echo "Annulé (rien à commiter)."
  exit 0
fi

echo "Fichiers qui seront commités ($STAGED_COUNT fichiers) :"
git diff --cached --name-only
echo ""

# Vérifier qu'il n'y a QUE des fichiers .cursor/
NON_CURSOR_STAGED=$(git diff --cached --name-only | grep -v "^\.cursor/" | wc -l | xargs)

if [[ $NON_CURSOR_STAGED -gt 0 ]]; then
  echo -e "${RED}🚨 ERREUR CRITIQUE : Des fichiers NON .cursor/ sont staged !${NC}"
  echo ""
  git diff --cached --name-only | grep -v "^\.cursor/"
  echo ""
  echo "Ceci ne devrait JAMAIS arriver dans un commit cleaning."
  echo ""
  read -p "Veux-tu UNSTAGE ces fichiers ? (RECOMMANDÉ) (y/n) " -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Unstage tout sauf .cursor/
    git diff --cached --name-only | grep -v "^\.cursor/" | xargs git reset HEAD --
    echo -e "${GREEN}✅ Fichiers non .cursor/ unstaged${NC}"
    echo ""
  else
    echo -e "${RED}❌ Annulation du commit${NC}"
    exit 1
  fi
fi

# ÉTAPE 5 : Aperçu des changements
echo -e "${YELLOW}📊 Aperçu des changements (lignes modifiées) :${NC}"
echo ""
git diff --cached --stat .cursor/
echo ""

# ÉTAPE 6 : Confirmation commit
echo -e "${BLUE}💬 Message de commit suggéré :${NC}"
echo ""

# Détecter automatiquement le type de changement
if git diff --cached --name-only | grep -q "DONE.md"; then
  COMMIT_TYPE="docs: Archive tâches finalisées"
elif git diff --cached --name-only | grep -q "TODO-"; then
  COMMIT_TYPE="docs: MAJ TODO"
elif git diff --cached --name-only | grep -q "BACKLOG.md"; then
  COMMIT_TYPE="docs: MAJ BACKLOG"
else
  COMMIT_TYPE="docs: Clean tasks documentation"
fi

echo "   $COMMIT_TYPE ($(date '+%d/%m/%Y'))"
echo ""

read -p "Commiter ces changements ? (y/n) " -n 1 -r
echo
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  # Demander un message custom ou utiliser le suggéré
  echo "Message de commit :"
  echo "  1. Utiliser le message suggéré"
  echo "  2. Écrire un message personnalisé"
  echo ""
  read -p "Choix (1/2) : " -n 1 -r COMMIT_CHOICE
  echo
  echo ""
  
  if [[ $COMMIT_CHOICE == "2" ]]; then
    read -p "Message de commit : " CUSTOM_MESSAGE
    COMMIT_MSG="$CUSTOM_MESSAGE"
  else
    COMMIT_MSG="$COMMIT_TYPE"
  fi
  
  # Commit
  git commit -m "$COMMIT_MSG"
  
  echo ""
  echo -e "${GREEN}✅ Commit créé avec succès${NC}"
  echo ""
  
  # ÉTAPE 7 : Push (optionnel)
  read -p "Push vers origin/main ? (y/n) " -n 1 -r
  echo
  echo ""
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin main
    echo ""
    echo -e "${GREEN}✅ Push réussi !${NC}"
  else
    echo "Commit local créé, push annulé."
  fi
  
else
  echo -e "${YELLOW}Commit annulé${NC}"
  echo ""
  echo "Les fichiers restent staged. Options:"
  echo "  - Pour unstage: git reset HEAD .cursor/"
  echo "  - Pour voir les changements: git diff --cached"
  exit 0
fi

echo ""
echo -e "${GREEN}🎉 CLEAN TASKS TERMINÉ${NC}"
echo ""

# Vérifier s'il y a un stash
STASH_COUNT=$(git stash list | wc -l | xargs)
if [[ $STASH_COUNT -gt 0 ]]; then
  echo -e "${YELLOW}💡 Rappel : Tu as des modifications stashées${NC}"
  echo "   Pour les récupérer: git stash pop"
  echo ""
fi

# Afficher l'état final
echo -e "${BLUE}📊 État git final :${NC}"
git status --short
echo ""

