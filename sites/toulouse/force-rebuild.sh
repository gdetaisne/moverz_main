#!/bin/bash
SITE=$1
echo "🔄 FORCE REBUILD: $SITE"
echo "FORCE REBUILD $(date +%s) - $(date)" > force-rebuild-$(date +%s).txt
git add force-rebuild-*.txt
git commit -m "🔄 FORCE REBUILD $SITE - $(date)"
git push
echo "🎯 REBUILD DÉCLENCHÉ !"
