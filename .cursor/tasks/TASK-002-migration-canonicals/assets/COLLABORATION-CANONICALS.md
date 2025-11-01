# 🤝 Collaboration : Migration Canonicals Multi-Personnes

**Date :** 31 octobre 2025  
**Statut :** 🔴 RISQUES ÉLEVÉS DE CONFLITS

---

## 🎯 La Question

> **Si dans le même temps quelqu'un d'autre touche au site sur Cursor, ça va poser problème ?**

**Réponse courte :** 🔴 **OUI, risque ÉLEVÉ de conflits Git**

---

## 🔥 Zones de Conflits Probables

### 1️⃣ **cityData.ts — CRITIQUE** 🔴

#### Localisation
`sites/{ville}/lib/cityData.ts`

#### Problème
**Fichier UNIQUE partagé par toutes les villes** :

```typescript
// Ce fichier contient les 11 villes
export const cityData: Record<string, CityData> = {
  marseille: { siteUrl: 'https://...' },
  toulouse: { siteUrl: 'https://...' },
  lyon: { siteUrl: 'https://...' },
  bordeaux: { siteUrl: 'https://...' },
  // ... 7 autres villes
};
```

#### Scénario de Conflit
```
Personne A (toi)          Personne B (collègue)
│                         │
├─ Pull main             ├─ Pull main
├─ Crée branche          ├─ Crée branche
│  canonicals            │  fix-blog
│                         │
├─ Modifie cityData.ts   │
│  (ajoute slash)        │
│                         ├─ Modifie cityData.ts
│                         │  (change téléphone Nice)
│                         │
├─ Commit                 ├─ Commit
├─ Push                   ├─ Push
│                         │
│                         ├─ MERGE → ❌ CONFLIT
```

**Type de conflit :** Même fichier, mêmes lignes possibles

---

### 2️⃣ **next.config.mjs — CRITIQUE** 🔴

#### Localisation
`sites/{ville}/next.config.mjs`

#### Problème
**242 redirections 301** à modifier :

```javascript
async redirects() {
  return [
    // 242 lignes de redirections
  ];
}
```

#### Scénario de Conflit
Si quelqu'un ajoute/modifie une redirection pendant que tu modifies le slash final :

```
Toi:        { source: '/blog/x', destination: '/blog/y/' }  // Slash ajouté
Collègue:   { source: '/new-page', destination: '/target' } // Nouvelle redirection

→ CONFLIT dans async redirects()
```

**Type de conflit :** Même fonction, merge complexe

---

### 3️⃣ **Fichiers de Pages Individuelles — MOYEN** 🟡

#### Exemples
- `app/partenaires/page.tsx`
- `app/blog/page.tsx`
- `app/comment-ca-marche/page.tsx`

#### Scénario de Conflit
Si quelqu'un modifie le contenu d'une page pendant que tu changes le canonical :

```
Toi:       canonical: getCanonicalUrl('partenaires')  // Canonical
Collègue:  title: "Nouveau titre partenaires"        // Titre

→ CONFLIT POTENTIEL si même bloc metadata
```

**Type de conflit :** Même fichier, zones proches

---

### 4️⃣ **Liens Internes (300-500 liens) — ÉLEVÉ** 🔴

#### Localisation
Partout dans les composants

#### Problème
Tu vas modifier 300-500 liens :

```tsx
<Link href="/blog/">Blog</Link>  // Ajout du slash
```

Pendant ce temps, le collègue peut :
- Ajouter de nouveaux liens
- Modifier du contenu autour
- Changer la structure des composants

**Type de conflit :** Nombreux fichiers touchés simultanément

---

### 5️⃣ **Breadcrumbs (188 utilisations) — MOYEN** 🟡

#### Localisation
Dans toutes les pages qui utilisent `<Breadcrumbs>`

#### Problème
Tu vas modifier :

```tsx
items={[
  { label: "Blog", href: "/blog/" }  // Slash ajouté
]}
```

Si le collègue modifie le même composant parent → conflit.

---

## 📊 Probabilité de Conflits par Zone

| Zone | Nb Fichiers | Probabilité Conflit | Impact |
|------|-------------|---------------------|--------|
| **cityData.ts** | 1 (partagé 11 villes) | 🔴 90% | Bloquant |
| **next.config.mjs** | 11 fichiers | 🔴 70% | Majeur |
| **Pages individuelles** | ~50 fichiers | 🟡 40% | Moyen |
| **Liens internes** | ~150 fichiers | 🔴 60% | Majeur |
| **Breadcrumbs** | ~80 fichiers | 🟡 50% | Moyen |
| **robots.txt** | 11 fichiers | 🟢 10% | Faible |

---

## 🚨 Scénarios Catastrophe

