# DECISIONS - Choix Techniques

---

## 🎯 DÉCISION 1 : Approche Résolution (ADOPTÉE)

**Date** : 11/11/2025 03:15 UTC  
**Décideur** : Cursor AI (guidé par contraintes techniques)  
**Statut** : ✅ APPROUVÉE (en attente exécution)

### Option Choisie : **Fix Temporaire Nginx (Option 1)**

**Raison** :
1. **Priorité business** : Rétablir sites en ligne RAPIDEMENT (15 min)
2. **Risque faible** : Manipule seulement Nginx (pas config CapRover critique)
3. **Réversible** : Si échec, on peut tenter Option 2 sans dégâts
4. **Acceptable** : CapRover UI down temporairement OK (sites prioritaires)

**Alternatives rejetées** :

**Option 2 : Fix Config CapRover**
- ❌ Plus risqué (modification config système)
- ❌ Plus long (30-45 min)
- ❌ Résultat incertain (champs à injecter hypothétiques)
- ✅ Mais nécessaire si Option 1 échoue

**Option 3 : Support Hostinger**
- ❌ Très long (1-2h réponse)
- ❌ Dépendance externe
- ❌ Peut-être inutile si Options 1-2 marchent
- ✅ Mais nécessaire si Options 1-2 échouent

---

## 🛠️ DÉCISION 2 : Script Fix Nginx - Choix Techniques

**Date** : 11/11/2025 03:10 UTC

### 2.1 : Suppression `captain-captain` ? ✅ OUI

**Raison** :
- Service en crash loop inutile
- Bloque potentiellement ressources
- Ne sert à rien si on veut juste Nginx

**Commande** :
```bash
sudo docker service rm captain-captain
```

**Risque** : ❌ AUCUN (service non fonctionnel de toute façon)

---

### 2.2 : Recréation `captain-nginx` depuis Zéro ? ✅ OUI

**Raison** :
- `captain-nginx` existant probablement mal configuré (restauration corrompue)
- Plus sûr de recréer propre que tenter fix

**Commande** :
```bash
sudo docker service create \
  --name captain-nginx \
  --network captain-overlay-network \
  --publish mode=host,target=80,published=80 \
  --publish mode=host,target=443,published=443 \
  --mount type=bind,source=/captain/nginx-shared,target=/etc/nginx/conf.d,readonly \
  --mount type=bind,source=/captain/data/letencrypt,target=/etc/letsencrypt,readonly \
  --constraint 'node.role==manager' \
  nginx:1.27.2
```

**Choix Techniques** :

1. **Image Nginx** : `nginx:1.27.2`
   - ✅ Version récente stable
   - ✅ Identique à logs détectés ("nginx:1.27.2" dans `docker service ls`)

2. **Mount Configs** : `/captain/nginx-shared` (readonly)
   - ✅ CapRover stocke configs Nginx ici
   - ✅ Readonly pour sécurité

3. **Mount Certificates** : `/captain/data/letencrypt` (readonly)
   - ✅ Certificats SSL Let's Encrypt
   - ✅ Requis pour HTTPS

