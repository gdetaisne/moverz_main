# 📊 **Template de Données - Moverz Sites**

## 🎯 **Règles de Nommage**

### **Domaines et Emails**
- **Domaine** : `https://www.[ville]-demenageur.fr`
- **Header** : `[Ville] Déménagement` (ex: "Bordeaux Déménagement")
- **Email** : `contact@[ville]-demenageur.fr`
- **Slug** : `[ville]` en minuscules (ex: "bordeaux")

### **Quartiers**
- **Nom** : Nom officiel du quartier
- **Slug** : `[quartier]-[ville]` (ex: "chartrons-bordeaux")
- **Code postal** : Code postal principal du quartier

---

## 📋 **Structure JSON Complète**

```json
{
  "city_name": "Bordeaux",
  "citySlug": "bordeaux",
  "region": "Nouvelle-Aquitaine",
  "zipCodes": "33000-33800",
  "population": "257000",
  "meta_title": "Déménagement Bordeaux | Devis Gratuit | Meilleurs Déménageurs",
  "meta_description": "Déménagement professionnel à Bordeaux. Devis gratuit, déménageurs vérifiés, service de qualité dans tous les quartiers.",
  "keywords": "déménagement bordeaux, déménageur bordeaux, déménagement pas cher bordeaux, déménageur chartrons, déménageur saint-michel",
  "contactEmail": "gdetaisne@gmail.com",
  "domain": "https://www.bordeaux-demenageur.fr",
  "googleVerification": "YOUR_GOOGLE_VERIFICATION_CODE",
  "hero_title": "Préparez votre déménagement à Bordeaux en 30 minutes → recevez 5 devis précis gratuitement sous 7 jours",
  "hero_subtitle": "Votre dossier complet, sans stress. Estimation fiable, prix transparents, partenaires de confiance à Bordeaux.",
  "stats": {
    "clients": "1200+",
    "rating": "4.9"
  },
  "pricing": {
    "studio": "350-650€",
    "t2": "550-950€",
    "t3": "750-1250€",
    "t4": "950-1600€"
  },
  "contraintes": "Centre historique avec rues très étroites, zones piétonnes, tramway (lignes A, B, C, D), stationnement payant et limité. Accès difficile pour les gros véhicules dans le centre-ville.",
  "quartiers": [
    {
      "nom": "Chartrons",
      "slug": "chartrons-bordeaux",
      "codePostal": "33000",
      "description": "Quartier historique des Chartrons, rues pavées et immeubles de caractère du XVIIIe siècle. Zone résidentielle chic avec commerces de proximité.",
      "contraintes": "Rues très étroites, accès difficile pour les gros véhicules, stationnement limité, nombreux escaliers",
      "stats": {
        "dossiers": "180+",
        "demenageurs": "12+",
        "delai": "7 jours"
      }
    },
    {
      "nom": "Saint-Michel",
      "slug": "saint-michel-bordeaux",
      "codePostal": "33000",
      "description": "Quartier populaire et animé autour de la basilique Saint-Michel. Marché traditionnel et commerces locaux.",
      "contraintes": "Rues étroites, marché le dimanche matin, stationnement difficile, nombreux escaliers",
      "stats": {
        "dossiers": "160+",
        "demenageurs": "10+",
        "delai": "6 jours"
      }
    },
    {
      "nom": "Victoire",
      "slug": "victoire-bordeaux",
      "codePostal": "33000",
      "description": "Quartier étudiant et nocturne autour de la place de la Victoire. Bars, restaurants et vie nocturne animée.",
      "contraintes": "Zone piétonne, stationnement très limité, forte affluence en soirée",
      "stats": {
        "dossiers": "140+",
        "demenageurs": "8+",
        "delai": "5 jours"
      }
    },
    {
      "nom": "Bacalan",
      "slug": "bacalan-bordeaux",
      "codePostal": "33300",
      "description": "Quartier en rénovation près du port de Bordeaux. Mélange d'ancien et de moderne, proche de la Cité du Vin.",
      "contraintes": "Travaux fréquents, accès par le port, stationnement plus facile",
      "stats": {
        "dossiers": "120+",
        "demenageurs": "9+",
        "delai": "6 jours"
      }
    },
    {
      "nom": "Bastide",
      "slug": "bastide-bordeaux",
      "codePostal": "33100",
      "description": "Rive droite de la Garonne, quartier en pleine expansion. Architecture moderne et espaces verts.",
      "contraintes": "Accès par pont, stationnement plus facile, quartier en développement",
      "stats": {
        "dossiers": "100+",
        "demenageurs": "7+",
        "delai": "5 jours"
      }
    }
  ],
  "destinations": [
    {
      "nom": "Paris",
      "slug": "bordeaux-vers-paris",
      "distance": "584 km",
      "duree": "5-6h",
      "prix_moyen": "800-1500€"
    },
    {
      "nom": "Lyon",
      "slug": "bordeaux-vers-lyon",
      "distance": "550 km",
      "duree": "5-6h",
      "prix_moyen": "700-1300€"
    },
    {
      "nom": "Toulouse",
      "slug": "bordeaux-vers-toulouse",
      "distance": "245 km",
      "duree": "2-3h",
      "prix_moyen": "400-800€"
    }
  ],
  "partners": [
    {
      "name": "Déménageurs Bordeaux Express",
      "description": "Spécialistes du déménagement dans le centre historique de Bordeaux",
      "logo": "/images/partners/partner1.png"
    },
    {
      "name": "Transports Girondins",
      "description": "Entreprise familiale de déménagement depuis 3 générations",
      "logo": "/images/partners/partner2.png"
    }
  ],
  "blog": {
    "categories": [
      "Conseils Déménagement Bordeaux",
      "Vie à Bordeaux",
      "Actualités Déménagement"
    ],
    "pillars": [
      {
        "title": "Guide complet pour déménager à Bordeaux",
        "slug": "guide-demenagement-bordeaux"
      },
      {
        "title": "Quartiers de Bordeaux : où s'installer ?",
        "slug": "quartiers-bordeaux-installation"
      }
    ]
  }
}
```

