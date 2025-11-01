# 🚀 Guide Déploiement Rapide — 10 Villes Restantes

**Date:** 31 octobre 2025  
**Context:** Nice en debug 308, autres villes à déployer en parallèle  
**Objectif:** Déployer les corrections canonicals sur 10 villes

---

## ✅ Villes à Déployer

| # | Ville | App CapRover | Status Code |
|---|-------|--------------|-------------|
| 1 | Marseille | `dd-marseille` | ✅ Corrections pushées |
| 2 | Lyon | `dd-lyon` | ✅ Corrections pushées |
| 3 | Toulouse | `dd-toulouse` | ✅ Corrections pushées |
| 4 | Bordeaux | `dd-bordeaux` | ✅ Corrections pushées |
| 5 | Nantes | `dd-nantes` | ✅ Corrections pushées |
| 6 | Strasbourg | `dd-strasbourg` | ✅ Corrections pushées |
| 7 | Lille | `dd-lille` | ✅ Corrections pushées |
| 8 | Rennes | `dd-rennes` | ✅ Corrections pushées |
| 9 | Montpellier | `dd-montpellier` | ✅ Corrections pushées |
| 10 | Rouen | `dd-rouen` | ✅ Corrections pushées |

---

## 🎯 Procédure Simple (par ville)

### 1. Déploiement CapRover (2 min)

Dans CapRover:
1. Ouvrir l'app (ex: `dd-marseille`)
2. Aller dans **"Déploiement"**
3. Cliquer **"Force Rebuild"**
4. Attendre 5-10 min

### 2. Vérification Build (1 min)

Dans les logs, vérifier:
- ✅ `Build has finished successfully!`
- ✅ Liste des routes contient les pages attendues

**Si erreur de build:** Copier les logs et les mettre dans un nouveau chat Cursor.

### 3. Test Rapide (30 sec)

Tester 3 URLs critiques:

```bash
# Remplacer {ville} et {domaine}
curl -I https://{domaine}/
curl -I https://{domaine}/services/
curl -I https://{domaine}/contact/
```

**Attendu:** HTTP 200 pour les 3

---

## 📋 URLs à Tester par Ville

### Marseille
```bash
curl -I https://devis-demenageur-marseille.fr/
curl -I https://devis-demenageur-marseille.fr/services/
curl -I https://devis-demenageur-marseille.fr/contact/
```

### Lyon
```bash
curl -I https://devis-demenageur-lyon.fr/
curl -I https://devis-demenageur-lyon.fr/services/
curl -I https://devis-demenageur-lyon.fr/contact/
```

### Toulouse
```bash
curl -I https://devis-demenageur-toulousain.fr/
curl -I https://devis-demenageur-toulousain.fr/services/
curl -I https://devis-demenageur-toulousain.fr/contact/
```

### Bordeaux
```bash
curl -I https://www.bordeaux-demenageur.fr/
curl -I https://www.bordeaux-demenageur.fr/services/
curl -I https://www.bordeaux-demenageur.fr/contact/
```

### Nantes
```bash
curl -I https://devis-demenageur-nantes.fr/
curl -I https://devis-demenageur-nantes.fr/services/
curl -I https://devis-demenageur-nantes.fr/contact/
```

### Strasbourg
```bash
curl -I https://devis-demenageur-strasbourg.fr/
curl -I https://devis-demenageur-strasbourg.fr/services/
curl -I https://devis-demenageur-strasbourg.fr/contact/
```

### Lille
```bash
curl -I https://devis-demenageur-lille.fr/
curl -I https://devis-demenageur-lille.fr/services/
curl -I https://devis-demenageur-lille.fr/contact/
```

### Rennes
```bash
curl -I https://devis-demenageur-rennes.fr/
curl -I https://devis-demenageur-rennes.fr/services/
curl -I https://devis-demenageur-rennes.fr/contact/
```

### Montpellier
```bash
curl -I https://devis-demenageur-montpellier.fr/
curl -I https://devis-demenageur-montpellier.fr/services/
curl -I https://devis-demenageur-montpellier.fr/contact/
```

### Rouen
```bash
curl -I https://devis-demenageur-rouen.fr/
curl -I https://devis-demenageur-rouen.fr/services/
curl -I https://devis-demenageur-rouen.fr/contact/
```

---

## ⚠️ Problèmes Possibles

### Problème 1: Cache Docker (comme Nice)
**Symptôme:** Pages en 308  
**Solution:** Demander à l'IA dans le chat de modifier le timestamp Dockerfile  
**Exemple:** Voir commit Nice `750a191`

### Problème 2: Build Error
**Symptôme:** "Build failed" dans les logs  
**Solution:** Copier les logs complets dans le chat  
**Note:** Souvent lié à SITE_URL invalide (vérifier .caproverenv)

### Problème 3: 500 Server Error
**Symptôme:** HTTP 500 au lieu de 200  
**Solution:** Vérifier les logs runtime (onglet "Logs" dans CapRover)

---

## 📊 Tracking Progress

Tu peux utiliser ce tableau pour tracker:

| Ville | Deploy | Build OK | Test OK | Notes |
|-------|--------|----------|---------|-------|
| Marseille | ⏳ | ⏳ | ⏳ | |
| Lyon | ⏳ | ⏳ | ⏳ | |
| Toulouse | ⏳ | ⏳ | ⏳ | |
| Bordeaux | ⏳ | ⏳ | ⏳ | |
| Nantes | ⏳ | ⏳ | ⏳ | |
| Strasbourg | ⏳ | ⏳ | ⏳ | |
| Lille | ⏳ | ⏳ | ⏳ | |
| Rennes | ⏳ | ⏳ | ⏳ | |
| Montpellier | ⏳ | ⏳ | ⏳ | |
| Rouen | ⏳ | ⏳ | ⏳ | |

---

## 🎯 Objectif Réaliste

**Cible:** 80-90% des villes déployées sans problème

**Si problème cache comme Nice:**
- Ne pas bloquer dessus
- Noter la ville problématique
- Passer à la suivante
- On résoudra en batch après

---

## 💡 Tips

1. **Faire 2-3 villes à la fois** pour optimiser les temps d'attente
2. **Commencer par les villes "faciles"** (Lille, Marseille, Lyon)
3. **Si 308 apparaît:** Noter mais continuer (pas bloquant SEO)
4. **Si build fail:** Copier logs dans nouveau chat

---

## 📞 Si Besoin d'Aide

**Dans un nouveau chat Cursor, dire:**

```
J'ai déployé {ville} sur CapRover mais j'ai ce problème:
[Copier les logs ou décrire le symptôme]

Context: Migration canonicals, code déjà pushé sur GitHub,
corrections dans commit {hash}
```

---

**Bonne chance ! Pendant ce temps je résous le problème 308 de Nice.**

