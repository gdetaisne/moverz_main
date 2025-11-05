# TASK-046 : Logo SERP / Favicons — CTR

**Type** : SEO / UX / Brand  
**Priorité** : P0 → **P2** (déprioritisé après analyse Lead Gen)  
**Temps estimé** : 1.5-3h  
**Assigné à** : Guillaume  
**Statut** : ⏸️ EN PAUSE (à faire après LEADGEN-01)

---

## 🎯 Objectif

**PROBLÈME** :
- Résultats Google sans logo sur mobile
- Impact CTR estimé -5-10% (logo manquant = moins de confiance)

**OBJECTIF** :
- Favicon visible dans SERP mobile + desktop
- Logo organisation dans rich snippets
- CTR boost +5-10% sur résultats avec logo

---

## 📊 Contexte & Priorisation

### Pourquoi P0 initialement ?
- Logo SERP = trust signal important mobile
- CTR mobile impacté
- 11 sites concernés

### Pourquoi déprioritisé à P2 ?

**Analyse ROI (05/11/2025)** :
- **Metadata (LEADGEN-01)** : CTR +400% (0.56% → 2.5%)
- **Favicon** : CTR +5-10% (sur base existante)

**Calcul** :
- Si favicon AVANT metadata : 0.56% → 0.62% = **+1 clic** 😐
- Si metadata AVANT favicon : 0.56% → 2.5% puis 2.5% → 2.7% = **+40 clics** 🚀

**Décision** : Faire après LEADGEN-01 pour multiplicateur ROI

---

## 🔧 Plan d'Action (3h)

### Phase 1 : Diagnostic (30min)

**Vérifier 11 sites** :
```bash
# Tester favicon accessible
curl -I https://devis-demenageur-lyon.fr/favicon.ico
curl -I https://devis-demenageur-rennes.fr/favicon.ico
# ... (11 sites)
```

**Checklist par site** :
- [ ] `GET /favicon.ico` retourne 200
- [ ] Fichier existe dans `public/favicon.ico`
- [ ] Metadata `<link rel="icon">` présent
- [ ] Tailles multiples (16x16, 32x32, 48x48)
- [ ] Logo organisation dans schema.org

---

### Phase 2 : Fix Favicons (1h)

#### A. Ajouter liens icon dans metadata (si manquant)

**Fichier** : `app/layout.tsx` (ou équivalent)

```typescript
// Ajouter dans metadata
export const metadata: Metadata = {
  // ... autres metadata
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
```

#### B. Vérifier fichiers présents

**Localisation** : `sites/{ville}/public/`

**Fichiers requis** :
- `favicon.ico` (multi-sizes)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-48x48.png`
- `apple-touch-icon.png` (180x180)

**Si manquants** : Générer depuis logo Moverz

---

### Phase 3 : Logo Organisation Schema.org (1h)

**Problème potentiel** : Logo rectangulaire au lieu de carré

**Google exigences** :
- Format : PNG, JPG, WebP
- Taille : **512x512 minimum** (carré)
- Ratio : 1:1 (carré, pas rectangulaire)

**Fichier** : `lib/seo-builders.ts` ou layouts

```typescript
// Organisation schema
{
  "@type": "Organization",
  "@id": `https://devis-demenageur-${city.slug}.fr/#organization`,
  "name": "Moverz",
  "url": `https://devis-demenageur-${city.slug}.fr`,
  "logo": {
    "@type": "ImageObject",
    "url": `https://devis-demenageur-${city.slug}.fr/logo-512x512.png`, // ← Carré 512x512
    "width": 512,
    "height": 512
  },
  "image": `https://devis-demenageur-${city.slug}.fr/logo-512x512.png`
}
```

**Action** :
1. Créer `public/logo-512x512.png` (version carrée logo Moverz)
2. Mettre à jour schema.org (11 villes)
3. Valider Google Rich Results Test

---

### Phase 4 : Tests (30min)

**Tests à effectuer** :

1. **Favicon visible navigateur** (3 sites test)
   - Lyon, Rennes, Nice
   - Desktop + Mobile
   - Chrome, Firefox, Safari

2. **Favicon SERP mobile** (attendre 7-14 jours indexation)
   - Google mobile : `site:devis-demenageur-lyon.fr`
   - Screenshot avant/après

3. **Logo organisation Rich Results**
   - Google Rich Results Test
   - Valider logo carré accepté

4. **Search Console** (J+7)
   - Vérifier logo détecté
   - Section "Apparence recherche" → "Données structurées"

---

## 📋 Checklist Exécution

### Technique
- [ ] Favicon.ico accessible 11 sites (GET 200)
- [ ] Metadata `icons` ajoutée 11 sites
- [ ] Fichiers favicon multi-tailles présents
- [ ] Logo 512x512 carré créé
- [ ] Schema.org Organisation.logo mis à jour (11 villes)
- [ ] Tests navigateur OK (3 sites)
- [ ] Rich Results Test validé

### Validation (J+7-14)
- [ ] Logo visible SERP mobile (3 sites test)
- [ ] Search Console détecte logo
- [ ] CTR monitoring (avant/après)

---

## 📊 ROI Attendu

### Investissement
- **Temps** : 3h
- **Coût** : 0€ (assets logo existent)

### Retour

**Si fait APRÈS LEADGEN-01** (recommandé) :
- Baseline CTR : 2.5% (post-LEADGEN-01)
- CTR avec logo : 2.7-2.8%
- **Amélioration : +0.2-0.3% = +5-8 clics/mois = +1-2 leads/mois**
- **€€€ : +50-300€/mois**

**Si fait AVANT LEADGEN-01** (non recommandé) :
- Baseline CTR : 0.56%
- CTR avec logo : 0.62%
- **Amélioration : +0.06% = +1 clic/mois = 0 lead**
- **€€€ : 0€/mois** (impact négligeable)

**ROI optimal** : Faire après LEADGEN-01 = multiplicateur ×8

---

## 🔗 Dépendances

### Bloqué par
- ✅ LEADGEN-01 (recommandé finir avant, mais pas strict)

### Bloque
- Aucune

### Synergie
- LEADGEN-01 (metadata) : Logo sur CTR optimisé >> Logo sur CTR faible

---

## 📝 Notes

**Décision 05/11/2025** :
- Mis en pause malgré P0 initial
- Raison : ROI multiplicateur si fait après metadata
- Reprendre après LEADGEN-01 validé (J+14-30)

**Assets requis** :
- Logo Moverz carré 512x512 (à créer si n'existe pas)
- Multi-tailles favicon (générer depuis logo)

**Références** :
- Google : "Organization logo guidelines"
- Google Rich Results Test
- Search Console : Apparence recherche

---

*Créée le* : ~04/11/2025 (mentionné TODO)  
*Déprioritisée le* : 05/11/2025 (restructuration Lead Gen)  
*À reprendre* : Après LEADGEN-01 J+14

