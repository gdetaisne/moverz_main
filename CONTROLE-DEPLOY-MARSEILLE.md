# 🔍 Contrôle Déploiement Marseille (CapRover)

**Date :** 31 octobre 2025  
**URL Production :** https://devis-demenageur-marseille.fr

---

## 🚀 Étape 1 : Attendre Fin du Build

Dans CapRover, surveiller les logs jusqu'à :

```
✓ Compiled successfully
Generating static pages (36/36)
✓ Generating static pages (36/36)

Build has succeeded!
```

**Durée estimée :** 3-5 minutes

---

## 🧪 Étape 2 : Tests de Contrôle

### Test 1 : Site Accessible

```bash
curl -I https://devis-demenageur-marseille.fr
```

**Attendu :**
```
HTTP/2 200 OK
```

---

### Test 2 : Canonical Homepage

```bash
curl -s https://devis-demenageur-marseille.fr | grep -o '<link rel="canonical" href="[^"]*"'
```

**Attendu :**
```html
<link rel="canonical" href="https://devis-demenageur-marseille.fr/"/>
```

✅ **AVEC le slash final**

---

### Test 3 : Canonical Page Partenaires

```bash
curl -s https://devis-demenageur-marseille.fr/partenaires | grep -o '<link rel="canonical" href="[^"]*"'
```

**Attendu :**
```html
<link rel="canonical" href="https://devis-demenageur-marseille.fr/partenaires/"/>
```

---

### Test 4 : Canonical Page Blog

```bash
curl -s https://devis-demenageur-marseille.fr/blog | grep -o '<link rel="canonical" href="[^"]*"'
```

**Attendu :**
```html
<link rel="canonical" href="https://devis-demenageur-marseille.fr/blog/"/>
```

---

### Test 5 : JSON-LD (Schema.org)

```bash
curl -s https://devis-demenageur-marseille.fr | grep -o '"@id":"[^"]*organization"'
```

**Attendu :**
```json
"@id":"https://devis-demenageur-marseille.fr//#organization"
```

✅ **AVEC le slash**

---

### Test 6 : Open Graph URL

```bash
curl -s https://devis-demenageur-marseille.fr | grep 'og:url' | grep -o 'content="[^"]*"'
```

**Attendu :**
```html
content="https://devis-demenageur-marseille.fr/"
```

---

### Test 7 : Sitemap.xml

```bash
curl -s https://devis-demenageur-marseille.fr/sitemap.xml | grep '<loc>' | head -5
```

**Attendu :**
```xml
<loc>https://devis-demenageur-marseille.fr/</loc>
<loc>https://devis-demenageur-marseille.fr/services/</loc>
<loc>https://devis-demenageur-marseille.fr/partenaires/</loc>
<loc>https://devis-demenageur-marseille.fr/blog/</loc>
```

✅ **TOUS avec slash final**

---

### Test 8 : robots.txt

```bash
curl -s https://devis-demenageur-marseille.fr/robots.txt
```

**Attendu :**
```txt
Host: https://devis-demenageur-marseille.fr/
Sitemap: https://devis-demenageur-marseille.fr/sitemap.xml
```

✅ **Host avec slash final**

---

### Test 9 : Redirections Trailing Slash

```bash
curl -I https://devis-demenageur-marseille.fr/partenaires
```

**Attendu :**
```
HTTP/2 308 Permanent Redirect
Location: /partenaires/
```

✅ **Redirection automatique** vers version avec slash

---

### Test 10 : Page Corridor

```bash
curl -s https://devis-demenageur-marseille.fr/marseille-vers-paris | grep -o '<link rel="canonical" href="[^"]*"'
```

**Attendu :**
```html
<link rel="canonical" href="https://devis-demenageur-marseille.fr/marseille-vers-paris/"/>
```

---

## ✅ Checklist Validation

### Build CapRover
- [ ] Build terminé avec succès
- [ ] Aucune erreur dans les logs
- [ ] Application démarrée (Ready in XXXms)

### Canonicals
- [ ] Homepage : slash ✅
- [ ] /partenaires : slash ✅
- [ ] /blog : slash ✅
- [ ] /comment-ca-marche : slash ✅
- [ ] Pages corridors : slash ✅

### SEO
- [ ] JSON-LD : URLs avec slash
- [ ] Open Graph : URL avec slash
- [ ] Sitemap : 100% URLs avec slash
- [ ] robots.txt : Host avec slash

### Performance
- [ ] Redirections 308 fonctionnent
- [ ] Pas de 404 sur pages principales
- [ ] Temps de chargement < 2s

---

## 🆘 En Cas d'Erreur

### Erreur : "SITE_URL: Invalid URL"

**Solution :** Fichier `.caproverenv` pushé ✅

**Vérification :**
```bash
cd sites/marseille
cat .caproverenv
# Doit afficher : SITE_URL=https://devis-demenageur-marseille.fr/
```

---

### Erreur : Build échoue

**Vérifier les logs CapRover :**
1. Section "Build Logs"
2. Chercher la ligne avec l'erreur
3. Si erreur TypeScript : vérifier les imports

**Rollback si nécessaire :**
```bash
# Retourner au commit précédent
cd sites/marseille
git reset --hard HEAD~1
git push origin main --force
```

