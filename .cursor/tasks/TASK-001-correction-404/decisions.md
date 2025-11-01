# Décisions techniques : TASK-001 - Correction 404

## Décision 1 : Approche "Option B" (correction slugs + liens)

**Date** : 29 octobre 2025
**Contexte** : 2970 erreurs 404 détectées, besoin de stratégie de résolution

**Options évaluées** :
- A) Créer redirections 301 pour toutes les URLs
- B) Corriger la génération de slugs + liens internes (recommandé)
- C) Laisser tel quel (inacceptable)

**Choix** : B - Correction slugs + liens

**Raison** :
- ✅ Résout le problème à la source (pas de workaround)
- ✅ Pas de surcharge redirections (meilleur pour SEO)
- ✅ Maillage interne cohérent restauré
- ✅ Maintenable long terme
- ❌ Plus de travail initial (acceptable car automatisable)

**Impact** : Résolution 93.6% en 3 phases vs redirections qui auraient caché le problème

---

## Décision 2 : Approche progressive par phases

**Date** : 29 octobre 2025
**Contexte** : Volume énorme (2970 erreurs), risque d'erreurs si tout en une fois

**Phases définies** :
1. Fix lib/blog.ts (génération slugs)
2. Correction catégories blog
3. Correction variations slugs
4. Création articles manquants

**Choix** : 4 phases distinctes avec backups

**Raison** :
- ✅ Réduction des risques (validation étape par étape)
- ✅ Backups systématiques avant chaque phase
- ✅ Possibilité rollback ciblé
- ✅ Mesure impact phase par phase
- ✅ Arrêt possible si problème détecté

**Résultat** : Phases 1-3 succès total (93.6% résolu), Phase 4 peut attendre

---

## Décision 3 : Backups systématiques

**Date** : 29 octobre 2025
**Contexte** : Modifications massives (312 fichiers), risque perte données

**Approche** :
- Backup avant chaque phase
- Timestamps dans noms dossiers
- Conservation backups pendant 30 jours minimum

**Raison** :
- ✅ Sécurité maximale
- ✅ Rollback possible par phase
- ✅ Audit trail complet
- ✅ Confiance pour appliquer changements massifs

**Backups créés** :
- `backups/blog-ts-20251029-064701/` (Phase 1)
- `backups/categories-2025-10-29T02-21-22-059Z/` (Phase 2)
- `backups/slugs-2025-10-29T02-21-33-492Z/` (Phase 3)

---

## Décision 4 : Validation manuelle des 104 articles à créer

**Date** : 29 octobre 2025
**Contexte** : Risque faux positifs (URLs jamais censées exister)

**Approche** :
- Analyse manuelle de chaque URL 404 restante
- Vérification si article légitime ou faux positif
- Documentation exhaustive (ARTICLES-A-CREER-FINAL.md)

**Raison** :
- ✅ Évite création articles inutiles
- ✅ Qualité > quantité
- ✅ SEO : ne pas polluer avec contenu low-quality
- ❌ Temps validation (acceptable, fait 1 fois)

**Résultat** : 104 articles validés comme légitimes (sur ~150 détectés)

---

## Décision 5 : Scripts automatisés pour corrections massives

**Date** : 29 octobre 2025
**Contexte** : 842 liens à corriger manuellement = impossible

**Approche** :
- Scripts Node.js pour corrections automatiques
- Validation pattern avant/après
- Tests sur échantillon avant application globale

**Raison** :
- ✅ Rapidité (minutes vs jours manuellement)
- ✅ Précision (regex > humain pour 842 liens)
- ✅ Reproductible (10 autres villes)
- ✅ Auditable (logs complets)

**Scripts créés** :
- `scripts/fix-404-phase2-categories.js`
- `scripts/fix-404-phase3-slugs.js`
- `scripts/analyze-404.mjs`

---

## Décision 6 : Mise en pause Phase 4

**Date** : 29 octobre 2025
**Contexte** : 93.6% résolu, autre priorité (déploiement 11 villes)

**Choix** : Marquer Phase 4 INCOMPLET et prioriser déploiement

**Raison** :
- ✅ 93.6% déjà un excellent résultat
- ✅ Impact immédiat avec Phases 1-3
- ✅ Phase 4 (création articles) peut attendre
- ✅ Déploiement 11 villes plus urgent (bug prod)
- ✅ Phase 4 nécessite 20-30h (peut être reprise plus tard)

**Conséquence** : Tâche marquée ⚠️ INCOMPLET pour ne pas oublier

---

## Décision 7 : Guide création articles standardisé

**Date** : 29 octobre 2025
**Contexte** : 104 articles à créer, besoin cohérence

**Approche** :
- Créer GUIDE-CREATION-ARTICLES.md
- Templates standardisés
- Checklist qualité
- Référence fiche locale

**Raison** :
- ✅ Qualité homogène
- ✅ Facilite création (Guillaume ou Associée)
- ✅ Évite oublis (maillage, FAQ, SEO)
- ✅ Conforme Document Maître production satellites

**Guide inclut** :
- Structure article type
- Mots minimum (1200)
- Maillage interne (3-5 liens)
- FAQ (5-8 questions)
- Hyper-localisation (quartiers, acteurs, prix)

---

## Décision 8 : Format JSON pour articles à créer

**Date** : 29 octobre 2025
**Contexte** : 104 articles, besoin format exploitable par scripts

**Formats créés** :
- ARTICLES-A-CREER-FINAL.md (humain)
- ARTICLES-A-CREER-VALIDES.json (machine)

**Raison** :
- ✅ Documentation humaine (markdown)
- ✅ Automatisation possible (JSON)
- ✅ Double vérification (2 formats)
- ✅ Facilite tracking progression

**Structure JSON** :
```json
{
  "ville": "rouen",
  "slug": "garde-meuble-rouen",
  "pilier": "04-garde-meuble",
  "priorite": "P1"
}
```

---

## Décision 9 : Déploiement immédiat Phases 1-3

**Date** : 29 octobre 2025
**Contexte** : Corrections Phases 1-3 validées, prêtes production

**Choix** : Déployer sur 11 villes immédiatement

**Raison** :
- ✅ 93.6% résolution = impact SEO immédiat
- ✅ Pas de raison d'attendre Phase 4
- ✅ Users bénéficient tout de suite
- ✅ Google crawl amélioré dès J+1

**Résultat** : Déploiement réussi (voir TASK-004)

---

## Décision 10 : Priorité Rouen et Montpellier pour Phase 4

**Date** : 29 octobre 2025
**Contexte** : 104 articles à créer, ordre à déterminer

**Priorisation** :
1. Rouen (34 articles) - ville avec plus de 404s restants
2. Montpellier (33 articles) - idem
3. Lyon (18 articles)
4. Autres (19 articles)

**Raison** :
- ✅ Impact maximal (villes avec plus d'articles manquants)
- ✅ Motivation (résultats visibles rapidement)
- ✅ Rouen déjà 100 satellites (cohérence)

**Alternative envisagée** : Faire toutes les villes en parallèle (rejetée car moins focalisé)

---

**Ces décisions ont permis de résoudre 93.6% des 404s en 12h de travail.**

