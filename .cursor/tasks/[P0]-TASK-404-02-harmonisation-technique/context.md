# Context - TASK-404-02

## 🤔 Pourquoi cette tâche ?

L'audit TASK-404-01 a révélé **3 bugs critiques** qui causent 169 articles affectés :

### Bug #1 : cleanSlug() copié-collé (Marseille + Lyon)
- Marseille et Lyon utilisent les patterns de Bordeaux
- Cherche "bordeaux" au lieu de "marseille"/"lyon"
- **Impact** : Génération incorrecte d'URLs

### Bug #2 : CATEGORY_MAPPING avec accents
- Variantes avec accents (`déménagement`, `étudiant`, etc.)
- URLs ne correspondent jamais (slugs sans accents)
- **Impact** : Mauvaise catégorisation → 404s

### Bug #3 : Nice satellites: null
- `'satellites': null` au lieu de `'satellites': 'conseils'`
- **Impact** : 60 articles satellites Nice mal catégorisés

---

## 🎯 Objectif stratégique

**BLOQUER** : Sans cette harmonisation, toute correction ultérieure sera cassée ou incomplète.

**PERMETTRE** : Base technique propre pour correction automatique de 963 liens (TASK-404-05).

---

## 📊 Impact

- **169 articles** directement affectés
- **11 villes** à harmoniser
- **3 bugs** critiques à résoudre

---

## 🔗 Lien avec projet global 404

**Phase 1** du projet : Préparation technique  
Sans cette tâche → Impossible de passer en Phase 3 (corrections massives)

---

*Créé le : 2025-11-02*

