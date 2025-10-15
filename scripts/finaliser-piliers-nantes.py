#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Finaliser les 3 piliers restants
"""

import re
from pathlib import Path

BASE_PATH = Path("/Users/guillaumestehelin/moverz_main/sites/nantes/content/blog")

piliers_finaux = {
    "prix-demenagement-nantes/prix-demenagement-nantes-guide.md": """

## 🔗 Guides Complémentaires

Pour optimiser votre budget déménagement à Nantes, consultez nos guides spécialisés :

### Économiser sur le Déménagement
- [Déménagement pas cher Nantes](/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide) : Toutes nos astuces pour réduire les coûts
- [Petit déménagement](/blog/petit-demenagement-nantes/petit-demenagement-nantes-guide) : Solutions adaptées aux petits volumes
- [Aide déménagement](/blog/aide-demenagement-nantes/aide-demenagement-nantes-guide) : Trouver de l'aide pour économiser

### Services et Formules
- [Déménageur professionnel](/blog/demenageur-nantes/demenageur-nantes-guide-complet) : Comparer les formules et devis
- [Location camion](/blog/location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide) : Faire soi-même en louant un utilitaire

### Déménagements Spécialisés
- [Déménagement piano](/blog/demenagement-piano-nantes/demenagement-piano-nantes-guide) : Tarifs transport d'instruments
- [Déménagement entreprise](/blog/demenagement-entreprise-nantes/demenagement-entreprise-nantes-guide) : Prix déménagement de bureaux
- [Déménagement international](/blog/demenagement-international-nantes/demenagement-international-nantes-guide) : Tarifs vers l'étranger

### Stockage
- [Garde-meuble Nantes](/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet) : Prix stockage temporaire
""",
    "location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide.md": """

## 🔗 Guides Complémentaires

Pour réussir votre déménagement en autonomie à Nantes :

### Déménager Soi-Même
- [Déménagement pas cher](/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide) : Économiser en DIY
- [Petit déménagement](/blog/petit-demenagement-nantes/petit-demenagement-nantes-guide) : Solutions pour petits volumes
- [Aide déménagement](/blog/aide-demenagement-nantes/aide-demenagement-nantes-guide) : Trouver des bras pour charger/décharger

### Comparer avec les Professionnels
- [Déménageur professionnel](/blog/demenageur-nantes/demenageur-nantes-guide-complet) : Comparer location vs déménageur
- [Prix déménagement](/blog/prix-demenagement-nantes/prix-demenagement-nantes-guide) : Estimer le budget total

### Services Complémentaires
- [Garde-meuble Nantes](/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet) : Stockage temporaire entre deux logements
""",
    "demenagement-entreprise-nantes/demenagement-entreprise-nantes-guide.md": """

## 🔗 Guides Complémentaires

Pour votre déménagement d'entreprise à Nantes :

### Services Professionnels
- [Déménageur professionnel](/blog/demenageur-nantes/demenageur-nantes-guide-complet) : Spécialistes déménagements professionnels
- [Prix déménagement](/blog/prix-demenagement-nantes/prix-demenagement-nantes-guide) : Budget et tarifs

### Déménagements Spécifiques
- [Déménagement piano](/blog/demenagement-piano-nantes/demenagement-piano-nantes-guide) : Transport d'instruments de musique
- [Déménagement international](/blog/demenagement-international-nantes/demenagement-international-nantes-guide) : Transfert de filiale à l'étranger

### Stockage
- [Garde-meuble Nantes](/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet) : Stockage archives et mobilier de bureaux
"""
}

def add_section_after_h1(filepath, section_content):
    """Ajoute une section juste après le H1"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifier si déjà traité
    if "## 🔗 Guides Complémentaires" in content:
        print(f"✅ Déjà traité : {filepath.name}")
        return True
    
    # Trouver le H1 et ajouter la section après
    h1_pattern = r'(^# .+$)'
    match = re.search(h1_pattern, content, re.MULTILINE)
    
    if match:
        h1_end_pos = match.end()
        content = content[:h1_end_pos] + "\n" + section_content + content[h1_end_pos:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Traité : {filepath.name}")
        return True
    else:
        print(f"⚠️  H1 non trouvé : {filepath.name}")
        return False

def main():
    print("🚀 Finalisation des 3 derniers piliers\n")
    
    for pilier_path, section_content in piliers_finaux.items():
        filepath = BASE_PATH / pilier_path
        
        if filepath.exists():
            add_section_after_h1(filepath, section_content)
        else:
            print(f"⚠️  Fichier non trouvé : {pilier_path}")
    
    print("\n✅ Terminé !")

if __name__ == "__main__":
    main()

