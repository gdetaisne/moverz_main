# 🚀 Quick Start - Production Parallèle (3 Villes Simultanées)

**Objectif :** Lancer 3 chats Cursor pour produire 3 villes en parallèle  
**Gain de temps :** 300 satellites en 3 mois au lieu de 9 mois  
**Difficulté :** Facile (tout est automatisé dans le document maitre)

---

## ⚡ Démarrage en 5 Minutes

### Étape 1 : Ouvrir 3 Chats Cursor (2 min)

**Dans Cursor :**
1. Cliquer sur `+` → Nouveau chat 1
2. Nommer : "🏙️ Production Lyon"
3. Répéter pour chat 2 : "🏙️ Production Marseille"
4. Répéter pour chat 3 : "🏙️ Production Montpellier"

**Résultat :** 3 onglets Cursor distincts

---

### Étape 2 : Charger Document Maitre (3× 1 min)

**Dans CHAQUE chat, copier-coller ce prompt initial :**

```markdown
Lis ce document de référence complet :
seo-briefs/DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md

Tu es un chat Cursor autonome en charge de produire les 100 articles 
satellites d'une ville.

CONTEXTE :
- Stratégie : 1 site par ville (avantage = hyper-localisation)
- 10 piliers par ville (déjà publiés)
- 10 satellites par pilier (à créer)
- Standard : Note ≥ 8/10, ZÉRO invention, 100% local

WORKFLOW :
- Phase 0 : Deep search locale ville (1 jour)
- Phase 1 : Briefs satellites pilier par pilier
- Phase 2 : Génération articles
- Phase 3 : Auto-validation

RESSOURCES :
- CSV briefs piliers : SEO Guidelines - Feuille 1.csv
- Briefs piliers : seo-briefs/[ville]/
- Référence : sites/toulouse/content/blog/satellites/

PRINCIPES NON-NÉGOCIABLES :
1. ZÉRO invention (données 100% sourcées)
2. Hyper-localisation (quartiers, acteurs, prix réels)
3. Mots-clés CSV pilier intégrés (10-15 par article)
4. Maillage interne (2-3 liens pilier/article)
5. FAQ optimisées (5-7 questions/article)

Confirme lecture document maitre et demande-moi quelle ville tu gères.
```

---

### Étape 3 : Assigner Villes (3× 10 sec)

**Cursor vous demandera :** "Quelle ville suis-je en charge ?"

**Répondre dans chaque chat :**
- Chat 1 : `Lyon`
- Chat 2 : `Marseille`
- Chat 3 : `Montpellier`

**Cursor devrait confirmer :**
> "Ville assignée : Lyon ✅
> 
> Je vais :
> 1. Vérifier si fiche-locale-lyon.md existe
> 2. Si non, la créer (Phase 0, 1 jour)
> 3. Puis produire 10 piliers × 10 satellites
> 
> Dois-je démarrer par Phase 0 (Deep Search Locale) ou Phase 1 (si fiche existe) ?"

---

### Étape 4 : Démarrer Production (3× 10 sec)

**Dans chaque chat, répondre :**

```
Démarre par Phase 0 (création fiche locale).

Ordre des piliers :
Utilise les 10 piliers de ta ville depuis le CSV "SEO Guidelines - Feuille 1.csv"
Extrais les lignes où Ville = [ta ville assignée]
Traite-les dans l'ordre du CSV

Tu gères tout de façon autonome. 
Informe-moi uniquement :
- Fin de chaque phase majeure
- Problèmes bloquants
- Validations intermédiaires (tous les 10 satellites)

GO !
```

---

**RÉSULTAT :**

Les 3 chats vont travailler en **parallèle** :

```
Chat 1 (Lyon)                Chat 2 (Marseille)          Chat 3 (Montpellier)
     ↓                             ↓                             ↓
Fiche locale Lyon            Fiche locale Marseille      Fiche locale Montpellier
     ↓                             ↓                             ↓
Pilier 1 : 10 briefs         Pilier 1 : 10 briefs        Pilier 1 : 10 briefs
     ↓                             ↓                             ↓
Pilier 1 : 10 articles       Pilier 1 : 10 articles      Pilier 1 : 10 articles
     ↓                             ↓                             ↓
[Répéter × 10 piliers]       [Répéter × 10 piliers]      [Répéter × 10 piliers]
     ↓                             ↓                             ↓
100 satellites Lyon ✅       100 satellites Marseille ✅  100 satellites Montpellier ✅
```

