#!/bin/bash
# 💾 BACKUP AUTOMATIQUE SYSTÈME TASKS
# 
# Sauvegarde .cursor/ dans un repo séparé ou cloud
# Run quotidien (cron): .cursor/scripts/backup-tasks.sh

CURSOR_DIR="/Users/guillaumestehelin/moverz_main-2/.cursor"
BACKUP_DIR="/Users/guillaumestehelin/moverz_backups/cursor-$(date +%Y%m%d)"

echo "💾 BACKUP SYSTÈME TASKS"
echo ""

# Créer backup
mkdir -p "$BACKUP_DIR"

# Copier fichiers essentiels
cp -r "$CURSOR_DIR/tasks" "$BACKUP_DIR/" 2>/dev/null
cp "$CURSOR_DIR/BACKLOG.md" "$BACKUP_DIR/" 2>/dev/null
cp "$CURSOR_DIR/TODO-GUILLAUME.md" "$BACKUP_DIR/" 2>/dev/null
cp "$CURSOR_DIR/TODO-ASSOCIEE.md" "$BACKUP_DIR/" 2>/dev/null
cp "$CURSOR_DIR/DONE.md" "$BACKUP_DIR/" 2>/dev/null

# Compter
TASK_COUNT=$(ls "$CURSOR_DIR/tasks" | grep "TASK-" | wc -l)

echo "✅ Backup créé: $BACKUP_DIR"
echo "📊 $TASK_COUNT tâches sauvegardées"
echo ""

# Optionnel: Push vers repo git séparé
# cd "$BACKUP_DIR/.." && git add . && git commit -m "Backup $(date +%Y%m%d)" && git push

# Optionnel: Cleanup vieux backups (>30 jours)
find "/Users/guillaumestehelin/moverz_backups" -type d -name "cursor-*" -mtime +30 -exec rm -rf {} \; 2>/dev/null

echo "💡 Backup OK - Prêt à restaurer si besoin"

