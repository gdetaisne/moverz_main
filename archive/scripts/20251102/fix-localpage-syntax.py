#!/usr/bin/env python3
"""
Script pour corriger les erreurs de syntaxe dans LocalPage.tsx de tous les sites
"""

import re
import os
from pathlib import Path

SITES = [
    "bordeaux", "lille", "lyon", "marseille", "montpellier",
    "nantes", "nice", "rennes", "rouen", "strasbourg", "toulouse"
]

def fix_localpage(file_path):
    """Corrige le fichier LocalPage.tsx"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern pour trouver les lignes orphelines entre les deux fonctions
    # On cherche : } (ville).`,  suivi de lignes jusqu'à };
    pattern = r'\}\n\} \([a-z]+\)\.`,\n(.*?\n)*?  \};\n\}'
    
    # Remplacer par juste la fermeture de fonction propre
    fixed_content = re.sub(pattern, '}\n}', content)
    
    # Vérifier si on a fait des changements
    if content != fixed_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        return True
    return False

def main():
    base_dir = Path(__file__).parent.parent
    fixed_count = 0
    
    print("🔧 Correction des fichiers LocalPage.tsx")
    print("=" * 50)
    
    for site in SITES:
        file_path = base_dir / "sites" / site / "app" / "_templates" / "LocalPage.tsx"
        if file_path.exists():
            if fix_localpage(file_path):
                print(f"✅ {site}: Corrigé")
                fixed_count += 1
            else:
                print(f"ℹ️  {site}: Déjà correct")
        else:
            print(f"⚠️  {site}: Fichier non trouvé")
    
    print()
    print(f"📊 Total: {fixed_count} fichiers corrigés")

if __name__ == "__main__":
    main()

