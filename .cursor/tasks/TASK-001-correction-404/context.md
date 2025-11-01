# Contexte : TASK-001 - Correction 404

## Problème initial

Détection de **2970 erreurs 404** sur les 11 sites Moverz (1618 URLs uniques).

Impact :
- Maillage interne cassé
- Expérience utilisateur dégradée
- Perte de PageRank
- Perte de trafic SEO estimée à 30-40%

## Pourquoi cette tâche ?

**Impact business** : Critique
- 2970 liens morts = perte de trafic massive
- Users frustrés par liens cassés
- Google pénalise le maillage interne défaillant
- Budget crawl Google gaspillé sur 404s

**Urgence** : P1 (Important mais pas bloquant prod)
- Sites fonctionnent mais SEO impacté
- Correction massive possible en plusieurs phases
- ROI SEO énorme attendu

## Scope

**Phases completées (1-2-3)** :
1. ✅ Fix lib/blog.ts pour conserver "-ville" dans slugs (11 villes)
2. ✅ Correction catégories blog incorrectes (634 liens)
3. ✅ Correction variations de slugs (208 liens)

**Phase en pause (4)** :
- Créer 104 articles réellement manquants
- Articles validés comme légitimes (pas de faux positifs)
- Liste exhaustive dans ARTICLES-A-CREER-FINAL.md

**Hors scope** :
- 404s externes (hors contrôle)
- 404s temporaires (cache, etc.)

## Fichiers impactés

### Code modifié (Phases 1-3)
- `sites/*/lib/blog.ts` (11 fichiers)
- 312 fichiers markdown (liens internes corrigés)
- 842 liens modifiés au total

### À créer (Phase 4)
- 104 fichiers markdown (articles satellites)
- Répartition par ville :
  - Rouen : 34 articles
  - Montpellier : 33 articles
  - Lyon : 18 articles
  - Bordeaux, Lille, Toulouse, Strasbourg : 19 articles

### Documentation existante
- RESUME-404-EXECUTIF.md
- ARTICLES-A-CREER-FINAL.md
- GUIDE-CREATION-ARTICLES.md
- ANALYSE-404-EXHAUSTIVE-2025-10-29-ACTUALISE.md
- + 15 autres fichiers doc

## Impact business

**Court terme (1 mois)** :
- ✅ Maillage interne restauré (Phases 1-3)
- 📈 Trafic : +10-15% attendu
- ✅ UX améliorée

**Moyen terme (3-6 mois)** :
- 📈 Trafic : +20-30% attendu
- 📈 Taux de rebond : -10-15%
- 📈 Pages/session : +15-20%

**Long terme (12 mois)** :
- 📈 Trafic : +40-50% attendu
- 📈 Positions SEO : +5-10 positions
- 📈 Conversions : +15-20%

## Parties prenantes

- Guillaume (pilote projet)
- Associée (possible création articles)
- SEO (bénéficiaire)
- Users (expérience améliorée)

