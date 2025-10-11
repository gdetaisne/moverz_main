#!/bin/bash
# Script de validation des fichiers next.config selon package.json

echo "🔍 Vérification de la cohérence next.config vs package.json..."
echo ""

errors=0

for site in /Users/guillaumestehelin/moverz_main-3/sites/*/; do 
  sitename=$(basename "$site")
  
  # Skip bordeaux-reference
  [ "$sitename" = "bordeaux-reference" ] && continue
  
  if [ -f "$site/package.json" ]; then
    has_type_module=$(grep -c '"type": "module"' "$site/package.json" 2>/dev/null || echo 0)
    
    config_js=""
    config_cjs=""
    config_mjs=""
    
    [ -f "$site/next.config.js" ] && config_js="✓"
    [ -f "$site/next.config.cjs" ] && config_cjs="✓"
    [ -f "$site/next.config.mjs" ] && config_mjs="✓"
    
    # Vérification des incohérences
    if [ "$has_type_module" = "1" ]; then
      # Devrait avoir .mjs
      if [ -n "$config_cjs" ] || [ -n "$config_js" ]; then
        echo "❌ $sitename: type:module mais utilise .cjs ou .js → DOIT être .mjs"
        errors=$((errors + 1))
      elif [ -n "$config_mjs" ]; then
        echo "✅ $sitename: OK (type:module + .mjs)"
      else
        echo "⚠️  $sitename: type:module mais aucun fichier next.config trouvé"
      fi
    else
      # Peut avoir .js ou .cjs
      if [ -n "$config_js" ] || [ -n "$config_cjs" ]; then
        echo "✅ $sitename: OK (pas de type:module)"
      elif [ -n "$config_mjs" ]; then
        echo "⚠️  $sitename: utilise .mjs sans type:module (fonctionne mais inhabituel)"
      else
        echo "⚠️  $sitename: aucun fichier next.config trouvé"
      fi
    fi
  fi
done

echo ""
if [ $errors -eq 0 ]; then
  echo "✅ Tous les sites sont cohérents"
  exit 0
else
  echo "❌ $errors site(s) avec des problèmes de configuration"
  exit 1
fi

