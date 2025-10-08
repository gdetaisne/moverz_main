#!/bin/bash

echo "🔧 CORRECTION PRÉCISE DES NOMS DE VARIABLES"
echo "==========================================="

cd ../temp-repos/dd-lille

# Corriger spécifiquement les fichiers problématiques
files=(
  "src/app/lille-vers-bruxelles/page.tsx"
  "src/app/lille-vers-lyon/page.tsx"
  "src/app/lille-vers-marseille/page.tsx"
  "src/app/lille-vers-paris/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "🔧 Correction précise de $file..."
    
    # Corriger les noms de variables spécifiques
    sed -i '' 's/const lillevers-bruxellesData/const lilleVersBruxellesData/g' "$file"
    sed -i '' 's/const lillevers-lyonData/const lilleVersLyonData/g' "$file"
    sed -i '' 's/const lillevers-marseilleData/const lilleVersMarseilleData/g' "$file"
    sed -i '' 's/const lillevers-parisData/const lilleVersParisData/g' "$file"
    
    # Corriger les références aux variables
    sed -i '' 's/{...lillevers-bruxellesData}/data={lilleVersBruxellesData}/g' "$file"
    sed -i '' 's/{...lillevers-lyonData}/data={lilleVersLyonData}/g' "$file"
    sed -i '' 's/{...lillevers-marseilleData}/data={lilleVersMarseilleData}/g' "$file"
    sed -i '' 's/{...lillevers-parisData}/data={lilleVersParisData}/g' "$file"
    
    echo "✅ $file corrigé"
  fi
done

# Créer le fichier globals.css manquant
mkdir -p src/app
cat > src/app/globals.css << 'EOL'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #0a0a0a;
  --card-foreground: #fafafa;
  --popover: #0a0a0a;
  --popover-foreground: #fafafa;
  --primary: #fafafa;
  --primary-foreground: #0a0a0a;
  --secondary: #262626;
  --secondary-foreground: #fafafa;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --accent: #262626;
  --accent-foreground: #fafafa;
  --destructive: #7f1d1d;
  --destructive-foreground: #fafafa;
  --border: #262626;
  --input: #262626;
  --ring: #d4d4d8;
  --chart-1: #22c55e;
  --chart-2: #3b82f6;
  --chart-3: #f59e0b;
  --chart-4: #ef4444;
  --chart-5: #8b5cf6;
  --radius: 0.5rem;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #0a0a0a;
  --card-foreground: #fafafa;
  --popover: #0a0a0a;
  --popover-foreground: #fafafa;
  --primary: #fafafa;
  --primary-foreground: #0a0a0a;
  --secondary: #262626;
  --secondary-foreground: #fafafa;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --accent: #262626;
  --accent-foreground: #fafafa;
  --destructive: #7f1d1d;
  --destructive-foreground: #fafafa;
  --border: #262626;
  --input: #262626;
  --ring: #d4d4d8;
  --chart-1: #22c55e;
  --chart-2: #3b82f6;
  --chart-3: #f59e0b;
  --chart-4: #ef4444;
  --chart-5: #8b5cf6;
}

* {
  border-color: hsl(var(--border));
}

body {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
}

@layer base {
  * {
    @apply border-gray-200;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOL

echo "✅ globals.css créé"

echo "🎉 Corrections terminées !"
