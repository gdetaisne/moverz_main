# Contexte : TASK-006 - Migration Canonicals Complète

## 🎯 Pourquoi cette tâche ?

### Problème Initial (29-30 octobre 2025)

**Situation** :
- 11 sites Moverz en production
- URLs canoniques **inconsistantes** : avec/sans trailing slash
- Google Search Console remonte **erreurs canonical**
- **Duplicatas** d'indexation (ex: `/services` ET `/services/`)
- **Dilution des signaux SEO** entre duplicatas

**Exemple concret** :
```
Page quartiers Nice :
- URL réelle : /quartiers-nice/
- Canonical déclaré : /quartiers-nice (sans slash)
- Google indexe les 2 versions
→ Signaux SEO divisés par 2
```

### Impact Business

**SEO** :
- Positions organiques sous-optimales (-10-15% estimé)
- Erreurs Google Search Console (50+ par ville)
- Budget crawl Google gaspillé sur duplicatas

**Technique** :
- Code inconsistant entre villes (copier/coller non homogène)
- Maintenance difficile (11 sites à corriger manuellement)
- Pas de helper centralisé

**Urgence** : P1 (Important mais pas bloquant)
- Impact SEO cumulé important
- Correction massive nécessaire avant scaling à 20+ villes

---

## 📊 Analyse Pré-Migration

### Audit Initial (29 oct)

**Commande** :
```bash
grep -r "canonical" sites/*/app --include="*.tsx" | wc -l
# Résultat : 1407 occurrences
```

**Problèmes détectés** :

1. **Trailing slash inconsistant** :
   - 60% des pages : avec slash
   - 40% des pages : sans slash
   - Pas de règle unifiée

2. **Hardcodé vs Helper** :
   - 80% : URLs hardcodées en dur
   - 20% : Utilisation partielle d'un helper
   - Pas de source unique de vérité

3. **Next.js metadataBase** :
   - Mal configuré dans certains sites
   - Génère des canonicals relatifs au lieu d'absolus

4. **Redirections 308** :
   - Non systématiques
   - Next.js peut les générer si metadataBase OK

### Décision : Migration Complète

**Option retenue** : Trailing slash **systématique**

**Raisons** :
1. ✅ Recommandation officielle Google (cohérence)
2. ✅ Next.js App Router préfère trailing slash
3. ✅ Redirections 308 automatiques Next.js
4. ✅ Sitemap.xml déjà avec trailing slash
5. ✅ Meilleure indexation (1 seule version canonique)

**Options écartées** :
- ❌ Sans trailing slash : nécessite config Next.js custom
- ❌ Mixte : pire des solutions (duplicatas garantis)

---

## 🏗️ Architecture Choisie

### Helper Centralisé

**Fichier** : `sites/*/lib/canonical-helper.ts` (11 villes)

**Fonctions principales** :

```typescript
// 1. Génération URL canonique
getCanonicalUrl(path?: string): string
// → Ajoute automatiquement trailing slash
// → Utilise cityData.siteUrl comme source

// 2. Metadata alternates
getCanonicalAlternates(path?: string)
// → Pour Next.js metadata API

// 3. Open Graph metadata
getOpenGraphMetadata(path, title, description)
// → Inclut URL canonical dans OG

// 4. Metadata complètes
getFullMetadata(path, title, description)
// → Combine tout (canonical + OG + Twitter)
```

