#!/usr/bin/env python3
"""
Script d'automatisation du maillage interne - Satellites Rennes
Usage: python3 auto-maillage-satellites.py
"""

import os
import re
from pathlib import Path

# Configuration
SATELLITES_DIR = Path("/Users/guillaumestehelin/moverz_main/sites/rennes/content/blog/satellites")

# Mapping catégorie → URL pilier
PILIER_MAPPING = {
    "demenageur-rennes": {
        "url": "/blog/demenagement-rennes/demenageur-rennes",
        "ancres": [
            "guide complet des déménageurs à Rennes",
            "déménagement professionnel à Rennes",
            "nos services de déménagement rennais",
            "choisir un déménageur fiable à Rennes",
            "expert déménagement Rennes et métropole"
        ]
    },
    "demenageur-rennes-prix": {
        "url": "/blog/demenagement-rennes/demenageur-rennes-prix",
        "ancres": [
            "guide des prix déménagement à Rennes",
            "tarifs déménageur Rennes détaillés",
            "comprendre les coûts de déménagement rennais",
            "budget déménagement Rennes complet",
            "structure tarifaire des déménageurs rennais"
        ]
    },
    "demenagement-piano-rennes": {
        "url": "/blog/demenagement-rennes/demenagement-piano-rennes",
        "ancres": [
            "guide complet du déménagement de piano à Rennes",
            "déménagement piano professionnel à Rennes",
            "transport sécurisé de piano à Rennes",
            "tous nos conseils déménagement piano Rennes",
            "expertise déménagement piano région rennaise"
        ]
    },
    "location-camion-rennes": {
        "url": "/blog/demenagement-rennes/location-camion-demenagement-rennes",
        "ancres": [
            "guide location camion déménagement Rennes",
            "louer un camion pour déménager à Rennes",
            "location véhicule utilitaire Rennes",
            "tout savoir sur la location de camion à Rennes",
            "choisir son camion de déménagement rennais"
        ]
    },
    "garde-meuble-rennes": {
        "url": "/blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet",
        "ancres": [
            "guide complet du garde-meuble à Rennes",
            "stockage sécurisé à Rennes",
            "solutions de garde-meuble rennais",
            "box de stockage et self-stockage Rennes",
            "entreposer vos biens à Rennes"
        ]
    },
    "demenagement-pas-cher-rennes": {
        "url": "/blog/demenagement-rennes/demenagement-pas-cher-rennes",
        "ancres": [
            "déménagement économique à Rennes",
            "solutions pas chères pour déménager à Rennes",
            "réduire le coût de votre déménagement rennais",
            "astuces déménagement pas cher Rennes",
            "budget serré déménagement Rennes"
        ]
    },
    "demenagement-international-rennes": {
        "url": "/blog/demenagement-rennes/demenagement-international-rennes",
        "ancres": [
            "guide déménagement international depuis Rennes",
            "déménager à l'étranger depuis Rennes",
            "expatriation et déménagement international Rennes",
            "tout savoir sur le déménagement international rennais",
            "déménagement Europe et international Rennes"
        ]
    },
    "aide-demenagement-rennes": {
        "url": "/blog/demenagement-rennes/aide-demenagement-rennes",
        "ancres": [
            "guide aide au déménagement à Rennes",
            "obtenir de l'aide pour déménager à Rennes",
            "aides financières et pratiques déménagement Rennes",
            "solutions d'accompagnement déménagement rennais",
            "aide CAF et associations déménagement Rennes"
        ]
    },
    "petit-demenagement-rennes": {
        "url": "/blog/demenagement-rennes/petit-demenagement-rennes",
        "ancres": [
            "guide petit déménagement Rennes",
            "déménager un studio ou petit volume à Rennes",
            "solutions petit déménagement économique Rennes",
            "déménagement express petit volume Rennes",
            "petit déménagement pas cher à Rennes"
        ]
    },
    "demenagement-entreprise-rennes": {
        "url": "/blog/demenagement-rennes/demenagement-d-entreprise-rennes",
        "ancres": [
            "guide déménagement d'entreprise à Rennes",
            "déménagement professionnel et bureaux Rennes",
            "transfert de locaux professionnels à Rennes",
            "solutions déménagement entreprise rennaise",
            "déménagement bureaux et commerces Rennes"
        ]
    }
}

def extract_category(content):
    """Extraire la catégorie du frontmatter"""
    match = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
    return match.group(1) if match else None

def count_existing_links(content):
    """Compter les liens internes existants"""
    return len(re.findall(r'\]\(/blog/', content))

def find_best_insertion_points(content):
    """Trouver les meilleurs endroits pour insérer les liens"""
    lines = content.split('\n')
    
    # Trouver fin du frontmatter
    frontmatter_end = 0
    yaml_count = 0
    for i, line in enumerate(lines):
        if line.strip() == '---':
            yaml_count += 1
            if yaml_count == 2:
                frontmatter_end = i + 1
                break
    
    # Trouver première section (##) pour introduction
    intro_section = frontmatter_end + 1
    for i in range(frontmatter_end, len(lines)):
        if lines[i].startswith('##'):
            intro_section = i
            break
    
    # Trouver section FAQ ou Conclusion
    conclusion_section = len(lines) - 5
    for i in range(len(lines) - 1, frontmatter_end, -1):
        if lines[i].startswith('## FAQ') or lines[i].startswith('## Conclusion'):
            conclusion_section = i
            break
    
    # Trouver milieu du contenu
    mid_section = frontmatter_end + (intro_section - frontmatter_end) // 2
    if mid_section == frontmatter_end:
        mid_section = (frontmatter_end + conclusion_section) // 2
    
    return intro_section, mid_section, conclusion_section

