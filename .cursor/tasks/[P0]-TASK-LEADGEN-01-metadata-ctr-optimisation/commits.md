# Commits - TASK-LEADGEN-01

## ✅ Commits Existants (TASK-012 + TASK-014)

### Session 1 : Infrastructure villes dynamiques (30-31/10/2025)

**1. da4c1da** : Metadata dynamiques infrastructure  
**Date** : 30/10/2025  
**Scope** : Monorepo  
**Impact** : Foundation cityData dans metadata

**2. c43c0391** : Metadata dynamiques services + contact (11 villes)  
**Date** : 30/10/2025  
**Scope** : 11 villes  
**Impact** : Services et contact pages dynamiques

**3. db77cd26** : Fix seo-builders.ts metadataBase (Marseille)  
**Date** : 30/10/2025  
**Scope** : Marseille  
**Impact** : Correction metadataBase trailing slash

**4-5. [2 autres commits session 1]**  
**Date** : 30-31/10/2025  
**Details** : À documenter depuis historique TASK-012

---

### Session 2 : Pattern 1 "à Lille" (04/11/2025)

**6. 6c00451** : Pattern 1 corrections (4 villes)  
**Date** : 04/11/2025  
**Scope** : Nice, Lyon, Marseille, Lille  
**Files** : 16 fichiers (estimation-rapide, faq, notre-offre, inventaire-ia × 4 villes)  
**Impact** : Villes hardcodées "à Lille" corrigées → cityData dynamique

---

### Session 3 : Titles optimisation (30-31/10/2025)

**7. 34c00cb2** : Title optimisé 54 chars  
**Date** : 30/10/2025  
**Scope** : 11 villes  
**Impact** : Retrait "en" devant "7j" pour réduire longueur

**8. bc3a95ba** : Optimize titles 11 cities (SEO)  
**Date** : 31/10/2025  
**Scope** : 11 villes  
**Impact** : Optimisation longueur titles pages principales

**9. 5d315e3** : Phase 1 — dédup "Ville Ville" + Breadcrumbs/contact dynamiques  
**Date** : 30/10/2025  
**Scope** : 11 villes  
**Impact** : Suppression duplication ville dans titles + breadcrumbs dynamiques

---

### Session 4 : Canonical conformité (31/10/2025)

**10. 59b965f1** : Canonical URL trailing slash GSC  
**Date** : 31/10/2025  
**Scope** : 11 villes  
**Impact** : Conformité Search Console trailing slash

---

### Session 5 : Descriptions Tier 1 (04/11/2025)

**11. 3986fe2** : Phase 2 Tier 1 — descriptions optimisées (home Nice/Lyon) + corridors → Paris  
**Date** : 04/11/2025  
**Scope** : 11 villes (home 2 villes + corridors 11 villes)  
**Impact** : Descriptions avec formule [Bénéfice + Chiffre + CTA + Trust]

---

## 📋 Commits À Venir

### Prochaine session (quand démarrée)

**Commit 12** : Pattern 1 restant (Bordeaux, Nantes, Rennes)  
**Scope** : 3 villes × 4 fichiers = 12 fichiers  
**Files** :
- sites/bordeaux/app/estimation-rapide/layout.tsx
- sites/bordeaux/app/faq/layout.tsx
- sites/bordeaux/app/notre-offre/page.tsx
- sites/bordeaux/app/inventaire-ia/layout.tsx
- [Idem Nantes, Rennes]

**Message proposé** :
```
fix(metadata): Pattern 1 villes hardcodées Bordeaux/Nantes/Rennes

- estimation-rapide, faq, notre-offre, inventaire-ia (3 villes)
- Remplace "à Lille" hardcodé par cityData dynamique
- 12 fichiers corrigés

Part of TASK-LEADGEN-01
```

---

**Commit 13** : Pattern 1 final (Rouen, Strasbourg, Montpellier)  
**Scope** : 3 villes × 4 fichiers = 12 fichiers  
**Message proposé** :
```
fix(metadata): Pattern 1 villes hardcodées Rouen/Strasbourg/Montpellier

- estimation-rapide, faq, notre-offre, inventaire-ia (3 villes)
- Remplace "à Lille" hardcodé par cityData dynamique
- 12 fichiers corrigés
- Pattern 1 complet (40/40 fichiers)

Part of TASK-LEADGEN-01
```

