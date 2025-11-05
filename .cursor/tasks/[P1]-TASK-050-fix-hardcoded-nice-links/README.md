# [P1]-TASK-050 : Corriger Liens "nice" Hardcodés (72 URLs 404)

**Priorité** : P1 (Important)  
**Status** : 📋 TODO  
**Assigné** : Lucie  
**Temps estimé** : 45 min  
**Date création** : 05/11/2025

---

## 🎯 OBJECTIF

Corriger les **liens hardcodés "nice"** dans les pages FAQ et Services qui créent **72 URLs 404** sur tous les sites.

**Impact** :
- Résout 72 URLs 404
- Améliore expérience utilisateur
- Nettoie dashboard GSC

---

## 🔍 PROBLÈME DÉTECTÉ

### Origine
**Commits** :
- `355478fa` (10:51:27) - services: Optimize /services pages
- `7ae8f943` (11:05:20) - faq: Optimize FAQ page

**Auteur** : Lucie Stehelin de Taisne  
**Date** : 05/11/2025 (ce matin)

### Bug Introduit
Lors de l'optimisation des pages FAQ et Services, les liens internes ont été hardcodés avec "nice" au lieu d'utiliser `{city.slug}` dynamique.

**Cause probable** : Copier/coller depuis Nice sans remplacer "nice" par variable dynamique.

---

## 📊 ÉTENDUE

### Fichiers Affectés
**22 fichiers** sur 11 sites :
- `sites/bordeaux/app/faq/page.tsx`
- `sites/bordeaux/app/services/page.tsx`
- `sites/lille/app/faq/page.tsx`
- `sites/lille/app/services/page.tsx`
- `sites/lyon/app/faq/page.tsx`
- `sites/lyon/app/services/page.tsx`
- `sites/marseille/app/faq/page.tsx`
- `sites/marseille/app/services/page.tsx`
- `sites/montpellier/app/faq/page.tsx`
- `sites/montpellier/app/services/page.tsx`
- `sites/nantes/app/faq/page.tsx`
- `sites/nantes/app/services/page.tsx`
- `sites/nice/app/faq/page.tsx` ✅ (correct, normal)
- `sites/nice/app/services/page.tsx` ✅ (correct, normal)
- `sites/rennes/app/faq/page.tsx`
- `sites/rennes/app/services/page.tsx`
- `sites/rouen/app/faq/page.tsx`
- `sites/rouen/app/services/page.tsx`
- `sites/strasbourg/app/faq/page.tsx`
- `sites/strasbourg/app/services/page.tsx`
- `sites/toulouse/app/faq/page.tsx`
- `sites/toulouse/app/services/page.tsx`

### URLs 404 Créées

**72 URLs au total** :

#### Pattern A : Cross-Site (36 URLs)
```
https://devis-demenageur-lille.fr/quartiers-nice
https://devis-demenageur-lille.fr/blog/demenagement-nice
https://devis-demenageur-lyon.fr/quartiers-nice
https://devis-demenageur-lyon.fr/blog/demenagement-nice
...
```

#### Pattern B : Domaine Dupliqué (36 URLs)
```
https://devis-demenageur-lille.fr/devis-demenageur-lille.fr/quartiers-nice
https://devis-demenageur-lille.fr/devis-demenageur-lille.fr/blog/demenagement-nice
...
```

⚠️ **Note** : Pattern B (domaine dupliqué) est mystérieux, probablement GSC crawl malformé.

---

## 🛠️ SOLUTION

### Corrections Requises

#### Fichier 1 : `faq/page.tsx` (ligne ~567)

**AVANT (bugué)** :
```tsx
<a href="/quartiers-nice/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm">
  → Tous les quartiers
</a>
```

**APRÈS (corrigé)** :
```tsx
<a href={`/quartiers-${city.slug}/`} className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm">
  → Tous les quartiers
</a>
```

---

#### Fichier 2 : `services/page.tsx` (ligne ~363)

**AVANT (bugué)** :
```tsx
<a href="/blog/demenagement-nice/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
  → Blog déménagement
</a>
```

**APRÈS (corrigé)** :
```tsx
<a href={`/blog/demenagement-${city.slug}/`} className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
  → Blog déménagement
</a>
```

---

#### Fichier 2 : `services/page.tsx` (ligne ~387)

**AVANT (bugué)** :
```tsx
<a href="/quartiers-nice/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
  → Quartiers
</a>
```