---

### Erreur : Canonical sans slash

**Vérifier :**
```bash
# 1. trailingSlash dans next.config.mjs
grep "trailingSlash" sites/marseille/next.config.mjs
# Attendu : trailingSlash: true,

# 2. cityData.ts
grep "marseille:" sites/marseille/lib/cityData.ts -A 5
# Attendu : siteUrl: 'https://devis-demenageur-marseille.fr/',
```

---

## 📊 Script de Validation Complète

```bash
#!/bin/bash

DOMAIN="https://devis-demenageur-marseille.fr"

echo "🧪 TESTS PRODUCTION MARSEILLE"
echo "================================"
echo ""

# Test 1
echo "1️⃣  Homepage canonical..."
CANONICAL=$(curl -s $DOMAIN | grep -o '<link rel="canonical" href="[^"]*"' | grep -o 'href="[^"]*"' | cut -d'"' -f2)
if [[ "$CANONICAL" == *"/" ]]; then
  echo "✅ $CANONICAL (avec slash)"
else
  echo "❌ $CANONICAL (SANS slash)"
fi

# Test 2
echo "2️⃣  Partenaires canonical..."
CANONICAL=$(curl -s $DOMAIN/partenaires | grep -o '<link rel="canonical" href="[^"]*"' | grep -o 'href="[^"]*"' | cut -d'"' -f2)
if [[ "$CANONICAL" == *"/" ]]; then
  echo "✅ $CANONICAL"
else
  echo "❌ $CANONICAL"
fi

# Test 3
echo "3️⃣  Sitemap..."
FIRST_LOC=$(curl -s $DOMAIN/sitemap.xml | grep -o '<loc>[^<]*</loc>' | head -1 | sed 's/<\/*loc>//g')
if [[ "$FIRST_LOC" == *"/" ]]; then
  echo "✅ $FIRST_LOC"
else
  echo "❌ $FIRST_LOC"
fi

# Test 4
echo "4️⃣  robots.txt..."
HOST=$(curl -s $DOMAIN/robots.txt | grep "Host:" | cut -d' ' -f2)
if [[ "$HOST" == *"/" ]]; then
  echo "✅ Host: $HOST"
else
  echo "❌ Host: $HOST"
fi

# Test 5
echo "5️⃣  Redirection trailing slash..."
LOCATION=$(curl -sI $DOMAIN/partenaires 2>/dev/null | grep -i "location:" | cut -d' ' -f2 | tr -d '\r')
if [[ "$LOCATION" == "/partenaires/" ]]; then
  echo "✅ Redirect 308 → $LOCATION"
else
  echo "⚠️  $LOCATION"
fi

echo ""
echo "================================"
echo "Tests terminés"
```

**Sauvegarder ce script sous :** `scripts/test-marseille-production.sh`

---

## 🎯 Contrôle Rapide (30 secondes)

### Une Seule Commande

```bash
curl -s https://devis-demenageur-marseille.fr | python3 << 'EOF'
import sys, re
content = sys.stdin.read()

# Canonical
canonical = re.search(r'<link rel="canonical" href="([^"]+)"', content)
if canonical:
    url = canonical.group(1)
    status = '✅' if url.endswith('/') else '❌'
    print(f"{status} Canonical: {url}")

# JSON-LD @id
jsonld = re.search(r'"@id":"([^"]*organization)"', content)
if jsonld:
    url = jsonld.group(1)
    status = '✅' if '/' in url else '❌'
    print(f"{status} JSON-LD: {url}")

# OG URL
og = re.search(r'<meta property="og:url" content="([^"]+)"', content)
if og:
    url = og.group(1)
    status = '✅' if url.endswith('/') else '❌'
    print(f"{status} OG URL: {url}")
EOF
```

**Attendu :**
```
✅ Canonical: https://devis-demenageur-marseille.fr/
✅ JSON-LD: https://devis-demenageur-marseille.fr//#organization
✅ OG URL: https://devis-demenageur-marseille.fr/
```

---

## 📋 Checklist Post-Déploiement

### Immédiat (J+0)
- [ ] Build CapRover réussi
- [ ] Site accessible (HTTP 200)
- [ ] Canonicals avec slash (5 pages testées)
- [ ] Sitemap.xml accessible
- [ ] robots.txt accessible
- [ ] Pas d'erreurs console JavaScript

### J+1
- [ ] Google Search Console : nouveau sitemap soumis
- [ ] Vérifier indexation (site:devis-demenageur-marseille.fr)
- [ ] Pas d'erreurs 404 massives

### J+7
- [ ] Positions SEO : impact mesuré
- [ ] Crawl stats Search Console
- [ ] Core Web Vitals vérifiés

---

## 🎉 Si Tout Passe

**Marseille est déployé avec :**
- ✅ Canonicals 100% parfaits
- ✅ SEO optimal
- ✅ Trailing slash partout

**Prochaine ville :** Nice, Lyon, ou autre ?

---

**Document créé le :** 31 octobre 2025  
**Dernière mise à jour :** 31 octobre 2025  
**Statut :** ✅ PRÊT POUR VALIDATION PRODUCTION

