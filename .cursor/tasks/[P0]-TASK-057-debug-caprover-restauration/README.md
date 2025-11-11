# [P0]-TASK-057 : Debug CapRover Post-Restauration Serveur

**Statut** : ✅ RÉSOLU (Restauration Hostinger automatique)  
**Priorité** : P0 (CRITIQUE - Production down)  
**Créée le** : 11 novembre 2025 03:15 UTC  
**Résolue le** : 11 novembre 2025 05:00 UTC  
**Temps investi** : 3h total (1h30 diagnostic + 1h30 attente)  
**Downtime** : 3h (02:00-05:00 UTC)

---

## 📋 RÉSUMÉ EXÉCUTIF

### Problème
- **Serveur VPS Hostinger restauré depuis snapshot du 4 novembre 2025**
- **CapRover (plateforme orchestration) ne redémarre plus** → Restart loop "Fresh installation!"
- **11 sites production inaccessibles** (reverse proxy Nginx down)
- **Impact business** : 0 lead, perte confiance, sites invisibles Google

### Root Cause Identifiée
**Restauration VPS corrompue/incomplète** :
- Fichier `/captain/data/config-captain.json` **manque 4 champs système critiques** :
  - `swarmNodeId` : Requis pour reconnaître le Docker Swarm existant
  - `captainSubDomain` : Sous-domaine CapRover UI (captain)
  - `registrySubDomain` : Sous-domaine registry Docker (registry)
  - `captainSalt` : Clé de sécurité CapRover

→ CapRover croit être en "Fresh installation" malgré Docker Swarm actif  
→ Tente `docker swarm init` → **Erreur 503** "This node is already part of a swarm"  
→ Container `captain-captain` crash loop infini

### Situation Actuelle
✅ **OK** :
- Docker Engine fonctionnel
- Docker Swarm actif (node Leader)
- 11 containers sites tournent (srv-captain--dd-*)
- Données sites intactes

❌ **KO** :
- `captain-captain` (control plane) en crash loop
- `captain-nginx` (reverse proxy) mal configuré ou bloque ports 80/443
- CapRover UI inaccessible (https://captain.gslv.cloud/)
- 11 sites inaccessibles (timeout HTTPS)

### Solutions Préparées

**Option 1 : Fix Temporaire Nginx** (15 min - PRIORITÉ)
- Recréer `captain-nginx` manuellement
- Rétablir reverse proxy → **Sites en ligne**
- CapRover UI reste down (acceptable temporairement)

**Option 2 : Fix Config CapRover** (30-45 min)
- Injecter 4 champs manquants dans config JSON
- Redémarrer `captain-captain`
- Rétablir CapRover UI complet

**Option 3 : Support Hostinger** (1-2h)
- Si Options 1-2 échouent
- Investiguer raison restauration corrompue
- Demander restauration propre ou fix manuel

---

## 🎯 OBJECTIFS

### ✅ RÉSOLU (11/11/2025 05:00 UTC)
- [x] **11/11 sites en ligne** ✅ (Restauration automatique Hostinger)
- [x] Valider accessibilité sites (curl 11 domaines) ✅
- [x] CapRover UI fonctionnel (200 OK) ✅
- [x] Documenter incident complet ✅

### Actions Prévention Recommandées
- [x] Setup UptimeRobot monitoring (15 min) ✅ FAIT (11/11/2025)
- [ ] Backup config CapRover externalisé (cron Mac)
- [ ] Vérifier fréquence snapshots Hostinger (quotidien recommandé)
- [ ] Comprendre raison restauration initiale (Guillaume)

---

## 📊 MÉTRIQUES

| Métrique | Valeur |
|----------|--------|
| **Sites impactés** | 11/11 (100%) |
| **Durée downtime** | ~3h (depuis restauration) |
| **Leads perdus estimés** | 0-1 (faible trafic période) |
| **Impact SEO** | Minimal si <24h |
| **Perte confiance** | Faible (sites récents) |

---

## 🔗 FICHIERS LIÉS

- **Context** : `context.md` (pourquoi cette restauration ?)
- **Progress** : `progress.md` (chronologie détaillée incident)
- **Decisions** : `decisions.md` (choix techniques Options 1-2-3)
- **Tests** : `tests.md` (validations accessibilité sites)
- **Scripts** : `scripts/` (fix Nginx, fix config CapRover)
- **Commits** : `commits.md` (SHA GitHub si code modifié)

---

## 🚨 ACTIONS IMMÉDIATES (dès VPS accessible)

```bash
# 1. Se connecter au serveur
ssh root@88.223.94.12

# 2. Exécuter fix Nginx temporaire
sudo bash /tmp/fix-rapid-nginx.sh

# 3. Tester sites
curl -I https://devis-demenageur-nice.fr/
curl -I https://devis-demenageur-lyon.fr/
# ... (×11)

# 4. Si OK → Sites en ligne ✅
# 5. Si KO → Option 2 (fix config) ou Option 3 (support)
```

---

**Créée par** : Cursor AI  
**Assignée à** : Guillaume  
**Dernière mise à jour** : 11/11/2025 03:15 UTC

