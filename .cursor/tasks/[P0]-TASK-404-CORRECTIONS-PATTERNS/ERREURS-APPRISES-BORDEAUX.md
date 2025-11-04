# Erreurs Apprises sur Bordeaux - À NE PAS REPRODUIRE

**Date** : 03 novembre 2025  
**Context** : Corrections Pattern #5B Bordeaux

---

## 🚨 ERREUR #1 : Mauvais mapping catégorie

### Ce que j'ai fait (FAUX)

**Hypothèse erronée** :
```
Catégorie frontmatter : "devis-demenagement-bordeaux"
CATEGORY_MAPPING : 'devis-demenagement': 'devis'
→ Je pensais que l'URL serait : /blog/devis/...
```

**Correction appliquée (FAUSSE)** :
```markdown
AVANT : [devis](/blog/devis/guide)
APRÈS : [devis](/blog/devis/devis-demenagement-bordeaux-guide)
→ 404 ! L'URL n'existe pas
```

### La vraie réalité

**CATEGORY_MAPPING** ne s'applique que si la clé existe :
```typescript
'devis-demenagement': 'devis'  ← Pas de '-bordeaux' !
```

**Catégorie frontmatter réelle** :
```markdown
category: "devis-demenagement-bordeaux"  ← Pas dans le mapping !
```

**→ Pas de transformation**  
**→ cleanCategory = `devis-demenagement-bordeaux`** (inchangé)

**URL réelle générée** :
```
/blog/devis-demenagement-bordeaux/guide/
```

**Correction JUSTE** :
```markdown
AVANT : [devis](/blog/devis/guide)
APRÈS : [devis](/blog/devis-demenagement-bordeaux/guide)
```

---

## ⚠️ ERREUR #2 : Ne pas tester en production AVANT correction

### Ce que j'aurais dû faire

**AVANT de corriger 117 liens** :

1. **Tester 1 URL en production** :
```bash
curl -I https://www.bordeaux-demenageur.fr/blog/devis-demenagement-bordeaux/guide/
→ 200 OK ✅

curl -I https://www.bordeaux-demenageur.fr/blog/devis/devis-demenagement-bordeaux-guide/
→ 404 ❌
```

2. **Faire 1 correction test**
3. **Vérifier le git diff**
4. **Valider l'approche**
5. **ALORS SEULEMENT** corriger les 117 liens

**Temps perdu** : 15 min (erreur) + 10 min (revert) + 15 min (re-correction) = **40 min gaspillées**

---

## ⚠️ ERREUR #3 : Assumer une architecture uniforme

### Hypothèse fausse

"Toutes les villes utilisent la même logique que Bordeaux"

### Réalité

**3 architectures différentes détectées** :

**Architecture Bordeaux** :
```
Dossier : devis-demenagement-bordeaux/
Catégorie : "devis-demenagement-bordeaux"
Slug : "devis-demenagement-bordeaux-guide"
cleanSlug : "guide" (préfixe retiré)
URL : /blog/devis-demenagement-bordeaux/guide/
```

**Architecture Lille** :
```
Dossier : demenageur-lille/
Catégorie : "demenagement-lille" (fourre-tout)
Slug : "demenageur-lille-expert"
URL : /blog/demenagement-lille/demenageur-lille-expert/
```

**Architecture Marseille** :
```
Dossier : demenagement-marseille/
Catégorie : "demenagement-marseille" (tout dedans)
Slug : Variable
URL : /blog/demenagement-marseille/{slug}/
```

**→ Chaque ville nécessite analyse individuelle**

---

## ✅ CHECKLIST PRÉ-CORRECTION (OBLIGATOIRE)

### 1. Analyser l'architecture ville

```bash
# Lister les dossiers
ls -d sites/{VILLE}/content/blog/*/

# Extraire catégories frontmatter
find sites/{VILLE}/content/blog -name "*.md" -exec grep "^category:" {} \; | sort | uniq

# Extraire slugs guides principaux
find sites/{VILLE}/content/blog -name "*guide*.md" -exec grep "^slug:" {} \;
```

### 2. Vérifier CATEGORY_MAPPING

```bash
# Ouvrir lib/blog.ts
cat sites/{VILLE}/lib/blog.ts | grep -A30 "CATEGORY_MAPPING"
```

