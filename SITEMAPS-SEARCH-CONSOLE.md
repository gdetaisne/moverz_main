# 📍 Sitemaps - URLs pour Google Search Console

**Status :** ✅ Tous les sitemaps régénérés et prêts

**Date :** 9 janvier 2025

---

## ✅ NETTOYAGE EFFECTUÉ

**Anciens fichiers sitemap statiques supprimés :**
- ❌ `public/sitemap.xml` (obsolète)
- ❌ `public/sitemap-0.xml` (obsolète)

**Nouveau système :**
- ✅ Sitemaps dynamiques Next.js (`app/sitemap.ts`)
- ✅ Génération automatique à chaque build
- ✅ Inclut automatiquement les nouveaux articles

---

## 🗺️ URLS SITEMAPS PAR VILLE

### Villes avec Contenu (4 villes - Priorité)

| Ville | URL Sitemap | Articles | Statut |
|-------|-------------|----------|--------|
| **Marseille** | `https://www.marseille-demenageur.fr/sitemap.xml` | 10 | ✅ Prêt |
| **Lyon** | `https://www.lyon-demenageur.fr/sitemap.xml` | 10 | ✅ Prêt |
| **Montpellier** | `https://www.montpellier-demenageur.fr/sitemap.xml` | 10 | ✅ Prêt |
| **Bordeaux** | `https://www.bordeaux-demenageur.fr/sitemap.xml` | 103 | ✅ Prêt |

### Villes en Cours de Création (3 villes)

| Ville | URL Sitemap | Articles | Statut |
|-------|-------------|----------|--------|
| **Nantes** | `https://www.nantes-demenageur.fr/sitemap.xml` | 0 | 🔄 En cours |
| **Lille** | `https://www.lille-demenageur.fr/sitemap.xml` | 0 | 🔄 En cours |
| **Nice** | `https://www.nice-demenageur.fr/sitemap.xml` | 0 | 🔄 En cours |

### Villes à Venir (4 villes)

| Ville | URL Sitemap | Articles | Statut |
|-------|-------------|----------|--------|
| Strasbourg | `https://www.strasbourg-demenageur.fr/sitemap.xml` | 0 | ⏳ À faire |
| Rouen | `https://www.rouen-demenageur.fr/sitemap.xml` | 0 | ⏳ À faire |
| Rennes | `https://www.rennes-demenageur.fr/sitemap.xml` | 0 | ⏳ À faire |
| Toulouse | `https://www.toulouse-demenageur.fr/sitemap.xml` | 0 | ⏳ À faire |

---

## 🚀 SOUMISSION À GOOGLE SEARCH CONSOLE

### Méthode 1 : Vérification DNS (RECOMMANDÉE)

**Si vous avez un domaine principal unique :**

1. Ajoutez une propriété "Domaine" : `moverz.fr` (ou votre domaine)
2. Vérification DNS (enregistrement TXT)
3. **TOUS les sous-domaines sont automatiquement vérifiés !**

**Avantages :**
- ✅ Une seule vérification
- ✅ Tous les sitemaps inclus automatiquement
- ✅ Gain de temps énorme

---

### Méthode 2 : Soumission Individuelle

**Pour chaque ville :**

1. **Ajouter la propriété**
   ```
   Search Console → Ajouter une propriété
   → Préfixe d'URL
   → Entrer : https://www.marseille-demenageur.fr
   → Vérifier (fichier HTML ou balise meta)
   ```

2. **Soumettre le sitemap**
   ```
   Search Console → Sitemaps
   → Ajouter un sitemap
   → URL : https://www.marseille-demenageur.fr/sitemap.xml
   → Envoyer
   ```

3. **Répéter pour chaque ville**

---

## 📋 CHECKLIST PAR VILLE

### Marseille ✅
- [ ] Propriété ajoutée dans Search Console
- [ ] Sitemap soumis : `https://www.marseille-demenageur.fr/sitemap.xml`
- [ ] Demander indexation page d'accueil
- [ ] Demander indexation Top 3 piliers :
  - Garde meuble (2 050/mois)
  - Déménageur (360/mois)
  - Pas cher (140/mois)

### Lyon ✅
- [ ] Propriété ajoutée
- [ ] Sitemap soumis : `https://www.lyon-demenageur.fr/sitemap.xml`
- [ ] Top 3 piliers indexés :
  - Garde meuble (2 130/mois)
  - Déménageur (1 330/mois)
  - Location camion (250/mois)

### Montpellier ✅
- [ ] Propriété ajoutée
- [ ] Sitemap soumis : `https://www.montpellier-demenageur.fr/sitemap.xml`
- [ ] Top 3 piliers indexés :
  - Garde meuble (1 200/mois)
  - Déménageur (1 160/mois)
  - Pas cher (90/mois)

