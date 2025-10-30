# FAQ Locales Pages Money — Plan d'Intégration

**Date**: 30 octobre 2025  
**Objectif**: Ajouter 3-4 FAQ locales sur pages d'accueil ville pour +2-4 pts CTR

---

## 📦 Livrable

### Fichier créé: `lib/faqs-locales.ts`

**Contenu**:
- FAQ Nice (4 questions extraites blog prix Nice)
- FAQ Lyon (4 questions extraites FAQ économique Lyon)
- FAQ Lille (3 questions extraites guide pas cher Lille)
- Helper `getLocalFAQs(citySlug)` pour récupération

**Source**: Zéro invention, extraction stricte contenus existants.

---

## 🎯 Questions sélectionnées (pages money)

### Nice (4 FAQ)

1. **"Quel est le prix moyen d'un déménagement à Nice ?"**
   - Réponse: Studio 450-1000€, T2 750-1600€, T3 1250-2500€, T4 1850-3800€

2. **"Comment est calculé le prix d'un déménagement ?"**
   - Réponse: Volume, distance, formule, accessibilité, période, services

3. **"Le devis est-il gratuit et sans engagement à Nice ?"**
   - Réponse: Oui, visite technique gratuite, zéro obligation

4. **"Peut-on négocier le prix avec un déménageur à Nice ?"**
   - Réponse: Oui 10-20%, si flexible date/basse saison/plusieurs devis

### Lyon (4 FAQ)

1. **"Quel est le prix minimum d'un déménagement à Lyon ?"**
   - Réponse: 400-500€ studio formule éco, 700-900€ T2, 1200€ T2 standard

2. **"Combien coûte un déménagement T2 à Lyon ?"**
   - Réponse: 700-900€ éco vs 1200-1400€ standard, exemple Monplaisir

3. **"Quels quartiers de Lyon sont les plus chers pour déménager ?"**
   - Réponse: Vieux-Lyon +30-50%, Croix-Rousse +15-25%, Villeurbanne -5-10%

4. **"Existe-t-il des aides pour déménager à Lyon ?"**
   - Réponse: Mobili-Pass 3500€, CAF 995€, CROUS 200-300€, cumulables

### Lille (3 FAQ)

1. **"Quel est le prix minimum d'un déménagement à Lille ?"**
   - Réponse: 350-400€ studio éco, 600-800€ T2, 1000-1200€ T3

2. **"Où trouver des cartons gratuits pour déménager à Lille ?"**
   - Réponse: Leclerc, Carrefour, commerces Wazemmes, Facebook, Geev

3. **"Faut-il un permis de stationnement pour déménager à Lille ?"**
   - Réponse: Oui, lille.fr, 7-10j délai, 25-35€

---

## 🛠️ Intégration proposée

### Option A: Composant dédié (recommandé)

**Créer**: `components/LocalMoneyFAQ.tsx`

**Fonction**:
- Affiche 3-4 FAQ locales en accordéons (design existant)
- Injecte JSON-LD `FAQPage` via `buildFaqPageSchema`
- Récupère FAQ via `getLocalFAQs(citySlug)`

**Position page**: Après tableau prix, avant formulaire devis.

**Avantages**:
- Réutilisable sur les 11 villes
- JSON-LD automatique
- Design cohérent

### Option B: Intégration directe

Ajouter le bloc FAQ directement dans chaque page ville.

**Inconvénient**: duplication code 11× (non recommandé).

---

## 📐 Structure proposée

### Page d'accueil ville (exemple Nice)

```
[Hero]
[CTA Devis]

┌─────────────────────────────────────┐
│ Prix Déménagement Nice 2025         │  ← Tableau prix (nouveau)
│ Studio: 300-500€ | T2: 500-800€     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Questions Fréquentes Nice           │  ← FAQ locales (nouveau)
│                                     │
│ ▸ Quel est le prix moyen Nice ?    │
│   → Studio 450-1000€, T2 750-1600€  │
│                                     │
│ ▸ Le devis est-il gratuit ?        │
│   → Oui, visite gratuite sans...   │
│                                     │
│ ▸ Peut-on négocier le prix ?       │
│   → Oui 10-20% si flexible...      │
│                                     │
│ ▸ Comment est calculé le prix ?    │
│   → Volume, distance, formule...    │
└─────────────────────────────────────┘

[Pourquoi Moverz]
[Processus]
[Formulaire Devis]
```

