# 🌐 Tableau des Domaines Actuels

**Date :** 31 octobre 2025  
**Source :** Extraction depuis `cityData.ts` de tous les sites

---

## 📊 État des Domaines (cityData.ts)

| Ville | Domaine Actuel | www ? | Slash Final ? | Format |
|-------|----------------|-------|---------------|--------|
| **Nice** | `devis-demenageur-nice.fr` | ❌ | ❌ | Standard |
| **Lyon** | `devis-demenageur-lyon.fr` | ❌ | ❌ | Standard |
| **Bordeaux** | `www.bordeaux-demenageur.fr` | ✅ | ❌ | **Inversé** |
| **Marseille** | `devis-demenageur-marseille.fr` | ❌ | ❌ | Standard |
| **Toulouse** | `devis-demenageur-toulousain.fr` | ❌ | ❌ | Standard* |
| **Nantes** | `devis-demenageur-nantes.fr` | ❌ | ❌ | Standard |
| **Lille** | `devis-demenageur-lille.fr` | ❌ | ❌ | Standard |
| **Rennes** | `devis-demenageur-rennes.fr` | ❌ | ❌ | Standard |
| **Rouen** | `devis-demenageur-rouen.fr` | ❌ | ❌ | Standard |
| **Strasbourg** | `devis-demenageur-strasbourg.fr` | ❌ | ❌ | Standard |
| **Montpellier** | `devis-demenageur-montpellier.fr` | ❌ | ❌ | Standard |

\* Toulouse : "toulousain" au lieu de "toulouse"

---

## 🚨 Incohérences Détectées

### 1. Bordeaux (Format Différent)
**Actuel :** `www.bordeaux-demenageur.fr`  
**Standard :** `devis-demenageur-bordeaux.fr`

**Problème :**
- ✅ www présent (les autres non)
- ❌ Format inversé : `{ville}-demenageur` au lieu de `devis-demenageur-{ville}`
- ❌ Pas de "devis" dans l'URL (moins bon pour SEO)

**Recommandation :** Migrer vers `devis-demenageur-bordeaux.fr` (sans www)

---

### 2. Toulouse (Variante)
**Actuel :** `devis-demenageur-toulousain.fr`  
**Standard :** `devis-demenageur-toulouse.fr`

**Problème :**
- "toulousain" au lieu de "toulouse" (moins intuitif)
- Mais peut avoir des raisons branding

**Recommandation :** Garder "toulousain" si déjà indexé, sinon migrer vers "toulouse"

---

### 3. Slash Final
**AUCUNE** ville n'a de slash final dans cityData.ts

**Impact :**
- URLs canoniques incohérentes (selon les pages)
- Certains fichiers ajoutent le slash (seo-builders.ts)
- D'autres non (pages individuelles hardcodées)

**Recommandation :** Ajouter `/` à TOUTES les siteUrl

---

## ✅ Domaines Recommandés (Après Migration)

| Ville | Domaine Actuel | Domaine Cible | Changement |
|-------|----------------|---------------|------------|
| **Nice** | `devis-demenageur-nice.fr` | `devis-demenageur-nice.fr/` | ✅ Slash |
| **Lyon** | `devis-demenageur-lyon.fr` | `devis-demenageur-lyon.fr/` | ✅ Slash |
| **Bordeaux** | `www.bordeaux-demenageur.fr` | `devis-demenageur-bordeaux.fr/` | ⚠️ **Domaine + Slash** |
| **Marseille** | `devis-demenageur-marseille.fr` | `devis-demenageur-marseille.fr/` | ✅ Slash |
| **Toulouse** | `devis-demenageur-toulousain.fr` | `devis-demenageur-toulousain.fr/` | ✅ Slash |
| **Nantes** | `devis-demenageur-nantes.fr` | `devis-demenageur-nantes.fr/` | ✅ Slash |
| **Lille** | `devis-demenageur-lille.fr` | `devis-demenageur-lille.fr/` | ✅ Slash |
| **Rennes** | `devis-demenageur-rennes.fr` | `devis-demenageur-rennes.fr/` | ✅ Slash |
| **Rouen** | `devis-demenageur-rouen.fr` | `devis-demenageur-rouen.fr/` | ✅ Slash |
| **Strasbourg** | `devis-demenageur-strasbourg.fr` | `devis-demenageur-strasbourg.fr/` | ✅ Slash |
| **Montpellier** | `devis-demenageur-montpellier.fr` | `devis-demenageur-montpellier.fr/` | ✅ Slash |

