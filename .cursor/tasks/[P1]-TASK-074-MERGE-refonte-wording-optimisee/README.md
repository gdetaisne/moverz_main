# [P1]-TASK-074-MERGE : Refonte Wording Disruptif - Approche Optimisée (11 villes)

**Statut** : 📋 PENDING (Clarifications requises)  
**Priorité** : P1 (Important - CTR + Conversion)  
**Créée le** : 14/11/2025  
**Temps estimé** : 4.5-5.5h (vs 13.5h approche classique)  
**Assignée à** : Guillaume (décision wording) + Équipe (exécution)

---

## ⚠️ CLARIFICATIONS REQUISES EN PRIORITÉ

**⚠️ AVANT DE DÉMARRER CETTE TÂCHE, RÉPONDRE À CES QUESTIONS :**

### Question #1 : État Actuel des Sites

**Les sites ont-ils déjà le wording des specs `refonte-wording.md` appliqué ?**

- [ ] **A)** OUI → Sites ont déjà "Obtenez vos devis précis gratuitement"
- [ ] **B)** NON → Sites ont encore l'ancien wording "Essayez gratuitement"
- [ ] **C)** VÉRIFIER EN PRODUCTION → Tester 2-3 sites avant de décider

**Commande test** :
```bash
curl -s https://devis-demenageur-nice.fr/ | grep -i "obtenez vos devis"
curl -s https://devis-demenageur-lyon.fr/ | grep -i "obtenez vos devis"
```

---

### Question #2 : Quel Wording Appliquer ?

**Les specs `refonte-wording.md` contiennent un wording "classique"** :
- CTA : "Obtenez vos devis précis gratuitement"
- Angle : Précision, transparence, gratuité
- Ton : Rassurant, bénéfices clients

**MAIS le contexte Moverz 2.0 mentionne un wording "disruptif anti-arnaque"** :
- CTA : "Comparez sans harcèlement" / "Devis comparables"
- Angle : Anti-arnaque, transparence radicale, solvabilité vérifiée
- Ton : Différenciant, friction client adressée

**Décision requise** :

- [ ] **A)** Appliquer le wording des specs existantes (classique)
- [ ] **B)** Créer un nouveau wording disruptif anti-arnaque
- [ ] **C)** Hybride : Garder structure specs + ajuster wording vers disruptif

---

### Question #3 : Exemples de Wording

**Si Option B (disruptif) choisie, voici des exemples** :

#### CTA Principal
```
CLASSIQUE : "Obtenez vos devis précis gratuitement"
DISRUPTIF : "Comparez sans harcèlement téléphonique"
```

#### Hero Homepage
```
CLASSIQUE : "Préparez votre déménagement en 30 minutes"
DISRUPTIF : "Enfin des devis comparables, pas des promesses floues"
```

#### Garanties
```
CLASSIQUE : 
- IA précise
- Transparence totale
- 100% gratuit

DISRUPTIF :
- Devis vraiment comparables (mêmes critères)
- Solvabilité déménageurs vérifiée
- Sans harcèlement téléphonique
- Transparence totale prix
```

---

### Question #4 : Validation Avant Démarrage

**Une fois décision prise** :

1. [ ] Décision wording validée (A/B/C)
2. [ ] État actuel sites connu
3. [ ] Exemples wording validés (si Option B)
4. [ ] Assignation équipe confirmée

**ALORS** → Changer statut tâche de 📋 PENDING → 🔄 EN COURS

---

## 🎯 Objectif

Refonte complète du messaging/wording des 11 sites pour améliorer CTR et conversion via un angle disruptif "anti-arnaque".

**Angle cible** : Transparence radicale, anti-harcèlement, devis vraiment comparables

---

## ⚠️ RÈGLES IMPÉRATIVES (Guillaume)

### 🔴 Règle #1 : Homogénéité Stricte
**Parties partagées DOIVENT être identiques sur 11 sites** :
- Templates (Header, Footer, Layout)
- Structures (Home, Comment ça marche, FAQ, CGU, CGV)
- Components (Hero, LeadForm, StickyCTA, etc.)

**Seuls contenus spécifiques par ville** :
- Pages locales (quartiers, corridors)
- Blogs (content/blog/)

### 🚫 Règle #2 : ZÉRO Désynchronisation Prolongée
**Durée max désync autorisée** : < 10 minutes

