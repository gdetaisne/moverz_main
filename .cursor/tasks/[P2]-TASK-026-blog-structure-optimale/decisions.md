# Décisions Techniques - TASK-026 : Blog Structure Optimale

**Date création** : 03 novembre 2025

---

## 🎯 DÉCISIONS STRATÉGIQUES

### Décision #1 : Structure C (URLs courtes + silos thématiques)

**Date** : 03/11/2025  
**Contexte** : Analyse SEO comparative de 3 structures possibles  
**Options évaluées** :

- **Structure A** (Lille) : Catégorie fourre-tout → Score 4/10
- **Structure B** (Bordeaux) : URLs longues → Score 6/10
- **Structure C** (Optimal) : URLs courtes + silos → Score 9/10

**Décision** : ✅ Structure C pour Montpellier/Nice

**Raison** :
- URLs courtes (<60 caractères) = CTR +150% SERPs
- Silos thématiques = autorité renforcée Google
- Scalable = même structure 11 villes
- Référence : Notion, Stripe, Airtable utilisent cette structure

**Impact** :
- Ranking projeté : positions 8-15 (vs 15-25 actuellement)
- Trafic estimé : +100-150%
- Leads : +140%

**Approuvé par** : Guillaume

---

### Décision #2 : 10 Catégories Standard

**Date** : 03/11/2025  
**Contexte** : Définir catégories réutilisables pour toutes nouvelles villes

**Catégories choisies** :

1. `demenageur` (2900 recherches/mois)
2. `pas-cher` (1600)
3. `garde-meuble` (880)
4. `prix` (720)
5. `entreprise` (480)
6. `international` (320)
7. `etudiant` (260)
8. `piano` (170)
9. `urgent` (140)
10. `location-camion` (590)

**Total** : ~8000 recherches/mois par ville

**Critères choix** :
- Volume recherche >100/mois
- Difficulté ranking : Facile → Moyenne
- Correspond à services Moverz
- Couvre spectrum complet besoins utilisateurs

**Alternatives rejetées** :
- ❌ `demenagement-{ville}` (trop générique)
- ❌ `longue-distance` (volume faible <100/mois)
- ❌ `senior` (niche trop spécifique)

**Approuvé par** : Guillaume

---

### Décision #3 : Ville dans Slug uniquement (pas dans catégorie)

**Date** : 03/11/2025  
**Contexte** : Éviter redondance Bordeaux (ville apparaît 2x)

**Structure choisie** :
```
Catégorie : "demenageur" (pas "demenageur-montpellier")
Slug : "demenageur-montpellier-expert"
URL : /blog/demenageur/demenageur-montpellier-expert/
```

**Raison** :
- ✅ Ville apparaît 1x = signal local suffisant
- ✅ URLs courtes
- ✅ Catégories réutilisables (même nom 11 villes)

**Alternative rejetée** :
```
❌ Catégorie : "demenageur-montpellier"
   Slug : "demenageur-montpellier-expert"
   URL : /blog/demenageur-montpellier/demenageur-montpellier-expert/
   → Redondance, URLs longues
```

**Approuvé par** : Guillaume

---

### Décision #4 : Montpellier d'abord, puis Nice

**Date** : 03/11/2025  
**Contexte** : Quelle ville créer en premier ?

**Ordre choisi** :
1. ✅ Montpellier
2. ✅ Nice

**Raison Montpellier d'abord** :
- Volume recherche légèrement supérieur
- Tester workflow complet sur 1 ville
- Valider templates avant duplication
- Corriger erreurs avant Nice

**Approuvé par** : Guillaume

---

### Décision #5 : Pas de Migration Immédiate Bordeaux/Lille

**Date** : 03/11/2025  
**Contexte** : User refuse redirections

**Décision** : ❌ Ne PAS migrer Bordeaux/Lille maintenant

**Raison** :
- User contrainte : "je ne veux pas de redirections"
- Priorité : Fixer 404s actuels (Option A)
- Stratégie : Prouver ROI structure optimale avec Montpellier/Nice
- Décision migration : Plus tard (si analytics justifient)

**Plan** :
1. Court terme : Fixer 404s Bordeaux/Lille (garder structure actuelle)
2. Moyen terme : Créer Montpellier/Nice (structure optimale)
3. Monitoring : Comparer analytics 3-6 mois
4. Long terme : Décider migration si ROI prouvé

**Approuvé par** : Guillaume

---

## 🔧 DÉCISIONS TECHNIQUES

### Décision #6 : Ne PAS Modifier `lib/blog.ts` Existant

**Date** : 03/11/2025  
**Contexte** : Éviter casser Bordeaux/Lille/Rennes existants