### Scénario 1 : Merge Cassé
```bash
# Toi
git checkout -b feat/canonicals-slash
# ... 500 modifications sur 200 fichiers

# Collègue (en parallèle)
git checkout -b fix/update-prices
# ... 50 modifications sur 30 fichiers

# Plus tard
git merge feat/canonicals-slash   # OK
git merge fix/update-prices       # ❌ 27 CONFLITS

# Résolution manuelle : 4-6 heures 😱
```

---

### Scénario 2 : Modifications Écrasées
```bash
# Collègue merge en premier
git merge fix/update-prices  # ✅ OK

# Toi tu merges après
git merge feat/canonicals-slash  # ✅ OK techniquement

# MAIS : Tes modifications de slash écrasent les nouvelles URLs du collègue
# Résultat : Site cassé en production 🔥
```

---

### Scénario 3 : Divergence Massive
```bash
# Après 2 semaines de travail parallèle
git log --oneline --graph

*   Merge feat/canonicals-slash (toi)
|\  
| *   Merge fix/blog-refactor (collègue)
| |\
| | *   Merge feat/new-pages (collègue)
* | |   Commit: Add slash to cityData
  | |
  | *   Commit: Refactor blog structure
  
# Impossible à merger proprement
# Seule solution : Rebase ou recommencer 😱
```

---

## ✅ Solutions pour Éviter les Conflits

### Solution A : **Coordination Stricte** (Recommandé) ✅

#### 1. Feature Freeze
```
🚫 PENDANT LA MIGRATION CANONICALS :
   - Aucune modification de cityData.ts
   - Aucune nouvelle redirection dans next.config.mjs
   - Modifications de contenu OK SAUF metadata
   - Nouvelles pages OK SI canonical correct dès le départ
```

#### 2. Communication
```markdown
**Slack/Discord/Email :**

"🚧 Migration Canonicals en cours (Nice)
Du 1er au 3 nov 2025
⚠️ Ne pas toucher :
  - sites/nice/lib/cityData.ts
  - sites/nice/next.config.mjs
  - sites/nice/app/*/page.tsx (metadata)
  
✅ OK pour :
  - Contenu texte (hors metadata)
  - Nouveaux composants
  - Styles CSS
"
```

#### 3. Branches Protégées
```bash
# Sur GitHub/GitLab
# Bloquer push direct sur main
# Forcer pull requests
# Code review obligatoire
```

---

### Solution B : **Travail Séquentiel** (Safe) ✅

#### Planning
```
Semaine 1 : Personne A → Migration Canonicals Nice
            Personne B → ❌ FREEZE ou travail autre ville

Semaine 2 : Personne A → Migration Canonicals Lyon
            Personne B → ✅ Modifications Nice OK (canonicals terminés)

Semaine 3 : Personne A → Migration Canonicals Bordeaux
            Personne B → ✅ Modifications Lyon OK
```

**Avantage :** ZÉRO conflit  
**Inconvénient :** Plus lent (1 mois au lieu de 2 semaines)

---

### Solution C : **Division par Ville** (Compromis) ✅

#### Principe
Chaque personne prend des villes différentes :

```
Personne A : Nice, Lyon, Marseille
Personne B : Bordeaux, Toulouse, Nantes

# Seul conflit possible : cityData.ts (1 fichier partagé)
```

#### Mitigation cityData.ts
```bash
# Stratégie : Merger fréquemment
git pull origin main  # Toutes les heures
git merge main        # Dans ta branche
```

**Avantage :** Parallélisation possible  
**Inconvénient :** Coordination nécessaire sur cityData.ts

---

### Solution D : **Scripts + Merge Final** (Avancé) ⚠️

#### Principe
```bash
# Personne A : Crée les scripts d'automatisation
./scripts/fix-internal-links.sh nice
./scripts/fix-breadcrumbs.sh nice
./scripts/fix-redirects.sh nice

# Commit scripts seulement (pas les résultats)

# Personne B : Travaille normalement sur Nice

# Plus tard (quand B a fini) :
# Personne A : Exécute les scripts sur Nice
# Merge rapide car changements mécaniques
```

**Avantage :** Personne B pas bloquée  
**Inconvénient :** Risque si B ajoute nouveaux liens sans slash

---

## 📋 Checklist Anti-Conflits

### Avant de Commencer
- [ ] Annoncer la migration à l'équipe (Slack/email)
- [ ] Définir qui fait quoi (villes par personne)
- [ ] Bloquer modifications sur cityData.ts (communication)
- [ ] Créer une branche dédiée : `feat/canonicals-slash-{ville}`

### Pendant la Migration
- [ ] Pull origin/main **toutes les heures**
- [ ] Merge main dans ta branche **quotidiennement**
- [ ] Push ta branche régulièrement (backup cloud)
- [ ] Communiquer avancement (Slack)

