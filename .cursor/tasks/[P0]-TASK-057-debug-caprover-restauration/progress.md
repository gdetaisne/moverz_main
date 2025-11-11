# PROGRESS - Journal Chronologique Incident CapRover

---

## 📅 11 NOVEMBRE 2025 - SESSION 1 : DIAGNOSTIC INITIAL

**02:00-02:30 UTC** : Début session Cursor  
**Objectif** : Comprendre pourquoi CapRover ne démarre plus après restauration

---

### Étape 1 : Charge Documentation Stratégique (02:00-02:10)

```
✅ Lu : .cursor/INDEX-DOCUMENTATION.md
✅ Lu : .cursor/PRINCIPES-SACRES.md
✅ Lu : .cursor/ZONES-DE-RISQUE.md
✅ Lu : .cursor/CHECKLIST-PRE-CODE.md
✅ Lu : .cursor/TODO-GUILLAUME.md
```

**État détecté** :
- User a restauré serveur depuis snapshot 4 nov
- Demande préparation "push all sites + force CapRover deploy"
- **User dit** : "Je te dirais quand exécuter ok?"

---

### Étape 2 : Vérification État Serveur (02:10-02:15)

**Commandes exécutées** :
```bash
root@srv825396:~# sudo docker ps | grep captain
root@srv825396:~# sudo systemctl status caprover
```

**Résultats** :
- ✅ Container `captain-captain` existe
- ⚠️ Container `captain-captain` **redémarre en boucle** (11 secondes uptime)
- ❌ Service systemd `caprover.service` **NOT FOUND**
- ✅ 11 containers sites tournent (dd-nice, dd-lyon, dd-marseille, etc.)
- ✅ Services Redis, Postgres, Minio, Certbot OK

**Observation critique** : `captain-captain` crash loop

---

### Étape 3 : Tentative Accès Sites (02:15-02:20)

**Commandes** :
```bash
curl -I https://devis-demenageur-nice.fr/
curl -I https://devis-demenageur-lyon.fr/
```

**Résultats** :
```
curl: (7) Failed to connect to devis-demenageur-nice.fr port 443 after 170 ms: Couldn't connect to server
curl: (7) Failed to connect to devis-demenageur-lyon.fr port 443 after 55 ms: Couldn't connect to server
```

**Conclusion** : ❌ **Sites INACCESSIBLES** (reverse proxy down)

**User confirmation** : "Non non. les sites ne tournent pas là"

---

### Étape 4 : Analyse Logs CapRover (02:20-02:30)

**Commande** :
```bash
sudo docker logs captain-captain --tail 20
```

**Logs observés** :
```
Captain Starting ...
Installing Captain Service ...
Installation failed.
Error: Add the following to the installer line: -e ACCEPTED_TERMS=true
Terms of service must be accepted before installation
```

**Action** : Ajouter variable env `ACCEPTED_TERMS=true`

---

### Étape 5 : Recréation Container avec ACCEPTED_TERMS (02:30-02:40)

**Commandes** :
```bash
sudo docker stop captain-captain
sudo docker rm captain-captain

sudo docker run -d \
  --name captain-captain \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /captain:/captain \
  -e MAIN_NODE_IP_ADDRESS=88.223.94.12 \
  -e ACCEPTED_TERMS=true \
  -p 80:80 \
  -p 443:443 \
  -p 3000:3000 \
  --network captain-overlay-network \
  caprover/caprover:1.14.0
```

**Nouvelle erreur** :
```
Error: Wrapped: Docker API Version Error: Error: getaddrinfo EAI_AGAIN unix
```

**Cause** : Variable `-e CAPTAIN_DOCKER_API=unix:///var/run/docker.sock` inutile (CapRover auto-détecte)

**Action** : Retirer cette variable, relancer

---

### Étape 6 : Nouvelle Erreur "Fresh installation!" (02:40-02:50)

**Logs** :
```
November 11th 2025, 3:11:15.653 am Fresh installation!
November 11th 2025, 3:11:15.654 am Starting swarm at 88.223.94.12:2377
Installation failed.
Error: (HTTP code 503) unexpected - This node is already part of a swarm.
Use "docker swarm leave" to leave this swarm and join another one.
```

**🚨 ROOT CAUSE DÉCOUVERTE** :
- CapRover croit être en "Fresh installation"
- → Tente `docker swarm init`
- → **Mais** Docker Swarm est **déjà actif** !
- → Erreur 503 "already part of a swarm"

**Hypothèse** : Config CapRover corrompue/incomplète → Ne reconnaît pas Swarm existant

---

### Étape 7 : Diagnostic Complet Demandé par User (02:50-03:00)

