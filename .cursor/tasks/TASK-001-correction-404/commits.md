# Commits GitHub : TASK-001 - Correction 404

## Repo principal (moverz_main-2)

### Phase 1 : lib/blog.ts

- [x] `#8faf337` - fix: Résolution 93.6% des 404s (1514/1618) - Option B / Phase 1
  - Date: 29 octobre 2025
  - Fichiers: sites/*/lib/blog.ts (11 villes)
  - Changement: Commenté ligne cleanSlug pour conserver "-ville" dans slugs
  - Impact: 674 URLs résolues

### Phase 2 + 3 : Corrections liens

- [x] `#94189b4` - fix: Application RÉELLE des corrections 404 - Phases 2+3
  - Date: 29 octobre 2025
  - Fichiers: 312 fichiers markdown (sites/*/content/blog/)
  - Phase 2: 504 fichiers, 634 liens corrigés (catégories)
  - Phase 3: 171 fichiers, 208 liens corrigés (slugs)
  - Impact: 840 URLs résolues supplémentaires

### Phase 4 : Articles manquants (EN PAUSE)

- [ ] À faire : Création des 104 articles manquants
- [ ] Commits prévus par ville :
  - Rouen : 34 articles
  - Montpellier : 33 articles
  - Lyon : 18 articles
  - Autres : 19 articles

---

## Sites déployés (Phases 1-3)

Déployés dans le cadre de TASK-004 (Déploiement 11 villes) :

- [x] Strasbourg : #17666b6
- [x] Marseille : #b57fffb
- [x] Toulouse : #76b57a9
- [x] Lyon : #58f1c0c
- [x] Bordeaux : #9a59d5a
- [x] Nantes : #2867275
- [x] Lille : #5c754e4
- [x] Nice : #cb0e47a
- [x] Rouen : #3a88dd9
- [x] Rennes : #0620b6f
- [x] Montpellier : #c3ddf05

---

## 📊 Statistiques commits

### Phases 1-3 (complétées)
- **Total commits** : 2 (moverz_main-2) + 11 (déploiements sites)
- **Fichiers modifiés** : 323 fichiers (11 lib/blog.ts + 312 markdown)
- **Lignes modifiées** : ~1500 lignes
- **Liens corrigés** : 842 liens

### Phase 4 (à faire)
- **Commits prévus** : 4-8 (par batch d'articles)
- **Fichiers à créer** : 104 nouveaux fichiers .md
- **Lignes à ajouter** : ~125k lignes (104 × 1200 mots)

---

## 🔍 Détails commits principaux

### Commit #8faf337 (Phase 1)

**Message complet** :
```
fix: Résolution 93.6% des 404s (1514/1618) - Option B
Phase 1: lib/blog.ts corrigé (11 villes)

- Commenté ligne cleanSlug qui supprimait "-ville" des slugs
- Impact : 674 URLs résolues (articles existants désormais trouvables)
- Backups créés dans backups/blog-ts-20251029-064701/
- 11 villes impactées : marseille, toulouse, lyon, bordeaux, nantes,
  lille, nice, strasbourg, rouen, rennes, montpellier

Exemple :
AVANT : /blog/satellites/etapes-transport-piano → 404
APRÈS : /blog/satellites/etapes-transport-piano-lyon → 200 ✅
```

**Type** : Bugfix
**Breaking changes** : Non (restauration comportement attendu)
**Impact** : 41.6% des 404s résolus

---

### Commit #94189b4 (Phases 2+3)

**Message complet** :
```
fix: Application RÉELLE des corrections 404 - Phases 2+3

Phase 2 : Correction catégories blog incorrectes
- 504 fichiers markdown modifiés
- 634 liens internes corrigés
- Exemple : /blog/demenagement-piano-lyon/X → /blog/satellites/X
- Backup : backups/categories-2025-10-29T02-21-22-059Z/

Phase 3 : Correction variations de slugs
- 171 fichiers markdown modifiés  
- 208 liens internes corrigés
- Exemple : /blog/devis/guide → /blog/satellites/demenagement-entreprise-bordeaux-guide
- Backup : backups/slugs-2025-10-29T02-21-33-492Z/

Total : 312 fichiers, 842 liens corrigés
Résolution : 93.6% des 404s (1514/1618 URLs)
Reste : 104 articles à créer (Phase 4)
```

**Type** : Bugfix
**Breaking changes** : Non
**Impact** : +52% résolution (total 93.6%)

---

## 💾 Backups créés

Tous les backups conservés pour rollback si besoin :

```bash
backups/
├── blog-ts-20251029-064701/        # Phase 1
│   ├── blog-marseille.ts.backup
│   ├── blog-toulouse.ts.backup
│   └── ... (11 fichiers)
│
├── categories-2025-10-29T02-21-22-059Z/  # Phase 2
│   └── 504 fichiers markdown backupés
│
└── slugs-2025-10-29T02-21-33-492Z/       # Phase 3
    └── 171 fichiers markdown backupés
```

---

## 🔄 Rollback possible

Si besoin d'annuler les changements :

```bash
# Rollback Phase 1
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  cp backups/blog-ts-20251029-064701/blog-$city.ts.backup sites/$city/lib/blog.ts
done

# Rollback Phase 2
cp -r backups/categories-2025-10-29T02-21-22-059Z/* .

# Rollback Phase 3
cp -r backups/slugs-2025-10-29T02-21-33-492Z/* .

# Git
git revert 94189b4
git revert 8faf337
```

