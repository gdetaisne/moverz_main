# ✅ Guide de Vérification SEO Post-Déploiement

**Date déploiement :** 29 Octobre 2025  
**Modifications :** Optimisation titles, descriptions, FAQ Schema

---

## 🔍 NIVEAU 1 : Vérification Immédiate (HTML)

### Script automatique

```bash
./scripts/verify-seo-deployment.sh
```

### Tests manuels (1 site exemple)

```bash
# Test 1: Title correct
curl -sS https://devis-demenageur-marseille.fr | grep '<title>'
# ✅ Attendu: "Comparateur Déménagement Marseille : 5 Devis Gratuits"

# Test 2: Description
curl -sS https://devis-demenageur-marseille.fr | grep 'meta name="description"'
# ✅ Attendu: contient "40% sur votre déménagement"

# Test 3: Schema FAQPage
curl -sS https://devis-demenageur-marseille.fr | grep '"@type":"FAQPage"'
# ✅ Attendu: "@type":"FAQPage"

# Test 4: Téléphone
curl -sS https://devis-demenageur-marseille.fr | grep '"+33633046059"'
# ✅ Attendu: "+33633046059"
```

---

## 🎯 NIVEAU 2 : Rich Snippets Google (24-48h)

### Test Rich Results

1. **Aller sur** : https://search.google.com/test/rich-results
2. **Tester l'URL** : https://devis-demenageur-marseille.fr
3. **Vérifier** :
   - ✅ Schema "Service" détecté
   - ✅ Schema "FAQPage" détecté (4 questions)
   - ✅ Aucune erreur

### Exemple de résultat attendu

```json
{
  "Service": {
    "serviceType": "Comparateur de devis déménagement",
    "telephone": "+33633046059",
    "offers": { "price": "0 EUR" }
  },
  "FAQPage": {
    "mainEntity": [4 questions]
  }
}
```

---

## 📈 NIVEAU 3 : Google Search Console (7-14 jours)

### Vérifications à faire

#### A. Performance (CTR)

1. **Aller** : Google Search Console → Performance
2. **Filtrer** : Pages → `/`  (homepage)
3. **Métriques à surveiller** :
   - **CTR avant** : 1-2%
   - **CTR cible** : 6-10%
   - **Amélioration attendue** : +400%

#### B. Apparence dans les résultats

1. **Aller** : GSC → Amélioration → Rich snippets
2. **Vérifier** :
   - ✅ FAQPage détecté
   - ✅ 0 erreur
   - ✅ 11 pages valides

#### C. Indexation

1. **Aller** : GSC → Indexation → Pages
2. **Tester URL** : https://devis-demenageur-marseille.fr
3. **Vérifier** :
   - ✅ Title affiché : "Comparateur Déménagement Marseille : 5 Devis Gratuits"
   - ✅ Description affichée : avec "40%"

---

## 🌐 NIVEAU 4 : Vérification SERP (30 jours)

### Test de recherche réel

```bash
# Recherche incognito Google
# Requêtes à tester :
- "comparateur déménagement marseille"
- "devis déménagement marseille"
- "5 devis déménageurs marseille"
```

### Ce que vous devriez voir

```
┌─────────────────────────────────────────────────┐
│ Comparateur Déménagement Marseille : 5 Devis... │ ← Title optimisé
│ https://devis-demenageur-marseille.fr          │
│ Estimation par photos en 30 min → 5 devis...   │ ← Description
│                                                  │
│ ❓ Le service est-il vraiment gratuit ?         │ ← FAQ
│   Oui, 100% gratuit pour les particuliers...   │
│                                                  │
│ ❓ Combien de temps pour recevoir les devis ?   │
│   3 à 7 jours maximum...                        │
│                                                  │
│ ❓ L'estimation par photos est-elle fiable ?    │
│   Notre IA a une précision de 90%...           │
│                                                  │
│ ❓ Quelles zones de Marseille sont couvertes ?  │
│   Toute la ville de Marseille et ses environs  │
└─────────────────────────────────────────────────┘
```

**Résultat :** Occupe **6-7 lignes** au lieu de 2 lignes → **CTR +400%**

---

## 📊 KPIs à Tracker

### Semaine 1 (J+7)

| Métrique | Avant | Cible | Mesure |
|----------|-------|-------|--------|
| CTR moyen | 1-2% | 4-5% | GSC Performance |
| Rich snippets | 0 | 11 sites | GSC Amélioration |
| Impressions | Baseline | +20% | GSC Performance |

### Mois 1 (J+30)

| Métrique | Avant | Cible | Mesure |
|----------|-------|-------|--------|
| CTR moyen | 1-2% | 6-10% | GSC Performance |
| Trafic organique | Baseline | +30% | Analytics |
| Conversions (devis) | Baseline | +25% | GA4 |

---

## 🛠️ Outils de Monitoring

### 1. Google Search Console
- **URL** : https://search.google.com/search-console
- **Fréquence** : Hebdomadaire
- **Métriques** : CTR, Impressions, Position

### 2. Google Rich Results Test
- **URL** : https://search.google.com/test/rich-results
- **Fréquence** : Ponctuel (J+2, J+7)
- **Vérification** : Schema valides

### 3. Google Analytics 4
- **Métriques** : Sessions organiques, taux conversion
- **Fréquence** : Hebdomadaire

### 4. Script automatique
```bash
# Lancer tous les lundis
./scripts/verify-seo-deployment.sh
```

---

## ⚠️ Alertes à Surveiller

### Problèmes potentiels

#### 1. Rich snippets non affichés (J+7)
**Cause possible :**
- Google n'a pas ré-crawlé
- Erreur Schema.org

**Action :**
```bash
# Forcer recrawl via GSC
# Aller : GSC → Inspection URL → Demander indexation
```

#### 2. CTR n'augmente pas (J+14)
**Causes possibles :**
- Positionnement trop bas (>page 3)
- Concurrence très forte
- Description pas assez attractive

**Action :**
- Vérifier position moyenne dans GSC
- Tester variations de description

#### 3. "(IA)" encore visible
**Cause :** Cache navigateur/CDN

**Action :**
```bash
# Vider cache + test incognito
```

---

## 📋 Checklist Hebdomadaire

**Semaine 1 (J+7)**
- [ ] Lancer `./scripts/verify-seo-deployment.sh`
- [ ] Tester 3 URLs avec Rich Results Test
- [ ] Vérifier GSC → Rich snippets détectés
- [ ] Checker CTR initial dans GSC

**Semaine 2 (J+14)**
- [ ] Comparer CTR semaine 1 vs semaine 2
- [ ] Vérifier impressions (+10-20% attendu)
- [ ] Tester recherches incognito

**Semaine 4 (J+30)**
- [ ] Rapport complet CTR (cible 6-10%)
- [ ] Trafic organique (+30% attendu)
- [ ] Conversions devis (+25% attendu)

---

## ✅ Critères de Succès

Le déploiement est **réussi** si (J+30) :

1. ✅ CTR moyen ≥ 6%
2. ✅ Rich snippets FAQ sur les 11 sites
3. ✅ Trafic organique +20-30%
4. ✅ 0 erreur Schema dans GSC
5. ✅ Title sans "(IA)" partout

---

**Créé le :** 29 Octobre 2025  
**Dernière vérification :** À compléter  
**Prochain check :** J+7 (5 Novembre 2025)

