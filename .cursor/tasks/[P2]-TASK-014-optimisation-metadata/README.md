# TASK-014 : Optimisation Métadonnées SEO - 11 villes

**Type** : SEO / Optimization  
**Priorité** : P2  
**Temps estimé** : ~4h (dont 80% fait)  
**Assigné à** : Guillaume  
**Démarrée le** : 30-31 octobre 2025  
**Statut** : 🔄 EN COURS (80% fait, validation SERP à faire)

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

## 📋 Ce qui Reste (20%)

### Sites à tester
- [ ] Vérifier metadata correctes sur 2+ villes
- [ ] Tester Google SERP preview (titles)
- [ ] Valider metadataBase OK

### Definition of Done
- [x] 1. Metadata optimisées et documentées
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé SERP + metadata sur 2+ sites

---

**Temps restant** : ~45 min - 1h

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

