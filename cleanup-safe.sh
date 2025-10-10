#!/bin/bash
set -euo pipefail

# ========= PARAMETERS =========
BRANCH_BASE="${BRANCH_BASE:-main}"
NEW_BRANCH="chore/cleanup-$(date +%Y-%m-%d)"
BACKUP_TAG="backup/cleanup-$(date +%Y-%m-%d_%H%M%S)"
BACKUP_TAR="backup_cleanup_$(date +%Y-%m-%d_%H%M%S).tar.gz"
DOCS_DIR="docs"
SCRIPTS_DIR="scripts"
DRY_RUN="${DO_CLEAN:-0}"
# ==============================

say() { printf "\033[1;36m%s\033[0m\n" "$*"; }
warn(){ printf "\033[1;33m%s\033[0m\n" "$*"; }
err() { printf "\033[1;31m%s\033[0m\n" "$*"; }

require_git_clean_or_stash() {
  if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    err "❌ Pas un repo Git. Abandon."
    exit 1
  fi
  if ! git diff --quiet || ! git diff --cached --quiet; then
    warn "⚠️  Working tree sale. Je stash les changements non commités pour sécurité."
    git stash push -u -m "pre-cleanup-stash $(date +%F-%H%M%S)" >/dev/null || true
  fi
}

detect_branch() {
  current="$(git rev-parse --abbrev-ref HEAD)"
  say "🌿 Branche courante : ${current}"
  if [ "$current" != "$BRANCH_BASE" ]; then
    warn "↪️  Je me place sur ${BRANCH_BASE} (pull --ff-only)."
    git checkout "$BRANCH_BASE" >/dev/null
  fi
  git pull --ff-only >/dev/null || true
}

plan_find() {
  PURGE_DIRS=()
  while IFS= read -r -d '' file; do
    if [[ "$file" =~ (\.next|node_modules|\.turbo|coverage|\.cache)(/|$) ]]; then
      PURGE_DIRS+=("$file")
    fi
  done < <(git ls-files -z --others --ignored --exclude-standard 2>/dev/null || true)
  
  ROOT_DOCS=()
  for f in *.md; do
    [[ -f "$f" ]] || continue
    case "$f" in
      README.md|CONTRIBUTING.md|COMPTE_RENDU_COMPLET_PROJET.md|RESUME_EXECUTIF_POUR_CHATGPT.md)
        ;;
      *)
        ROOT_DOCS+=("$f")
        ;;
    esac
  done
  
  ROOT_SCRIPTS=()
  for s in *.sh *.js; do
    [[ -f "$s" ]] || continue
    case "$s" in
      cleanup-safe.sh)
        ;;
      *.sh|*.js)
        if [[ "$s" =~ ^(audit|fix|deploy|redeploy|generate|create|verify|push|duplicate|webhook).*\.(sh|js)$ ]]; then
          ROOT_SCRIPTS+=("$s")
        fi
        ;;
    esac
  done

  echo "${#PURGE_DIRS[@]}|${#ROOT_DOCS[@]}|${#ROOT_SCRIPTS[@]}"
}

make_backup() {
  say "🛟 Backup : tag ${BACKUP_TAG} + archive ${BACKUP_TAR}"
  git tag -a "${BACKUP_TAG}" -m "Backup before cleanup"
  tar --exclude="./**/.next" --exclude="./**/node_modules" --exclude="./**/.turbo" -czf "${BACKUP_TAR}" .
}

create_branch() {
  say "🌱 Nouvelle branche : ${NEW_BRANCH}"
  git checkout -b "${NEW_BRANCH}" >/dev/null
}

ensure_dirs() {
  mkdir -p "${DOCS_DIR}/archives" "${SCRIPTS_DIR}/"{audit,deploy,fix,generate}
}

merge_gitignore() {
  say "🧾 Mise à jour .gitignore"
  cat > .gitignore.clean.$$ << 'EOF'
# --- Moverz canonical ignore ---
# Node/Next
node_modules/
.next/
.turbo/
dist/
coverage/
.cache/
# Env / tooling
.env
.env.*
!.env.example
.DS_Store
.cursorrules
.cursor/
# Logs
npm-debug.log*
yarn-error.log*
pnpm-debug.log*
# Build outputs
out/
# Editor
.vscode/
.idea/
# Backups
backup_*.tar.gz
EOF
  if [ -f .gitignore ]; then
    sort -u <(cat .gitignore .gitignore.clean.$$) > .gitignore.merged.$$
    mv .gitignore.merged.$$ .gitignore
    rm -f .gitignore.clean.$$
  else
    mv .gitignore.clean.$$ .gitignore
  fi
}

move_docs() {
  shopt -s nullglob
  local moved=0
  for f in "${ROOT_DOCS[@]}"; do
    [[ -f "$f" ]] || continue
    mv "$f" "${DOCS_DIR}/archives/$f"
    moved=$((moved+1))
  done
  
  if [ ! -f "${DOCS_DIR}/README.md" ]; then
    cat > "${DOCS_DIR}/README.md" << 'MD'
# 📚 Documentation Moverz

## Documents Principaux (racine)
- **README.md** — Vue d'ensemble du projet
- **COMPTE_RENDU_COMPLET_PROJET.md** — Analyse complète pour assainissement

## Archives
Les anciens rapports et notes sont dans `archives/` :
- Rapports d'audit (AUDIT_*.md)
- Guides de déploiement (GUIDE_*.md)
- Rapports de statut (RAPPORT_*.md, STATUS_*.md)
- Documentations SEO et corrections

## Scripts
Voir le dossier `scripts/` à la racine, organisé par fonction :
- `scripts/audit/` — Scripts d'audit
- `scripts/deploy/` — Scripts de déploiement
- `scripts/fix/` — Scripts de correction
- `scripts/generate/` — Scripts de génération
MD
  fi
  echo "$moved"
}

