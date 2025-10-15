#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'optimisation du maillage interne pour Strasbourg
Passer de 56 liens (1.4/article) à 105-120 liens (3.5-4/article)
"""

import os
import re
from pathlib import Path

# Configuration des chemins
BASE_PATH = Path("/Users/guillaumestehelin/moverz_main/sites/strasbourg/content/blog")
PILIERS_PATH = BASE_PATH / "demenagement-strasbourg"
GARDE_MEUBLE_PATH = BASE_PATH / "garde-meuble-strasbourg"
SATELLITES_PATH = BASE_PATH / "satellites"

# Configuration des cocons Strasbourg
COCONS_STRASBOURG = {
    "demenageur": {
        "pilier_file": "demenageur-strasbourg.md",
        "pilier_url": "/blog/demenagement-strasbourg/demenageur-strasbourg",
        "pilier_titre": "guide déménageur professionnel à Strasbourg",
        "satellites": [
            "choisir-demenageur-strasbourg.md",
            "prix-demenageur-strasbourg-2025.md", 
            "assurance-demenageur-strasbourg.md",
            "demenageur-monte-meuble-strasbourg.md",
            "demenageur-grande-ile-strasbourg.md",
            "faq-demenageur-strasbourg.md"
        ]
    },
    "garde-meuble": {
        "pilier_file": "garde-meuble-strasbourg-guide-complet.md",
        "pilier_url": "/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet",
        "pilier_titre": "guide complet garde-meuble Strasbourg",
        "satellites": [
            "prix-garde-meuble-strasbourg-2025.md",
            "assurance-garde-meuble-strasbourg.md", 
            "garde-meuble-etudiant-strasbourg.md",
            "duree-location-garde-meuble-strasbourg.md",
            "taille-box-garde-meuble-strasbourg.md",
            "acces-24-7-self-stockage-strasbourg.md",
            "garde-meuble-temperature-strasbourg.md",
            "self-stockage-vs-garde-meuble-strasbourg.md",
            "faq-garde-meuble-strasbourg.md"
        ]
    },
    "autres_satellites": [
        "formule-economique-cle-en-main-strasbourg.md",
        "autorisation-stationnement-strasbourg.md", 
        "demenagement-dimanche-strasbourg.md",
        "pourboire-demenageurs-strasbourg.md",
        "stockage-pendant-demenagement-strasbourg.md"
    ]
}

# Piliers sans satellites spécifiques (liens transversaux uniquement)
PILIERS_TRANSVERSAUX = [
    "demenagement-strasbourg-pas-cher.md",
    "prix-demenagement-strasbourg.md",
    "aide-demenagement-strasbourg.md", 
    "demenagement-petit-volume-strasbourg.md",
    "demenagement-piano-strasbourg.md",
    "demenagement-international-strasbourg.md",
    "demenagement-d-entreprise-strasbourg.md",
    "location-camion-demenagement-strasbourg.md"
]

def add_section_to_pilier(pilier_path, section_content):
    """Ajoute une section 'Dans ce dossier' à un pilier"""
    with open(pilier_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifier si déjà traité
    if "## 📚 Dans ce dossier" in content:
        print(f"✅ Déjà traité : {pilier_path.name}")
        return True
    
    # Trouver le H1 et ajouter la section après
    h1_pattern = r'(^# .+$)'
    match = re.search(h1_pattern, content, re.MULTILINE)
    
    if match:
        h1_end_pos = match.end()
        content = content[:h1_end_pos] + "\n" + section_content + content[h1_end_pos:]
        
        with open(pilier_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Section ajoutée : {pilier_path.name}")
        return True
    else:
        print(f"⚠️  H1 non trouvé : {pilier_path.name}")
        return False

def add_links_to_satellite(satellite_file, pilier_url, pilier_titre):
    """Ajoute des liens manquants à un satellite"""
    filepath = SATELLITES_PATH / satellite_file
    
    if not filepath.exists():
        print(f"⚠️  Satellite non trouvé : {satellite_file}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifier si déjà bien maillé (au moins 2 liens vers le pilier)
    pilier_links_count = content.count(pilier_url)
    if pilier_links_count >= 2:
        print(f"✅ Déjà optimisé : {satellite_file}")
        return True
    
    # Trouver le premier paragraphe et ajouter un lien si manquant
    if pilier_links_count == 0:
        paragraphs = re.split(r'\n\n+', content)
        
        for i, para in enumerate(paragraphs):
            if para.startswith('---') or para.startswith('#'):
                continue
            if len(para) > 100 and not para.startswith('##'):
                # Ajouter le lien à la fin de ce paragraphe
                link = f" Pour une vue complète, consultez notre [{pilier_titre}]({pilier_url})."
                paragraphs[i] = para.rstrip() + link
                content = '\n\n'.join(paragraphs)
                break
    
    # Ajouter un lien en conclusion si possible
    if "## Conclusion" in content and pilier_links_count < 2:
        conclusion_pattern = r'(## Conclusion.*?)(\n## |\Z)'
        match = re.search(conclusion_pattern, content, re.DOTALL)
        
        if match:
            conclusion_text = match.group(1)
            if pilier_url not in conclusion_text:
                new_link = f"\n\nPour approfondir le sujet, consultez notre [{pilier_titre}]({pilier_url})."
                
                lines = conclusion_text.split('\n')
                lines.insert(-1, new_link)
                new_conclusion = '\n'.join(lines)
                
                content = content.replace(conclusion_text, new_conclusion)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Optimisé : {satellite_file}")
    return True

def optimize_demenageur_pilier():
    """Optimise le pilier déménageur avec section 'Dans ce dossier'"""
    pilier_path = PILIERS_PATH / "demenageur-strasbourg.md"
    
    section_content = """

