# TESTS - Validations Accessibilité Sites

---

## 🎯 OBJECTIF

Valider que les 11 sites sont accessibles après application fix Nginx temporaire (Option 1).

---

## 📋 TESTS À EXÉCUTER (dès VPS accessible)

### Test 1 : Accessibilité HTTPS (11 domaines)

**Commandes** :
```bash
# Nice
curl -I https://devis-demenageur-nice.fr/ | head -1

# Lyon
curl -I https://devis-demenageur-lyon.fr/ | head -1

# Marseille
curl -I https://devis-demenageur-marseille.fr/ | head -1

# Bordeaux
curl -I https://devis-demenageur-bordeaux.fr/ | head -1

# Lille
curl -I https://devis-demenageur-lille.fr/ | head -1

# Toulouse
curl -I https://devis-demenageur-toulouse.fr/ | head -1

# Nantes
curl -I https://devis-demenageur-nantes.fr/ | head -1

# Strasbourg
curl -I https://devis-demenageur-strasbourg.fr/ | head -1

# Montpellier
curl -I https://devis-demenageur-montpellier.fr/ | head -1

# Rennes
curl -I https://devis-demenageur-rennes.fr/ | head -1

# Rouen
curl -I https://devis-demenageur-rouen.fr/ | head -1
```

**Résultat attendu** : `HTTP/1.1 200 OK` ou `HTTP/1.1 301 Moved Permanently` ou `HTTP/1.1 302 Found`

**Résultat KO** :
- `curl: (7) Failed to connect` → Reverse proxy toujours down
- `HTTP/1.1 502 Bad Gateway` → Nginx fonctionne mais ne joint pas containers sites
- `HTTP/1.1 503 Service Unavailable` → Container site down

---

### Test 2 : Contenu Page (2 sites échantillon)

**Commandes** :
```bash
# Nice - Vérifier contenu
curl -s https://devis-demenageur-nice.fr/ | grep -i "nice" | head -5

# Lyon - Vérifier contenu
curl -s https://devis-demenageur-lyon.fr/ | grep -i "lyon" | head -5
```

**Résultat attendu** : Lignes HTML contenant "Nice" et "Lyon" (ville correcte)

**Résultat KO** :
- `curl: (7) Failed to connect` → Site inaccessible
- HTML vide ou incomplet → Container site problème
- "Toulouse" dans Nice → Bug [P0]-TASK-056 (villes hardcodées)

---

### Test 3 : Certificats SSL (1 site échantillon)

**Commande** :
```bash
curl -v https://devis-demenageur-nice.fr/ 2>&1 | grep -E "SSL|certificate|expire"
```

**Résultat attendu** :
- `SSL certificate verify ok`
- Certificat valide (pas expiré)
- Émis par Let's Encrypt

**Résultat KO** :
- `SSL certificate problem` → Certificats Let's Encrypt non montés correctement
- `certificate has expired` → Renouvellement certbot échoué

---

### Test 4 : Services Docker Swarm

**Commande** :
```bash
sudo docker service ls | grep -E "captain-nginx|dd-"
```

**Résultat attendu** :
```
captain-nginx            1/1   nginx:1.27.2
srv-captain--dd-nice     1/1   img-captain-dd-nice:150
srv-captain--dd-lyon     1/1   img-captain-dd-lyon:27
... (×11 sites)
```

**Résultat KO** :
- `captain-nginx  0/1` → Service Nginx pas démarré
- `srv-captain--dd-*  0/1` → Container site down

---

### Test 5 : Logs Nginx (validation routage)

**Commande** :
```bash
sudo docker service logs captain-nginx --tail 20
```

**Résultat attendu** :
- Logs requêtes HTTP (GET / HTTP/1.1)
- Statuts 200, 301, 302 (pas 502/503)
- Noms domaines corrects (nice.fr, lyon.fr, etc.)

**Résultat KO** :
- Erreurs "upstream not found" → Nginx ne trouve pas containers sites
- Erreurs "connection refused" → Containers sites down
- Erreurs "SSL" → Problème certificats

---

## 📊 RÉSULTATS TESTS (À COMPLÉTER)

### Session Post-Fix (11/11/2025 - À VENIR)

| Test | Statut | Notes |
|------|--------|-------|
| **Test 1** : HTTPS 11 sites | ⏳ EN ATTENTE | Exécution après fix Nginx |
| **Test 2** : Contenu Nice/Lyon | ⏳ EN ATTENTE | - |
| **Test 3** : Certificats SSL | ⏳ EN ATTENTE | - |
| **Test 4** : Services Swarm | ⏳ EN ATTENTE | - |
| **Test 5** : Logs Nginx | ⏳ EN ATTENTE | - |

---

### Résultats Détaillés (À COMPLÉTER après exécution)

**Test 1 - HTTPS 11 sites** :
```
Nice      : [À COMPLÉTER]
Lyon      : [À COMPLÉTER]
Marseille : [À COMPLÉTER]
Bordeaux  : [À COMPLÉTER]
Lille     : [À COMPLÉTER]
Toulouse  : [À COMPLÉTER]
Nantes    : [À COMPLÉTER]
Strasbourg: [À COMPLÉTER]
Montpellier: [À COMPLÉTER]
Rennes    : [À COMPLÉTER]
Rouen     : [À COMPLÉTER]
```

**Synthèse** : [X/11 sites accessibles]

---

## 🎯 CRITÈRES SUCCÈS

### ✅ SUCCÈS COMPLET (Objectif)
- 11/11 sites HTTPS accessible (200/301/302)
- Contenu correct (villes dynamiques)
- Certificats SSL valides
- Services Swarm 1/1
- Logs Nginx propres

### ⚠️ SUCCÈS PARTIEL (Acceptable)
- 9-10/11 sites accessibles (1-2 sites problème isolé)
- Contenu OK sauf bug [P0]-TASK-056 (Toulouse hardcodé) - à corriger après
- Certificats OK
- Services Swarm OK

### ❌ ÉCHEC (Option 2 requise)
- <9/11 sites accessibles
- Erreurs 502/503 généralisées
- Nginx ne démarre pas
- Certificats expirés

---

## 📝 ACTIONS SELON RÉSULTATS

### Si ✅ SUCCÈS COMPLET
1. ✅ Marquer Option 1 comme réussie
2. 📝 Documenter incident complet
3. 🔄 Décider si fix CapRover UI (Option 2) nécessaire
4. 🎯 Reprendre tâche [P0]-TASK-056 (Toulouse hardcodé)

### Si ⚠️ SUCCÈS PARTIEL
1. ⚠️ Investiguer 1-2 sites problème
2. 🔧 Fix ciblé containers concernés
3. ✅ Valider 11/11 OK après fix
4. 📝 Documenter anomalies

### Si ❌ ÉCHEC
1. ❌ Marquer Option 1 comme échouée
2. 🔧 Tenter Option 2 (fix config CapRover)
3. 📞 Préparer contact support Hostinger
4. 🚨 Évaluer DERNIER RECOURS (réinstall CapRover)

---

**Dernière mise à jour** : 11/11/2025 03:20 UTC

