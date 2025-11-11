# POST-REBOOT : Redéploiement Rapide 11 Sites

**Durée estimée** : 15-20 min total (CPU sans throttling)

---

## ⚡ ÉTAPE 1 : REBOOT SERVEUR (maintenant)

**Dans ton terminal SSH** :

```bash
reboot
```

**Attendre 5 minutes** → Serveur redémarre

---

## ✅ ÉTAPE 2 : VÉRIFIER SERVEUR OK (5 min après reboot)

**Reconnexion SSH** :

```bash
ssh root@88.223.94.12
```

**Vérifier tout est up** :

```bash
# 1. CPU steal devrait être <10% (vs 67% avant)
top -bn1 | grep "Cpu(s)"

# 2. Services CapRover
docker service ls | grep -E "(captain|dd-)"

# 3. Sites accessibles (version snapshot 4 nov)
curl -I https://devis-demenageur-nice.fr/ | head -1
curl -I https://devis-demenageur-rennes.fr/ | head -1
```

**Attendu** :
- CPU steal <10% ✅
- captain-captain 1/1 ✅
- captain-nginx 1/1 ✅
- 11 sites dd-* 1/1 ✅
- curl HTTP/1.1 200 OK ✅

---

## 🚀 ÉTAPE 3 : FORCE REBUILD 2 SITES TEST (Nice + Rennes)

**Via CapRover UI** (plus simple) :

1. Ouvrir https://captain.gslv.cloud/
2. Apps → **dd-nice** → Deployment → Force Rebuild
3. Apps → **dd-rennes** → Deployment → Force Rebuild

**OU via terminal Mac** (automatique) :

```bash
# Sur ton Mac (pas SSH)
cd /Users/guillaumestehelin/moverz_main-4

# Nice
curl -X POST https://captain.gslv.cloud/api/v2/user/apps/webhooks/triggerbuild \
  -H "Content-Type: application/json" \
  -H "x-captain-auth: $CAPROVER_TOKEN" \
  -d '{"appName": "dd-nice", "branchToPull": "main"}'

# Rennes
curl -X POST https://captain.gslv.cloud/api/v2/user/apps/webhooks/triggerbuild \
  -H "Content-Type: application/json" \
  -H "x-captain-auth: $CAPROVER_TOKEN" \
  -d '{"appName": "dd-rennes", "branchToPull": "main"}'
```

**Note** : Si `$CAPROVER_TOKEN` pas défini, utilise CapRover UI (plus simple)

**Attendre 5-10 min** → Les 2 sites devraient finir rapidement (CPU sans throttling)

---

## ✅ ÉTAPE 4 : VALIDER 2 SITES TEST

**Vérifier nouvelle version déployée** :

```bash
# Nice
curl -s https://devis-demenageur-nice.fr/ | grep -i "nice" | head -3

# Rennes
curl -s https://devis-demenageur-rennes.fr/ | grep -i "rennes" | head -3
```

**Attendu** : Contenu avec ville correcte (dynamique)

**Via navigateur** : Tester 1-2 pages, vérifier pas de 404

---

## 🚀 ÉTAPE 5 : DEPLOY 9 SITES RESTANTS (si TEST OK)

**Via CapRover UI** (recommandé) :

Pour chaque site :
- Apps → **dd-[ville]** → Deployment → Force Rebuild

**OU Script automatique** (sur Mac) :

```bash
# Sur ton Mac
cd /Users/guillaumestehelin/moverz_main-4

# Sites restants
SITES=(lyon marseille bordeaux montpellier lille nantes strasbourg rouen toulouse)

for site in "${SITES[@]}"; do
  echo "🚀 Rebuilding dd-$site..."
  
  curl -X POST https://captain.gslv.cloud/api/v2/user/apps/webhooks/triggerbuild \
    -H "Content-Type: application/json" \
    -H "x-captain-auth: $CAPROVER_TOKEN" \
    -d "{\"appName\": \"dd-$site\", \"branchToPull\": \"main\"}"
  
  echo ""
  sleep 2
done

echo "✅ 9 rebuilds déclenchés !"
echo "⏱️  Durée estimée : 10-15 min"
```

**Note** : Sans `$CAPROVER_TOKEN`, fais-le manuellement via UI (9 clics)

**Attendre 10-15 min** → 9 sites finissent

---

## ✅ ÉTAPE 6 : VALIDATION FINALE 11/11 SITES

**Script test rapide** :

```bash
# Sur ton Mac
for url in \
  https://devis-demenageur-nice.fr/ \
  https://devis-demenageur-lyon.fr/ \
  https://devis-demenageur-marseille.fr/ \
  https://www.bordeaux-demenageur.fr/ \
  https://devis-demenageur-lille.fr/ \
  https://devis-demenageur-toulousain.fr/ \
  https://devis-demenageur-nantes.fr/ \
  https://devis-demenageur-strasbourg.fr/ \
  https://devis-demenageur-rouen.fr/ \
  https://devis-demenageur-rennes.fr/ \
  https://devis-demenageur-montpellier.fr/
do
  echo -n "Testing $url : "
  curl -sI $url | head -1
done
```

**Attendu** : 11/11 sites HTTP/1.1 200 OK ou 301

---

## 🎉 RÉSULTAT FINAL

**Après ces étapes** :

```
✅ 11/11 sites avec version corrigée :
   - 2847 liens 404 corrigés
   - Metadata optimisées (CTR)
   - Villes dynamiques (cityData)
   - Breadcrumbs

✅ Espace disque : 93 GB / 387 GB (25%)
✅ CPU : Sans throttling
✅ UptimeRobot : Monitoring actif
```

---

## 🚨 SI PROBLÈME

**Si un site ne démarre pas** :

```bash
# Voir logs
ssh root@88.223.94.12
docker service logs srv-captain--dd-[ville] --tail 50

# Redémarrer service
docker service update --force srv-captain--dd-[ville]
```

**Si CPU throttling revient** :

Attendre 1-2h que Hostinger détecte charge normale et retire limitations.

---

## ⏱️ TIMELINE COMPLÈTE

```
T+0 min   : Reboot serveur
T+5 min   : Vérifier serveur OK
T+5 min   : Force rebuild Nice + Rennes (TEST)
T+15 min  : Valider 2 sites TEST OK
T+15 min  : Force rebuild 9 sites restants
T+30 min  : Validation finale 11/11 sites ✅
```

**Durée totale** : 30 minutes

---

**PRÊT À REBOOT ?** Tape `reboot` dans ton terminal SSH maintenant ! 🚀