**Questions à se poser** :
- [ ] Les catégories frontmatter sont-elles dans le mapping ?
- [ ] Quelle transformation est appliquée ?
- [ ] Y a-t-il un nettoyage de slug (cleanSlug) ?

### 3. Tester URLs en production

```bash
# Tester 2-3 URLs guides en production
curl -I https://{DOMAIN}/blog/{category}/{slug}/

# Exemples à tester :
# - Guide principal de chaque catégorie
# - Catégorie courte vs longue
# - Slug nettoyé vs slug complet
```

**RÈGLE D'OR** : Ne jamais corriger sans avoir testé 3 URLs live

### 4. Faire 1 correction test

```bash
# Corriger 1 seul fichier
# Vérifier git diff
# Relire attentivement
# Valider que ça a du sens
```

### 5. Valider avec curl

```bash
# Tester l'URL corrigée
curl -I https://{DOMAIN}/blog/{corrected-url}/
→ Doit être 200 OK
```

### 6. ALORS seulement corriger en masse

---

## 🔧 TEMPLATE CORRECTION SAFE

```bash
# ÉTAPE 1 : Analyse
echo "=== ARCHITECTURE {VILLE} ==="
ls -d sites/{VILLE}/content/blog/*/
find sites/{VILLE}/content/blog -name "*guide*.md" -exec head -8 {} \; | grep -E "slug:|category:"

# ÉTAPE 2 : Test production (CRITIQUE)
curl -I https://{DOMAIN}/blog/{test-category}/{test-slug}/
→ Noter le status code

# ÉTAPE 3 : Mapping exact
# Créer tableau :
# Lien cassé | Catégorie réelle | Slug nettoyé | URL cible

# ÉTAPE 4 : Correction 1 fichier test
grep -r "{lien-casse}" sites/{VILLE}/content/blog --include="*.md" -l | head -1
# → Corriger manuellement
# → git diff
# → Valider

# ÉTAPE 5 : Si OK, corriger en masse
for file in $(grep -r "{lien-casse}" . --include="*.md" -l); do
  sed -i '' 's|{lien-casse}|{lien-correct}|g' "$file"
done

# ÉTAPE 6 : Vérification finale
grep -r "{lien-casse}" . --include="*.md" | wc -l
→ Doit être 0
```

---

## 📋 LEÇONS POUR LES AUTRES VILLES

### ✅ À FAIRE

1. **Tester TOUJOURS en production d'abord**
2. **Vérifier CATEGORY_MAPPING** (ne pas assumer)
3. **Faire 1 correction test** avant masse
4. **Lire le git diff attentivement**
5. **Tester l'URL corrigée** avec curl

### ❌ À NE PAS FAIRE

1. ❌ Assumer que le mapping est identique entre villes
2. ❌ Corriger 117 liens sans test préalable
3. ❌ Se baser uniquement sur la doc (tester le code réel)
4. ❌ Ignorer les warnings (slug nettoyé vs slug complet)
5. ❌ Commit sans vérifier git diff

---

## 🎯 RÉSULTAT BORDEAUX (FINAL)

**Commits** :
- SHA monorepo : `8f719a0`
- SHA Bordeaux : `c8befc5`

**Corrections appliquées** :
```
/blog/devis/guide → /blog/devis-demenagement-bordeaux/guide (32)
/blog/etudiant/guide → /blog/demenagement-etudiant-bordeaux/guide-complet (27)
/blog/longue-distance/guide → /blog/demenagement-longue-distance-bordeaux/guide (18)
/blog/garde-meuble/guide → /blog/garde-meuble-bordeaux/guide (17)
/blog/urgent/guide → /blog/demenagement-urgent-bordeaux/guide (13)
/blog/prix/guide → /blog/prix-demenagement-bordeaux/guide (13)
/blog/international/guide → /blog/demenagement-international-bordeaux/guide (10)
/blog/pas-cher/guide → /blog/demenagement-pas-cher-bordeaux/guide (9)
/blog/entreprise/guide → /blog/demenagement-entreprise-bordeaux/guide (5)
```

**Validation** :
- ✅ 0 lien cassé restant
- ✅ URLs testées production : 200 OK
- ✅ 80 fichiers modifiés
- ✅ Deploy CapRover en cours

---

**CE DOCUMENT DOIT ÊTRE LU PAR CHAQUE CURSOR TRAVAILLANT SUR UNE VILLE**



