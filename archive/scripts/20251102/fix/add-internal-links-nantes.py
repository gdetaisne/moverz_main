#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'ajout automatique de maillage interne pour le site Nantes
Responsable SEO Maillage Interne - Octobre 2025
"""

import os
import re
from pathlib import Path

# Configuration des chemins
BASE_PATH = Path("/Users/guillaumestehelin/moverz_main/sites/nantes/content/blog")
PILIERS_PATH = BASE_PATH
SATELLITES_PATH = BASE_PATH / "satellites"

# Définition des cocons avec leurs satellites
COCONS = {
    "garde-meuble-nantes": {
        "pilier": "garde-meuble-nantes/garde-meuble-nantes-guide-complet.md",
        "pilier_url": "/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet",
        "pilier_titre": "guide complet du garde-meuble à Nantes",
        "satellites": [
            {"file": "prix-garde-meuble-nantes-2025.md", "titre": "prix garde-meuble Nantes 2025", "done": True},
            {"file": "garde-meuble-pas-cher-nantes.md", "titre": "garde-meuble pas cher à Nantes"},
            {"file": "garde-meuble-etudiant-nantes.md", "titre": "garde-meuble étudiant Nantes"},
            {"file": "garde-meuble-courte-duree-nantes.md", "titre": "garde-meuble courte durée"},
            {"file": "garde-meuble-centre-nantes-peripherie.md", "titre": "centre-ville vs périphérie"},
            {"file": "garde-meuble-vs-self-stockage-nantes.md", "titre": "garde-meuble vs self-stockage"},
            {"file": "assurance-garde-meuble-nantes.md", "titre": "assurance garde-meuble"},
            {"file": "duree-minimum-garde-meuble-nantes.md", "titre": "durée minimum de location"},
            {"file": "choisir-taille-box-stockage-nantes.md", "titre": "choisir la taille de son box"},
            {"file": "acces-garde-meuble-nantes-horaires.md", "titre": "accès et horaires"},
        ],
        "transversaux": [
            {"url": "/blog/demenageur-nantes/demenageur-nantes-guide-complet", "titre": "déménageur professionnel à Nantes"},
            {"url": "/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide", "titre": "déménagement pas cher Nantes"},
            {"url": "/blog/demenagement-international-nantes/demenagement-international-nantes-guide", "titre": "déménagement international"},
        ]
    },
    "demenagement-pas-cher-nantes": {
        "pilier": "demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide.md",
        "pilier_url": "/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide",
        "pilier_titre": "guide déménagement pas cher à Nantes",
        "satellites": [
            {"file": "prix-demenagement-pas-cher-nantes-2025.md", "titre": "prix déménagement pas cher 2025"},
            {"file": "astuces-reduire-cout-demenagement-nantes.md", "titre": "astuces pour réduire les coûts"},
            {"file": "comparatif-formules-economiques-nantes.md", "titre": "comparatif des formules économiques"},
            {"file": "demenagement-economique-vs-standard-nantes.md", "titre": "formule économique vs standard"},
            {"file": "basse-saison-demenagement-nantes.md", "titre": "déménager en basse saison"},
            {"file": "cartons-gratuits-nantes-demenagement.md", "titre": "où trouver des cartons gratuits"},
            {"file": "emballage-diy-demenagement-nantes.md", "titre": "emballage DIY"},
            {"file": "demenagement-etudiant-pas-cher-nantes.md", "titre": "déménagement étudiant pas cher"},
            {"file": "demenagement-etudiant-nantes-astuces.md", "titre": "astuces déménagement étudiant"},
            {"file": "demenagement-derniere-minute-nantes.md", "titre": "déménagement dernière minute"},
            {"file": "demenagement-semaine-vs-weekend-nantes.md", "titre": "semaine vs week-end"},
            {"file": "demenager-soi-meme-nantes-location-utilitaire.md", "titre": "déménager soi-même avec location utilitaire"},
        ],
        "transversaux": [
            {"url": "/blog/aide-demenagement-nantes/aide-demenagement-nantes-guide", "titre": "aide déménagement particuliers"},
            {"url": "/blog/location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide", "titre": "location camion déménagement"},
            {"url": "/blog/petit-demenagement-nantes/petit-demenagement-nantes-guide", "titre": "petit déménagement"},
        ]
    },
    "demenagement-piano-nantes": {
        "pilier": "demenagement-piano-nantes/demenagement-piano-nantes-guide.md",
        "pilier_url": "/blog/demenagement-piano-nantes/demenagement-piano-nantes-guide",
        "pilier_titre": "guide déménagement piano à Nantes",
        "satellites": [
            {"file": "demenagement-piano-nantes-prix.md", "titre": "prix déménagement piano"},
            {"file": "demenagement-piano-queue-nantes.md", "titre": "déménagement piano à queue"},
            {"file": "demenagement-piano-etages-sans-ascenseur-nantes.md", "titre": "piano dans les étages sans ascenseur"},
            {"file": "transport-piano-longue-distance-nantes.md", "titre": "transport piano longue distance"},
            {"file": "assurance-piano-demenagement-nantes.md", "titre": "assurance piano"},
            {"file": "budget-complet-demenagement-piano-nantes.md", "titre": "budget complet"},
            {"file": "preparation-piano-avant-demenagement-nantes.md", "titre": "préparer son piano avant le déménagement"},
            {"file": "erreurs-eviter-demenagement-piano-nantes.md", "titre": "erreurs à éviter"},
            {"file": "piano-ancien-collection-demenagement-nantes.md", "titre": "piano ancien ou de collection"},
            {"file": "accordage-piano-apres-demenagement-nantes.md", "titre": "accordage après déménagement"},
        ],
        "transversaux": [
            {"url": "/blog/demenageur-nantes/demenageur-nantes-guide-complet", "titre": "déménageur professionnel"},
            {"url": "/blog/prix-demenagement-nantes/prix-demenagement-nantes-guide", "titre": "prix déménagement Nantes"},
        ]
    },
    "demenagement-international-nantes": {
        "pilier": "demenagement-international-nantes/demenagement-international-nantes-guide.md",
        "pilier_url": "/blog/demenagement-international-nantes/demenagement-international-nantes-guide",
        "pilier_titre": "guide déménagement international depuis Nantes",
        "satellites": [
            {"file": "demenagement-nantes-usa-canada.md", "titre": "déménagement vers USA et Canada"},
            {"file": "demenagement-nantes-uk-post-brexit.md", "titre": "déménagement vers UK post-Brexit"},
            {"file": "demenagement-nantes-asie.md", "titre": "déménagement vers l'Asie"},
            {"file": "prix-demenagement-international-nantes.md", "titre": "prix déménagement international"},
            {"file": "formalites-douanes-demenagement-international-nantes.md", "titre": "formalités douanières"},
            {"file": "assurance-demenagement-international-nantes.md", "titre": "assurance internationale"},
            {"file": "delais-demenagement-international-nantes.md", "titre": "délais d'acheminement"},
            {"file": "groupage-international-demenagement-nantes.md", "titre": "groupage international"},
            {"file": "transport-maritime-vs-aerien-demenagement-nantes.md", "titre": "maritime vs aérien"},
            {"file": "vehicule-demenagement-international-nantes.md", "titre": "expédier un véhicule"},
        ],
        "transversaux": [
            {"url": "/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet", "titre": "garde-meuble temporaire"},
            {"url": "/blog/demenageur-nantes/demenageur-nantes-guide-complet", "titre": "déménageur spécialisé"},
        ]
    },
    "petit-demenagement-nantes": {
        "pilier": "petit-demenagement-nantes/petit-demenagement-nantes-guide.md",
        "pilier_url": "/blog/petit-demenagement-nantes/petit-demenagement-nantes-guide",
        "pilier_titre": "guide petit déménagement à Nantes",
        "satellites": [
            {"file": "demenagement-studio-nantes-prix.md", "titre": "prix déménagement studio"},
            {"file": "demenagement-t1-nantes-prix.md", "titre": "prix déménagement T1"},
            {"file": "demenagement-meuble-seul-nantes.md", "titre": "déménager un meuble seul"},
            {"file": "outils-utiles-petit-demenagement-nantes.md", "titre": "outils utiles"},
            {"file": "comparatif-diy-vs-professionnel-petit-demenagement-nantes.md", "titre": "DIY vs professionnel"},
            {"file": "demenagement-petites-distances-nantes.md", "titre": "petites distances"},
            {"file": "demenagement-colocation-nantes.md", "titre": "déménagement en colocation"},
            {"file": "demenagement-equipement-bebe-nantes.md", "titre": "équipement bébé"},
            {"file": "demenagement-sans-carton-nantes.md", "titre": "déménager sans cartons"},
        ],
        "transversaux": [
            {"url": "/blog/location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide", "titre": "location camion"},
            {"url": "/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide", "titre": "déménagement économique"},
        ]
    },
    "aide-demenagement-nantes": {
        "pilier": "aide-demenagement-nantes/aide-demenagement-nantes-guide.md",
        "pilier_url": "/blog/aide-demenagement-nantes/aide-demenagement-nantes-guide",
        "pilier_titre": "guide aide déménagement à Nantes",
        "satellites": [
            {"file": "plateformes-aide-demenagement-nantes.md", "titre": "plateformes d'aide déménagement"},
            {"file": "etudiants-aide-demenagement-nantes.md", "titre": "étudiants déménageurs"},
            {"file": "trouver-aide-demenagement-dernier-moment-nantes.md", "titre": "aide au dernier moment"},
            {"file": "tarif-horaire-porteur-demenagement-nantes.md", "titre": "tarif horaire porteur"},
            {"file": "assurances-aide-demenagement-particuliers-nantes.md", "titre": "assurances particuliers"},
            {"file": "aide-ponctuelle-chargement-dechargement-nantes.md", "titre": "aide ponctuelle"},
            {"file": "aide-demenagement-amis-famille-nantes.md", "titre": "aide amis et famille"},
        ],
        "transversaux": [
            {"url": "/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide", "titre": "déménagement pas cher"},
            {"url": "/blog/demenageur-nantes/demenageur-nantes-guide-complet", "titre": "déménageur professionnel"},
        ]
    }
}

def add_intro_link(content, pilier_url, pilier_titre):
    """Ajoute un lien vers le pilier dans l'introduction (premier ou deuxième paragraphe)"""
    # Pattern pour trouver le premier paragraphe significatif après le frontmatter
    paragraphs = re.split(r'\n\n+', content)
    
    # Trouver le premier paragraphe de texte (après frontmatter et titre H1)
    for i, para in enumerate(paragraphs):
        if para.startswith('---') or para.startswith('#'):
            continue
        if len(para) > 100 and not para.startswith('##'):
            # Ajouter le lien à la fin de ce paragraphe
            if pilier_url not in para:
                link = f" Pour une vue d'ensemble complète, consultez notre [{pilier_titre}]({pilier_url})."
                paragraphs[i] = para.rstrip() + link
            break
    
    return '\n\n'.join(paragraphs)