---

## 🔍 **Exemples de Recherche de Données**

### **Bordeaux - Quartiers Historiques**
**Sources :**
- Site officiel de Bordeaux : `https://www.bordeaux.fr`
- Office de tourisme : `https://www.bordeaux-tourisme.com`
- Wikipedia : `https://fr.wikipedia.org/wiki/Bordeaux`

**Quartiers identifiés :**
1. **Chartrons** (33000) - Quartier historique, rues étroites
2. **Saint-Michel** (33000) - Quartier populaire, marché
3. **Victoire** (33000) - Quartier étudiant, bars
4. **Bacalan** (33300) - Quartier en rénovation, port
5. **Bastide** (33100) - Rive droite, moderne

### **Contraintes Spécifiques Bordeaux**
**Circulation :**
- Rues très étroites dans le centre historique
- Tramway (lignes A, B, C, D) - stationnement limité
- Zones piétonnes (rue Sainte-Catherine)
- Ponts sur la Garonne (accès Bastide)

**Stationnement :**
- Zones payantes dans le centre
- Zones bleues limitées
- Autorisations nécessaires pour déménagements

### **Prix Indicatifs Bordeaux 2024**
**Sources de recherche :**
- Sites de déménageurs locaux
- Comparateurs de prix
- Forums spécialisés

**Tarifs moyens :**
- Studio (15-25m²) : 350-650€
- T2 (30-45m²) : 550-950€
- T3 (50-70m²) : 750-1250€
- T4+ (80m²+) : 950-1600€

---

## ⚠️ **Erreurs à Éviter**

### **Données Inventées**
❌ **Mauvais :** "Quartier imaginaire de Bordeaux"
✅ **Correct :** "Chartrons, quartier historique de Bordeaux"

### **Prix Irréalistes**
❌ **Mauvais :** "Déménagement studio : 50€"
✅ **Correct :** "Déménagement studio : 350-650€"

### **Contraintes Génériques**
❌ **Mauvais :** "Stationnement difficile"
✅ **Correct :** "Stationnement payant, zones bleues limitées, autorisations nécessaires"

### **Descriptions Vagues**
❌ **Mauvais :** "Quartier sympa"
✅ **Correct :** "Quartier historique des Chartrons, rues pavées et immeubles de caractère du XVIIIe siècle"

---

## 📝 **Checklist de Validation**

### **Avant Génération**
- [ ] Toutes les données sont **réelles** et **vérifiées**
- [ ] Noms de quartiers **officiels**
- [ ] Prix **cohérents** avec la région
- [ ] Contraintes **spécifiques** à la ville
- [ ] Descriptions **authentiques** et **détaillées**

### **Après Génération**
- [ ] Variables remplacées correctement
- [ ] Aucune donnée inventée visible
- [ ] Contenu unique et optimisé SEO
- [ ] Site fonctionnel sans erreurs

---

**Version :** 1.0  
**Dernière mise à jour :** Janvier 2025  
**Auteur :** Assistant IA Moverz

