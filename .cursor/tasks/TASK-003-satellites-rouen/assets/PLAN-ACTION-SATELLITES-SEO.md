# 🎯 PLAN D'ACTION - SATELLITES SEO

**Date** : 29 Octobre 2025  
**Analyse** : 845 articles satellites sur 11 villes

---

## 📊 RÉSUMÉ GLOBAL

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║  📝 TOTAL SATELLITES : 845 articles                   ║
║                                                        ║
║  ✅ Articles OK      : 747 (88%)                      ║
║  ⚠️  Placeholders    : 79 (9%)                        ║
║  🗑️  Batch files     : 19 (2%)                        ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 🚨 PROBLÈMES CRITIQUES PAR VILLE

### 1️⃣ **NANTES - 79 Placeholders** 🔴

**Fichiers vides** :
- `article-satellite-22-placeholder.md` à `article-satellite-100-placeholder.md`
- Total : 79 fichiers à supprimer ou compléter

**Action** :
```bash
# OPTION A : Supprimer (recommandé)
rm sites/nantes/content/blog/satellites/article-satellite-*-placeholder.md

# OPTION B : Les compléter avec du contenu
# → Nécessite 79 articles à rédiger
```

**Impact** : -79 fichiers inutiles qui polluent le sitemap

---

### 2️⃣ **BORDEAUX - 0 Satellites** 🔴

**Problème** : Aucun dossier `satellites/` !

**Action** :
```bash
mkdir -p sites/bordeaux/content/blog/satellites
# Créer ou copier des satellites depuis Marseille
```

**Impact** : Site Bordeaux manque de contenu blog

---

### 3️⃣ **ROUEN - 8 Batch Files** 🟡

**Fichiers à supprimer** :
- `BATCH-PILIER-*.md` (5 fichiers)
- `BATCH-PRODUCTION-*.md` (3 fichiers)

**Action** :
```bash
rm sites/rouen/content/blog/satellites/BATCH-*.md
```

**Impact** : Nettoyage -8 fichiers non pertinents

---

### 4️⃣ **MONTPELLIER - 3 Batch Files** 🟡

**Fichiers à supprimer** :
- `ARTICLES-PILIER-06-BATCH.md`
- `BATCH-PILIERS-07-08-09-10.md`
- `RAPPORT-FINAL-PRODUCTION-MONTPELLIER.md`

**Action** :
```bash
rm sites/montpellier/content/blog/satellites/{ARTICLES,BATCH,RAPPORT}*.md
```

---

### 5️⃣ **STRASBOURG - Seulement 20 Satellites** 🟡

**Problème** : Très peu d'articles satellites comparé aux autres villes

**Note** : 60+ articles viennent d'être ajoutés dans `content/strasbourg/` mais pas encore dans `sites/strasbourg/content/`

**Action** : Synchroniser
```bash
rsync -av content/strasbourg/blog/satellites/ sites/strasbourg/content/blog/satellites/
```

---

## ⚠️ PROBLÈMES SEO (Non Critiques)

### Sans Description (92 articles)
Impact moyen - Google peut générer automatiquement

### Trop Courts <300 mots (112 articles)
Impact moyen - À enrichir progressivement

### Sans Liens Internes (29 articles)
Impact faible - Amélioration SEO interne

---

## 🎯 PLAN D'ACTION PRIORITAIRE

### **PHASE 1 : Nettoyage Urgent** (30 min)

```bash
# 1. Supprimer placeholders Nantes
rm sites/nantes/content/blog/satellites/article-satellite-*-placeholder.md

# 2. Supprimer batch files Rouen
rm sites/rouen/content/blog/satellites/BATCH-*.md

# 3. Supprimer batch files Montpellier
rm sites/montpellier/content/blog/satellites/{ARTICLES-PILIER,BATCH,RAPPORT}*.md

# 4. Créer dossier Bordeaux
mkdir -p sites/bordeaux/content/blog/satellites

# 5. Synchroniser Strasbourg
rsync -av content/strasbourg/blog/satellites/ sites/strasbourg/content/blog/satellites/
```

**Impact** : -106 fichiers problématiques, +60 articles Strasbourg

---

### **PHASE 2 : Amélioration SEO** (2-4h)

#### A. Compléter Frontmatter Manquant

Pour les 92 articles sans description :
- Ajouter `description:` SEO-optimisée
- Vérifier `publishedAt:` présent
- Ajouter `keywords:` si pertinent

#### B. Enrichir Articles Courts

Pour les 112 articles <300 mots :
- Ajouter sections FAQ
- Ajouter exemples concrets
- Ajouter tableaux comparatifs
- Objectif : min 400-500 mots

#### C. Ajouter Liens Internes

Pour les 29 articles sans liens :
- Lier vers articles piliers pertinents
- Lier vers autres satellites connexes
- Ajouter CTA vers estimation

---

### **PHASE 3 : Contenu Bordeaux** (3-5 jours)

Bordeaux n'a AUCUN satellite. Options :

**Option A** : Copier depuis Marseille
```bash
cp -r sites/marseille/content/blog/satellites/* sites/bordeaux/content/blog/satellites/
# Puis remplacer "marseille" par "bordeaux" dans tous les fichiers
```

**Option B** : Générer du nouveau contenu
- Utiliser les briefs SEO
- Créer 50-60 satellites originaux
- Plus long mais meilleur SEO

---

## 📊 RÉSULTATS ATTENDUS

### Après Phase 1 (Nettoyage)
- ✅ -106 fichiers inutiles
- ✅ +60 articles Strasbourg
- ✅ Sitemap propre
- ✅ Crawl budget mieux utilisé

### Après Phase 2 (SEO)
- ✅ 100% articles avec description
- ✅ 80%+ articles >400 mots
- ✅ Tous articles avec liens internes
- ✅ +15-25% indexation estimée

### Après Phase 3 (Bordeaux)
- ✅ 50-60 satellites Bordeaux
- ✅ Parité avec autres villes
- ✅ +30% trafic blog Bordeaux

---

## ✅ CHECKLIST IMMÉDIATE

- [ ] Exécuter Phase 1 (nettoyage)
- [ ] Commit et push
- [ ] Déployer sur les 11 sites
- [ ] Vérifier sitemaps propres
- [ ] Soumettre à Google Search Console

---

**Voulez-vous que je lance la Phase 1 (nettoyage) maintenant ?** 🧹

