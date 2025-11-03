#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'ajout des sections "Dans ce dossier" aux piliers Nantes
"""

import os
import re
from pathlib import Path

BASE_PATH = Path("/Users/guillaumestehelin/moverz_main/sites/nantes/content/blog")

# Définition des sections à ajouter pour chaque pilier
PILIERS_SECTIONS = {
    "demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide.md": {
        "titre_section": "## 📚 Dans ce dossier : Déménagement Économique à Nantes",
        "intro": "Découvrez nos guides spécialisés pour réduire le coût de votre déménagement à Nantes :",
        "categories": {
            "Prix et Comparatifs": [
                ("[Prix déménagement pas cher Nantes 2025](/blog/demenagement-pas-cher-nantes/satellites/prix-demenagement-pas-cher-nantes-2025)", "Tarifs réels et fourchettes"),
                ("[Astuces pour réduire les coûts](/blog/demenagement-pas-cher-nantes/satellites/astuces-reduire-cout-demenagement-nantes)", "10 conseils pratiques"),
                ("[Comparatif des formules économiques](/blog/demenagement-pas-cher-nantes/satellites/comparatif-formules-economiques-nantes)", "Quelle option choisir ?"),
                ("[Formule économique vs standard](/blog/demenagement-pas-cher-nantes/satellites/demenagement-economique-vs-standard-nantes)", "Différences et choix"),
            ],
            "Optimiser le Budget": [
                ("[Déménager en basse saison](/blog/demenagement-pas-cher-nantes/satellites/basse-saison-demenagement-nantes)", "Économisez 20-30%"),
                ("[Semaine vs Week-end](/blog/demenagement-pas-cher-nantes/satellites/demenagement-semaine-vs-weekend-nantes)", "Quel jour est moins cher ?"),
                ("[Où trouver des cartons gratuits](/blog/demenagement-pas-cher-nantes/satellites/cartons-gratuits-nantes-demenagement)", "Points de collecte"),
                ("[Emballage DIY](/blog/demenagement-pas-cher-nantes/satellites/emballage-diy-demenagement-nantes)", "Techniques économiques"),
            ],
            "Solutions DIY": [
                ("[Déménager soi-même avec location utilitaire](/blog/demenagement-pas-cher-nantes/satellites/demenager-soi-meme-nantes-location-utilitaire)", "Guide complet"),
            ],
            "Étudiants": [
                ("[Déménagement étudiant pas cher](/blog/demenagement-pas-cher-nantes/satellites/demenagement-etudiant-pas-cher-nantes)", "Solutions adaptées"),
                ("[Astuces déménagement étudiant](/blog/demenagement-pas-cher-nantes/satellites/demenagement-etudiant-nantes-astuces)", "Conseils pratiques"),
            ],
            "Situations Spécifiques": [
                ("[Déménagement dernière minute](/blog/demenagement-pas-cher-nantes/satellites/demenagement-derniere-minute-nantes)", "Solutions d'urgence"),
            ]
        },
        "transversaux": [
            ("[Aide déménagement particuliers](/blog/aide-demenagement-nantes/aide-demenagement-nantes-guide)", "Économiser avec de l'aide"),
            ("[Location camion déménagement](/blog/location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide)", "Louer un utilitaire"),
            ("[Petit déménagement](/blog/petit-demenagement-nantes/petit-demenagement-nantes-guide)", "Petits volumes = petits prix"),
        ]
    },
    "demenagement-piano-nantes/demenagement-piano-nantes-guide.md": {
        "titre_section": "## 📚 Dans ce dossier : Déménagement Piano à Nantes",
        "intro": "Tous nos guides pour déménager votre piano en toute sécurité à Nantes :",
        "categories": {
            "Prix et Budget": [
                ("[Prix déménagement piano Nantes](/blog/demenagement-piano-nantes/satellites/demenagement-piano-nantes-prix)", "Tarifs 2025"),
                ("[Budget complet](/blog/demenagement-piano-nantes/satellites/budget-complet-demenagement-piano-nantes)", "Tous les coûts à prévoir"),
                ("[Assurance piano](/blog/demenagement-piano-nantes/satellites/assurance-piano-demenagement-nantes)", "Protection obligatoire"),
            ],
            "Types de Pianos": [
                ("[Déménagement piano à queue](/blog/demenagement-piano-nantes/satellites/demenagement-piano-queue-nantes)", "Spécificités"),
                ("[Piano ancien ou de collection](/blog/demenagement-piano-nantes/satellites/piano-ancien-collection-demenagement-nantes)", "Précautions particulières"),
            ],
            "Situations Complexes": [
                ("[Piano dans les étages sans ascenseur](/blog/demenagement-piano-nantes/satellites/demenagement-piano-etages-sans-ascenseur-nantes)", "Monte-meuble nécessaire ?"),
                ("[Transport piano longue distance](/blog/demenagement-piano-nantes/satellites/transport-piano-longue-distance-nantes)", "Hors Nantes"),
            ],
            "Préparation et Précautions": [
                ("[Préparer son piano avant déménagement](/blog/demenagement-piano-nantes/satellites/preparation-piano-avant-demenagement-nantes)", "Checklist complète"),
                ("[Erreurs à éviter](/blog/demenagement-piano-nantes/satellites/erreurs-eviter-demenagement-piano-nantes)", "Les pièges courants"),
                ("[Accordage après déménagement](/blog/demenagement-piano-nantes/satellites/accordage-piano-apres-demenagement-nantes)", "Quand et pourquoi ?"),
            ]
        },
        "transversaux": [
            ("[Déménageur professionnel](/blog/demenageur-nantes/demenageur-nantes-guide-complet)", "Spécialistes instruments"),
            ("[Prix déménagement Nantes](/blog/prix-demenagement-nantes/prix-demenagement-nantes-guide)", "Estimation globale"),
        ]
    },
    "demenagement-international-nantes/demenagement-international-nantes-guide.md": {
        "titre_section": "## 📚 Dans ce dossier : Déménagement International depuis Nantes",
        "intro": "Tous nos guides pour déménager à l'étranger depuis Nantes :",
        "categories": {
            "Destinations": [
                ("[Déménagement vers USA et Canada](/blog/demenagement-international-nantes/satellites/demenagement-nantes-usa-canada)", "Amérique du Nord"),
                ("[Déménagement vers UK post-Brexit](/blog/demenagement-international-nantes/satellites/demenagement-nantes-uk-post-brexit)", "Royaume-Uni"),
                ("[Déménagement vers l'Asie](/blog/demenagement-international-nantes/satellites/demenagement-nantes-asie)", "Chine, Japon, Singapour"),
            ],
            "Aspects Financiers": [
                ("[Prix déménagement international](/blog/demenagement-international-nantes/satellites/prix-demenagement-international-nantes)", "Tarifs 2025"),
                ("[Assurance internationale](/blog/demenagement-international-nantes/satellites/assurance-demenagement-international-nantes)", "Protection optimale"),
            ],
            "Formalités": [
                ("[Formalités douanières](/blog/demenagement-international-nantes/satellites/formalites-douanes-demenagement-international-nantes)", "Documents obligatoires"),
                ("[Délais d'acheminement](/blog/demenagement-international-nantes/satellites/delais-demenagement-international-nantes)", "Planification"),
            ],
            "Transport": [
                ("[Groupage international](/blog/demenagement-international-nantes/satellites/groupage-international-demenagement-nantes)", "Économiser en groupage"),
                ("[Maritime vs Aérien](/blog/demenagement-international-nantes/satellites/transport-maritime-vs-aerien-demenagement-nantes)", "Quel mode choisir ?"),
                ("[Expédier un véhicule](/blog/demenagement-international-nantes/satellites/vehicule-demenagement-international-nantes)", "Voiture à l'étranger"),
            ]
        },
        "transversaux": [
            ("[Garde-meuble temporaire](/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet)", "Stocker entre deux pays"),
            ("[Déménageur spécialisé](/blog/demenageur-nantes/demenageur-nantes-guide-complet)", "Professionnels internationaux"),
        ]
    },
    "petit-demenagement-nantes/petit-demenagement-nantes-guide.md": {
        "titre_section": "## 📚 Dans ce dossier : Petit Déménagement à Nantes",
        "intro": "Tous nos guides pour déménager un petit volume à Nantes :",
        "categories": {
            "Prix Petits Logements": [
                ("[Prix déménagement studio](/blog/petit-demenagement-nantes/satellites/demenagement-studio-nantes-prix)", "Tarifs 2025"),
                ("[Prix déménagement T1](/blog/petit-demenagement-nantes/satellites/demenagement-t1-nantes-prix)", "Budget à prévoir"),
            ],
            "Situations Spécifiques": [
                ("[Déménager un meuble seul](/blog/petit-demenagement-nantes/satellites/demenagement-meuble-seul-nantes)", "Canapé, armoire"),
                ("[Équipement bébé](/blog/petit-demenagement-nantes/satellites/demenagement-equipement-bebe-nantes)", "Lit, poussette"),
                ("[Déménagement en colocation](/blog/petit-demenagement-nantes/satellites/demenagement-colocation-nantes)", "Une chambre seulement"),
            ],
            "Solutions Pratiques": [
                ("[Outils utiles](/blog/petit-demenagement-nantes/satellites/outils-utiles-petit-demenagement-nantes)", "Équipement minimal"),
                ("[DIY vs Professionnel](/blog/petit-demenagement-nantes/satellites/comparatif-diy-vs-professionnel-petit-demenagement-nantes)", "Que choisir ?"),
                ("[Petites distances](/blog/petit-demenagement-nantes/satellites/demenagement-petites-distances-nantes)", "Dans Nantes"),
                ("[Déménager sans cartons](/blog/petit-demenagement-nantes/satellites/demenagement-sans-carton-nantes)", "Alternatives"),
            ]
        },
        "transversaux": [
            ("[Location camion](/blog/location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide)", "Utilitaire pour petit volume"),
            ("[Déménagement économique](/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide)", "Optimiser les coûts"),
        ]
    },
    "aide-demenagement-nantes/aide-demenagement-nantes-guide.md": {
        "titre_section": "## 📚 Dans ce dossier : Aide Déménagement à Nantes",
        "intro": "Tous nos guides pour trouver de l'aide pour votre déménagement à Nantes :",
        "categories": {
            "Trouver de l'Aide": [
                ("[Plateformes d'aide déménagement](/blog/aide-demenagement-nantes/satellites/plateformes-aide-demenagement-nantes)", "Sites et apps"),
                ("[Étudiants déménageurs](/blog/aide-demenagement-nantes/satellites/etudiants-aide-demenagement-nantes)", "Main d'œuvre jeune"),
                ("[Aide au dernier moment](/blog/aide-demenagement-nantes/satellites/trouver-aide-demenagement-dernier-moment-nantes)", "Solutions urgentes"),
            ],
            "Tarifs et Budget": [
                ("[Tarif horaire porteur](/blog/aide-demenagement-nantes/satellites/tarif-horaire-porteur-demenagement-nantes)", "Prix à l'heure"),
                ("[Aide ponctuelle](/blog/aide-demenagement-nantes/satellites/aide-ponctuelle-chargement-dechargement-nantes)", "Chargement/déchargement"),
            ],
            "Sécurité": [
                ("[Assurances particuliers](/blog/aide-demenagement-nantes/satellites/assurances-aide-demenagement-particuliers-nantes)", "Se protéger"),
            ],
            "Aide Gratuite": [
                ("[Aide amis et famille](/blog/aide-demenagement-nantes/satellites/aide-demenagement-amis-famille-nantes)", "Organiser l'entraide"),
            ]
        },
        "transversaux": [
            ("[Déménagement pas cher](/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide)", "Économiser avec aide particuliers"),
            ("[Déménageur professionnel](/blog/demenageur-nantes/demenageur-nantes-guide-complet)", "Comparer avec pro"),
        ]
    }
}

def generate_section_content(pilier_config):
    """Génère le contenu de la section 'Dans ce dossier'"""
    lines = [
        "",
        pilier_config["titre_section"],
        "",
        pilier_config["intro"],
        ""
    ]
    
    # Ajouter les catégories
    for cat_name, links in pilier_config["categories"].items():
        lines.append(f"### {cat_name}")
        for link, description in links:
            lines.append(f"- {link} : {description}")
        lines.append("")
    
    return "\n".join(lines)

def generate_transversaux_section(pilier_config):
    """Génère la section 'Pour aller plus loin'"""
    if not pilier_config.get("transversaux"):
        return ""
    
    lines = [
        "",
        "## 🔗 Pour aller plus loin",
        "",
        "**Guides complémentaires utiles :**"
    ]
    
    for link, description in pilier_config["transversaux"]:
        lines.append(f"- {link} : {description}")
    
    lines.append("")
    return "\n".join(lines)

def add_sections_to_pilier(pilier_path, pilier_config):
    """Ajoute les sections au pilier"""
    filepath = BASE_PATH / pilier_path
    
    if not filepath.exists():
        print(f"⚠️  Pilier non trouvé : {pilier_path}")
        return False
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifier si déjà traité
    if pilier_config["titre_section"] in content:
        print(f"✅ Déjà traité : {pilier_path}")
        return True
    
    # Trouver le H1 et ajouter la section juste après
    h1_pattern = r'(^# .+$)'
    match = re.search(h1_pattern, content, re.MULTILINE)
    
    if match:
        h1_end_pos = match.end()
        section_content = generate_section_content(pilier_config)
        
        # Insérer la section après le H1
        content = content[:h1_end_pos] + "\n" + section_content + content[h1_end_pos:]
    
    # Ajouter la section transversaux avant la FAQ ou à la fin
    if "## FAQ" in content or "## Questions Fréquentes" in content:
        # Insérer avant FAQ
        faq_pattern = r'(## (?:FAQ|Questions Fréquentes))'
        transversaux = generate_transversaux_section(pilier_config)
        content = re.sub(faq_pattern, transversaux + r'\1', content)
    else:
        # Ajouter à la fin si pas de FAQ
        transversaux = generate_transversaux_section(pilier_config)
        content += "\n" + transversaux
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Traité : {pilier_path}")
    return True

def main():
    print("🚀 Ajout des sections aux piliers Nantes\n")
    
    processed = 0
    for pilier_path, pilier_config in PILIERS_SECTIONS.items():
        if add_sections_to_pilier(pilier_path, pilier_config):
            processed += 1
    
    print(f"\n✅ Traitement terminé : {processed}/{len(PILIERS_SECTIONS)} piliers")

if __name__ == "__main__":
    main()

