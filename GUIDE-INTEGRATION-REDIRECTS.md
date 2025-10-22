# 🎯 GUIDE D'INTÉGRATION DES REDIRECTIONS 301
## Moverz - Correction des 404 (508 vues/semaine)

---

## ⚡ QUICK START (5 minutes)

### **Étape 1 : Intégrer les redirections dans Next.js**

Ouvrir le fichier `next.config.mjs` et ajouter les redirections :

\`\`\`javascript
// next.config.mjs
import { moverz404Redirects } from './next.config.redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... votre configuration existante ...
  
  // AJOUT DES REDIRECTIONS 301
  async redirects() {
    return [
      ...moverz404Redirects,
      // Ajoutez d'autres redirections personnalisées ici
    ];
  },
};

export default nextConfig;
\`\`\`

### **Étape 2 : Tester en local**

\`\`\`bash
npm run dev
\`\`\`

**Tester dans le navigateur :**
- http://localhost:3000/blog → doit rediriger vers `/actualites`
- http://localhost:3000/estimation-rapide → doit rediriger vers `/devis`
- http://localhost:3000/inventaire-ia → doit rediriger vers `/analyse-ia`

### **Étape 3 : Vérifier le code HTTP**

**Dans le terminal :**
\`\`\`bash
curl -I http://localhost:3000/blog
\`\`\`

**Résultat attendu :**
\`\`\`
HTTP/1.1 308 Permanent Redirect
Location: /actualites
\`\`\`

✅ **Code 308 = 301 en Next.js** (permanent redirect)

### **Étape 4 : Déployer**

\`\`\`bash
# Si Vercel
vercel deploy --prod

# Ou via Git
git add .
git commit -m "fix: Add 301 redirects for 404 errors (508 views/week)"
git push origin main
\`\`\`

---

## 📊 REDIRECTIONS APPLIQUÉES

Basées sur l'analyse GA4 du 22/10/2025 :

| Source (404) | Destination | Vues | Priorité |
|--------------|-------------|------|----------|
| `/blog` | `/actualites` | 150 | 🔴 HAUTE |
| `/estimation-rapide` | `/devis` | 20 | 🟡 MOYENNE |
| `/inventaire-ia` | `/analyse-ia` | 10 | 🟢 BASSE |

**Impact attendu :** Réduction de **180 vues 404** (35% du total)

---

## 🔍 DOMAINES CONCERNÉS

Ces redirections s'appliquent à **tous les domaines Moverz** :

- ✅ devis-demenageur-toulousain.fr (100 vues 404/blog)
- ✅ devis-demenageur-marseille.fr (30 vues 404/blog)
- ✅ devis-demenageur-strasbourg.fr (20 vues 404/blog)
- ✅ devis-demenageur-nice.fr (40 vues 404)
- ✅ devis-demenageur-rouen.fr (40 vues 404)
- ✅ + 6 autres domaines

---

## 🧪 TESTS COMPLETS

### **Test 1 : Redirections simples**

\`\`\`bash
# Toulouse
curl -I https://devis-demenageur-toulousain.fr/blog

# Nice
curl -I https://devis-demenageur-nice.fr/estimation-rapide

# Rouen
curl -I https://devis-demenageur-rouen.fr/inventaire-ia
\`\`\`

**Attendu : HTTP 308 Permanent Redirect**

### **Test 2 : Redirections avec sous-chemins**

\`\`\`bash
curl -I https://devis-demenageur-toulousain.fr/blog/article-ancien
# Doit rediriger vers : /actualites/article-ancien
\`\`\`

### **Test 3 : Trailing slash**

\`\`\`bash
curl -I https://devis-demenageur-toulousain.fr/blog/
# Doit rediriger vers : /actualites
\`\`\`

---

## 🛠️ PERSONNALISATION

### **Ajouter une nouvelle redirection**

**Dans `next.config.redirects.mjs` :**

\`\`\`javascript
export const moverz404Redirects = [
  // Redirections existantes...
  
  // VOTRE NOUVELLE REDIRECTION
  {
    source: '/ancienne-url',
    destination: '/nouvelle-url',
    permanent: true, // 301
  },
];
\`\`\`

### **Redirection conditionnelle (par domaine)**

\`\`\`javascript
{
  source: '/special',
  destination: '/autre',
  permanent: true,
  has: [
    {
      type: 'host',
      value: 'devis-demenageur-toulousain.fr',
    },
  ],
},
\`\`\`

### **Redirection avec paramètres**

\`\`\`javascript
{
  source: '/services/:slug',
  destination: '/nos-services/:slug',
  permanent: true,
},
\`\`\`

**Exemple :**  
`/services/demenagement` → `/nos-services/demenagement`

---

## 📈 MONITORING (7 JOURS APRÈS)

### **Dans GA4**

1. Exploration "404 Monitor"
2. Comparer :
   - **Avant** (22/10 - 29/10) : 508 vues
   - **Après** (29/10 - 05/11) : ? vues

**Objectif :** < 100 vues 404/semaine (-80%)

### **Dans Google Search Console**

1. Section "Couverture" ou "Pages"
2. Filtrer : Statut = "404"
3. Vérifier la baisse des erreurs

**Objectif :** -50% d'erreurs 404 en 14 jours

---

## 🚨 PROBLÈMES COURANTS

### **❌ Redirection ne fonctionne pas**

**Solutions :**
1. Vérifier que `next.config.redirects.mjs` est bien importé
2. Redémarrer le serveur : `npm run dev`
3. Vérifier la syntaxe (virgules, parenthèses)
4. Vérifier que le `source` correspond exactement à l'URL 404

### **❌ Boucle de redirection**

**Exemple :** `/blog` → `/actualites` → `/blog` → ...

**Solution :**
- Vérifier qu'aucune redirection ne pointe vers elle-même
- Vérifier qu'il n'y a pas de chaîne de redirections

### **❌ Code 302 au lieu de 301**

**Solution :**
- S'assurer que `permanent: true` est bien défini
- En Next.js, 308 = 301 (permanent redirect moderne)

---

## 📋 CHECKLIST POST-DÉPLOIEMENT

- [ ] Tester les 3 redirections principales manuellement
- [ ] Vérifier le code HTTP (308/301) avec curl
- [ ] Soumettre les nouvelles URLs dans Search Console
- [ ] Exporter un rapport GA4 "avant/après" (7 jours)
- [ ] Corriger les liens internes cassés dans le code
- [ ] Programmer un monitoring hebdomadaire

---

## 🎯 PROCHAINES ÉTAPES

### **Court terme (cette semaine)**
1. ✅ Déployer les redirections (FAIT si vous suivez ce guide)
2. 🔄 Corriger les liens internes cassés (voir CHECKLIST-SEO-404.md)
3. 🔄 Nettoyer Search Console

### **Moyen terme (2 semaines)**
1. Automatiser la détection avec `ga4-404-monitor.js`
2. Configurer des alertes GA4
3. Audit complet avec Screaming Frog

### **Long terme (1 mois)**
1. Réduire à < 50 vues 404/semaine
2. Mettre en place un monitoring continu
3. Documenter les patterns récurrents

---

## 📞 AIDE

**Documentation :**
- [Next.js Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)
- [CHECKLIST-SEO-404.md](./CHECKLIST-SEO-404.md) (guide complet)
- [scripts/README-404-AUTOMATION.md](./scripts/README-404-AUTOMATION.md) (automatisation)

**Questions ?**
- Chef de projet : Lucie Stehelin de Taisne

---

## ✅ RÉSUMÉ

**Ce qui a été fait :**
- ✅ Analyse des 508 vues 404 GA4
- ✅ Identification de 3 patterns majeurs
- ✅ Création de 3 redirections 301
- ✅ Code prêt à déployer

**Impact attendu :**
- 📉 -35% de vues 404 (180 vues évitées)
- 🚀 Amélioration de l'UX
- 📈 Préservation du SEO

**Temps de déploiement :** 5-10 minutes ⏱️

---

**🎉 Bravo ! Les redirections sont prêtes à être déployées.**

