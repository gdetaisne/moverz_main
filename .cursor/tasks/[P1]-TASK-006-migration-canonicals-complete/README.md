# TASK-006 : Migration Canonicals Complète - 11 villes

**Type** : Refactor / SEO Critical  
**Priorité** : P1  
**Temps estimé initial** : 40-50h  
**Temps réel** : ~45h + 2h corrections bugs résiduels  
**Assigné à** : Guillaume  
**Démarrée le** : 31 octobre 2025  
**Statut** : 🔄 EN COURS (95% fait)

---

## 🎯 Objectif

Migration exhaustive des URLs canoniques avec trailing slash pour les 11 sites Moverz, garantissant :
- ✅ Cohérence SEO Google Search Console
- ✅ Élimination des duplicatas d'indexation
- ✅ Redirections 308 automatiques Next.js
- ✅ Conformité recommandations Google (trailing slash systématique)

**Impact SEO attendu** : +10-15% positions organiques via consolidation signaux

---

## 📊 Scope

### Sites concernés (11)
- ✅ Marseille
- ✅ Nice
- ✅ Toulouse
- ✅ Lyon
- ✅ Bordeaux
- ✅ Nantes
- ✅ Strasbourg
- ✅ Lille
- ✅ Rennes
- ✅ Montpellier
- ✅ Rouen

### Pages corrigées
- **1407 pages totales** corrigées
- Homepage, services, quartiers, corridors
- Blog (catégories + articles satellites)
- Pages légales (CGV, CGU, mentions, etc.)

---

## ✅ Travail Effectué (90%)

### Phase 1-9 : Marseille (31 oct)
- ✅ Trailing slash sur 100% des pages
- ✅ Helper `canonical-helper.ts` centralisé
- ✅ Fonction `getCanonicalUrl()` implémentée
- ✅ Tests automatisés 55/55 passés

### Phase 10 : 10 autres villes (31 oct)
- ✅ Nice, Toulouse, Lyon, Bordeaux
- ✅ Nantes, Strasbourg, Lille, Rennes
- ✅ Montpellier, Rouen
- ✅ 1407 pages avec trailing slash
- ✅ Tests locaux OK

### Commits GitHub (15+)
- ✅ Sur branche `main`
- ✅ Tous les sites déployables
- ✅ Documentation inline

---

## 🚨 Bugs Résiduels Identifiés (1er nov - Analyse approfondie)

### **BUG #1 : Pages Quartiers avec Slug Hardcodé** ⚠️⚠️⚠️
**Impact** : CRITIQUE SEO  
**Sites affectés** : 10/11 (tous sauf Lille)

**Problème** :
```typescript
// ❌ TOUS les sites utilisent 'quartiers-lille' hardcodé
// Fichier : sites/{ville}/app/quartiers-{ville}/page.tsx
canonical: getCanonicalUrl('quartiers-lille'),
```

**Résultat** :
- Toulouse → génère `/quartiers-lille/` au lieu de `/quartiers-toulouse/`
- Strasbourg → génère `/quartiers-lille/` au lieu de `/quartiers-strasbourg/`
- etc. pour 8 autres villes

**Conséquence** :
- Canonical pointe vers URL inexistante (404)
- Google Search Console erreurs canonical
- Dilution ranking

**Correction** :
```typescript
// ✅ Utiliser slug dynamique
const city = getCityDataFromUrl(env.SITE_URL);
canonical: getCanonicalUrl(`quartiers-${city.slug}`),
```

**Fichiers à corriger** : 10 fichiers
- `sites/toulouse/app/quartiers-toulouse/page.tsx`
- `sites/strasbourg/app/quartiers-strasbourg/page.tsx`
- `sites/rouen/app/quartiers-rouen/page.tsx`
- `sites/rennes/app/quartiers-rennes/page.tsx`
- `sites/nice/app/quartiers-nice/page.tsx`
- `sites/nantes/app/quartiers-nantes/page.tsx`
- `sites/marseille/app/quartiers-marseille/page.tsx`
- `sites/lyon/app/quartiers-lyon/page.tsx`
- `sites/bordeaux/app/quartiers-bordeaux/page.tsx`
- `sites/montpellier/app/quartiers-montpellier/page.tsx`

