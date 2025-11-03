# 🧹 Aide-Mémoire : Clean Tasks

**Commande principale** : `"Cursor, clean tasks"`

---

## ⚡ Versions rapides

| Commande | Usage | Durée |
|----------|-------|-------|
| `Cursor, clean tasks` | Workflow complet interactif | 5-10 min |
| `Cursor, clean tasks en mode rapide` | Version rapide (skip détails) | 3-5 min |
| `Cursor, clean TASK-XXX` | Nettoyer 1 seule tâche | 2-3 min |
| `Cursor, clean tasks auto : [résumé]` | Automatique avec résumé | 2 min |

---

## 📋 Ce que ça fait (complet)

```
1. 📝 Identifier tâches travaillées
2. ✍️  Logger chaque session (progress.md)
3. 💾 Documenter commits (commits.md)
4. 🎯 MAJ statut par tâche :
   ├─ ✅ TERMINÉE → Vérif DoD → Archive
   ├─ ⚠️ EN PAUSE → Contexte → INCOMPLET
   ├─ 🔄 EN COURS → État → Plan demain
   └─ ❌ ABANDONNÉE → Revert → Archive
5. 🗑️  Nettoyer fichiers temporaires
6. 📝 MAJ TODO-Guillaume.md (auto)
7. 📅 Préparer plan demain
8. 💾 Commit documentation (optionnel)
9. 📊 Récapitulatif
```

---

## 🎯 Statuts possibles

| Statut | Quand ? | Cursor fait quoi ? |
|--------|---------|-------------------|
| ✅ **TERMINÉE** | 100% fait, tests OK | Vérif DoD → Archive DONE.md |
| ⚠️ **EN PAUSE** | Pas finie, reprendre plus tard | Marque INCOMPLET → Priorité demain |
| 🔄 **EN COURS** | Continue demain | État actuel → Plan demain |
| ❌ **ABANDONNÉE** | Annuler la tâche | Revert commits → Archive |

---

## ✅ Definition of Done (pour marquer TERMINÉE)

- [ ] 1. Code propre et documenté
- [ ] 2. Commits GitHub main + SHA documentés
- [ ] 3. Testé sur 2+ sites avec résultats documentés

**Si 1 critère manque** → Cursor refuse et explique ce qui manque

---

## 🚀 Exemple d'utilisation

**En fin de journée** :

```
Toi: "Cursor, clean tasks"

Cursor: 
🧹 CLEAN TASKS - Démarrage

Quelles tâches as-tu travaillées aujourd'hui ?
(ex: "404-02, 404-03" ou "toutes les EN COURS")

Toi: "404-02"

Cursor:
📝 TASK-404-02 : Logger la session

Résume ce que tu as fait aujourd'hui :
- Quoi (actions effectuées)
- Temps passé
- Ce qui reste

Toi: "J'ai fixé cleanSlug pour Marseille et Lyon (30 min), 
puis commencé retrait accents sur 3 villes (1h). 
Reste 8 villes + tests (1h estimé)."

Cursor: ✅ Session loggée dans progress.md

Cursor: 💾 As-tu fait des commits pour TASK-404-02 ?
A) Oui → Liste les SHA
B) Non → Skip

Toi: "Oui, a1b2c3d et d4e5f6g"

[...workflow continue interactivement...]
```

---

## 💡 Tips

### Si tu es pressé
```
"Cursor, clean tasks en mode rapide"
```
→ Questions minimales, logging basique

### Si tu veux juste logger 1 tâche
```
"Cursor, clean TASK-404-02"
```
→ Workflow complet mais 1 seule tâche

### Si tu veux tout automatiser
```
"Cursor, clean tasks auto : J'ai travaillé 3h sur TASK-404-02, 
fixé Marseille/Lyon, reste 8 villes. Commits a1b2c3d et d4e5f6g."
```
→ Cursor détecte et documente tout automatiquement

---

## 🎯 Résultat attendu

**Après le clean** :
- ✅ Toutes sessions loggées (continuité garantie)
- ✅ Commits documentés (traçabilité)
- ✅ Statuts à jour (TODO, BACKLOG, DONE cohérents)
- ✅ Plan demain clair (sais par où commencer)
- ✅ Dossiers propres (pas de fichiers temporaires)

---

## 📖 Documentation complète

Voir `.cursor/WORKFLOW-CLEAN-TASKS.md` pour le workflow détaillé.

---

*Aide-mémoire pour usage quotidien*  
*Créé le : 2025-11-02*

