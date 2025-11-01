# Tests : TASK-002 - Migration Canonicals

## Tests documentation (complétés)

### Revue documentation

**Date** : 31 octobre 2025

**Fichiers créés** :
- ✅ ANALYSE-CANONICALS-COMPLETE.md (analyse technique détaillée)
- ✅ RESUME-CANONICALS.md (résumé exécutif)
- ✅ EXEMPLE-MIGRATION-CANONICALS.md (guide pratique)
- ✅ DECISION-CANONICALS.md (décisions)
- ✅ EFFETS-BORD-CANONICALS.md (impacts)
- ✅ TABLEAU-DOMAINES-ACTUELS.md (état lieux)

**Résultat** : ✅ Documentation complète et cohérente

---

## Tests implémentation (à faire)

### Tests locaux (par ville)

Après migration de chaque ville, vérifier :

#### 1. Build réussi
```bash
cd sites/nice
pnpm build
# Résultat attendu : 0 erreurs
```

#### 2. Canonicals homepage
```bash
curl -s http://localhost:3000 | grep canonical
# Résultat attendu : <link rel="canonical" href="https://devis-demenageur-nice.fr/" />
```

#### 3. Canonicals blog
```bash
curl -s http://localhost:3000/blog | grep canonical
# Résultat attendu : <link rel="canonical" href="https://devis-demenageur-nice.fr/blog/" />
```

#### 4. Canonicals articles
```bash
curl -s http://localhost:3000/blog/satellites/prix-garde-meuble-nice-2025 | grep canonical
# Résultat attendu : <link rel="canonical" href="https://devis-demenageur-nice.fr/blog/satellites/prix-garde-meuble-nice-2025/" />
```

#### 5. Canonicals pages statiques
```bash
curl -s http://localhost:3000/partenaires | grep canonical
curl -s http://localhost:3000/comment-ca-marche | grep canonical
# Résultat attendu : slash final partout
```

---

### Tests production (après déploiement)

#### Site Nice (exemple)

**Tests canonicals** :
```bash
curl -sI https://devis-demenageur-nice.fr/ | grep -i location
curl -s https://devis-demenageur-nice.fr/ | grep canonical

curl -s https://devis-demenageur-nice.fr/blog/ | grep canonical
curl -s https://devis-demenageur-nice.fr/partenaires/ | grep canonical
```

**Résultats attendus** :
- ✅ Slash final partout
- ✅ Domaine unique (devis-demenageur-nice.fr)
- ✅ Pas de www (sauf si décidé autrement)
- ✅ HTTPS

---

### Tests SEO (Search Console)

#### Immédiat (J+1)

- [ ] Soumettre nouveau sitemap
- [ ] Vérifier crawl Google (augmentation attendue)
- [ ] Surveiller erreurs indexation

**Résultats attendus** :
- Crawl +20-30% (normal, Google re-indexe)
- Quelques erreurs temporaires (acceptable)

#### Court terme (J+1-7)

- [ ] Suivre positions quotidiennes
- [ ] Vérifier pages indexées
- [ ] Surveiller erreurs canonicals

**Résultats attendus** :
- ⚠️ Baisse -5% positions (temporaire, normal)
- Pages ré-indexées progressivement
- Erreurs canonicals disparaissent

#### Moyen terme (J+7-30)

- [ ] Comparer positions avant/après
- [ ] Vérifier consolidation PageRank
- [ ] Analyser trafic organique

**Résultats attendus** :
- Retour baseline J+14
- Début amélioration J+21
- +10-15% positions J+30

#### Long terme (J+30+)

- [ ] Mesurer impact total
- [ ] Documenter résultats
- [ ] ROI validation

**Résultats attendus** :
- +15-20% positions
- PageRank consolidé
- Architecture propre validée

---

## Tests régression

### Après migration, vérifier que rien n'est cassé :

- [ ] **Homepage** : Affichage OK
- [ ] **Blog** : Liste articles OK
- [ ] **Articles** : Affichage OK
- [ ] **Partenaires** : Page OK
- [ ] **Comment ça marche** : Page OK
- [ ] **Corridors** : Liens OK
- [ ] **Formulaire** : Fonctionne
- [ ] **Navigation** : Tous liens OK

---

## Tests automatisés (à créer)

### Script validation canonicals

```javascript
// scripts/validate-canonicals.js
const cities = ['nice', 'marseille', /* ... */];

for (const city of cities) {
  const siteUrl = getCityData(city).siteUrl;
  
  // Vérifier slash final
  if (!siteUrl.endsWith('/')) {
    console.error(`❌ ${city}: siteUrl sans slash final`);
  }
  
  // Vérifier domaine cohérent
  const pages = ['/', '/blog/', '/partenaires/'];
  for (const page of pages) {
    const canonical = getCanonical(city, page);
    if (!canonical.startsWith(siteUrl)) {
      console.error(`❌ ${city}${page}: canonical incohérent`);
    }
  }
}
```

---

## Checklist tests par ville

Pour chaque ville migrée :

- [ ] Build local OK
- [ ] Canonicals homepage OK (slash final)
- [ ] Canonicals blog OK
- [ ] Canonicals 3-5 articles OK
- [ ] Canonicals pages statiques OK
- [ ] Aucune régression fonctionnelle
- [ ] Déployé en production
- [ ] Tests production OK
- [ ] Sitemap soumis Search Console
- [ ] Monitoring activé

---

## ✅ Validation finale (toutes villes)

### Critères d'acceptation

- [ ] **11 villes migrées** : 11/11
  - [ ] Nice (modèle)
  - [ ] 10 autres villes

- [ ] **Qualité technique** :
  - [ ] Helper centralisé créé
  - [ ] 0 URLs hardcodées restantes
  - [ ] Slash final 100% cohérent
  - [ ] Domaine unique par ville

- [ ] **Tests** :
  - [ ] 2+ villes testées en détail
  - [ ] Monitoring Search Console 7 jours
  - [ ] Aucune régression critique

- [ ] **Déploiement** :
  - [ ] Commits sur GitHub main
  - [ ] 11 sites déployés
  - [ ] Sitemaps soumis
  - [ ] Backups conservés

**Statut actuel** : ⏳ Aucun test effectué (implémentation pas commencée)

---

## 📊 Résultats attendus

### Métriques Success

| Métrique | Avant | Après (J+30) | Cible |
|----------|-------|--------------|-------|
| Canonicals cohérents | 40% | 100% | ✅ 100% |
| Domaines uniques | Non | Oui | ✅ Oui |
| Slash final | 50% | 100% | ✅ 100% |
| Positions SEO | Baseline | +15-20% | ✅ +15%+ |
| PageRank | Dilué | Consolidé | ✅ Consolidé |
| Maintenance | 50 fichiers | 1 helper | ✅ 1 fichier |

### Timeline validation

```
J+0   : Migration + déploiement
J+1   : Soumission sitemaps
J+1-7 : Baisse -5% (attendu)
J+7   : Stabilisation
J+14  : Retour baseline
J+21  : Début amélioration
J+30  : Validation ROI (+15-20%)
```