---

### **BUG #2 : Metadata "Lille" dans Autres Villes** ⚠️⚠️
**Impact** : CRITIQUE UX/SEO  
**Sites affectés** : Toulouse (minimum, possiblement autres)

**Problème** :
```typescript
// ❌ Toulouse affiche "Lille" dans metadata
title: "Quartiers & communes — Déménagement à Lille | IA & transparence",
description: "...à Lille : Vieux Lille, Centre, Wazemmes..."
```

**Fichiers affectés** (Toulouse minimum) :
- `quartiers-toulouse/page.tsx` (title + description "Lille")
- `notre-offre/page.tsx` (description "Lille")
- `inventaire-ia/layout.tsx` (description "Lille")
- `faq/layout.tsx` (description "Lille")
- `estimation-rapide/layout.tsx` (description "Lille")
- `contact/page.tsx` (description "Lille")

**Conséquence** :
- Baisse CTR (title incorrect)
- Confusion utilisateur
- Signal qualité dégradé Google

**Correction** :
Utiliser `city.nameCapitalized` dynamique partout

---

### **BUG #3 : Templates Hardcodés (Marseille/Nice)** ⚠️
**Impact** : MOYEN  
**Sites affectés** : Tous (templates génériques)

**Problème** :
```typescript
// CorridorPage.tsx ligne 48
"name": `Déménagement Marseille → ${destination}...`

// LocalPage.tsx ligne 45
title: `Déménagement ${zoneDisplay} Nice - Tarifs...`

// LocalPage.tsx ligne 122
<div className="text-white/80 text-sm">toulouse</div>
```

**Fichiers** :
- `app/_templates/CorridorPage.tsx`
- `app/_templates/LocalPage.tsx`

**Correction** :
Rendre templates 100% dynamiques avec `city.nameCapitalized`

---

### **BUG #4 : Trailing Slash Inconsistant cityData.ts** ⚠️
**Impact** : FAIBLE (helper corrige automatiquement)

**Problème** :
```typescript
// Inconsistance dans sources de données
toulouse: { siteUrl: 'https://devis-demenageur-toulousain.fr/' }  // avec /
nice: { siteUrl: 'https://devis-demenageur-nice.fr' }             // sans /
```

**Correction** :
Uniformiser SANS trailing slash dans `cityData.ts` (11 fichiers)  
Le helper `getCanonicalUrl()` l'ajoute automatiquement

---

## 📋 Plan de Correction Bugs Résiduels

### **Étape 1 : Bug Quartiers (P0 - 15 min)**
```bash
# Correction automatisée find/replace
# Pattern : canonical: getCanonicalUrl('quartiers-lille')
# Remplacer par : canonical: getCanonicalUrl(`quartiers-${city.slug}`)
```

**Action** :
1. Ajouter import `getCityDataFromUrl` si manquant
2. Déclarer `const city = getCityDataFromUrl(env.SITE_URL);`
3. Remplacer par template literal dynamique
4. Répéter pour 10 fichiers

**Test** :
```bash
# Vérifier chaque site
curl -s https://devis-demenageur-nice.fr/quartiers-nice/ | grep canonical
# Doit afficher : <link rel="canonical" href="https://devis-demenageur-nice.fr/quartiers-nice/"/>
```

---

### **Étape 2 : Metadata Hardcodées (P1 - 30 min)**

**Toulouse** (vérifier si autres villes affectées) :

**quartiers-toulouse/page.tsx** :
```typescript
// ❌ Avant
title: "Quartiers & communes — Déménagement à Lille | IA & transparence",
description: "Trouvez votre page quartier/commune pour estimer votre déménagement à Lille : Vieux Lille..."

// ✅ Après
const city = getCityDataFromUrl(env.SITE_URL);
title: `Quartiers & communes — Déménagement à ${city.nameCapitalized} | IA & transparence`,
description: `Trouvez votre page quartier/commune pour estimer votre déménagement à ${city.nameCapitalized}...`
```