**Workflow imposé** :
1. Modifier Nice (5 min)
2. Tester Nice local (3 min)
3. **IMMÉDIATEMENT** copier sur 10 autres villes (2 min)
4. Tester 2+ autres villes (5 min)
5. Commit atomique

### ✅ Règle #3 : Validation Double Obligatoire
**Toute modification DOIT passer** :
- ✅ Build local réussi (11 villes)
- ✅ Tests en ligne (3+ sites minimum)

### 📝 Règle #4 : Best Practices Commits
**Format strict** :
```
type(scope): description courte

- Bullet 1
- Bullet 2

Sites: 11 villes
Tested: Nice (local), Lyon (local), Marseille (local), Nice (prod), Lyon (prod), Marseille (prod)
```

### 🚀 Règle #5 : Autonomie Push
**Cursor DOIT proposer automatiquement** les push après commit.

---

## 🎨 Messaging Cible (Anti-Arnaque)

### Angles Clés

**AVANT** (Corporate, fade) :
> "Comparez les meilleurs déménageurs"
> "Recevez plusieurs devis gratuitement"

**APRÈS** (Disruptif, différenciant) :
> "Enfin des devis comparables, pas des appels de commerciaux"
> "Recevez 3 devis vérifiés (sans harcèlement téléphonique)"

### Points de Friction à Adresser

1. **Devis incomparables** → "Devis vraiment comparables"
2. **Harcèlement téléphonique** → "Sans appels intempestifs"
3. **Déménageurs peu fiables** → "Solvabilité vérifiée"
4. **Prix cachés** → "Transparence totale"

---

## 📋 Workflow TASK-074-MERGE Optimisé

### Phase 1 : Audit Express (30 min) ✅
```
□ Lire 10 fichiers refonte-wording.md existants
□ Identifier patterns wording disruptif
□ Lister pages à modifier
□ Créer checklist modifications
```

**Durée désync** : 0 min (lecture seule)

---

### Phase 2 : Refonte Atomique 11 Villes (3h)
```
□ Modifier Nice (toutes pages concernées)
  ├── components/Hero.tsx
  ├── components/CtaPrimary.tsx
  ├── components/StickyCTA.tsx
  ├── components/LeadForm.tsx
  ├── components/HowItWorks.tsx
  ├── app/page.tsx (Home)
  ├── app/faq/page.tsx
  ├── app/services/page.tsx
  └── app/notre-offre/page.tsx

□ Build local Nice
  cd sites/nice && npm run build
  npm run dev → Test local

□ ⚡ IMMÉDIATEMENT copier sur 10 villes (< 5 min)
  Script ou copie manuelle

□ Build local 3 villes (Nice, Lyon, Marseille)
```

**Durée désync** : < 10 min ✅

---

### Phase 3 : Tests Locaux (30 min)
```
□ Nice : npm run dev → Vérifier wording
□ Lyon : npm run dev → Vérifier wording
□ Marseille : npm run dev → Vérifier wording

□ Checklist wording :
  ✓ CTA unifié présent
  ✓ Angle anti-arnaque présent
  ✓ Metadata correctes
  ✓ cityData dynamique (pas de ville hardcodée)
```

**Durée désync** : 0 min (déjà synchronisés)

---

### Phase 4 : Commit Atomique (15 min)
```
□ git add sites/*/[fichiers-modifiés]
□ git commit -m "style(wording): Refonte messaging disruptif anti-arnaque (11 villes)"
□ Message descriptif complet
□ Lister 11 villes
□ Documenter tests effectués
```

---

### Phase 5 : Push Autonome (10 min)
```
□ git push origin main
□ bash scripts/deploy/push-all-sites.sh
□ Vérifier webhooks CapRover (2-3 min)
```

---

### Phase 6 : Tests Production (30 min)
```
□ Nice prod : curl + navigateur
□ Lyon prod : curl + navigateur  
□ Marseille prod : curl + navigateur

□ Validation finale :
  ✓ Wording correct affiché
  ✓ Pas de ville hardcodée
  ✓ Metadata correctes
  ✓ Build réussi
```

**Durée désync** : 0 min (tous déployés ensemble)

---

## 📂 Fichiers à Modifier

