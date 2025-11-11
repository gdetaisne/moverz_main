# PROCÉDURE NETTOYAGE DOCKER SÉCURISÉ

**À exécuter dans le terminal SSH ouvert** : `root@srv825396:~#`

---

## 🟢 ÉTAPE 1 : Images Dangling (100% SAFE)

**Quoi** : Supprimer images `<none>` (builds intermédiaires, pas utilisées)  
**Risque** : ❌ AUCUN (n'affecte pas sites en prod)  
**Gain estimé** : 50-80 GB

### Commandes :

```bash
# 1. Voir combien d'images dangling
echo "Nombre images dangling :"
docker images -f "dangling=true" -q | wc -l

# 2. Voir espace récupérable
docker image prune --help | head -5

# 3. SUPPRIMER (SAFE)
docker image prune -f

# 4. Vérifier espace libéré
df -h /
```

**✅ CHECKPOINT** : Sites toujours accessibles ?
```bash
curl -I https://devis-demenageur-nice.fr/ | head -1
curl -I https://devis-demenageur-rennes.fr/ | head -1
```

**Attendu** : `HTTP/1.1 200 OK`

---

## 🟢 ÉTAPE 2 : Build Cache (100% SAFE)

**Quoi** : Supprimer cache Docker build (layers intermédiaires)  
**Risque** : ❌ AUCUN  
**Gain estimé** : 10-30 GB

### Commandes :

```bash
# 1. Voir taille cache
docker builder du

# 2. SUPPRIMER (SAFE)
docker builder prune -f

# 3. Vérifier espace libéré
df -h /
```

**✅ CHECKPOINT** : Sites toujours accessibles ?

---

## 🟡 ÉTAPE 3 : Containers Arrêtés (SAFE)

**Quoi** : Supprimer containers exited (arrêtés il y a longtemps)  
**Risque** : ⚠️ FAIBLE (ne touche pas containers running)  
**Gain estimé** : 5-10 GB

### Commandes :

```bash
# 1. Lister containers arrêtés
docker ps -a -f "status=exited" | wc -l

# 2. SUPPRIMER (SAFE si >1 jour)
docker container prune -f --filter "until=24h"

# 3. Vérifier espace libéré
df -h /
```

**✅ CHECKPOINT** : Sites toujours accessibles ?

---

## 🔴 ÉTAPE 4 : Volumes Orphelins (PRUDENT - À FAIRE APRÈS)

**Quoi** : Supprimer volumes Docker non attachés à un container  
**Risque** : ⚠️⚠️ MOYEN (peut supprimer données si erreur)  
**Gain estimé** : 5-20 GB

### ⚠️ À FAIRE UNIQUEMENT SI :
- Étapes 1-3 pas suffisantes
- Backup CapRover config fait
- Guillaume valide

### Commandes :

```bash
# 1. Lister volumes orphelins
docker volume ls -qf dangling=true | wc -l

# 2. Inspecter AVANT de supprimer
docker volume ls -qf dangling=true | head -5 | xargs docker volume inspect

# 3. SUPPRIMER (PRUDENT)
docker volume prune -f

# 4. Vérifier
df -h /
```

**✅ CHECKPOINT** : Sites + CapRover UI toujours accessibles ?

---

## 🎯 RÉSULTAT ATTENDU

Après Étapes 1-3 :
- Espace libéré : 65-120 GB
- Disque utilisé : <50% (vs 67% avant)
- Sites 100% fonctionnels

---

## 🚨 SI PROBLÈME

**Si un site tombe après nettoyage** :

```bash
# 1. Voir logs service
docker service logs srv-captain--dd-[ville] --tail 50

# 2. Redémarrer service
docker service update --force srv-captain--dd-[ville]

# 3. Si échec : Rollback via CapRover UI
# https://captain.gslv.cloud → App → Deployment → Previous version
```

---

## 📝 RAPPORT À REMPLIR

Après chaque étape, noter :

```
Étape 1 (Images dangling) :
- Avant : 257 GB
- Après : ___ GB
- Libéré : ___ GB
- Sites OK : OUI / NON

Étape 2 (Build cache) :
- Avant : ___ GB
- Après : ___ GB
- Libéré : ___ GB
- Sites OK : OUI / NON

Étape 3 (Containers) :
- Avant : ___ GB
- Après : ___ GB
- Libéré : ___ GB
- Sites OK : OUI / NON
```

---

**Créée par** : Cursor AI  
**Dernière mise à jour** : 11/11/2025 04:10 UTC