**Timeline : 12 semaines → 300 satellites produits en parallèle**

---

## 📊 Suivi de Production

### Dashboard à Tenir

**Créer un fichier :** `SUIVI-PRODUCTION-PARALLELE.md`

```markdown
# Suivi Production Parallèle

**Date début :** [Date]
**Villes :** Lyon, Marseille, Montpellier

---

## Progression Globale

| Ville | Phase 0 | Piliers | Satellites | Note Moy | Statut |
|-------|---------|---------|------------|----------|--------|
| Lyon | ✅ | 3/10 | 30/100 | 8.4/10 | 🟢 En cours |
| Marseille | ✅ | 2/10 | 20/100 | 8.2/10 | 🟢 En cours |
| Montpellier | 🔴 | 0/10 | 0/100 | - | 🔴 Attente |

**Total :** 50/300 satellites (16.7%)

---

## Cette Semaine

**Semaine [X] - [Dates]**

**Lyon :**
- [ ] Finir Pilier 3 (satellites 21-30)
- [ ] Démarrer Pilier 4

**Marseille :**
- [ ] Finir Pilier 2 (satellites 11-20)
- [ ] Démarrer Pilier 3

**Montpellier :**
- [x] Phase 0 fiche locale terminée
- [ ] Démarrer Pilier 1

---

## Problèmes & Résolutions

**[Date] - Lyon - Satellite 23 :**
- Problème : Données chiffrées insuffisantes
- Solution : Deep search complémentaire effectuée
- Statut : ✅ Résolu

[Logger tous les problèmes rencontrés]

---

## Prochaines Étapes

**Semaine prochaine :**
- Lyon : Piliers 4-5
- Marseille : Piliers 3-4
- Montpellier : Piliers 1-2

**Dans 1 mois :**
- Lyon : 60/100 satellites
- Marseille : 50/100 satellites
- Montpellier : 40/100 satellites

**Fin production (S12) :**
- 3 villes complètes : 300 satellites ✅
```

---

## 💡 Conseils Production Parallèle

### Gestion des 3 Chats

**Organisation :**
1. **Matin** : Check des 3 chats (10 min)
   - Voir progression de la nuit (si générationsasync)
   - Valider livrables
   - Donner instructions du jour

2. **Journée** : Rotations
   - 1h chat Lyon → vérifier génération, lancer suivante
   - 1h chat Marseille → idem
   - 1h chat Montpellier → idem
   - Répéter

3. **Soir** : Validation globale (20 min)
   - Vérifier qualité articles du jour
   - Mettre à jour dashboard
   - Planifier lendemain

### Éviter la Surcharge

**Rythme conseillé :**
- **Conservateur** : 2 satellites/jour/ville = 6 satellites/jour total
- **Standard** : 3 satellites/jour/ville = 9 satellites/jour total
- **Intensif** : 4 satellites/jour/ville = 12 satellites/jour total

**Recommandation :** Commencer conservateur, accélérer si tout va bien

### Priorité si Problème

**Si un chat bloque :**
1. Identifier le problème
2. Débloquer rapidement
3. Continuer avec les 2 autres chats
4. Revenir au chat bloqué une fois débloqué

**Ne jamais bloquer les 3 en même temps**

---

## ⚠️ Points d'Attention

### Cohérence Entre Villes

**Vérifier que les 3 chats :**
- Utilisent même niveau de qualité
- Respectent mêmes contraintes
- Appliquent même méthodologie

**Astuce :** Après 10 premiers satellites de chaque ville, comparer qualité

### Données CSV Piliers

**Chaque chat doit extraire les mots sémantiques de SON CSV pilier.**

**Vérifier que :**
- Lyon extrait CSV lignes Lyon
- Marseille extrait CSV lignes Marseille
- Montpellier extrait CSV lignes Montpellier

**Les mots sémantiques peuvent légèrement varier entre villes.**

### Sauvegarde & Organisation

**Structure dossiers claire :**

```
seo-briefs/
├── lyon/
│   ├── fiche-locale-lyon.md
│   └── satellites/
│       ├── garde-meuble/
│       ├── demenageur/
│       └── ...
├── marseille/
│   ├── fiche-locale-marseille.md
│   └── satellites/
│       └── ...
└── montpellier/
    ├── fiche-locale-montpellier.md
    └── satellites/
        └── ...

sites/
├── lyon/content/blog/satellites/
├── marseille/content/blog/satellites/
└── montpellier/content/blog/satellites/
```