### Avant de Merger
- [ ] Pull origin/main une dernière fois
- [ ] Merge main dans ta branche
- [ ] Résoudre conflits si nécessaire
- [ ] Tests locaux OK
- [ ] Code review par un pair
- [ ] Merge dans main via Pull Request

---

## 🛠️ Commandes Git Recommandées

### 1. Créer Branche Dédiée
```bash
git checkout main
git pull origin main
git checkout -b feat/canonicals-slash-nice

# Faire les modifications
git add .
git commit -m "feat(nice): Add trailing slash to canonicals"
git push origin feat/canonicals-slash-nice
```

---

### 2. Synchroniser Régulièrement
```bash
# Toutes les heures ou avant gros changement
git fetch origin
git merge origin/main

# Résoudre conflits si nécessaire
git status
# Modifier les fichiers en conflit
git add .
git commit -m "merge: Resolve conflicts with main"
```

---

### 3. Stratégie de Merge

#### Option A : Merge Commit (Simple)
```bash
git checkout main
git pull origin main
git merge feat/canonicals-slash-nice
git push origin main
```

#### Option B : Rebase (Historique Propre)
```bash
git checkout feat/canonicals-slash-nice
git rebase main  # Rejoue tes commits sur main à jour

# Résoudre conflits commit par commit
git add .
git rebase --continue

# Puis merge
git checkout main
git merge feat/canonicals-slash-nice --ff-only
```

#### Option C : Squash Merge (1 Commit Final)
```bash
git checkout main
git merge --squash feat/canonicals-slash-nice
git commit -m "feat(nice): Complete canonicals migration with trailing slash

- Add trailing slash to cityData.ts
- Update all page canonicals
- Fix internal links (500+ links)
- Update breadcrumbs (188 instances)
- Fix redirects in next.config.mjs (242 redirects)

Tests: ✅ All passing
SEO Impact: Estimated +15-20% consolidation"

git push origin main
```

---

## 🔍 Détection de Conflits Avant Merge

### Script de Pré-Validation
```bash
#!/bin/bash
# check-conflicts.sh

echo "🔍 Vérification des conflits potentiels..."

# Récupérer les fichiers modifiés dans main depuis ta branche
git fetch origin
CONFLICTS=$(git diff --name-only HEAD origin/main)

if [ -z "$CONFLICTS" ]; then
  echo "✅ Aucun conflit détecté"
  exit 0
else
  echo "⚠️ Fichiers modifiés dans main :"
  echo "$CONFLICTS"
  
  # Vérifier fichiers critiques
  if echo "$CONFLICTS" | grep -q "cityData.ts"; then
    echo "🔴 CRITIQUE : cityData.ts modifié dans main"
    echo "   → Coordination nécessaire"
  fi
  
  if echo "$CONFLICTS" | grep -q "next.config.mjs"; then
    echo "🟡 ATTENTION : next.config.mjs modifié dans main"
    echo "   → Vérifier redirections"
  fi
  
  echo ""
  echo "💡 Recommandation : Merger main dans ta branche avant de continuer"
  echo "   git merge origin/main"
fi
```

---

## 📊 Tableau des Risques par Approche

| Approche | Vitesse | Risque Conflits | Effort Résolution | Recommandation |
|----------|---------|-----------------|-------------------|----------------|
| **Coordination Stricte** | 🟡 Moyen | 🟢 Faible (10%) | 🟢 Faible | ✅✅ Idéal |
| **Travail Séquentiel** | 🔴 Lent | 🟢 Nul (0%) | 🟢 Nul | ✅ Safe |
| **Division par Ville** | 🟢 Rapide | 🟡 Moyen (40%) | 🟡 Moyen | ✅ Compromis |
| **Scripts + Merge** | 🟢 Rapide | 🟡 Moyen (30%) | 🟡 Moyen | ⚠️ Avancé |
| **Travail Parallèle Sans Coordination** | 🟢 Rapide | 🔴 ÉLEVÉ (90%) | 🔴 ÉNORME | ❌ Catastrophe |

---

## 🎯 Recommandation Finale

### Pour Nice (Ville Modèle)
**Coordination Stricte + Travail Séquentiel**

```
Phase 1 : Feature Freeze Nice (1 semaine)
├─ Annoncer à l'équipe
├─ Toi : Migration complète Nice
├─ Collègues : Travaillent sur autres villes
└─ Merge après validation tests

Phase 2 : Nice terminé → Équipe peut reprendre
```

**Effort coordination :** 30 min (communication)  
**Risque conflits :** 5-10%  
**Gain temps :** -0% (mais sécurité maximale)

---

### Pour les 10 Autres Villes
**Division par Ville + Synchronisation Horaire**

```
Personne A : Nice ✅, Lyon, Marseille, Bordeaux, Toulouse
Personne B : Nantes, Lille, Rennes, Rouen, Strasbourg, Montpellier

# Règle : Merge origin/main toutes les heures
# Coordination : cityData.ts (1 fichier critique)
```

