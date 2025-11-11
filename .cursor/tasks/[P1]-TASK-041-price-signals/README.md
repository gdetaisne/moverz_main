# TASK-041 : Price Signals (UI + JSON-LD Service)

**Type** : SEO / UX / Rich Snippets  
**Priorité** : P2  
**Temps estimé** : 3-4h  
**Assigné à** : Guillaume  
**Statut** : 📋 PENDING (Q1 2026)

---

## 🎯 Objectif

Ajouter signaux de prix visibles dans SERP (rich snippets) pour améliorer CTR et trust.

---

## 📊 Contexte

**Opportunité** :
- Concurrents affichent prix dans SERP
- Prix visible = CTR +10-15%
- Trust signal fort

**Exemple SERP avec prix** :
```
Déménagement Lyon | Moverz
★★★★★ (47 avis)
À partir de 450€ - Devis gratuit
Estimation IA 30min → 5 devis en 7j...
```

---

## 🔧 Plan d'Action (3-4h)

### Phase 1 : UI Prix visible (1h)

**Afficher prix indicatifs sur pages** :

**Home** :
```tsx
<div className="price-badge">
  <span className="from">À partir de</span>
  <span className="price">450€</span>
  <span className="detail">Déménagement économique</span>
</div>
```

**Services** :
- Économique : Dès 450€
- Standard : Dès 750€
- Premium : Dès 1 200€

---

### Phase 2 : Schema.org Service avec price (2h)

**Ajouter dans metadata JSON-LD** :

```typescript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Déménagement à {Ville}",
  "provider": {
    "@type": "Organization",
    "name": "Moverz"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": "450",
    "highPrice": "2500",
    "priceValidUntil": "2026-12-31",
    "offerCount": "3",
    "offers": [
      {
        "@type": "Offer",
        "name": "Formule Économique",
        "price": "450",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Formule Standard",
        "price": "750",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "Formule Premium",
        "price": "1200",
        "priceCurrency": "EUR"
      }
    ]
  }
}
```

---

### Phase 3 : Tests Rich Results (1h)

**Validation** :
1. Google Rich Results Test
2. Vérifier prix détecté
3. Search Console (J+7) : Section "Apparence recherche"

---

## 📋 Checklist

### Technique
- [ ] Prix UI affichés (home, services)
- [ ] Schema.org Service + AggregateOffer (11 villes)
- [ ] Rich Results Test validé
- [ ] Tests 3 sites production

### Business
- [ ] Prix visibles SERP (J+14)
- [ ] CTR monitoring avant/après
- [ ] Impact estimé +10-15% CTR

---

## 📊 ROI Attendu

### Investissement
- **Temps** : 3-4h
- **Coût** : 0€

### Retour
- CTR boost +10-15% (si prix affiché SERP)
- +2-3 leads/mois
- **€€€ : +100-450€/mois**

**Note** : Impact conditionné à Google affichant prix (pas garanti)

---

## 📝 Notes

**Priorité P2** car :
- Impact incertain (Google décide affichage)
- ROI potentiel moyen
- À faire après LEADGEN-01/02/03

**Données prix** :
- Source : Fiche locale par ville
- Prix indicatifs (pas contractuels)
- Mise à jour annuelle

---

*Créée le* : ~04/11/2025  
*Statut* : PENDING Q1 2026  
*À faire après* : LEADGEN-01/02/03 + TASK-046

