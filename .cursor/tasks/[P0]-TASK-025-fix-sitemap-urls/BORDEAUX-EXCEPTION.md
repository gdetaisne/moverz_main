# ⚠️ BORDEAUX - EXCEPTION DOMAINE

**Date découverte** : 03/11/2025  
**Contexte** : Tests TASK-025

---

## 🚨 LE PROBLÈME

**Bordeaux utilise un domaine DIFFÉRENT des autres villes !**

### Pattern standard (10 villes)
```
https://devis-demenageur-marseille.fr
https://devis-demenageur-lyon.fr
https://devis-demenageur-nice.fr
... etc.
```

### Bordeaux (exception)
```
❌ https://devis-demenageur-bordeaux.fr  (n'existe PAS)
✅ https://www.bordeaux-demenageur.fr    (le BON)
```

---

## 🔧 CORRECTIONS APPLIQUÉES

### Fichiers corrigés (03/11/2025)

1. `.cursor/ZONES-DE-RISQUE.md`
   - Ligne ~232 : devis-demenageur-bordeaux → www.bordeaux-demenageur

2. `.cursor/ARCHITECTURE-MULTISITES.md`
   - Ligne ~232 : devis-demenageur-bordeaux → www.bordeaux-demenageur

3. `.cursor/PRINCIPES-SACRES.md`
   - Ajout section "DOMAINES (EXCEPTION BORDEAUX)"
   - Liste complète des 11 domaines avec exception documentée

---

## 📋 CHECKLIST POUR FUTURES TÂCHES

**Quand tu travailles avec les URLs des villes** :

```bash
# ✅ CORRECT
marseille  → devis-demenageur-marseille.fr
lyon       → devis-demenageur-lyon.fr
toulouse   → devis-demenageur-toulousain.fr
nice       → devis-demenageur-nice.fr
lille      → devis-demenageur-lille.fr
nantes     → devis-demenageur-nantes.fr
strasbourg → devis-demenageur-strasbourg.fr
rouen      → devis-demenageur-rouen.fr
rennes     → devis-demenageur-rennes.fr
montpellier→ devis-demenageur-montpellier.fr
bordeaux   → www.bordeaux-demenageur.fr  ⚠️ EXCEPTION

# ❌ ERREUR FRÉQUENTE
bordeaux → devis-demenageur-bordeaux.fr  ❌ N'EXISTE PAS
```

---

## 💡 SOURCE DE VÉRITÉ

**Toujours checker dans** : `sites/bordeaux/lib/cityData.ts` ou `.caproverenv`

```typescript
bordeaux: {
  siteUrl: 'https://www.bordeaux-demenageur.fr'  // ✅
}
```

---

*Exception documentée le 03/11/2025*

