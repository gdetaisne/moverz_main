# 🚨 REDÉPLOIEMENT URGENT - TOUS LES SITES

**Date :** 9 octobre 2025  
**Raison :** Correction erreur 500 front matter blog  
**Sites affectés :** 10 sites (271 articles corrigés)

---

## 📊 STATUT

✅ **Code corrigé et pushé sur GitHub** pour tous les sites  
⏳ **Redéploiement CapRover requis** (sites actuellement potentiellement en erreur)

---

## 🎯 SITES À REDÉPLOYER (PAR PRIORITÉ)

### 🔴 PRIORITÉ HAUTE (Sites avec blog actif)

1. **dd-marseille** (10 piliers)
2. **dd-lyon** (10 piliers)
3. **dd-montpellier** (10 piliers)
4. **dd-bordeaux** (143 articles - gros site)

### 🟠 PRIORITÉ MOYENNE (Sites en cours)

5. **dd-nantes** (10 piliers)
6. **dd-lille** (10 piliers)
7. **dd-nice** (10 piliers)
8. **dd-rennes** (10 piliers)

### 🟡 PRIORITÉ NORMALE

9. **dd-rouen** (5 piliers + 2 nouveaux)
10. **dd-toulouse** (93 articles)

---

## 🚀 MÉTHODE DE REDÉPLOIEMENT

### Option A : Via Interface CapRover (RECOMMANDÉ)

Pour chaque site :

1. Ouvre : https://captain.gslv.cloud
2. Apps → **[nom-app]** (ex: dd-marseille)
3. Deployment → **Force Rebuild**
4. Attends 2-3 minutes
5. Vérifie : https://[domaine]/blog

**Ordre suggéré :**
```
dd-marseille
dd-lyon
dd-montpellier
dd-bordeaux
dd-nantes
dd-lille
dd-nice
dd-rennes
dd-rouen
dd-toulouse
```

---

### Option B : Via API CapRover (si token disponible)

```bash
# Définir le token
export CAPROVER_TOKEN='ton_token_caprover'

# Redéployer un site
curl -X POST https://captain.gslv.cloud/api/v2/user/apps/webhooks/triggerbuild \
  -H "Content-Type: application/json" \
  -H "x-captain-auth: $CAPROVER_TOKEN" \
  -d '{"appName": "dd-marseille"}'
```

---

## ✅ TESTS À EFFECTUER

Après chaque redéploiement, vérifier :

### dd-marseille
- https://devis-demenageur-marseille.fr/blog
- https://devis-demenageur-marseille.fr/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet

### dd-lyon
- https://devis-demenageur-lyon.fr/blog
- https://devis-demenageur-lyon.fr/blog/garde-meuble-lyon/garde-meuble-lyon-guide-complet

### dd-montpellier
- https://devis-demenageur-montpellier.fr/blog
- https://devis-demenageur-montpellier.fr/blog/garde-meuble-montpellier/garde-meuble-montpellier-guide-complet

### dd-bordeaux
- https://www.bordeaux-demenageur.fr/blog
- https://www.bordeaux-demenageur.fr/blog/garde-meuble-bordeaux/garde-meuble-bordeaux-guide

### dd-nantes
- https://devis-demenageur-nantes.fr/blog
- https://devis-demenageur-nantes.fr/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet

### dd-lille
- https://devis-demenageur-lille.fr/blog
- https://devis-demenageur-lille.fr/blog/garde-meuble-lille/garde-meuble-lille-guide-complet

### dd-nice
- https://devis-demenageur-nice.fr/blog
- https://devis-demenageur-nice.fr/blog/garde-meuble-nice/garde-meuble-nice-guide-complet

### dd-rennes
- https://devis-demenageur-rennes.fr/blog
- https://devis-demenageur-rennes.fr/blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet

### dd-rouen
- https://devis-demenageur-rouen.fr/blog
- https://devis-demenageur-rouen.fr/blog/garde-meuble-rouen/garde-meuble-rouen-guide-complet

### dd-toulouse
- https://devis-demenageur-toulousain.fr/blog
- https://devis-demenageur-toulousain.fr/blog/piliers/demenageur-toulouse

---

## 📋 CHECKLIST DE VÉRIFICATION

Pour chaque site, vérifier que :

- [ ] Page `/blog` affiche la liste des articles
- [ ] Aucune erreur 500
- [ ] Les piliers s'affichent correctement
- [ ] Les métadonnées (nombre de mots, date) sont visibles
- [ ] Les catégories fonctionnent
- [ ] Le sitemap inclut les articles blog

---

## 🔍 RÉSUMÉ DES CORRECTIONS

**Problème :** Format front matter incompatible avec `lib/blog.ts`

**Corrections appliquées :**
- `publishedAt` → `publish_date`
- `description` → `meta_description`
- Ajout `type` (pilier/satellite)
- Ajout `word_count` (calculé automatiquement)
- Ajout `meta_title` et `h1` si manquants
- Ajout `slug` et `category` si manquants

**Fichiers modifiés par site :**
- Marseille : 10
- Lyon : 10
- Montpellier : 10
- Nantes : 10
- Lille : 10
- Nice : 10
- Rennes : 10
- Rouen : 5
- Toulouse : 93
- Bordeaux : 103

**Total : 271 fichiers corrigés**

---

## 📊 TEMPS ESTIMÉ

- Redéploiement par site : ~2-3 minutes
- Total (10 sites) : ~25-30 minutes
- Tests : ~15-20 minutes

**Total estimé : 40-50 minutes**

---

## ⚠️ NOTES IMPORTANTES

1. **Strasbourg déjà corrigé** : Déjà redéployé séparément
2. **Bordeaux** : Site le plus gros (143 articles), peut prendre un peu plus de temps
3. **Toulouse** : 93 articles, build potentiellement plus long

---

## 📞 EN CAS DE PROBLÈME

Si un site reste en erreur après redéploiement :

1. Vérifier les logs CapRover (Apps → [nom-app] → Logs)
2. Vérifier que le commit GitHub est bien pris en compte
3. Forcer un nouveau rebuild
4. Si erreur persiste, vérifier manuellement le front matter d'un article

---

**Créé :** 9 octobre 2025  
**Statut :** Prêt pour redéploiement  
**Urgence :** HAUTE (sites potentiellement cassés)

