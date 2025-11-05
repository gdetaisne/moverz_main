# TASK-LEADGEN-02 : Résolution 404 Résiduels & Boost Indexation

**Type** : Lead Generation / SEO Technical  
**Priorité** : P1 (Important, après TASK-LEADGEN-01)  
**Temps estimé** : 1-2 jours (8-16h)  
**Assigné à** : Guillaume + Cursor  
**Statut** : 📋 PENDING

---

## 🎯 Objectif Business

**PROBLÈME IDENTIFIÉ** :
- Lyon : **63 pages non indexées** (72.5%) à cause 31 erreurs 404
- Rennes : **224 pages non indexées** (64%) à cause 126 erreurs 404
- **Total multi-sites : 287-350 pages perdues** = 60-70% potentiel trafic

**IMPACT** :
- Pages non indexées = 0 impression = 0 clic = 0 lead
- **PERTE estimée : 10-15 leads/mois = 500-2 250€/mois**

**OBJECTIF** : Résoudre 404 résiduels → +250-350 pages indexables → +10-15 leads/mois

---

## 📊 Données Problème (Dashboard 404 + Search Console)

### État actuel (05/11/2025)

**Global 11 sites** :
- 1 228 pages analysées
- **26 erreurs 404** (2.1%)
- **89 liens cassés visibles**

**Breakdown par site** :

| Site | Pages | Liens cassés | Erreurs 404 | Taux erreur | Pages non indexées (GSC) |
|------|-------|--------------|-------------|-------------|---------------------------|
| Lyon | 80 | 31 | 9 | 11.3% | 63 (72.5%) |
| Lille | 149 | 28 | 8 | 5.4% | ? |
| Toulouse | 89 | 19 | 7 | 7.9% | ? |
| Marseille | 101 | 9 | 1 | 1.0% | ? |
| Strasbourg | 124 | 2 | 1 | 0.8% | ? |
| **Rennes** | **351** | **0** | **0** | **0%** | **224 (64%)** ❓ |
| Rouen | - | 0 | 0 | 0% | ? |
| Bordeaux | - | 0 | 0 | 0% | ? |
| Montpellier | - | 0 | 0 | 0% | ? |
| Nantes | - | 0 | 0 | 0% | ? |
| Nice | - | 0 | 0 | 0% | ? |

**Anomalie Rennes** :
- Dashboard 404 : 0 erreur ✅
- Search Console : 224 pages non indexées ❌
- **126 erreurs 404 Search Console** (vs 0 dashboard)
- **Root cause** : 404 externes ou catégories vides non détectés par crawler interne

---

## 🔍 Analyse Patterns 404

### Pattern #1 : Articles piliers manquants (Lyon 31 liens)

**Articles "guide-complet" référencés mais inexistants** :

```
/blog/demenagement-lyon-pas-cher/demenagement-lyon-pas-cher-guide-complet
  ↑ Référencé 11× mais fichier manquant

/blog/garde-meuble-lyon/garde-meuble-lyon-guide-complet
  ↑ Référencé 6× mais fichier manquant

/blog/prix-demenagement-lyon/prix-demenagement-lyon-guide-complet
  ↑ Référencé 8× mais fichier manquant
```

**Impact** : 3 fichiers manquants = 25/31 liens cassés (80%)

---

### Pattern #2 : Catégories inexistantes (Lille 28 liens)

**Liens vers catégories blog non créées** :

```
/blog/location-camion-demenagement-lille/*
  ↑ 17 articles référencent cette catégorie inexistante

/blog/entreprise
  ↑ 6 articles référencent mais page catégorie manquante
```

**Impact** : 2 catégories = 23/28 liens cassés (82%)

---

### Pattern #3 : URLs mal formées (Toulouse 19 liens)

**Catégories avec accents ou espaces** :

```
/blog/garde-meuble  → /blog (catégorie vide, redirection manquante)
/blog/pas-cher      → /blog (catégorie vide)
/blog/demenageur    → /blog (catégorie vide)
```

**Impact** : Catégories vides ou slugs incorrects

---

### Pattern #4 : 404 Search Console invisibles crawler (Rennes 126)

**Hypothèses** :
1. **Liens externes** : Backlinks vers URLs inexistantes
2. **Old URLs** : Anciennes URLs avant refonte
3. **Redirections manquantes** : Changement structure non géré
4. **Sitemap obsolète** : URLs dans sitemap mais fichiers supprimés

**À investiguer** : Search Console → Indexation → "Introuvable (404)"

---

## 🛠️ Plan d'Action

### Phase 1 : Résoudre Lyon, Lille, Toulouse (1 jour)

#### Lyon : Créer 3 articles piliers (4h)

**Articles à créer** :
1. `content/lyon/blog/satellites/demenagement-lyon-pas-cher-guide-complet.md`
2. `content/lyon/blog/satellites/garde-meuble-lyon-guide-complet.md`
3. `content/lyon/blog/satellites/prix-demenagement-lyon-guide-complet.md`

**Template article** : 1 200-1 600 mots hyper-localisés Lyon

**Résolution** : 25/31 liens (80%) + 63 pages indexables

---

#### Lille : Créer catégories + redirections (3h)

**Option A** : Créer catégories manquantes
- `/blog/location-camion-demenagement-lille/page.tsx`
- `/blog/entreprise/page.tsx`

**Option B** : Redirections 301
```javascript
// sites/lille/next.config.mjs
{
  source: '/blog/location-camion-demenagement-lille/:slug',
  destination: '/blog/satellites/:slug',
  permanent: true
},
{
  source: '/blog/entreprise',
  destination: '/blog',
  permanent: true
}
```