### Components (lib/ partagé)
- `components/Hero.tsx` → Titre + sous-titre + CTA
- `components/CtaPrimary.tsx` → CTA principal
- `components/StickyCTA.tsx` → CTA sticky
- `components/LeadForm.tsx` → Formulaire + micro-copie
- `components/HowItWorks.tsx` → 3 étapes process
- `components/ValueProposition.tsx` → Garanties

### Pages (app/)
- `app/page.tsx` → Homepage
- `app/faq/page.tsx` → FAQ
- `app/services/page.tsx` → Services
- `app/notre-offre/page.tsx` → Notre offre
- `app/contact/page.tsx` → Contact

### Metadata (SEO)
- Titles (50-60 chars)
- Descriptions (150-160 chars)
- OG tags

---

## 🎯 Exemples de Changements

### CTA Principal
```tsx
// ❌ AVANT
"Essayez gratuitement"
"Obtenez vos devis"

// ✅ APRÈS
"Obtenez vos devis comparables"
"Comparez sans harcèlement"
```

### Hero Homepage
```tsx
// ❌ AVANT
"30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours"

// ✅ APRÈS
"Enfin des devis comparables, pas des promesses floues"
"Solvabilité vérifiée • Sans harcèlement • Transparence totale"
```

### Garanties
```tsx
// ❌ AVANT
"IA précise"
"Transparence totale"
"100% gratuit"

// ✅ APRÈS
"Devis vraiment comparables (mêmes critères)"
"Déménageurs solvabilité vérifiée"
"Sans harcèlement téléphonique"
"Transparence totale prix"
```

---

## ✅ Critères de Validation

### Critère 1 : Wording Appliqué
- [ ] 11 villes modifiées
- [ ] CTA unifié sur toutes pages
- [ ] Angle anti-arnaque présent
- [ ] Metadata optimisées CTR

### Critère 2 : Tests Locaux
- [ ] Build réussi 11 villes
- [ ] Tests Nice, Lyon, Marseille locaux OK
- [ ] Pas de ville hardcodée détectée

### Critère 3 : Commit + Deploy
- [ ] Commit atomique créé
- [ ] Format best practices respecté
- [ ] Push monorepo main
- [ ] Push repos individuels (CapRover)

### Critère 4 : Tests Production
- [ ] 3+ sites testés en production
- [ ] Wording correct affiché
- [ ] Metadata correctes
- [ ] Aucune régression détectée

### Critère 5 : Documentation
- [ ] progress.md à jour
- [ ] commits.md avec SHA
- [ ] tests.md avec résultats
- [ ] decisions.md complété

---

## 💡 Avantages Approche MERGE

**vs Approche Classique (TASK-074 à 078)** :

| Critère | Classique | MERGE | Gain |
|---------|-----------|-------|------|
| Temps total | 13.5h | 4.5-5.5h | **-60%** |
| Nombre tâches | 5 tâches | 1 tâche | **-80%** |
| Commits | 5 commits | 1 commit | **Atomique** |
| Risque désync | Moyen | Nul | **Sécurisé** |
| Overhead | Élevé | Minimal | **Efficace** |

---

## 🚨 Checklist Pré-Code

**Avant chaque modification** :
```
□ Impact SEO ? → Metadata uniquement (OK)
□ Multi-sites ? → OUI (11 villes)
□ Ville hardcodée ? → Vérifier cityData dynamique
□ Sync prévu ? → OUI (< 10 min)
□ Tests prévus ? → OUI (local + prod)
```

---

## 📊 Temps Estimé

- Phase 1 : Audit express → 30 min
- Phase 2 : Refonte 11 villes → 3h
- Phase 3 : Tests locaux → 30 min
- Phase 4 : Commit → 15 min
- Phase 5 : Push + deploy → 10 min
- Phase 6 : Tests prod → 30 min

**Total** : 4h55 (vs 13.5h classique)

---

## 🎯 Prochaines Actions

```bash
"Cursor, je démarre TASK-074-MERGE"
```

**Workflow** :
1. Audit express (30 min)
2. Refonte atomique 11 villes (3h)
3. Tests + validation (1h)
4. Commit + deploy (30 min)
5. Tests production (30 min)

---

**Créé le** : 14/11/2025  
**Assigné à** : Guillaume + Cursor  
**Priorité** : P1 Important  
**Optimisation** : -60% temps vs approche classique


