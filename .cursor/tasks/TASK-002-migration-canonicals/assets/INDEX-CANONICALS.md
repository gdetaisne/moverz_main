# 📚 Index : Documentation Canonicals

**Date :** 31 octobre 2025  
**Statut :** ✅ Documentation complète

---

## 🎯 Par Où Commencer ?

### 👤 Je veux comprendre le problème (5 min)
→ **RESUME-CANONICALS.md**  
Vue d'ensemble rapide avec schémas

### 🔍 Je veux l'analyse technique complète (15 min)
→ **ANALYSE-CANONICALS-COMPLETE.md**  
Analyse détaillée de la situation actuelle

### ⚖️ Je dois prendre une décision (10 min)
→ **DECISION-CANONICALS.md**  
Choix à faire, recommandations, impacts

### 🛠️ Je veux migrer les sites (30 min)
→ **EXEMPLE-MIGRATION-CANONICALS.md**  
Guide pas à pas avec exemples de code

### 🌐 Je veux voir l'état des domaines (5 min)
→ **TABLEAU-DOMAINES-ACTUELS.md**  
Liste des 11 villes et leurs domaines

### ⚠️ Je dois connaître TOUS les effets de bord (15 min) — **CRITIQUE**
→ **EFFETS-BORD-CANONICALS.md**  
8 effets de bord majeurs + estimation effort réelle

### 🤝 Plusieurs personnes vont travailler sur le projet ? (10 min) — **IMPORTANT**
→ **COLLABORATION-CANONICALS.md**  
Gestion des conflits Git + stratégies de coordination

---

## 📁 Liste des Fichiers Créés

| Fichier | Taille | Rôle | Pour Qui |
|---------|--------|------|----------|
| **RESUME-CANONICALS.md** | ~150 lignes | Vue d'ensemble | Manager/Dev |
| **ANALYSE-CANONICALS-COMPLETE.md** | ~800 lignes | Analyse technique | Dev/Tech Lead |
| **DECISION-CANONICALS.md** | ~600 lignes | Décisions stratégiques | Manager |
| **EXEMPLE-MIGRATION-CANONICALS.md** | ~500 lignes | Guide pratique | Dev |
| **TABLEAU-DOMAINES-ACTUELS.md** | ~400 lignes | État des domaines | Manager/Dev |
| **EFFETS-BORD-CANONICALS.md** | ~900 lignes | 🔴 **Effets de bord critiques** | **TOUS - URGENT** |
| **COLLABORATION-CANONICALS.md** | ~800 lignes | 🔴 **Collaboration Git** | **Manager/Tech Lead** |
| **INDEX-CANONICALS.md** | Ce fichier | Navigation | Tous |
| **sites/nice/lib/canonical-helper.ts** | ~150 lignes | Code helper | Dev |
| **scripts/fix-canonicals-slash.sh** | ~250 lignes | Script automatisation | Dev/DevOps |

---

## 🗂️ Organisation par Profil

### 👔 Manager / Product Owner
**Temps requis :** 20 minutes

1. **RESUME-CANONICALS.md** (5 min)
   - Comprendre le problème
   - Impact SEO
   - ROI estimé

2. **DECISION-CANONICALS.md** (10 min)
   - Décisions à prendre
   - Budget temps
   - Planning

3. **TABLEAU-DOMAINES-ACTUELS.md** (5 min)
   - État des 11 villes
   - Cas Bordeaux spécial
   - Validation domaines

**Décisions à prendre :**
- [ ] Valider la migration ?
- [ ] Bordeaux : garder ou changer domaine ?
- [ ] Timing : immédiat ou différé ?

---

### 👨‍💻 Développeur
**Temps requis :** 1 heure (lecture) + 16-22h (implémentation réelle)

1. **RESUME-CANONICALS.md** (5 min)
   - Vue d'ensemble technique

2. **ANALYSE-CANONICALS-COMPLETE.md** (15 min)
   - Comprendre l'architecture actuelle
   - Sources des URLs
   - Incohérences détectées

3. **⚠️ EFFETS-BORD-CANONICALS.md** (15 min) — **CRITIQUE**
   - 8 effets de bord majeurs
   - Effort réel : 16-22h par ville
   - Scripts automatisation nécessaires

4. **EXEMPLE-MIGRATION-CANONICALS.md** (30 min)
   - Exemples de code avant/après
   - Guide pas à pas
   - Checklist par page

5. **TABLEAU-DOMAINES-ACTUELS.md** (5 min)
   - Domaines à configurer

6. **canonical-helper.ts** (5 min)
   - Comprendre le helper
   - API disponible

**Actions à faire :**
- [ ] Lire la doc complète **+ EFFETS-BORD**
- [ ] Créer scripts automatisation
- [ ] Tester Nice en local
- [ ] Migrer Nice (modèle complet)
- [ ] Répliquer sur 10 villes
- [ ] Tests et déploiement

---

### 🚀 DevOps / Infra
**Temps requis :** 15 minutes + 2-3h (si changement domaine Bordeaux)

1. **RESUME-CANONICALS.md** (5 min)
   - Impact infrastructure

