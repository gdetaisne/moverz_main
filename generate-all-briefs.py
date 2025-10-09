#!/usr/bin/env python3
"""
Génère les briefs SEO pour TOUTES les villes
"""

import pandas as pd
import os
import re

CSV_FILE = "SEO Guidelines - Feuille 1.csv"
OUTPUT_DIR = "seo-briefs"

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
    cities = ['Marseille', 'Lyon', 'Lille', 'Strasbourg', 'Rennes', 'Rouen', 'Toulouse', 
              'Bordeaux', 'Nice', 'Nantes', 'Montpellier', 'Saint-Etienne']
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

def create_briefs_for_city(df, city):
    """Crée les briefs pour une ville donnée"""
    
    city_dir = os.path.join(OUTPUT_DIR, sanitize_filename(city))
    os.makedirs(city_dir, exist_ok=True)
    
    # Filtrer sur la ville
    df_city = df[df['Ville'] == city].copy()
    
    if len(df_city) == 0:
        print(f"⚠️  Aucun pilier trouvé pour {city}")
        return 0
    
    print(f"\n🏙️  {city.upper()} - {len(df_city)} pilliers")
    print("=" * 60)
    
    # Créer un fichier par pilier
    for idx, row in enumerate(df_city.itertuples(), 1):
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
- Citer des quartiers spécifiques de {ville}
- Utiliser des données réelles et vérifiables (prix {ville} 2025, délais réalistes)
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
category: "demenagement-{sanitize_filename(ville)}"
keywords: [...]
author: "Équipe Moverz {ville}"
publishedAt: "2025-01-15"
featured: true
---

[Contenu suivant structure du brief]
```
"""
            
            # Écrire le fichier
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"  ✅ Pilier {idx:02d}: {main_query[:60]}... ({volume}/mois)")
            
        except Exception as e:
            print(f"  ⚠️  Erreur pilier {idx}: {e}")
    
    # Créer le README de la ville
    create_city_readme(df_city, city, city_dir)
    
    return len(df_city)

def create_city_readme(df_city, city, city_dir):
    """Crée le README pour une ville"""
    
    readme_content = f"""# Briefs SEO - {city}

Ce dossier contient les briefs SEO détaillés pour les 10 piliers de contenu du site Moverz {city}.

## Les 10 Pilliers

"""
    
    total_volume = 0
    for idx, row in enumerate(df_city.itertuples(), 1):
        requetes = row._2 if len(row) > 2 and not pd.isna(row._2) else ""
        volume = extract_volume(row._3 if len(row) > 3 else "")
        main_query = str(requetes).split('\n')[0].strip()
        filename = f"{idx:02d}-{sanitize_filename(main_query)}.md"
        
        # Calculer volume total
        if str(volume).isdigit():
            total_volume += int(volume)
        
        # Ajouter priorité visuelle
        priority = ""
        if str(volume).isdigit():
            vol = int(volume)
            if vol >= 1000:
                priority = " 🔥🔥🔥"
            elif vol >= 200:
                priority = " 🔥🔥"
            elif vol >= 50:
                priority = " 🔥"
            else:
                priority = " ⭐"
        
        readme_content += f"{idx}. **{main_query}** ({volume}/mois){priority} → `{filename}`\n"
    
    readme_content += f"""

**TOTAL Volume {city} :** {total_volume:,} recherches/mois 📈

## Utilisation

Dans un nouveau chat Cursor, utilisez simplement :

```
Lis le fichier seo-briefs/{sanitize_filename(city)}/01-[nom-du-pilier].md

Rédige la page pilier en suivant STRICTEMENT le brief.

Contenu 100% {city} (quartiers spécifiques, prix locaux 2025).
```

## Structure des fichiers

Chaque fichier contient :
1. **Requêtes cibles** : Mots-clés principaux et variantes
2. **Brief SEO Expert** : Instructions détaillées (structure, sections, optimisations)
3. **Mots Sémantiques** : Liste de 40-50 mots à intégrer naturellement
4. **Instructions** : Règles de rédaction et format de sortie

## Ordre de création recommandé

Commencez par les piliers à fort volume pour un ROI rapide :

"""
    
    # Trier par volume pour recommandations
    pillars_sorted = []
    for idx, row in enumerate(df_city.itertuples(), 1):
        requetes = row._2 if len(row) > 2 and not pd.isna(row._2) else ""
        volume = extract_volume(row._3 if len(row) > 3 else "")
        main_query = str(requetes).split('\n')[0].strip()
        vol_int = int(volume) if str(volume).isdigit() else 0
        pillars_sorted.append((idx, main_query, vol_int))
    
    pillars_sorted.sort(key=lambda x: x[2], reverse=True)
    
    for rank, (idx, query, vol) in enumerate(pillars_sorted[:5], 1):
        medal = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][rank-1]
        readme_content += f"{medal} **Pilier {idx:02d}** - {query} ({vol:,}/mois)\n"
    
    readme_content += f"""

## Prochaines étapes

1. ✅ Créer les 10 pages piliers (une par brief)
2. 🔜 Créer 9 articles satellites par pilier (Deep Search pour sous-requêtes)
3. 🔜 Implémenter le maillage interne (piliers ↔ articles)

## Planning suggéré

- **Semaine 1-2** : Top 3 piliers (gros volumes)
- **Semaine 3** : Piliers 4-7
- **Semaine 4** : Piliers 8-10
- **Mois 2-3** : 90 articles satellites (9 par pilier)

---

📍 **Spécificités {city}** : N'oubliez pas de mentionner des quartiers réels, des problématiques locales, et des prix adaptés au marché {city} !
"""
    
    readme_path = os.path.join(city_dir, "README.md")
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print(f"  📄 README créé")

# ===== MAIN =====

print("🚀 GÉNÉRATION DES BRIEFS SEO - TOUTES LES VILLES")
print("=" * 60)

# Lire le CSV
df = pd.read_csv(CSV_FILE)

# Obtenir la liste des villes
cities = df['Ville'].unique()

print(f"\n📊 {len(cities)} villes trouvées dans le CSV")
print(f"📋 {len(df)} pilliers au total")

total_created = 0

# Créer les briefs pour chaque ville
for city in sorted(cities):
    count = create_briefs_for_city(df, city)
    total_created += count

print("\n" + "=" * 60)
print(f"✅ TERMINÉ !")
print(f"📁 {len(cities)} dossiers créés")
print(f"📝 {total_created} briefs générés")
print(f"🎯 Tout est prêt dans : {OUTPUT_DIR}/")

