#!/usr/bin/env bash
set -euo pipefail

# Go to repo root
cd "$(dirname "$0")/.."

# Ensure Node.js is available
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js introuvable. Merci d'installer nvm et Node 20+." >&2
  exit 1
fi

# Check Node major version >= 20
NODE_VER=$(node -v | sed 's/^v//')
MAJOR=${NODE_VER%%.*}
if [ "$MAJOR" -lt 20 ]; then
  echo "Node $NODE_VER détecté (<20). Merci d'utiliser Node 20+." >&2
  exit 1
fi

# Options
PORT=${PORT:-3000}
CLEAN=${CLEAN:-0}

if [ "$CLEAN" = "1" ]; then
  echo "🧹 Nettoyage des caches .next et node_modules/.cache"
  rm -rf .next node_modules/.cache || true
fi

# Install dependencies when needed
if [ ! -d node_modules ]; then
  echo "📦 Installation des dépendances..."
  npm install
else
  if [ package-lock.json -nt node_modules ]; then
    echo "📦 package-lock.json récent → npm install"
    npm install
  fi
fi

# Ensure minimal env file
if [ ! -f .env.local ]; then
  {
    echo "NODE_ENV=development"
    echo "SITE_URL=http://localhost:$PORT"
    echo "NEXT_TELEMETRY_DISABLED=1"
  } > .env.local
fi

echo "🚀 Démarrage Next.js sur http://localhost:$PORT ..."
exec npm run dev -- -p "$PORT"
