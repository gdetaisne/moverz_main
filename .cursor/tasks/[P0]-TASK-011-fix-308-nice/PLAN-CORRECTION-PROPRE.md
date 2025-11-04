# 🎯 PLAN CORRECTION PROPRE - 404 Nice

**Date** : 03 novembre 2025  
**Approche** : Correction sources (pas de redirections)  
**Priorité** : SEO + Maintenabilité

---

## 📋 ANALYSE SOURCES

### Articles piliers à corriger (10 fichiers)

```
1. aide-demenagement-nice/aide-demenagement-nice-guide.md
2. demenagement-entreprise-nice/demenagement-entreprise-nice-guide.md
3. demenagement-international-nice/demenagement-international-nice-guide.md
4. demenagement-pas-cher-nice/demenagement-pas-cher-nice-guide.md
5. demenagement-piano-nice/demenagement-piano-nice-guide.md
6. demenageur-nice/demenageur-nice-guide-complet.md
7. garde-meuble-nice/garde-meuble-nice-guide-complet.md
8. location-camion-demenagement-nice/location-camion-demenagement-nice-guide.md
9. petit-demenagement-nice/petit-demenagement-nice-guide.md
10. prix-demenagement-nice/prix-demenagement-nice-guide.md
```

**Ressources existantes** : 109 satellites dans `/blog/satellites/`

---

## 🔧 PATTERNS DE CORRECTION

### Pattern #1 : Ancien dossier `/demenagement/` → `/blog/satellites/`

**Exemples** :
```markdown
❌ [lien](/demenagement/demenagement-avec-animaux-nice)
✅ [lien](/blog/satellites/demenagement-avec-animaux-nice/)

❌ [lien](/demenagement/cout-reel-demenagement-nice)
✅ [lien](/blog/satellites/cout-reel-demenagement-nice/)
```

**Règle** :
```bash
/demenagement/{slug}
→ /blog/satellites/{slug}/
```

---

### Pattern #2A : Piliers → Satellites (structure incorrecte)

**Exemples** :
```markdown
❌ [lien](/blog/aide-demenagement-nice/satellites/demenagement-personnes-agees-nice)
✅ [lien](/blog/satellites/demenagement-personnes-agees-nice/)

❌ [lien](/blog/demenageur-nice/satellites/avis-demenageurs-nice-guide)
✅ [lien](/blog/satellites/avis-demenageurs-nice-guide/)
```

**Règle** :
```bash
/blog/{dossier-nice}/satellites/{slug}
→ /blog/satellites/{slug}/
```

---

### Pattern #2B : Satellites sans trailing slash

**Exemples** :
```markdown
❌ [lien](/blog/satellites/demenagement-personnes-agees-nice)
✅ [lien](/blog/satellites/demenagement-personnes-agees-nice/)
```

**Règle** : Ajouter trailing slash

---

### Pattern #3 : Guides dans catégories courtes

**Exemples** :
```markdown
❌ [lien](/blog/pas-cher/demenagement-pas-cher-nice-guide)
✅ [lien](/blog/demenagement-nice/demenagement-pas-cher-nice-guide/)

❌ [lien](/blog/demenageur/demenageur-nice-guide-complet)
✅ [lien](/blog/demenagement-nice/demenageur-nice-guide/)

❌ [lien](/blog/piano/demenagement-piano-nice-guide)
✅ [lien](/blog/demenagement-nice/demenagement-piano-nice-guide/)
```

**Règle** :
```bash
/blog/{categorie-courte}/{guide-slug}
→ /blog/demenagement-nice/{guide-slug}/
```

**Mapping catégories courtes** :
```
pas-cher → demenagement-nice
demenageur → demenagement-nice  
piano → demenagement-nice
location-camion → demenagement-nice
aide-demenagement → demenagement-nice
demenagement-etudiant-nice → demenagement-nice
prix-demenagement-nice → demenagement-nice
garde-meuble-nice → demenagement-nice
location-camion-demenagement-nice → demenagement-nice
```

