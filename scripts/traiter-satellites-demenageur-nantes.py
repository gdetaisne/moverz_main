#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Traiter les 2 satellites du cocon Déménageur
"""

import os
import re
from pathlib import Path

BASE_PATH = Path("/Users/guillaumestehelin/moverz_main/sites/nantes/content/blog/satellites")

satellites_demenageur = [
    {
        "file": "monte-meuble-demenagement-nantes.md",
        "pilier_url": "/blog/demenageur-nantes/demenageur-nantes-guide-complet",
        "pilier_titre": "guide déménageur professionnel à Nantes",
        "related_url": "/blog/demenageur-nantes/satellites/demenagement-objets-lourds-nantes",
        "related_titre": "déménagement d'objets lourds"
    },
    {
        "file": "demenagement-objets-lourds-nantes.md",
        "pilier_url": "/blog/demenageur-nantes/demenageur-nantes-guide-complet",
        "pilier_titre": "guide déménageur professionnel à Nantes",
        "related_url": "/blog/demenageur-nantes/satellites/monte-meuble-demenagement-nantes",
        "related_titre": "monte-meuble pour déménagement"
    }
]

def add_links_to_satellite(satellite):
    filepath = BASE_PATH / satellite["file"]
    
    if not filepath.exists():
        print(f"⚠️  Fichier non trouvé : {satellite['file']}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifier si déjà traité
    if satellite["pilier_url"] in content:
        print(f"✅ Déjà traité : {satellite['file']}")
        return True
    
    # Trouver le premier paragraphe après le frontmatter
    paragraphs = re.split(r'\n\n+', content)
    
    for i, para in enumerate(paragraphs):
        if para.startswith('---') or para.startswith('#'):
            continue
        if len(para) > 100 and not para.startswith('##'):
            # Ajouter le lien à la fin de ce paragraphe
            link = f" Pour une vue d'ensemble complète, consultez notre [{satellite['pilier_titre']}]({satellite['pilier_url']})."
            paragraphs[i] = para.rstrip() + link
            break
    
    content = '\n\n'.join(paragraphs)
    
    # Ajouter liens dans la conclusion
    if "## Conclusion" in content:
        conclusion_pattern = r'(## Conclusion.*?)(\n## |\Z)'
        match = re.search(conclusion_pattern, content, re.DOTALL)
        
        if match:
            conclusion_text = match.group(1)
            new_links = f"\n\nPour aller plus loin, explorez notre [{satellite['pilier_titre']}]({satellite['pilier_url']}) et notre guide sur [{satellite['related_titre']}]({satellite['related_url']})."
            
            lines = conclusion_text.split('\n')
            lines.insert(-1, new_links)
            new_conclusion = '\n'.join(lines)
            
            content = content.replace(conclusion_text, new_conclusion)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Traité : {satellite['file']}")
    return True

def main():
    print("🚀 Traitement satellites Déménageur\n")
    
    for satellite in satellites_demenageur:
        add_links_to_satellite(satellite)
    
    print("\n✅ Terminé !")

if __name__ == "__main__":
    main()

