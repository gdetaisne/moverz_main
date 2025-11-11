# Context - TASK-050

**Date** : 05/11/2025  
**Détection** : Guillaume via GSC

---

## 🔍 CONTEXTE DÉCOUVERTE

Guillaume a reçu une liste de **72 URLs 404** provenant de Google Search Console, avec un pattern étrange :

```
https://devis-demenageur-lille.fr/quartiers-nice
https://devis-demenageur-lille.fr/devis-demenageur-lille.fr/quartiers-nice
https://devis-demenageur-lyon.fr/blog/demenagement-nice
...
```

**Observation** : Tous les sites (sauf Nice) pointent vers des URLs contenant "nice".

---

## 🕵️ INVESTIGATION

### Étape 1 : Recherche dans le Code
```bash
grep -r "quartiers-nice" sites/ --include="*.tsx"
```

**Résultat** : 22 fichiers affectés (11 sites × 2 pages)

### Étape 2 : Historique Git
```bash
git log --all --oneline --follow -- sites/lille/app/faq/page.tsx
```

**Résultat** : 
- Commit `7ae8f943` (faq) - Lucie - 05/11/2025 11:05:20
- Commit `355478fa` (services) - Lucie - 05/11/2025 10:51:27

### Étape 3 : Vérification Avant/Après
```bash
git show 355478fa^:sites/lille/app/services/page.tsx | grep "nice"
# Résultat : 0 (pas de "nice" avant)

git show 355478fa:sites/lille/app/services/page.tsx | grep "nice"
# Résultat : 2 occurrences (bug introduit)
```

**Conclusion** : Bug introduit par Lucie ce matin lors d'optimisations SEO/UX.

---

## 📊 ANALYSE DÉTAILLÉE

### Commits de Lucie (05/11/2025 matin)

#### Commit 1 : `355478fa` (10:51:27)
**Message** : "feat(services): Optimize /services pages - Pricing fix + SEO"

**Modifications** :
- Ajout section liens internes (blog, quartiers, services)
- Ajout cards ressources
- Ajout CTAs

**Bug introduit** : Liens hardcodés "nice" dans 11 fichiers `services/page.tsx`

---

#### Commit 2 : `7ae8f943` (11:05:20)
**Message** : "feat(faq): Optimize FAQ page - SEO + UX improvements"

**Modifications** :
- Ajout barre de recherche FAQ
- Ajout compteurs catégories
- Ajout section liens internes (9 links)
- Ajout emojis catégories
- Ajout scroll-to-top button

**Bug introduit** : Liens hardcodés "nice" dans 11 fichiers `faq/page.tsx`

---

## 🎯 CAUSE ROOT

### Hypothèse Confirmée
1. Lucie a travaillé sur le site **Nice en premier**
2. Elle a ajouté des liens internes : `/quartiers-nice/`, `/blog/demenagement-nice/`
3. Elle a **copié/collé** ce code vers les 10 autres sites
4. Elle a **oublié de remplacer** "nice" par `{city.slug}` dynamique

**Erreur commune** : Lors de travaux multi-sites, il est facile d'oublier de dynamiser toutes les références ville.

---

## 💡 LEÇONS APPRISES

### Pour Lucie
1. **Toujours utiliser** `city.slug`, `city.nameCapitalized`, etc.
2. **Ne jamais hardcoder** un nom de ville dans un lien/texte
3. **Tester avant push** : `grep -r "nice\|lille\|lyon" sites/{autre-ville}/` pour détecter hardcoding

### Pour le Workflow
1. **Pre-commit hook** pourrait détecter hardcoded city names
2. **Checklist** : "Ai-je utilisé des variables dynamiques partout ?"
3. **Tests automatisés** : Scanner liens internes pour détecter cross-city references

---

## 🔗 RELATED

### Tâches Similaires Passées
- TASK-012 : Villes hardcodées (corrigé)
- TASK-LEADGEN-01 : Bug "lille" catégories blog (corrigé)

**Pattern récurrent** : Hardcoding villes est l'erreur #1 dans ce monorepo multi-sites.

---

## 📝 COMMUNICATION

### À Guillaume
✅ Bug détecté et analysé  
✅ Tâche créée pour Lucie  
✅ Solution documentée  
⏱️ Correction estimée : 45 min

### À Lucie
Pas de reproche, erreur commune et compréhensible. La documentation complète est dans `TASK-050/README.md` avec toutes les étapes de correction.

---

**Auteur** : Cursor AI  
**Date** : 05/11/2025

