# Erreurs Session 03 Nov 2025

**Objectif** : Documenter erreurs pour apprendre et éviter répétition

---

## ❌ ERREUR #1 : Script FAQ - const city scope

**Date** : 03 Nov 2025 - 12h05  
**Contexte** : Quick Wins Pattern #8 (FAQ Cross-ville)

### Problème

Script `fix-faq-toulouse-hardcoded.sh` a remplacé "toulouse" par `${city.nameCapitalized}` mais **n'a pas déclaré `const city`**.

**Erreur build** :
```
ReferenceError: city is not defined
    at /app/.next/server/app/faq/page.js:1:7688
```

**Impact** : Montpellier build fail + 9 autres villes en échec silencieux

### Cause Racine

**Script sed** :
```bash
sed -i '' 's/à toulouse/à ${city.nameCapitalized}/g' "$FILE"
```

**Problème** : 
- Remplace texte dans template literals
- Mais ne déclare PAS la variable `city`
- `city` était défini dans le composant (ligne 271)
- Mais `faqs` array est au niveau module (ligne 10)
- Template literals évalués au module load → `city` pas encore défini

### Solution

**Manuelle** (Montpellier) :
1. Ajouter `const city = getCityDataFromUrl(env.SITE_URL);` ligne 10
2. Supprimer `const city` du composant ligne 271

**Automatique** (9 autres villes) :
```bash
# Ajouter après type QA
sed -i '' '/^type QA = .../a\
\
const city = getCityDataFromUrl(env.SITE_URL);
' "$FILE"

# Supprimer du composant
sed -i '' '/^  const city = getCityDataFromUrl/d' "$FILE"
```

**Commit** : `d21fafc` (monorepo), `826fe19` (Montpellier), etc.

### Leçon Apprise

**❌ NE PAS** :
- Utiliser sed pour insérer variables dans template literals sans vérifier scope
- Assumer que variables seront disponibles
- Tester build sur 1 seule ville quand script modifie logique

**✅ FAIRE** :
- Toujours tester build après modifications template literals
- Vérifier scope des variables (module vs composant)
- Pour variables dynamiques : déclarer au niveau module si utilisé dans const module
- Tester build 2-3 villes minimum après script automation

### Impact

**Temps perdu** : 10 minutes (détection + correction)  
**Sites impactés** : 10/11 (Toulouse OK car pas modifié par script)  
**Gravité** : ⚠️ Moyenne (bloquant build mais détecté avant deploy final)

---

## ✅ CORRECTION RAPIDE

**Durée** : 5 minutes  
**Actions** :
1. Diagnostic erreur (1 min)
2. Fix manuel Montpellier (1 min)
3. Script automatique 9 villes (1 min)
4. Tests builds Nice (1 min)
5. Commit + Push 10 villes (1 min)

**Hotfix commits** :
- Monorepo : `d21fafc`
- Montpellier : `826fe19`
- Nice : `d2fb120`
- Lille : `f3f7a3c`
- Nantes : `d5e895a`
- Rouen : `07fc816`
- Strasbourg : `b5a0914`
- Rennes : `97947f9`
- Lyon : `26181b5`
- Marseille : `702a8b3`
- Bordeaux : `020efd5`

**Status** : ✅ Résolu

---

## 💡 MÉTHODOLOGIE AMÉLIORÉE

**Avant** :
1. Script sed
2. Test 1 ville
3. Push toutes villes

**Après (nouveau)** :
1. Script sed
2. **Test builds 3 villes** (Nice, Toulouse, Bordeaux)
3. **Vérifier console errors**
4. Push toutes villes

**Gain** : Détection erreurs AVANT push massif

---

**Documenté** : 03 Nov 2025 - 12h10  
**Signé** : Cursor AI  
**Gravité** : ⚠️ Moyenne (corrigé rapidement)
