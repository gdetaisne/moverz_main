# 📋 CHECKLIST D'AUDIT - PROJECT MANAGEMENT

Date: 8 octobre 2025
Objectif: Valider la qualité de sortie des 10 sites de déménagement

---

## 🎯 CATÉGORIES D'AUDIT

### 1. ✅ TECHNIQUE & BUILD
### 2. 🎨 CONTENU & SEO
### 3. 🔗 NAVIGATION & UX
### 4. 📱 RESPONSIVE & PERFORMANCE
### 5. 🚀 DÉPLOIEMENT & MONITORING
### 6. 📊 COHÉRENCE MULTI-SITES

---

## 1️⃣ TECHNIQUE & BUILD

### A. Configuration
- [ ] `next.config.cjs` présent et valide (tous les sites)
- [ ] `postcss.config.cjs` présent et valide (tous les sites)
- [ ] `package.json` avec `"type": "module"` (tous les sites)
- [ ] `Dockerfile` correctement configuré (tous les sites)
- [ ] `captain-definition` présent (tous les sites)
- [ ] Variables d'environnement correctes par site
- [ ] Port 3000 configuré partout

### B. Build & Compilation
- [ ] Build Next.js réussit localement (9 sites à tester)
- [ ] Build CapRover réussit (9 sites à vérifier)
- [ ] Aucune erreur TypeScript
- [ ] Aucune erreur ESLint critique
- [ ] Aucun warning bloquant
- [ ] Taille des bundles JS raisonnable (<100KB First Load)
- [ ] Images optimisées (WebP, AVIF)

### C. Dépendances
- [ ] `node_modules` à jour
- [ ] Aucune vulnérabilité critique (`npm audit`)
- [ ] Versions Next.js cohérentes (14.2.33)
- [ ] Versions React cohérentes

---

## 2️⃣ CONTENU & SEO

### A. Métadonnées par site
- [ ] Titre de page unique par ville
- [ ] Meta description unique par ville
- [ ] Open Graph tags corrects
- [ ] Favicon présent
- [ ] manifest.json configuré
- [ ] robots.txt approprié
- [ ] sitemap.xml généré

### B. Contenu localisé
- [ ] Nom de ville correct partout (pas "Bordeaux")
- [ ] Région correcte (Grand Est, Normandie, etc.)
- [ ] Domaine correct dans les liens
- [ ] Quartiers réels de la ville
- [ ] Partenaires locaux (pas Bordeaux)
- [ ] Statistiques locales cohérentes
- [ ] Témoignages adaptés à la ville

### C. URLs & Structure
- [ ] URLs en minuscules (pas de majuscules)
- [ ] Slugs cohérents avec les dossiers
- [ ] Pages quartiers toutes accessibles
- [ ] Pages services avec nom de ville
- [ ] Pas de corridors auto-référents (ville-vers-ville)
- [ ] Liens internes fonctionnels (aucun 404)

### D. Textes & Grammaire
- [ ] Aucune faute d'orthographe visible
- [ ] Accents corrects (é, è, à, etc.)
- [ ] Majuscules appropriées (noms de villes, quartiers)
- [ ] Cohérence des noms de quartiers
- [ ] Textes complets (pas de Lorem Ipsum)

---

## 3️⃣ NAVIGATION & UX

### A. Header
- [ ] Logo cliquable → retour accueil
- [ ] Menu "Zones desservies" fonctionnel
- [ ] Liste quartiers correcte (5-6 quartiers)
- [ ] Liens quartiers fonctionnent (pas 404)
- [ ] Menu mobile fonctionnel
- [ ] CTA "Obtenir 5 devis gratuits" présent
- [ ] Nom ville correct dans logo

### B. Footer
- [ ] Liens footer fonctionnels
- [ ] Mentions légales présentes
- [ ] Contact visible
- [ ] Réseaux sociaux (si applicable)
- [ ] Copyright avec année correcte

### C. Pages clés
- [ ] Page d'accueil accessible
- [ ] Page partenaires avec contenu local
- [ ] Page services accessible
- [ ] Page FAQ présente
- [ ] Page contact fonctionnelle
- [ ] Pages quartiers (5-6 par site)
- [ ] Pages corridors (5-6 par site)

### D. Formulaires
- [ ] Formulaire contact fonctionnel
- [ ] Validation des champs
- [ ] Messages d'erreur clairs
- [ ] Confirmation d'envoi
- [ ] Protection anti-spam

---

## 4️⃣ RESPONSIVE & PERFORMANCE

### A. Design Responsive
- [ ] Mobile (320px-480px) : Layout OK
- [ ] Tablet (768px-1024px) : Layout OK
- [ ] Desktop (>1200px) : Layout OK
- [ ] Menu burger mobile fonctionnel
- [ ] Images responsive (srcset)
- [ ] Textes lisibles sur mobile

### B. Performance
- [ ] Lighthouse Score > 80 (Performance)
- [ ] Lighthouse Score > 90 (Accessibility)
- [ ] Lighthouse Score > 90 (Best Practices)
- [ ] Lighthouse Score > 90 (SEO)
- [ ] Time to First Byte < 600ms
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### C. Compatibilité navigateurs
- [ ] Chrome/Edge (dernières versions)
- [ ] Firefox (dernière version)
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers (Chrome, Safari iOS)