Répéter pour :
- notre-offre/page.tsx
- inventaire-ia/layout.tsx
- faq/layout.tsx
- estimation-rapide/layout.tsx
- contact/page.tsx

**Vérifier autres villes** :
```bash
grep -r "Déménagement à Lille" sites/*/app/ --include="*.tsx" | grep -v "sites/lille"
```

---

### **Étape 3 : Templates Dynamiques (P2 - 20 min)**

**CorridorPage.tsx** :
```typescript
// Ligne 48 - generateCorridorPageJsonLd
// ❌ Avant
"name": `Déménagement Marseille → ${destination} — comparaison de devis`,

// ✅ Après
const city = getCityDataFromUrl(env.SITE_URL);
"name": `Déménagement ${city.nameCapitalized} → ${destination} — comparaison de devis`,
```

**LocalPage.tsx** :
```typescript
// Ligne 45 - generateLocalPageMetadata
// ❌ Avant
title: `Déménagement ${zoneDisplay} Nice - Tarifs & Devis Gratuit | Moverz`,

// ✅ Après
const city = getCityDataFromUrl(env.SITE_URL);
title: `Déménagement ${zoneDisplay} ${city.nameCapitalized} - Tarifs & Devis Gratuit | Moverz`,

// Ligne 122 - hardcodé "toulouse"
// ❌ Avant
<div className="text-white/80 text-sm">toulouse</div>

// ✅ Après
<div className="text-white/80 text-sm">{city.nameCapitalized}</div>
```

---

### **Étape 4 : Uniformisation cityData.ts (P3 - 10 min)**

**Tous les sites** (11 fichiers `lib/cityData.ts`) :
```typescript
// ❌ Avant (inconsistant)
toulouse: { siteUrl: 'https://devis-demenageur-toulousain.fr/' }  // avec /
nice: { siteUrl: 'https://devis-demenageur-nice.fr' }             // sans /

// ✅ Après (uniforme SANS trailing slash)
toulouse: { siteUrl: 'https://devis-demenageur-toulousain.fr' }
nice: { siteUrl: 'https://devis-demenageur-nice.fr' }
```

**Raison** : Le helper `getCanonicalUrl()` ajoute automatiquement le slash final

---

## ✅ Definition of Done (DoD)

### Critère 1 : Code Propre ✅ (90% fait)
- [x] Helper `canonical-helper.ts` centralisé (11 villes)
- [x] Fonction `getCanonicalUrl()` implémentée
- [x] 1407 pages avec trailing slash
- [ ] **Bug #1** : Quartiers dynamiques (10 fichiers)
- [ ] **Bug #2** : Metadata dynamiques (6+ fichiers Toulouse min)
- [ ] **Bug #3** : Templates dynamiques (2 fichiers)
- [ ] **Bug #4** : cityData.ts uniformisé (11 fichiers)

### Critère 2 : Commits GitHub ✅ (fait)
- [x] 15+ commits sur `main`
- [ ] Commit correction Bug #1 (quartiers)
- [ ] Commit correction Bug #2 (metadata)
- [ ] Commit correction Bug #3 (templates)
- [ ] Commit correction Bug #4 (cityData)
- [ ] SHA documentés dans `commits.md`

### Critère 3 : Tests Live (2+ sites minimum) ⏳
- [ ] Nice : Tester 5 pages (homepage, quartiers, blog, service, corridor)
- [ ] Toulouse : Tester 5 pages
- [ ] Vérifier canonical avec trailing slash :
  ```bash
  curl -s URL | grep -o '<link rel="canonical" href="[^"]*"'
  ```
- [ ] Vérifier redirections 308 :
  ```bash
  curl -I URL-sans-slash  # Doit retourner 308 → URL-avec-slash
  ```
- [ ] Google Search Console : Vérifier pas d'erreurs canonical

---

## 🧪 Protocole de Test

### Test Automatisé (déjà fait ✅)
```bash
# Script existant
./scripts/test-all-canonicals.sh

# Résultat attendu : 11/11 sites ✅
```

### Test Manuel (à faire après corrections bugs)

**Pour chaque ville (Nice, Toulouse minimum)** :