4. **Ports Host Mode** : 80 et 443
   - ✅ Host mode requis (pas d'ingress Swarm pour reverse proxy)
   - ✅ Permet Nginx router vers containers internes

5. **Network** : `captain-overlay-network`
   - ✅ Network Swarm où sont tous les sites
   - ✅ Permet Nginx joindre srv-captain--dd-*

6. **Constraint** : `node.role==manager`
   - ✅ Assure déploiement sur node principal
   - ✅ Cohérent avec architecture CapRover

---

### 2.3 : Tester 2 Sites ou 11 ? 🔄 COMPROMIS (2 puis 11)

**Raison** :
- Tester 2 sites d'abord (Nice, Lyon) = validation rapide
- Si OK → Assumer les 11 marchent (même config)
- Si KO → Pas besoin tester 11, investiguer

**Commandes** :
```bash
curl -I https://devis-demenageur-nice.fr/ | head -1
curl -I https://devis-demenageur-lyon.fr/ | head -1
```

**Si OK** : HTTP/1.1 200 OK ou 301/302  
**Si KO** : Timeout, Connection refused, 502/503

---

## 🔧 DÉCISION 3 : Script Fix Config CapRover (Option 2 - Si Option 1 échoue)

**Date** : 11/11/2025 03:12 UTC

### 3.1 : Quels Champs Injecter ? 🎯 4 CHAMPS CRITIQUES

**Champs identifiés** (basés sur erreur "Fresh installation") :

1. **`swarmNodeId`** : `jq43nx2mzvx6inuarz1ormbv4`
   - Source : `docker node ls` (ID du node Leader)
   - Critique pour reconnaître Swarm existant

2. **`captainSubDomain`** : `captain`
   - Standard CapRover (sous-domaine UI)
   - Requis pour routage captain.gslv.cloud

3. **`registrySubDomain`** : `registry`
   - Standard CapRover (sous-domaine registry Docker)
   - Requis pour push/pull images

4. **`captainSalt`** : `captain42secretsaltkey2025`
   - **⚠️ HYPOTHÉTIQUE** (non confirmé)
   - Clé sécurité CapRover (hash passwords, tokens)
   - **Risque** : Si mauvaise valeur, sessions/passwords invalides

**⚠️ LIMITATION** : `captainSalt` est hypothétique (pas moyen de récupérer valeur originale)

**CONSÉQUENCE si mauvais salt** :
- Mots de passe admin CapRover invalides
- Tokens API CapRover invalides
- → Nécessitera reset password CapRover (procédure standard)

---

### 3.2 : Méthode Injection ? 🐍 PYTHON (vs sed/jq)

**Choix** : Script Python (lecture JSON → ajout champs → écriture)

**Alternatives rejetées** :

**sed** :
- ❌ Complexe pour JSON (accolades, virgules, indentation)
- ❌ Risque casser format JSON

**jq** :
- ✅ Excellent pour JSON
- ❌ Pas toujours installé par défaut Ubuntu
- ❌ Syntaxe moins lisible pour 4 champs

**Python** :
- ✅ Présent par défaut Ubuntu 24.04
- ✅ Module `json` builtin
- ✅ Facile à lire/maintenir
- ✅ Gestion erreurs robuste

---

### 3.3 : Backup Config ? ✅ OUI (OBLIGATOIRE)

**Raison** :
- Modification config système critique
- Si erreur → Possibilité revert
- Bonne pratique infrastructure

**Commande** :
```bash
cp /captain/data/config-captain.json /captain/data/config-captain.json.backup-20251111-031500
```

**Nom fichier** : Timestampé pour traçabilité

---

## 📞 DÉCISION 4 : Support Hostinger - Quand Contacter ?

**Critères déclenchement** :

### Scénario 1 : Option 1 + Option 2 échouent
- ❌ Sites toujours inaccessibles après fix Nginx
- ❌ CapRover ne démarre toujours pas après fix config
- → **Contacter support** : "Restauration VPS corrompue, CapRover config incomplète"

### Scénario 2 : Besoin comprendre incident initial
- ✅ Sites en ligne (Option 1 OK)
- ❓ Mais pourquoi restauration nécessaire ce matin ?
- → **Contacter support** : "Logs incident 11 nov 00:00-01:00 UTC, raison crash serveur ?"

### Scénario 3 : Prévention future
- ✅ Tout résolu
- 🔄 Vouloir améliorer process restauration
- → **Contacter support** : "Procédure restauration recommandée ? Snapshots auto fréquence ?"

---

## 🎯 DÉCISION 5 : Priorités Post-Incident

**Date** : 11/11/2025 03:15 UTC

### Si Option 1 Réussit (sites en ligne)

**Priorité 1** : ✅ Valider sites accessibles  
**Priorité 2** : 📝 Documenter incident complet  
**Priorité 3** : 🔍 Comprendre raison restauration initiale  
**Priorité 4** : 🔧 Tenter Option 2 (fix CapRover UI) - optionnel  
**Priorité 5** : 📊 Mettre en place monitoring CapRover

---

### Si Option 1 Échoue (sites toujours down)

**Priorité 1** : 🔧 Tenter Option 2 (fix config)  
**Priorité 2** : 📞 Contacter support Hostinger  
**Priorité 3** : 🚨 Évaluer restauration snapshot plus récent (si existe)  
**Priorité 4** : ⚙️ Envisager réinstallation propre CapRover (DERNIER RECOURS)

---

## 📋 DÉCISION 6 : Documentation Incident

**Date** : 11/11/2025 03:15 UTC

**User demande** : "créé une tache et documente avec tout ca pour la prochaine fois en attendant"

**Décision** : Créer tâche P0 complète avec 6 fichiers

**Fichiers à créer** :

1. **README.md** : Vue d'ensemble exécutive
2. **context.md** : Pourquoi restauration nécessaire (À COMPLÉTER)
3. **progress.md** : Chronologie détaillée incident (CE FICHIER)
4. **decisions.md** : Choix techniques Options 1-2-3 (CE FICHIER)
5. **tests.md** : Validations accessibilité sites
6. **commits.md** : SHA GitHub si code modifié (probablement vide)

**Objectif** : Référence complète pour incidents futurs similaires

---

**Dernière mise à jour** : 11/11/2025 03:20 UTC

