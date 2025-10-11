# 📋 PLAN D'ACTION SEO - SUIVI DES CORRECTIONS

**Mise à jour:** 10 octobre 2025  
**Objectif:** Préparer tous les sites pour le linking interne

---

## ✅ PHASE 1 - CORRECTIONS CRITIQUES (EN COURS)

### 1.1 Descriptions corridors dupliquées ✅ **COMPLÉTÉ**

**Status:** ✅ **61 fichiers corrigés automatiquement**

**Avant:**
```
Description: "Volume : 10-15 m³"  
→ Utilisée sur 57 pages identiques
```

**Après (exemples):**
```
bordeaux → lyon: "Déménagement Bordeaux → Lyon : 550 km, 5h30. Studio/T1 (10-15 m³) dès 750-1100€. Devis gratuit sous 7j..."
bordeaux → paris: "Déménagement Bordeaux → Paris : 580 km, 6h00. Studio/T1 (10-15 m³) dès 850-1200€. Devis gratuit..."
marseille → nice: "Déménagement Marseille → Nice vers Côte d'Azur. Maison (40-80 m³) 1800-2900€..."
```

**Impact:** 
- ✅ Chaque corridor a maintenant 3 descriptions uniques (selon type logement)
- ✅ SEO-friendly (distance, durée, prix inclus)
- ✅ Google ne pénalisera plus pour duplicate content

**Commande exécutée:**
```bash
node fix-seo-issues.js
# ✅ 61 fichiers mis à jour
```

---

### 1.2 Title "Article non trouvé" (11 pages) ⏳ **À FAIRE**

**Problème:** Pages `/blog/[category]/[slug]` utilisent un fallback par défaut

**Fichiers concernés:**
- `sites/*/app/blog/[category]/[slug]/page.tsx` (11 villes)

**Solution déjà en place dans le code:**
```typescript
// Le code est correct, mais le fallback s'affiche quand:
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getBlogPostByCleanSlug(params.category, params.slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé',  // ❌ Ce fallback apparaît
    }
  }
  
  return {
    title: post.meta_title || post.title,  // ✅ Devrait être utilisé
    description: post.meta_description,
  }
}
```

**Action requise:**
1. Vérifier si des articles de blog existent réellement
2. Si oui, corriger le parsing des slugs
3. Si non, soit créer du contenu, soit retirer ces routes

**Vérification suggérée:**
```bash
# Vérifier si des fichiers blog existent
find sites/bordeaux/content -name "*.md" | head -10
```

---

### 1.3 Titles manquants (239 pages) 🚧 **PRIORITAIRE**

**Répartition:**
- Pages quartiers: ~150 pages
- Pages `/comment-ca-marche`: 10 pages
- Pages `/blog`: 11 pages
- Pages `/blog/[category]`: 11 pages
- Autres pages: ~57 pages

#### Action 1.3.1: Pages `/comment-ca-marche` ⏳

**Fichiers:** `sites/*/app/comment-ca-marche/page.tsx`

**Correction à appliquer:**
```typescript
export const metadata: Metadata = {
  title: "Comment ça marche ? Déménagement {City} en 3 étapes | Moverz",
  description: "Découvrez notre processus simple pour déménager à {City} : 1) Inventaire IA gratuit 2) Recevez 3 devis 3) Choisissez votre déménageur. Sans engagement.",
}
```

#### Action 1.3.2: Pages `/blog` ⏳

**Fichiers:** `sites/*/app/blog/page.tsx`

**Vérifier si metadata existe, sinon ajouter:**
```typescript
export const metadata: Metadata = {
  title: "Blog Déménagement {City} - Guides & Conseils Pratiques | Moverz",
  description: "Guides complets et conseils d'experts pour déménager à {City}. Astuces budget, checklist, comparatifs. Articles rédigés par des professionnels.",
}
```

#### Action 1.3.3: Pages quartiers (Bordeaux) ⏳

**Exemple Bordeaux - Pages sans title:**
- `/bordeaux/bastide` → Title: "Bastide → Paris" (trop court)
- `/bordeaux/cauderan` → Title: "Caudéran → Paris" (trop court)
- ...18 quartiers concernés

**Vérifier le template:** `sites/bordeaux/app/_templates/LocalPage.tsx`