def add_body_links(content, links):
    """Ajoute des liens contextuels dans le corps de l'article"""
    # Cette fonction est plus complexe car elle doit trouver des emplacements contextuels
    # Pour l'instant, on la laisse simplifiée
    return content

def add_conclusion_links(content, pilier_url, pilier_titre, related_satellites=[]):
    """Ajoute des liens dans la conclusion"""
    # Trouver la section conclusion
    if "## Conclusion" in content:
        conclusion_pattern = r'(## Conclusion.*?)(\n## |\Z)'
        match = re.search(conclusion_pattern, content, re.DOTALL)
        
        if match:
            conclusion_text = match.group(1)
            
            # Ajouter un paragraphe avec les liens si pas déjà présent
            if pilier_url not in conclusion_text:
                new_links = f"\n\nPour aller plus loin, explorez notre [{pilier_titre}]({pilier_url})"
                
                if related_satellites:
                    new_links += " ainsi que nos guides complémentaires : "
                    satellite_links = [f"[{sat['titre']}]({sat['url']})" for sat in related_satellites[:2]]
                    new_links += " et ".join(satellite_links) + "."
                else:
                    new_links += "."
                
                # Insérer avant la dernière ligne de la conclusion
                lines = conclusion_text.split('\n')
                lines.insert(-1, new_links)
                new_conclusion = '\n'.join(lines)
                
                content = content.replace(conclusion_text, new_conclusion)
    
    return content

