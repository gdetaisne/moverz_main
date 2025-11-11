# TASK-047 : Refonte Wording Offre Moverz (Home, Services, FAQ, CTA)

**Priorité** : P1 (Important - Impact conversion directe)  
**Temps estimé** : 6-8h  
**Assigné à** : Guillaume  
**Statut** : 📋 À FAIRE  
**Créée le** : 05/11/2025

---

## 🎯 OBJECTIF

Aligner le wording de l'offre Moverz sur **tous les points de contact** avec les **vrais pain points clients** et les **USP réels**.

**Problème actuel** : Le site ne communique pas clairement les avantages uniques de Moverz (anonymat, devis comparables, protection harcèlement).

**Impact business** : 
- Conversion lead form actuelle : ~2-3% (estimation)
- Conversion optimisée attendue : 3-5% (+50-100%)
- Leads additionnels : +200-400/mois sur 11 sites

---

## 🔍 CONSTATS

### Ce qui manque actuellement sur le site

❌ **Anonymat client** (pas mentionné)  
❌ **Protection harcèlement commercial** (pas mentionné)  
❌ **Volume IA identique pour tous** (peu clair)  
❌ **Déménageurs vérifiés** (Google + crédit score) (peu visible)  
❌ **Centralisation échanges** (pas expliqué)  
❌ **3-5 devis** (site dit "5" mais c'est "jusqu'à 5")

### Ce qui est présent mais pas optimal

⚠️ **"Estimation rapide"** mise en avant alors que ce n'est pas le cœur d'offre  
⚠️ **"Comparateur"** utilisé mais pas clair pourquoi c'est mieux qu'appeler direct  
⚠️ **"Cahier des charges"** (terme B2B, pas compréhensible grand public)

---

## 💎 LES VRAIS USP MOVERZ (À Communiquer)

### USP #1 : Devis Vraiment Comparables (Pain Point Principal)

**Pain Point** :
- Devis classiques incomparables (volumes différents, services différents)
- Client perdu, ne sait pas qui choisir
- Valide rapidement (souvent le moins cher = mauvaise surprise)

**Solution Moverz** :
- Volume IA identique envoyé aux 3-5 déménageurs
- Base commune de comparaison
- Différence de prix = différence de service (pas d'estimation)

**Message à faire passer** :
```
"Volume IA identique pour tous → Comparez enfin des devis réels"
"Fini les estimations fantaisistes, base commune pour tous"
```

---

### USP #2 : Protection Harcèlement Commercial (Unique Marché)

**Pain Point** :
- Coordonnées transmises à multiples partenaires
- Appels/SMS incessants (15-20 en 48h)
- Spam pendant des mois

**Solution Moverz** :
- Seulement email demandé (pas nom, pas tel)
- Dossier anonyme jusqu'à sélection finale
- Déménageurs connaissent seulement code postal
- Centralisation échanges (Moverz = buffer)

**Message à faire passer** :
```
"Dossier anonyme, zéro harcèlement commercial"
"Vous choisissez, PUIS on lève l'anonymat"
"Un seul email suffit, pas de tel, pas de spam"
```

---

### USP #3 : Déménageurs Vérifiés (Confiance)

**Pain Point** :
- Sous-traitance cachée (paye A, reçoit Z)
- Faux avis
- Déménageurs non qualifiés

**Solution Moverz** :
- Vérification note Google
- Vérification crédit score (solvabilité, litiges)
- Sélection avant envoi dossier

**Message à faire passer** :
```
"Déménageurs vérifiés (notes Google + solvabilité)"
"Sélection rigoureuse, pas de sous-traitance surprise"
```

---

### USP #4 : Concurrence = Meilleurs Prix

**Pain Point** :
- Appel direct 1 déménageur = prix catalogue élevé
- Pas de négociation possible

**Solution Moverz** :
- 3-5 déménageurs savent qu'ils sont en concurrence
- Devis comparables sur base identique = vraie compétition prix
- Économies réelles

**Message à faire passer** :
```
"3-5 déménageurs en concurrence sur base identique"
"Économisez vs appel direct (pas de prix catalogue)"
```

---

### USP #5 : Gain de Temps (Secondaire)

**Pain Point** :
- 3-5 RDV à domicile ou appels longs
- Expliquer 5 fois la même chose
- Attendre devis (parfois jamais reçus)

**Solution Moverz** :
- 30 min photos
- IA s'occupe du reste
- Devis sous 7j garanti

**Message à faire passer** :
```
"30 min photos → 3-5 devis en 7j max (garanti)"
"Zéro appel, zéro RDV, zéro relance"
```

---

## 📋 PAGES À REVOIR (Checklist)

### 🏠 Homepage (`app/page.tsx`)

**Éléments à optimiser** :

- [ ] **H1 Hero** : "Préparez votre déménagement en 30 minutes"
  - Actuellement : Focus temps
  - Optimal : Focus comparaison + anonymat
  - Proposition : "Comparez 3-5 devis sans harcèlement commercial"

- [ ] **Description Hero** : "Envoyez vos photos, recevez 5 devis fiables..."
  - Actuellement : Process technique
  - Optimal : Bénéfices client (comparables, anonymat)
  - Proposition : "Volume IA identique pour tous. Dossier anonyme, déménageurs vérifiés. Comparez enfin."

- [ ] **Meta Description** : "Préparez votre déménagement à {Ville} en 30 minutes..."
  - Actuellement : 171-179 car, focus temps
  - Optimal : 150-160 car, focus USP
  - Proposition : "Volume IA identique pour 3-5 devis comparables. Dossier anonyme, déménageurs vérifiés, zéro harcèlement. 30 min photos → devis en 7j max."

- [ ] **Value Triad** : "IA précise, Transparence totale, 100% gratuit, Experts locaux"
  - Actuellement : Génériques
  - Optimal : USP spécifiques
  - Proposition : 
    - "Devis comparables" (volume IA identique)
    - "Zéro harcèlement" (dossier anonyme)
    - "Déménageurs vérifiés" (Google + solvabilité)
    - "100% gratuit" (OK)

- [ ] **CTA Buttons** : "Obtenez vos devis précis gratuitement"
  - Actuellement : Focus "précis"
  - Optimal : Focus bénéfice
  - Proposition : "Comparez 5 devis sans harcèlement" ou "Obtenez 5 devis comparables"

---

### 🛠️ Page Services (`app/services/page.tsx`)

- [ ] **Description offre** : Clarifier "Volume IA identique"
- [ ] **Avantages** : Ajouter "Anonymat" + "Pas de harcèlement"
- [ ] **Process** : Expliquer centralisation échanges

---

### ❓ Page FAQ (`app/faq/page.tsx`)

**Nouvelles FAQ à ajouter** :

- [ ] "Pourquoi mes coordonnées restent anonymes ?"
  - Réponse : Protection harcèlement, vous choisissez PUIS levez anonymat

- [ ] "Comment les devis sont-ils comparables ?"
  - Réponse : Volume IA identique envoyé aux 3-5 déménageurs

- [ ] "Combien de devis vais-je recevoir ?"
  - Réponse : 3 à 5 devis (garanti minimum 3)

- [ ] "Comment vérifiez-vous les déménageurs ?"
  - Réponse : Note Google + crédit score (solvabilité + litiges)

- [ ] "Vais-je recevoir des appels commerciaux ?"
  - Réponse : Non, seulement email demandé, dossier anonyme

- [ ] "Que se passe-t-il après avoir choisi un devis ?"
  - Réponse : Vous validez, on lève anonymat, déménageur vous contacte

---

### 💬 Page "Comment ça marche" (`app/comment-ca-marche/page.tsx`)

**Étapes à clarifier** :

- [ ] **Étape 1** : Photos
  - Ajouter : "Pas besoin de votre nom/tel, seulement email"

- [ ] **Étape 2** : IA calcule
  - Clarifier : "Volume envoyé identique aux 3-5 déménageurs"

- [ ] **Étape 3** : Devis reçus
  - Ajouter : "Dossier anonyme, déménageurs ne connaissent que code postal"

- [ ] **Étape 4** : Vous choisissez
  - Ajouter : "Vous sélectionnez, on lève l'anonymat, déménageur vous contacte"

---

### 🤝 Page Partenaires (`app/partenaires/page.tsx`)

- [ ] Expliquer critères sélection (Google + crédit score)
- [ ] Rassurer sur "pas de sous-traitance surprise"

---

### 🎨 Components Globaux

**LeadForm** :
- [ ] Placeholder email : Clarifier "Seulement email (pas de tel)"
- [ ] Message rassurant : "Dossier anonyme, pas de harcèlement"

**CTA Sticky** :
- [ ] Wording : "Comparez 5 devis sans spam" vs "Obtenez 5 devis gratuits"

---

## 🎯 WORDING CIBLE (Mots-Clés à Utiliser Partout)

### À Ajouter :
- ✅ "Volume IA identique"
- ✅ "Devis comparables" (pas "comparatifs")
- ✅ "Dossier anonyme"
- ✅ "Zéro harcèlement commercial"
- ✅ "Déménageurs vérifiés"
- ✅ "3-5 devis" (pas "5 devis")
- ✅ "En 7 jours max" ou "sous 7j" (garanti)
- ✅ "Centralisation échanges"

### À Réduire/Supprimer :
- ❌ "Cahier des charges" → Remplacer par "dossier" ou "volume IA"
- ❌ "Comparables" seul → Préciser "sur base identique"
- ❌ "Estimation rapide" en avant → C'est un outil annexe

---

## 📊 MÉTRIQUE DE SUCCÈS

**Avant** :
- Conversion form : ~2-3% (estimation)
- Abandon form : Raison inconnue
- Message peu clair

**Après** :
- Conversion form : 3-5% (+50-100%)
- Message clair : "Comparaison vraie + anonymat"
- USP différenciants mis en avant

**Mesure** :
- Taux de conversion form (Google Analytics)
- Temps passé sur page (Analytics)
- Taux de rebond homepage

---

## 🗂️ FICHIERS CONCERNÉS (11 sites × fichiers)

### Core Pages (priorité haute)
```
sites/{ville}/app/page.tsx                    # Homepage
sites/{ville}/app/services/page.tsx           # Services
sites/{ville}/app/faq/page.tsx                # FAQ
sites/{ville}/app/comment-ca-marche/page.tsx  # Process
```

### Components (priorité haute)
```
components/Hero.tsx           # H1 + description
components/ValueTriad.tsx     # 4 garanties
components/HowItWorks.tsx     # 3 étapes
components/LeadForm.tsx       # Formulaire
components/CtaPrimary.tsx     # CTA buttons
components/StickyCTA.tsx      # CTA sticky
```

### Pages Secondaires (priorité moyenne)
```
sites/{ville}/app/partenaires/page.tsx
sites/{ville}/app/estimation-rapide/layout.tsx
sites/{ville}/app/inventaire-ia/layout.tsx
```

---

## 📝 PLAN D'EXÉCUTION (3 Phases)

### Phase 1 : Audit & Analyse (2h)

**Objectif** : Comprendre le wording actuel et identifier tous les points à changer

**Actions** :
1. Lister tous les wordings actuels (H1, descriptions, CTA, FAQ)
2. Mapper avec les 5 USP identifiés
3. Identifier gaps et incohérences
4. Prioriser les changements (impact conversion)

**Livrable** : Document `context.md` avec audit complet

---

### Phase 2 : Création Nouveau Wording (3h)

**Objectif** : Créer le nouveau wording optimisé pour chaque élément

**Actions** :
1. **Homepage** :
   - H1 optimisé (focus comparaison + anonymat)
   - Description Hero (USP clairs)
   - Meta description (150-160 car)
   - Value Triad (4 USP Moverz)

2. **Components** :
   - CTA buttons (bénéfice clair)
   - Lead Form (message rassurant anonymat)
   - How It Works (4 étapes avec anonymat)

3. **FAQ** :
   - 6 nouvelles questions (anonymat, comparabilité, vérification)

4. **Services** :
   - Description claire de l'offre vs concurrence

**Livrable** : Document `wording-nouveau.md` avec tous les textes

---

### Phase 3 : Implémentation + Test (3h)

**Objectif** : Déployer le nouveau wording et tester

**Actions** :
1. Modifier fichiers source (`components/`, `lib/`)
2. Sync 11 sites
3. Test 2-3 sites en local
4. Commit + push GitHub
5. Déploiement CapRover
6. Vérification prod (2-3 sites)

**Livrable** : 11 sites avec nouveau wording déployé

---

## 🎯 USP HIERARCHY (Pour Priorisation Messages)

### Messages Priorité 1 (Homepage, CTA)

**#1 : Devis comparables sur base identique**
```
"Volume IA identique pour 3-5 devis"
"Comparez enfin des devis réels"
"Fini les estimations fantaisistes"
```

**#2 : Anonymat / Protection harcèlement**
```
"Dossier anonyme, zéro harcèlement"
"Seulement un email suffit"
"Vous choisissez, PUIS on lève l'anonymat"
```

### Messages Priorité 2 (Services, FAQ)

**#3 : Déménageurs vérifiés**
```
"Vérification Google notes + solvabilité"
"Sélection rigoureuse avant envoi dossier"
```

**#4 : Concurrence = Meilleurs prix**
```
"3-5 déménageurs en concurrence"
"Économisez vs appel direct"
```

**#5 : Gain de temps**
```
"30 min photos → devis en 7j max"
"Zéro appel, zéro RDV"
```

---

## 📊 PAIN POINTS CLIENTS (Recherche Effectuée)

### Sources Analysées
1. ✅ DGCCRF - Enquêtes secteur déménagement
2. ✅ Trustpilot - Avis négatifs déménageurs
3. ✅ Forums / Reddit (tentative, résultats limités)

### Pain Points Identifiés

**#1 : Devis incomparables** (Confirmé DGCCRF + logique)
- Estimations volume différentes
- Services pas clairs
- Impossible de comparer

**#2 : Harcèlement commercial** (Implicite DGCCRF "coordonnées transmises sans consentement")
- Spam appels/emails
- Coordonnées partagées sans accord

**#3 : Estimations non fiables** (Confirmé Trustpilot + Selectra)
- Sous-estimation pour gagner contrat
- Surcoûts jour J

**#4 : Sous-traitance cachée** (Confirmé DGCCRF)
- Client ne sait pas qui va venir
- Qualité variable

**#5 : Faux avis** (Confirmé DGCCRF)
- Avis biaisés/achetés
- Perte de confiance

---

## 🎨 EXEMPLES WORDING (À Valider)

### Meta Description Homepage (158 car)
```
"Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme, déménageurs vérifiés, zéro harcèlement. 
30 min photos → devis en 7j max. Vraie comparaison."
```

### H1 Hero (Alternative 1)
```
"Comparez 3-5 devis de déménageurs sans harcèlement commercial"
```

### H1 Hero (Alternative 2)
```
"Des devis enfin comparables, un dossier enfin anonyme"
```

### Description Hero (Alternative 1)
```
"Volume IA identique envoyé aux déménageurs. 
Dossier anonyme (seulement email), zéro spam. 
Vous recevez 3-5 devis comparables, vous choisissez."
```

### Description Hero (Alternative 2)
```
"Fini les devis incomparables et le harcèlement commercial. 
Volume IA identique, dossier anonyme, déménageurs vérifiés. 
30 min pour tout → 3-5 devis en 7j."
```

### Value Triad (4 Garanties)

**Actuellement** :
- IA précise
- Transparence totale
- 100% gratuit
- Experts locaux

**Proposition** :
- **Devis comparables** : "Volume IA identique pour tous"
- **Zéro harcèlement** : "Dossier anonyme, seulement email"
- **Déménageurs vérifiés** : "Google notes + solvabilité"
- **100% gratuit** : "Service sans engagement"

---

## ⚠️ POINTS D'ATTENTION

### Wording à Valider avec Guillaume

1. **"Harcèlement commercial"** : Trop fort ? Ou juste ? Alternative : "spam commercial", "appels incessants"

2. **"Dossier anonyme"** : Clair pour grand public ? Alternative : "Coordonnées protégées", "Vie privée respectée"

3. **"Volume IA identique"** : Compréhensible ? Alternative : "Même estimation pour tous", "Base commune"

4. **"3-5 devis"** : Dire "jusqu'à 5" ou "3-5" ou "minimum 3" ?

5. **"Économisez 40%"** : Garder ou retirer ? (Guillaume pas sûr du chiffre)

6. **"Cahier des charges"** : Remplacer partout par "dossier" ou "estimation IA" ?

---

## 🔗 LIENS AVEC AUTRES TÂCHES

**Dépendances** :
- ✅ TASK-LEADGEN-01 : Metadata optimisées (titles OK, descriptions à aligner)
- ⏳ TASK-038 : Bug FAQ global (à résoudre avant refonte FAQ)

**Synergie** :
- Cette tâche améliore conversion form
- TASK-LEADGEN-01 améliore CTR SERP
- Ensemble : Trafic × Conversion = +Leads

---

## 📈 ROI ATTENDU

**Investment** :
- 6-8h travail (wording + implémentation + déploiement)

**Return** :
- Conversion form : +50-100% (+1-2%)
- Leads : +200-400/mois sur 11 sites
- Clarté offre : Moins d'abandons form, moins de questions support

**Payback** : 
- Si +300 leads/mois × 5% conversion × 500€ ticket moyen = +7500€/mois
- ROI : ~1000% en 1 mois

---

## 🚀 PROCHAINES ÉTAPES (Quand Démarrée)

1. **Session 1** : Audit complet wording actuel (2h)
2. **Session 2** : Création nouveau wording (3h)
3. **Session 3** : Implémentation + déploiement (3h)

**Critères Definition of Done** :
- [ ] Wording clair sur 5 USP sur homepage
- [ ] 6 nouvelles FAQ ajoutées
- [ ] Meta descriptions alignées (150-160 car)
- [ ] 11 sites déployés
- [ ] Tests 2-3 sites validés
- [ ] Documentation commits + tests.md

---

## 📚 RESSOURCES

**Documents créés** :
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/README.md` (ce fichier)
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/context.md` (audit à créer)
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/wording-nouveau.md` (propositions à créer)
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/progress.md` (journal)
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/commits.md` (SHA)
- `.cursor/tasks/[P1]-TASK-047-wording-offre-refonte/decisions.md` (choix)

**Références externes** :
- DGCCRF : [Enquête déménagement](https://www.economie.gouv.fr/dgccrf/laction-de-la-dgccrf/les-enquetes/demenagement-attention-la-sous-traitance-et-aux-devis-en)
- Pain points concurrence documentés

---

*Créée le* : 05/11/2025  
*Dernière mise à jour* : 05/11/2025

