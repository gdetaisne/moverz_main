# TASK-LEADGEN-01 : Optimisation Metadata CTR (Fusion TASK-012 + 039 + 040)

**Type** : Lead Generation / SEO Critical  
**Priorité** : P0 (Impact business direct)  
**Temps estimé** : 2 jours (16h)  
**Temps déjà investi** : 
- TASK-012 : 5h30 (40-50% fait)
- TASK-014 : 7h (80% fait)
**Temps restant** : 3-4h (finalisation)  
**Assigné à** : Guillaume + Cursor  
**Statut** : 🔄 EN COURS (à reprendre)

---

## 🎯 Objectif Business

**PROBLÈME CRITIQUE IDENTIFIÉ** :
- CTR actuel : **0.56%** (6 clics / 1 500 impressions)
- CTR attendu : **3-5%** (45-75 clics attendus)
- **PERTE : 39-69 clics/mois = 6-10 leads/mois = 300-1 500€/mois**

**ROOT CAUSE** :
1. Villes hardcodées dans metadata (Marseille affiche "Lille", Nantes affiche "Marseille")
2. Titles trop longs (>60 caractères, coupés dans SERP)
3. Descriptions génériques sans CTA ni bénéfice chiffré
4. Aucune optimisation conversion dans snippets SERP

**OBJECTIF** : CTR 0.56% → 2.5-3% = **×4-5 clics = +3-5 leads/mois supplémentaires**

---

## 📊 Exemples Concrets des Problèmes (Data Search Console)

### Problème #1 : Villes hardcodées

**Marseille blog** (position 44.2, 0 clic) :
```
Title: "demenagement-marseille - Blog Déménagement lille | Déménageurs Marseille"
                                                      ^^^^^ LILLE sur site MARSEILLE
Description: "Découvrez tous nos articles sur demenagement-marseille."
```

**Nantes blog** (position 51.6, 0 clic) :
```
Title: "Blog Déménagement Marseille - Guides & Conseils | Déménageurs Nantes"
                       ^^^^^^^^^ MARSEILLE sur site NANTES
Description: "Guides pour réussir votre déménagement à Marseille..."
```

### Problème #2 : Titles trop longs

**Rennes** (position 73.0, 0 clic) :
```
Title: "Déménagement Rennes — Devis en 7j | Moverz | Déménageurs Rennes" (71 caractères)
       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
       Optimal = 50-60 caractères (coupé dans SERP mobile)
```

### Problème #3 : Descriptions sans valeur

**Strasbourg** (position 45.1, 0 clic) :
```
Title: "Déménagement Strasbourg Pas Cher : Astuces & Solutions | Déménageurs"
Description: [VIDE]
```

**Nice** (position 48.4, 0 clic) :
```
Description: "Guides complets et conseils d'experts pour réussir votre déménagement à Nice."
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
             Générique, aucun CTA, aucun chiffre, aucune urgence
```

---

## ✅ Travail Déjà Réalisé (TASK-012 + TASK-014)

### Session 1 : TASK-012 (30-31/10/2025, 3h30)
- ✅ Metadata dynamiques services + contact (11 villes)
- ✅ Correction bug Lille hardcodé
- ✅ Fix quartiers Bordeaux
- ✅ Emails → contact@domaine.fr (11 villes)
- ✅ Footer résolution villes SITE_URL
- ✅ 5 commits GitHub

### Session 2 : TASK-012 (04/11/2025, 2h)
- ✅ Pattern 1 "à Lille" : 16 fichiers corrigés (Nice, Lyon, Marseille, Lille)
- ✅ Déploiement Lille en attente test production

### Session 3 : TASK-014 (30-31/10 + 04/11, 7h)
- ✅ Titles optimisés 54 caractères
- ✅ Canonical URL trailing slash
- ✅ Descriptions optimisées home (Nice/Lyon)
- ✅ Corridors → Paris (11 villes)

**Commits déjà faits** :
- `da4c1da` : Pattern 1 corrections
- `6c00451` : Pattern 1 suite
- `c43c0391` : Metadata dynamiques
- `db77cd26` : Fix metadataBase
- `34c00cb2` : Titles 54 chars
- `bc3a95ba` : Optimize titles 11 cities
- `59b965f1` : Canonical trailing slash
- `5d315e3` : Phase 1 dédup "Ville Ville"
- `3986fe2` : Phase 2 Tier 1 descriptions

---

## 🔧 Travail Restant (3-4h)

### Phase 1 : Finir corrections villes hardcodées (1h)

**Pattern 1 "à Lille"** : 24 fichiers restants (6 villes)
- Bordeaux : 4 fichiers (estimation-rapide, faq, notre-offre, inventaire-ia)
- Nantes : 4 fichiers
- Rennes : 4 fichiers
- Rouen : 4 fichiers
- Strasbourg : 4 fichiers
- Montpellier : 4 fichiers

