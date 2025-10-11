# 🎯 Villes à Créer - Planning

## ✅ Sites Existants

| Ville | Status | Domaine | Notes |
|-------|--------|---------|-------|
| **Bordeaux** | ✅ Prêt | bordeaux-demenageur.fr | Site de référence complet |
| **Thaire-Daunis** | ✅ Prêt | thaire-daunis-demenagement.fr | Site village (exemple) |

---

## 🎯 Priorité 1 - Grandes Villes (Top 10 France)

### 1. Lyon
- **Population** : 520 000 hab.
- **Région** : Auvergne-Rhône-Alpes
- **Domaine** : lyon-demenageur.fr
- **Quartiers clés** : Vieux Lyon, Croix-Rousse, Presqu'île, Part-Dieu, Confluence
- **Contraintes** : Collines, traboules, vieille ville classée UNESCO
- **Prix indicatifs** : Similaires à Bordeaux
- **Status** : 📋 À créer

### 2. Marseille
- **Population** : 870 000 hab.
- **Région** : Provence-Alpes-Côte d'Azur
- **Domaine** : marseille-demenageur.fr
- **Quartiers clés** : Vieux-Port, Panier, Castellane, Prado, Calanques
- **Contraintes** : Relief, circulation dense, zones portuaires
- **Prix indicatifs** : +10% vs Bordeaux (marché tendu)
- **Status** : 📋 À créer

### 3. Toulouse
- **Population** : 480 000 hab.
- **Région** : Occitanie
- **Domaine** : toulouse-demenageur.fr
- **Quartiers clés** : Capitole, Carmes, Saint-Cyprien, Compans-Caffarelli
- **Contraintes** : Centre-ville piéton, circulation, Garonne
- **Prix indicatifs** : Similaires à Bordeaux
- **Status** : 📋 À créer

### 4. Nice
- **Population** : 340 000 hab.
- **Région** : Provence-Alpes-Côte d'Azur
- **Domaine** : nice-demenageur.fr
- **Quartiers clés** : Vieux-Nice, Libération, Cimiez, Port, Promenade
- **Contraintes** : Relief important, rues étroites, tramway
- **Prix indicatifs** : +15-20% vs Bordeaux (Côte d'Azur)
- **Status** : 📋 À créer

### 5. Nantes
- **Population** : 320 000 hab.
- **Région** : Pays de la Loire
- **Domaine** : nantes-demenageur.fr
- **Quartiers clés** : Bouffay, Île de Nantes, Talensac, Erdre
- **Contraintes** : Loire, tramway, centre piéton
- **Prix indicatifs** : Similaires à Bordeaux
- **Status** : 📋 À créer

### 6. Strasbourg
- **Population** : 280 000 hab.
- **Région** : Grand Est
- **Domaine** : strasbourg-demenageur.fr
- **Quartiers clés** : Grande Île, Petite France, Neudorf, Krutenau
- **Contraintes** : Centre historique UNESCO, canaux, tramway
- **Prix indicatifs** : Similaires à Bordeaux
- **Status** : 📋 À créer

### 7. Montpellier
- **Population** : 300 000 hab.
- **Région** : Occitanie
- **Domaine** : montpellier-demenageur.fr
- **Quartiers clés** : Écusson, Antigone, Port Marianne, Beaux-Arts
- **Contraintes** : Centre historique, tramway, zones piétonnes
- **Prix indicatifs** : Similaires à Bordeaux
- **Status** : 📋 À créer

### 8. Lille
- **Population** : 235 000 hab.
- **Région** : Hauts-de-France
- **Domaine** : lille-demenageur.fr
- **Quartiers clés** : Vieux-Lille, Wazemmes, Vauban, Euralille
- **Contraintes** : Pavés, métro, centre-ville dense
- **Prix indicatifs** : -5% vs Bordeaux (Nord)
- **Status** : 📋 À créer

### 9. Rennes
- **Population** : 220 000 hab.
- **Région** : Bretagne
- **Domaine** : rennes-demenageur.fr
- **Quartiers clés** : Centre historique, Thabor, Colombier, Cleunay
- **Contraintes** : Métro, centre piéton, maisons à colombages
- **Prix indicatifs** : Similaires à Bordeaux
- **Status** : 📋 À créer

---

## 🎯 Priorité 2 - Villes Moyennes Stratégiques

### 10. Saint-Étienne
- **Population** : 172 000 hab.
- **Région** : Auvergne-Rhône-Alpes
- **Domaine** : saint-etienne-demenageur.fr
- **Status** : 📋 À créer

### 11. Le Havre
- **Population** : 170 000 hab.
- **Région** : Normandie
- **Domaine** : lehavre-demenageur.fr
- **Status** : 📋 À créer

### 12. Grenoble
- **Population** : 160 000 hab.
- **Région** : Auvergne-Rhône-Alpes
- **Domaine** : grenoble-demenageur.fr
- **Status** : 📋 À créer

---

## 📊 Stratégie de Déploiement

### Phase 1 : Top 5 (Priorité Maximum)
**Objectif :** 5 sites en 2-3 jours
- Lyon
- Marseille
- Toulouse
- Nice
- Nantes

### Phase 2 : Top 10 (Complément)
**Objectif :** 4 sites supplémentaires en 1-2 jours
- Strasbourg
- Montpellier
- Lille
- Rennes

### Phase 3 : Expansion
**Objectif :** Selon demande et opportunités
- Villes moyennes
- Zones spécifiques

---

## 🔍 Sources de Données à Consulter

Pour chaque ville :

1. **Wikipedia** → Population, région, codes postaux, histoire
2. **Site officiel de la ville** → Quartiers, zones, contraintes
3. **Google Maps** → Noms exacts des quartiers, zones piétonnes
4. **Pages Jaunes déménageurs** → Partenaires locaux potentiels
5. **Leboncoin/SeLoger** → Prix immobiliers pour contexte
6. **Sites déménageurs locaux** → Prix moyens, contraintes

---

## ⚙️ Commande de Génération Standard

```bash
# Template
cd moverz-template
./create-site.sh "[Ville]" "https://www.[ville]-demenageur.fr"
# Éditer data/ville.json
node scripts/generate-site.js ville
cd ../sites/ville && npm install && npm run dev
```

---

## 📈 Métriques de Succès

- ✅ Site généré sans erreurs
- ✅ Toutes les données réelles (pas de placeholder)
- ✅ Test dev OK (localhost)
- ✅ Build production OK
- ✅ Contenu SEO optimisé
- ✅ Performance Lighthouse > 90

---

**Dernière mise à jour :** 8 Octobre 2025  
**Prochaine ville :** Lyon (à démarrer)