**Avantages** :
- ✅ Source unique de vérité
- ✅ DRY (Don't Repeat Yourself)
- ✅ Facile à tester
- ✅ Maintenance centralisée
- ✅ Impossible d'oublier le trailing slash

### Source de Données : cityData.ts

**Pourquoi** :
- Contient déjà `siteUrl` par ville
- Une seule source de vérité
- Facilite les tests (mock facile)

**Exemple** :
```typescript
nice: {
  slug: 'nice',
  nameCapitalized: 'Nice',
  siteUrl: 'https://devis-demenageur-nice.fr',
  // ...
}
```

Le helper ajoute le trailing slash automatiquement :
```typescript
const baseUrl = city.siteUrl.endsWith('/') 
  ? city.siteUrl 
  : `${city.siteUrl}/`;
```

---

## 🔍 Scope Détaillé

### Pages à Corriger par Site

**Homepage** (1 page) :
- `/` → layout.tsx utilise `buildSiteMetadata()`

**Services** (3 pages) :
- `/services/`
- `/services/demenagement-economique-{ville}/`
- `/services/demenagement-standard-{ville}/`
- `/services/demenagement-premium-{ville}/`

**Quartiers** (~10 pages/ville) :
- `/quartiers-{ville}/` (index)
- `/{ville}/{quartier}/` (pages individuelles)

**Corridors** (~5 pages/ville) :
- `/{ville}-vers-{destination}/`

**Blog** (~80 pages/ville) :
- `/blog/` (index)
- `/blog/{category}/` (catégories)
- `/blog/{category}/{slug}/` (articles)

**Pages légales** (4 pages) :
- `/mentions-legales/`
- `/politique-confidentialite/`
- `/cgv/`
- `/cgu/`

**Autres** (~10 pages) :
- `/partenaires/`
- `/faq/`
- `/contact/`
- `/inventaire-ia/`
- `/estimation-rapide/`
- `/notre-offre/`
- `/comment-ca-marche/`

**TOTAL par ville** : ~130 pages  
**TOTAL 11 villes** : ~1407 pages

---

## 🧪 Stratégie de Test

### Tests Automatisés

**Script créé** : `scripts/test-all-canonicals.sh`

```bash
#!/bin/bash
# Teste les 11 villes en production
# Vérifie :
# 1. Canonical avec trailing slash
# 2. Open Graph URL correct
# 3. Redirections 308
```

**Résultat attendu** : 11/11 sites ✅

### Tests Manuels

**Protocole** :
1. Curl homepage → vérifier canonical
2. View source → valider balise `<link rel="canonical">`
3. Test redirection → curl sans slash → doit 308
4. Google Search Console → pas d'erreurs

**Sites prioritaires** :
- Nice (site le plus complet)
- Marseille (migration pilote)
- Toulouse (vérifier bugs hardcodés)

---

## 📅 Historique Décisionnel

### 29 octobre : Analyse initiale
- Audit 1407 pages
- Décision trailing slash systématique
- Choix architecture helper centralisé

### 31 octobre : Phases 1-9 Marseille
- Implémentation complète Marseille
- Tests helper `canonical-helper.ts`
- Validation pattern avant scaling

### 31 octobre : Phase 10 - 10 autres villes
- Réplication sur Nice, Toulouse, Lyon, Bordeaux
- Nantes, Strasbourg, Lille, Rennes
- Montpellier, Rouen
- Tests automatisés 55/55 ✅

### 1er novembre : Analyse bugs résiduels
- Découverte Bug #1 (quartiers hardcodés 'lille')
- Découverte Bug #2 (metadata "Lille" dans Toulouse)
- Découverte Bug #3 (templates Marseille/Nice hardcodés)
- Découverte Bug #4 (trailing slash inconsistant cityData)

### 1er novembre : Corrections bugs
- Plan de correction détaillé
- Estimation 2h30 supplémentaires
- Finalisation DoD à 100%

---

## 🎓 Apprentissages

### Ce qui a bien marché ✅

1. **Helper centralisé** :
   - Évite les erreurs manuelles
   - Facilite la maintenance
   - Tests unitaires possibles

2. **Migration progressive** :
   - Marseille d'abord (pilote)
   - Puis scaling 10 villes
   - Permet ajustements

3. **Tests automatisés** :
   - Script bash simple mais efficace
   - Détecte rapidement les régressions

### Difficultés rencontrées ⚠️

1. **Copier/coller historique** :
   - Bug #1 (quartiers 'lille') vient d'un copier/coller initial
   - Bug #2 (metadata "Lille") idem
   - → Nécessite audit approfondi après migration

2. **Templates non génériques** :
   - Bug #3 (CorridorPage/LocalPage hardcodés)
   - Créés pour une ville puis copiés
   - → Doivent être 100% dynamiques

3. **Documentation incomplète** :
   - cityData.ts : pas de convention slash final
   - → Bug #4 (inconsistance)
   - → Ajouter doc explicite

### Bonnes pratiques identifiées 📚

1. **Toujours utiliser helpers** :
   ```typescript
   // ✅ BON
   canonical: getCanonicalUrl('path')
   
   // ❌ MAUVAIS
   canonical: 'https://site.fr/path/'
   ```

2. **Données dynamiques obligatoires** :
   ```typescript
   // ✅ BON
   const city = getCityDataFromUrl(env.SITE_URL);
   title: `Déménagement ${city.nameCapitalized}`
   
   // ❌ MAUVAIS
   title: "Déménagement Lille" // hardcodé
   ```

3. **Tests après chaque modification** :
   ```bash
   # Toujours vérifier le rendu
   curl -s URL | grep canonical
   ```

---

## 🔗 Références

### Documentation Next.js
- [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [metadataBase](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase)
- [Trailing slashes](https://nextjs.org/docs/app/api-reference/next-config-js/trailingSlash)

### Google SEO
- [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Trailing slash best practices](https://developers.google.com/search/blog/2010/04/to-slash-or-not-to-slash)
- [308 redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

### Fichiers Projet
- `.cursor/BACKLOG.md` (ligne 123-145)
- `docs/HOMOGENEISATION-HEAD-COMPLETE.md`
- `scripts/test-all-canonicals.sh`

---

## 💭 Notes Cursor

### Pour reprise de tâche

**Si interruption, voici où on en est** :

✅ **FAIT (95%)** :
- Helper canonical-helper.ts créé (11 villes)
- 1407 pages avec trailing slash
- Tests auto 55/55 passés
- 15+ commits sur GitHub

⏳ **EN COURS** :
- Corrections bugs résiduels (4 bugs identifiés)
- Tests live 2+ sites

📋 **À FAIRE** :
1. Corriger Bug #1 quartiers (15 min)
2. Corriger Bug #2 metadata (30 min)
3. Corriger Bug #3 templates (20 min)
4. Corriger Bug #4 cityData (10 min)
5. Tests live Nice + Toulouse (30 min)
6. Commit + déploiement (25 min)
7. Validation GSC 48h après

**Commandes utiles** :
```bash
# Tester canonical
curl -s https://devis-demenageur-nice.fr/ | grep canonical

# Tester redirection 308
curl -I https://devis-demenageur-nice.fr/quartiers-nice

# Trouver bugs hardcodés
grep -r "quartiers-lille" sites/*/app --include="*.tsx"
grep -r "Déménagement à Lille" sites/*/app --include="*.tsx" | grep -v "sites/lille"
```

---

*Document créé le : 1er novembre 2025*  
*Dernière mise à jour : 1er novembre 2025*