**APRÈS (corrigé)** :
```tsx
<a href={`/quartiers-${city.slug}/`} className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors">
  → Quartiers
</a>
```

---

### Méthode Recommandée

**Option A : Script de remplacement (rapide - 5 min)** :
```bash
# Pour tous les sites SAUF nice
for ville in bordeaux lille lyon marseille montpellier nantes rennes rouen strasbourg toulouse; do
  # FAQ
  sed -i '' 's|href="/quartiers-nice/"|href={`/quartiers-${city.slug}/`}|g' sites/$ville/app/faq/page.tsx
  
  # Services
  sed -i '' 's|href="/blog/demenagement-nice/"|href={`/blog/demenagement-${city.slug}/`}|g' sites/$ville/app/services/page.tsx
  sed -i '' 's|href="/quartiers-nice/"|href={`/quartiers-${city.slug}/`}|g' sites/$ville/app/services/page.tsx
done
```

**Option B : Manuel (recommandé - 45 min)** :
- Ouvrir chaque fichier
- Remplacer manuellement
- Vérifier contexte
- Garantit aucune erreur

---

## ✅ CHECKLIST

### Pré-Correction
- [ ] Backup commits actuels (déjà dans git)
- [ ] Lire cette documentation complète
- [ ] Comprendre le pattern à corriger

### Correction
- [ ] Corriger 10 fichiers `faq/page.tsx` (tous sauf Nice)
- [ ] Corriger 10 fichiers `services/page.tsx` (tous sauf Nice)
- [ ] Vérifier Nice reste inchangé (normal)

### Tests Local
- [ ] `cd sites/lille && npm run build` → Build OK
- [ ] Grep : `grep -r "quartiers-nice" sites/lille/app/` → 0 résultat
- [ ] Grep : `grep -r "demenagement-nice" sites/lille/app/` → 0 résultat

### Déploiement
- [ ] Commit avec message clair
- [ ] Push main
- [ ] Push 11 sites (ou script `./scripts/deploy/push-all-sites.sh`)

### Tests Post-Prod (J+1)
- [ ] Vérifier 5 URLs aléatoires → 200 OK
- [ ] GSC : Vérifier 404 disparaissent (J+7)

---

## 📊 ROI ATTENDU

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| **URLs 404** | 72 | 0 | -72 |
| **Liens internes cassés** | 33 | 0 | -33 |
| **UX** | Mauvaise | Bonne | ✅ |
| **GSC propre** | Non | Oui | ✅ |

**Effort** : 45 min  
**Impact** : Résout 72 URLs 404

---

## 🔗 FICHIERS RÉFÉRENCES

### Documentation
- Analyse complète : `/tmp/analyse_origine_bug.md` (temporaire)
- Git log : `git log --all --oneline -- sites/lille/app/faq/page.tsx`

### Commits Concernés
- `355478fa` (services) - Lucie - 05/11/2025 10:51:27
- `7ae8f943` (faq) - Lucie - 05/11/2025 11:05:20

---

## 🚨 POINTS D'ATTENTION

### 1. Nice = Exception
Les fichiers `sites/nice/app/faq/page.tsx` et `sites/nice/app/services/page.tsx` ont **correctement** "nice" hardcodé. **Ne PAS modifier Nice !**

### 2. Domaine Dupliqué
Les URLs avec domaine dupliqué (`lille.fr/lille.fr/...`) sont mystérieuses. Si elles persistent après correction, investiguer :
- `lib/canonical-helper.ts`
- Config Next.js `basePath`
- Logs GSC (crawl error ?)

### 3. Variable `city` Disponible
Les fichiers ont déjà `const city = getCityDataFromUrl(env.SITE_URL);` en ligne 11, donc `city.slug` est disponible.

---

## 📝 NOTES

### Pourquoi P1 et pas P0 ?
- Bug récent (ce matin)
- Impact modéré (pas money pages)
- 72 URLs mais non critiques business
- Peut attendre fin journée

### Communication
Ce bug a été détecté par Guillaume via GSC. Aucun reproche, c'est une erreur commune lors de copier/coller multi-sites. L'important est de corriger rapidement et d'en tirer une leçon pour les prochaines fois.

**Reminder** : Toujours utiliser `city.slug`, `city.nameCapitalized`, etc. au lieu de hardcoder les noms de villes.

---

**Auteur** : Cursor AI  
**Date** : 05/11/2025  
**Status** : Prêt à corriger

