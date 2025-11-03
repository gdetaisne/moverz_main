# TASK-404-02 : Harmonisation Technique

**Priorité** : P0 (BLOQUE tout le reste)  
**Temps estimé** : 1h15-2h15  
**Assigné à** : Guillaume  
**Statut** : 📋 PENDING

---

## 🎯 Objectif

Harmoniser la base technique (cleanSlug, encoding accents, CATEGORY_MAPPING) pour corriger 3 bugs critiques identifiés en TASK-404-01.

---

## 📋 Actions

- [ ] Fix cleanSlug() Marseille (15 min) → Remplacer patterns `bordeaux` par `marseille`
- [ ] Fix cleanSlug() Lyon (15 min) → Remplacer patterns `bordeaux` par `lyon`
- [ ] Retirer accents CATEGORY_MAPPING (30 min) → 11 villes
- [ ] Fix Nice satellites: null → 'conseils' (2 min)
- [ ] Tests validation (15-30 min) → Build 3 villes

---

## 📁 Fichiers à modifier

- `sites/marseille/lib/blog.ts` (cleanSlug fix)
- `sites/lyon/lib/blog.ts` (cleanSlug fix)
- `sites/nice/lib/blog.ts` (satellites fix + accents)
- `sites/*/lib/blog.ts` (8 autres villes - retrait accents)

---

## 🔗 Dépendances

**Dépend de** : TASK-404-01 ✅  
**Bloque** : Toutes les autres tâches 404

---

## 📊 Résultat attendu

- Code harmonisé sur 11 villes
- 0 bug d'encoding ou de mapping
- Base propre pour corrections massives

---

## 📖 Documentation

- **Rapport bugs** : `.cursor/tasks/TASK-404-01-audit-structure/RAPPORT-INCONSISTANCES.md`
- **Plan détaillé** : `.cursor/archives/projet-404/TASKS-404-DETAILLEES.md` (section TASK-404-02)

---

*Créé le : 2025-11-02*

