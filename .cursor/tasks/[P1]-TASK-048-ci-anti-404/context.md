# Contexte — TASK-048

## 🔥 Incident déclencheur

**Date** : 04/11/2025 ~15:24  
**Commit fautif** : 8cab243 ("docs: Archive TASK-028, TASK-031, TASK-032 dans tasks-finalisees")

### Impact mesuré

- **630 fichiers modifiés** dans `sites/*/content/**` (9 villes)
- **676 erreurs 404** en 4h
- **Répartition par ville** :
  - Nice : 88 erreurs 404
  - Rouen : 63 erreurs 404
  - Toulouse : 33 erreurs 404
  - Bordeaux : 27 erreurs 404
  - Rennes : 24 erreurs 404
  - Nantes : 23 erreurs 404
  - Lille : 20 erreurs 404
  - Strasbourg : 15 erreurs 404
  - Lyon : 9 erreurs 404

### Patterns fautifs introduits

1. **`](/demenagement/:slug)`** → pages n'existent pas
2. **`](/blog/:category/guide)`** → guides génériques inexistants (slugs réels = ville-centrés)
3. **`](/blog/:pillar/satellites/:slug)`** → structure invalide

### Pourquoi c'est arrivé

- Commit supposé "docs only" a massivement réécrit du contenu SEO-critique
- Pas de CI/validation avant merge sur main
- Script `push-all-sites-to-github.sh` avec rsync actif a propagé silencieusement
- Aucun test automatisé de liens internes

### Temps correction

- 3h d'investigation (identification cause, analyse patterns)
- Revert complet 630 fichiers
- Push 11 sites + redeploys

---

## 🎯 Pourquoi cette tâche maintenant

**Business impact** :
- 404 = mauvais UX = perte leads
- 404 = pénalité Google = perte ranking SEO
- Temps correction = coût élevé (3h+ par incident)

**Probabilité récidive** : ÉLEVÉE sans protections
- Commits automatiques/batch sur content
- Scripts puissants sans garde-fous
- Pas de review obligatoire sur `sites/**`

**ROI préventif** :
- Investissement : 3-4h setup CI
- Gain : Évite 3h+ par incident futur
- Sérénité : main protégé, erreurs détectées avant prod

---

## 📚 Références

- Incident complet documenté : `.cursor/tasks/[P0]-TASK-047-enquete-404-surge/`
- Commit fautif : `8cab243`
- Commit revert : `a0970f1` (revert(content): full rollback of 8cab243 for sites/*/content/**)
- Zones de risque : `.cursor/ZONES-DE-RISQUE.md`