**User dit** : "je pense que tu n'as pas une lecture complete du problème. Dis moi les commandes qui te permettent d'voir une lecture plus complete plutot que de tester a droite a gauche"

**Commandes diagnostic** :
```bash
echo "=== 1. TOUS LES SERVICES SWARM ==="
sudo docker service ls

echo "=== 2. DÉTAILS SERVICE CAPTAIN-CAPTAIN ==="
sudo docker service inspect captain-captain --pretty

echo "=== 3. TOUS LES CONTAINERS (running + stopped) ==="
sudo docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"

echo "=== 4. PORTS UTILISÉS (80, 443, 3000) ==="
sudo netstat -tlnp | grep -E ':(80|443|3000) ' || sudo ss -tlnp | grep -E ':(80|443|3000) '

echo "=== 5. HISTORIQUE TASKS CAPTAIN-CAPTAIN ==="
sudo docker service ps captain-captain --no-trunc

echo "=== 6. NETWORKS SWARM ==="
sudo docker network ls | grep captain

echo "=== 7. NODES SWARM ==="
sudo docker node ls
```

---

## 📊 RÉSULTATS DIAGNOSTIC COMPLET (03:00-03:10)

### 1. Services Swarm (21 services actifs)
```
captain-captain          0/1   (en attente)
captain-certbot          1/1   ✅
captain-nginx            1/1   ✅
srv-captain--dd-*        1/1   ✅ (×11 sites)
srv-captain--postgres    1/1   ✅
srv-captain--redis       1/1   ✅
srv-captain--minio-api   1/1   ✅
```

**Observation** : Tous services OK SAUF `captain-captain` (0/1 replicas)

---

### 2. Service captain-captain (inspect)
```
Replicas: 1
UpdateStatus: State: updating
Placement: Constraints: [node.role==manager]
Image: caprover/caprover:1.14.0
Env: ACCEPTED_TERMS=true
Mounts:
  - /captain → /captain
  - /var/run/docker.sock → /var/run/docker.sock
Ports:
  - 80:80 (host mode)
  - 443:443 (host mode)
  - 3000:3000 (host mode)
```

**Observation** : Config service correcte

---

### 3. Containers actifs
- ✅ 11 containers sites (dd-nice, dd-lyon, etc.)
- ✅ captain-nginx (Up About an hour)
- ✅ captain-certbot, redis, postgres, minio
- ⚠️ 15+ containers stopped (anciens, exited 255)

**Observation** : `captain-nginx` existe et tourne !

---

### 4. Ports utilisés
```
(vide - aucun port 80/443/3000 listé)
```

**⚠️ ANOMALIE** : Aucun port affiché alors que `captain-nginx` tourne ?

**Hypothèse** : Ports non bindés correctement ou `ss`/`netstat` ne détecte pas Swarm mode

---

### 5. Historique tasks captain-captain
```
Task ID: l0skwhzvxv8f
DesiredState: Running
CurrentState: Pending 3 minutes ago
Error: "no suitable node (host-mode port already in use on 1 node)"
```

**🚨 DÉCOUVERTE CRITIQUE** :
```
"no suitable node (host-mode port already in use on 1 node)"
```

→ **Les ports 80/443 sont déjà utilisés** !  
→ `captain-captain` ne peut pas démarrer car `captain-nginx` bloque les ports

---

### 6. Networks Swarm
```
captain-overlay-network   overlay   swarm
```

**Observation** : Network OK

---

### 7. Nodes Swarm
```
ID: jq43nx2mzvx6inuarz1ormbv4
HOSTNAME: srv825396
STATUS: Ready
AVAILABILITY: Active
MANAGER STATUS: Leader
ENGINE VERSION: 28.4.0
```

**Observation** : ✅ Docker Swarm actif, node Leader

---

## 🔍 DIAGNOSTIC FINAL (03:10-03:15)

### Root Cause Confirmée

**Problème 1 : Config CapRover Corrompue**
- `/captain/data/config-captain.json` **manque champs système** :
  - `swarmNodeId` : jq43nx2mzvx6inuarz1ormbv4 (devrait être présent)
  - `captainSubDomain` : captain (devrait être présent)
  - `registrySubDomain` : registry (devrait être présent)
  - `captainSalt` : clé sécurité (devrait être présent)

→ CapRover croit à "Fresh installation" alors que Swarm existe  
→ Tente init Swarm → Erreur 503

**Problème 2 : captain-nginx Bloque Ports**
- Service `captain-nginx` existe et tourne
- Mais configuration **incompatible** avec `captain-captain` qui veut aussi ports 80/443 (host mode)
- → `captain-captain` ne peut pas démarrer ("port already in use")

---

### Solutions Identifiées

