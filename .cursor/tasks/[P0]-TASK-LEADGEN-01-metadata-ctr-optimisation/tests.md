# Tests - TASK-LEADGEN-01

## 🎯 Stratégie de Test

### 1. Tests Techniques (Pre-Deploy)
Validation syntaxe + build avant déploiement

### 2. Tests Production (Post-Deploy)
Validation SERP réelle + CTR monitoring

### 3. Tests A/B (Optionnel J+14)
Si budget, tester 2 variantes metadata

---

## ✅ Tests Techniques (Pre-Deploy)

### Test 1 : Validation TypeScript

**Objectif** : 0 erreur syntaxe après modifications

**Commande** :
```bash
cd sites/lyon
npm run type-check
# ou
npx tsc --noEmit
```

**Critères réussite** :
- ✅ 0 erreur TypeScript
- ✅ 0 warning cityData undefined
- ✅ Build réussit

**Sites à tester** :
- Lyon (référence)
- Rennes (validation pattern 2)
- Bordeaux (validation pattern 1 restant)

---

### Test 2 : Validation longueur metadata

**Objectif** : Tous titles 50-60 chars, descriptions 150-160 chars

**Script validation** (à créer) :
```typescript
// scripts/validate-metadata-length.ts
import { getAllPages } from './utils';

const pages = getAllPages(11); // 11 villes

pages.forEach(page => {
  const titleLength = page.metadata.title.length;
  const descLength = page.metadata.description.length;
  
  if (titleLength < 50 || titleLength > 60) {
    console.warn(`⚠️ Title ${titleLength} chars: ${page.url}`);
  }
  
  if (descLength < 150 || descLength > 160) {
    console.warn(`⚠️ Description ${descLength} chars: ${page.url}`);
  }
});
```

**Critères réussite** :
- ✅ 95%+ titles dans range 50-60
- ✅ 90%+ descriptions dans range 150-160
- ✅ 0 title > 65 caractères (hard limit)

---

### Test 3 : Validation villes dynamiques

**Objectif** : 0 ville hardcodée restante

**Script scan** (réutiliser existant) :
```bash
# Pattern 1 "à Lille"
grep -r "à Lille" sites/*/app/ --include="*.tsx" | grep -v "sites/lille"

# Pattern 2 "à Marseille"
grep -r "à Marseille" sites/*/app/ --include="*.tsx" | grep -v "sites/marseille"

# Autres villes hardcodées
grep -r "Déménagement Lyon" sites/*/app/ --include="*.tsx" | grep -v "sites/lyon"
```

**Critères réussite** :
- ✅ 0 résultat Pattern 1 (hors ville concernée)
- ✅ 0 résultat Pattern 2 (hors ville concernée)
- ✅ Toutes metadata utilisent cityData

---

### Test 4 : Build local réussi

**Objectif** : Build passe sur 3 sites représentatifs

**Commande** :
```bash
# Lyon (référence)
cd sites/lyon
npm run build

# Bordeaux (pattern 1 restant)
cd sites/bordeaux
npm run build

# Nice (pattern 2)
cd sites/nice
npm run build
```

**Critères réussite** :
- ✅ Build réussit sans erreur
- ✅ Pas de warning cityData
- ✅ Metadata générées correctement dans HTML

---

## 🌐 Tests Production (Post-Deploy)

### Test 5 : Validation SERP (J+1)

**Objectif** : Metadata affichées correctement dans Google

**Méthode manuelle** :
1. Google : `site:devis-demenageur-lyon.fr`
2. Vérifier 5-10 URLs différentes
3. Screenshot avant/après

**Pages à tester** :
- Home : `devis-demenageur-lyon.fr`
- Services : `devis-demenageur-lyon.fr/services`
- Blog : `devis-demenageur-lyon.fr/blog`
- Contact : `devis-demenageur-lyon.fr/contact`
- Article blog : `devis-demenageur-lyon.fr/blog/prix-demenagement-lyon`

**Critères réussite** :
- ✅ Title affiché complet (pas coupé)
- ✅ Description affichée complète
- ✅ Ville correcte (Lyon, pas Lille/Marseille)
- ✅ CTA visible ("5 Devis 7j", "Gratuit")
- ✅ Chiffres visibles (prix, délais)

---

### Test 6 : Validation Search Console (J+2-3)

**Objectif** : Search Console détecte nouvelles metadata

**Étapes** :
1. Search Console → Apparence de la recherche → Données structurées
2. Vérifier "Dernière exploration" date récente
3. Inspecter URL : `devis-demenageur-lyon.fr`

**Critères réussite** :
- ✅ Metadata à jour dans inspection URL
- ✅ 0 erreur metadata
- ✅ Rich snippets validés (breadcrumbs, FAQ)

---

### Test 7 : CTR Monitoring (J+7, J+14, J+30)

**Objectif** : Mesurer impact réel sur CTR

**Méthode** : Dashboard analytics custom + Search Console

**Métriques à tracker** :

