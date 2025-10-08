# 🔍 AUDIT DES ZONES DESSERVIES - PROBLÈMES IDENTIFIÉS

## ❌ PROBLÈMES CRITIQUES

### 1. **TOULOUSE** - Majuscules incorrectes dans les hrefs
**Problème :** Les URLs utilisent `/Toulouse/` avec majuscule au lieu de `/toulouse/`
**Impact :** Les liens ne fonctionneront pas (404)

**Header.tsx actuel :**
```
{ href: '/Toulouse', label: 'Toulouse' },
{ href: '/Toulouse/capitole', label: 'Capitole' },
{ href: '/Toulouse/saint-cyprien', label: 'Saint-Cyprien' },
{ href: '/Toulouse/carmes', label: 'Carmes' },
{ href: '/Toulouse/jean-jaures', label: 'Jean Jaurès' },
{ href: '/Toulouse/compans', label: 'Compans' },
```

**Dossiers réels :**
- `/toulouse/capitole`
- `/toulouse/carmes`
- `/toulouse/compans`
- `/toulouse/jean-jaures`
- `/toulouse/saint-cyprien`

**À corriger :** Remplacer `/Toulouse/` par `/toulouse/` (5 liens)

---

### 2. **NICE** - Majuscules incorrectes dans les hrefs
**Problème :** Les URLs utilisent `/Nice/` avec majuscule au lieu de `/nice/`
**Impact :** Les liens ne fonctionneront pas (404)

**Header.tsx actuel :**
```
{ href: '/Nice', label: 'Nice' },
{ href: '/Nice/vieux-Nice', label: 'Vieux Nice' },
{ href: '/Nice/promenade-anglais', label: 'Promenade des Anglais' },
{ href: '/Nice/cimiez', label: 'Cimiez' },
{ href: '/Nice/liberation', label: 'Libération' },
{ href: '/Nice/port', label: 'Port' },
```

**Dossiers réels :**
- `/nice/vieux-nice`
- `/nice/promenade-anglais`
- `/nice/cimiez`
- `/nice/liberation`
- `/nice/port`

**À corriger :** Remplacer `/Nice/` par `/nice/` ET `/vieux-Nice` par `/vieux-nice` (6 liens)

---

### 3. **NANTES** - Majuscules incorrectes dans les hrefs
**Problème :** Les URLs utilisent `/Nantes/` avec majuscule au lieu de `/nantes/`
**Impact :** Les liens ne fonctionneront pas (404)

**Header.tsx actuel :**
```
{ href: '/Nantes', label: 'Nantes' },
{ href: '/Nantes/centre-ville', label: 'Centre-ville' },
{ href: '/Nantes/ile-Nantes', label: 'Ile de Nantes' },
{ href: '/Nantes/malakoff', label: 'Malakoff' },
{ href: '/Nantes/dervallieres', label: 'Dervallières' },
{ href: '/Nantes/beaulieu', label: 'Beaulieu' },
```

**Dossiers réels :**
- `/nantes/centre-ville`
- `/nantes/ile-nantes`
- `/nantes/malakoff`
- `/nantes/dervallieres`
- `/nantes/beaulieu`

**À corriger :** Remplacer `/Nantes/` par `/nantes/` ET `/ile-Nantes` par `/ile-nantes` (6 liens)

---

### 4. **LILLE** - Majuscules incorrectes dans les hrefs
**Problème :** Les URLs utilisent `/Lille/` avec majuscule au lieu de `/lille/`
**Impact :** Les liens ne fonctionneront pas (404)

**Header.tsx actuel :**
```
{ href: '/Lille', label: 'Lille' },
{ href: '/Lille/vieux-Lille', label: 'Vieux Lille' },
{ href: '/Lille/centre', label: 'Centre' },
{ href: '/Lille/wazemmes', label: 'Wazemmes' },
{ href: '/Lille/moulins', label: 'Moulins' },
{ href: '/Lille/lomme', label: 'Lomme' },
```

**Dossiers réels :**
- `/lille/vieux-lille`
- `/lille/centre`
- `/lille/wazemmes`
- `/lille/moulins`
- `/lille/lomme`

**À corriger :** Remplacer `/Lille/` par `/lille/` ET `/vieux-Lille` par `/vieux-lille` (6 liens)

---

### 5. **RENNES** - Majuscules incorrectes dans les hrefs
**Problème :** Les URLs utilisent `/Rennes/` avec majuscule au lieu de `/rennes/`
**Impact :** Les liens ne fonctionneront pas (404)

**Header.tsx actuel :**
```
{ href: '/Rennes', label: 'Rennes' },
{ href: '/Rennes/centre-ville', label: 'Centre-ville' },
{ href: '/Rennes/thabor', label: 'Thabor' },
{ href: '/Rennes/villejean', label: 'Villejean' },
{ href: '/Rennes/beaulieu', label: 'Beaulieu' },
{ href: '/Rennes/cleunay', label: 'Cleunay' },
```

**Dossiers réels :**
- `/rennes/centre-ville`
- `/rennes/thabor`
- `/rennes/villejean`
- `/rennes/beaulieu`
- `/rennes/cleunay`

**À corriger :** Remplacer `/Rennes/` par `/rennes/` (6 liens)

---

## ⚠️ PROBLÈMES MINEURS

### 6. **LYON** - Incohérence dans les noms de dossiers
**Problème :** Dossier `presqu-ile` ET `presquile` (doublon)

**Pages existantes :**
- `/lyon/bron` ❌ (pas dans Header)
- `/lyon/confluence` ✅
- `/lyon/croix-rousse` ✅
- `/lyon/part-dieu` ✅
- `/lyon/presqu-ile` ❌ (pas utilisé dans Header)
- `/lyon/presquile` ✅ (utilisé dans Header)
- `/lyon/vieux-lyon` ✅
- `/lyon/villeurbanne` ❌ (pas dans Header)

**Recommandation :** Supprimer le dossier `/lyon/presqu-ile` (doublon) et éventuellement ajouter Bron et Villeurbanne au Header s'ils sont pertinents.

---

## ✅ SITES CORRECTS

Les sites suivants ont des zones desservies cohérentes :
- **Strasbourg** ✅
- **Rouen** ✅
- **Marseille** ✅

---

## 📊 RÉSUMÉ

| Site | Problème | Gravité | Liens cassés |
|------|----------|---------|--------------|
| Toulouse | Majuscules dans hrefs | 🔴 Critique | 6 liens |
| Nice | Majuscules dans hrefs | 🔴 Critique | 6 liens |
| Nantes | Majuscules dans hrefs | 🔴 Critique | 6 liens |
| Lille | Majuscules dans hrefs | 🔴 Critique | 6 liens |
| Rennes | Majuscules dans hrefs | 🔴 Critique | 6 liens |
| Lyon | Dossiers doublons | 🟡 Mineur | 0 lien |
| **TOTAL** | | | **30 liens cassés** |

---

## 🔧 ACTIONS REQUISES

1. **Corriger les 5 sites avec majuscules** (Toulouse, Nice, Nantes, Lille, Rennes)
   - Remplacer toutes les majuscules dans les `href` par des minuscules
   - Garder les majuscules dans les `label` (affichage)

2. **Nettoyer Lyon**
   - Supprimer le dossier doublon `/lyon/presqu-ile`
   - Décider si Bron et Villeurbanne doivent être ajoutés au menu

3. **Tester tous les liens** après correction

