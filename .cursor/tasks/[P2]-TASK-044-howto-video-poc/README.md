# TASK-044 : HowTo/Video — POC 2 villes

**Type** : SEO / Rich Snippets / Content  
**Priorité** : P2-P3  
**Temps estimé** : 1-2 jours  
**Assigné à** : Guillaume + contenu  
**Statut** : 📋 PENDING (Q1 2026, nice-to-have)

---

## 🎯 Objectif

Créer POC schema HowTo + Video pour rich snippets SERP avancés (carrousel, video preview).

---

## 📊 Contexte

**Opportunité** :
- Rich snippets HowTo = position privilégiée SERP
- Video schema = preview video dans résultats
- CTR boost potentiel +15-25% (si affiché)

**Exemple SERP avec HowTo** :
```
Comment préparer son déménagement Lyon ? | Moverz
[Carrousel étapes 1-2-3 avec images]
1. Inventaire → 2. Emballage → 3. Réservation
```

---

## 🔧 Plan d'Action (1-2 jours)

### Phase 1 : Sélection contenu (2h)

**Identifier 2 articles piliers** (Lyon, Rennes) :
- "Comment préparer son déménagement {Ville} ?"
- "Guide déménagement {Ville} étape par étape"

**Critères** :
- Contenu étape par étape existant
- Requête populaire (Search Console)
- Potentiel snippet élevé

---

### Phase 2 : Schema.org HowTo (4h)

**Créer article avec schema HowTo** :

```typescript
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment préparer son déménagement à Lyon ?",
  "description": "Guide complet en 7 étapes...",
  "totalTime": "P2D", // 2 jours
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": "700"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "1. Faire l'inventaire",
      "text": "Listez tous vos biens pièce par pièce...",
      "image": "https://.../inventaire.jpg",
      "url": "https://.../guide#inventaire"
    },
    {
      "@type": "HowToStep",
      "name": "2. Réserver déménageurs",
      "text": "Comparez 3-5 devis...",
      "image": "https://.../devis.jpg"
    },
    // ... 5-7 étapes total
  ]
}
```

---

### Phase 3 : Video schema (optionnel, 8h)

**Si budget vidéo** :

1. **Créer video courte** (2-3 min)
   - "Déménagement Lyon : Guide en 5 étapes"
   - Format : 1920x1080, MP4
   - Hébergement : YouTube

2. **Schema VideoObject** :
```typescript
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Guide Déménagement Lyon 2025",
  "description": "Comment déménager à Lyon...",
  "thumbnailUrl": "https://.../thumbnail.jpg",
  "uploadDate": "2025-11-10",
  "duration": "PT3M",
  "contentUrl": "https://youtube.com/watch?v=...",
  "embedUrl": "https://youtube.com/embed/..."
}
```

---

### Phase 4 : Tests & Monitoring (2h)

**Validation** :
1. Rich Results Test (HowTo + Video)
2. Search Console (J+14) : Détection schema
3. SERP monitoring : Apparition carrousel/preview ?
4. CTR avant/après (J+30)

---

## 📋 Checklist

### POC HowTo
- [ ] 2 articles piliers sélectionnés (Lyon, Rennes)
- [ ] Contenu réécrit format étapes
- [ ] Schema HowTo implémenté
- [ ] Images étapes ajoutées
- [ ] Rich Results Test validé

### POC Video (optionnel)
- [ ] Video 2-3min créée
- [ ] Hébergée YouTube
- [ ] Schema VideoObject ajouté
- [ ] Thumbnail optimisé

### Validation (J+30)
- [ ] Apparition carrousel SERP ?
- [ ] Preview video visible ?
- [ ] CTR mesuré avant/après
- [ ] Décision : Déployer 11 villes si ROI positif

---

## 📊 ROI Attendu

### Investissement
- **Temps HowTo** : 6h (2 articles)
- **Temps Video** : +8h si video créée
- **Coût** : 0€ (ou budget vidéo externe)

### Retour

**Si carrousel HowTo obtenu** :
- Position privilégiée SERP
- CTR +15-20%
- +1-2 leads/mois sur requêtes info
- **€€€ : +50-300€/mois**

**Si preview video obtenu** :
- CTR +20-25%
- +2-3 leads/mois
- **€€€ : +100-450€/mois**

**Probabilité** : 
- HowTo carrousel : 30-50%
- Video preview : 10-20%
- Google décide affichage

**ROI incertain** → Priorité P2-P3

---

## 📝 Notes

**Priorité P2-P3** car :
- Impact conditionné à Google (très incertain)
- Temps investissement élevé (surtout video)
- ROI potentiel vs effort = moyen

**Décision** :
- POC 2 villes d'abord (tester viabilité)
- Si résultats positifs J+30 → Déployer 11 villes
- Sinon, abandon

**Alternative** : 
- Attendre Q1 2026
- Focus priorités ROI certain d'abord (LEADGEN-01/02/03)

---

*Créée le* : ~04/11/2025  
*Statut* : PENDING Q1 2026  
*Nice-to-have* : Pas critique business

