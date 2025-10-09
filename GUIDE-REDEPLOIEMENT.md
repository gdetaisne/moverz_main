# 🚀 GUIDE DE REDÉPLOIEMENT - CORRECTION SITEMAPS

**Date:** 9 octobre 2025  
**Action:** Redéployer tous les sites pour appliquer les corrections de domaines sitemap

---

## ⚠️ POURQUOI CE REDÉPLOIEMENT EST NÉCESSAIRE

Les configurations sitemap utilisaient les **mauvais domaines** :
- ❌ Ancien : `www.marseille-demenageur.fr`
- ✅ Nouveau : `devis-demenageur-marseille.fr`

**Résultat :** Google Search Console refusait les sitemaps avec l'erreur **"Adresse de sitemap incorrecte"**.

Les corrections ont été committées et pushées sur GitHub, mais **les sites en production utilisent encore l'ancien code**.

---

## 🎯 MÉTHODE 1 : SCRIPT AUTOMATIQUE (RECOMMANDÉ)

### Pré-requis
- Accès à CapRover : https://captain.gslv.cloud
- Token CapRover (Settings → Access Token)

### Étapes
```bash
# 1. Exporter le token CapRover
export CAPROVER_TOKEN='ton_token_ici'

# 2. Lancer le script
./redeploy-all-sites.sh
```

Le script va automatiquement :
- ✅ Déclencher le rebuild de chaque app
- ✅ Afficher la progression
- ✅ Confirmer les succès/échecs

**Durée totale :** ~30-60 minutes (tous les sites)

---

## 🔧 MÉTHODE 2 : REDÉPLOIEMENT MANUEL VIA L'INTERFACE

### Accès CapRover
1. Ouvre : **https://captain.gslv.cloud**
2. Connecte-toi avec tes identifiants

### Pour chaque site

#### 🎯 SITES PRIORITAIRES (à faire EN PREMIER)

##### 1️⃣ **dd-marseille** (Marseille - 10 piliers)
- Va sur : **Apps** → **dd-marseille**
- Clique sur l'onglet **"Deployment"**
- Clique sur **"Force Rebuild"**
- Attends la fin du build (~3-5 min)
- ✅ Vérifie : https://devis-demenageur-marseille.fr/sitemap.xml

##### 2️⃣ **dd-lyon** (Lyon - 10 piliers)
- Va sur : **Apps** → **dd-lyon**
- Clique sur l'onglet **"Deployment"**
- Clique sur **"Force Rebuild"**
- Attends la fin du build (~3-5 min)
- ✅ Vérifie : https://devis-demenageur-lyon.fr/sitemap.xml

##### 3️⃣ **dd-montpellier** (Montpellier - 10 piliers)
- Va sur : **Apps** → **dd-montpellier**
- Clique sur l'onglet **"Deployment"**
- Clique sur **"Force Rebuild"**
- Attends la fin du build (~3-5 min)
- ✅ Vérifie : https://devis-demenageur-montpellier.fr/sitemap.xml

##### 4️⃣ **dd-bordeaux** (Bordeaux - 143 articles)
- Va sur : **Apps** → **dd-bordeaux**
- Clique sur l'onglet **"Deployment"**
- Clique sur **"Force Rebuild"**
- Attends la fin du build (~3-5 min)
- ✅ Vérifie : https://www.bordeaux-demenageur.fr/sitemap.xml

---

#### 🔄 SITES EN COURS (piliers en création)

##### 5️⃣ **dd-nantes** (Nantes)
- Va sur : **Apps** → **dd-nantes**
- Clique **"Force Rebuild"**
- ✅ Vérifie : https://devis-demenageur-nantes.fr/sitemap.xml

##### 6️⃣ **dd-lille** (Lille)
- Va sur : **Apps** → **dd-lille**
- Clique **"Force Rebuild"**
- ✅ Vérifie : https://devis-demenageur-lille.fr/sitemap.xml

##### 7️⃣ **dd-nice** (Nice)
- Va sur : **Apps** → **dd-nice**
- Clique **"Force Rebuild"**
- ✅ Vérifie : https://devis-demenageur-nice.fr/sitemap.xml

---

#### ⏳ AUTRES SITES (optionnel immédiatement)

Tu peux les faire plus tard si tu veux, mais pour être complet :

- **dd-strasbourg** → https://devis-demenageur-strasbourg.fr/sitemap.xml
- **dd-rouen** → https://devis-demenageur-rouen.fr/sitemap.xml
- **dd-rennes** → https://devis-demenageur-rennes.fr/sitemap.xml
- **dd-toulouse** → https://devis-demenageur-toulousain.fr/sitemap.xml

---

## ✅ VÉRIFICATION APRÈS REDÉPLOIEMENT

### Test des sitemaps

Ouvre chaque URL dans ton navigateur :

