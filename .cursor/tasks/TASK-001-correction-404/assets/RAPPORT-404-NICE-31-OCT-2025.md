# 🔍 Rapport d'Analyse - 404 Site Nice
## Date : 31 Octobre 2025

---

## 📊 SITUATION INITIALE

**Source** : Fichier "liens cassés 2025-10-31" (outil interne Guillaume)
- **~100-120 pages en 404** avec le pattern `demenagement-2-*-nice-guide`

---

## 🔍 ENQUÊTE MENÉE

### ✅ Vérifications effectuées
1. Code source TypeScript/JavaScript (sites/nice)
2. Articles markdown (content/nice/blog)  
3. Fichiers de configuration (tsconfig, next.config, etc.)
4. Sitemaps générés
5. Historique Git
6. Fichiers JSON d'analyse 404
7. Script interne `analyze-404.mjs`

### 🎯 RÉSULTAT

**AUCUNE trace de `demenagement-2-*` dans le code actuel du projet !**

---

## 💡 CONCLUSION ENQUÊTE

Ces 100+ URLs fantômes `demenagement-2-*` proviennent probablement de :

1. **Google Search Console** → Anciennes URLs indexées qui n'existent plus
2. **Ancien sitemap** → Généré puis supprimé, mais Google garde en cache
3. **Ancien système de génération** → Abandonné mais URLs encore dans l'index Google
4. **Crawlers externes** → Qui ont trouvé ces URLs quelque part (backlinks?)

### ⚠️ IMPORTANT

Ces URLs :
- ❌ Ne sont **nulle part** dans le code actuel
- ❌ N'ont **jamais existé** dans le système actuel
- ✅ Pas besoin de **nettoyage interne** (rien à nettoyer)
- ✅ Solution : **Laisser Google désindexer naturellement** (2-4 semaines)

---

## 🎯 VRAIS 404 DÉTECTÉS

L'outil interne d'analyse (analyze-404.mjs) a trouvé **355 vrais liens cassés** sur Nice :

### Répartition
- 🔴 **295 liens** → Préfixes villes incorrects
- 🟡 **54 liens** → Slugs/chemins incorrects  
- 🔵 **6 liens** → Articles vraiment manquants

### Problème Identifié

**Incohérence entre `analyze-404.mjs` et `blog.ts` de Nice**

`analyze-404.mjs` génère des URLs sans connaître le mapping de Nice :
```javascript
// analyze-404.mjs (ligne 17-31)
const categoryMappings = {
  marseille: { ... },
  // ❌ PAS de mapping pour Nice
};
```

`blog.ts` de Nice fait un mapping :
```javascript
// blog.ts Nice (ligne 6-27)
const CATEGORY_MAPPING = {
  'satellites': 'conseils',  // ⚠️ CRITIQUE !
  'aide-demenagement-nice': 'aide',
  'demenagement-entreprise-nice': 'entreprise',
  // etc.
};
```

**Résultat** : Les URLs générées par analyze-404.mjs ne correspondent pas aux vraies URLs du router.

**Exemple :**
- analyze-404 génère : `/blog/satellites/aide-financiere-demenagement-nice` ❌
- Vraie URL (blog.ts) : `/blog/conseils/aide-financiere-demenagement-nice` ✅

---

## 🚀 ACTIONS RECOMMANDÉES

### Priorité 1 : Corriger analyze-404.mjs

Ajouter le mapping Nice dans `scripts/analyze-404.mjs` :

```javascript
const categoryMappings = {
  marseille: { ... },
  nice: {
    'satellites': 'conseils',
    'aide-demenagement-nice': 'aide',
    'demenagement-entreprise-nice': 'entreprise',
    'demenagement-international-nice': 'international',
    'demenagement-pas-cher-nice': 'pas-cher',
    'demenagement-piano-nice': 'piano',
    'demenageur-nice': 'demenageur',
    'garde-meuble-nice': 'garde-meuble',
    'location-camion-demenagement-nice': 'location-camion',
    'petit-demenagement-nice': 'petit',
    'prix-demenagement-nice': 'prix',
  }
};
```

### Priorité 2 : Relancer l'analyse

```bash
node scripts/analyze-404.mjs
```

Cela générera les **vraies** URLs cassées à corriger.

### Priorité 3 : Corriger les vrais 404

Une fois le mapping ajouté, les liens cassés pourront être corrigés automatiquement.

---

## 📈 RÉSULTATS ATTENDUS (après correction)

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Liens cassés Nice | 355 | ~10-20 | **-94%** |
| Fichiers impactés | 98 | ~5-10 | **-90%** |
| Crawl budget | Gaspillé | Optimisé | **++++** |

---

## ⚡ PROCHAINES ÉTAPES

1. [ ] Mettre à jour `analyze-404.mjs` avec le mapping Nice
2. [ ] Relancer l'analyse complète
3. [ ] Créer un script de correction automatique
4. [ ] Valider les corrections
5. [ ] Déployer sur production

**Temps estimé** : 2-3h de travail technique

---

## 📝 NOTES

- Les URLs `demenagement-2-*` peuvent être **ignorées** (pas dans le code actuel)
- Se concentrer sur les **355 vrais liens cassés** internes
- Ces 404 internes **cassent réellement** la navigation et le crawl
- Impact SEO **immédiat** une fois corrigés

---

**Analyste** : Claude Sonnet 4.5  
**Date** : 31 Octobre 2025  
**Statut** : Analyse terminée, corrections en attente

