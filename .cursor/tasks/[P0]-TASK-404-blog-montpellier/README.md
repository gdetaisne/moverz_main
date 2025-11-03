# TASK : Corriger 404s Blog Montpellier

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Montpellier  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 1h30-2h

---

## 🎯 OBJECTIF

Corriger **~50-80 liens internes 404** dans le blog Montpellier.

**Pattern** : Mismatch dossier ≠ catégorie frontmatter (identique à Lille)

---

## 🏗️ ARCHITECTURE MONTPELLIER

### Structure actuelle

**Dossiers** :
```
content/blog/
├── demenageur-montpellier/
├── location-camion-demenagement-montpellier/
├── garde-meuble-montpellier/
├── prix-demenagement-montpellier/
├── aide-demenagement-particulier-montpellier/
├── demenagement-international-montpellier/
├── demenagement-pas-cher-montpellier/
├── demenagement-entreprise-montpellier/
├── demenagement-piano-montpellier/
├── petit-demenagement-montpellier/
└── satellites/
```

**Catégories frontmatter** :
```markdown
TOUS les guides ont : category: "demenagement-montpellier"
```

**URLs réelles générées** :
```
✅ /blog/demenagement-montpellier/demenageur-montpellier/
✅ /blog/demenagement-montpellier/garde-meuble-montpellier/
✅ /blog/demenagement-montpellier/prix-demenagement-montpellier/
```

**Liens markdown cassés** :
```
❌ /blog/demenageur-montpellier/demenageur-montpellier
❌ /blog/garde-meuble-montpellier/garde-meuble-montpellier-guide-complet
❌ /blog/location-camion-demenagement-montpellier/location-camion-demenagement-montpellier
```

---

## 🚨 ERREURS À NE PAS REPRODUIRE

**⚠️ LIRE OBLIGATOIREMENT** : `.cursor/tasks/[P0]-TASK-404-CORRECTIONS-PATTERNS/ERREURS-APPRISES-BORDEAUX.md`

**Architecture Montpellier = Architecture Lille** (même type de problème)

---

## 🔧 MAPPING MONTPELLIER

### Pattern correction

**TOUTES les catégories** → `demenagement-montpellier`

| Lien cassé | URL correcte |
|------------|--------------|
| `/blog/demenageur-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/location-camion-demenagement-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/garde-meuble-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/prix-demenagement-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/demenagement-international-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/demenagement-pas-cher-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/demenagement-entreprise-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/petit-demenagement-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/demenagement-piano-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |
| `/blog/aide-demenagement-particulier-montpellier/{slug}` | `/blog/demenagement-montpellier/{slug}` |

---

## ✅ CHECKLIST COMPLÈTE

### Phase 1 : Tests Production OBLIGATOIRES (10 min)

```bash
curl -I https://devis-demenageur-montpellier.fr/blog/demenagement-montpellier/demenageur-montpellier/
curl -I https://devis-demenageur-montpellier.fr/blog/demenagement-montpellier/garde-meuble-montpellier-guide-complet/
curl -I https://devis-demenageur-montpellier.fr/blog/demenagement-montpellier/prix-demenagement-montpellier/

→ TOUTES DOIVENT être 200 OK avant de continuer
```

- [ ] 3 URLs testées = 200 OK ✅

### Phase 2 : Audit (10 min)

```bash
cd sites/montpellier/content/blog

# Compter liens par pattern
grep -r "](/blog/demenageur-montpellier/" . --include="*.md" | wc -l
grep -r "](/blog/garde-meuble-montpellier/" . --include="*.md" | wc -l
# ... etc
```

- [ ] Nombre liens documenté par pattern

### Phase 3 : Correction Test (15 min)

- [ ] Corriger 1 fichier manuellement
- [ ] Git diff vérifié
- [ ] URL testée

### Phase 4 : Correction Masse (30-45 min)

```bash
# Pattern par pattern avec vérification après chaque
for file in $(grep -r "](/blog/demenageur-montpellier/" . --include="*.md" -l); do
  sed -i '' 's|](/blog/demenageur-montpellier/|](/blog/demenagement-montpellier/|g' "$file"
done

grep -r "](/blog/demenageur-montpellier/" . --include="*.md" | wc -l  # → 0
```

- [ ] Tous patterns corrigés
- [ ] Tous compteurs = 0

### Phase 5 : Deploy (10 min)

- [ ] Commit + push monorepo
- [ ] Push Montpellier individuel
- [ ] CapRover deploy
- [ ] Validation production

---

## 📚 RÉFÉRENCES

- **Erreurs Bordeaux** : `ERREURS-APPRISES-BORDEAUX.md` ⭐⭐⭐
- **Exemple réussi** : Bordeaux SHA `8f719a0`
- **Ville similaire** : Lille (même architecture)

---

**Domain** : https://devis-demenageur-montpellier.fr  
**Liens cassés estimés** : 50-80  
**Status** : 📋 TODO


