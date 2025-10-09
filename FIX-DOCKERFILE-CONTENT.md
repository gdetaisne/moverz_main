# 🔧 FIX CRITIQUE - DOCKERFILE CONTENT DIRECTORY

**Date :** 9 octobre 2025  
**Problème :** Erreur 500 sur tous les sites - dossier `content/blog` manquant  
**Statut :** ✅ CORRIGÉ

---

## 🚨 PROBLÈME

**Erreur dans les logs CapRover :**
```
Error: ENOENT: no such file or directory, scandir '/app/content/blog'
errno: -2,
code: 'ENOENT',
path: '/app/content/blog'
```

**Cause :** Le dossier `content/` n'était **PAS copié** dans le conteneur Docker runtime.

---

## 🔍 DIAGNOSTIC

### Contexte

1. **Front matter corrigé** → ✅ Bon format
2. **Build Next.js réussi** → ✅ `npm run build` OK
3. **Commit GitHub OK** → ✅ Code correct
4. **MAIS** erreur 500 au runtime

### Analyse du Dockerfile

**Stage BUILDER (lignes 14-18) :**
```dockerfile
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .                              # ← Copie TOUT (y compris content/)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build                     # ← Build OK car content/ existe
```

**Stage RUNNER (lignes 31-38) :**
```dockerfile
# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy public directory if it exists
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# ❌ MANQUE: COPY content !
```

**Problème :** `lib/blog.ts` utilise `fs.readdirSync('content/blog')` au **runtime**, mais le dossier `content/` n'existe pas dans le conteneur runner.

---

## ✅ SOLUTION

### Ajout dans le Dockerfile (après COPY public)

```dockerfile
# Copy content directory (blog markdown files)
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
```

### Sites corrigés

✅ **11 sites** (tous les sites avec blog) :
- dd-strasbourg
- dd-marseille
- dd-lyon
- dd-montpellier
- dd-nantes
- dd-lille
- dd-nice
- dd-rennes
- dd-rouen
- dd-toulouse
- dd-bordeaux

### Commits

**Message :** `fix: Ajouter COPY content dans Dockerfile (erreur ENOENT)`

**Commits GitHub :**
- dd-strasbourg: 142f042
- dd-marseille: 95f3b49
- dd-lyon: b9e0d57
- dd-montpellier: 2cb525a
- dd-nantes: 56292a3
- dd-lille: fa231a0
- dd-nice: ab9563b
- dd-rennes: 418fbf0
- dd-rouen: bbc2ea2
- dd-toulouse: d9d132c
- dd-bordeaux: 0e683f1

---

## 📚 LEÇON APPRISE

### Pourquoi ce problème ?

Next.js peut générer du contenu de **2 façons** :

1. **Static Generation (SSG)** : Tout est généré au build
   → Pas besoin des sources au runtime
   
2. **Server-Side Rendering (SSR) / Dynamic** : Génération à la demande
   → **BESOIN** des sources au runtime

Notre blog utilise `getAllBlogPosts()` qui lit les fichiers `.md` **dynamiquement** avec `fs.readdirSync()`.

### Dockerfile multi-stage

Un Dockerfile multi-stage a plusieurs "FROM" :
- **Builder** : Compile l'application (a tous les fichiers)
- **Runner** : Exécute l'application (n'a QUE ce qu'on copie explicitement)

**Règle :** Si le code runtime lit des fichiers (fs.readFileSync, fs.readdirSync, etc.), ces fichiers **DOIVENT** être copiés dans le runner.

### Vérification

Pour vérifier qu'un site Next.js a besoin de sources au runtime :

```bash
# Chercher les appels fs dans lib/
grep -r "fs\." sites/[site]/lib/

# Exemple de résultat problématique:
# lib/blog.ts: const files = fs.readdirSync(blogDirectory)
```

→ Si `fs.readFileSync` ou `fs.readdirSync`, alors **COPIER** les fichiers source !

---

## 🧪 TEST

Après correction et redéploiement :

1. ✅ https://devis-demenageur-strasbourg.fr/blog
2. ✅ Articles s'affichent
3. ✅ Plus d'erreur ENOENT
4. ✅ Métadonnées visibles

---

## 📋 CHECKLIST POUR NOUVEAU SITE

Quand on crée un nouveau site avec blog :

- [ ] Ajouter `content/` dans `.dockerignore` si nécessaire (mais ne PAS ignorer complètement)
- [ ] Vérifier le Dockerfile runner contient :
  ```dockerfile
  COPY --from=builder --chown=nextjs:nodejs /app/content ./content
  ```
- [ ] Tester localement avec Docker :
  ```bash
  docker build -t test-site .
  docker run -p 3000:3000 test-site
  # Aller sur http://localhost:3000/blog
  ```

---

## 🚀 REDÉPLOIEMENT

Voir : `REDEPLOIEMENT-URGENCE-TOUS-SITES.md`

**Statut :** Tous les Dockerfiles corrigés et pushés  
**Action requise :** Force Rebuild sur CapRover pour chaque site

---

**Créé :** 9 octobre 2025  
**Résolu :** 9 octobre 2025  
**Temps debug :** ~30 minutes  
**Temps correction :** ~10 minutes