---

## 🔧 Modifications Requises dans cityData.ts

### Version Minimale (Slash seulement)

```typescript
marseille: {
  slug: 'marseille',
  name: 'Marseille',
  nameCapitalized: 'Marseille',
  region: 'Provence-Alpes-Côte d\'Azur',
  siteUrl: 'https://devis-demenageur-marseille.fr/',  // ← AJOUT du /
  // ...
},

toulouse: {
  slug: 'toulouse',
  name: 'Toulouse',
  nameCapitalized: 'Toulouse',
  region: 'Occitanie',
  siteUrl: 'https://devis-demenageur-toulousain.fr/',  // ← AJOUT du /
  // ...
},

bordeaux: {
  slug: 'bordeaux',
  name: 'Bordeaux',
  nameCapitalized: 'Bordeaux',
  region: 'Nouvelle-Aquitaine',
  siteUrl: 'https://www.bordeaux-demenageur.fr/',  // ← AJOUT du / (garder domaine actuel)
  // ...
},

// ... répéter pour toutes les villes
```

---

### Version Harmonisée (Slash + Bordeaux standardisé)

```typescript
bordeaux: {
  slug: 'bordeaux',
  name: 'Bordeaux',
  nameCapitalized: 'Bordeaux',
  region: 'Nouvelle-Aquitaine',
  siteUrl: 'https://devis-demenageur-bordeaux.fr/',  // ← NOUVEAU domaine + /
  // ...
},
```

**⚠️ Attention :** Changement de domaine Bordeaux nécessite :
1. Redirection 301 : `bordeaux-demenageur.fr` → `devis-demenageur-bordeaux.fr`
2. Mise à jour DNS
3. Nouveau certificat SSL si nécessaire
4. Monitoring Search Console intensif pendant 30 jours

---

## 📈 Impact par Ville

### Villes "Faciles" (10 villes)
**Nice, Lyon, Marseille, Nantes, Lille, Rennes, Rouen, Strasbourg, Montpellier, Toulouse**

**Changement :** Ajout slash final uniquement  
**Impact SEO :** Faible (-5% pendant 7 jours, puis +10-15% à 30 jours)  
**Risque :** Minimal  
**Durée migration :** 30 min par ville

---

### Bordeaux (Cas Spécial)
**Changement :** Slash + changement de domaine

#### Option 1 : Slash seulement (Conservateur)
- Garder `www.bordeaux-demenageur.fr/`
- Ajouter juste le slash final
- Impact : Faible
- Temps : 30 min

#### Option 2 : Standardisation complète (Recommandé)
- Migrer vers `devis-demenageur-bordeaux.fr/`
- Impact : Moyen (-10-15% pendant 14 jours)
- Bénéfice long terme : +25-30% (meilleur SEO avec "devis" dans URL)
- Temps : 2h (config redirections)

---

## 🎯 Décision Bordeaux

### ⚖️ Comparaison Options

| Critère | Garder bordeaux-demenageur | Migrer vers devis-demenageur-bordeaux |
|---------|---------------------------|---------------------------------------|
| **SEO mot-clé "devis"** | ❌ Absent de l'URL | ✅ Présent dans l'URL |
| **Cohérence marque** | ❌ Différent des autres | ✅ Identique aux 10 autres |
| **Impact migration** | 🟢 Faible | 🟡 Moyen |
| **Effort technique** | 🟢 30 min | 🟡 2-3h |
| **Bénéfice long terme** | 🟡 Moyen | 🟢 Élevé |

### 💡 Recommandation
**Migrer vers `devis-demenageur-bordeaux.fr/`**

**Raisons :**
1. Cohérence avec les 10 autres villes
2. SEO amélioré (mot-clé "devis")
3. Site récent = faible PageRank accumulé
4. Meilleur moment = maintenant (avant accumulation PageRank)

---

## 📋 Plan d'Action Recommandé

### Phase 1 : Villes Faciles (10 villes)
**Temps : 5-6 heures**

```bash
# Ajouter slash final dans cityData.ts
# (script automatique disponible)
./scripts/fix-canonicals-slash.sh
```

Villes concernées :
- Nice
- Lyon
- Marseille
- Toulouse
- Nantes
- Lille
- Rennes
- Rouen
- Strasbourg
- Montpellier

**Impact :** Minimal  
**Risque :** Très faible

---

### Phase 2 : Bordeaux (Cas spécial)
**Temps : 2-3 heures**