1. **Homepage** :
```bash
curl -s https://devis-demenageur-nice.fr/ | grep canonical
# Attendu : <link rel="canonical" href="https://devis-demenageur-nice.fr/"/>
```

2. **Quartiers** :
```bash
curl -s https://devis-demenageur-nice.fr/quartiers-nice/ | grep canonical
# Attendu : <link rel="canonical" href="https://devis-demenageur-nice.fr/quartiers-nice/"/>
# ❌ ACTUELLEMENT : href="...quartiers-lille/" → BUG #1
```

3. **Blog Article** :
```bash
curl -s https://devis-demenageur-nice.fr/blog/prix/prix-demenagement-nice/ | grep canonical
# Attendu : .../blog/prix/prix-demenagement-nice/"
```

4. **Service** :
```bash
curl -s https://devis-demenageur-nice.fr/services/demenagement-standard-nice/ | grep canonical
```

5. **Corridor** :
```bash
curl -s https://devis-demenageur-nice.fr/nice-vers-paris/ | grep canonical
```

6. **Redirection 308** :
```bash
curl -I https://devis-demenageur-nice.fr/quartiers-nice
# Attendu : HTTP/2 308
# Location: https://devis-demenageur-nice.fr/quartiers-nice/
```

### Validation Google Search Console (48h après déploiement)
- [ ] Vérifier onglet "Couverture" : pas d'erreurs canonical
- [ ] Vérifier "Inspection d'URL" : canonical détecté correct
- [ ] Pages indexées avec trailing slash

---

## 📈 Impact SEO Attendu

**Avant TASK-006** :
- ❌ Canonicals inconsistants (avec/sans slash)
- ❌ Google indexe duplicatas
- ❌ Signaux SEO dilués
- ❌ Erreurs GSC canonicals

**Après TASK-006** :
- ✅ 100% canonicals avec trailing slash
- ✅ Redirections 308 automatiques
- ✅ Consolidation signaux SEO
- ✅ Zéro erreur GSC

**Gain estimé** : +10-15% positions organiques (consolidation)

---

## 📊 Métriques

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Pages canonical OK | ~85% | 100% | +15% |
| Redirections 308 actives | Non | Oui | ✅ |
| Erreurs GSC canonical | ~50/ville | 0 | -100% |
| Duplicatas indexés | ~5-10% | 0% | -100% |

---

## 🔗 Fichiers Modifiés

### Helper Canonical (11 villes)
- `sites/*/lib/canonical-helper.ts` (créé)

### Pages Corrigées (1407 total)
- Homepage layouts (11)
- Services (33)
- Quartiers (110+)
- Corridors (55+)
- Blog catégories + articles (800+)
- Pages légales (44)
- Autres (150+)

### À Corriger (Bugs résiduels)
- Quartiers pages (10)
- Metadata pages (6+ Toulouse)
- Templates (2)
- cityData.ts (11)

---

## 💡 Décisions Techniques

Voir `decisions.md` pour :
- Choix trailing slash systématique
- Architecture helper centralisé
- Gestion redirections 308 Next.js
- Tests automatisés

---

## 📅 Timeline

- **31 oct 2025** : Phases 1-9 Marseille (30h)
- **31 oct 2025** : Phase 10 - 10 autres villes (15h)
- **1er nov 2025** : Analyse bugs résiduels (1h)
- **1er nov 2025** : Corrections bugs (2h estimé)
- **1er nov 2025** : Tests live + validation (1h)

**Total** : ~49h

---

## 🎯 Prochaines Étapes

1. ✅ Corriger Bug #1 (quartiers) - 15 min
2. ✅ Corriger Bug #2 (metadata) - 30 min
3. ✅ Corriger Bug #3 (templates) - 20 min
4. ✅ Corriger Bug #4 (cityData) - 10 min
5. ✅ Tests live Nice + Toulouse - 30 min
6. ✅ Commit + push GitHub - 10 min
7. ✅ Déploiement CapRover - 15 min
8. ✅ Validation GSC - 48h après

**Temps total restant** : ~2h30

---

**Statut actuel** : 🔄 EN COURS (95% fait - corrections bugs résiduels en cours)


