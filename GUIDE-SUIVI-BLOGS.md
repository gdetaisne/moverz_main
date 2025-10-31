# Guide de Suivi Production Blogs

Documentation des outils de suivi de la production des articles de blog pour les 11 sites Moverz.

---

## 📁 Fichiers Disponibles

### 1. Rapport Complet Markdown
**Fichier**: `ETAT-LIEUX-BLOGS-2025.md`

Rapport détaillé en format Markdown incluant :
- État par site avec progression
- Analyse détaillée par pilier (10 piliers × 11 villes)
- Priorités de production
- Plan d'action recommandé
- Observations structurelles

**Usage**:
```bash
cat ETAT-LIEUX-BLOGS-2025.md
# ou ouvrir dans votre éditeur Markdown préféré
```

---

### 2. Données JSON
**Fichier**: `etat-lieux-blogs.json`

Format structuré pour exploitation programmatique :
```json
{
  "date": "2025-10-31",
  "objectif_global": { ... },
  "sites": [ ... ],
  "production_requise": { ... }
}
```

**Usage**:
```bash
# Afficher joliment
cat etat-lieux-blogs.json | python3 -m json.tool

# Parser avec jq
cat etat-lieux-blogs.json | jq '.sites[] | select(.statut == "PRIORITAIRE")'

# Utiliser dans scripts
node -e 'console.log(require("./etat-lieux-blogs.json").sites[0])'
```

---

### 3. Script de Suivi Automatisé
**Fichier**: `scripts/suivi-blogs.sh`

Script bash pour tracking en temps réel de la progression.

#### Utilisation

##### Vue d'ensemble (tous les sites)
```bash
./scripts/suivi-blogs.sh
```

Affiche :
```
╔════════════════════════════════════════════════════════════╗
║        SUIVI PRODUCTION BLOGS - 31/10/2025          ║
╚════════════════════════════════════════════════════════════╝

✅ Bordeaux     │ 103/100 │ [████████████████████] │ P:103 S:  0
✅ Lille        │ 111/100 │ [████████████████████] │ P:10 S:101
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 RÉSUMÉ GLOBAL
Total articles: 1093 / 1100 (99%)
Sites complets: 6 / 11
Articles manquants: 7
🎯 ETA (4 articles/jour): 1 jours → 01/11/2025
```

##### Vue détaillée pour une ville
```bash
./scripts/suivi-blogs.sh --ville rouen
```

Affiche :
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 Rouen
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Piliers: 10 articles
🛰️  Satellites: 19 articles
📈 Total: 29/100 articles (29%)
📉 Manquant: 71 articles
🎯 Statut: PRIORITAIRE

Progression: [█████░░░░░░░░░░░░░░░] 29%
```

##### Format JSON (pour CI/CD)
```bash
# Vue globale JSON
./scripts/suivi-blogs.sh --json

# Vue ville spécifique JSON
./scripts/suivi-blogs.sh --ville marseille --json
```

Sortie JSON :
```json
{
  "ville": "marseille",
  "piliers": 10,
  "satellites": 60,
  "total": 70,
  "objectif": 100,
  "progression": 70,
  "manquant": 30,
  "statut": "EN_COURS"
}
```

---

### 4. Dashboard HTML
**Fichier**: `dashboard-blogs.html`

Interface web visuelle avec :
- Statistiques globales
- Cartes par ville avec barres de progression
- Codes couleur par statut
- Section actions prioritaires

**Usage**:
```bash
# Ouvrir dans navigateur
open dashboard-blogs.html

# Ou démarrer serveur local
python3 -m http.server 8080
# puis http://localhost:8080/dashboard-blogs.html
```

**Screenshot**:
- 🟢 Vert : Sites à 100%+
- 🟡 Orange : Sites 90-99%
- 🔴 Rouge : Sites <90%

---

## 🚀 Workflows Recommandés

### Workflow Quotidien (Production)

**Matin** : Check progression
```bash
./scripts/suivi-blogs.sh
```

**Après production** : Vérifier ville spécifique
```bash
./scripts/suivi-blogs.sh --ville rouen
```

**Fin de journée** : Vue HTML complète
```bash
open dashboard-blogs.html
```

---

### Workflow CI/CD (Automatisation)

**Intégration dans pipeline**:
```yaml
# .github/workflows/blogs-check.yml
name: Blogs Progress Check

on:
  schedule:
    - cron: '0 18 * * *' # Tous les jours à 18h
  push:
    paths:
      - 'sites/*/content/blog/**'

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check Progress
        run: |
          chmod +x scripts/suivi-blogs.sh
          ./scripts/suivi-blogs.sh --json > progress.json
          
      - name: Check if complete
        run: |
          total=$(cat progress.json | jq '.objectif_global.total_produit')
          if [ $total -ge 1100 ]; then
            echo "🎉 OBJECTIF ATTEINT !"
          else
            echo "📊 Progression: $total/1100"
          fi
```

---

### Workflow Reporting (Management)

**Rapport hebdomadaire**:
```bash
#!/bin/bash
# scripts/rapport-hebdo.sh

echo "# Rapport Hebdomadaire - $(date +%d/%m/%Y)" > rapport.md
echo "" >> rapport.md

./scripts/suivi-blogs.sh >> rapport.md

echo "" >> rapport.md
echo "## Détails par ville prioritaire" >> rapport.md
for ville in rouen marseille; do
  echo "" >> rapport.md
  ./scripts/suivi-blogs.sh --ville $ville >> rapport.md
