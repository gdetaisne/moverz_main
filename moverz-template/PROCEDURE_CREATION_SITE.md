# 📋 **Procédure de Création d'un Nouveau Site - Moverz Template**

## 🎯 **Objectif**
Créer un site de déménagement personnalisé pour une ville en utilisant le système de templates Handlebars, avec des données réelles et de qualité SEO.

---

## ✅ **1. PRÉPARATION (Checklist Obligatoire)**

### **1.1 Validation du Domaine**
- [ ] **Nom de domaine confirmé** (ex: `https://www.bordeaux-demenageur.fr`)
- [ ] **Titre du header** = `[Ville] Déménagement` (ex: "Bordeaux Déménagement")
- [ ] **Email de contact** = `contact@[domaine]` (ex: `contact@bordeaux-demenageur.fr`)

### **1.2 Vérification des Prérequis**
- [ ] Template fonctionnel dans `moverz-template/`
- [ ] Script de génération opérationnel
- [ ] Données de base collectées (ville, région, code postal)

---

## 🔍 **2. RECHERCHE DE DONNÉES (Deep Search)**

### **2.1 Informations de Base**
**Sources recommandées :**
- Site officiel de la ville
- Wikipedia (données démographiques)
- Office de tourisme local
- Sites immobiliers locaux

**Données à collecter :**
```json
{
  "city_name": "Bordeaux",
  "citySlug": "bordeaux", 
  "region": "Nouvelle-Aquitaine",
  "zipCodes": "33000-33800",
  "population": "257000",
  "description": "Ville portuaire historique..."
}
```

### **2.2 Quartiers et Zones**
**Méthode de recherche :**
1. Identifier les 5-7 quartiers principaux
2. Rechercher les codes postaux spécifiques
3. Analyser les contraintes de circulation
4. Collecter des descriptions authentiques

**Structure des données :**
```json
"quartiers": [
  {
    "nom": "Chartrons",
    "slug": "chartrons-bordeaux",
    "codePostal": "33000",
    "description": "Quartier historique des Chartrons, rues pavées et immeubles de caractère du XVIIIe siècle",
    "contraintes": "Rues très étroites, accès difficile pour les gros véhicules, stationnement limité",
    "stats": {
      "dossiers": "180+",
      "demenageurs": "12+",
      "delai": "7 jours"
    }
  }
]
```

### **2.3 Contraintes Spécifiques**
**Éléments à rechercher :**
- **Circulation** : Rues étroites, zones piétonnes, tramway
- **Stationnement** : Zones payantes, limitations horaires, autorisations
- **Accès** : Restrictions pour gros véhicules, ponts, tunnels
- **Spécificités** : Monuments historiques, zones protégées

### **2.4 Prix Indicatifs**
**Méthode de recherche :**
1. Analyser 3-5 sites de déménageurs locaux
2. Comparer les tarifs par type de logement
3. Ajuster selon la localisation (centre vs périphérie)

**Structure standard :**
```json
"pricing": {
  "studio": "350-650€",
  "t2": "550-950€", 
  "t3": "750-1250€",
  "t4": "950-1600€"
}
```

### **2.5 Partenaires Locaux**
**Recherche :**
- Annuaires professionnels (Pages Jaunes, Kompass)
- Sites de déménageurs locaux
- Chambres de commerce

**Données :**
```json
"partners": [
  {
    "name": "Déménageurs Bordeaux Express",
    "description": "Spécialistes du déménagement dans le centre historique",
    "logo": "/images/partners/partner1.png"
  }
]
```

---

## 🏗️ **3. GÉNÉRATION DU SITE**

### **3.1 Création du Fichier de Données**
```bash
# 1. Créer le fichier de données
./create-site.sh "Bordeaux" "https://www.bordeaux-demenageur.fr"

# 2. Personnaliser les données réelles
# Éditer data/bordeaux.json avec les vraies données collectées
```

### **3.2 Génération avec Handlebars**
```bash
# Générer le site complet
node scripts/generate-site-handlebars.js bordeaux
```

### **3.3 Vérification de la Génération**
- [ ] Dossier `sites/bordeaux/` créé
- [ ] Fichiers générés sans erreurs
- [ ] Variables remplacées correctement
- [ ] Structure Next.js complète

---

## 🧪 **4. TESTS ET VALIDATION**

### **4.1 Tests Techniques**
```bash
# Lancer le serveur de développement
cd sites/bordeaux
npm run dev

# Vérifier sur http://localhost:4000
```

**Checklist de validation :**
- [ ] Site se charge sans erreurs
- [ ] Toutes les variables remplacées
- [ ] Images s'affichent correctement
- [ ] Navigation fonctionnelle
- [ ] Responsive design OK

### **4.2 Validation du Contenu**
- [ ] **Métadonnées** : Titre, description, mots-clés uniques
- [ ] **Quartiers** : Noms et descriptions corrects
- [ ] **Prix** : Tarifs cohérents avec la région
- [ ] **Contact** : Email et téléphone corrects
- [ ] **SEO** : Pas de contenu dupliqué