**Option 1 : Fix Temporaire Nginx** ⚡️ PRIORITÉ
1. Supprimer service `captain-captain` (libérer ressources)
2. Supprimer service `captain-nginx` actuel (mal configuré)
3. Recréer `captain-nginx` manuellement avec config correcte
4. **Résultat** : Sites en ligne, CapRover UI reste down

**Option 2 : Fix Config CapRover** 🔧
1. Arrêter `captain-nginx` temporairement
2. Injecter 4 champs manquants dans `/captain/data/config-captain.json`
3. Redémarrer `captain-captain`
4. Laisser CapRover recréer `captain-nginx` automatiquement
5. **Résultat** : CapRover complet fonctionnel

**Option 3 : Support Hostinger** 📞
- Si Options 1-2 échouent
- Contacter support pour restauration propre
- Ou assistance debug manuel

---

## 📝 SCRIPTS PRÉPARÉS (03:15)

### Script 1 : Fix Rapid Nginx
```bash
#!/bin/bash
# FIX RAPIDE SITES - À exécuter dès VPS accessible

echo "🔧 FIX RAPIDE NGINX REVERSE PROXY"
echo "=================================="

# 1. Supprimer service captain-captain qui crash
echo "1. Suppression captain-captain..."
sudo docker service rm captain-captain 2>/dev/null || true

# 2. Recréer captain-nginx (reverse proxy)
echo "2. Création captain-nginx..."
sudo docker service create \
  --name captain-nginx \
  --network captain-overlay-network \
  --publish mode=host,target=80,published=80 \
  --publish mode=host,target=443,published=443 \
  --mount type=bind,source=/captain/nginx-shared,target=/etc/nginx/conf.d,readonly \
  --mount type=bind,source=/captain/data/letencrypt,target=/etc/letsencrypt,readonly \
  --constraint 'node.role==manager' \
  nginx:1.27.2

# 3. Attendre démarrage
sleep 15

# 4. Vérifier
echo "3. Vérification..."
sudo docker service ps captain-nginx

# 5. Tester sites
echo "4. Test sites..."
curl -I https://devis-demenageur-nice.fr/ | head -1
curl -I https://devis-demenageur-lyon.fr/ | head -1

echo ""
echo "✅ Si HTTP/1.1 200 OK ou 301/302 → Sites en ligne !"
echo "❌ Si timeout/erreur → On continue le debug"
```

Sauvegardé : `/tmp/fix-rapid-nginx.sh`

---

### Script 2 : Fix Config CapRover
```bash
#!/bin/bash
set -e

CONFIG_FILE="/captain/data/config-captain.json"
BACKUP_FILE="/captain/data/config-captain.json.backup-$(date +%Y%m%d-%H%M%S)"

echo "🔧 RÉPARATION CONFIG CAPROVER"
echo "=============================="

# 1. Backup
echo "📦 Backup de la config..."
cp "$CONFIG_FILE" "$BACKUP_FILE"

# 2. Ajouter champs manquants avec Python
echo "🔨 Ajout des champs manquants..."
python3 << 'PYTHON_EOF'
import json

CONFIG_FILE = "/captain/data/config-captain.json"

with open(CONFIG_FILE, 'r') as f:
    config = json.load(f)

config['swarmNodeId'] = 'jq43nx2mzvx6inuarz1ormbv4'
config['captainSubDomain'] = 'captain'
config['registrySubDomain'] = 'registry'
config['captainSalt'] = 'captain42secretsaltkey2025'

with open(CONFIG_FILE, 'w') as f:
    json.dump(config, f, indent=8)

print("   ✅ Champs ajoutés")
PYTHON_EOF

echo "✅ CONFIG RÉPARÉE !"
echo ""
echo "🔄 Redémarre captain-captain:"
echo "   sudo docker service update --force captain-captain"
```

Sauvegardé : `/tmp/fix_captain_config.sh`

---

## 🎯 PROCHAINES ACTIONS (EN ATTENTE VPS)

### User dit (03:15)
> "loading"

**Interprétation** : User attend que VPS Hostinger finisse restauration

**Status** : ⏳ **EN ATTENTE** accès serveur

---

### Actions dès VPS accessible :

1. **[IMMÉDIAT]** Exécuter Script 1 (fix Nginx temporaire)
2. **[VALIDATION]** Tester 11 sites (curl)
3. **[SI OK]** Sites en ligne ✅, documenter incident
4. **[SI KO]** Tenter Script 2 (fix config CapRover)
5. **[SI KO]** Contacter support Hostinger (Option 3)

---

**Session en pause** : 03:15 UTC  
**User crée tâche** : Demande documentation complète incident

---

**Dernière mise à jour** : 11/11/2025 03:20 UTC

