#!/bin/bash
set -e

SITES=(marseille lyon montpellier bordeaux nantes lille nice strasbourg rouen rennes toulouse)

toTitleCase() {
  local input="$1"
  # Uppercase first char, lowercase rest (portable for macOS bash 3.2)
  printf '%s' "$input" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}'
}

ensure_page() {
  local site="$1"; local page="$2"; local title="$3"; local desc="$4"
  local SITE_TITLE=$(toTitleCase "$site")
  local dir="sites/$site/app/$page"
  local file="$dir/page.tsx"
  local canonical="https://devis-demenageur-$site.fr/$page"
  [ "$page" = "cgv" ] && canonical="https://devis-demenageur-$site.fr/cgv"
  [ "$page" = "cgu" ] && canonical="https://devis-demenageur-$site.fr/cgu"
  [ "$page" = "mentions-legales" ] && canonical="https://devis-demenageur-$site.fr/mentions-legales"
  [ "$page" = "politique-confidentialite" ] && canonical="https://devis-demenageur-$site.fr/politique-confidentialite"

  mkdir -p "$dir"

  if [ -f "$file" ]; then
    echo "   ↷ $site/$page déjà présent, on garde."
    return 0
  fi

  cat > "$file" <<TSX
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "$title | Moverz $SITE_TITLE",
  description: "$desc",
  alternates: { canonical: "$canonical" },
};

export default function Page() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      <section className="section">
        <div className="container text-white prose prose-invert max-w-3xl">
          <h1>$title</h1>
          <p>Contenu à jour. Pour toute question, utilisez la page Contact.</p>
        </div>
      </section>
    </main>
  );
}
TSX
  echo "   ✅ Créé: $file"
}

echo "🧩 Génération des pages légales manquantes (mentions, cgv, cgu, confidentialité)"
for site in "${SITES[@]}"; do
  [ -d "sites/$site" ] || { echo "⚠️  sites/$site introuvable, on saute."; continue; }
  echo "📁 $site"
  ensure_page "$site" "mentions-legales" "Mentions légales" "Mentions légales du site (éditeur, hébergeur, responsabilités, propriété intellectuelle)."
  ensure_page "$site" "politique-confidentialite" "Politique de confidentialité" "Politique RGPD: données collectées, finalités, durées (60 jours), droits."
  ensure_page "$site" "cgv" "Conditions Générales de Vente" "CGV B2B: objet, processus, acompte mandataire, responsabilités, pénalités de retard."
  ensure_page "$site" "cgu" "Conditions Générales d’Utilisation" "CGU du service: périmètre, responsabilités, données et sécurité."
done

echo "✅ Fini. Pensez à pousser avec scripts/push-to-all-site-repos.sh"