**Correction suggérée:**
```typescript
export function generateLocalPageMetadata(quartier: string, city: string): Metadata {
  return {
    title: `Déménagement ${quartier} (${city}) - Tarifs & Devis Gratuit | Moverz`,
    description: `Déménageur local ${quartier} à ${city} : tarifs détaillés, disponibilités immédiates. Devis personnalisé gratuit sous 7j. Équipe locale expérimentée. Réservation simple en ligne.`,
  }
}
```

---

### 1.4 Descriptions manquantes (182 pages) ⏳

**Pages concernées:**
- Quartiers sans description complète
- Pages template génériques

**Action:** À traiter après les titles (priorité moindre)

---

## 📊 MÉTRIQUES ACTUELLES

| Métrique | Avant | Actuel | Objectif |
|----------|-------|--------|----------|
| Descriptions dupliquées (corridors) | 57 | ✅ **0** | 0 |
| Titles dupliqués | 11 | 🔄 11 | 0 |
| Titles manquants | 239 | 🔄 239 | 0 |
| Descriptions manquantes | 182 | 🔄 182 | 0 |
| Descriptions trop courtes | 100 | 🔄 ~100 | < 20 |
| **Pages avec problèmes** | **295/302** | **🔄 ~234/302** | **< 30/302** |

**Amélioration:** ~61 pages corrigées (20%)

---

## 🎯 PROCHAINES ACTIONS IMMÉDIATES

### À faire AUJOURD'HUI (2-3h)

1. **Vérifier l'existence des articles de blog** ⏱️ 15 min
   ```bash
   # Script à créer pour lister tous les articles blog
   find sites/*/content -type f -name "*.md" | wc -l
   ```

2. **Corriger les pages `/comment-ca-marche`** ⏱️ 30 min
   - Script automatique à créer pour les 10 villes
   - Pattern simple à répliquer

3. **Corriger les pages `/blog`** ⏱️ 30 min
   - Vérifier metadata existante
   - Ajouter si manquante

4. **Audit partiel des quartiers Bordeaux** ⏱️ 1h
   - Vérifier le template LocalPage
   - Tester correction sur 2-3 quartiers
   - Si OK → script automatique pour tous

5. **Re-run audit complet** ⏱️ 2 min
   ```bash
   node audit-seo-global.js
   ```

---

## 📝 SCRIPTS DISPONIBLES

```bash
# Audit SEO complet
node audit-seo-global.js

# Correction descriptions corridors (✅ fait)
node fix-seo-issues.js

# Vérifier git status
git status

# Voir les changements
git diff sites/bordeaux/app/bordeaux-vers-lyon/page.tsx
```

---

## 🚀 PLANNING

| Jour | Tâches | Status |
|------|--------|--------|
| **J0 (aujourd'hui)** | Audit initial + Corrections corridors | ✅ 20% |
| **J+1** | Titles pages principales (blog, comment-ca-marche) | ⏳ Planifié |
| **J+2** | Quartiers Bordeaux + templates autres villes | ⏳ |
| **J+3** | Descriptions manquantes + audit final | ⏳ |
| **J+4** | Tests manuels + validation finale | ⏳ |
| **J+5** | 🎉 **GO LINKING INTERNE** | ⏳ |

---

## ✍️ NOTES IMPORTANTES

### Commit des changements actuels

**61 fichiers modifiés** (descriptions corridors) à commiter :

```bash
git add sites/*/app/*-vers-*/page.tsx
git commit -m "fix(seo): correct duplicate descriptions in corridor pages

- Replace generic 'Volume : 10-15 m³' with unique descriptions
- Include distance, duration, and pricing in each description
- Generate 3 unique descriptions per corridor (studio/T2/house)
- Fixes 57 duplicate content issues
- Improves SEO for inter-city moving pages"
```

### Backup avant modifications massives

```bash
# Créer une branche de sauvegarde
git checkout -b backup-before-seo-fixes
git push origin backup-before-seo-fixes
git checkout main
```

---

## 🎓 RESSOURCES

- [Google SEO Guidelines - Title Tags](https://developers.google.com/search/docs/appearance/title-link)
- [Meta Description Best Practices](https://developers.google.com/search/docs/appearance/snippet)
- Longueurs recommandées:
  - **Title:** 30-60 caractères (optimal: 50-55)
  - **Description:** 120-160 caractères (optimal: 150-155)

---

**Contact:** Head of SEO  
**Dernière mise à jour:** 10/10/2025 - 16:30