2. **TABLEAU-DOMAINES-ACTUELS.md** (5 min)
   - Domaines actuels
   - Redirections nécessaires

3. **DECISION-CANONICALS.md** (5 min)
   - Plan d'action
   - Monitoring requis

**Si changement domaine Bordeaux :**
- [ ] Configurer DNS `devis-demenageur-bordeaux.fr`
- [ ] Certificat SSL
- [ ] Redirections 301
- [ ] Tests redirections
- [ ] Monitoring Search Console

---

## 🎓 Parcours d'Apprentissage

### Niveau 1 : Compréhension (30 min)
```
RESUME-CANONICALS.md
    ↓
ANALYSE-CANONICALS-COMPLETE.md (sections principales)
    ↓
TABLEAU-DOMAINES-ACTUELS.md
```

**Objectif :** Comprendre le problème et son impact

---

### Niveau 2 : Décision (20 min)
```
DECISION-CANONICALS.md
    ↓
Validation tableau domaines
    ↓
Go/No-Go migration
```

**Objectif :** Prendre les décisions stratégiques

---

### Niveau 3 : Implémentation (8-10h)
```
EXEMPLE-MIGRATION-CANONICALS.md
    ↓
canonical-helper.ts (comprendre)
    ↓
Migration Nice (modèle)
    ↓
Scripts automatisation
    ↓
Réplication 10 villes
    ↓
Tests & déploiement
```

**Objectif :** Réaliser la migration complète

---

## 📊 Schéma de Navigation

```
                    INDEX-CANONICALS.md
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Manager        Dev         DevOps
              │            │            │
              ▼            ▼            ▼
      RESUME-CANONICALS   │    TABLEAU-DOMAINES
              │            │            │
              ▼            ▼            ▼
      DECISION-     ANALYSE-      (Redirections)
      CANONICALS    CANONICALS         │
              │            │            │
              │            ▼            │
              │    EXEMPLE-MIGRATION    │
              │            │            │
              │            ▼            │
              │    canonical-helper.ts │
              │            │            │
              └────────────┼────────────┘
                           ▼
                  Migration & Tests
```

---

## 🔑 Points Clés par Document

### RESUME-CANONICALS.md
✅ **Lecture : 2 min**
- Vue d'ensemble du problème
- Schémas visuels
- Impact SEO résumé
- Checklist express

**Quand le lire ?**  
En premier, pour avoir une vue rapide

---

### ANALYSE-CANONICALS-COMPLETE.md
✅ **Lecture : 15 min**
- Analyse technique détaillée
- Comment sont construites les canonicals ?
- Fichiers concernés (110 fichiers)
- Impact du changement
- Bonnes pratiques SEO

**Quand le lire ?**  
Après le résumé, pour comprendre en profondeur

---

### DECISION-CANONICALS.md
✅ **Lecture : 10 min**
- Questions à trancher
- Tableau de décision domaines
- Plan d'action détaillé
- Budget temps
- Validation finale

**Quand le lire ?**  
Avant de prendre la décision de migrer

---

### EXEMPLE-MIGRATION-CANONICALS.md
✅ **Lecture : 30 min**
- Exemples de code avant/après
- Migration pas à pas
- 5 exemples détaillés :
  - /partenaires
  - /comment-ca-marche
  - /blog
  - Articles blog (dynamiques)
  - Corridors (template)
- Checklist par site
- Tests à effectuer

**Quand le lire ?**  
Au moment de coder la migration

---

### TABLEAU-DOMAINES-ACTUELS.md
✅ **Lecture : 5 min**
- État actuel des 11 villes
- Incohérences détectées
- Cas spécial Bordeaux
- Domaines recommandés
- Plan d'action par ville

**Quand le lire ?**  
Pour valider les domaines avant migration

---

### canonical-helper.ts
✅ **Lignes : ~150**
```typescript
getCanonicalUrl(path)          // URL complète avec slash
getCanonicalAlternates(path)   // Objet alternates pour metadata
getOpenGraphMetadata(...)      // OG metadata
getFullMetadata(...)           // Tout en un
```

**Quand l'utiliser ?**  
Dans chaque page pour générer les canonicals

---

### fix-canonicals-slash.sh
✅ **Lignes : ~250**
```bash
# Automatise 30-40% de la migration
./scripts/fix-canonicals-slash.sh       # Toutes villes
./scripts/fix-canonicals-slash.sh nice  # Une ville
```

**Ce qu'il fait :**
- Ajoute slash dans cityData.ts
- Ajoute slash dans env.ts
- Ajoute slash dans next-sitemap.config.js
- Copie canonical-helper.ts

**Ce qu'il ne fait PAS :**
- Migrer les pages individuelles (manuel)
- Tests
- Déploiement

---

## 🎯 Objectifs par Phase

### Phase 1 : Compréhension ✅
**Objectif :** Tout le monde comprend le problème

**Actions :**
- [ ] Manager lit RESUME + DECISION
- [ ] Dev lit ANALYSE + EXEMPLE
- [ ] DevOps lit TABLEAU + DECISION

**Durée :** 1h (équipe de 3 personnes)

---