**Recommandation** : Option B (redirections) → Plus rapide, SEO OK

**Résolution** : 23/28 liens (82%)

---

#### Toulouse : Redirections catégories vides (1h)

```javascript
// sites/toulouse/next.config.mjs
{
  source: '/blog/garde-meuble',
  destination: '/blog',
  permanent: true
},
{
  source: '/blog/pas-cher',
  destination: '/blog',
  permanent: true
},
// etc.
```

**Résolution** : 19/19 liens (100%)

---

### Phase 2 : Investiguer & résoudre Rennes (0.5-1 jour)

#### Étape 1 : Analyse Search Console (1h)

**Actions** :
1. Search Console Rennes → Indexation → "Pourquoi pages non indexées"
2. Filtrer "Introuvable (404)" (126 pages)
3. Export liste URLs 404
4. Identifier patterns

**Questions** :
- Liens externes ? (backlinks vers URLs mortes)
- Old structure ? (URLs avant refonte)
- Sitemap obsolète ? (URLs fantômes)

---

#### Étape 2 : Résolution selon pattern (2-4h)

**Si liens externes** :
- Créer redirections 301 vers équivalents
- Ou créer pages si haute valeur

**Si old structure** :
- Mapping ancien → nouveau
- Redirections 301 bulk

**Si sitemap obsolète** :
- Nettoyer sitemap
- Resubmit GSC

---

### Phase 3 : Marseille, Strasbourg (optionnel, 2h)

**Marseille** : 9 liens cassés
**Strasbourg** : 2 liens cassés

**Résolution** : Même approche (articles piliers ou redirections)

---

## 📋 Plan d'Exécution Détaillé

### Jour 1 : Lyon, Lille, Toulouse

**Matin (4h)** : Lyon
1. Créer 3 articles piliers (ou générer via IA si process existant)
2. Commit + deploy Lyon
3. Vérifier liens résolus (dashboard 404)

**Après-midi (4h)** : Lille + Toulouse
1. Créer redirections 301 Lille (next.config.mjs)
2. Créer redirections 301 Toulouse
3. Commit + deploy
4. Validation dashboard

---

### Jour 2 : Rennes investigation

**Matin (3h)** : Analyse
1. Export URLs 404 Search Console
2. Identifier patterns
3. Décider stratégie (redirections vs création contenu)

**Après-midi (3h)** : Résolution
1. Implémenter redirections ou créer pages
2. Deploy Rennes
3. Resubmit sitemap GSC
4. Monitoring J+7

---

## 🎯 Critères de Réussite (Definition of Done)

### Technique
- [ ] Lyon : 31 liens cassés → 0-6 (80%+ résolution)
- [ ] Lille : 28 liens cassés → 0-5 (80%+ résolution)
- [ ] Toulouse : 19 liens cassés → 0 (100%)
- [ ] Rennes : 126 erreurs 404 GSC analysées et plan action
- [ ] Dashboard 404 : Taux erreur global < 1%
- [ ] Tests production OK (liens fonctionnent)

### Indexation (J+7-14)
- [ ] Lyon : Pages non indexées 63 → 20-30 (50%+ amélioration)
- [ ] Rennes : Pages non indexées 224 → 100-150 (33%+ amélioration)
- [ ] Search Console : Erreurs 404 -50%+

### Business (J+30)
- [ ] Impressions +20-30% (plus de pages indexées)
- [ ] Clics +15-25 (grâce pages additionnelles)
- [ ] Leads estimés +3-5/mois

---

## 📊 ROI Attendu

### Investissement
- **Temps** : 1-2 jours (8-16h)
- **Coût** : 0€ (dev interne)

### Retour

**Court terme (J+14)** :
- +100-150 pages indexables
- Impressions +300-500/mois
- Clics +5-10 (avec CTR amélioré TASK-LEADGEN-01)
- **Leads : +1-2/mois = +50-300€/mois**

**Moyen terme (J+30)** :
- +250-350 pages indexables
- Impressions +800-1 200/mois
- Clics +20-30
- **Leads : +3-5/mois = +150-750€/mois**

**Long terme (J+60)** :
- Pages indexées stabilisées
- Synergie avec TASK-LEADGEN-01 (CTR optimisé)
- **Leads : +5-8/mois = +250-1 200€/mois**

**ROI** : ∞ (0€ coût, retour +150-1 200€/mois)

---

## 🔗 Dépendances

### Bloqué par
- ✅ TASK-LEADGEN-01 (recommandé finir avant, mais pas bloquant strict)

### Bloque
- TASK-LEADGEN-03 (monitoring bénéficiera de plus de pages)

### Synergie
- TASK-LEADGEN-01 (CTR) × TASK-LEADGEN-02 (indexation) = Multiplicateur leads

---

## 📝 Notes

**Contexte** :
- Projet 404 déjà résolu à 99% (2 847 liens corrigés 03-04/11)
- Reste 26 erreurs résiduelles (2.1%)
- Mais impact indexation massif (63-224 pages non indexées)

**Priorité P1** (vs P0) car :
- Moins critique que metadata (TASK-LEADGEN-01)
- Nécessite investigation Rennes (incertitude temps)
- ROI un peu plus long (J+30 vs J+14)

**Alternative considérée** : Ignorer 404 résiduels (2.1% acceptable)  
**Rejetée car** : Impact indexation trop fort (60-70% pages perdues)

---

*Créée le* : 05/11/2025  
*Statut* : PENDING (démarrer après TASK-LEADGEN-01)

