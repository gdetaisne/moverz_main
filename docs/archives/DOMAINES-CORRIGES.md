# ✅ CORRECTION DES DOMAINES - TOUS LES SITES

**Date:** 9 octobre 2025  
**Action:** Mise à jour des configurations sitemap avec les bons domaines

---

## 🎯 PROBLÈME IDENTIFIÉ

Les fichiers de configuration (`next-sitemap.config.js` et `app/sitemap.ts`) utilisaient les anciens domaines de type `www.[ville]-demenageur.fr` au lieu des vrais domaines en production.

Résultat : **Google Search Console refusait les sitemaps** avec l'erreur "Adresse de sitemap incorrecte".

---

## ✅ CORRECTIONS APPLIQUÉES

### Fichiers modifiés par site (2 fichiers × 11 sites = 22 fichiers)

Pour chaque site :
- ✅ `sites/[ville]/next-sitemap.config.js` → ligne 3 : `siteUrl`
- ✅ `sites/[ville]/app/sitemap.ts` → ligne 5 : `baseUrl`

---

## 🗺️ DOMAINES CORRECTS PAR SITE

| Ville | Ancien domaine (❌) | Nouveau domaine (✅) |
|-------|---------------------|---------------------|
| **Marseille** | www.marseille-demenageur.fr | **devis-demenageur-marseille.fr** |
| **Lyon** | www.lyon-demenageur.fr | **devis-demenageur-lyon.fr** |
| **Montpellier** | www.montpellier-demenageur.fr | **devis-demenageur-montpellier.fr** |
| **Bordeaux** | *(déjà correct)* | **www.bordeaux-demenageur.fr** |
| **Nantes** | www.nantes-demenageur.fr | **devis-demenageur-nantes.fr** |
| **Lille** | www.lille-demenageur.fr | **devis-demenageur-lille.fr** |
| **Nice** | www.nice-demenageur.fr | **devis-demenageur-nice.fr** |
| **Strasbourg** | www.strasbourg-demenageur.fr | **devis-demenageur-strasbourg.fr** |
| **Rouen** | www.rouen-demenageur.fr | **devis-demenageur-rouen.fr** |
| **Rennes** | www.rennes-demenageur.fr | **devis-demenageur-rennes.fr** |
| **Toulouse** | www.toulouse-demenageur.fr | **devis-demenageur-toulousain.fr** |

---

## 📋 URLS SITEMAPS FINALES

### ✅ Sites prêts (avec piliers)
```
https://devis-demenageur-marseille.fr/sitemap.xml
https://devis-demenageur-lyon.fr/sitemap.xml
https://devis-demenageur-montpellier.fr/sitemap.xml
https://www.bordeaux-demenageur.fr/sitemap.xml
```

### 🔄 Sites en cours (piliers en création)
```
https://devis-demenageur-nantes.fr/sitemap.xml
https://devis-demenageur-lille.fr/sitemap.xml
https://devis-demenageur-nice.fr/sitemap.xml
```

### ⏳ Sites à venir
```
https://devis-demenageur-strasbourg.fr/sitemap.xml
https://devis-demenageur-rouen.fr/sitemap.xml
https://devis-demenageur-rennes.fr/sitemap.xml
https://devis-demenageur-toulousain.fr/sitemap.xml
```

---

## 🚀 PROCHAINES ÉTAPES

### 1. **Redéployer les sites** (obligatoire)
Les modifications doivent être déployées pour que les nouveaux sitemaps soient disponibles :
```bash
# Redéployer chaque site sur CapRover
git push caprover-marseille main
git push caprover-lyon main
git push caprover-montpellier main
# etc.
```

### 2. **Soumettre à Google Search Console**
Une fois déployés :
1. Aller sur https://search.google.com/search-console
2. Sélectionner la propriété du site
3. Menu **Sitemaps**
4. Ajouter : `sitemap.xml`
5. Cliquer **Envoyer**

### 3. **Vérifier les sitemaps**
Tester manuellement dans le navigateur :
```
https://devis-demenageur-marseille.fr/sitemap.xml
https://devis-demenageur-lyon.fr/sitemap.xml
etc.
```

---

## ✨ RÉSULTAT ATTENDU

Après déploiement et re-soumission :
- ✅ Google Search Console acceptera les sitemaps
- ✅ Tous les piliers seront indexés
- ✅ Les articles seront découverts automatiquement
- ✅ Meilleure visibilité SEO

---

## 📝 NOTES TECHNIQUES

### Variable d'environnement
Les configurations utilisent :
```javascript
siteUrl: process.env.SITE_URL || 'https://devis-demenageur-[ville].fr'
```

Si `SITE_URL` est défini en environnement, il sera utilisé en priorité.  
Sinon, la valeur par défaut (maintenant corrigée) sera utilisée.

### Génération dynamique
Les sitemaps sont **générés dynamiquement** à chaque build :
- Next.js lit le dossier `content/blog/`
- Détecte automatiquement tous les articles
- Génère le sitemap complet
- Aucune action manuelle nécessaire pour ajouter de nouveaux articles

---

✅ **Correction terminée et prête pour déploiement !**