def process_satellite(satellite_file, cocon_info):
    """Traite un satellite pour y ajouter le maillage"""
    filepath = SATELLITES_PATH / satellite_file
    
    if not filepath.exists():
        print(f"⚠️  Fichier non trouvé : {satellite_file}")
        return False
    
    # Lire le contenu
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifier si déjà traité
    if f"[{cocon_info['pilier_titre']}]" in content:
        print(f"✅ Déjà traité : {satellite_file}")
        return True
    
    # Ajouter les liens
    content = add_intro_link(content, cocon_info['pilier_url'], cocon_info['pilier_titre'])
    
    # Ajouter liens vers satellites complémentaires (optionnel pour l'instant)
    related = [s for s in cocon_info['satellites'] if s['file'] != satellite_file][:2]
    related_links = [
        {"url": f"/blog/{cocon_info['pilier'].split('/')[0]}/satellites/{s['file'].replace('.md', '')}", 
         "titre": s['titre']} 
        for s in related
    ]
    
    content = add_conclusion_links(content, cocon_info['pilier_url'], cocon_info['pilier_titre'], related_links)
    
    # Écrire le nouveau contenu
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Traité : {satellite_file}")
    return True

def main():
    """Fonction principale"""
    print("🚀 Démarrage du script de maillage interne Nantes\n")
    
    total_satellites = 0
    processed = 0
    
    # Traiter chaque cocon
    for cocon_name, cocon_info in COCONS.items():
        print(f"\n📦 Traitement du cocon : {cocon_name}")
        print(f"   Pilier : {cocon_info['pilier']}")
        print(f"   {len(cocon_info['satellites'])} satellites\n")
        
        for satellite in cocon_info['satellites']:
            # Skip si déjà fait
            if satellite.get('done'):
                print(f"✓ Déjà fait : {satellite['file']}")
                continue
            
            total_satellites += 1
            if process_satellite(satellite['file'], cocon_info):
                processed += 1
    
    print(f"\n✅ Traitement terminé !")
    print(f"   Satellites traités : {processed}/{total_satellites}")
    print(f"   Liens ajoutés : ~{processed * 3} liens")

if __name__ == "__main__":
    main()