## 📚 Dans ce dossier : Déménageur Strasbourg

Pour tout savoir sur les déménageurs professionnels à Strasbourg :

### Choisir son Déménageur
- [Choisir son déménageur à Strasbourg](/blog/demenagement-strasbourg/satellites/choisir-demenageur-strasbourg) : Critères de sélection
- [Prix déménageur Strasbourg 2025](/blog/demenagement-strasbourg/satellites/prix-demenageur-strasbourg-2025) : Tarifs actualisés
- [Assurance déménageur](/blog/demenagement-strasbourg/satellites/assurance-demenageur-strasbourg) : Protection obligatoire

### Services Spécialisés  
- [Monte-meuble déménagement](/blog/demenagement-strasbourg/satellites/demenageur-monte-meuble-strasbourg) : Étages sans ascenseur
- [Déménageur Grande Île](/blog/demenagement-strasbourg/satellites/demenageur-grande-ile-strasbourg) : Centre historique

### Questions Pratiques
- [FAQ déménageur](/blog/demenagement-strasbourg/satellites/faq-demenageur-strasbourg) : Réponses aux questions courantes

## 🔗 Guides Complémentaires

**Services connexes :**
- [Prix déménagement Strasbourg](/blog/demenagement-strasbourg/prix-demenagement-strasbourg) : Estimation budget
- [Déménagement pas cher](/blog/demenagement-strasbourg/demenagement-strasbourg-pas-cher) : Économiser sur votre déménagement
- [Garde-meuble Strasbourg](/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet) : Stockage temporaire
- [Déménagement piano](/blog/demenagement-strasbourg/demenagement-piano-strasbourg) : Transport d'instruments
"""

    return add_section_to_pilier(pilier_path, section_content)

def optimize_garde_meuble_pilier():
    """Optimise le pilier garde-meuble avec section 'Dans ce dossier'"""
    pilier_path = GARDE_MEUBLE_PATH / "garde-meuble-strasbourg-guide-complet.md"
    
    section_content = """

## 📚 Dans ce dossier : Garde-meuble Strasbourg

Tous nos guides spécialisés pour le stockage à Strasbourg :

### Prix et Tarifs
- [Prix garde-meuble Strasbourg 2025](/blog/garde-meuble-strasbourg/satellites/prix-garde-meuble-strasbourg-2025) : Tarifs actualisés
- [Assurance garde-meuble](/blog/garde-meuble-strasbourg/satellites/assurance-garde-meuble-strasbourg) : Protection obligatoire

### Choisir son Box
- [Taille box garde-meuble](/blog/garde-meuble-strasbourg/satellites/taille-box-garde-meuble-strasbourg) : Bien dimensionner
- [Self-stockage vs garde-meuble](/blog/garde-meuble-strasbourg/satellites/self-stockage-vs-garde-meuble-strasbourg) : Quelle différence ?