### **4.3 Tests de Performance**
- [ ] Temps de chargement < 3 secondes
- [ ] Images optimisées
- [ ] CSS/JS minifiés
- [ ] Mobile-friendly

---

## 🚀 **5. DÉPLOIEMENT**

### **5.1 Préparation du Déploiement**
```bash
# Build de production
cd sites/bordeaux
npm run build

# Vérification du build
npm run start
```

### **5.2 Déploiement CapRover**
1. **Push vers GitHub** : Chaque site = 1 repo GitHub
2. **Configuration CapRover** : Domaine personnalisé
3. **Variables d'environnement** : Configuration production
4. **Tests post-déploiement** : Vérification en production

---

## ⚠️ **6. TROUBLESHOOTING (Erreurs Courantes)**

### **6.1 Erreurs Handlebars**
**Erreur :** `Missing helper: "color:"`
**Cause :** Handlebars interprète mal les styles CSS
**Solution :** 
```tsx
// ❌ Incorrect
style={{ color: "#6bcfcf" }}

// ✅ Correct  
className="text-[#6bcfcf]"
```

### **6.2 Erreurs Next.js**
**Erreur :** `Configuring Next.js via 'next.config.ts' is not supported`
**Cause :** Next.js attend un fichier `.js`
**Solution :** Le script génère automatiquement `next.config.js`

**Erreur :** `Cannot find module '@tailwindcss/postcss'`
**Cause :** Dépendance manquante
**Solution :** Le script installe automatiquement les dépendances

### **6.3 Erreurs de Génération**
**Erreur :** `Unexpected token 'section'`
**Cause :** Handlebars mal configuré
**Solution :** Vérifier l'échappement des classes CSS

**Erreur :** `ENOENT: no such file or directory`
**Cause :** Dossier manquant
**Solution :** Le script crée automatiquement la structure

### **6.4 Erreurs de Port**
**Erreur :** `EADDRINUSE: address already in use :::4000`
**Cause :** Port déjà utilisé
**Solution :** 
```bash
# Tuer les processus sur le port 4000
lsof -ti:4000 | xargs kill -9

# Ou utiliser un autre port
PORT=4001 npm run dev
```

---

## 📊 **7. MÉTRIQUES DE QUALITÉ**

### **7.1 SEO**
- [ ] **Titre unique** : "Déménageurs [Ville] (IA) - 5 devis sous 7 jours"
- [ ] **Description unique** : Contenu spécifique à la ville
- [ ] **Mots-clés** : "[déménagement ville]", "[déménageur ville]"
- [ ] **Open Graph** : Images et descriptions uniques
- [ ] **Sitemap** : URLs spécifiques à la ville

### **7.2 Contenu**
- [ ] **Données réelles** : Aucune donnée inventée
- [ ] **Quartiers authentiques** : Noms et descriptions corrects
- [ ] **Prix cohérents** : Tarifs adaptés à la région
- [ ] **Contact valide** : Email et téléphone fonctionnels

### **7.3 Technique**
- [ ] **Performance** : Score Lighthouse > 90
- [ ] **Accessibilité** : WCAG 2.1 AA
- [ ] **Mobile** : Design responsive
- [ ] **Sécurité** : HTTPS, headers sécurisés

---

## 📝 **8. DOCUMENTATION POST-CRÉATION**

### **8.1 Fichiers à Conserver**
- `data/[ville].json` : Données sources
- `sites/[ville]/` : Site généré
- Logs de génération
- Screenshots de validation

### **8.2 Mise à Jour de la Procédure**
Après chaque création, documenter :
- **Nouvelles erreurs** rencontrées
- **Solutions** trouvées
- **Améliorations** du processus
- **Temps de création** réel

---

## 🎯 **9. CHECKLIST FINALE**

### **9.1 Avant Déploiement**
- [ ] Toutes les données sont réelles et vérifiées
- [ ] Site fonctionne en local sans erreurs
- [ ] Contenu unique et optimisé SEO
- [ ] Tests de performance validés
- [ ] Documentation mise à jour

### **9.2 Après Déploiement**
- [ ] Site accessible en production
- [ ] Toutes les fonctionnalités opérationnelles
- [ ] Monitoring configuré
- [ ] Backup des données sources
- [ ] Procédure mise à jour

---

## 📞 **10. SUPPORT ET MAINTENANCE**

### **10.1 En Cas de Problème**
1. **Consulter** ce document de procédure
2. **Vérifier** la section Troubleshooting
3. **Tester** en local avant production
4. **Documenter** les nouvelles erreurs

### **10.2 Amélioration Continue**
- **Mise à jour** des données de prix
- **Ajout** de nouveaux quartiers
- **Optimisation** des performances
- **Évolution** du template

---

**Version :** 1.0  
**Dernière mise à jour :** Janvier 2025  
**Auteur :** Assistant IA Moverz

