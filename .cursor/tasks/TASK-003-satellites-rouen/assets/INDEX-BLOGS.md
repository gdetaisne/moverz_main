# Index Documentation Blogs Moverz

**Date**: 31 octobre 2025  
**Objectif**: 10 piliers × 10 satellites = 100 articles par site

---

## 📊 Vue d'Ensemble

**Progression globale**: **1 093 / 1 100 articles (99%)**

| Catégorie | Nombre | Pourcentage |
|-----------|--------|-------------|
| Sites complets (≥100%) | 6/11 | 55% |
| Sites quasi-complets (90-99%) | 3/11 | 27% |
| Sites en retard (<90%) | 2/11 | 18% |
| **Articles manquants** | **117** | **11%** |

---

## 📁 Documentation Disponible

### 1. Rapport Complet
**[ETAT-LIEUX-BLOGS-2025.md](./ETAT-LIEUX-BLOGS-2025.md)**

Rapport exhaustif incluant :
- ✅ État détaillé par site
- ✅ Analyse par pilier (tableau 11×10)
- ✅ Priorités de production
- ✅ Plan d'action avec jalons
- ✅ Observations structurelles

**Format**: Markdown  
**Taille**: ~15 KB  
**Audience**: Équipe SEO, Management

---

### 2. Données Structurées
**[etat-lieux-blogs.json](./etat-lieux-blogs.json)**

Export JSON pour exploitation programmatique :
```json
{
  "date": "2025-10-31",
  "objectif_global": { "total_produit": 1093, ... },
  "sites": [ {...}, {...} ],
  "production_requise": { ... }
}
```

**Format**: JSON  
**Taille**: ~3 KB  
**Audience**: Développeurs, CI/CD

---

### 3. Script Monitoring
**[scripts/suivi-blogs.sh](./scripts/suivi-blogs.sh)**

Script bash automatisé pour suivi en temps réel.

**Fonctionnalités**:
- Vue d'ensemble tous sites
- Détail par ville
- Export JSON
- Calcul ETA automatique

**Usage**:
```bash
./scripts/suivi-blogs.sh                    # Vue globale
./scripts/suivi-blogs.sh --ville rouen      # Détail Rouen
./scripts/suivi-blogs.sh --json             # Format JSON
```

**Audience**: Producteurs, Daily standup

---

### 4. Dashboard Visuel
**[dashboard-blogs.html](./dashboard-blogs.html)**

Interface web interactive avec :
- Statistiques globales (cartes colorées)
- Grille par ville avec barres de progression
- Codes couleur par statut
- Section actions prioritaires

**Aperçu visuel**: Design moderne, responsive

**Usage**:
```bash
open dashboard-blogs.html
```

**Audience**: Management, Clients, Présentations

---

### 5. Guide Utilisation
**[GUIDE-SUIVI-BLOGS.md](./GUIDE-SUIVI-BLOGS.md)**

Documentation complète des outils :
- Présentation de chaque fichier
- Workflows recommandés (quotidien, CI/CD, reporting)
- Commandes utiles
- Troubleshooting
- Changelog

**Audience**: Nouveaux arrivants, Référence technique

---

## 🎯 Priorités Production

### 🔴 Priorité 1 : ROUEN
- **Articles manquants**: 71
- **Progression**: 29% (29/100)
- **Durée estimée**: 18 jours (4 articles/jour)
- **Piliers incomplets**: 10/10

**Action**: Production continue, tous piliers

---

### 🟠 Priorité 2 : MARSEILLE
- **Articles manquants**: 30
- **Progression**: 70% (70/100)
- **Durée estimée**: 8 jours
- **Piliers à compléter**: Pas Cher, Petit, Aide, International, Piano, Entreprise

**Action**: Compléter 6 piliers identifiés

---

### 🟡 Priorité 3 : FINITIONS
- **Lyon**: -1 article
- **Toulouse**: -7 articles
- **Strasbourg**: -8 articles
- **Total**: 16 articles
- **Durée estimée**: 4 jours

**Action**: Complétion finale rapide

---

## 📈 Métriques Qualité

### Sites Terminés (6)