| Métrique | Avant (05/11) | J+7 | J+14 | J+30 | Objectif J+30 |
|----------|---------------|-----|------|------|---------------|
| CTR global | 0.56% | ? | ? | ? | ≥ 2.5% |
| Clics/mois | 6 | ? | ? | ? | ≥ 37 |
| Impressions | 1 500 | ? | ? | ? | 1 800-2 500 |
| Position moy | 37.3 | ? | ? | ? | 30-35 |
| Leads estimés | 0-1 | ? | ? | ? | 5-8 |

**Breakdown par type page** :

| Type page | CTR avant | CTR J+30 | Objectif |
|-----------|-----------|----------|----------|
| Home | ? | ? | 3-4% |
| Services | ? | ? | 2.5-3% |
| Blog articles | ? | ? | 2-3% |
| Contact | ? | ? | 4-5% |
| Corridors | ? | ? | 2-3% |

**Breakdown par ville** :

| Ville | CTR avant | CTR J+30 | Objectif | Note |
|-------|-----------|----------|----------|------|
| Lyon | 4.17% | ? | Maintenir | Déjà bon |
| Rennes | 0.73% | ? | 2.5%+ | +250% |
| Nice | 0% | ? | 2%+ | De 0 → 2% |
| Marseille | 0% | ? | 2%+ | De 0 → 2% |
| Toulouse | 0% | ? | 2%+ | De 0 → 2% |
| ... | ... | ... | ... | ... |

---

## 📊 Tests A/B (Optionnel)

### Test 8 : A/B Title variations (J+14)

**Objectif** : Identifier meilleur template title

**Méthode** :
- Variante A : `Déménageurs ${ville} : 5 Devis 7j | Moverz`
- Variante B : `Déménagement ${ville} Pas Cher | 5 Devis Gratuits`

**Split** : 
- Lyon, Marseille, Nice → Variante A
- Rennes, Nantes, Lille → Variante B

**Durée** : 14 jours

**Critères décision** :
- CTR variante B > variante A + 20% → Adopter B
- Sinon garder A

---

### Test 9 : A/B Description CTA (J+14)

**Objectif** : Identifier meilleur CTA

**Méthode** :
- Variante A : "Devis gratuit en 30 min"
- Variante B : "Estimation IA instantanée"

**Split** : 50/50 sur 6 villes

**Critères décision** :
- CTR variante avec "IA" > +15% → Adopter
- Sinon garder "Devis gratuit"

---

## 🐛 Tests Régression

### Test 10 : Validation autres features OK

**Objectif** : Modifications metadata n'ont pas cassé autre chose

**Checklist** :
- [ ] Breadcrumbs toujours présents
- [ ] Canonical toujours corrects
- [ ] FAQ schema.org OK
- [ ] Rich snippets validés GSC
- [ ] Formulaires lead fonctionnent
- [ ] Tracking analytics OK

**Sites à tester** : Lyon, Bordeaux

---

## 📸 Screenshots & Documentation

### Avant/Après SERP

**À capturer pour 3 villes** (Lyon, Rennes, Marseille) :

**Avant (05/11)** :
- Screenshot Google : `site:devis-demenageur-lyon.fr`
- Screenshot home Lyon dans SERP
- Screenshot article blog Lyon dans SERP

**Après (J+3)** :
- Mêmes screenshots après déploiement
- Comparaison visuelle

**Stockage** : `.cursor/tasks/[P0]-TASK-LEADGEN-01-metadata-ctr-optimisation/screenshots/`

---

## ✅ Definition of Done Tests

**Avant déploiement** :
- [ ] Test 1 : TypeScript OK (3 sites)
- [ ] Test 2 : Longueur metadata OK (95%+)
- [ ] Test 3 : 0 ville hardcodée (scan complet)
- [ ] Test 4 : Build local réussi (3 sites)

**Après déploiement** :
- [ ] Test 5 : SERP validation (J+1, 3 villes)
- [ ] Test 6 : Search Console OK (J+2-3)
- [ ] Test 7 : CTR J+7 mesuré (dashboard)
- [ ] Test 7 : CTR J+14 validé (≥ 2%)
- [ ] Test 7 : CTR J+30 confirmé (≥ 2.5%)

**Optionnel** :
- [ ] Test 8 : A/B titles (si temps)
- [ ] Test 9 : A/B descriptions (si temps)
- [ ] Test 10 : Régression OK

---

## 🔗 Outils Tests

**Build local** :
```bash
npm run build
npm run type-check
```

**Validation metadata** :
```bash
# Script custom à créer
node scripts/validate-metadata-length.ts
```

**Scan villes hardcodées** :
```bash
grep -r "à Lille\|à Marseille\|à Lyon" sites/*/app/ --include="*.tsx"
```

**Search Console** :
- URL : https://search.google.com/search-console
- 11 propriétés configurées

**Dashboard analytics custom** :
- GitHub : [À compléter par Guillaume]
- Suivi CTR temps réel

---

*Dernière mise à jour* : 05/11/2025