### Accès et Services
- [Accès 24/7 self-stockage](/blog/garde-meuble-strasbourg/satellites/acces-24-7-self-stockage-strasbourg) : Disponibilité horaire
- [Garde-meuble température](/blog/garde-meuble-strasbourg/satellites/garde-meuble-temperature-strasbourg) : Climatisation

### Solutions Spécifiques
- [Garde-meuble étudiant](/blog/garde-meuble-strasbourg/satellites/garde-meuble-etudiant-strasbourg) : Offres jeunes
- [Durée location](/blog/garde-meuble-strasbourg/satellites/duree-location-garde-meuble-strasbourg) : Flexibilité contrats

### Questions Fréquentes
- [FAQ garde-meuble](/blog/garde-meuble-strasbourg/satellites/faq-garde-meuble-strasbourg) : Toutes vos questions

## 🔗 Guides Complémentaires

**Services connexes :**
- [Déménageur Strasbourg](/blog/demenagement-strasbourg/demenageur-strasbourg) : Professionnels pour transport + stockage
- [Déménagement international](/blog/demenagement-strasbourg/demenagement-international-strasbourg) : Stockage entre pays
- [Stockage pendant déménagement](/blog/garde-meuble-strasbourg/satellites/stockage-pendant-demenagement-strasbourg) : Solutions temporaires
"""

    return add_section_to_pilier(pilier_path, section_content)

def add_transversal_links_to_piliers():
    """Ajoute des liens transversaux aux piliers sans satellites"""
    
    links_config = {
        "demenagement-strasbourg-pas-cher.md": """

## 🔗 Guides Complémentaires

Pour optimiser votre budget déménagement à Strasbourg :

- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Comparer avec les professionnels
- [Prix déménagement](/blog/demenagement-strasbourg/prix-demenagement-strasbourg) : Estimation budget total
- [Aide déménagement](/blog/demenagement-strasbourg/aide-demenagement-strasbourg) : Économiser avec de l'aide
- [Petit volume](/blog/demenagement-strasbourg/demenagement-petit-volume-strasbourg) : Petits déménagements
- [Location camion](/blog/demenagement-strasbourg/location-camion-demenagement-strasbourg) : DIY économique
- [Garde-meuble](/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet) : Stockage temporaire
""",
        "prix-demenagement-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour maîtriser votre budget déménagement à Strasbourg :

- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Devis et formules
- [Déménagement pas cher](/blog/demenagement-strasbourg/demenagement-strasbourg-pas-cher) : Astuces économies
- [Piano](/blog/demenagement-strasbourg/demenagement-piano-strasbourg) : Tarifs spécialisés
- [International](/blog/demenagement-strasbourg/demenagement-international-strasbourg) : Prix vers l'étranger
- [Entreprise](/blog/demenagement-strasbourg/demenagement-d-entreprise-strasbourg) : Déménagement bureaux
""",
        "aide-demenagement-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour trouver de l'aide pour votre déménagement à Strasbourg :

- [Déménagement pas cher](/blog/demenagement-strasbourg/demenagement-strasbourg-pas-cher) : Économiser avec de l'aide
- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Comparer aide vs pro
- [Petit volume](/blog/demenagement-strasbourg/demenagement-petit-volume-strasbourg) : Aide ponctuelle
""",
        "demenagement-petit-volume-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour votre petit déménagement à Strasbourg :

- [Déménagement pas cher](/blog/demenagement-strasbourg/demenagement-strasbourg-pas-cher) : Optimiser le budget
- [Location camion](/blog/demenagement-strasbourg/location-camion-demenagement-strasbourg) : Faire soi-même
- [Aide déménagement](/blog/demenagement-strasbourg/aide-demenagement-strasbourg) : Trouver de l'aide
- [Garde-meuble](/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet) : Stockage petit volume
""",
        "demenagement-piano-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour votre déménagement piano à Strasbourg :

- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Spécialistes instruments
- [Prix déménagement](/blog/demenagement-strasbourg/prix-demenagement-strasbourg) : Budget piano
- [Monte-meuble](/blog/demenagement-strasbourg/satellites/demenageur-monte-meuble-strasbourg) : Étages sans ascenseur
""",
        "demenagement-international-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour votre déménagement international depuis Strasbourg :

- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Spécialistes international
- [Prix déménagement](/blog/demenagement-strasbourg/prix-demenagement-strasbourg) : Budget international
- [Garde-meuble](/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet) : Stockage temporaire
""",
        "demenagement-d-entreprise-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour votre déménagement d'entreprise à Strasbourg :

- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Spécialistes bureaux
- [Prix déménagement](/blog/demenagement-strasbourg/prix-demenagement-strasbourg) : Budget entreprise
- [Garde-meuble](/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet) : Stockage archives
""",
        "location-camion-demenagement-strasbourg.md": """

## 🔗 Guides Complémentaires

Pour votre location camion à Strasbourg :

- [Déménagement pas cher](/blog/demenagement-strasbourg/demenagement-strasbourg-pas-cher) : Économiser en DIY
- [Petit volume](/blog/demenagement-strasbourg/demenagement-petit-volume-strasbourg) : Utilitaire adapté
- [Aide déménagement](/blog/demenagement-strasbourg/aide-demenagement-strasbourg) : Aide chargement/déchargement
- [Déménageur professionnel](/blog/demenagement-strasbourg/demenageur-strasbourg) : Comparer location vs pro
"""
    }
    
    processed = 0
    for pilier_file, section_content in links_config.items():
        pilier_path = PILIERS_PATH / pilier_file
        
        if pilier_path.exists():
            if add_section_to_pilier(pilier_path, section_content):
                processed += 1
        else:
            print(f"⚠️  Pilier non trouvé : {pilier_file}")
    
    return processed

def main():
    print("🚀 Optimisation du maillage interne - Strasbourg")
    print("Objectif : passer de 56 liens (1.4/art) à 105-120 liens (3.5-4/art)\n")
    
    total_actions = 0
    
    # Phase 1 : Optimiser le pilier Déménageur
    print("📦 Phase 1 : Pilier Déménageur")
    if optimize_demenageur_pilier():
        total_actions += 1
    
    # Optimiser les satellites déménageur
    for satellite in COCONS_STRASBOURG["demenageur"]["satellites"]:
        if add_links_to_satellite(
            satellite, 
            COCONS_STRASBOURG["demenageur"]["pilier_url"],
            COCONS_STRASBOURG["demenageur"]["pilier_titre"]
        ):
            total_actions += 1
    
    print()
    
    # Phase 2 : Optimiser le pilier Garde-meuble
    print("📦 Phase 2 : Pilier Garde-meuble")
    if optimize_garde_meuble_pilier():
        total_actions += 1
    
    # Optimiser les satellites garde-meuble
    for satellite in COCONS_STRASBOURG["garde-meuble"]["satellites"]:
        if add_links_to_satellite(
            satellite,
            COCONS_STRASBOURG["garde-meuble"]["pilier_url"], 
            COCONS_STRASBOURG["garde-meuble"]["pilier_titre"]
        ):
            total_actions += 1
    
    print()
    
    # Phase 3 : Optimiser les autres satellites
    print("📦 Phase 3 : Autres satellites")
    for satellite in COCONS_STRASBOURG["autres_satellites"]:
        # Ces satellites peuvent pointer vers déménageur ou garde-meuble selon leur thème
        if "garde-meuble" in satellite or "stockage" in satellite:
            target_url = COCONS_STRASBOURG["garde-meuble"]["pilier_url"]
            target_titre = COCONS_STRASBOURG["garde-meuble"]["pilier_titre"]
        else:
            target_url = COCONS_STRASBOURG["demenageur"]["pilier_url"]
            target_titre = COCONS_STRASBOURG["demenageur"]["pilier_titre"]
        
        if add_links_to_satellite(satellite, target_url, target_titre):
            total_actions += 1
    
    print()
    
    # Phase 4 : Piliers transversaux
    print("📦 Phase 4 : Piliers transversaux")
    processed = add_transversal_links_to_piliers()
    total_actions += processed
    
    print(f"\n✅ Optimisation terminée !")
    print(f"   Actions réalisées : {total_actions}")
    print(f"   Liens estimés ajoutés : +{total_actions * 2}-{total_actions * 3}")
    print(f"   Nouveau total estimé : 56 + {total_actions * 2}-{total_actions * 3} = ~{56 + total_actions * 2}-{56 + total_actions * 3} liens")

if __name__ == "__main__":
    main()
