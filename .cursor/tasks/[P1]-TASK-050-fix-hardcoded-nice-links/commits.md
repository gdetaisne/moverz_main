# Commits - TASK-050

**Tâche** : Fix Liens "nice" Hardcodés

---

## 📝 COMMITS À CRÉER

### Commit 1 : Correction Liens (attendu)

**Message** :
```
fix(faq,services): Remplacer liens hardcodés "nice" par dynamique

- Corriger 10 fichiers faq/page.tsx (quartiers-nice → {city.slug})
- Corriger 10 fichiers services/page.tsx (blog/quartiers-nice → {city.slug})
- Résout 72 URLs 404 (36 cross-site + 36 domaine dupliqué)

Sites : Bordeaux, Lille, Lyon, Marseille, Montpellier, Nantes, Rennes, Rouen, Strasbourg, Toulouse

TASK-050
```

**Fichiers modifiés** : 20 fichiers
- `sites/bordeaux/app/faq/page.tsx`
- `sites/bordeaux/app/services/page.tsx`
- `sites/lille/app/faq/page.tsx`
- `sites/lille/app/services/page.tsx`
- `sites/lyon/app/faq/page.tsx`
- `sites/lyon/app/services/page.tsx`
- `sites/marseille/app/faq/page.tsx`
- `sites/marseille/app/services/page.tsx`
- `sites/montpellier/app/faq/page.tsx`
- `sites/montpellier/app/services/page.tsx`
- `sites/nantes/app/faq/page.tsx`
- `sites/nantes/app/services/page.tsx`
- `sites/rennes/app/faq/page.tsx`
- `sites/rennes/app/services/page.tsx`
- `sites/rouen/app/faq/page.tsx`
- `sites/rouen/app/services/page.tsx`
- `sites/strasbourg/app/faq/page.tsx`
- `sites/strasbourg/app/services/page.tsx`
- `sites/toulouse/app/faq/page.tsx`
- `sites/toulouse/app/services/page.tsx`

**SHA** : (À remplir après commit)

---

## 📋 COMMITS DÉCLENCHEURS (Origine Bug)

### Commit Origine 1 : Services

**SHA** : `355478fa`  
**Auteur** : Lucie Stehelin de Taisne  
**Date** : 2025-11-05 10:51:27 +0700  
**Message** : "feat(services): Optimize /services pages - Pricing fix + SEO"

**Bug introduit** : Liens hardcodés "nice" dans 11 fichiers services/page.tsx

---

### Commit Origine 2 : FAQ

**SHA** : `7ae8f943`  
**Auteur** : Lucie Stehelin de Taisne  
**Date** : 2025-11-05 11:05:20 +0700  
**Message** : "feat(faq): Optimize FAQ page - SEO + UX improvements"

**Bug introduit** : Liens hardcodés "nice" dans 11 fichiers faq/page.tsx

---

**Total commits** : 1 (correction attendue)

