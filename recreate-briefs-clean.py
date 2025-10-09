#!/usr/bin/env python3
"""
Script robuste avec pandas pour extraire les briefs SEO
"""

import pandas as pd
import os
import re

CSV_FILE = "SEO Guidelines - Feuille 1.csv"
OUTPUT_DIR = "seo-briefs"
CITY = "Marseille"

def sanitize_filename(text):
    """Convertit un texte en nom de fichier valide"""
    text = str(text).lower()
    text = re.sub(r'[àâä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[îï]', 'i', text)
    text = re.sub(r'[ôö]', 'o', text)
    text = re.sub(r'[ùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'​', '', text)  # Supprimer zero-width space
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def parse_keywords(keywords_text):
    """Parse la colonne des mots-clés"""
    if pd.isna(keywords_text):
        return []
    keywords_text = str(keywords_text)
    keywords = [k.strip() for k in keywords_text.split('\n') if k.strip()]
    # Filtrer les noms de ville
    cities = ['Marseille', 'Lyon', 'Lille', 'Strasbourg', 'Rennes', 'Rouen', 'Toulouse', 'Bordeaux', 'Nice', 'Nantes']
    keywords = [k for k in keywords if k not in cities and len(k) > 2]
    return keywords[:50]  # Limite à 50 mots

def extract_volume(volume_text):
    """Extrait le volume de recherche total"""
    if pd.isna(volume_text):
        return "N/A"
    volume_text = str(volume_text)
    try:
        volumes = []
        for line in volume_text.split('\n'):
            line = line.strip()
            if line.isdigit():
                volumes.append(int(line))
        if volumes:
            return sum(volumes)
    except:
        pass
    return volume_text.strip()

# Créer le dossier de sortie
city_dir = os.path.join(OUTPUT_DIR, sanitize_filename(CITY))
os.makedirs(city_dir, exist_ok=True)

print(f"🔍 Lecture du CSV avec pandas...")

# Lire le CSV
df = pd.read_csv(CSV_FILE)

# Filtrer sur Marseille
df_marseille = df[df['Ville'] == CITY].copy()

print(f"✅ {len(df_marseille)} pilliers trouvés pour {CITY}")

# Créer un fichier par pilier
for idx, row in enumerate(df_marseille.itertuples(), 1):
    try:
        ville = row.Ville
        requetes = row._2 if len(row) > 2 and not pd.isna(row._2) else ""
        volume = extract_volume(row._3 if len(row) > 3 else "")
        brief_seo = row._4 if len(row) > 4 and not pd.isna(row._4) else ""
        mots_text = row._5 if len(row) > 5 and not pd.isna(row._5) else ""
        
        mots_cles = parse_keywords(mots_text)
        
        # Extraire la première ligne de requête comme titre principal
        main_query = str(requetes).split('\n')[0].strip()
        
        # Créer le nom de fichier
        filename = f"{idx:02d}-{sanitize_filename(main_query)}.md"
        filepath = os.path.join(city_dir, filename)
        
        # Créer le contenu markdown
        content = f"""# Pilier {idx} : {main_query}

**Volume de recherche :** {volume}/mois  
**Ville :** {ville}

## Requêtes cibles

{requetes}

---

## Brief SEO Expert

{brief_seo}

---

## Mots Sémantiques à Intégrer

{chr(10).join(f'- {mot}' for mot in mots_cles)}

---

## Instructions pour la rédaction

### ✅ À faire
- Suivre STRICTEMENT la structure H1/H2/H3 définie dans le brief
- Intégrer naturellement TOUS les mots sémantiques listés ci-dessus
- Citer des quartiers spécifiques de Marseille (Vieux-Port, Castellane, La Joliette, Endoume, La Valentine, etc.)
- Utiliser des données réelles et vérifiables (prix Marseille 2025, délais réalistes)
- Respecter la longueur recommandée dans le brief (généralement 1500-2500 mots)

### ❌ À éviter
- Contenu générique recyclable pour une autre ville
- Bourrage de mots-clés non naturel
- Phrases creuses et fluff ("il est important de noter que...", "en effet...")
- Données inventées ou trop précises (donner des fourchettes)

### 🎯 Format de sortie
Markdown avec front matter Next.js :

```yaml
---
title: "[Titre SEO du brief]"
description: "[Meta-description du brief]"
slug: "{sanitize_filename(main_query)}"
category: "demenagement-marseille"
keywords: [...]
author: "Équipe Moverz Marseille"
publishedAt: "2025-01-15"
featured: true
---

[Contenu suivant structure du brief]
```
"""
        
        # Écrire le fichier
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Créé : {filename}")
        
    except Exception as e:
        print(f"⚠️  Erreur pilier {idx}: {e}")

# Créer le README
readme_content = f"""# Briefs SEO - {CITY}

Ce dossier contient les briefs SEO détaillés pour les 10 piliers de contenu du site Moverz {CITY}.

## Les 10 Pilliers

"""

for idx, row in enumerate(df_marseille.itertuples(), 1):
    requetes = row._2 if len(row) > 2 and not pd.isna(row._2) else ""
    volume = extract_volume(row._3 if len(row) > 3 else "")
    main_query = str(requetes).split('\n')[0].strip()
    filename = f"{idx:02d}-{sanitize_filename(main_query)}.md"
    readme_content += f"{idx}. **{main_query}** ({volume}/mois) → `{filename}`\n"

readme_content += f"""

## Utilisation

Dans un nouveau chat Cursor, utilisez simplement :

```
Lis le fichier seo-briefs/{sanitize_filename(CITY)}/01-demenagement-marseille-pas-cher.md

Rédige la page pilier en suivant STRICTEMENT le brief.
```

## Structure des fichiers

Chaque fichier contient :
1. **Requêtes cibles** : Mots-clés principaux et variantes
2. **Brief SEO Expert** : Instructions détaillées (structure, sections, optimisations)
3. **Mots Sémantiques** : Liste de 40-50 mots à intégrer naturellement
4. **Instructions** : Règles de rédaction et format de sortie

## Prochaines étapes

1. ✅ Créer les 10 pages piliers (une par brief)
2. 🔜 Créer 9 articles satellites par pilier (Deep Search pour identifier les sous-requêtes)
3. 🔜 Implémenter le maillage interne (piliers ↔ articles)

"""

readme_path = os.path.join(city_dir, "README.md")
with open(readme_path, 'w', encoding='utf-8') as f:
    f.write(readme_content)

print(f"\n✅ README créé : {readme_path}")
print(f"\n🎯 Tous les briefs sont prêts dans : {city_dir}/")

