# ANALYSE CRAWLER 03 NOV - Résultats

**Date scan** : 03 novembre 2025  
**Sites scannés** : 11 villes

---

## ⚠️ DIAGNOSTIC PRINCIPAL

### Status Deploy par ville

| Ville | Code GitHub | CapRover Rebuild | Patterns corrigés |
|-------|-------------|------------------|-------------------|
| **Nice** | ✅ Pushé | ✅ Rebuild | ✅ Visible |
| **Toulouse** | ✅ Pushé | ✅ Rebuild | ✅ Visible |
| **Montpellier** | ✅ Pushé | ✅ Rebuild | ✅ Visible (partiel) |
| **Bordeaux** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Lyon** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Marseille** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Nantes** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Lille** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Strasbourg** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Rouen** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |
| **Rennes** | ✅ Pushé | ❌ PAS rebuild | ❌ Ancien code |

---

## 🔍 PREUVES

### Bordeaux (PAS rebuild)
```
Source: www.bordeaux-demenageur.fr
Page: /services/demenagement-economique-bordeaux
Lien 404: /devis-demenagement-lille

→ Vérif en ligne: "devis-demenagement-lille" trouvé
→ Conclusion: Ancien code encore déployé
```

### Rennes (PAS rebuild)
```
Source: devis-demenageur-rennes.fr
Page: /services/demenagement-economique-rennes
Lien 404: /devis-demenagement-lille

→ Vérif en ligne: "devis-demenagement-lille" trouvé
→ Conclusion: Ancien code encore déployé
```

### Montpellier (Rebuild OK)
```
Source: devis-demenageur-montpellier.fr
Page: /montpellier-vers-paris
Lien: Affiche "montpellier" (3 occurrences)

→ Vérif en ligne: "montpellier" trouvé (pas "marseille")
→ Conclusion: Nouveau code déployé ✅
```

---

## 📊 NOUVEAUX PATTERNS IDENTIFIÉS

### Pattern #6 : FAQ → Toulouse hardcodé

**Villes impactées** : Nice, Lille, Nantes, Marseille

```
devis-demenageur-nice.fr → /faq → /prix-demenagement-toulouse
devis-demenageur-lille.fr → /faq → /devis-demenagement-toulouse
devis-demenageur-nantes.fr → /faq → /prix-demenagement-toulouse
devis-demenageur-marseille.fr → /faq → /prix-demenagement-toulouse
```

**Impact** : ~4-6 liens par ville × 4 villes = **16-24 liens**

---

### Pattern #7 : Toulouse accents dans page /blog/

```
/blog → /blog/dem%C3%A9nagement-ascenseur/demenagement-ascenseur-toulouse
/blog → /blog/assurance-dem%C3%A9nagement/demenagement-assurance-toulouse
/blog → /blog/dem%C3%A9nagement-avion/demenagement-avion-toulouse
```

**Impact** : ~5 catégories avec accents  
**Cause** : Probablement page `/blog/page.tsx` avec liens hardcodés accents

---

### Pattern #5 : Structure blog (confirmé MASSIF)

**Bordeaux** : ~120 liens
```
/blog/demenagement-piano-bordeaux/guide-complet → /blog/prix/guide (404)
/blog/demenagement-international-bordeaux/guide → /blog/international/guide (404)
/blog/demenagement-etudiant-bordeaux/guide-complet → /blog/etudiant/* (404)
```

**Montpellier** : ~150 liens
```
/blog/demenagement-montpellier/aide-* → /blog/aide-au-demenagement-particulier-montpellier/* (404)
/blog/demenagement-montpellier/demenageur-montpellier → /blog/demenageur-montpellier/* (404)
```

**Impact total Pattern #5** : **~300+ liens** (toutes villes)

---

## 🎯 CONCLUSION

### Corrections Patterns 1-4 : ✅ EFFECTIVES mais non déployées

**Vérification GitHub** :
- ✅ Code corrigé et pushé (vérifié)
- ✅ Build local OK (Toulouse, Nice, Marseille testés)

**Vérification Production** :
- ✅ Nice : Corrigé (rebuild fait)
- ✅ Toulouse : Corrigé (rebuild fait)
- ✅ Montpellier : Corrigé (rebuild fait)
- ❌ 8 autres : Ancien code (rebuild PAS fait)

---

## ⏭️ ACTIONS REQUISES

### Immediate
1. **Forcer rebuild CapRover des 8 villes restantes**
   → Interface manuelle : https://captain.gslv.cloud
   → Apps → dd-[ville] → Deployment → Force Rebuild

2. **Re-scanner après rebuild complet**
   → Attendre 5-10 min par ville
   → Re-lancer crawler externe

### Nouveaux patterns à traiter

3. **Pattern #6 - FAQ → Toulouse** (16-24 liens)
   → Analyser app/faq/page.tsx
   → Chercher liens hardcodés toulouse

4. **Pattern #7 - Toulouse accents /blog/** (5 liens)
   → Analyser app/blog/page.tsx ou liste catégories

5. **Pattern #5 - Structure blog** (300+ liens - MASSIF)
   → Attendre validation Patterns 1-4 avant
   → Analyse approfondie requise

---

## 📈 IMPACT ESTIMÉ APRÈS REBUILD COMPLET

**Patterns 1-4** : ~213 liens corrigés  
**Nouveaux patterns 6-7** : ~20-30 liens additionnels  
**Total immediate wins** : **~230-240 liens sur 513** = **45-47% résolution**

**Pattern #5 restant** : ~300 liens (complexe, à traiter séparément)

