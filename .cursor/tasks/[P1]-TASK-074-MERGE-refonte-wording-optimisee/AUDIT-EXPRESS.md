# Audit Express - TASK-074-MERGE

**Date** : 14/11/2025  
**Durée** : 20 min  
**Statut** : ✅ TERMINÉ

---

## 📚 Fichiers Lus (10/10)

1. ✅ `sites/nice/refonte-wording.md`
2. ✅ `sites/lyon/refonte-wording.md`
3. ✅ `sites/marseille/refonte-wording.md`
4. ✅ `sites/toulouse/refonte-wording.md`
5. ✅ `sites/bordeaux/refonte-wording.md`
6. ✅ `sites/lille/refonte-wording.md`
7. ✅ `sites/nantes/refonte-wording.md`
8. ✅ `sites/strasbourg/refonte-wording.md`
9. ✅ `sites/rouen/refonte-wording.md`
10. ✅ `sites/rennes/refonte-wording.md`

**Note** : Manque Montpellier (pas de fichier refonte-wording.md trouvé)

---

## 📊 Analyse des Specs

### Structure Commune (Tous les Fichiers)

**✅ Pages couvertes** :
- Homepage (`app/page.tsx`)
- Notre offre (`app/notre-offre/page.tsx`)
- FAQ (`app/faq/page.tsx`)
- Services (mentionné)

**✅ Components couverts** :
- `Hero.tsx`
- `ValueTriad.tsx` (Garanties)
- `HowItWorks.tsx` (3 étapes)
- `ProofStrip.tsx` (Chiffres-clés)
- `PhotoGuidelines.tsx`
- `PricingPreview.tsx`
- `NeighborhoodsTeaser.tsx`
- `CtaPrimary.tsx`
- `StickyCTA.tsx`
- `LeadForm.tsx`

**✅ Metadata couvertes** :
- Titles (50-60 chars)
- Descriptions (150-160 chars)
- Structure SEO

---

### Wording Identifié dans les Specs

**CTA Principal** :
```
"Obtenez vos devis précis gratuitement"
```

**Hero Homepage** :
```
Titre : "Préparez votre déménagement en 30 minutes → recevez 5 devis précis gratuitement sous 7 jours"
Sous-titre : "Votre dossier complet, sans stress. Estimation fiable, prix transparents, partenaires de confiance."
```

**Garanties** :
```
- IA précise : "Estimation volumétrique ultra‑fiable à partir de vos photos"
- Transparence totale : "Devis détaillés, aucun frais caché"
- 100% gratuit : "Comparez en toute liberté, sans engagement"
- Experts locaux : "Déménageurs qualifiés"
```

**Angle** :
- Précision
- Transparence
- Gratuité
- Partenaires de confiance
- Process simple (3 étapes)

---

## ⚠️ PROBLÈME DÉTECTÉ

### Incohérence Specs vs Contexte Moverz 2.0

**Specs refonte-wording.md** :
- Wording "classique" corporate
- Angle : Précision IA, gratuit, transparent
- Ton : Rassurant, bénéfices

**Context Moverz 2.0** (`.cursor/tasks/[P1]-TASK-074-MERGE-refonte-wording-optimisee/context.md`) :
- Wording "disruptif anti-arnaque"
- Angle : Devis comparables, anti-harcèlement, solvabilité vérifiée
- Ton : Différenciant, friction client adressée

**Écart** : Les specs ne reflètent PAS l'angle disruptif mentionné dans le contexte Moverz 2.0.

---

## 🚨 CLARIFICATIONS REQUISES

**Avant de continuer cette tâche, DÉCIDER** :

### Question #1 : État Actuel Sites
Les sites ont-ils déjà ce wording "précis gratuitement" ?
- A) OUI → Déjà appliqué
- B) NON → Ancien wording
- C) VÉRIFIER en production

### Question #2 : Quel Wording
Quel wording appliquer ?
- A) Specs classique "précis gratuitement"
- B) Nouveau disruptif "anti-arnaque"
- C) Hybride

---

## 📋 Checklist Fichiers à Modifier (Basé sur Specs)

### Components (Partagés - Sync 11 villes)

- [ ] `components/Hero.tsx` → Titre + sous-titre + CTA
- [ ] `components/CtaPrimary.tsx` → CTA principal
- [ ] `components/StickyCTA.tsx` → CTA sticky
- [ ] `components/LeadForm.tsx` → Formulaire + placeholders
- [ ] `components/HowItWorks.tsx` → 3 étapes process
- [ ] `components/ValueProposition.tsx` → Garanties (si existe)

### Pages (app/ - Vérifier si spécifique ou partagé)

- [ ] `app/page.tsx` → Homepage
- [ ] `app/faq/page.tsx` → FAQ
- [ ] `app/services/page.tsx` → Services
- [ ] `app/notre-offre/page.tsx` → Notre offre
- [ ] `app/contact/page.tsx` → Contact

### Metadata (Layout ou pages)

- [ ] Titles homepage/services/FAQ/offre
- [ ] Descriptions homepage/services/FAQ/offre
- [ ] OG tags si différents

---

## 🎯 Patterns Wording Extraits

### CTA Unifié
```typescript
"Obtenez vos devis précis gratuitement"
```

### Messages d'Engagement
```typescript
"Service 100% gratuit, sans engagement. Vous recevrez jusqu'à 5 devis précis gratuitement sous 7 jours."
```

### Placeholders Formulaire
```typescript
email: "Votre email"
téléphone: "Votre numéro (optionnel)"
```

### Message Succès
```typescript
"Vous recevrez jusqu'à 5 devis précis gratuitement sous 7 jours"
```

### Preuves Sociales
```typescript
"+1200 clients satisfaits — Note moyenne 4,9/5"
"500+ déménagements accompagnés"
"4,8/5 de moyenne"
"2 min pour une première estimation gratuite"
```

---

## ✅ Conclusion Audit

**Structure specs** : ✅ Excellente (pages + components bien identifiés)  
**Wording specs** : ⚠️ Classique (pas disruptif)  
**Cohérence** : ❌ Incohérence avec contexte Moverz 2.0

**Recommandation** : **CLARIFIER WORDING AVANT DÉMARRAGE REFONTE**

---

## 📝 Actions Suivantes

1. ✅ Audit terminé
2. ⏳ **ATTENTE DÉCISION GUILLAUME** :
   - Quel wording appliquer ?
   - État actuel sites ?
3. ⏳ Mettre à jour README avec décisions
4. ⏳ Démarrer Phase 2 (Refonte) une fois clarifications obtenues

---

**Durée audit** : 20 min  
**Fichiers lus** : 10/11 (Montpellier manquant)  
**Statut** : ✅ TERMINÉ