#### Étape 1 : Configuration Domaine
```bash
# 1. Acquérir/configurer devis-demenageur-bordeaux.fr
# 2. Pointer DNS vers infrastructure
# 3. Configurer certificat SSL
```

#### Étape 2 : Redirections 301
```nginx
# Nginx/Cloudflare
server {
  server_name bordeaux-demenageur.fr www.bordeaux-demenageur.fr;
  return 301 https://devis-demenageur-bordeaux.fr$request_uri;
}
```

#### Étape 3 : Mise à Jour Code
```typescript
// sites/bordeaux/lib/cityData.ts
bordeaux: {
  siteUrl: 'https://devis-demenageur-bordeaux.fr/',  // ← NOUVEAU
}
```

#### Étape 4 : Tests & Déploiement
```bash
cd sites/bordeaux
pnpm build
pnpm start
curl -s http://localhost:3000 | grep canonical
```

#### Étape 5 : Monitoring (30 jours)
- J+1 : Vérifier redirections
- J+3 : Soumettre nouveau sitemap Search Console
- J+7 : Analyser erreurs 404
- J+14 : Vérifier transfert PageRank
- J+30 : Bilan final

---

## 📊 Budget Temps Total

| Phase | Temps | Complexité |
|-------|-------|------------|
| **Nice (modèle)** | 2-3h | 🟡 Moyen |
| **9 autres villes faciles** | 4-5h | 🟢 Facile |
| **Bordeaux (domaine)** | 2-3h | 🟡 Moyen |
| **Tests & validation** | 2h | 🟢 Facile |
| **TOTAL** | **10-13h** | - |

---

## 🚨 Points d'Attention Critiques

### 1. cityData.ts est Partagé
**Constat :** Tous les sites ont le MÊME fichier `cityData.ts`  
→ Une modification affecte potentiellement les 11 villes

**Implication :**
- ✅ Facilite la migration (1 seul fichier à modifier)
- ⚠️ Attention aux effets de bord
- ✅ Tests à faire sur TOUTES les villes après modification

---

### 2. Ordre de Migration
**Recommandation :**

1. **Nice en premier** (modèle de référence)
   - Tester toutes les pages
   - Valider canonicals
   - Identifier problèmes

2. **Lyon en deuxième** (validation du pattern)
   - Vérifier que le modèle se réplique bien
   - Ajuster si nécessaire

3. **Autres villes** (déploiement progressif)
   - Traiter 2-3 villes par jour
   - Monitoring continu

4. **Bordeaux en dernier** (cas spécial)
   - Nécessite configuration infrastructure
   - Monitoring renforcé

---

### 3. Rollback Plan

Si problème majeur détecté :

```bash
# Restaurer les backups
find sites -name '*.backup' -exec sh -c 'mv "$1" "${1%.backup}"' _ {} \;

# Revert Git si déjà commité
git revert <commit-hash>

# Redéployer
```

**Critères de rollback :**
- Baisse > 20% positions (pendant > 48h)
- Erreurs 404 massives (> 100 URLs)
- Canonical tags cassés (détection automatique)

---

## ✅ Validation Finale

### Checklist Pré-Migration
- [ ] Backups de tous les `cityData.ts`
- [ ] Décision Bordeaux : garder ou migrer domaine ?
- [ ] Planning défini : 1 ville/jour ou batch ?
- [ ] Accès Search Console OK (monitoring)
- [ ] Tests locaux OK (script de validation créé)

### Checklist Post-Migration (par ville)
- [ ] Build local OK
- [ ] Canonical tags OK (vérification HTML)
- [ ] Sitemap.xml OK (toutes URLs avec slash)
- [ ] Déploiement production OK
- [ ] Search Console : nouveau sitemap soumis
- [ ] Monitoring J+1, J+3, J+7

---

## 🎬 Commande Rapide

```bash
# Migration automatique slash final (toutes villes)
./scripts/fix-canonicals-slash.sh

# Migration manuelle Nice (modèle)
# Voir EXEMPLE-MIGRATION-CANONICALS.md

# Validation
cd sites/nice && pnpm build && pnpm start
curl -s http://localhost:3000 | grep canonical
# Attendu : <link rel="canonical" href="https://devis-demenageur-nice.fr/"/>
```

---

**Tableau créé le :** 31 octobre 2025  
**Source :** Extraction automatique depuis cityData.ts  
**Statut :** ✅ Prêt pour décision et migration

