# TASK-404-06 : Validation Liens Internes

**Priorité** : P0  
**Temps estimé** : 1h  
**Assigné à** : Guillaume ou Lucie  
**Statut** : 📋 PENDING

---

## 🎯 Objectif

Valider que les corrections TASK-404-05 ont bien résolu les 963 liens (0 liens cassés).

---

## 📋 Actions

- [ ] Re-run analyze-404.mjs
- [ ] Analyser liens résiduels (<50 acceptables)
- [ ] Tests manuels 3 villes (Marseille, Lyon, Nice)
- [ ] Vérifier aucune régression
- [ ] Rapport validation

---

## ✅ Critères d'acceptation

- 0 liens cassés internes (ou <50 si edge cases)
- Aucune régression sur villes non modifiées
- 3 villes testées manuellement OK

---

## 🔗 Dépendances

**Dépend de** : TASK-404-05 ✅  
**Bloque** : Phase 4 (ne pas passer si liens cassés restants)

---

*Créé le : 2025-11-02*

