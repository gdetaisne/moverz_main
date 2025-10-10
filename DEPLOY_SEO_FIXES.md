# 🚀 DÉPLOIEMENT URGENT - CORRECTIONS SEO

**Date:** 10 octobre 2025  
**Commits pushés:** ✅ 3 commits sur GitHub main  
**Status:** En attente de déploiement CapRover

---

## ✅ CE QUI A ÉTÉ PUSHÉ SUR GITHUB

### 3 commits déployables:
1. `a7913b6` - fix(seo): resolve 83 critical SEO issues
2. `55794bb` - fix(seo): improve blog slugs and local page metadata  
3. `db0be7b` - docs(seo): add comprehensive SEO audit final report

### 117 fichiers modifiés:
- 61 corridors → descriptions uniques
- 22 pages principales → metadata complètes
- 11 templates blog → slugs optimisés
- 11 templates quartiers → SEO amélioré

---

## 🎯 SITES À DÉPLOYER (11 villes)

### PRIORITÉ 1 - Sites avec beaucoup de contenu
1. **dd-bordeaux** (Bordeaux) - 143 articles blog
2. **dd-marseille** (Marseille) - 10 piliers
3. **dd-lyon** (Lyon) - 10 piliers
4. **dd-montpellier** (Montpellier) - 10 piliers

### PRIORITÉ 2 - Sites actifs
5. **dd-nantes** (Nantes)
6. **dd-lille** (Lille)
7. **dd-nice** (Nice)
8. **dd-toulouse** (Toulouse)

### PRIORITÉ 3 - Autres
9. **dd-strasbourg** (Strasbourg)
10. **dd-rouen** (Rouen)
11. **dd-rennes** (Rennes)

---

## 🔧 MÉTHODES DE DÉPLOIEMENT

### OPTION 1: Via API CapRover (le plus rapide)

Si tu as le token CapRover, exporte-le et relance:

```bash
export CAPROVER_TOKEN='ton_token_caprover'
./redeploy-all-sites.sh
```

**Comment obtenir le token:**
1. Va sur https://captain.gslv.cloud
2. Settings → Access Token
3. Copie le token
4. Export dans terminal

---

### OPTION 2: Interface CapRover (manuel mais sûr)

**Pour CHAQUE site** (11 au total):

1. **Ouvre CapRover:** https://captain.gslv.cloud
2. **Apps** → Sélectionne le site (ex: `dd-bordeaux`)
3. **Deployment** (onglet)
4. **Scroll en bas** → Clique **"Force Rebuild"**
5. **Attends 2-5 minutes** → Vérifie que le build passe ✅

**Commence par les prioritaires:**
- dd-bordeaux
- dd-marseille
- dd-lyon
- dd-montpellier

---

### OPTION 3: Script automatique avec token

Si tu veux automatiser, crée un fichier `.env` à la racine:

```bash
# .env
CAPROVER_TOKEN=ton_token_ici
```

Puis:
```bash
source .env
./redeploy-all-sites.sh
```

---

## ⏱️ TEMPS DE DÉPLOIEMENT

- **Par site:** 2-5 minutes
- **Total (11 sites):** ~30-60 minutes
- **Parallèle possible:** oui si tu lances plusieurs en même temps

---

## ✅ VÉRIFICATION POST-DÉPLOIEMENT

### 1. Vérifier qu'un site est déployé:

```bash
# Teste bordeaux par exemple
curl -I https://www.bordeaux-demenageur.fr/
# Doit retourner 200 OK

curl -s https://www.bordeaux-demenageur.fr/ | grep -i "Déménagement Bastide Bordeaux"
# Doit contenir le nouveau title optimisé
```

### 2. Vérifier les metadata sur quelques pages:

**Pages à tester:**

A. **Page quartier** (doit avoir le nouveau title long)
- https://www.bordeaux-demenageur.fr/bordeaux/bastide
- Title attendu: "Déménagement Bastide Bordeaux - Tarifs & Devis Gratuit | Moverz"

B. **Page corridor** (doit avoir description unique)
- https://www.bordeaux-demenageur.fr/bordeaux-vers-lyon
- Description attendue: contient distance, durée, prix