---

## 5️⃣ DÉPLOIEMENT & MONITORING

### A. Déploiement
- [ ] Site accessible via URL production
- [ ] HTTPS activé et fonctionnel
- [ ] Certificat SSL valide
- [ ] Redirections HTTP → HTTPS
- [ ] DNS configuré correctement
- [ ] Pas d'erreur 500 sur pages principales

### B. Monitoring
- [ ] Logs CapRover accessibles
- [ ] Pas d'erreur dans les logs
- [ ] Uptime monitoring configuré (optionnel)
- [ ] Alertes erreurs configurées (optionnel)

### C. Sauvegardes
- [ ] Code sur GitHub (9 repos)
- [ ] Commits récents visibles
- [ ] Webhooks CapRover fonctionnels
- [ ] Historique Git propre

---

## 6️⃣ COHÉRENCE MULTI-SITES

### A. Structure identique
- [ ] Même nombre de pages par type
- [ ] Même architecture de dossiers
- [ ] Même structure Header/Footer
- [ ] Même mise en page générale
- [ ] Même palette de couleurs

### B. Qualité homogène
- [ ] Tous les sites buildent sans erreur
- [ ] Tous les sites accessibles en production
- [ ] Pas de site avec plus d'erreurs que les autres
- [ ] Performance similaire entre sites
- [ ] SEO similaire entre sites

### C. Différenciation locale
- [ ] Chaque site est unique (contenu ville)
- [ ] Pas de copier-coller de contenu
- [ ] Quartiers différents par ville
- [ ] Partenaires différents par ville
- [ ] Statistiques différentes par ville

---

## 7️⃣ BUSINESS & CONVERSION

### A. Calls-to-Action (CTA)
- [ ] CTA visible sur toutes les pages
- [ ] Texte CTA clair ("Obtenir 5 devis gratuits")
- [ ] CTA sticky en scroll (mobile)
- [ ] Boutons d'action contrastés
- [ ] Formulaire accessible facilement

### B. Trust & Crédibilité
- [ ] Partenaires locaux réels (noms, notes)
- [ ] Témoignages (si présents)
- [ ] Garanties visibles
- [ ] Photos professionnelles
- [ ] Mentions légales complètes

### C. Tracking & Analytics
- [ ] Google Analytics configuré (si applicable)
- [ ] Events tracking CTAs (si applicable)
- [ ] Conversions trackées (si applicable)
- [ ] Heatmaps configurées (optionnel)

---

## 📊 TABLEAU DE BORD - SITES À AUDITER

| Site | Build | Contenu | Navigation | Performance | Deploy | Score |
|------|-------|---------|------------|-------------|--------|-------|
| Strasbourg | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Rouen | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Lyon | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Marseille | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Toulouse | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Nice | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Nantes | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Lille | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |
| Rennes | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | 0/5 |

---

## 🚦 CRITÈRES DE VALIDATION

### 🟢 GO (Prêt pour Production)
- ✅ Build réussit sans erreur
- ✅ Contenu 100% localisé
- ✅ Navigation fonctionnelle (0 lien 404)
- ✅ Performance Lighthouse > 80
- ✅ Site accessible en production

### 🟡 GO avec réserves
- ⚠️  Build OK mais warnings mineurs
- ⚠️  Contenu localisé mais quelques ajustements
- ⚠️  Navigation OK mais UX perfectible
- ⚠️  Performance > 70
- ⚠️  Site accessible mais optimisations possibles

### 🔴 NO GO (Blocage Production)
- ❌ Build échoue
- ❌ Contenu Bordeaux non corrigé
- ❌ Liens 404 critiques
- ❌ Performance < 60
- ❌ Site inaccessible

---

## 📝 MÉTHODE D'AUDIT

### Phase 1 : Audit Automatisé (30 min)
1. Script de vérification builds
2. Script de vérification liens
3. Script de vérification contenu
4. Lighthouse automatisé (9 sites)

### Phase 2 : Audit Manuel (2h)
1. Navigation complète par site (20 min/site)
2. Test formulaires
3. Test responsive (mobile/tablet)
4. Vérification contenu localisé

### Phase 3 : Tests Utilisateurs (optionnel, 1h)
1. Parcours utilisateur type
2. Test conversion (formulaire)
3. Feedback UX

### Phase 4 : Validation Finale (30 min)
1. Checklist complétée
2. Rapport de synthèse
3. Liste des correctifs si nécessaire
4. Décision GO/NO GO

---

## 🎯 LIVRABLES ATTENDUS

1. ✅ Checklist d'audit complétée (ce document)
2. 📊 Rapport Lighthouse (9 sites)
3. 📸 Screenshots clés (homepage, pages quartiers)
4. 🐛 Liste des bugs critiques (si applicable)
5. 📋 Plan d'actions correctifs (si nécessaire)
6. ✅ Validation GO/NO GO par site

---

## ⏱️ TIMELINE AUDIT

- **Jour 1 (3h)** : Audit automatisé + builds
- **Jour 2 (4h)** : Audit manuel navigation + contenu
- **Jour 3 (2h)** : Tests performance + responsive
- **Jour 4 (1h)** : Validation finale + rapport

**Total : 10h réparties sur 4 jours**

