# 📋 TODO - CORRECTIONS AUTOMATIQUES DES 404

**Date** : 28 Octobre 2025  
**Objectif** : Corriger les liens automatisables (hors création d'articles)  
**Impact estimé** : ~1 350 liens corrigés (~45%)

---

## 🎯 VUE D'ENSEMBLE

| Phase | Type | Liens | Difficulté | Statut |
|-------|------|-------|------------|--------|
| **1** | Préfixes ville safe | 676 | ⚡ Facile | ⏳ À faire |
| **2** | Préfixes ville risky | 488 | ⚠️ Moyen | ⏳ À faire |
| **3** | Slugs incorrects | 188 | ⚠️ Moyen | ⏳ À faire |
| **4** | Redirections piliers | Variable | 🔧 Manuel | ⏳ À faire |
| **5** | Vérification finale | - | ✅ Simple | ⏳ À faire |

---

## 📝 PHASE 1 : PRÉFIXES VILLE SAFE (676 liens)

### Description
Nettoyer les slugs avec double préfixe ville **quand l'article cible existe**.

### Exemples
```
❌ /blog/garde-meuble-nice/garde-meuble-nice-guide-complet
✅ /blog/garde-meuble-nice/guide-complet  (si guide-complet.md existe)

❌ /blog/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide
✅ /blog/demenagement-pas-cher-lille/guide  (si guide.md existe)
```

### Pattern détecté
Slugs qui contiennent `-{ville}-guide` où l'article sans ville existe.

### Script à créer
`scripts/fix-prefix-ville-safe.mjs`

### Actions
- [ ] Créer le script de nettoyage
- [ ] Tester sur 10 fichiers (dry-run)
- [ ] Vérifier que les articles cibles existent
- [ ] Appliquer les corrections
- [ ] Logger les modifications
- [ ] Commit avec message clair

### Commandes
```bash
# Créer et tester
node scripts/fix-prefix-ville-safe.mjs --dry-run

# Appliquer
node scripts/fix-prefix-ville-safe.mjs --apply

# Vérifier impact
node scripts/analyze-404.mjs
```

### Impact attendu
- **Avant** : 2 970 liens cassés
- **Après** : ~2 294 liens cassés (-676, -22.8%)

---

## 📝 PHASE 2 : PRÉFIXES VILLE RISKY (488 liens)

### Description
Traiter les slugs avec double préfixe ville **quand l'article cible N'EXISTE PAS**.

### Exemples
```
❌ /blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet
   → garde-meuble-guide-complet.md N'EXISTE PAS !

Solutions possibles :
1. Créer l'article garde-meuble-guide-complet.md
2. Rediriger vers un pilier existant
3. Laisser tel quel (temporaire)
```

### Stratégie
Pour chaque lien :
1. Identifier l'article pilier de la catégorie
2. Rediriger vers le pilier
3. Logger pour validation manuelle

### Script à créer
`scripts/map-redirections-risky.mjs`

### Actions
- [ ] Créer script de mapping
- [ ] Identifier articles piliers par catégorie
- [ ] Générer table de redirections
- [ ] Valider redirections manuellement
- [ ] Appliquer les redirections
- [ ] Logger les modifications

### Table de redirections exemple
```json
{
  "garde-meuble-marseille": {
    "brokenSlug": "garde-meuble-marseille-guide-complet",
    "redirectTo": "guide-complet",
    "pilierExists": false,
    "action": "redirect_to_category_index"
  }
}
```

### Impact attendu
- **Avant** : ~2 294 liens cassés
- **Après** : ~1 806 liens cassés (-488, -16.4%)

---

## 📝 PHASE 3 : SLUGS INCORRECTS (188 liens)

### Description
Corriger les liens avec format d'URL invalide (manque catégorie ou slug incomplet).

### Exemples
```
❌ /blog/demenageur-toulouse
✅ /blog/demenageur/demenageur-toulouse-guide

❌ /blog/garde-meuble-toulouse
✅ /blog/garde-meuble/garde-meuble-toulouse-guide

❌ /blog/demenagement-international-toulouse
✅ /blog/international/demenagement-international-toulouse-guide
```

### Mapping catégories
```javascript
const categoryMapping = {
  'demenageur-': 'demenageur',
  'garde-meuble-': 'garde-meuble',
  'demenagement-international-': 'international',
  'demenagement-pas-cher-': 'pas-cher',
  'location-camion-': 'location-camion',
  'prix-demenagement-': 'prix',
  'aide-demenagement-': 'aide',
  'demenagement-etudiant-': 'etudiant',
  'demenagement-entreprise-': 'entreprise',
  'demenagement-piano-': 'piano'
};
```

### Script à créer
`scripts/fix-slugs-incorrects.mjs`

### Actions
- [ ] Créer script avec mapping catégories
- [ ] Identifier pattern de chaque lien
- [ ] Déterminer catégorie appropriée
- [ ] Vérifier existence article cible
- [ ] Si existe : corriger le lien
- [ ] Si n'existe pas : logger pour redirection
- [ ] Appliquer corrections
- [ ] Commit avec détails

### Commandes
```bash
# Analyser les patterns
node scripts/fix-slugs-incorrects.mjs --analyze

# Dry run
node scripts/fix-slugs-incorrects.mjs --dry-run

# Appliquer
node scripts/fix-slugs-incorrects.mjs --apply
```

### Impact attendu
- **Avant** : ~1 806 liens cassés
- **Après** : ~1 618 liens cassés (-188, -6.3%)

---

## 📝 PHASE 4 : REDIRECTIONS VERS PILIERS

### Description
Pour les articles manquants qui ne seront PAS créés (Phase 3 de création), rediriger vers articles piliers existants.

### Exemples de redirections
```
❌ /blog/demenagement-marseille/aide-au-demenagement-marseille
✅ /blog/aide/guide  (article pilier aide)

❌ /blog/garde-meuble-nantes/garde-meuble-pas-cher-nantes
✅ /blog/garde-meuble-nantes/guide-complet  (pilier garde-meuble Nantes)

❌ /blog/satellites/article-specifique-xyz
✅ /blog/demenagement/guide-complet  (pilier général)
```

### Identifier les piliers existants
Par ville et catégorie :
```bash
# Lister les piliers existants
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  find sites/$city/content/blog -name "*guide-complet*.md" -o -name "*guide.md"
done
```

### Table de mapping
Créer `REDIRECTIONS-PILIERS.json` :
```json
{
  "marseille": {
    "garde-meuble": "/blog/garde-meuble-marseille/guide-complet",
    "demenagement": "/blog/demenagement-marseille/guide",
    "aide": "/blog/aide/guide"
  },
  "toulouse": {
    ...
  }
}
```

### Script à créer
`scripts/create-pilier-redirections.mjs`

### Actions
- [ ] Lister tous les piliers existants par ville
- [ ] Créer table de mapping catégorie → pilier
- [ ] Pour chaque lien cassé restant :
  - Identifier ville et catégorie
  - Trouver pilier approprié
  - Remplacer le lien
- [ ] Valider manuellement les redirections
- [ ] Appliquer les modifications
- [ ] Commit avec liste complète

### Impact attendu
Variable selon nombre d'articles non créés en Phase 3.

---

## 📝 PHASE 5 : VÉRIFICATION FINALE

### Description
Vérifier l'impact global des corrections et identifier les cas restants.

### Actions
- [ ] Re-run analyse 404 complète
- [ ] Comparer avant/après
- [ ] Identifier les 404 restants
- [ ] Catégoriser les cas non résolus
- [ ] Décider : créer, rediriger ou accepter
- [ ] Mettre à jour SUIVI-CORRECTION-404.md
- [ ] Documenter les cas edge
- [ ] Créer rapport final

### Commandes
```bash
# Analyser après corrections
node scripts/analyze-404.mjs

# Comparer avec baseline
diff 404-analysis-baseline.json 404-analysis.json

# Générer rapport
node scripts/generate-final-report.mjs
```

### Critères de succès
- [ ] < 1 000 404 restants (objectif < 1 500)
- [ ] Aucun nouveau 404 créé
- [ ] Tous les changements documentés
- [ ] Scripts réutilisables créés
- [ ] Guide de maintenance à jour

---

## 🛠️ SCRIPTS À CRÉER

### 1. `scripts/fix-prefix-ville-safe.mjs`
**Fonction** : Nettoyer préfixes ville quand article cible existe

**Features** :
- Mode dry-run
- Vérification existence cible
- Logging détaillé
- Rollback possible

### 2. `scripts/map-redirections-risky.mjs`
**Fonction** : Créer table redirections pour préfixes risky

**Features** :
- Identifier piliers par catégorie
- Générer mapping JSON
- Mode validation
- Export rapport

### 3. `scripts/fix-slugs-incorrects.mjs`
**Fonction** : Corriger format URLs invalides

**Features** :
- Mapping catégories intelligent
- Détection pattern automatique
- Vérification existence
- Logging corrections

### 4. `scripts/create-pilier-redirections.mjs`
**Fonction** : Rediriger vers articles piliers

**Features** :
- Scan piliers existants
- Matching catégorie intelligente
- Validation manuelle
- Application batch

### 5. `scripts/generate-final-report.mjs`
**Fonction** : Rapport final avec comparaison avant/après

**Features** :
- Statistiques détaillées
- Graphiques ASCII
- Liste cas restants
- Recommandations

---

## 📊 SUIVI DE PROGRESSION

| Phase | Statut | 404 avant | 404 après | Réduction | Date |
|-------|--------|-----------|-----------|-----------|------|
| Baseline | ✅ | 2 970 | - | - | 28 Oct |
| Phase 1 | ⏳ | 2 970 | - | - | - |
| Phase 2 | ⏳ | - | - | - | - |
| Phase 3 | ⏳ | - | - | - | - |
| Phase 4 | ⏳ | - | - | - | - |
| Phase 5 | ⏳ | - | - | - | - |

### Objectif final
- **Avant corrections** : 2 970 404s
- **Après corrections auto** : ~1 620 404s (-1 350, -45.5%)
- **Après création articles** : ~686 404s (-934, -31.5%)
- **Total résolu** : ~2 284 404s (76.9%)

---

## 🚨 POINTS D'ATTENTION

### Risques
1. **Créer de nouveaux 404** en nettoyant les slugs
   → Solution : Toujours vérifier existence article cible

2. **Redirection vers mauvais pilier**
   → Solution : Validation manuelle des mappings

3. **Casser le maillage interne existant**
   → Solution : Garder backup, tester progressivement

4. **Performance du site impactée**
   → Solution : Pas de redirections côté serveur, correction directe

### Validation requise
- [ ] Tester chaque script sur 10 fichiers avant application
- [ ] Valider manuellement les redirections piliers
- [ ] Vérifier pas de régression sur articles créés
- [ ] Confirmer aucun nouveau 404

---

## 📦 ORDRE D'EXÉCUTION RECOMMANDÉ

### Semaine 1 : Préparation + Phase 1
1. Créer tous les scripts
2. Tester en dry-run
3. Appliquer Phase 1 (préfixes safe)
4. Vérifier impact

### Semaine 2 : Phases 2-3
5. Mapper redirections risky
6. Corriger slugs incorrects
7. Vérifier impact global

### Semaine 3 : Phase 4-5
8. Créer redirections piliers
9. Appliquer redirections
10. Vérification finale
11. Documentation

---

## ✅ CRITÈRES DE VALIDATION

Avant de passer à la phase suivante :

- [ ] Script créé et testé
- [ ] Dry-run OK sur 10+ fichiers
- [ ] Aucun nouveau 404 créé
- [ ] Logs générés et vérifiés
- [ ] Backup créé
- [ ] Re-analyse 404 effectuée
- [ ] Impact documenté
- [ ] Commit avec message clair

---

**Prêt à démarrer ! 🚀**

Commencer par Phase 1 (la plus simple et la plus sûre).

