# Contexte : TASK-404-01 - Audit Structure Complète

**Pourquoi cette tâche ?**

---

## Problème initial

**2125 liens cassés** détectés dans le maillage interne (analyse `analyze-404.mjs`)

**TASK-001 et TASK-007** existantes :
- TASK-001 : Créer 104 articles manquants (20-30h)
- TASK-007 : Redirections 301 (~1014 faites, tests à valider)

**Problème** : Approche incomplète
- Mélange liens internes vs externes
- Pas de compréhension structure sous-jacente
- Risque de créer contenu en doublon
- Corrections possiblement écrasées

---

## Déclencheur restructuration

**Analyse GPT** fournie par Guillaume révèle :
- 1541 erreurs (source externe, probablement Search Console)
- Patterns différents de l'analyse interne
- Besoin de réconcilier les deux sources

**Décision** : Restructurer TASK-001 et TASK-007 en 9 sous-tâches
- Séparation logique par type de problème
- Ordre optimal (dépendances techniques)
- Approche granulaire et méthodique

---

## Objectif TASK-404-01

**Avant toute correction** : COMPRENDRE la structure

1. **Mapper structure 11 villes** : Comment les URLs sont générées ?
2. **Identifier incohérences** : Où sont les bugs ?
3. **Valider 104 articles manquants** : Vraiment manquants ou mal liés ?
4. **Auditer code** : cleanSlug(), CATEGORY_MAPPING, etc.

**Sans cet audit** :
- Corrections à l'aveugle → Régressions
- Risque créer contenu en doublon
- Bugs code non détectés → Corrections écrasées

---

## Méthodologie

### Phase 1 : Analyse existante
- `verify-real-missing-articles.mjs` : Résultat déjà disponible
- 963 résolvables, 104 manquants (9.7%)
- **Découverte** : 90.3% résolvables sans créer contenu !

### Phase 2 : Audit code
- Extraction cleanSlug() (11 villes)
- Extraction CATEGORY_MAPPING (11 villes)
- Recherche inconsistances

### Phase 3 : Validation externe
- CSV Guillaume (crawl externe, 1167 liens)
- Patterns spécifiques identifiés
- Cross-validation Cursor ↔ CSV

### Phase 4 : Consolidation
- Mapping complet JSON
- Rapport inconsistances
- Plan d'action détaillé

---

## Résultats

**6 patterns majeurs identifiés** :
1. Catégories incorrectes (850 liens, 40%)
2. Variations slug (192-250 liens, 12%)
3. Majuscules (80-100 liens, 5%)
4. Devis-ville-quartier (50-60 liens, 3%)
5. Articles manquants (104, 5%)
6. Autres (700-900, 35%)

**3 bugs code critiques trouvés** :
1. cleanSlug() Marseille/Lyon copié de Bordeaux
2. CATEGORY_MAPPING trop générique
3. Templates avec majuscules

**Stratégie validée** :
- 90.3% résolvables par correction automatique
- Création contenu OPTIONNELLE (104 articles)
- Effort 15-25h (vs 20-30h approche initiale)

---

## Impact business

### Sans cet audit

❌ Créer 104 articles (20-30h) alors que 90% résolvable automatiquement  
❌ Bugs cleanSlug() non détectés → Corrections ultérieures cassées  
❌ Pas de compréhension patterns → Corrections manuelles inefficaces

### Avec cet audit

✅ Plan optimal identifié (15-25h au lieu de 20-30h)  
✅ Bugs critiques trouvés AVANT corrections  
✅ 90.3% résolvables automatiquement (script)  
✅ Création contenu ciblée (seulement si nécessaire)

**ROI audit** : 2h30 investies → 5-10h économisées = **ROI 200-400%** ✅

---

## Prochaines étapes

**TASK-404-02** : Harmonisation technique (1h15-2h15)
- Corriger bugs identifiés
- Base technique propre

**TASK-404-03** : Décision 104 articles (1h)
- Créer ou rediriger ?
- Prioriser selon fréquence (CSV)

**TASK-404-05** : Correction massive liens (4-6h)
- Script automatique
- 963 liens corrigés

**Etc.** : Suite du plan TASK-404-06 à 404-09

---

**Date création** : 01 novembre 2025  
**Créé par** : Cursor + Guillaume