**Décision** : ✅ Ajouter catégories, ne PAS modifier existantes

**Implémentation** :
```typescript
const CATEGORY_MAPPING = {
  // ✅ Nouvelles catégories (Montpellier/Nice)
  'demenageur': 'demenageur',
  'pas-cher': 'pas-cher',
  'garde-meuble': 'garde-meuble',
  // ...
  
  // ⚠️ Legacy (NE PAS TOUCHER - Bordeaux/Lille)
  'demenagement-pas-cher-bordeaux': 'pas-cher',
  'demenagement-lille': 'demenagement-lille',
  // ...
};
```

**Raison** :
- Éviter régression sites existants
- Code rétrocompatible
- Tests isolés possibles

**Approuvé par** : Guillaume

---

### Décision #7 : Templates Réutilisables

**Date** : 03/11/2025  
**Contexte** : Accélérer création futures villes

**Décision** : ✅ Créer templates génériques

**Fichiers templates** :
- `TEMPLATE-PILIER.md` (guide principal)
- `TEMPLATE-SATELLITE.md` (article satellite)

**Variables dynamiques** :
- `{VILLE}` → Montpellier, Nice, etc.
- `{CATEGORY}` → demenageur, pas-cher, etc.
- `{DATE}` → Date publication

**Bénéfice** :
- Gain temps : 50% (4h au lieu de 8h par ville)
- Cohérence contenu
- Scalable (futures villes : Strasbourg, Rouen, etc.)

**Approuvé par** : Guillaume

---

### Décision #8 : Build Local Obligatoire Avant Deploy

**Date** : 03/11/2025  
**Contexte** : Éviter erreurs production

**Décision** : ✅ Workflow obligatoire

**Workflow** :
```bash
1. cd sites/montpellier
2. npm run build        # ⚠️ OBLIGATOIRE
3. npm run start        # Tester localement
4. Valider URLs
5. git commit + push    # Seulement si build OK
```

**Validation build** :
- [ ] 0 erreur TypeScript
- [ ] 0 erreur Next.js
- [ ] Toutes URLs accessibles
- [ ] Metadata complète

**Si build échoue** : ❌ Ne PAS déployer

**Approuvé par** : Guillaume

---

### Décision #9 : Sitemap.xml Auto-Généré

**Date** : 03/11/2025  
**Contexte** : SEO indexation

**Décision** : ✅ Utiliser `next-sitemap`

**Configuration** :
```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};
```

**Bénéfice** :
- Sitemap auto-généré à chaque build
- Toutes URLs blog incluses
- Google indexe plus vite

**Approuvé par** : Guillaume

---

### Décision #10 : Monitoring Analytics Obligatoire

**Date** : 03/11/2025  
**Contexte** : Mesurer ROI structure optimale

**Décision** : ✅ Tracking complet dès J0

**Outils activés** :
- Google Analytics 4
- Search Console
- Ahrefs (positions)
- Hotjar (heatmaps - optionnel)

**Métriques suivies** :
- Trafic organique (visites/mois)
- Positions Google (top 10 mots-clés)
- Conversions (leads/mois)
- Taux rebond
- Pages/session

**Fréquence reporting** :
- Semaine 1 : Check basique
- Mois 1 : Premier rapport
- Mois 3 : Analyse intermédiaire
- Mois 6 : Rapport complet vs Bordeaux/Lille

**Objectif** : Prouver ROI structure optimale avant migration anciennes villes

**Approuvé par** : Guillaume

---

## 📋 RÉSUMÉ DÉCISIONS

| # | Décision | Type | Impact | Status |
|---|----------|------|--------|--------|
| 1 | Structure C (optimal SEO) | Stratégique | Fort | ✅ Validé |
| 2 | 10 catégories standard | Stratégique | Moyen | ✅ Validé |
| 3 | Ville dans slug uniquement | Technique | Fort | ✅ Validé |
| 4 | Montpellier puis Nice | Stratégique | Faible | ✅ Validé |
| 5 | Pas migration Bordeaux/Lille | Stratégique | Fort | ✅ Validé |
| 6 | Ne pas modifier lib/blog.ts existant | Technique | Moyen | ✅ Validé |
| 7 | Templates réutilisables | Technique | Moyen | ✅ Validé |
| 8 | Build local obligatoire | Process | Moyen | ✅ Validé |
| 9 | Sitemap auto-généré | Technique | Faible | ✅ Validé |
| 10 | Monitoring analytics | Process | Fort | ✅ Validé |

---

**Toutes décisions approuvées par** : Guillaume  
**Date validation** : 03/11/2025  
**Prêt à démarrer** : ✅ Oui (quand Guillaume décide)