---

**Commit 14** : Pattern 2 complet (9 villes)  
**Scope** : 9 villes × 3 fichiers = 27 fichiers  
**Files** :
- sites/{ville}/app/partenaires/page.tsx (9 villes)
- sites/{ville}/app/blog/page.tsx (9 villes)
- sites/{ville}/app/comment-ca-marche/page.tsx (9 villes)

**Message proposé** :
```
fix(metadata): Pattern 2 villes hardcodées (9 villes)

- partenaires, blog, comment-ca-marche
- Remplace "à Marseille" hardcodé par cityData dynamique
- 27 fichiers corrigés
- Pattern 2 complet (27/27 fichiers)

Part of TASK-LEADGEN-01
```

---

**Commit 15** : Templates centralisés buildTitle()  
**Scope** : Monorepo (lib/)  
**Files** :
- lib/seo-builders.ts (ou nouveau fichier)

**Message proposé** :
```
feat(seo): Créer templates centralisés buildTitle()

- Fonction buildTitle(pageType, city, options)
- 9 templates : home, services, blog, contact, faq, corridor, etc.
- Validation longueur 50-60 caractères
- Warning si title > 60 chars

Part of TASK-LEADGEN-01
```

---

**Commit 16** : Templates centralisés buildDescription()  
**Scope** : Monorepo (lib/)  
**Files** :
- lib/seo-builders.ts

**Message proposé** :
```
feat(seo): Créer templates centralisés buildDescription()

- Fonction buildDescription(pageType, city, options)
- Formule [Bénéfice + Chiffre + CTA + Trust]
- Validation longueur 150-160 caractères
- Warning si description hors range

Part of TASK-LEADGEN-01
```

---

**Commit 17** : Intégration templates dans pages  
**Scope** : 11 villes (sélection pages test)  
**Files** :
- sites/{ville}/app/page.tsx (home)
- sites/{ville}/app/services/page.tsx
- sites/{ville}/app/contact/page.tsx
- [Autres pages prioritaires]

**Message proposé** :
```
refactor(metadata): Utiliser buildTitle() et buildDescription() templates

- Remplace metadata hardcodées par fonctions centralisées
- Pages : home, services, contact, faq, blog
- 11 villes synchronisées

Part of TASK-LEADGEN-01
```

---

**Commit 18 (Final)** : Déploiement 11 sites + validation  
**Scope** : Infrastructure  
**Message proposé** :
```
deploy: TASK-LEADGEN-01 metadata CTR optimisation (11 villes)

✅ 51 fichiers villes hardcodées corrigés (Pattern 1 + 2)
✅ Templates centralisés buildTitle() et buildDescription()
✅ Tous titles 50-60 caractères
✅ Toutes descriptions 150-160 caractères avec CTA
✅ 11 sites déployés CapRover

Expected impact: CTR 0.56% → 2-3% = +4-5 leads/mois

Close TASK-LEADGEN-01
Supersedes TASK-012, TASK-014, TASK-039, TASK-040
```

---

## 📊 Résumé Commits

**Total attendu** : 18 commits (11 existants + 7 à venir)

**Breakdown** :
- Infrastructure : 3 commits ✅
- Pattern 1 : 3 commits (1 existant ✅ + 2 à venir 📋)
- Titles optimisation : 3 commits ✅
- Canonical : 1 commit ✅
- Descriptions : 1 commit ✅
- Pattern 2 : 1 commit 📋
- Templates centralisés : 3 commits 📋
- Déploiement final : 1 commit 📋

---

## 🔗 Liens Commits GitHub

**Repo monorepo** : [À compléter]  
**Repos villes** : 11 repos (à synchroniser)

---

### Session 6 : Templates metadata centralisés (05/11/2025)

**14. a4d75b95** : feat(seo): Optimize metadata templates for CTR improvement  
**Date** : 05/11/2025 10:00  
**Scope** : Monorepo + 11 villes  
**Files** : 23 fichiers (lib/seo-builders.ts source + 11 sites sync)  
**Impact** : Title 67→44 car, Description optimisée [Chiffre+Bénéfice+Trust], CTR +0.5-1%

---

*Dernière mise à jour* : 05/11/2025 10:00