**Pattern 2 "à Marseille"** : 27 fichiers (9 villes)
- Lyon : 3 fichiers (partenaires, blog, comment-ca-marche)
- Bordeaux : 3 fichiers
- Lille : 3 fichiers
- Nantes : 3 fichiers
- Rennes : 3 fichiers
- Rouen : 3 fichiers
- Strasbourg : 3 fichiers
- Montpellier : 3 fichiers
- Nice : 3 fichiers

**Méthode** :
```typescript
// AVANT (hardcodé)
export const metadata: Metadata = {
  title: "Estimation Rapide Déménagement Lille | Calcul Volume | Moverz",
  description: "Estimez rapidement votre volume de déménagement à Lille...",
  openGraph: {
    title: "Estimation Rapide Déménagement Lille | Moverz",
    description: "Estimez rapidement... à Lille...",
  },
}

// APRÈS (dynamique)
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Estimation Rapide Déménagement ${city.nameCapitalized} | Calcul Volume | Moverz`,
  description: `Estimez rapidement votre volume de déménagement à ${city.nameCapitalized}...`,
  openGraph: {
    title: `Estimation Rapide Déménagement ${city.nameCapitalized} | Moverz`,
    description: `Estimez rapidement... à ${city.nameCapitalized}...`,
  },
}
```

---

### Phase 2 : Optimiser templates metadata (2-3h)

**Fichier cible** : `lib/seo-builders.ts` ou équivalent

#### A. Templates Titles optimisés (50-60 caractères)

```typescript
export function buildTitle(pageType: string, city: CityData): string {
  const templates = {
    // HOME (55 caractères)
    home: `Déménageurs ${city.nameCapitalized} : 5 Devis 7j | Moverz`,
    
    // SERVICES (58 caractères)
    services: `Services Déménagement ${city.nameCapitalized} | Devis Gratuit`,
    
    // BLOG ARTICLE (variable, max 60)
    blogArticle: `${article.title} | Déménageurs ${city.nameCapitalized}`,
    
    // BLOG CATEGORY (52 caractères)
    blogCategory: `${category} ${city.nameCapitalized} | Blog Moverz`,
    
    // CONTACT (56 caractères)
    contact: `Contact Déménagement ${city.nameCapitalized} | Devis 7j`,
    
    // FAQ (52 caractères)
    faq: `FAQ Déménagement ${city.nameCapitalized} | Moverz`,
    
    // CORRIDORS (exemple Lyon → Paris, 59 caractères)
    corridor: `Déménagement ${cityFrom} → ${cityTo} | 5 Devis 7j | Moverz`,
  }
  
  return templates[pageType];
}
```

**Règles** :
- Max 60 caractères (affichage complet mobile + desktop)
- Mot-clé principal en début
- Ville toujours présente
- CTA chiffré ("5 Devis 7j")
- Marque en fin

#### B. Templates Descriptions optimisés (150-160 caractères)

**Formule gagnante** : [Bénéfice concret] + [Chiffre précis] + [CTA urgent] + [Trust signal]

```typescript
export function buildDescription(pageType: string, city: CityData): string {
  const templates = {
    // HOME (156 caractères)
    home: `Déménageur ${city.nameCapitalized} : estimation IA 30min → 5 devis comparables en 7j. Gratuit, sans engagement. Déménageurs vérifiés.`,
    
    // SERVICES (158 caractères)
    services: `3 formules déménagement ${city.nameCapitalized} : Économique, Standard, Premium. Estimation IA gratuite. Recevez 5 devis personnalisés sous 7 jours.`,
    
    // BLOG ARTICLE PAS CHER (159 caractères)
    blogPasCher: `Déménager pas cher à ${city.nameCapitalized} : T2 dès 700€, -30% vs concurrence. Astuces économies + comparatif déménageurs. Guide complet 2025.`,
    
    // BLOG ARTICLE PRIX (157 caractères)
    blogPrix: `Prix déménagement ${city.nameCapitalized} 2025 : Studio 400-700€, T2 700-1300€, T3 1100-1900€. Tarifs acteurs locaux. Devis gratuit en 30 min.`,
    
    // CONTACT (152 caractères)
    contact: `Contactez nos experts déménageurs à ${city.nameCapitalized}. Estimation gratuite en 30 min, 5 devis précis sous 7 jours. Service 100% gratuit.`,
    
    // FAQ (154 caractères)
    faq: `Questions clés déménagement à ${city.nameCapitalized} : prix, délais, stationnement. Réponses pratiques + 5 devis comparables en 7 jours.`,
    
    // CORRIDORS (exemple Lyon → Paris, 160 caractères)
    corridor: `Déménagement ${cityFrom} vers ${cityTo}. Distance ${distance} km. Prix indicatifs : Studio ${priceStudio}€, T2/T3 ${priceT2T3}€. Devis gratuit avec estimation IA.`,
  }
  
  return templates[pageType];
}
```

**Règles** :
- 150-160 caractères (affichage complet SERP)
- Chiffres précis (prix, délais, nombre devis)
- CTA actionnable ("Devis gratuit", "Estimation 30min")
- Trust signal ("Gratuit", "Sans engagement", "Déménageurs vérifiés")
- Bénéfice clair dès les 3 premiers mots

---

## 📋 Plan d'Exécution Détaillé

### Jour 1 : Corrections villes hardcodées (4h)

**Matin (2h)** : Pattern 1 restant
1. Bordeaux, Nantes, Rennes (estimation-rapide, faq, notre-offre, inventaire-ia)
2. Tests syntaxe TypeScript
3. Commit monorepo

**Après-midi (2h)** : Pattern 2
1. 9 villes × 3 fichiers (partenaires, blog, comment-ca-marche)
2. Tests syntaxe TypeScript
3. Commit monorepo
4. Déploiement 11 sites

---

### Jour 2 : Templates metadata optimisés (4h)

**Matin (2h)** : Titles
1. Identifier fichier central (`lib/seo-builders.ts`)
2. Créer fonction `buildTitle()`
3. Implémenter 7 templates (home, services, blog, contact, faq, corridor, quartiers)
4. Tests 2 sites (Lyon + Rennes)

**Après-midi (2h)** : Descriptions
1. Créer fonction `buildDescription()`
2. Implémenter 7 templates avec formule [Bénéfice + Chiffre + CTA + Trust]
3. Remplacer dans tous les layouts/pages concernés
4. Tests 2 sites

**Validation finale (30min)** :
- Déploiement 11 sites
- Vérifier SERP après 24-48h (Lyon, Rennes)
- Monitoring CTR J+7

---

## 🎯 Critères de Réussite (Definition of Done)

### Technique
- [ ] 0 ville hardcodée dans metadata (scan complet 11 villes)
- [ ] Tous titles 50-60 caractères
- [ ] Toutes descriptions 150-160 caractères avec formule [Bénéfice + Chiffre + CTA + Trust]
- [ ] Tests syntaxe TypeScript OK
- [ ] 11 sites déployés

### Business
- [ ] CTR suivi Search Console J+7, J+14, J+30
- [ ] Baseline avant : 0.56% (6 clics)
- [ ] Objectif J+14 : 2% (30 clics) = +400% = +4-5 leads/mois
- [ ] Objectif J+30 : 2.5-3% (37-45 clics) = +500-700% = +5-8 leads/mois

### Documentation
- [ ] Commits GitHub avec SHA documentés
- [ ] Screenshots SERP avant/après (Lyon, Rennes)
- [ ] Rapport CTR évolution (dashboard existant)

---

## 📊 ROI Attendu

### Investissement
- **Temps** : 8h (3-4h restantes + validation)
- **Coût** : 0€ (dev interne)

### Retour
**Court terme (J+14)** :
- CTR 0.56% → 2% = +24 clics/mois
- Conversion 15% = +3-4 leads/mois
- Valeur lead 50-150€ = **+150-600€/mois**

**Moyen terme (J+30)** :
- CTR 0.56% → 2.5-3% = +30-40 clics/mois
- Conversion 15% = +5-8 leads/mois
- Valeur lead 50-150€ = **+250-1 200€/mois**

**ROI** : ∞ (coût 0€, retour +150-1 200€/mois)

---

## 🔗 Liens Utiles

- Dashboard analytics custom : [À compléter par Guillaume]
- Search Console : 11 propriétés configurées
- Documentation TASK-012 originale : `.cursor/tasks/[P1]-TASK-012-villes-hardcodees/`
- Documentation TASK-014 originale : `.cursor/tasks/[P2]-TASK-014-optimisation-metadata/`

---

## 📝 Notes

**Contexte business** :
- Sites lancés il y a 1 mois (oct 2025)
- 1 500 impressions/mois actuellement
- 6 clics/mois seulement
- CTR 0.56% = **10x trop faible** (normal = 3-5%)
- Impact direct sur lead generation

**Découverte analyse Head of Lead Gen (05/11/2025)** :
- Projet 404 résolu à 99% ✅
- Breadcrumbs déployés ✅
- Sitemaps OK ✅
- **MAIS metadata non optimisées = goulot d'étranglement CTR**

**Priorité P0** car :
- Impact immédiat (J+14)
- ROI infini (0€ investi)
- Multiplicateur ×4-5 sur leads
- Bloque actuellement toute stratégie acquisition organique

