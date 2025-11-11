# TASK-LEADGEN-04 : Optimisation Metadata Articles Blog

**Priorité** : P1 (Important - Impact CTR articles)  
**Temps estimé** : 10-20h (automatisation requise)  
**Assigné à** : Guillaume  
**Statut** : 📋 À FAIRE (après LEADGEN-01 validé)  
**Créée le** : 05/11/2025

---

## 🎯 OBJECTIF

Optimiser les **metadata des articles blog** (fichiers .md) pour améliorer le CTR sur les pages articles.

**Scope** : ~100-200 articles × 11 sites = **1100-2200 fichiers .md**

**Impact business** :
- Articles blog = 30-40% du trafic SEO
- CTR articles actuel : ~1.5%
- CTR articles optimisé : 2.5-3.5%
- Leads additionnels : +100-200/mois

---

## 🔍 PROBLÈME IDENTIFIÉ

### Exemple Actuel (Non Optimisé)

**Article** : `petit-demenagement-marseille.md`  
**URL** : https://devis-demenageur-marseille.fr/blog/demenagement-marseille/petit-demenagement  
**Impressions** : 2% du site (30 impressions/mois estimé)

**Metadata actuelle** :
```yaml
title: "Petit Déménagement Marseille : Votre Solution Simple & Pas Chère"
description: "Déménagez votre studio ou petit appartement à Marseille sans stress ! 
Découvrez nos services de petits déménagements rapides, économiques et sur mesure. 
Devis gratuit."
```

**Longueur** : 168 caractères (OK technique)

