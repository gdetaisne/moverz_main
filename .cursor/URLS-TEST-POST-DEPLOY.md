# URLs À TESTER POST-DEPLOY - 03 NOV 2025

**Sites déployés** : Nice + Toulouse  
**Objectif** : Valider corrections Patterns 1-4 (213 liens)

---

## 🧪 NICE - URLs de validation

### Pattern #1 : Services → lille (3 liens)
✓ https://devis-demenageur-nice.fr/services/demenagement-economique-nice/  
✓ https://devis-demenageur-nice.fr/services/demenagement-standard-nice/  
✓ https://devis-demenageur-nice.fr/services/demenagement-premium-nice/  

**Vérifier** :
- H1 affiche "Nice" (pas "lille")
- Breadcrumb pointe vers `/services/demenagement-*-nice` (pas lille)
- Bouton CTA pointe vers `/estimation-rapide/` (pas `/devis-demenagement-lille/`)

---

### Pattern #2 : Corridors → marseille (10 liens)
✓ https://devis-demenageur-nice.fr/nice-vers-paris/  
✓ https://devis-demenageur-nice.fr/nice-vers-lyon/  
✓ https://devis-demenageur-nice.fr/nice-vers-toulouse/  
✓ https://devis-demenageur-nice.fr/nice-vers-marseille/  
✓ https://devis-demenageur-nice.fr/nice-vers-nantes/  

**Vérifier** :
- Section maillage affiche "Vous déménagez depuis Nice ?" (pas "Marseille")
- Boutons pointent vers `/nice/` et `/services/*-nice/` (pas marseille)
- FAQ titre : "FAQ Nice → Paris" (pas "Marseille → Paris")

---

### Pattern #4 : FAQ Quartiers Bordeaux (6 liens)
✓ https://devis-demenageur-nice.fr/faq/  

**Vérifier** :
- Chercher question avec "quartiers"
- Liens affichent quartiers Nice (Vieux Nice, Promenade Anglais, Cimiez)
- PAS Chartrons/St-Pierre/Caudéran (Bordeaux)
- URLs pointent vers `/nice/vieux-nice/` etc.

---

## 🧪 TOULOUSE - URLs de validation

### Pattern #1 : Services (3 liens)
✓ https://devis-demenageur-toulousain.fr/services/demenagement-economique-toulouse/  
✓ https://devis-demenageur-toulousain.fr/services/demenagement-standard-toulouse/  
✓ https://devis-demenageur-toulousain.fr/services/demenagement-premium-toulouse/  

**Vérifier** : Même logique que Nice (Toulouse dynamique, pas lille)

---

### Pattern #2 : Corridors (10 liens)
✓ https://devis-demenageur-toulousain.fr/toulouse-vers-paris/  
✓ https://devis-demenageur-toulousain.fr/toulouse-vers-lyon/  
✓ https://devis-demenageur-toulousain.fr/toulouse-vers-marseille/  
✓ https://devis-demenageur-toulousain.fr/toulouse-vers-nantes/  

**Vérifier** : "Toulouse" partout (pas "Marseille")

---

### Pattern #4 : FAQ (6 liens)
✓ https://devis-demenageur-toulousain.fr/faq/  

**Vérifier** : Quartiers Toulouse (Capitole, St-Cyprien, Carmes) - PAS Bordeaux

---

## 📊 IMPACT ATTENDU CRAWLER

### Nice
**Avant** : 97 URLs 404 (scan précédent)  
**Corrections appliquées** : ~19 liens (Patterns 1-4)  
**Après attendu** : ~78 URLs 404  
**Réduction** : -19.6%

### Toulouse
**Corrections appliquées** : ~19 liens similaire  
**Impact attendu** : Réduction 20-25%

---

## 🎯 PROCHAINES ÉTAPES

### Si validation OK (< 80 erreurs Nice)
→ Deploy 9 autres villes  
→ Crawler validation global  
→ Décider Pattern #5 blog (200+ liens)

### Si validation KO (> 90 erreurs Nice)
→ Analyser crawler résultats  
→ Identifier nouveaux patterns  
→ Corriger avant deploy masse

---

## 🔍 COMMANDE CRAWLER

**Ton crawler externe** : Scanner Nice + Toulouse  
**Focus** : URLs 404 uniquement  
**Comparaison** : Avant vs Après

Colle-moi les résultats et je les analyse ! 🚀