move_scripts() {
  shopt -s nullglob
  local moved=0
  for s in "${ROOT_SCRIPTS[@]}"; do
    [[ -f "$s" ]] || continue
    case "$s" in
      *.sh)
        if   [[ "$s" =~ (deploy|redeploy|caprover|webhook) ]]; then 
          mv "$s" "${SCRIPTS_DIR}/deploy/$s"
        elif [[ "$s" =~ (fix|verify|seo|slug|metadata) ]]; then
          mv "$s" "${SCRIPTS_DIR}/fix/$s"
        elif [[ "$s" =~ (audit|status|verification) ]]; then
          mv "$s" "${SCRIPTS_DIR}/audit/$s"
        elif [[ "$s" =~ (create|generate|duplicate) ]]; then
          mv "$s" "${SCRIPTS_DIR}/generate/$s"
        else 
          mv "$s" "${SCRIPTS_DIR}/$s"
        fi
        moved=$((moved+1))
        ;;
      *.js)
        if   [[ "$s" =~ (deploy|caprover|webhook|verify-caprover) ]]; then
          mv "$s" "${SCRIPTS_DIR}/deploy/$s"
        elif [[ "$s" =~ (fix|seo|slug|metadata) ]]; then
          mv "$s" "${SCRIPTS_DIR}/fix/$s"
        elif [[ "$s" =~ (audit|status) ]]; then
          mv "$s" "${SCRIPTS_DIR}/audit/$s"
        elif [[ "$s" =~ (create|generate) ]]; then
          mv "$s" "${SCRIPTS_DIR}/generate/$s"
        else
          mv "$s" "${SCRIPTS_DIR}/$s"
        fi
        moved=$((moved+1))
        ;;
    esac
  done
  echo "$moved"
}

purge_caches() {
  say "🧽 Purge caches non suivis (node_modules/.next/.turbo/coverage/.cache) — non commitée"
  git clean -ffdX -e "!/sites/**" -e "!/moverz-template/**" \
    -e "!*.md" -e "!scripts/**" -e "!.gitignore" >/dev/null || true
  find . -type d \( -name node_modules -o -name .next -o -name .turbo -o -name coverage -o -name .cache \) -prune -exec rm -rf {} + 2>/dev/null || true
}

commit_if_changes() {
  local msg="$1"
  if ! git diff --quiet || ! git diff --cached --quiet; then
    git add -A
    git commit -m "$msg"
    say "✅ Commit: $msg"
  else
    say "ℹ️  Rien à commit pour: $msg"
  fi
}

# ---------- MAIN ----------
say "🔎 Analyse du projet Moverz…"
require_git_clean_or_stash
detect_branch
read CNT_PURGE CNT_DOCS CNT_SCRIPTS < <(plan_find | awk -F"|" '{print $1, $2, $3}')

say "📊 Récap (dry-run=${DRY_RUN})"
printf "  • Dossiers caches détectés : %d\n" "${CNT_PURGE}"
printf "  • Docs .md à déplacer      : %d\n" "${CNT_DOCS}"
printf "  • Scripts à ranger         : %d\n" "${CNT_SCRIPTS}"

if [ "$DRY_RUN" -eq 0 ]; then
  warn ""
  warn "📋 DRY-RUN TERMINÉ"
  warn ""
  warn "Actions prévues :"
  warn "  1. Tag Git : ${BACKUP_TAG}"
  warn "  2. Archive : ${BACKUP_TAR}"
  warn "  3. Branche : ${NEW_BRANCH}"
  warn "  4. Déplacer ${CNT_DOCS} docs → docs/archives/"
  warn "  5. Ranger ${CNT_SCRIPTS} scripts → scripts/*/"
  warn "  6. Purger ~${CNT_PURGE} dossiers caches"
  warn "  7. Normaliser .gitignore"
  warn ""
  warn "Pour appliquer : DO_CLEAN=1 bash cleanup-safe.sh"
  exit 0
fi

say ""
say "🚀 EXÉCUTION RÉELLE"
say ""
make_backup
create_branch
ensure_dirs
merge_gitignore
commit_if_changes "chore(repo): normalize .gitignore (canonical ignores)"

moved_docs=$(move_docs)
commit_if_changes "docs(repo): consolidate ${moved_docs} docs into docs/ (+index)"

moved_scripts=$(move_scripts)
commit_if_changes "chore(scripts): reorganize ${moved_scripts} scripts into scripts/{audit,deploy,fix,generate}"

purge_caches
say "🧩 Fin de purge caches (non commitée)."

say ""
say "✅ NETTOYAGE TERMINÉ"
say ""
say "🔐 Tag backup   : ${BACKUP_TAG}"
say "📦 Archive      : ${BACKUP_TAR}"
say "🌿 Branche      : ${NEW_BRANCH}"
say ""
say "📝 Prochaines étapes :"
say "  1. Review les changements : git log --oneline"
say "  2. Vérifier : git status"
say "  3. Push : git push origin ${NEW_BRANCH}"
say ""
say "🔄 Pour revenir en arrière :"
say "  git checkout main && git branch -D ${NEW_BRANCH}"
say "  git tag -d ${BACKUP_TAG}"
say ""