**❌ Problèmes** :
1. **Wording générique** : "sans stress", "rapides, économiques" (clichés)
2. **Zéro USP Moverz** : Ne mentionne PAS volume IA, anonymat, comparaison
3. **Ton déménageur direct** : "nos services" (on dirait qu'on déménage nous-mêmes)
4. **Pas de différenciation** : Concurrent pourrait écrire pareil
5. **Pas de prix** : "Devis gratuit" au lieu de "300-500€"

---

## ✅ VERSION OPTIMISÉE (Proposition)

### Option 1 - Focus Volume IA + Prix (158 car)
```yaml
description: "Petit déménagement Marseille 300-500€. Volume IA identique pour 3-5 devis comparables. Dossier anonyme, zéro harcèlement. Studio/T1. Vraie comparaison."
```

### Option 2 - Focus Comparaison + USP (159 car)
```yaml
description: "Comparez 3-5 devis petit déménagement Marseille sur même volume IA. Dossier anonyme, pas d'estimation fantaisiste. Studio 300-500€. Déménageurs vérifiés."
```

### Option 3 - Focus Anti-Concurrence (157 car)
```yaml
description: "Petit déménagement Marseille : pas 20m³ → 30m³ comme ailleurs. Volume IA identique pour tous. 3-5 devis comparables 300-500€. Dossier anonyme."
```

**Amélioration attendue** :
- USP Moverz communiqués (Volume IA, Anonymat)
- Prix signal (300-500€)
- Différenciation vs concurrence
- CTR +50-100%

---

## 📊 SCOPE COMPLET

### Inventaire Articles à Optimiser

**Par site** (exemple Marseille) :
- Guides piliers : ~10 articles (demenagement-marseille/, garde-meuble-marseille/)
- Articles satellites : ~50-100 articles (satellites/)

**11 sites** :
- Sites matures (Marseille, Lyon, Bordeaux, Nice) : ~100-150 articles chacun
- Sites moyens (Lille, Nantes, Rennes, Rouen) : ~50-80 articles
- Sites récents (Strasbourg, Montpellier, Toulouse) : ~20-40 articles

**Total estimé** : **1100-2200 fichiers .md**

---

## 🛠️ APPROCHE TECHNIQUE

### Option A : Script Automatisé (Recommandé)

**Créer un script** qui :
1. Lit chaque fichier .md
2. Extrait title et description actuels
3. Identifie le type d'article (prix, garde-meuble, pas cher, etc.)
4. Génère nouvelle description avec formule :
   ```
   [Sujet] {Ville} [Prix si applicable]. 
   Volume IA identique pour 3-5 devis comparables. 
   Dossier anonyme, déménageurs vérifiés.
   ```
5. Écrit nouveau frontmatter

**Temps** : 2-3h script + 2h validation sur 50 articles test + 1h déploiement  
**Total** : 5-6h

---

### Option B : Manuel par Batch (Lent)

**Process** :
1. Sélectionner top 20% articles (impressions Search Console)
2. Optimiser manuellement (20-30 articles prioritaires)
3. Mesurer impact
4. Étendre si ROI validé

**Temps** : 30 min × 200 articles = 100h (irréaliste)

---

### Option C : Hybride (Recommandé)

**Phase 1 - Manuel Test** (2h) :
- Optimiser 10 articles piliers manuellement
- Tester impact CTR sur 7-14 jours
- Valider formule metadata

**Phase 2 - Automatisation** (5h) :
- Créer script si ROI validé Phase 1
- Appliquer aux 1100-2200 articles
- Déployer en batch (10 sites/jour)

**Total** : 7h

---

## 📋 FORMULE METADATA PAR TYPE D'ARTICLE

### Articles "Prix" (ex: prix-demenagement-marseille.md)

**Template** :
```yaml
description: "Prix déménagement {Ville} 2025 : Studio 300-500€, T2 500-800€, T3 800-1200€. Volume IA identique pour 3-5 devis comparables. Dossier anonyme. Vraie comparaison."
```

**Éléments** :
- ✅ Prix signals clairs
- ✅ USP Volume IA
- ✅ USP Anonymat
- ✅ 150-160 car

---

### Articles "Pas Cher" (ex: demenagement-pas-cher-marseille.md)

**Template** :
```yaml
description: "Déménagement pas cher {Ville} : Comparez 3-5 devis sur volume IA identique. Dossier anonyme, pas d'estimation fantaisiste. Économisez vs appel direct."
```

**Éléments** :
- ✅ Focus économies
- ✅ USP Comparaison vraie
- ✅ Référence concurrence ("estimation fantaisiste")
- ✅ 150-160 car

---

### Articles "Garde-Meuble" (ex: garde-meuble-marseille.md)

**Template** :
```yaml
description: "Garde-meuble {Ville} : 3-5 devis comparables sur volume IA identique. Dossier anonyme, zéro harcèlement. Prix 50-150€/mois. Déménageurs vérifiés."
```

**Éléments** :
- ✅ Prix signal (50-150€/mois)
- ✅ USP Volume IA + Anonymat
- ✅ 150-160 car

---

### Articles "Petit Déménagement" (ex: petit-demenagement-marseille.md)

**Template actuel** :
```
"Déménagez votre studio ou petit appartement à Marseille sans stress ! 
Découvrez nos services de petits déménagements rapides, économiques et sur mesure. 
Devis gratuit." (168 car)
```

**Template optimisé** (158 car) :
```
"Petit déménagement {Ville} 300-500€. 
Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme, pas d'estimation fantaisiste. 
Studio/T1."
```

**Différence** :
- ❌ AVANT : Wording générique, ton déménageur, zéro USP
- ✅ APRÈS : Prix clair, USP Moverz, référence concurrence

---

## 🎯 PLAN D'EXÉCUTION

### Phase 1 : Test Manuel (2h) - **À FAIRE EN PRIORITÉ**

**Objectif** : Valider formule metadata sur 10 articles piliers

**Articles à optimiser** :
1. Prix déménagement {Ville} (11 sites) = 11 articles
2. Petit déménagement {Ville} (sites matures) = 4 articles
3. Garde-meuble {Ville} (sites matures) = 4 articles
4. Déménagement pas cher {Ville} (sites matures) = 4 articles

**Total Phase 1** : 20-25 articles

**Méthode** :
1. Identifier top articles (Search Console impressions)
2. Réécrire metadata avec formule optimisée
3. Commit + deploy
4. Mesurer J+7, J+14

**Critère succès Phase 1** :
- CTR articles +30-50% → Go Phase 2
- CTR stable → Affiner formule

---

### Phase 2 : Automatisation (5h) - **Si Phase 1 validée**

**Objectif** : Script pour optimiser 1100-2200 articles

**Script à créer** :
```javascript
// analyze-and-optimize-blog-metadata.mjs
// 1. Lire tous les .md (content/blog/)
// 2. Parser frontmatter
// 3. Identifier type (prix, pas-cher, garde-meuble, etc.)
// 4. Générer nouvelle description avec formule
// 5. Écrire nouveau frontmatter
// 6. Rapport changements
```

**Validation** :
- Test sur 50 articles
- Review manuel
- Déploiement batch (100 articles/jour)

---

## 📊 ROI ATTENDU

### Baseline Actuel
- Articles blog : ~500 impressions/mois (estimé)
- CTR articles : ~1.5%
- Clics articles : ~8 clics/mois
- Leads articles : ~0-1/mois

### Après Optimisation
- Articles blog : ~500 impressions/mois (stable)
- CTR articles : ~2.5-3%
- Clics articles : ~13-15 clics/mois (+60%)
- Leads articles : ~1-2/mois

**Impact additionnel** : +5-10 clics/mois = +1-2 leads/mois = +50-300€/mois

---

## ⚠️ DÉPENDANCES

**Requis avant démarrage** :
- ✅ TASK-LEADGEN-01 terminée (metadata techniques OK)
- ✅ Grille pain points validée (wording basé sur concurrence)
- ⏳ LEADGEN-01 déployée et impact mesuré J+7

**Bloquant si** :
- Wording "Best Guess" LEADGEN-01 ne convertit pas → Revoir formule avant articles

---

## 📁 FICHIERS CONCERNÉS

### Structure Content Blog (par site)
```
sites/{ville}/content/blog/
├── demenagement-{ville}/          # ~10 guides piliers
│   ├── prix-demenagement-{ville}.md
│   ├── petit-demenagement-{ville}.md
│   ├── demenagement-pas-cher-{ville}.md
│   └── ...
├── garde-meuble-{ville}/           # ~3-5 guides
│   └── ...
└── satellites/                     # ~50-150 articles
    ├── prix-petit-demenagement-{ville}.md
    ├── aide-financiere-{ville}.md
    └── ...
```

**Total Marseille** : ~150 articles  
**Total Nice** : ~100 articles  
**Total Lyon** : ~140 articles  
**Total Bordeaux** : ~143 articles  
**Autres sites** : ~30-80 articles chacun

**TOTAL 11 SITES** : ~1100-2200 articles

---

## 🎨 EXEMPLES AVANT/APRÈS

### Article "Petit Déménagement Marseille"

**AVANT** (168 car - Générique) :
```
"Déménagez votre studio ou petit appartement à Marseille sans stress ! 
Découvrez nos services de petits déménagements rapides, économiques et sur mesure. 
Devis gratuit."
```

**APRÈS** (158 car - Optimisé USP) :
```
"Petit déménagement Marseille 300-500€. Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme, pas d'estimation fantaisiste. Studio/T1."
```

**Différences** :
- ❌ → ✅ Prix signal (300-500€)
- ❌ → ✅ USP Volume IA identique
- ❌ → ✅ USP Anonymat
- ❌ → ✅ Référence concurrence ("estimation fantaisiste")
- ❌ → ✅ Ton comparateur (pas déménageur)

---

### Article "Prix Déménagement Lyon"

**AVANT** (estimation, pas vu) :
```
"Découvrez les tarifs de déménagement à Lyon. 
Guide complet des prix par type de logement. 
Devis gratuit."
```

**APRÈS** (157 car - Optimisé) :
```
"Prix déménagement Lyon 2025 : Studio 300-500€, T2 500-800€, T3 800-1200€. 
Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme. Vraie comparaison."
```

**Différences** :
- ❌ → ✅ Prix précis (300-500€, 500-800€, 800-1200€)
- ❌ → ✅ USP Volume IA
- ❌ → ✅ USP Anonymat
- ❌ → ✅ Année (2025)

---

## 📋 FORMULES PAR TYPE D'ARTICLE

### Type 1 : Prix (15-20% articles)

**Template** (157 car) :
```
"Prix déménagement {Ville} 2025 : Studio {prix1}, T2 {prix2}, T3 {prix3}. 
Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme. Vraie comparaison."
```

**Variables** :
- `{Ville}` : Marseille, Lyon, Nice, etc.
- `{prix1}`, `{prix2}`, `{prix3}` : Extraits de `lib/cities-data.ts` ou contenu article

---

### Type 2 : Pas Cher / Économique (10-15% articles)

**Template** (159 car) :
```
"Déménagement pas cher {Ville} : Comparez 3-5 devis sur volume IA identique. 
Dossier anonyme, pas d'estimation fantaisiste. 
Économisez vs appel direct."
```

---

### Type 3 : Garde-Meuble (5-10% articles)

**Template** (158 car) :
```
"Garde-meuble {Ville} : 3-5 devis comparables sur volume IA identique. 
Dossier anonyme, zéro harcèlement. 
Prix 50-150€/mois. Déménageurs vérifiés."
```

---

### Type 4 : Spécifiques (Piano, International, Entreprise, etc.) (10% articles)

**Template Piano** (156 car) :
```
"Déménagement piano {Ville} : 3-5 devis spécialisés sur volume IA identique. 
Dossier anonyme, déménageurs vérifiés piano. 
Prix 200-600€. Vraie comparaison."
```

**Template International** (158 car) :
```
"Déménagement international {Ville} : Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme, déménageurs vérifiés. 
Europe/Monde. Formalités incluses."
```

---

### Type 5 : Satellites / Long-tail (50-60% articles)

**Template générique** (155 car) :
```
"{Sujet} {Ville} : 3-5 devis comparables sur volume IA identique. 
Dossier anonyme, zéro harcèlement. 
Déménageurs vérifiés. Prix {fourchette}."
```

**Variables** :
- `{Sujet}` : Extrait du title
- `{fourchette}` : Extraite du contenu si disponible

---

## 🎯 PRIORISATION ARTICLES

### Priorité 1 : Top 20% Trafic (200-400 articles)

**Critères** :
- Impressions Search Console > 10/mois
- Position Google < 10
- CTR actuel < 2%

**Impact attendu** : +80% des gains CTR

---

### Priorité 2 : Articles Piliers (110-220 articles)

**Fichiers** :
- `content/blog/demenagement-{ville}/` (10 articles × 11 sites)
- `content/blog/garde-meuble-{ville}/` (3-5 articles × 11 sites)

**Impact** : Brand + trust (pages principales catégories)

---

### Priorité 3 : Satellites (700-1500 articles)

**Approche** :
- Script automatisé obligatoire
- Validation manuelle 10% (70-150 articles)
- Déploiement progressif

---

## 📊 MÉTRIQUES SUCCÈS

### Baseline (Avant)
- CTR moyen articles : 1.5%
- Impressions articles : ~500/mois
- Clics articles : ~8/mois

### Objectif (Après)
- CTR moyen articles : 2.5-3%
- Impressions articles : ~500/mois (stable)
- Clics articles : ~13-15/mois (+60%)

### Mesure
- Google Search Console : CTR par URL
- Comparaison J-7 vs J+7, J+14, J+30
- Top 50 articles prioritaires trackés individuellement

---

## 🚀 PLAN D'EXÉCUTION (Quand Démarrée)

### Jour 1-2 : Analyse & Priorisation (3h)

1. Export Search Console : Top 50 articles par impressions
2. Analyse metadata actuelles (wording patterns)
3. Priorisation : Top 20% à optimiser en priorité
4. Validation formules par type d'article

---

### Jour 3-4 : Test Manuel Top 20 Articles (4h)

1. Optimiser 20 articles piliers manuellement
2. Commit + deploy (1-2 sites test)
3. Capture baseline CTR (screenshots Search Console)
4. Attente J+7 pour mesure

---

### Jour 5 : Mesure + Décision (1h)

1. Comparer CTR J-7 vs J+7
2. Si +30% → Go Phase 2 (script)
3. Si stable → Affiner formule

---

### Jour 6-10 : Automatisation (si Phase 1 validée) (10h)

1. Créer script optimisation metadata (3h)
2. Test sur 100 articles (2h)
3. Review manuelle 10% (2h)
4. Déploiement batch 11 sites (2h)
5. Monitoring (1h)

---

## ⚠️ RISQUES & MITIGATION

### Risque 1 : Script Casse Frontmatter
**Mitigation** : 
- Test sur 10 articles d'abord
- Backup avant modification
- Validation manuelle 10%

### Risque 2 : Wording Inadapté Type Article
**Mitigation** :
- Phase 1 manuelle pour valider formules
- Ajustement par type avant script

### Risque 3 : Impact CTR Négatif
**Mitigation** :
- Deploy progressif (1 site → 3 sites → 11 sites)
- Rollback possible si CTR baisse

---

## 🔗 LIENS AVEC AUTRES TÂCHES

**Dépendances** :
- ✅ TASK-LEADGEN-01 : Metadata techniques optimisées (requis)
- ✅ TASK-047 : Grille pain points validée (wording basé dessus)

**Synergie** :
- LEADGEN-01 : Améliore CTR pages techniques
- LEADGEN-04 : Améliore CTR articles blog
- Ensemble : Couverture complète SEO

---

## 📚 RESSOURCES

**Documents** :
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/grille-pain-points-concurrence-COMPLETE.md` (formules validées)
- Google Search Console : Top articles par impressions
- `lib/cities-data.ts` : Prix par ville

**Scripts à créer** :
- `scripts/seo/optimize-blog-metadata.mjs` (automatisation)
- `scripts/seo/analyze-blog-metadata.mjs` (audit)

---

## ✅ DEFINITION OF DONE

### Technique
- [ ] Top 20% articles optimisés (200-400 articles)
- [ ] Descriptions 150-160 car avec USP Moverz
- [ ] Prix signals présents (quand applicable)
- [ ] 11 sites déployés
- [ ] 0 frontmatter cassé

### Business
- [ ] CTR articles +30-50% validé J+14
- [ ] Screenshots Search Console avant/après
- [ ] Top 50 articles trackés individuellement

### Documentation
- [ ] Commits SHA documentés
- [ ] Formules metadata par type documentées
- [ ] Script automatisation créé et documenté

---

*Créée le* : 05/11/2025  
*Statut* : 📋 À FAIRE (après LEADGEN-01 validée J+7)  
*Priorité* : P1 (Important mais après LEADGEN-01)

