# Décisions techniques : TASK-002 - Migration Canonicals

## Décision 1 : Créer documentation exhaustive AVANT implémentation

**Date** : 31 octobre 2025
**Contexte** : Problème complexe avec nombreux effets de bord

**Choix** : Documenter d'abord, coder ensuite

**Raison** :
- ✅ Problème complexe (breadcrumbs, redirections, liens internes)
- ✅ Décisions stratégiques nécessaires (domaines, www, slash)
- ✅ Estimation temps initiale 7-9h → 40-54h réel (sous-évaluation)
- ✅ ROI à valider (-5% court terme vs +15-20% long terme)
- ✅ Documentation permet décision éclairée avant investir 40-54h

**Résultat** : 9 fichiers documentation créés, problème bien compris

---

## Décision 2 : Slash final partout (/)

**Date** : 31 octobre 2025
**Contexte** : Google traite `/page` et `/page/` comme 2 URLs différentes

**Options** :
- A) Sans slash : `https://devis-demenageur-nice.fr`
- B) Avec slash : `https://devis-demenageur-nice.fr/` (recommandé)
- C) Mixte (incohérent, à éviter)

**Choix** : B - Slash final partout

**Raison** :
- ✅ Convention web standard
- ✅ Next.js gère mieux (trailing slash par défaut)
- ✅ Évite redirections inutiles
- ✅ Cohérence maximale
- ✅ Google recommande cohérence

---

## Décision 3 : Helper centralisé vs URLs hardcodées

**Date** : 31 octobre 2025
**Contexte** : 50+ URLs hardcodées dans code

**Options** :
- A) Garder URLs hardcodées (maintenance cauchemar)
- B) Créer helper centralisé (recommandé)

**Choix** : B - Helper `getCanonicalUrl()`

**Raison** :
- ✅ Maintenance facilitée (1 seul fichier vs 50)
- ✅ Cohérence garantie
- ✅ Évolutif (changement domaine facile)
- ✅ Testable
- ✅ Réutilisable (autres projets)

**Implémentation** :
```typescript
// lib/canonical-helper.ts
import { cityData } from './cityData'

export function getCanonicalUrl(path: string): string {
  const base = cityData.siteUrl // Avec slash final
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}
```

---

## Décision 4 : Domaine unique par ville

**Date** : 31 octobre 2025
**Contexte** : Nice utilise 3 domaines différents

**Options par ville** :
- Nice : `devis-demenageur-nice.fr` (recommandé) vs `nice-demenageur.fr`
- Autres villes : À décider individuellement

**Choix** : 1 seul domaine canonical par ville

**Raison** :
- ✅ Consolidation PageRank
- ✅ Signaux clairs à Google
- ✅ Évite dilution
- ✅ Simplifie tracking analytics

**À faire** : Décider domaine principal par ville (voir DECISION-CANONICALS.md)

---

## Décision 5 : Sans www (sauf si historique)

**Date** : 31 octobre 2025
**Contexte** : www vs non-www

**Choix** : Sans www par défaut

**Raison** :
- ✅ URLs plus courtes
- ✅ Standard moderne
- ✅ Cohérent avec API/CDN
- ⚠️ Sauf si www déjà établi (vérifier Search Console)

**Validation** : Vérifier domaine actuel avant changer

---

## Décision 6 : Migration Nice d'abord (modèle)

**Date** : 31 octobre 2025
**Contexte** : 11 villes à migrer

**Approche** :
1. Nice en premier (modèle)
2. Valider sur Nice (tests 7 jours)
3. Répliquer sur 10 autres villes

**Raison** :
- ✅ Nice = ville avec plus de docs (bon cas test)
- ✅ Valider approche avant scale
- ✅ Détecter problèmes sur 1 ville vs 11
- ✅ Ajuster process si besoin

**Alternative rejetée** : Migrer 11 villes d'un coup (trop risqué)

---

## Décision 7 : Scripts automatisation partielle

**Date** : 31 octobre 2025
**Contexte** : Temps estimé 92-137h sans scripts

**Approche** :
- Scripts pour tâches répétitives (siteUrl, env)
- Migration manuelle pages individuelles
- Tests automatisés validation

**Raison** :
- ✅ Réduit temps 40-54h (vs 92-137h)
- ✅ Automatise 30-40% tâches
- ✅ Qualité pages individuelles (revue manuelle)
- ⚠️ Reste travail manuel (acceptable)

**Scripts à créer** :
- `fix-canonicals-slash.sh` (ajouter slash siteUrl)
- `validate-canonicals.js` (tests automatisés)

---

## Décision 8 : Redirections 301 si changement domaine

**Date** : 31 octobre 2025
**Contexte** : Si on change domaine (ex: nice-demenageur.fr → devis-demenageur-nice.fr)

**Approche** :
- Configurer redirections 301 via Next.js ou CapRover
- Conserver ancien domaine 6-12 mois
- Monitoring Search Console

**Raison** :
- ✅ Évite perte PageRank
- ✅ Transition en douceur
- ✅ Google comprend changement
- ✅ Users pas impactés

**Si pas de changement domaine** : Redirections pas nécessaires

---

## Décision 9 : Monitoring Search Console obligatoire

**Date** : 31 octobre 2025
**Contexte** : Impact SEO temporaire attendu

**Approche** :
- Monitoring quotidien J+1 à J+7
- Hebdomadaire J+7 à J+30
- Validation ROI J+30

**Raison** :
- ✅ Détecter problèmes rapidement
- ✅ Valider impact attendu (-5% puis +15-20%)
- ✅ Documenter résultats
- ✅ Ajuster si besoin

**Métriques** :
- Positions moyennes
- Pages indexées
- Erreurs canonicals
- Crawl budget

---

## Décision 10 : Mise en pause volontaire

**Date** : 31 octobre 2025
**Contexte** : Documentation complète, prêt à implémenter

**Choix** : Marquer ⚠️ INCOMPLET et attendre validation

**Raison** :
- ✅ Documentation exhaustive créée (6h)
- ✅ Besoin décision business (choix domaines)
- ✅ Autres priorités (404s Phase 4, déploiements)
- ✅ Temps estimé important (40-54h)
- ✅ Impact court terme négatif (-5% J+1-7) à valider

**Prochaines étapes** :
1. Valider ROI acceptable
2. Décider domaines principaux par ville
3. Planifier 40-54h développement
4. Lancer implémentation

---

## Décision 11 : Effets de bord documentés

**Date** : 31 octobre 2025
**Contexte** : Migration impacte plus que juste canonicals

**Éléments impactés identifiés** :
- Breadcrumbs (utilisent siteUrl)
- Redirections 301 (si changement domaine)
- Liens internes markdown (hardcodés)
- Search Console (re-soumission)
- Analytics (tracking)

**Documentation** : EFFETS-BORD-CANONICALS.md

**Raison création doc dédiée** :
- ⚠️ Risque oublier effets de bord
- ⚠️ Estimation temps initiale sous-évaluait impacts
- ✅ Checklist exhaustive nécessaire
- ✅ Évite surprises pendant migration

---

**Ces décisions documentent la réflexion. Implémentation en attente de validation business.**

