# Commits - TASK-404-blog-toulouse

## Phase 1 : Tentative redirections (❌ REVERT)

### Monorepo
- **`bfb02e6`** - fix(toulouse): add redirects for accented blog categories
  - 22 redirects accents → sans accents
  - ❌ User : "Non je ne veux pas de redirect"

### Toulouse
- **`c26a3ca`** - fix: add redirects for accented blog categories
  - 22 redirects (même contenu)
  - ❌ Revert demandé

### Reverts
- **`945df5d`** (monorepo) - Revert redirections
- **`9dd1b88`** (toulouse) - Revert redirections

---

## Phase 2 : Mapping catégories (✅ PARTIEL)

### Monorepo
- **`553d461`** - fix(toulouse): map accented categories to clean URLs
  - Ajout 10 mappings principaux dans `lib/blog.ts`
  - Fix import `getCityDataFromUrl` manquant
  - Build local OK

### Toulouse  
- **`c17236a`** - fix: map accented categories to clean URLs + fix missing import
  - Même contenu que monorepo
  - Push vers CapRover

---

## Phase 3 : Liens internes (✅ COMPLET)

### Monorepo
- **`eb3432c`** - fix(toulouse): correct all internal blog links
  - 12 piliers sans catégorie
  - 85+ satellites `/blog/satellites/...` → catégorie correcte
  - 6 liens morts supprimés
  - 23 fichiers markdown modifiés
  - 103 liens corrigés au total

### Toulouse
- **`cd5dccc`** - fix: correct all internal blog links (103 links)
  - Même contenu que monorepo
  - 11 fichiers modifiés (subset du monorepo)

---

## Phase 4 : Mapping complet (✅ FINAL)

### Monorepo
- **`cdafcf0`** - fix(toulouse): add all 56 accented category mappings
  - 46 nouveaux mappings (total 56)
  - Couvre TOUTES les catégories accentuées
  - Script auto `/tmp/generate-toulouse-mappings.js`

### Toulouse
- **`925ee71`** - fix: add all 56 accented category mappings
  - Même contenu
  - Déploiement final

---

## 📊 Résumé Commits Valides

| Phase | Commits | Fichiers | Lignes | Description |
|-------|---------|----------|--------|-------------|
| 2. Mapping initial | 2 | 2 | +15 | 10 mappings principaux |
| 3. Liens internes | 2 | 23 | 103 corrections | Markdown links |
| 4. Mapping complet | 2 | 1 | +53 | 56 mappings totaux |
| **TOTAL** | **6** | **26** | **~170** | **Corrections complètes** |

---

## 🔗 Liens GitHub

- Monorepo : `https://github.com/gdetaisne/moverz_main/commits/main`
- Toulouse : `https://github.com/gdetaisne/dd-toulouse/commits/main`