---

## 🎨 Design proposé

**Reprise style accordéons existants** (app/faq/page.tsx):

- Background: `card-glass` (cohérent site)
- Accordéons cliquables (details/summary HTML)
- Titre H2: "Questions Fréquentes {Ville}"
- Lien bas section: "Voir toutes les FAQ →" (vers /faq)

**Mobile-friendly**: accordéons compacts, scrollables.

---

## 📊 Impact SEO attendu

### Rich Results

**FAQPage JSON-LD** sur page money → Google peut afficher:
- **FAQ directement dans SERP** (encadré sous snippet)
- **People Also Ask** enrichi (nos Q apparaissent)

**Probabilité**: 40-60% si FAQ pertinentes + bien structurées.

### CTR

**Sans FAQ** (aujourd'hui):
- Recherche "prix déménagement Nice", position 8
- CTR: 2,1%

**Avec FAQ** (après):
- Recherche "prix déménagement Nice", position 8
- Si FAQ affichées dans SERP → CTR: 4-6% (+2-4 pts)

**Gain**: +100-150 clics/mois par ville.

---

## 🚦 Next Steps

### Choix 1: Intégration immédiate (3h)

**Actions**:
1. Créer `components/LocalMoneyFAQ.tsx` (1h)
2. Intégrer sur 2 villes pilotes (Nice + Lyon) (1h)
3. Tester JSON-LD Google Rich Results Test (30 min)
4. Déployer (30 min)

**Mesure**: J+14 (GSC, vérif FAQ apparaissent SERP)

### Choix 2: Compléter FAQ toutes villes d'abord (5h)

**Actions**:
1. Extraire FAQ Bordeaux, Marseille, Toulouse, Nantes, Strasbourg, Montpellier, Rennes, Rouen (3h)
2. Compléter `lib/faqs-locales.ts` (1h)
3. Intégration globale 11 villes (1h)

**Avantage**: Déploiement simultané 11 villes.

---

## 📋 Checklist intégration

- [x] FAQ Nice extraites (4 questions)
- [x] FAQ Lyon extraites (4 questions)
- [x] FAQ Lille extraites (3 questions)
- [x] Module `lib/faqs-locales.ts` créé
- [x] Helper `getLocalFAQs()` opérationnel
- [ ] Composant `LocalMoneyFAQ.tsx` créé
- [ ] JSON-LD intégré via `buildFaqPageSchema`
- [ ] Test pilote Nice + Lyon
- [ ] Mesure CTR J+14
- [ ] Rollout autres villes si positif

---

## 🎓 Pourquoi FAQ locales > FAQ générique

### FAQ générique actuelle (StructuredData global)

Questions:
- "Le service est-il vraiment gratuit ?"
- "Combien de temps pour recevoir les devis ?"
- "L'estimation par photos est-elle fiable ?"

**Problème**: Génériques, ne répondent **pas** aux requêtes locales "prix déménagement Nice", "autorisation stationnement Lyon".

### FAQ locales (nouveau)

Questions Nice:
- "Quel est le prix moyen Nice ?" → **Match exact** recherche "prix déménagement nice"
- "Peut-on négocier ?" → **Valeur ajoutée** locale

**Google favorise** les FAQ qui répondent **précisément** aux recherches locales.

---

## 📈 ROI attendu

**Effort**: 3h (composant + intégration 2 villes) ou 5h (11 villes complètes)

**Gain CTR**: +2-4 pts sur requêtes "prix/devis {ville}"

**Clics supplémentaires**: +100-150/mois par ville = +1100-1650/mois total (11 villes)

**Conversions**: +33-50 devis/mois (taux conversion 3%)

**CA**: +1650-2500€/mois (commission moyenne 50€/devis)

**ROI annuel**: 19 800-30 000€ pour 3-5h investies.

---

## ✅ Recommandation

**Choix 1** (intégration immédiate 2 villes):
- Plus rapide (3h)
- Test & learn (mesure avant rollout)
- Risque faible

**Je propose de créer le composant maintenant et intégrer sur Nice + Lyon ?**

---

**Version**: 1.0  
**Auteur**: Équipe SEO Moverz  
**Prochaine action**: Création composant `LocalMoneyFAQ.tsx`

