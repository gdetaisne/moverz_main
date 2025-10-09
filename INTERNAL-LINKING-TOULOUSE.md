# 🔗 MISSION : INTERNAL LINKING SEO - BLOG TOULOUSE

**Objectif :** Créer un maillage interne optimal pour les 93 articles du blog Toulouse selon les best practices SEO.

---

## 📋 CONTEXTE

**Localisation :** `sites/toulouse/content/blog/`

**Structure actuelle :**
- 10 piliers SEO dans `piliers/`
- 83 satellites dans `satellites/`
- **PROBLÈME :** 0 liens internes actuellement

**Impact SEO recherché :**
- Cocons sémantiques (piliers = hubs)
- Distribution du PageRank
- Meilleur crawl Google
- Expérience utilisateur améliorée

---

## 🎯 STRATÉGIE DE MAILLAGE (BEST PRACTICES SEO)

### 1. Architecture en Cocons Sémantiques

```
PILIER (hub)
  ↑ ↑ ↑
  │ │ │
Sat Sat Sat → Pilier connexe
```

**Principe :** Les piliers sont des hubs qui reçoivent des liens de leurs satellites et se lient entre eux.

### 2. Les 10 Piliers Toulouse

1. `aide-au-demenagement-toulouse.md`
2. `demenagement-d-entreprise-toulouse.md`
3. `demenagement-international-toulouse.md`
4. `demenagement-pas-cher-toulouse.md`
5. `demenagement-piano-toulouse.md`
6. `demenageur-toulouse.md` ← **PILIER CENTRAL**
7. `garde-meuble-toulouse.md`
8. `location-camion-demenagement-toulouse.md`
9. `petit-demenagement-toulouse.md`
10. `prix-demenagement-toulouse.md`

### 3. Mapping Satellites → Piliers

Chaque satellite doit pointer vers 1-2 piliers pertinents :

**Satellites "Urgent/Express" → `demenageur-toulouse.md`**
- demenagement-urgent-toulouse.md
- demenagement-express-toulouse.md
- demenagement-flash-toulouse.md
- demenagement-rapide-toulouse.md
- demenagement-24h-*

**Satellites "Pas cher" → `demenagement-pas-cher-toulouse.md`**
- cartons-pas-chers-*
- demenager-soi-meme-*
- optimiser-le-volume-*
- entraide-demenagement-*
- prix-demenagement-pas-cher-*

**Satellites "International" → `demenagement-international-toulouse.md`**
- demenagement-avion-toulouse.md
- demenagement-bateau-toulouse.md
- demenager-au-canada-*
- assurance-demenagement-international-*
- douane-demenagement-international-*
- formalites-demenagement-international-*
- prix-demenagement-international-*
- transport-meuble-international-*
- garde-meuble-international-*

**Satellites "Piano" → `demenagement-piano-toulouse.md`**
- monte-charge-piano-*
- transport-piano-a-queue-*
- transport-piano-droit-*
- prix-demenagement-piano-*

**Satellites "Garde-meuble" → `garde-meuble-toulouse.md`**
- box-stockage-toulouse.md
- self-stockage-toulouse.md

**Satellites "Location" → `location-camion-demenagement-toulouse.md`**
- location-utilitaire-toulouse.md

**Satellites "Transport spécifique" → `demenageur-toulouse.md` + pilier spécifique**
- demenagement-metro/bus/tram/train → `demenageur-toulouse.md`
- demenagement-camion/moto/velo → `location-camion-demenagement-toulouse.md`

**Satellites "Services" → piliers multiples**
- demenagement-emballage → `demenageur-toulouse.md` + `demenagement-pas-cher-toulouse.md`
- demenagement-nettoyage → `demenageur-toulouse.md`
- demenagement-debarras → `demenageur-toulouse.md`

**Satellites "Types de logement" → piliers multiples**
- demenagement-studio → `petit-demenagement-toulouse.md` + `demenagement-pas-cher-toulouse.md`
- demenagement-colocation → `petit-demenagement-toulouse.md`

**Satellites "Professionnel" → `demenagement-d-entreprise-toulouse.md`**
- demenagement-bureau-toulouse.md
- demenagement-entreprise-toulouse.md (satellite)
- porteurs-demenagement-*
- demenageur-professionnel-*

---

## 🔧 RÈGLES D'IMPLÉMENTATION

### ✅ FAIRE

**Placement des liens :**
- Dans le corps du texte (contextuel)
- Dans les paragraphes pertinents
- Naturellement intégrés dans une phrase

**Ancres de liens :**
- Descriptives et variées
- Inclure le mot-clé cible
- Varier les formulations

**Exemples d'ancres :**
```markdown
[déménageur professionnel à Toulouse](/blog/piliers/demenageur-toulouse)
[notre service de déménagement pas cher](/blog/piliers/demenagement-pas-cher-toulouse)
[garde-meuble à Toulouse](/blog/piliers/garde-meuble-toulouse)
[obtenir un devis précis](/blog/piliers/prix-demenagement-toulouse)
```

**Quantité :**
- Satellites : 2-3 liens vers piliers
- Piliers : 3-5 liens (vers autres piliers + 1-2 satellites clés)

### ❌ NE PAS FAIRE

- Ancres génériques ("cliquez ici", "en savoir plus")
- Sur-optimisation (même ancre répétée)
- Trop de liens (> 5 par article)
- Liens non pertinents
- Liens en début/fin uniquement

---

## 📝 FORMAT DES LIENS

**Structure URL :**
```markdown
Piliers : /blog/piliers/[nom-fichier-sans-.md]
Satellites : /blog/satellites/[nom-fichier-sans-.md]
```

**Exemples concrets :**
```markdown
[déménageur à Toulouse](/blog/piliers/demenageur-toulouse)
[déménagement urgent](/blog/satellites/demenagement-urgent-toulouse)
```

