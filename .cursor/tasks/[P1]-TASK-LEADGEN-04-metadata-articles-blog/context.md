# Context - TASK-LEADGEN-04

## 🎯 POURQUOI CETTE TÂCHE ?

### Déclencheur

Lors vérification déploiement TASK-LEADGEN-01, Guillaume a pointé un article blog :

**URL** : https://devis-demenageur-marseille.fr/blog/demenagement-marseille/petit-demenagement  
**Impressions** : 2% du site (~30 impressions/mois)

**Metadata actuelle** :
```
"Déménagez votre studio ou petit appartement à Marseille sans stress ! 
Découvrez nos services de petits déménagements rapides, économiques et sur mesure. 
Devis gratuit."
```

**Question Guillaume** : *"Tu trouve que c'est optimisé ?"*

**Réponse** : ❌ **NON**
- Wording générique (clichés)
- Zéro USP Moverz (Volume IA, Anonymat)
- Ton déménageur direct (pas comparateur)
- Pas de prix signal

---

## 🔍 ANALYSE SCOPE

### Articles Blog = 30-40% Trafic SEO

**Inventaire estimé** :
- Marseille : ~150 articles
- Lyon : ~140 articles
- Bordeaux : ~143 articles
- Nice : ~100 articles
- Autres sites : ~30-80 articles chacun

**TOTAL** : **~1100-2200 articles** sur 11 sites

**Actuellement** :
- Metadata = frontmatter fichiers .md
- Rédigées manuellement (hyper-localisées ✅)
- Mais wording générique (pas d'USP Moverz ❌)

---

## 💎 OPPORTUNITÉ ROI

### Calcul Impact

**Si CTR articles passe de 1.5% → 2.5%** :
- +1% CTR sur 500 impressions/mois articles
- = +5 clics/mois additionnels
- = +1 lead/mois additionnel
- = +50-150€/mois

**Multiplié par 11 sites** :
- +50-100 clics/mois
- +10-20 leads/mois
- +500-3000€/mois

**Investment** : 10-20h (script automatisé)  
**ROI** : 50-300% en 1 mois

---

## 📊 DIFFÉRENCE vs TASK-LEADGEN-01

| Élément | TASK-LEADGEN-01 | TASK-LEADGEN-04 |
|---------|-----------------|-----------------|
| **Scope** | Metadata **pages techniques** (app/) | Metadata **articles blog** (content/) |
| **Fichiers** | 85 fichiers .tsx | 1100-2200 fichiers .md |
| **Source metadata** | Code TypeScript | Frontmatter YAML |
| **Approche** | Manuel (85 fichiers) | Script automatisé (1100-2200 fichiers) |
| **Trafic concerné** | 60-70% (pages techniques) | 30-40% (articles blog) |
| **Priorité** | P0 (critique) | P1 (important) |
| **État** | ✅ Terminée | 📋 À faire |

---

## 🎯 WORDING CIBLE (Basé sur Grille Pain Points)

### Formule Générale Articles

**Structure** :
```
[Sujet] {Ville} [Prix si disponible]. 
Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme, [trust signal]. 
[Bénéfice final].
```

**Longueur** : 150-160 caractères

---

### Exemples par Type

**Prix** :
```
"Prix déménagement {Ville} 2025 : Studio 300-500€, T2 500-800€. 
Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme. Vraie comparaison."
```

**Pas Cher** :
```
"Déménagement pas cher {Ville} : 3-5 devis sur volume IA identique. 
Dossier anonyme, pas d'estimation fantaisiste. 
Économisez vs appel direct."
```

**Garde-Meuble** :
```
"Garde-meuble {Ville} 50-150€/mois : 3-5 devis comparables. 
Volume IA identique, dossier anonyme. 
Déménageurs vérifiés. Zéro harcèlement."
```

**Petit Déménagement** :
```
"Petit déménagement {Ville} 300-500€. 
Volume IA identique pour 3-5 devis comparables. 
Dossier anonyme, studio/T1. Vraie comparaison."
```

---

## ⚠️ CONTRAINTES

### Contrainte 1 : Préserver Hyper-Localisation

**Articles actuels** : Hyper-localisés (quartiers, acteurs locaux, prix sourcés)  
**Metadata actuelles** : Génériques

**Objectif** : Optimiser metadata **SANS toucher au contenu article**

---

### Contrainte 2 : Automatisation Requise

**1100-2200 fichiers** = Impossible manuel

**Solution** : Script Node.js
- Parse frontmatter YAML
- Génère nouvelle description avec formule
- Préserve reste du frontmatter
- Backup avant modification

---

### Contrainte 3 : Validation Manuelle Nécessaire

**Script peut se tromper** sur :
- Type d'article (prix vs pas cher ?)
- Prix à extraire (où dans le contenu ?)
- Formule applicable

**Solution** : Review manuelle 10% (100-200 articles)

---

## 🔬 PHASE 1 : TEST MANUEL (CRITIQUE)

### Pourquoi Phase 1 Manuelle ?

1. **Valider formules** : S'assurer que wording convertit
2. **Tester impact** : Mesurer CTR avant automatisation massive
3. **Affiner approche** : Ajuster formules par type si besoin

### Articles Test Recommandés (20 articles)

**Par ville mature** (Marseille, Lyon, Bordeaux, Nice) :
- 1 article "Prix déménagement"
- 1 article "Petit déménagement"
- 1 article "Garde-meuble"
- 1 article "Pas cher"
- 1 article satellite top impressions

**Total** : 4 villes × 5 articles = 20 articles

**Temps** : 2h (10 min par article)

---

## 📈 MESURE SUCCÈS PHASE 1

**Avant optimisation** :
- Capturer CTR J-7 des 20 articles (Search Console)
- Screenshots metadata actuelles

**Après optimisation** :
- Mesurer CTR J+7, J+14
- Comparer avec baseline

**Critère Go/No-Go Phase 2** :
- ✅ CTR +30-50% → Go automatisation
- ⚠️ CTR +10-20% → Affiner formules
- ❌ CTR stable/baisse → Revoir approche

---

*Créé le* : 05/11/2025  
*Contexte* : Suite constat metadata articles non optimisées (wording générique, zéro USP)

