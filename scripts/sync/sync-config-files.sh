#!/bin/bash

# Script de synchronisation des fichiers de configuration
# Garantit que tous les sites ont des configs identiques

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
TEMPLATES_DIR="$ROOT_DIR/.templates"

CITIES=(marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier)

echo "🔄 SYNC CONFIG FILES - Moverz Multi-Sites"
echo "========================================"
echo ""

# Vérifier que le dossier templates existe
if [ ! -d "$TEMPLATES_DIR" ]; then
  echo "❌ Erreur: Dossier .templates/ introuvable"
  exit 1
fi

# Fonction pour synchroniser un fichier
sync_file() {
  local template="$1"
  local dest_path="$2"
  local use_city_replace="$3"
  
  for city in "${CITIES[@]}"; do
    local dest="$ROOT_DIR/sites/$city/$dest_path"
    
    if [ "$use_city_replace" = "true" ]; then
      # Remplacer {{CITY}} par le nom de la ville
      sed "s/{{CITY}}/$city/g" "$TEMPLATES_DIR/$template" > "$dest"
    else
      # Copie directe
      cp "$TEMPLATES_DIR/$template" "$dest"
    fi
  done
}

echo "📋 Synchronisation des fichiers..."
echo ""

# 1. tsconfig.json (identique partout)
echo "⏳ tsconfig.json..."
sync_file "tsconfig.json" "tsconfig.json" "false"
echo "✅ tsconfig.json synchronisé"

# 2. Dockerfile (avec remplacement {{CITY}})
echo "⏳ Dockerfile..."
sync_file "Dockerfile.template" "Dockerfile" "true"
echo "✅ Dockerfile synchronisé"

# 3. .dockerignore (identique partout)
echo "⏳ .dockerignore..."
sync_file ".dockerignore" ".dockerignore" "false"
echo "✅ .dockerignore synchronisé"

# 4. .eslintrc.json (identique partout)
echo "⏳ .eslintrc.json..."
sync_file ".eslintrc.json" ".eslintrc.json" "false"
echo "✅ .eslintrc.json synchronisé"

echo ""
echo "🔍 Vérification de l'homogénéité..."
echo ""

# Vérifier tsconfig.json
echo "📄 tsconfig.json:"
for city in "${CITIES[@]}"; do
  hash=$(md5 -q "$ROOT_DIR/sites/$city/tsconfig.json")
  echo "  $city: $hash"
done | sort | uniq -c

# Vérifier Dockerfile (ignorer les 2 premières lignes avec nom ville)
echo ""
echo "📄 Dockerfile (hors header):"
for city in "${CITIES[@]}"; do
  hash=$(tail -n +3 "$ROOT_DIR/sites/$city/Dockerfile" | md5 -q)
  echo "  $city: $hash"
done | sort | uniq -c

# Vérifier .dockerignore
echo ""
echo "📄 .dockerignore:"
for city in "${CITIES[@]}"; do
  hash=$(md5 -q "$ROOT_DIR/sites/$city/.dockerignore")
  echo "  $city: $hash"
done | sort | uniq -c

# Vérifier .eslintrc.json
echo ""
echo "📄 .eslintrc.json:"
for city in "${CITIES[@]}"; do
  hash=$(md5 -q "$ROOT_DIR/sites/$city/.eslintrc.json")
  echo "  $city: $hash"
done | sort | uniq -c

echo ""
echo "✅ Synchronisation terminée!"
echo ""
echo "💡 Prochain step:"
echo "   1. Tester un build local: cd sites/<ville> && npm run build"
echo "   2. Commit monorepo: git add . && git commit -m 'fix: harmonisation configs'"
echo "   3. Push tous les sites: ./scripts/push-all-sites-to-github.sh"

