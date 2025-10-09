#!/usr/bin/env python3
"""
Script corrigé pour extraire proprement les briefs SEO du CSV
"""

import csv
import os
import re

CSV_FILE = "SEO Guidelines - Feuille 1.csv"
OUTPUT_DIR = "seo-briefs"
CITY = "Marseille"

def sanitize_filename(text):
    """Convertit un texte en nom de fichier valide"""
    text = text.lower()
    text = re.sub(r'[àâä]', 'a', text)
    text = re.sub(r'[éèêë]', 'e', text)
    text = re.sub(r'[îï]', 'i', text)
    text = re.sub(r'[ôö]', 'o', text)
    text = re.sub(r'[ùûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def parse_keywords(keywords_text):
    """Parse la colonne des mots-clés"""
    if not keywords_text:
        return []
    keywords = [k.strip() for k in keywords_text.split('\n') if k.strip()]
    # Filtrer les mots qui ressemblent à des noms de ville
    cities = ['Marseille', 'Lyon', 'Lille', 'Strasbourg', 'Rennes', 'Rouen', 'Toulouse', 'Bordeaux', 'Nice', 'Nantes']
    keywords = [k for k in keywords if k not in cities]
    return keywords

def extract_volume(volume_text):
    """Extrait le volume de recherche total"""
    if not volume_text:
        return "N/A"
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

# Lire le CSV avec une approche différente
print(f"🔍 Lecture du CSV...")

with open(CSV_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Chercher toutes les occurrences de "Marseille," au début de ligne
import re
pattern = r'^Marseille,([^\n]+)\n?([^\n]*)\n?([^\n]*)"([^"]*(?:"[^"]*"[^"]*)*)"(?:,|\n)"([^"]*(?:\n[^M][^\n]*)*)"'

briefs_data = []

# Split par ligne et chercher les entrées Marseille
lines = content.split('\n')
i = 0
while i < len(lines):
    line = lines[i]
    if line.startswith('Marseille,'):
        # Début d'un nouveau brief
        entry_lines = []
        # Collecter jusqu'à la prochaine ville ou EOF
        j = i
        quote_count = 0
        while j < len(lines):
            entry_lines.append(lines[j])
            quote_count += lines[j].count('"')
            j += 1
            # Vérifier si on arrive à une nouvelle ville (ligne suivante commence par une ville)
            if j < len(lines) and re.match(r'^(Marseille|Lyon|Lille|Strasbourg|Rennes|Rouen|Toulouse|Bordeaux|Nice|Nantes),', lines[j]):
                # C'est une nouvelle entrée
                if quote_count % 2 == 0:  # Les guillemets sont bien fermés
                    break
        
        entry_text = '\n'.join(entry_lines)
        briefs_data.append(entry_text)
        i = j
    else:
        i += 1

print(f"✅ {len(briefs_data)} entrées brutes trouvées")

# Parser chaque brief
briefs = []
for idx, entry_text in enumerate(briefs_data, 1):
    try:
        # Utiliser le module CSV pour parser proprement
        reader = csv.reader(entry_text.split('\n'))
        row = next(reader)
        
        if len(row) >= 5:
            # Reconstruire les colonnes multi-lignes
            ville = row[0]
            requetes = row[1]
            volume = row[2] if len(row) > 2 else ""
            brief = row[3] if len(row) > 3 else ""
            mots = row[4] if len(row) > 4 else ""
            
            # Nettoyer les mots-clés de toute référence à d'autres villes
            mots_list = parse_keywords(mots)
            
            if requetes and brief:
                briefs.append({
                    'ville': ville,
                    'requetes': requetes,
                    'volume': extract_volume(volume),
                    'brief': brief,
                    'mots': mots_list
                })
                print(f"✅ Pilier {idx} parsé : {requetes.split(chr(10))[0] if chr(10) in requetes else requetes[:50]}")
    except Exception as e:
        print(f"⚠️  Erreur pilier {idx}: {e}")

print(f"\n✅ {len(briefs)} pilliers valides pour {CITY}")

# Créer un fichier par pilier
for idx, brief_data in enumerate(briefs, 1):
    requetes = brief_data['requetes']
    volume = brief_data['volume']
    brief_seo = brief_data['brief']
    mots_cles = brief_data['mots']
    
    # Extraire la première ligne de requête comme titre principal
    main_query = requetes.split('\n')[0].strip()
    
    # Créer le nom de fichier
    filename = f"{idx:02d}-{sanitize_filename(main_query)}.md"
    filepath = os.path.join(city_dir, filename)
    
    # Créer le contenu markdown
    content = f"""# Pilier {idx} : {main_query}

**Volume de recherche :** {volume}/mois  
**Ville :** {CITY}

## Requêtes cibles

{requetes}

---

## Brief SEO Expert

{brief_seo}

---

## Mots Sémantiques à Intégrer

{chr(10).join(f'- {mot}' for mot in mots_cles if mot)}

---

## Instructions pour la rédaction

### ✅ À faire
- Suivre STRICTEMENT la structure H1/H2/H3 définie dans le brief
- Intégrer naturellement TOUS les mots sémantiques listés ci-dessus
- Citer des quartiers spécifiques de Marseille (Vieux-Port, Castellane, La Joliette, etc.)
- Utiliser des données réelles et vérifiables (prix, délais, etc.)
- Respecter la longueur recommandée dans le brief

### ❌ À éviter
- Contenu générique recyclable pour une autre ville
- Bourrage de mots-clés non naturel
- Phrases creuses et fluff
- Données inventées ou approximatives

### 🎯 Format de sortie
Markdown avec front matter pour Next.js (voir template dans README principal)
"""
    
    # Écrire le fichier
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"📝 Créé : {filename}")

print(f"\n🎯 Tous les briefs sont dans : {city_dir}/")