| Site | Articles | Note | Caractéristiques |
|------|----------|------|------------------|
| Nantes | 151 | 8.5/10 | Hyper-localisation, FAQ complètes |
| Nice | 119 | 9.0/10 | Maillage dense, prix sourcés |
| Montpellier | 113 | 8.0/10 | Données locales, zéro invention |
| Rennes | 113 | 8.0/10 | 1200-1600 mots/article |
| Lille | 111 | 8.5/10 | Quartiers précis, acteurs réels |
| Bordeaux | 103 | 8.5/10 | Structure intégrée innovante |

**Qualité moyenne**: **8.4/10**

---

## 🏗️ Structures Observées

### Modèle Standard (10 sites)
```
content/blog/
  ├── garde-meuble-{ville}/
  │   └── garde-meuble-{ville}-guide-complet.md (pilier)
  ├── demenageur-{ville}/
  │   └── demenageur-{ville}-guide-complet.md (pilier)
  ├── ... (8 autres piliers)
  └── satellites/
      ├── article-satellite-1.md
      ├── article-satellite-2.md
      └── ... (90 autres satellites)
```

**Avantages**: Distinction claire pilier/satellite, comptage facile

---

### Modèle Intégré (Bordeaux)
```
content/blog/
  ├── demenagement-entreprise-bordeaux/
  │   ├── demenagement-entreprise-bordeaux-guide.md (pilier)
  │   ├── assurance-demenagement-entreprise-bordeaux.md (satellite)
  │   ├── checklist-demenagement-entreprise-bordeaux.md (satellite)
  │   └── ... (8 autres satellites)
  └── ... (9 autres piliers avec satellites intégrés)
```

**Avantages**: Organisation thématique, maillage facilité

---

## 🚀 Quick Start

### Pour producteur de contenu
```bash
# Check progression du matin
./scripts/suivi-blogs.sh

# Produire articles pour Rouen (priorité)
# ... écrire articles ...

# Vérifier après production
./scripts/suivi-blogs.sh --ville rouen
```

---

### Pour développeur
```bash
# Données JSON
cat etat-lieux-blogs.json | jq '.sites[] | select(.statut == "PRIORITAIRE")'

# Intégrer dans script
ROUEN_PROGRESS=$(./scripts/suivi-blogs.sh --ville rouen --json | jq '.progression')
echo "Rouen: $ROUEN_PROGRESS%"
```

---

### Pour management
```bash
# Dashboard visuel
open dashboard-blogs.html

# Rapport complet
cat ETAT-LIEUX-BLOGS-2025.md
```

---

## 📅 Jalons

| Date | Objectif | Articles |
|------|----------|----------|
| **7 nov 2025** | Rouen Piliers 1-3 | 20 |
| **14 nov 2025** | Rouen Piliers 4-6 | 25 |
| **21 nov 2025** | Rouen Piliers 7-10 | 26 |
| **28 nov 2025** | Marseille + Finitions | 46 |
| **30 nov 2025** | **OBJECTIF FINAL** | **1 100** |

---

## 🔗 Navigation Rapide

| Document | Description | Format | Audience |
|----------|-------------|--------|----------|
| [ETAT-LIEUX-BLOGS-2025.md](./ETAT-LIEUX-BLOGS-2025.md) | Rapport complet | MD | SEO/Mgmt |
| [etat-lieux-blogs.json](./etat-lieux-blogs.json) | Données structurées | JSON | Dev |
| [scripts/suivi-blogs.sh](./scripts/suivi-blogs.sh) | Script monitoring | Bash | Prod |
| [dashboard-blogs.html](./dashboard-blogs.html) | Dashboard visuel | HTML | Tous |
| [GUIDE-SUIVI-BLOGS.md](./GUIDE-SUIVI-BLOGS.md) | Documentation | MD | Ref |
| **INDEX-BLOGS.md** | Ce fichier | MD | Nav |

---

## 📞 Contacts

**Questions techniques**: Équipe Dev  
**Questions SEO**: Responsable SEO  
**Questions production**: Chef de projet contenu

---

## 📝 Changelog

### v1.0 (31 octobre 2025)
- ✅ Audit complet 11 sites
- ✅ Rapport détaillé Markdown
- ✅ Export JSON structuré
- ✅ Script bash monitoring
- ✅ Dashboard HTML visuel
- ✅ Documentation complète
- ✅ Index de navigation

---

**Équipe SEO Moverz** • Octobre 2025  
Dernière mise à jour : 31 octobre 2025

