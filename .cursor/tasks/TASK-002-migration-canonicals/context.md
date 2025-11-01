# Contexte : TASK-002 - Migration Canonicals

## Problème initial

**Canonicals incohérents** détectés sur les 11 sites Moverz :

1. **Domaines multiples pour une même ville**
   - Nice : 3 domaines différents utilisés
     - `devis-demenageur-nice.fr`
     - `nice-demenageur.fr`  
     - `www.devis-demenageur-nice.fr`
   - Résultat : Dilution PageRank, Google ne sait pas quel domaine prioriser

2. **Slash final incohérent**
   - 50% pages avec `/` : `https://devis-demenageur-nice.fr/`
   - 50% pages sans `/` : `https://devis-demenageur-nice.fr`
   - Google traite ces URLs comme 2 pages différentes

3. **URLs hardcodées partout**
   - 50+ fichiers avec URLs en dur
   - Maintenance cauchemar (changer domaine = modifier 50 fichiers)
   - Risque erreurs humaines

## Pourquoi cette tâche ?

**Impact SEO** : Important (P2)
- Dilution PageRank réelle
- Signaux contradictoires à Google
- Indexation sub-optimale
- Budget crawl gaspillé

**Impact maintenance** : Critique
- Architecture fragile
- Difficile de changer domaine
- Risque erreurs à chaque modif

**ROI** : Excellent
- Court terme : -5% positions (7 jours)
- Long terme : +15-20% positions (30+ jours)
- ROI net : +300% à 60 jours

## Scope

**Inclus** :
- Centralisation génération canonicals (helper)
- Migration Nice (ville modèle)
- Réplication 10 autres villes
- Ajout slash final partout
- Choix domaine unique par ville
- Redirections 301 si changement domaine
- Documentation complète

**Hors scope** :
- Changement architecture Next.js
- Migration autre framework
- Modification domaines actuels (sauf si décidé)

## Fichiers impactés

### Par ville (exemple Nice)
- `lib/cityData.ts` (siteUrl)
- `next.config.js` (env)
- `pages/*.tsx` (10-15 pages avec canonicals)
- `components/BlogLayout.tsx`
- `.env.production`

### Total 11 villes
- ~150 fichiers à modifier
- Helper centralisé à créer
- Scripts automatisation

## Impact business

**Court terme (J+1-7)** :
- ⚠️ Baisse temporaire -5% positions (Google re-indexe)
- Crawl intensif (normal)

**Moyen terme (J+7-30)** :
- Stabilisation positions
- PageRank commence consolidation

**Long terme (J+30+)** :
- +15-20% positions
- PageRank consolidé
- Architecture propre
- Maintenance facilitée (-90% temps)

## Parties prenantes

- Guillaume (pilote + dev)
- SEO (bénéficiaire)
- Google (indexation améliorée)
- Mainteneurs futurs (code plus propre)