---

### Pattern #4 : Catégories vides → /blog/

**Exemples** :
```markdown
❌ [lien](/blog/piano)
✅ [lien](/blog/)

❌ [lien](/blog/pas-cher)
✅ [lien](/blog/)

❌ [lien](/blog/international)
✅ [lien](/blog/)
```

**Règle** : Rediriger vers page listing blog

---

## 🚀 PLAN D'EXÉCUTION (1h30)

### Étape 1 : Script de correction automatique (30 min)

**Créer** : `sites/nice/scripts/fix-404-blog-nice.js`

**Fonctionnalités** :
1. Lire les 10 articles piliers
2. Détecter patterns de liens cassés
3. Appliquer corrections regex
4. Backup articles originaux
5. Écrire articles corrigés
6. Générer rapport corrections

---

### Étape 2 : Vérification manuelle (15 min)

**Actions** :
- Checker 5-10 corrections aléatoires
- Vérifier que les cibles existent (satellites)
- S'assurer que les slugs sont corrects

---

### Étape 3 : Tests locaux (15 min)

**Tests** :
```bash
cd sites/nice && npm run build
npm run dev

# Tester 10 URLs représentatives
curl http://localhost:3000/blog/demenagement-nice/demenageur-nice-guide/
curl http://localhost:3000/blog/satellites/demenagement-personnes-agees-nice/
```

---

### Étape 4 : Commit + Push (10 min)

**Commits** :
```bash
git add sites/nice/content/blog/
git commit -m "fix(nice): Correction 107 liens 404 blog - sources propres"
git push origin main

# Push repo Nice individuel
bash scripts/deploy/push-to-all-site-repos.sh nice
```

---

### Étape 5 : Deploy CapRover (10 min)

**Action** :
- Rebuild Nice sur CapRover
- Attendre build complet

---

### Étape 6 : Validation production (10 min)

**Tests représentatifs** :
```bash
# Pattern #1 : /demenagement/
curl -I https://devis-demenageur-nice.fr/blog/satellites/demenagement-avec-animaux-nice/

# Pattern #2 : Satellites
curl -I https://devis-demenageur-nice.fr/blog/satellites/demenagement-personnes-agees-nice/

# Pattern #3 : Guides
curl -I https://devis-demenageur-nice.fr/blog/demenagement-nice/demenageur-nice-guide/
curl -I https://devis-demenageur-nice.fr/blog/demenagement-nice/garde-meuble-nice-guide-complet/
```

**Attendu** : HTTP 200 sur tous les liens

---

## 📊 RÉSULTAT ATTENDU

**Avant** :
- 107 liens cassés 404
- Redirections manquantes
- Structure blog incohérente

**Après** :
- ✅ 107 liens corrigés dans les sources
- ✅ Structure propre `/blog/demenagement-nice/` + `/blog/satellites/`
- ✅ 0 redirection (SEO propre)
- ✅ Maintenabilité optimale

---

## 🔍 VÉRIFICATIONS OBLIGATOIRES

### Avant correction
- [ ] Backup des 10 articles piliers
- [ ] Vérifier que satellites existent (109 confirmés)
- [ ] Tester build local

### Après correction
- [ ] git diff pour valider changements
- [ ] Build local OK
- [ ] Tests manuels 10 URLs
- [ ] Deploy CapRover
- [ ] Validation prod 10 URLs

---

## ⚠️ RISQUES & MITIGATIONS

### Risque #1 : Satellite inexistant
**Mitigation** : Script vérifie existence avant correction

### Risque #2 : Regex trop agressive
**Mitigation** : Backup articles + review manuel

### Risque #3 : Casse build
**Mitigation** : Test build local avant push

---

**Prêt à démarrer ? 🚀**

Guillaume valide l'approche et on génère le script de correction automatique.