def add_link_intro(content, ancre, url):
    """Ajouter un lien dans l'introduction"""
    lines = content.split('\n')
    intro_section, _, _ = find_best_insertion_points(content)
    
    # Trouver le premier paragraphe après frontmatter
    for i in range(intro_section, len(lines)):
        line = lines[i].strip()
        if line and not line.startswith('#') and not line.startswith('---'):
            # Ajouter un paragraphe avant
            intro_text = f"Pour comprendre tous les aspects de ce sujet, consultez notre [{ancre}]({url}).\n"
            lines.insert(i, intro_text)
            break
    
    return '\n'.join(lines)

def add_link_body(content, ancre, url):
    """Ajouter un lien dans le corps"""
    lines = content.split('\n')
    _, mid_section, conclusion_section = find_best_insertion_points(content)
    
    # Trouver un paragraphe au milieu
    for i in range(mid_section, conclusion_section):
        line = lines[i].strip()
        if line and not line.startswith('#') and not line.startswith('-') and not line.startswith('**'):
            # Ajouter une phrase contextuelle
            context_text = f" Ces éléments s'inscrivent dans le contexte plus large de notre [{ancre}]({url})."
            lines[i] = lines[i] + context_text
            break
    
    return '\n'.join(lines)

def add_link_conclusion(content, ancre, url):
    """Ajouter un lien en conclusion"""
    lines = content.split('\n')
    _, _, conclusion_section = find_best_insertion_points(content)
    
    # Ajouter avant la FAQ ou à la fin
    conclusion_text = f"\nPour approfondir ce sujet et découvrir tous nos conseils, consultez notre [{ancre}]({url})."
    
    # Insérer avant ## FAQ ou ## Conclusion
    for i in range(len(lines) - 1, conclusion_section, -1):
        if lines[i].startswith('## FAQ'):
            lines.insert(i, conclusion_text)
            return '\n'.join(lines)
    
    # Sinon insérer avant les 5 dernières lignes
    lines.insert(-5, conclusion_text)
    return '\n'.join(lines)

def process_satellite(file_path):
    """Traiter un fichier satellite"""
    print(f"\nTraitement: {file_path.name}")
    
    # Lire le contenu
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire catégorie
    category = extract_category(content)
    if not category:
        print(f"  ⚠️  Catégorie introuvable")
        return False
    
    if category not in PILIER_MAPPING:
        print(f"  ⚠️  Catégorie '{category}' non mappée")
        return False
    
    # Vérifier liens existants
    existing_links = count_existing_links(content)
    if existing_links >= 3:
        print(f"  ✅ Déjà maillé ({existing_links} liens)")
        return False
    
    # Récupérer infos pilier
    pilier = PILIER_MAPPING[category]
    url = pilier["url"]
    ancres = pilier["ancres"]
    
    # Ajouter 3 liens avec ancres variées
    print(f"  📝 Ajout 3 liens vers {url}")
    
    try:
        # Lien 1 : Introduction
        content = add_link_intro(content, ancres[0], url)
        print(f"     ✅ Lien 1 (intro): {ancres[0][:50]}...")
        
        # Lien 2 : Corps
        content = add_link_body(content, ancres[1], url)
        print(f"     ✅ Lien 2 (corps): {ancres[1][:50]}...")
        
        # Lien 3 : Conclusion
        content = add_link_conclusion(content, ancres[2], url)
        print(f"     ✅ Lien 3 (concl): {ancres[2][:50]}...")
        
        # Sauvegarder
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"  ✅ Fichier mis à jour")
        return True
        
    except Exception as e:
        print(f"  ❌ Erreur: {str(e)}")
        return False

def main():
    print("╔════════════════════════════════════════════════╗")
    print("║   AUTO-MAILLAGE SATELLITES RENNES              ║")
    print("╚════════════════════════════════════════════════╝")
    print()
    
    # Lister tous les satellites
    satellites = list(SATELLITES_DIR.glob("*.md"))
    print(f"📁 {len(satellites)} satellites détectés")
    print()
    
    # Traiter chaque satellite
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for satellite in sorted(satellites):
        result = process_satellite(satellite)
        if result:
            success_count += 1
        elif result is False:
            skip_count += 1
        else:
            error_count += 1
    
    # Résumé
    print()
    print("═══════════════════════════════════════════════════")
    print("📊 RÉSUMÉ")
    print("═══════════════════════════════════════════════════")
    print(f"✅ Maillés:       {success_count}")
    print(f"⏭️  Ignorés:       {skip_count}")
    print(f"❌ Erreurs:       {error_count}")
    print(f"📝 Total:         {len(satellites)}")
    print()
    print(f"🔗 Liens ajoutés: ~{success_count * 3}")
    print()
    print("Exécutez verify-maillage-rennes.sh pour valider")

if __name__ == "__main__":
    main()