---

## 🎯 STRATÉGIE PAR TYPE D'ARTICLE

### Pour les SATELLITES

**Structure type :**

1. **Introduction** : Lien vers pilier parent
   - Exemple : "Pour un [déménagement à Toulouse](/blog/piliers/demenageur-toulouse), notre service urgent..."

2. **Corps du texte** : 1-2 liens contextuels
   - Vers pilier parent
   - Vers pilier connexe si pertinent

3. **Conclusion** : Appel à l'action vers pilier
   - Exemple : "Consultez notre [guide complet des prix](/blog/piliers/prix-demenagement-toulouse)"

### Pour les PILIERS

**Liens entre piliers (priorité haute) :**

`demenageur-toulouse.md` (pilier central) → liens vers :
- `prix-demenagement-toulouse.md`
- `demenagement-pas-cher-toulouse.md`
- `demenagement-d-entreprise-toulouse.md`

`prix-demenagement-toulouse.md` → liens vers :
- `demenageur-toulouse.md`
- `demenagement-pas-cher-toulouse.md`
- `location-camion-demenagement-toulouse.md`

`demenagement-pas-cher-toulouse.md` → liens vers :
- `location-camion-demenagement-toulouse.md`
- `petit-demenagement-toulouse.md`
- `aide-au-demenagement-toulouse.md`

`demenagement-international-toulouse.md` → liens vers :
- `demenageur-toulouse.md`
- `prix-demenagement-toulouse.md`
- `garde-meuble-toulouse.md`

`garde-meuble-toulouse.md` → liens vers :
- `demenageur-toulouse.md`
- `prix-demenagement-toulouse.md`

---

## 🚀 PROCESSUS D'EXÉCUTION

### Phase 1 : Piliers (PRIORITÉ)

1. Commence par `demenageur-toulouse.md` (hub central)
2. Ajoute 4-5 liens vers autres piliers
3. Continue avec les 9 autres piliers
4. Chaque pilier doit avoir 3-5 liens vers autres piliers

### Phase 2 : Satellites "Urgent/Express" (17 fichiers)

Ajoute 2 liens dans chaque :
- 1 vers `demenageur-toulouse.md`
- 1 vers `prix-demenagement-toulouse.md`

### Phase 3 : Satellites "Pas cher" (8 fichiers)

Ajoute 2 liens dans chaque :
- 1 vers `demenagement-pas-cher-toulouse.md`
- 1 vers `location-camion-demenagement-toulouse.md` ou `petit-demenagement-toulouse.md`

### Phase 4 : Satellites "International" (9 fichiers)

Ajoute 2 liens dans chaque :
- 1 vers `demenagement-international-toulouse.md`
- 1 vers `demenageur-toulouse.md` ou `prix-demenagement-toulouse.md`

### Phase 5 : Autres satellites (49 fichiers)

Selon mapping ci-dessus, ajoute 2-3 liens pertinents

---

## ✅ CHECKLIST DE VALIDATION

Pour chaque article modifié :

- [ ] 2-5 liens internes ajoutés
- [ ] Ancres descriptives et variées
- [ ] Liens contextuels (dans paragraphes)
- [ ] URLs correctes (`/blog/piliers/` ou `/blog/satellites/`)
- [ ] Liens pertinents (thématique cohérente)
- [ ] Pas de sur-optimisation
- [ ] Intégration naturelle dans le texte

---

## 📊 RÉSULTAT ATTENDU

**Avant :**
- 0 liens internes
- Aucun cocon sémantique
- Mauvaise distribution PageRank

**Après :**
- ~200-250 liens internes
- 10 cocons sémantiques (1 par pilier)
- Distribution optimale du PageRank
- Meilleur crawl Google
- Temps sur site augmenté

---

## 🎯 MÉTRIQUES DE SUCCÈS

- Chaque pilier reçoit 5-15 liens de satellites
- Chaque pilier pointe vers 3-5 autres piliers
- Chaque satellite a 2-3 liens sortants
- `demenageur-toulouse.md` est le hub le plus lié (20+ liens entrants)

---

## 💡 EXEMPLES CONCRETS

### Exemple Satellite → Pilier

**Fichier:** `satellites/demenagement-urgent-toulouse.md`

**Avant (paragraphe existant) :**
```markdown
Notre service de déménagement urgent à Toulouse vous permet...
```

**Après (avec lien) :**
```markdown
Notre service de [déménagement urgent à Toulouse](/blog/piliers/demenageur-toulouse) vous permet...
```

### Exemple Pilier → Pilier

**Fichier:** `piliers/demenageur-toulouse.md`

**Ajout dans section "Nos services" :**
```markdown
Nous proposons également des [solutions économiques](/blog/piliers/demenagement-pas-cher-toulouse) 
adaptées à tous les budgets, ainsi qu'un service de [garde-meuble sécurisé](/blog/piliers/garde-meuble-toulouse) 
pour vos besoins de stockage.
```

---

## 🚨 POINTS D'ATTENTION

1. **Ne PAS modifier** :
   - Le front matter (métadonnées en haut)
   - La structure des titres
   - Le contenu principal

2. **SEULEMENT ajouter** :
   - Des liens markdown `[texte](/url)`
   - Dans les paragraphes existants
   - De manière naturelle

3. **Tester** :
   - URLs valides
   - Pas de liens cassés
   - Cohérence thématique

---

## 📁 FICHIERS À MODIFIER

**Total : 93 fichiers**
- 10 piliers dans `sites/toulouse/content/blog/piliers/`
- 83 satellites dans `sites/toulouse/content/blog/satellites/`

---

**Date de création :** 9 octobre 2025  
**Version :** 1.0  
**Statut :** Prêt pour exécution