**Effort coordination :** 1h/jour (sync)  
**Risque conflits :** 20-30%  
**Gain temps :** +50% (parallélisation)

---

## 🆘 Résolution de Conflits (Si Ça Arrive)

### 1. Identifier le Conflit
```bash
git merge origin/main

# Sortie :
Auto-merging sites/nice/lib/cityData.ts
CONFLICT (content): Merge conflict in sites/nice/lib/cityData.ts
Automatic merge failed; fix conflicts and then commit the result.
```

---

### 2. Voir les Conflits
```bash
git status

# Sortie :
Unmerged paths:
  both modified:   sites/nice/lib/cityData.ts
```

---

### 3. Ouvrir le Fichier
```typescript
// sites/nice/lib/cityData.ts

nice: {
  slug: 'nice',
  name: 'Nice',
<<<<<<< HEAD (ta version)
  siteUrl: 'https://devis-demenageur-nice.fr/',  // Avec slash
=======
  phone: '+33-4-93-00-00-00',  // Nouveau téléphone
>>>>>>> origin/main (version collègue)
  coordinates: {
    // ...
  }
}
```

---

### 4. Résoudre Manuellement
```typescript
// GARDER LES DEUX MODIFICATIONS
nice: {
  slug: 'nice',
  name: 'Nice',
  siteUrl: 'https://devis-demenageur-nice.fr/',  // ✅ Ton slash
  phone: '+33-4-93-00-00-00',  // ✅ Son téléphone
  coordinates: {
    // ...
  }
}
```

---

### 5. Marquer Résolu
```bash
git add sites/nice/lib/cityData.ts
git commit -m "merge: Resolve conflicts in cityData.ts (slash + phone)"
```

---

## ⚡ Commandes d'Urgence

### Annuler un Merge en Cours
```bash
# Si conflit trop complexe
git merge --abort

# Recommencer plus tard
```

---

### Revenir en Arrière (Avant Merge)
```bash
# Annuler le dernier merge
git reset --hard HEAD~1

# ATTENTION : Perte des modifications non commitées
```

---

### Stash Temporaire
```bash
# Mettre de côté tes modifications
git stash

# Faire autre chose (pull, etc.)
git pull origin main

# Récupérer tes modifications
git stash pop
```

---

## 📞 Communication Template

### Message d'Annonce (Début)
```markdown
🚧 **Migration Canonicals - Nice**

📅 Date : 1-3 novembre 2025
👤 Responsable : [Ton nom]
🎯 Objectif : Ajouter slash final aux canonicals

⚠️ **Fichiers Bloqués :**
- `sites/nice/lib/cityData.ts` ❌
- `sites/nice/next.config.mjs` ❌
- Metadata des pages Nice ❌

✅ **Modifications OK :**
- Contenu texte (hors metadata)
- Styles CSS
- Autres villes (sauf cityData.ts)

💬 Questions : MP moi sur Slack

Merci ! 🙏
```

---

### Message de Fin
```markdown
✅ **Migration Canonicals Nice TERMINÉE**

📅 Date : 3 novembre 2025
🎉 Statut : Mergé dans main

✅ **Nice débloqu é:**
Toutes modifications Nice possibles

📊 **Résultats :**
- 500+ liens mis à jour
- 188 breadcrumbs corrigés
- 242 redirections fixées
- Tests : ✅ Passing

🚀 **Prochaine ville :** Lyon (semaine prochaine)
```

---

## ✅ Conclusion

### Réponse à Ta Question
> **Si quelqu'un d'autre touche au site, ça va poser problème ?**

**OUI, SURTOUT SI :**
- ✅ Modifications de `cityData.ts` (fichier partagé 11 villes)
- ✅ Ajout/modif redirections dans `next.config.mjs`
- ✅ Changements metadata des pages
- ✅ Ajout de nouveaux liens internes

**NON, PAS DE PROBLÈME SI :**
- ✅ Modifications de contenu texte uniquement
- ✅ Changements CSS/styles
- ✅ Travail sur une autre ville (sauf cityData.ts)
- ✅ Nouveaux composants indépendants

---

### Stratégie Recommandée
**🎯 Coordination Stricte + Feature Freeze Temporaire**

1. **Annonce** à l'équipe (30 min avant)
2. **Travail séquentiel** sur Nice (1 semaine)
3. **Merge + tests** après Nice terminé
4. **Parallélisation** pour les 10 autres villes

**Risque conflits :** 5-10% (acceptable)  
**Effort coordination :** 1h  
**Gain sérénité :** MAXIMUM ✅

---

**Document créé le :** 31 octobre 2025  
**Dernière mise à jour :** 31 octobre 2025  
**Statut :** ✅ PRÊT POUR COORDINATION ÉQUIPE