**Sites prioritaires :**
```
✅ https://devis-demenageur-marseille.fr/sitemap.xml
✅ https://devis-demenageur-lyon.fr/sitemap.xml
✅ https://devis-demenageur-montpellier.fr/sitemap.xml
✅ https://www.bordeaux-demenageur.fr/sitemap.xml
```

### Ce que tu dois voir :

**✅ Bon sitemap :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devis-demenageur-marseille.fr/</loc>
    <lastmod>2025-10-09</lastmod>
    ...
  </url>
  <url>
    <loc>https://devis-demenageur-marseille.fr/blog/garde-meuble-marseille/...</loc>
    ...
  </url>
</urlset>
```

**❌ Mauvais sitemap (si non redéployé) :**
```xml
<loc>https://www.marseille-demenageur.fr/</loc>  ← Mauvais domaine !
```

---

## 📊 SOUMISSION À GOOGLE SEARCH CONSOLE

**Une fois les 4 sites prioritaires redéployés et vérifiés :**

### Pour chaque site :

1. Va sur : **https://search.google.com/search-console**
2. Sélectionne la propriété du site (ex: `devis-demenageur-marseille.fr`)
3. Menu de gauche → **Sitemaps**
4. Dans "Ajouter un nouveau sitemap" :
   - Entre : `sitemap.xml`
   - Clique **Envoyer**
5. Attends quelques minutes
6. Rafraîchis la page
7. ✅ Le statut devrait être : **"Réussi"** (au lieu de "Erreur")

### Répète pour :
- ✅ devis-demenageur-marseille.fr
- ✅ devis-demenageur-lyon.fr
- ✅ devis-demenageur-montpellier.fr
- ✅ bordeaux-demenageur.fr

---

## 📋 CHECKLIST COMPLÈTE

### Phase 1 : Redéploiements prioritaires (30-45 min)
- [ ] dd-marseille redéployé
- [ ] dd-lyon redéployé
- [ ] dd-montpellier redéployé
- [ ] dd-bordeaux redéployé
- [ ] Sitemaps vérifiés (4 sites)

### Phase 2 : Soumission Search Console (10 min)
- [ ] Marseille → sitemap soumis
- [ ] Lyon → sitemap soumis
- [ ] Montpellier → sitemap soumis
- [ ] Bordeaux → sitemap soumis
- [ ] Statuts vérifiés (tous "Réussi")

### Phase 3 : Sites en cours (15-30 min)
- [ ] dd-nantes redéployé
- [ ] dd-lille redéployé
- [ ] dd-nice redéployé
- [ ] Sitemaps vérifiés

### Phase 4 : Autres sites (optionnel)
- [ ] dd-strasbourg redéployé
- [ ] dd-rouen redéployé
- [ ] dd-rennes redéployé
- [ ] dd-toulouse redéployé

---

## ⏱️ TIMING ESTIMÉ

| Phase | Durée | Sites |
|-------|-------|-------|
| **Phase 1** | 30-45 min | 4 sites prioritaires |
| **Phase 2** | 10 min | Soumission Search Console |
| **Phase 3** | 15-30 min | 3 sites en cours |
| **Phase 4** | 20-40 min | 4 autres sites |
| **TOTAL** | **1h15-2h15** | **11 sites** |

💡 **Astuce :** Tu peux lancer plusieurs builds en parallèle dans CapRover (ils ne se bloquent pas entre eux).

---

## 🆘 DÉPANNAGE

### Erreur "Build failed"
- Vérifie les logs dans CapRover → App → Deployment → View Logs
- Vérifie que le code est bien sur GitHub (main branch)
- Essaye à nouveau le rebuild

### Sitemap toujours avec l'ancien domaine
- Le cache peut prendre quelques minutes
- Force le refresh : Ctrl+Shift+R (ou Cmd+Shift+R sur Mac)
- Vérifie que le build CapRover est bien terminé avec succès

### Search Console refuse toujours le sitemap
- Vérifie que le bon domaine est dans le sitemap.xml
- Attends 5-10 minutes après redéploiement
- Essaye de soumettre à nouveau

---

## ✨ RÉSULTAT ATTENDU

### Après tout le processus :

✅ **11 sites redéployés** avec les bons domaines  
✅ **4 sites prioritaires** soumis à Search Console  
✅ **40+ piliers SEO** indexables par Google  
✅ **143 articles Bordeaux** indexables  
✅ **Aucune erreur** "Adresse de sitemap incorrecte"  
✅ **Meilleure découvrabilité** pour tous les nouveaux contenus

---

## 📞 SUPPORT

Si tu rencontres des problèmes :
1. Vérifie les logs CapRover
2. Vérifie le code sur GitHub (branche main)
3. Teste manuellement les URLs des sitemaps
4. Regarde les erreurs dans Search Console

---

**Date de création :** 9 octobre 2025  
**Commit associé :** `db288c0 - fix: Correction domaines sitemap`

🚀 **Bon courage avec les redéploiements !**