### Phase 2 : Décision ✅
**Objectif :** Décisions prises, plan validé

**Actions :**
- [ ] Valider domaines (TABLEAU-DOMAINES)
- [ ] Décider Bordeaux : garder ou changer
- [ ] Valider planning
- [ ] Go/No-Go migration

**Durée :** 30 min (réunion)

---

### Phase 3 : Préparation ✅
**Objectif :** Environnement prêt, backups faits

**Actions :**
- [ ] Backups cityData.ts
- [ ] Créer branche Git `feat/canonicals-slash`
- [ ] Tests locaux Nice préparés
- [ ] Accès Search Console validés

**Durée :** 1h

---

### Phase 4 : Implémentation 🔄
**Objectif :** Migration technique complète

**Actions :**
- [ ] Nice (modèle) : 2-3h
- [ ] 9 villes faciles : 4-5h
- [ ] Bordeaux (si changement) : 2-3h
- [ ] Tests : 2h

**Durée :** 10-13h

---

### Phase 5 : Déploiement 🚀
**Objectif :** Production, monitoring activé

**Actions :**
- [ ] Déploiement production
- [ ] Soumission sitemaps Search Console
- [ ] Monitoring J+1, J+3, J+7
- [ ] Bilan J+30

**Durée :** 2h (déploiement) + 30 jours (monitoring)

---

## 📈 Métriques de Succès

### Court Terme (J+7)
- [ ] Tous les canonicals avec slash final ✅
- [ ] Domaine unique par ville ✅
- [ ] Aucune erreur 404 massive ✅
- [ ] Baisse positions < 10% ✅

### Moyen Terme (J+30)
- [ ] Retour baseline positions ✅
- [ ] Consolidation PageRank visible ✅
- [ ] Aucune erreur Search Console ✅

### Long Terme (J+60+)
- [ ] Amélioration positions +10-20% ✅
- [ ] Architecture propre maintenue ✅
- [ ] Nouvelles pages utilisent helper ✅

---

## 🆘 Support & Questions

### Questions Fréquentes

**Q: Par où commencer ?**  
R: RESUME-CANONICALS.md (2 min de lecture)

**Q: Combien de temps ça prend ?**  
R: 10-13h de dev + 30 jours monitoring

**Q: Quel impact SEO ?**  
R: Baisse 5% (J+1-7), puis amélioration +15% (J+30+)

**Q: Faut-il tout faire d'un coup ?**  
R: Non, migration progressive : 1 ville test (Nice), puis autres villes

**Q: Et Bordeaux ?**  
R: Décision à prendre (voir TABLEAU-DOMAINES-ACTUELS.md)

---

### Fichiers Manquants

Si un fichier est manquant :

1. **canonical-helper.ts** non présent ?
   → Créé dans `sites/nice/lib/canonical-helper.ts`

2. **Script bash** ne fonctionne pas ?
   → Vérifier permissions : `chmod +x scripts/fix-canonicals-slash.sh`

3. **Documentation illisible** ?
   → Tous les fichiers sont en Markdown (.md)

---

## ✅ Checklist Globale

### Avant de Commencer
- [ ] Toute la doc lue par l'équipe
- [ ] Décisions prises (domaines)
- [ ] Planning validé
- [ ] Backups faits

### Pendant la Migration
- [ ] Nice migré et testé
- [ ] Autres villes répliquées
- [ ] Tests locaux OK
- [ ] Code reviewé

### Après Déploiement
- [ ] Production déployée
- [ ] Monitoring actif
- [ ] Search Console mis à jour
- [ ] Documentation projet mise à jour

---

## 🎉 Résultat Attendu

### Avant Migration
```
❌ Canonicals incohérents
❌ 3 domaines différents par ville
❌ URLs hardcodées partout
❌ Maintenance difficile
❌ Dilution PageRank
```

### Après Migration
```
✅ Canonicals parfaits (slash partout)
✅ 1 domaine unique par ville
✅ Helper centralisé (1 source de vérité)
✅ Maintenance facile (1 fichier)
✅ PageRank consolidé
```

---

## 📞 Contact

**Auteur :** Assistant IA  
**Date création :** 31 octobre 2025  
**Dernière MAJ :** 31 octobre 2025  
**Version :** 1.0

---

## 🔗 Liens Rapides

- [RESUME-CANONICALS.md](./RESUME-CANONICALS.md) - Démarrer ici
- [ANALYSE-CANONICALS-COMPLETE.md](./ANALYSE-CANONICALS-COMPLETE.md) - Analyse technique
- [DECISION-CANONICALS.md](./DECISION-CANONICALS.md) - Décisions stratégiques
- [EXEMPLE-MIGRATION-CANONICALS.md](./EXEMPLE-MIGRATION-CANONICALS.md) - Guide pratique
- [TABLEAU-DOMAINES-ACTUELS.md](./TABLEAU-DOMAINES-ACTUELS.md) - État domaines
- [canonical-helper.ts](./sites/nice/lib/canonical-helper.ts) - Code helper
- [fix-canonicals-slash.sh](./scripts/fix-canonicals-slash.sh) - Script auto

---

**Documentation complète — Prêt pour la migration**

