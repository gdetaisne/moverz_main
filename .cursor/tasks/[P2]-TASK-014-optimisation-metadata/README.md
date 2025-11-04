# TASK-014 : Optimisation Métadonnées SEO - 11 villes

**Type** : SEO / Optimization  
**Priorité** : P1 (élevée suite fusion TASK-030)  
**Temps estimé** : ~4h + 8-10h extension = 12-14h total  
**Temps déjà fait** : ~5h30 (Phase 1: 1h30 + Tier 1: 1h ✅)  
**Temps restant** : 3-4h (Tier 2: 2-3h + Tier 3: 1h)  
**Assigné à** : Guillaume (technique) + Lucie (contenu)  
**Démarrée le** : 30-31 octobre 2025  
**Mise à jour** : 04/11/2025 (fusion TASK-030)  
**Statut** : 🔄 EN COURS (Phase 1: 100% ✅, Tier 1: 100% ✅, Tier 2: 0%)

---

## 🎯 Objectif

Optimisation complète métadonnées SEO pour améliorer CTR et positionnement Google : titles, descriptions, metadata dynamiques, metadataBase.

---

## ✅ Changements Apportés (80%)

### Metadata dynamiques
- Services + Contact (11 villes)
- Bug Lille hardcodé corrigé
- metadataBase trailing slash

### Titles optimisés
- 54 chars max (retrait 'en' devant '7j')
- Optimize titles 11 cities (SEO)

### Canonical URL
- Trailing slash GSC compliance
- Fix metadataBase seo-builders.ts

### Commits GitHub
- [x] #c43c0391 : Metadata dynamiques services + contact (11 villes)
- [x] #db77cd26 : Fix seo-builders.ts metadataBase (Marseille)
- [x] #34c00cb2 : Title optimisé 54 chars
- [x] #bc3a95ba : Optimize titles 11 cities
- [x] #59b965f1 : Canonical URL trailing slash GSC

---

## 📋 Ce qui Reste (20% technique + Extension longueur descriptions)

### Phase 1 : Finaliser Fixes Techniques (45min-1h)

- [ ] Vérifier metadata correctes sur 2+ villes
- [ ] Tester Google SERP preview (titles)
- [ ] Valider metadataBase OK
- [ ] Corriger doublons "Ville Ville" dans titles (LocalPage.tsx)
- [ ] Corriger "lille" hardcodé dans contact pages

### Phase 2 : Extension - Optimisation Longueur Descriptions (8-10h)

**Contexte** : Checklist SEO révèle que toutes les villes ont des meta descriptions trop courtes.

**État actuel** :
- Longueur moyenne : 60-140 caractères
- Optimal SEO : 150-160 caractères
- Impact : CTR faible dans SERP

**Actions** :
- [ ] Auditer toutes meta descriptions par ville (homepage, services, corridors, FAQ, etc.)
- [ ] Réécrire pour 150-160 caractères optimal
- [ ] Intégrer mots-clés naturellement
- [ ] Maintenir appel à l'action clair
- [ ] Sync 11 villes
- [ ] Tester Rich Results
- [ ] Mesurer CTR avant/après (GSC dans 2 semaines)

**Pages à optimiser par ville** :
- Homepage (1)
- Services (3 : économique, standard, premium)
- Corridors principaux (10+)
- FAQ, contact, partenaires (3)
- Pages secondaires (5+)
- **Total** : 20-25 pages/ville × 11 villes = 220-275 descriptions

**Exemple actuel vs optimisé** :
```
❌ Actuel (138 chars) :
"Cahier des charges précis en quelques clics → 5 devis comparables en 7j. 100% en ligne. Sélection minucieuse. Service 100% gratuit"

✅ Optimisé (158 chars) :
"Préparez votre déménagement à Nice en 30 minutes. Envoyez vos photos, recevez 5 devis fiables sous 7 jours sans appels ni formulaires. L'IA s'occupe de tout."
```

**Règles d'écriture** :
- Longueur : 150-160 caractères
- Structure : Bénéfice (30-40) + Détails (60-80) + CTA (30-40)
- Ville dynamique (cityData)
- Call-to-action clair

**Templates par type de page** :
```typescript
// Homepage
`Préparez votre déménagement à ${city.nameCapitalized} en 30 minutes. Envoyez vos photos, recevez 5 devis fiables sous 7 jours sans appels ni formulaires. L'IA s'occupe de tout.`

// Services
`Déménagement ${type} à ${city.nameCapitalized} : devis précis en 48h, déménageurs vérifiés, transparent. Envoyez vos photos, l'IA calcule tout. Sans appels, 100% digital.`

