# Commits GitHub : TASK-002 - Migration Canonicals

## Repo principal (moverz_main-2)

### Documentation (complétée)

- [x] Commits documentation (non trackés dans Git)
  - ANALYSE-CANONICALS-COMPLETE.md
  - RESUME-CANONICALS.md
  - EXEMPLE-MIGRATION-CANONICALS.md
  - DECISION-CANONICALS.md
  - EFFETS-BORD-CANONICALS.md
  - TABLEAU-DOMAINES-ACTUELS.md
  - + autres fichiers

### Implémentation (à faire)

- [ ] Commit 1 : Création helper canonicals centralisé
  - Fichier : `lib/canonical-helper.ts`
  - Type : feat
  - Scope : Toutes les villes

- [ ] Commit 2 : Migration Nice (modèle)
  - Fichiers : ~15 fichiers Nice
  - Type : refactor
  - Breaking : Oui (changement canonicals)

- [ ] Commits 3-13 : Migration 10 autres villes
  - Par ville : ~15 fichiers
  - Type : refactor
  - Peut être groupé ou séparé

---

## Sites concernés (11 villes)

### À migrer

- [ ] Nice : Modèle (à faire en premier)
- [ ] Marseille
- [ ] Toulouse
- [ ] Lyon
- [ ] Bordeaux
- [ ] Nantes
- [ ] Lille
- [ ] Strasbourg
- [ ] Rouen
- [ ] Rennes
- [ ] Montpellier

---

## 📊 Statistiques commits (estimées)

### Implémentation prévue

- **Commits prévus** : 12-15
  - 1 helper centralisé
  - 11 migrations villes
  - 1-2 fixes post-migration

- **Fichiers à modifier** : ~150
  - Helper : 1 fichier nouveau
  - Par ville : ~15 fichiers
  - 11 villes × 15 = 165 fichiers

- **Lignes à modifier** : ~2000-3000
  - URLs hardcodées → appels helper
  - siteUrl avec slash final
  - Canonicals pages individuelles

---

## 🔍 Format commits recommandé

### Exemple Commit Helper

```
feat: Add centralized canonical URL helper

Création helper centralisé pour génération canonicals :
- Fonction getCanonicalUrl(path)
- Lecture siteUrl depuis cityData
- Ajout slash final automatique
- Support pages, blog, corridors

Usage :
- import { getCanonicalUrl } from '@/lib/canonical-helper'
- <link rel="canonical" href={getCanonicalUrl('partenaires')} />

Impacts :
- Maintenance facilitée (1 seul endroit)
- Cohérence garantie (slash partout)
- Évolutif (changement domaine facile)
```

### Exemple Commit Nice

```
refactor(nice): Migrate to centralized canonical helper

Migration Nice vers helper canonicals centralisé :
- 15 pages migrées (homepage, blog, partenaires, etc.)
- URLs hardcodées remplacées par getCanonicalUrl()
- siteUrl avec slash final : https://devis-demenageur-nice.fr/
- Domaine unique confirmé : devis-demenageur-nice.fr (sans www)

Fichiers modifiés :
- lib/cityData.ts (siteUrl avec /)
- pages/*.tsx (15 fichiers)
- components/BlogLayout.tsx

Tests :
- Build OK
- Canonicals validés (curl + view source)

⚠️ Impact SEO temporaire attendu (-5% J+1-7)
✅ Impact long terme : +15-20% (J+30+)
```

---

## 💾 Backups recommandés

Avant migration, créer backups :

```bash
# Nice (avant migration)
mkdir -p backups/canonicals-nice-$(date +%Y%m%d)
cp -r sites/nice backups/canonicals-nice-$(date +%Y%m%d)/

# Autres villes
for city in marseille toulouse lyon bordeaux nantes lille strasbourg rouen rennes montpellier; do
  mkdir -p backups/canonicals-$city-$(date +%Y%m%d)
  cp -r sites/$city backups/canonicals-$city-$(date +%Y%m%d)/
done
```

---

## 🔄 Rollback possible

Si problème détecté après migration :

```bash
# Rollback Nice
cp -r backups/canonicals-nice-YYYYMMDD/nice sites/

# Rollback Git
git revert <commit-sha>

# Redéployer
cd sites/nice
pnpm build && pnpm deploy
```

---

## 📅 Planning commits recommandé

### Phase 1 : Helper + Nice (Semaine 1)
- Jour 1-2 : Créer helper + tests
- Jour 3-5 : Migrer Nice + valider

### Phase 2 : 10 Autres Villes (Semaine 2-3)
- Par ville : 0.5-1 jour
- Grouper par batch de 3-4 villes
- Tests après chaque batch

### Phase 3 : Monitoring (Semaine 4)
- Suivre Search Console
- Ajuster si besoin
- Documenter résultats

---

## ✅ Checklist pré-commit

Avant chaque commit :

- [ ] Build OK (`pnpm build`)
- [ ] Canonicals validés (curl + view source)
- [ ] Tests locaux OK
- [ ] Backup créé
- [ ] Message commit clair avec impact SEO mentionné
- [ ] Documentation mise à jour

---

*Aucun commit code pour l'instant - Documentation seulement*

