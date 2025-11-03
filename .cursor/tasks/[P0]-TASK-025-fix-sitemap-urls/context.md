# Contexte - TASK-025

## 🚨 Découverte du problème

**Date** : 03/11/2025 matin  
**Découvert par** : Guillaume (alertes Search Console)

### Alertes Search Console

**17 notifications** entre 07:08-07:47 pour 9 villes :
- Toulouse, Rennes, Rouen, Strasbourg, Lyon, Montpellier, Nice, Nantes, Marseille

**Messages** :
- "Nouveaux motifs empêchant l'indexation"
- "Échec de certaines corrections"
- "Problèmes de type Indexation des pages"

### Capture Toulouse (exemple critique)

**Métriques** :
- Non indexées : 1 120 pages
- Indexées : 37 pages seulement (3.3%)
- Erreurs 5xx : 858 pages
- Erreurs 404 : 243 pages

---

## 🔍 Investigation

### Tests effectués
```bash
# 1. Vérifier sitemap
curl https://devis-demenageur-toulousain.fr/sitemap.xml
→ 114 URLs trouvées (✅ articles présents)

# 2. Compter articles blog
→ 94 URLs blog dans sitemap
→ 93 articles .md en local
→ Cohérent ✅

# 3. Tester URLs sitemap
curl -I /blog/piliers/aide-au-demenagement-toulouse/
→ HTTP/2 308 ❌ (redirection au lieu de 200)

# 4. Vérifier frontmatter
category: "aide-deménagement" (pas "piliers")

# 5. Vérifier CATEGORY_MAPPING
'aide-deménagement' → 'aide'
```

### Conclusion

Le sitemap utilise :
- `post.category` = "piliers" (dossier physique)
- `post.slug` = slug original

Mais le routing attend :
- `post.cleanCategory` = "aide" (via CATEGORY_MAPPING)
- `post.cleanSlug` = slug nettoyé (via cleanSlug())

**→ Mismatch complet entre sitemap et routing**

---

## 💥 Impact business

**SEO** :
- ~1000 articles non indexés (11 villes)
- Perte trafic organique estimée : -60-80%
- Perte leads estimée : -50-70%

**Search Console** :
- Milliers d'erreurs accumulées
- Score qualité site dégradé
- Budget crawl gaspillé (Google crawle URLs cassées)

**Urgence** : P0 CRITIQUE
- Chaque jour = perte leads
- Correction rapide = récupération rapide

---

## 📚 Contexte technique

### Architecture URLs blog Toulouse

**Dossiers physiques** (2) :
```
content/blog/
  ├── piliers/     (10 articles guides)
  └── satellites/  (83 articles)
```

**Catégories URL** (15+) :
```typescript
CATEGORY_MAPPING = {
  'aide-deménagement': 'aide',
  'demenagement-etudiant': 'etudiant',
  'demenagement-entreprise': 'entreprise',
  // ... 12 autres
}
```

**URLs finales** :
```
/blog/[cleanCategory]/[cleanSlug]/
/blog/aide/aide-au-demenagement-toulouse-guide/
```

**Sitemap actuel (bugué)** :
```
/blog/piliers/aide-au-demenagement-toulouse/  ❌
```

---

## 🎯 Objectif TASK-025

**Aligner sitemap sur routing réel** :
- Utiliser `cleanCategory` + `cleanSlug`
- 11 villes à corriger
- Tester exhaustivement
- Resubmit Search Console
- Monitoring résolution

---

*Contexte documenté le 03/11/2025*

