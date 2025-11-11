# Tests - TASK-026 : Blog Structure Optimale

**Date création** : 03 novembre 2025

---

## 📋 PLAN DE TESTS

### Phase 1 : Tests Techniques

#### Build Local
```bash
cd sites/montpellier
npm run build
```

**Attendu** :
- ✅ 0 erreur TypeScript
- ✅ 0 erreur Next.js
- ✅ Routes générées : `/blog/{category}/` et `/blog/{category}/{slug}/`

---

#### URLs Générées

Vérifier format URLs :

```bash
npm run start
# Tester manuellement chaque URL
```

**URLs à valider** :

| Catégorie | URL attendue | Longueur | Status |
|-----------|--------------|----------|--------|
| `demenageur` | `/blog/demenageur/demenageur-montpellier-expert/` | 52 chars | ⏳ |
| `pas-cher` | `/blog/pas-cher/demenagement-pas-cher-montpellier-guide/` | 56 chars | ⏳ |
| `garde-meuble` | `/blog/garde-meuble/garde-meuble-montpellier-guide/` | 54 chars | ⏳ |
| `prix` | `/blog/prix/prix-demenagement-montpellier-guide/` | 49 chars | ⏳ |
| `entreprise` | `/blog/entreprise/demenagement-entreprise-montpellier-guide/` | 62 chars | ⏳ |
| `international` | `/blog/international/demenagement-international-montpellier-guide/` | 67 chars | ⚠️ |

**Critère** : Toutes URLs < 60 caractères (sauf exceptions justifiées)

---

#### Liens Internes

Vérifier tous les liens internes pointent vers bonnes URLs :

```bash
cd sites/montpellier/content/blog
grep -r "\](/blog/" . | grep -v "^Binary"
```

**Format attendu** :
```markdown
✅ [guide](/blog/demenageur/demenageur-montpellier-expert)
✅ [prix](/blog/prix/prix-demenagement-montpellier-guide)

❌ [guide](/blog/demenageur-montpellier/demenageur-montpellier-expert)
❌ [prix](/blog/demenagement-montpellier/prix)
```

**Test manuel** :
- [ ] Cliquer chaque lien interne
- [ ] Vérifier 0 page 404
- [ ] Vérifier navigation fluide

---

#### Canonical URLs

Vérifier chaque page a canonical correct :

```bash
curl -s http://localhost:3000/blog/demenageur/demenageur-montpellier-expert | grep canonical
```

**Attendu** :
```html
<link rel="canonical" href="https://montpellier.moverz.fr/blog/demenageur/demenageur-montpellier-expert/" />
```

**Critères** :
- ✅ HTTPS (pas HTTP)
- ✅ Trailing slash (/)
- ✅ Domaine correct
- ✅ Path correct

---

#### Metadata

Vérifier metadata complète sur chaque page :

**Title** :
```html
<title>Déménageur Montpellier : Devis Gratuit | Service Expert 2025</title>
```

**Meta Description** :
```html
<meta name="description" content="Déménageur professionnel à Montpellier. Devis gratuit en 2 min..." />
```

**Open Graph** :
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://montpellier.moverz.fr/blog/..." />
<meta property="og:type" content="article" />
```

---

### Phase 2 : Tests SEO

#### Longueur URLs

```bash
# Script validation
cd sites/montpellier
node -e "
const urls = [
  '/blog/demenageur/demenageur-montpellier-expert/',
  '/blog/pas-cher/demenagement-pas-cher-montpellier-guide/',
  // ... toutes URLs
];

