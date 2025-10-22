# ✅ CHECKLIST SEO - GESTION DES ERREURS 404
## Projet Moverz - Octobre 2025

---

## 🎯 OBJECTIF
Réduire les erreurs 404, améliorer l'expérience utilisateur et préserver le SEO en mettant en place des redirections 301 permanentes.

**Cible :** Passer de **508 vues 404/semaine** à **< 50 vues 404/semaine** en 30 jours.

---

## 📊 PHASE 1 : DIAGNOSTIC (Fait ✅)

### ✅ 1.1 Analyse des données GA4
- [x] Export des données "404 Monitor"
- [x] Identification des sources principales :
  - `/blog` → 150 vues
  - `/estimation-rapide` → 20 vues
  - `/inventaire-ia` → 10 vues
  - Nice, Rouen (root) → 80 vues
  - Google organic → 30 vues

### ✅ 1.2 Groupement des patterns
- [x] Regex créés pour `/blog`, `/estimation-rapide`, etc.
- [x] Mapping vers destinations correctes

---

## 🔧 PHASE 2 : CORRECTION DES LIENS INTERNES

### 🔍 2.1 Audit des liens cassés dans le code

#### **Action : Rechercher tous les liens internes cassés**

**Dans le terminal :**
\`\`\`bash
# Rechercher les liens vers /blog
grep -r "href=\"/blog\"" app/ components/ --include="*.tsx" --include="*.ts"

# Rechercher les liens vers /estimation-rapide
grep -r "estimation-rapide" app/ components/ --include="*.tsx" --include="*.ts"

# Rechercher les liens vers /inventaire-ia
grep -r "inventaire-ia" app/ components/ --include="*.tsx" --include="*.ts"
\`\`\`

#### **Action : Corriger manuellement**

| Lien cassé | Lien correct | Fichiers à vérifier |
|------------|--------------|---------------------|
| `/blog` | `/actualites` | Navigation, Footer, Sitemap |
| `/estimation-rapide` | `/devis` | CTA, Landing pages |
| `/inventaire-ia` | `/analyse-ia` | Services, Features |

**Checklist :**
- [ ] Corriger les liens dans `components/Navigation.tsx`
- [ ] Corriger les liens dans `components/Footer.tsx`
- [ ] Corriger les liens dans `app/sitemap.ts`
- [ ] Corriger les liens dans toutes les pages de services
- [ ] Corriger les liens dans les pages de villes (Toulouse, Marseille, etc.)

---

## 🔀 PHASE 3 : MISE EN PLACE DES REDIRECTIONS

### 📝 3.1 Appliquer les redirections Next.js

#### **Action : Intégrer dans next.config.mjs**

**Fichier :** `next.config.mjs`

\`\`\`javascript
import { moverz404Redirects } from './next.config.redirects.mjs';

export default {
  // ... configuration existante
  
  async redirects() {
    return [
      ...moverz404Redirects,
      // Ajoutez d'autres redirections personnalisées ici
    ];
  },
};
\`\`\`

**Checklist :**
- [ ] Importer le fichier `next.config.redirects.mjs`
- [ ] Ajouter la fonction `redirects()` dans `next.config.mjs`
- [ ] Tester localement : `npm run dev`
- [ ] Vérifier chaque redirection manuellement
- [ ] Déployer sur production

---

### 🌐 3.2 Appliquer les redirections .htaccess (si Apache)

**Uniquement si vous utilisez Apache (serveur non-Vercel) :**

#### **Action : Créer/Modifier .htaccess**

**Fichier :** `.htaccess` (à la racine de chaque sous-domaine)

\`\`\`apache
# Copier le contenu de .htaccess.redirects
# Adapter pour chaque ville si nécessaire
\`\`\`

**Checklist par domaine :**
- [ ] devis-demenageur-toulousain.fr
- [ ] devis-demenageur-nice.fr
- [ ] devis-demenageur-rouen.fr
- [ ] devis-demenageur-marseille.fr
- [ ] devis-demenageur-strasbourg.fr
- [ ] devis-demenageur-lille.fr
- [ ] devis-demenageur-lyon.fr
- [ ] devis-demenageur-nantes.fr
- [ ] devis-demenageur-rennes.fr
- [ ] devis-demenageur-montpellier.fr

---

## 🔍 PHASE 4 : NETTOYAGE GOOGLE SEARCH CONSOLE

### 🧹 4.1 Soumettre les redirections à Google

#### **Action : Dans Search Console (pour chaque domaine)**

1. **Accéder à Search Console**
   - URL : https://search.google.com/search-console
   - Sélectionner chaque propriété (un par ville)

2. **Section "Couverture" ou "Pages"**
   - [ ] Identifier les pages 404 indexées
   - [ ] Noter les URLs avec erreurs 404
   - [ ] Vérifier qu'elles correspondent aux redirections créées

3. **Demander une réindexation (optionnel)**
   - [ ] Outil "Inspection d'URL"
   - [ ] Soumettre les nouvelles URLs (destinations des redirections)
   - [ ] Ex : `/actualites`, `/devis`, `/analyse-ia`

4. **Surveiller les erreurs 404**
   - [ ] Vérifier la baisse des 404 après 48-72h
   - [ ] Exporter un rapport CSV (avant/après)

**Checklist par domaine :**
- [ ] devis-demenageur-toulousain.fr
- [ ] devis-demenageur-nice.fr
- [ ] devis-demenageur-rouen.fr
- [ ] devis-demenageur-marseille.fr
- [ ] devis-demenageur-strasbourg.fr
- [ ] (répéter pour les 11 domaines)

---

## 📈 PHASE 5 : MONITORING GA4

### 📊 5.1 Vérifier la baisse du trafic 404

#### **Action : Suivi hebdomadaire dans GA4**

**Dashboard GA4 :**
1. **Exploration "404 Monitor"**
   - [ ] Comparer les 7 derniers jours vs. semaine précédente
   - [ ] Objectif : **-80% de vues 404 en 14 jours**

2. **Métriques à surveiller :**
   - [ ] Total vues 404 (objectif : < 100/semaine)
   - [ ] Nombre de sessions avec 404 (objectif : < 50/semaine)
   - [ ] Taux de rebond sur 404 (objectif : < 10%)

3. **Exporter les rapports :**
   - [ ] CSV hebdomadaire (tous les lundis)
   - [ ] Partager avec l'équipe

---

### 🤖 5.2 Automatiser la détection (optionnel)

#### **Action : Configurer les scripts d'automatisation**

**Option 1 : GA4 API (Node.js)**

\`\`\`bash
cd scripts
npm install @google-analytics/data dotenv
cp env.example.txt .env
# Remplir .env avec vos credentials
node ga4-404-monitor.js
\`\`\`

**Option 2 : BigQuery (Python)**

\`\`\`bash
cd scripts
pip install google-cloud-bigquery pandas python-dotenv
cp env.example.txt .env
# Remplir .env avec vos credentials
python ga4-404-bigquery.py
\`\`\`

**Checklist :**
- [ ] Créer un service account Google Cloud
- [ ] Activer GA4 Data API / BigQuery API
- [ ] Configurer les credentials dans `.env`
- [ ] Tester l'exécution manuelle
- [ ] Programmer un cron hebdomadaire (optionnel)

**Exemple cron (tous les lundis à 9h) :**
\`\`\`bash
0 9 * * 1 cd /path/to/moverz_main-4/scripts && node ga4-404-monitor.js
\`\`\`

---

## 🧪 PHASE 6 : TESTS & VALIDATION

### ✅ 6.1 Tests manuels des redirections

#### **Action : Tester chaque redirection**

**Checklist par redirection :**

1. **`/blog` → `/actualites`**
   - [ ] Tester sur toulousain.fr/blog
   - [ ] Tester sur marseille.fr/blog
   - [ ] Tester sur strasbourg.fr/blog
   - [ ] Vérifier code HTTP 301 (pas 302)
   - [ ] Vérifier que le contenu s'affiche correctement

2. **`/estimation-rapide` → `/devis`**
   - [ ] Tester sur toulousain.fr/estimation-rapide
   - [ ] Vérifier code HTTP 301
   - [ ] Vérifier formulaire de devis fonctionnel

3. **`/inventaire-ia` → `/analyse-ia`**
   - [ ] Tester en local d'abord
   - [ ] Tester en production
   - [ ] Vérifier code HTTP 301

**Outil recommandé :**
- **Extension Chrome : Redirect Path**
  - Affiche les codes de redirection (301, 302, 404)
- **cURL en terminal :**
  \`\`\`bash
  curl -I https://devis-demenageur-toulousain.fr/blog
  # Doit afficher : HTTP/1.1 301 Moved Permanently
  \`\`\`

---

### 🔬 6.2 Tests avec outils SEO

#### **Action : Valider avec Screaming Frog ou Sitebulb**

**Outil : Screaming Frog SEO Spider**

1. **Crawler chaque domaine**
   - [ ] devis-demenageur-toulousain.fr
   - [ ] devis-demenageur-nice.fr
   - [ ] (répéter pour tous les domaines)

2. **Vérifier :**
   - [ ] Aucune erreur 404 dans les liens internes
   - [ ] Toutes les redirections sont 301 (pas 302)
   - [ ] Aucune chaîne de redirection (A → B → C)
   - [ ] Aucune boucle de redirection

3. **Exporter le rapport**
   - [ ] Format CSV
   - [ ] Archiver dans `docs/seo-audits/`

---

## 📅 CALENDRIER DE SUIVI

| Semaine | Action | Responsable | Deadline |
|---------|--------|-------------|----------|
| **Semaine 1** | Corriger liens internes + Déployer redirections | Lucie | Vendredi |
| **Semaine 2** | Nettoyer Search Console + Monitoring GA4 | Lucie | Vendredi |
| **Semaine 3** | Tests complets + Automatisation | Lucie | Vendredi |
| **Semaine 4** | Rapport final + Ajustements | Lucie | Vendredi |

---

## 📊 INDICATEURS DE SUCCÈS (KPIs)

| Métrique | Avant | Objectif | Deadline |
|----------|-------|----------|----------|
| **Vues 404/semaine** | 508 | < 50 | 30 jours |
| **Sessions avec 404** | ~200 | < 20 | 30 jours |
| **Taux de rebond sur 404** | ~95% | < 10% | 30 jours |
| **Erreurs 404 GSC** | ~100 | < 10 | 45 jours |
| **Temps de détection** | Manuel | Automatique | 15 jours |

---

## 🚨 ALERTES À CONFIGURER

### Dans GA4 :
- [ ] Alerte si vues 404 > 100/semaine
- [ ] Alerte si nouveau pattern 404 (>10 vues en 24h)

### Dans Google Search Console :
- [ ] Alerte nouveaux 404 critiques
- [ ] Alerte augmentation soudaine des erreurs

---

## 📞 CONTACTS & RESSOURCES

**Support technique :**
- Documentation GA4 : https://developers.google.com/analytics/devguides/reporting/data/v1
- Documentation BigQuery : https://cloud.google.com/bigquery/docs
- Documentation Next.js redirects : https://nextjs.org/docs/app/api-reference/next-config-js/redirects

**Équipe :**
- Chef de projet : Lucie Stehelin de Taisne
- Support technique : [Votre contact technique]

---

## ✅ RÉSUMÉ RAPIDE (QUICK WIN)

**À faire CETTE SEMAINE :**

1. [ ] Intégrer `next.config.redirects.mjs` dans `next.config.mjs`
2. [ ] Déployer sur production (Vercel)
3. [ ] Tester les 3 redirections principales manuellement
4. [ ] Exporter un rapport GA4 "avant/après" (7 jours)
5. [ ] Corriger les 5 liens cassés les plus critiques dans le code

**Temps estimé : 2-3 heures** 🚀

---

**✨ Bonne chance, Lucie ! N'hésite pas si tu as des questions.**