C. **Page blog** (doit avoir metadata)
- https://www.bordeaux-demenageur.fr/blog
- Title attendu: "Blog Déménagement Bordeaux - Guides & Conseils..."

D. **Page comment-ca-marche** (doit avoir metadata)
- https://www.bordeaux-demenageur.fr/comment-ca-marche
- Title attendu: "Comment ça marche ? Déménagement Bordeaux..."

### 3. Vérifier les sitemaps:

```bash
curl -s https://devis-demenageur-marseille.fr/sitemap.xml | head -20
curl -s https://devis-demenageur-lyon.fr/sitemap.xml | head -20
curl -s https://www.bordeaux-demenageur.fr/sitemap.xml | head -20
```

---

## 🎨 CHECKLIST DE DÉPLOIEMENT

### Avant déploiement
- [x] Commits poussés sur GitHub ✅
- [x] Scripts de déploiement prêts ✅
- [x] Documentation complète ✅

### Pendant déploiement (pour chaque site)
- [ ] dd-bordeaux déployé
- [ ] dd-marseille déployé
- [ ] dd-lyon déployé
- [ ] dd-montpellier déployé
- [ ] dd-nantes déployé
- [ ] dd-lille déployé
- [ ] dd-nice déployé
- [ ] dd-toulouse déployé
- [ ] dd-strasbourg déployé
- [ ] dd-rouen déployé
- [ ] dd-rennes déployé

### Après déploiement
- [ ] Vérifier 3-4 sites aléatoirement
- [ ] Tester les nouveaux titles sur pages quartiers
- [ ] Vérifier les descriptions corridors uniques
- [ ] Confirmer metadata blog/comment-ca-marche
- [ ] Relancer audit SEO (optionnel)

---

## 🚨 EN CAS DE PROBLÈME

### Si un build échoue:

1. **Regarde les logs CapRover:**
   - CapRover → Apps → [site] → Deployment → View Logs

2. **Problèmes courants:**
   - Erreur de build Next.js → Vérifier les imports TypeScript
   - Timeout → Relancer le build
   - Erreur mémoire → Augmenter RAM dans CapRover settings

3. **Rollback si nécessaire:**
   - CapRover garde les anciennes versions
   - Tu peux revenir en arrière facilement

### Si les metadata n'apparaissent pas:

1. **Vérifier le cache Next.js:**
   - Les pages sont statiques, peut nécessiter rebuild complet
   - Force Rebuild (pas juste Deploy)

2. **Vérifier en mode incognito:**
   - Évite les caches navigateur

3. **Attendre 5-10 minutes:**
   - CDN peut mettre du temps à propager

---

## 📊 MONITORING POST-DÉPLOIEMENT

### Immédiat (J+0)
- Vérifier que tous les sites sont UP
- Tester 3-4 pages par site
- Confirmer que les builds ont réussi

### Court terme (J+1 à J+7)
- Surveiller Google Search Console
- Vérifier les positions SEO ne chutent pas
- Monitorer le trafic organique

### Moyen terme (J+7 à J+30)
- Mesurer l'impact des corrections SEO
- Analyser le CTR dans SERPs
- Relancer un audit pour confirmer

---

## 💡 ASTUCES

### Déploiement parallèle:
Ouvre 4 onglets CapRover et lance 4 sites en même temps pour gagner du temps.

### Commandes utiles:

```bash
# Vérifier que le code a bien été pushé
git log --oneline -5

# Vérifier le statut GitHub
git status

# Re-pusher si besoin (sans danger, idempotent)
git push origin main

# Relancer audit SEO après déploiement
node audit-seo-global.js
```

---

## 🎉 UNE FOIS TOUT DÉPLOYÉ

**Tu auras:**
- ✅ 11 sites avec corrections SEO live
- ✅ 80% des pages optimisées
- ✅ 0 duplicate content critique
- ✅ Base propre pour linking interne

**Prochaine étape:**
🔗 **Commencer la stratégie de linking interne !**

---

**Besoin d'aide ?** Tous les scripts et rapports sont dans le repo.

**Contact:** Head of SEO  
**Date création:** 10 octobre 2025