urls.forEach(url => {
  const len = url.length;
  const status = len <= 60 ? '✅' : '⚠️';
  console.log(\`\${status} \${len} chars: \${url}\`);
});
"
```

**Critère** : >80% URLs < 60 caractères

---

#### Silos Thématiques

Vérifier structure en silos :

```
/blog/demenageur/
├── demenageur-montpellier-expert.md (pilier)
├── prix-demenageur-montpellier-2025.md (satellite)
└── comparatif-demenageurs-montpellier.md (satellite)
→ Tous liens internes pointent vers même catégorie
```

**Test** :
- [ ] Chaque catégorie a 1 pilier minimum
- [ ] Chaque pilier a 2+ satellites
- [ ] Maillage interne cohérent (pilier ↔ satellites)

---

#### Mots-clés dans Slugs

Vérifier mots-clés principaux présents dans slugs :

| Mot-clé cible | Slug | Présent ? |
|---------------|------|-----------|
| "déménageur montpellier" | `demenageur-montpellier-expert` | ✅ |
| "déménagement pas cher montpellier" | `demenagement-pas-cher-montpellier-guide` | ✅ |
| "garde meuble montpellier" | `garde-meuble-montpellier-guide` | ✅ |
| "prix déménagement montpellier" | `prix-demenagement-montpellier-guide` | ✅ |

---

#### Richesse Contenu

Vérifier contenu guides piliers :

| Guide | Mots | H2/H3 | Images | Liens internes | Status |
|-------|------|-------|--------|----------------|--------|
| demenageur-montpellier-expert | >2000 | >8 | >3 | >5 | ⏳ |
| demenagement-pas-cher-montpellier-guide | >2000 | >8 | >3 | >5 | ⏳ |
| garde-meuble-montpellier-guide | >1800 | >6 | >2 | >4 | ⏳ |

**Critères** :
- ✅ Piliers : >2000 mots
- ✅ Satellites : >800 mots
- ✅ Structuration : H2/H3 réguliers
- ✅ Maillage interne : >5 liens/article

---

### Phase 3 : Tests Production

#### Déploiement CapRover

```bash
cd sites/montpellier
git add .
git commit -m "feat: blog structure optimale"
git push origin main

# CapRover auto-deploy
# Attendre 2-3 minutes
```

**Vérifier** :
- ✅ Deploy success (CapRover logs)
- ✅ Site accessible https://montpellier.moverz.fr
- ✅ Blog accessible https://montpellier.moverz.fr/blog

---

#### URLs Live

Tester toutes URLs en production :

```bash
curl -I https://montpellier.moverz.fr/blog/demenageur/demenageur-montpellier-expert/
```

**Attendu** :
```
HTTP/2 200 
content-type: text/html
```

**Test toutes URLs principales** :
- [ ] /blog/demenageur/... → 200
- [ ] /blog/pas-cher/... → 200
- [ ] /blog/garde-meuble/... → 200
- [ ] /blog/prix/... → 200
- [ ] /blog/entreprise/... → 200
- [ ] /blog/international/... → 200

---

#### Sitemap.xml

Vérifier toutes URLs dans sitemap :

```bash
curl https://montpellier.moverz.fr/sitemap.xml | grep -c "<url>"
```

**Attendu** : ~20-30 URLs (6 piliers + 10-15 satellites + pages site)

**Vérifier format** :
```xml
<url>
  <loc>https://montpellier.moverz.fr/blog/demenageur/demenageur-montpellier-expert/</loc>
  <lastmod>2025-11-04</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

---

#### Google Search Console

**Soumettre sitemap** :
1. Aller sur Search Console
2. Ajouter propriété `montpellier.moverz.fr`
3. Soumettre sitemap : `https://montpellier.moverz.fr/sitemap.xml`
4. Attendre indexation (2-7 jours)

**Vérifier après 7 jours** :
- [ ] Pages indexées : >15
- [ ] 0 erreur crawl
- [ ] Couverture : "Valide"

---

### Phase 4 : Tests Comparatifs (3-6 mois)

#### Analytics Montpellier vs Bordeaux

**Métriques à comparer** :

| Métrique | Montpellier (optimal) | Bordeaux (actuel) | Δ |
|----------|----------------------|-------------------|---|
| Visites/mois | ? | 400-600 | ? |
| Pages/session | ? | 2.1 | ? |
| Taux rebond | ? | 68% | ? |
| Durée session | ? | 1m45s | ? |
| Conversions | ? | 50-80 | ? |

**Tracking** :
- Google Analytics
- Search Console
- Hotjar (heatmaps)

---

#### Positions Google

Suivre positions mots-clés :

| Mot-clé | Montpellier | Bordeaux | Δ |
|---------|-------------|----------|---|
| "déménageur {ville}" | ? | Position 18 | ? |
| "déménagement pas cher {ville}" | ? | Position 15 | ? |
| "garde meuble {ville}" | ? | Position 22 | ? |
| "prix déménagement {ville}" | ? | Position 19 | ? |

**Outils** :
- Ahrefs (tracking positions)
- SEMrush (suivi concurrence)
- Google Search Console (impressions/clics)

---

## ✅ CHECKLIST FINALE

### Avant Déploiement

- [ ] Build local sans erreur
- [ ] Toutes URLs < 60 caractères
- [ ] 0 lien interne cassé
- [ ] Canonical URLs corrects
- [ ] Metadata complète
- [ ] Contenu guides piliers >2000 mots
- [ ] Maillage interne >5 liens/article

### Post-Déploiement

- [ ] Site live accessible
- [ ] Toutes URLs 200 OK
- [ ] Sitemap.xml généré
- [ ] Search Console soumis
- [ ] Analytics configuré
- [ ] Tracking positions activé

### Validation Succès (6 mois)

- [ ] Montpellier trafic > Bordeaux +50%
- [ ] Positions moyennes < 15 (page 1-2)
- [ ] Conversions > Bordeaux +40%
- [ ] 0 erreur Search Console
- [ ] Recommandation : Migrer anciennes villes

---

**Date tests** : (à venir)  
**Responsable** : Guillaume  
**Durée estimée** : 2-3h tests complets