done

# Envoyer par email ou Slack
```

---

## 📊 Métriques Clés

### Statuts
- **DÉPASSÉ** : ≥100 articles (objectif atteint avec marge)
- **COMPLET** : 100 articles exactement
- **QUASI-COMPLET** : 90-99 articles (proche objectif)
- **EN_COURS** : 50-89 articles (en progression)
- **PRIORITAIRE** : <50 articles (action urgente requise)

### Piliers Standards (10)
1. Garde-Meuble
2. Déménageur
3. Pas Cher
4. Petit Déménagement
5. Location Camion
6. Prix
7. Aide Déménagement
8. International
9. Piano
10. Entreprise

### Structure Attendue
```
content/blog/
  ├── garde-meuble-{ville}/
  │   └── garde-meuble-{ville}-guide-complet.md (article pilier)
  ├── demenageur-{ville}/
  │   └── demenageur-{ville}-guide-complet.md
  ├── ... (8 autres piliers)
  └── satellites/
      ├── prix-garde-meuble-{ville}-2025.md
      ├── garde-meuble-pas-cher-{ville}.md
      └── ... (90 autres satellites)
```

**Exception Bordeaux** : Structure intégrée (satellites dans dossiers piliers)

---

## 🎯 Objectifs et Priorités

### Global
- **Objectif**: 1 100 articles (11 sites × 100)
- **Actuel**: 1 093 articles (99%)
- **Manquant**: 7 articles
- **ETA**: 1-2 jours au rythme actuel

### Par Priorité

| Priorité | Site | Articles Manquants | Durée Estimée |
|----------|------|-------------------|---------------|
| 🔴 P1 | **Rouen** | 71 | 71h (18 jours) |
| 🟠 P2 | **Marseille** | 30 | 30h (8 jours) |
| 🟡 P3 | **Toulouse** | 7 | 7h (2 jours) |
| 🟡 P4 | **Strasbourg** | 8 | 8h (2 jours) |
| 🟢 P5 | **Lyon** | 1 | 1h (1 jour) |

**Rythme de production** : 1 article/heure, 4 articles/jour

---

## 🔧 Maintenance

### Mise à jour des métriques

Les métriques sont calculées en temps réel à partir du filesystem :

```bash
# Recompter manuellement pour Rouen
find sites/rouen/content/blog -name "*.md" ! -name "README.md" | wc -l
```

### Ajouter une nouvelle ville

1. Créer la structure :
```bash
mkdir -p sites/nouvelle-ville/content/blog/satellites
```

2. Ajouter aux scripts :
```bash
# Dans scripts/suivi-blogs.sh
VILLES=(bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse nouvelle-ville)
```

3. Mettre à jour `etat-lieux-blogs.json`

---

## 📝 Commandes Utiles

### Compter articles par type
```bash
# Piliers uniquement
find sites/*/content/blog -maxdepth 2 -name "*-guide*.md" | wc -l

# Satellites uniquement
find sites/*/content/blog/satellites -name "*.md" ! -name "README.md" | wc -l
```

### Lister articles récents
```bash
# Articles créés dernières 24h
find sites/*/content/blog -name "*.md" -mtime -1

# Articles modifiés dernière semaine
find sites/*/content/blog -name "*.md" -mtime -7
```

### Vérifier structure
```bash
# Villes sans dossier satellites
for ville in bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse; do
  if [ ! -d "sites/$ville/content/blog/satellites" ]; then
    echo "⚠️  $ville: pas de dossier satellites"
  fi
done
```

### Analyser répartition
```bash
# Articles par pilier (toutes villes)
for pilier in garde-meuble demenageur pas-cher petit location prix aide international piano entreprise; do
  count=$(find sites/*/content/blog -path "*$pilier*" -name "*.md" 2>/dev/null | wc -l)
  echo "$pilier: $count articles"
done
```

---

## 🐛 Troubleshooting

### Le script ne trouve pas les articles

**Problème** : `0 articles` affiché pour une ville

**Solutions** :
1. Vérifier chemin : `ls sites/{ville}/content/blog`
2. Vérifier permissions : `chmod -R 755 sites/{ville}/content/blog`
3. Vérifier fichiers : `find sites/{ville}/content/blog -name "*.md"`

### Comptage incorrect (Bordeaux)

**Normal** : Bordeaux utilise structure intégrée (satellites dans piliers)

Le script compte tous les `.md` dans `content/blog` sans distinction.

### Progression >100% normale ?

**Oui** : Objectif = minimum 100 articles. Sites peuvent dépasser.

---

## 📅 Changelog

### v1.0 (31 octobre 2025)
- ✅ Rapport Markdown complet
- ✅ Export JSON structuré
- ✅ Script bash de suivi
- ✅ Dashboard HTML visuel
- ✅ Documentation complète

---

## 🔗 Liens Utiles

- [ETAT-LIEUX-BLOGS-2025.md](./ETAT-LIEUX-BLOGS-2025.md) - Rapport complet
- [etat-lieux-blogs.json](./etat-lieux-blogs.json) - Données JSON
- [scripts/suivi-blogs.sh](./scripts/suivi-blogs.sh) - Script suivi
- [dashboard-blogs.html](./dashboard-blogs.html) - Dashboard web

---

**Équipe SEO Moverz** • 2025  
Pour questions : contacter responsable SEO