---

## ✅ Checklist Démarrage

**Avant de lancer les 3 chats :**

### Préparation
- [ ] Document maitre créé et à jour
- [ ] CSV briefs piliers accessible
- [ ] Briefs piliers 9 villes disponibles
- [ ] Sites toulouse/bordeaux (référence) accessibles
- [ ] Structure dossiers comprise

### Organisation
- [ ] Dashboard de suivi créé
- [ ] Temps disponible estimé (2-3h/jour minimum)
- [ ] Villes prioritaires choisies (Lyon, Marseille, Montpellier)
- [ ] Ordre piliers défini (Garde-meuble en 1er recommandé)

### Technique
- [ ] Cursor fonctionne bien
- [ ] Accès fichiers projet OK
- [ ] Espace disque suffisant (300 fichiers à créer)

**Si 13/13 OK → PRÊT À DÉMARRER** 🚀

---

## 🎯 Timeline Réaliste

### Scénario Conservateur (2 sat/jour/ville)

**Semaines 1-4 :**
- Lyon : Piliers 1-2 (20 satellites)
- Marseille : Piliers 1-2 (20 satellites)
- Montpellier : Piliers 1-2 (20 satellites)
- **Total S4 :** 60 satellites ✅

**Semaines 5-8 :**
- +60 satellites (piliers 3-4 chaque ville)
- **Total S8 :** 120 satellites ✅

**Semaines 9-12 :**
- +60 satellites (piliers 5-6)
- **Total S12 :** 180 satellites ✅

**Semaines 13-16 :**
- +60 satellites (piliers 7-8)
- **Total S16 :** 240 satellites ✅

**Semaines 17-20 :**
- +60 satellites (piliers 9-10)
- **Total S20 :** 300 satellites ✅

**TOTAL : 5 mois pour 300 satellites (3 villes complètes)**

---

### Scénario Standard (3 sat/jour/ville)

**TOTAL : 3-4 mois pour 300 satellites**

---

### Scénario Intensif (4 sat/jour/ville)

**TOTAL : 2-3 mois pour 300 satellites**

**⚠️ Attention :** Risque baisse qualité si trop rapide

---

## 🎉 Après 3 Villes Complètes

**Vous aurez :**

✅ **300 satellites** produits  
✅ **Lyon complet** (100 satellites)  
✅ **Marseille complet** (100 satellites)  
✅ **Montpellier complet** (100 satellites)  
✅ **~1800 FAQ** optimisées featured snippets  
✅ **~15 000 liens** internes (maillage)  
✅ **3 cocons sémantiques** dominants  

**Impact SEO attendu (6 mois) :**
- Positions #1 : 30-50 requêtes/ville
- Top 3 : 100-150 requêtes/ville
- Trafic organique : +500%
- Leads/mois : +200%

---

## 🔄 Puis les 6 Villes Restantes

**Option 1 : Même process**
- Relancer 3 nouveaux chats pour 3 villes suivantes
- Total : 2 rounds de 3 villes

**Option 2 : Réutiliser chats existants**
- Une fois Lyon terminé, réassigner à Lille
- Marseille → Nice
- Montpellier → Nantes

**Option 3 : Scaling**
- 6 chats simultanés (si puissance machine OK)
- 6 villes en 3 mois

---

## 📞 Support

**Si problème avec un chat :**

1. Noter le problème exact
2. Lire section correspondante document maitre
3. Fournir instructions précises au chat
4. Si bloqué : restart nouveau chat avec même ville

**Problèmes fréquents prévus :**
- Manque données locales → Enrichir fiche locale
- Données inventées → Rappeler interdiction + brief
- Qualité variable → Feedback entre générations

---

## ✅ VOUS ÊTES PRÊT !

**Action immédiate :**

1. **Maintenant** : Ouvrir 3 chats Cursor
2. **Copier** le prompt initial dans chacun
3. **Assigner** Lyon, Marseille, Montpellier
4. **Lancer** : Les chats démarrent Phase 0
5. **Suivre** : Dashboard de progression

**Dans 3-5 mois : 300 satellites produits ✅**

**GO ! 🚀**

---

**Document créé par :** Direction SEO Moverz  
**Version :** 1.0  
**Date :** 13 octobre 2025  
**Prochaine action :** Ouvrir 3 chats Cursor maintenant