### Bordeaux ✅
- [ ] Propriété ajoutée
- [ ] Sitemap soumis : `https://www.bordeaux-demenageur.fr/sitemap.xml`
- [ ] Pages principales indexées

### Nantes 🔄
- [ ] Attendre fin création piliers
- [ ] Puis soumettre sitemap

### Lille 🔄
- [ ] Attendre fin création piliers
- [ ] Puis soumettre sitemap

### Nice 🔄
- [ ] Attendre fin création piliers
- [ ] Puis soumettre sitemap

---

## 📊 CONTENU DES SITEMAPS

**Chaque sitemap inclut automatiquement :**

```
✅ Page d'accueil (priority: 1.0)
✅ Pages services (priority: 0.8)
✅ Pages quartiers locaux (priority: 0.8)
✅ Pages corridors (Paris, Lyon, etc.) (priority: 0.8)
✅ Blog principal (priority: 0.9)
✅ Catégories blog (priority: 0.85)
✅ Articles piliers (priority: 0.9)
✅ Articles satellites (priority: 0.7)
✅ FAQ, Contact, etc. (priority: 0.6-0.7)
```

**Mise à jour automatique :**
- ✅ Nouveaux articles ajoutés automatiquement
- ✅ Dates de modification actualisées
- ✅ Pas de maintenance manuelle nécessaire

---

## 🔍 VÉRIFICATION

**Pour vérifier qu'un sitemap fonctionne :**

### En Local (Dev)
```bash
cd sites/marseille
npm run dev
# Accéder à : http://localhost:3000/sitemap.xml
```

### En Production
```bash
# Marseille
curl -I https://www.marseille-demenageur.fr/sitemap.xml

# Devrait retourner : HTTP 200 OK
# Content-Type: application/xml
```

---

## 🎯 TEMPS ESTIMÉ SOUMISSION

### Méthode DNS (Recommandée)
```
Configuration DNS : 5 min
Propagation : 10 min
Vérification : 1 min
────────────────────
Total : 15 min pour TOUTES les villes ⚡
```

### Méthode Individuelle
```
Par ville : 3 min
11 villes × 3 min = 33 min
────────────────────
Total : 33 min
```

---

## ⚠️ NOTES IMPORTANTES

### 1. Déploiement Requis
Les sitemaps dynamiques sont générés au build.
**Après avoir créé de nouveaux articles :**
```bash
cd sites/[ville]
npm run build
# Puis déployer
```

### 2. Robots.txt
Chaque ville a un `robots.txt` qui référence le sitemap :
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://www.marseille-demenageur.fr/sitemap.xml
```

### 3. Indexation Progressive
**Après soumission :**
- Jour 1-3 : Découverte du sitemap
- Jour 3-7 : Indexation pages principales
- Semaine 2-4 : Indexation articles
- Mois 1-3 : Classement progressif

### 4. Demander l'Indexation Manuelle
**Pour accélérer (prioritaire) :**
```
Search Console → Inspection d'URL
→ Coller URL de la page d'accueil
→ Demander l'indexation
→ Répéter pour Top 3 piliers
```

---

## 📈 SUIVI APRÈS SOUMISSION

**À vérifier dans Search Console :**

### Semaine 1
- [ ] Sitemap découvert (statut : Réussite)
- [ ] Nombre d'URLs découvertes
- [ ] Erreurs éventuelles

### Semaine 2-3
- [ ] URLs indexées (augmentation)
- [ ] Impressions dans résultats de recherche
- [ ] Position moyenne

### Mois 1-3
- [ ] Clics organiques
- [ ] Pages les plus performantes
- [ ] Requêtes top

---

## 🆘 DÉPANNAGE

### "Sitemap non trouvé" (404)
```
Cause : Site pas encore déployé ou build manquant
Solution : 
  cd sites/[ville]
  npm run build
  # Puis déployer
```

### "Erreurs d'analyse"
```
Cause : URLs invalides dans sitemap.ts
Solution : Vérifier baseUrl dans app/sitemap.ts
```

### "Pas d'URLs soumises"
```
Cause : Sitemap vide
Solution : Vérifier que getAllBlogPosts() retourne des articles
```

---

## ✅ RÉSUMÉ

```
✅ 11 villes configurées
✅ Sitemaps dynamiques actifs
✅ Anciens fichiers nettoyés
✅ Prêt pour Search Console
✅ Mise à jour automatique

🎯 Action : Soumettre les sitemaps dans Search Console
⏱️  Temps : 15-30 min pour toutes les villes
📊 Impact : Indexation rapide des 143 articles
```

---

**Fichier créé le :** 9 janvier 2025  
**Dernière mise à jour :** 9 janvier 2025  
**Status :** ✅ Prêt pour soumission