// Corridors
`Déménager de ${cityA} vers ${cityB} : 5 devis gratuits sous 7 jours, déménageurs fiables. Envoyez vos photos, l'IA s'occupe de tout. Sans appels.`
```

**Assignation** : Lucie (contenu) + Guillaume (technique)

**Temps estimé Phase 2** : 8-10h
- Audit : 2-3h
- Réécriture : 4-5h
- Implémentation : 1-2h
- Validation : 1h

### Definition of Done (Complète)

**Phase 1 - Technique** :
- [x] 1. Metadata optimisées et documentées
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé SERP + metadata sur 2+ sites
- [ ] 4. Doublons "Ville Ville" corrigés
- [ ] 5. Villes hardcodées corrigées

**Phase 2 - Contenu** :
- [ ] 6. Audit descriptions complet (220-275 pages)
- [ ] 7. Descriptions réécrites 150-160 chars
- [ ] 8. Sync 11 villes effectué
- [ ] 9. Tests Rich Results validés
- [ ] 10. Baseline CTR documenté (GSC avant)
- [ ] 11. Monitoring J+14 planifié

---

**Temps total restant** : 9-11h (1h technique + 8-10h contenu)

---

## 🔍 Analyse 03/11/2025 (ajout)

### Synthèse constats (basée sur pages à plus forte impression)
- **Doublon de ville dans les titles** des pages ville `/{city}` (ex: « Strasbourg Strasbourg », « Rennes Rennes », « Lyon Lyon », etc.).
  - Source: `app/_templates/LocalPage.tsx` → title et description concatènent `zoneDisplay` + `city.nameCapitalized` sans condition.
- **Ville erronée/hardcodée dans certaines pages** (ex: `sites/rouen/app/contact/page.tsx` → « lille » dans title/description).
- **Builder SEO**: présent sur 11/11 layouts ville avec `isMoneyPage: true`.
- **metadataBase/canonical**: OK, slash forcé sur 11/11 builders.

### Exemples (références code)
```41:58:sites/strasbourg/app/_templates/LocalPage.tsx
return {
  title: `Déménagement ${zoneDisplay} ${city.nameCapitalized} - Tarifs & Devis Gratuit | Moverz`,
  description: `Déménageur local ${zoneDisplay} à ${city.nameCapitalized} : ...`,
}
```

```6:18:sites/rouen/app/contact/page.tsx
export const metadata: Metadata = {
  title: 'Contact Déménagement lille | Devis Gratuits | Moverz',
  description: 'Contactez nos experts déménageurs à lille. ...',
}
```

### Impact SEO
- Titles en doublon réduisent la lisibilité SERP (CTR) et peuvent être réécrits par Google.
- Villes erronées = signaux négatifs (cohérence/pertinence), potentielle baisse CTR.

### Plan d’action recommandé (à exécuter)
1) **Déduplication titles/descriptions pages ville `/{city}` (11 sites)**
   - Règle: si `zone === city.slug` (ou `zoneDisplay === city.nameCapitalized`), alors:
     - Title: `Déménagement ${city.nameCapitalized} — Tarifs & Devis Gratuit | Moverz | Déménageurs ${city.nameCapitalized}` (sans répétition « Ville Ville »)
     - Description: retirer « local {Ville} à {Ville} » → wording sans doublon.
   - Fichier: `sites/*/app/_templates/LocalPage.tsx`

2) **Titles dynamiques sur `contact/` (11 sites)**
   - Remplacer « lille » hardcodé par ville dynamique (via `getCityDataFromUrl(env.SITE_URL)`), ou migrer la page pour utiliser `buildSiteMetadata()`.
   - Fichier (ex bug): `sites/rouen/app/contact/page.tsx`

3) **QA automatique**
   - Structure `<head>`:
     - `node scripts/seo/seo-head-qa.ts`
   - Hardcodés/erreurs ville:
     - `rg -n "Contact D.m.nagement" sites`
     - `rg -n "Marseille\s*\)" sites | head -n 20` (exemples de mentions hors Marseille)
   - Année:
     - `node scripts/seo/seo-qa.cjs`

### Critères d’acceptation (SERP)
- 2 villes testées (ex: Nice + Lyon):
  - Titles sans doublon ville
  - Descriptions sans « local {Ville} à {Ville} »
  - `seo-head-qa.ts` PASS (0 erreurs bloquantes)

### Estimation effort
- 45–60 min (11 templates + 11 contacts + QA)

---

## 🛠️ Notes implémentation suggérées
- Préférer une petite fonction utilitaire dans `LocalPage.tsx`:
  - `const isCityPage = zone === city.slug || zoneDisplay === city.nameCapitalized;`
  - Construire `title/description` conditionnellement.
- Sur `contact/page.tsx`, utiliser le builder central ou interpoler `city.nameCapitalized`.

