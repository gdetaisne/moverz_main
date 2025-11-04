# [P1]-TASK-048 — CI anti-404 + garde push multi-sites

## 📋 Vue d'ensemble

**Créé** : 04/11/2025  
**Priorité** : P1 (Prévention business-critical)  
**Temps estimé** : 3-4h  
**Assigné** : Guillaume  

---

## 🎯 Objectif

Empêcher toute réintroduction de 404 via commits accidentels sur `sites/*/content/**`.

---

## 🔥 Contexte / Pourquoi

**Incident déclencheur** :
- Commit 8cab243 ("docs: Archive TASK-028...") le 04/11/2025 ~15:24
- A modifié 630 fichiers `sites/*/content/**` (9 villes)
- A réécrit des liens internes vers patterns invalides :
  - `](/demenagement/:slug)` → 404
  - `](/blog/:category/guide)` → 404 (guides génériques n'existent pas)
- **Impact** : 676 erreurs 404 en 4h (Nice: 88, Rouen: 63, Toulouse: 33, Bordeaux: 27...)
- **Temps correction** : 3h d'investigation + revert complet

**Leçon** :
- Commits "docs only" ont touché du contenu SEO-critique
- Pas de validation avant push
- Scripts de sync propagent silencieusement les erreurs

---

## ✅ Critères de succès

1. **CI bloquante** :
   - Détecte patterns interdits dans diff `sites/*/content/**`
   - Vérifie liens internes Markdown → cible existe
   - Fail rapide (<1 min) si problème détecté

2. **Scripts sécurisés** :
   - `push-all-sites-to-github.sh` : rsync désactivé par défaut
   - Flags `--dry-run` et `--sites=ville1,ville2` disponibles
   - Message clair si protection activée

3. **Process renforcé** :
   - CODEOWNERS : `sites/**` requiert review Guillaume
   - Doc : README CI avec exemples d'usage
   - Note : activer branch protection sur main (à faire manuellement sur GitHub)

---

## 📦 Livrables

- [ ] `.github/workflows/check-content-links.yml` (CI regex + link-check)
- [ ] `scripts/deploy/push-all-sites-to-github.sh` modifié (gardes + flags)
- [ ] `.github/CODEOWNERS` créé
- [ ] `.cursor/tasks/[P1]-TASK-048-ci-anti-404/CI-README.md` (doc usage)

---

## 🚀 Plan d'implémentation

### Phase 1 : GitHub Actions (1.5h)
- Créer workflow `.github/workflows/check-content-links.yml`
- Job 1: Regex block (fail si patterns interdits)
- Job 2: Link check Markdown (fail si lien cassé)
- Test sur branche de test

### Phase 2 : Script guards (1h)
- Modifier `push-all-sites-to-github.sh`
- Ajouter variable `ALLOW_CONTENT_SYNC` (défaut: 0)
- Flags `--dry-run` et `--sites`
- Messages explicites

### Phase 3 : CODEOWNERS + Doc (30min)
- Créer `.github/CODEOWNERS`
- Rédiger CI-README.md
- Note sur branch protection

### Phase 4 : Tests (1h)
- Simuler commit avec pattern interdit → CI fail
- Tester --dry-run et --sites flags
- Valider sur Nice/Bordeaux

---

## 📊 Statut

**Progression** : 🟡 EN COURS

**Dernière mise à jour** : 04/11/2025


