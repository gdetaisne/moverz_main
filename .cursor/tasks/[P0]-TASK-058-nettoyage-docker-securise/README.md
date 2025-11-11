# [P0]-TASK-058 : Nettoyage Docker Sécurisé - Libération Espace Disque

**Statut** : 🔄 EN COURS  
**Priorité** : P0 (CRITIQUE - Disque 67% plein, récurrent)  
**Créée le** : 11 novembre 2025 04:10 UTC  
**Temps estimé** : 1-2h (prudent, step by step)

---

## 📋 RÉSUMÉ EXÉCUTIF

### Problème Critique
- **Disque 67% plein** (257 GB / 387 GB)
- **Croissance rapide récurrente** (graphique Hostinger : 200→400 GB en quelques semaines)
- **Commandes Docker extrêmement lentes** (symptôme surcharge)
- **Incident hier** : Tentative nettoyage manuel → tout cassé → restauration snapshot

### Objectif
**Libérer 50-100 GB de façon SÉCURISÉE** sans casser les sites en production

### Approche
**Nettoyage PROGRESSIF** :
1. Images dangling (SAFE)
2. Build cache (SAFE)
3. Volumes orphelins (PRUDENT)
4. Containers arrêtés (SAFE)
5. Mise en place rotation logs (PRÉVENTION)

---

## 🎯 OBJECTIFS

### Immédiat (J+0)
- [ ] Nettoyer images dangling (~50-80 GB attendu)
- [ ] Nettoyer build cache (~10-20 GB attendu)
- [ ] Valider sites toujours accessibles

### Court Terme (J+1)
- [ ] Nettoyer volumes orphelins (PRUDENT)
- [ ] Configurer rotation logs Docker
- [ ] Automatiser nettoyage hebdomadaire

### Prévention (J+7)
- [ ] Monitoring espace disque (alertes >80%)
- [ ] Cron nettoyage automatique

---

## ⚠️ RÈGLES DE SÉCURITÉ

**JAMAIS** :
- ❌ `docker system prune -a` (supprime TOUTES les images, même en prod)
- ❌ `docker volume prune` sans vérifier (peut supprimer données)
- ❌ Supprimer `/var/lib/docker/*` manuellement

**TOUJOURS** :
- ✅ Commandes ciblées (`-f dangling=true`)
- ✅ Vérifier sites accessibles après chaque étape
- ✅ Backup config CapRover avant actions risquées

---

## 📊 ÉTAT ACTUEL

| Métrique | Valeur |
|----------|--------|
| **Disque total** | 387 GB |
| **Disque utilisé** | 257 GB (67%) |
| **Disque libre** | 130 GB (33%) |
| **Objectif** | <50% (libérer 50-80 GB) |

---

## 🚀 PROCÉDURE STEP-BY-STEP

Voir **`PROCEDURE-NETTOYAGE.md`** pour instructions détaillées.

---

**Créée par** : Cursor AI  
**Assignée à** : Guillaume  
**Lien incident** : [P0]-TASK-057-debug-caprover-restauration


