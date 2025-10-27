## SOP Déploiement - Commits, GitHub, CapRover (Monorepo Moverz)

Objectif: Process unique, clair, reproductible pour livrer une modification du monorepo vers tous les sites (repos individuels) et CapRover.

### 1) Branching et commits
- Travailler sur une branche de feature ou de rollback (ex: `rollback/2025-10-16`).
- Commits lisibles et courts, scope clair.
- Quand je dois “commit”, exécuter:
  - `git add -A`
  - `git commit -m "type(scope): message court"`
  - `git push -u origin <branch>`

### 2) Préparer/pousser les sites vers leurs repos individuels
Deux options selon le besoin:

- Option rapide (pousse chaque dossier sites/<ville> → repo dd-<ville>):
  - `bash init-and-push-sites-fixed.sh`
  - Utilise /Users/lucie/moverz_main comme racine et force-push sur `main` des repos:
    - dd-bordeaux, dd-lille, dd-lyon, dd-marseille, dd-montpellier, dd-nantes, dd-nice, dd-rennes, dd-rouen, dd-strasbourg, dd-toulouse.

- Option depuis la racine (change le remote origin temporairement):
  - `bash scripts/push-to-all-site-repos.sh`
  - Séquentiel: pour chaque ville → set-url origin → push main → restore origin.

Notes:
- Si un repo n’existe pas, utiliser `scripts/deploy/deploy-all-sites.sh` avec `GITHUB_TOKEN` pour le créer et pousser.

### 3) CapRover - déploiement
- Chaque app CapRover (dd-<ville>) doit être configurée pour déployer depuis le repo individuel GitHub:
  - Method: GitHub
  - Repository: gdetaisne/dd-<ville>
  - Branch: `main`
  - Captain Definition Path: racine (les repos contiennent `Dockerfile` et `captain-definition`).
- Save & Deploy. Vérifier logs: Next.js build OK.

### 4) Rollback rapide
- Checkout la branche cible (ex: `rollback/2025-10-16`).
- Pousser vers les repos individuels: `bash init-and-push-sites-fixed.sh`.
- Déclencher « Save & Deploy » dans CapRover.

### 5) Validation
- Local: `npm run dev -p 3007` à la racine pour tester.
- Par site: `cd sites/<ville> && npm run dev -p 3001`.
- En prod: tester pages clés, `/blog`, `/faq`, `/services`, corridors, sitemaps.

### 6) Commandes utiles

```
# Pousser tous les sites (rapide)
bash init-and-push-sites-fixed.sh

# Pousser via remote switcher
bash scripts/push-to-all-site-repos.sh

# Créer + pousser (si repo inexistant)
export GITHUB_TOKEN=xxxxx
bash scripts/deploy/deploy-all-sites.sh
```

### 7) Règles
- Ne pas modifier `next.config.mjs` racine pour des redirections destinées aux sites; utiliser `sites/<ville>/next.config.mjs`.
- Vérifier les imports locaux (ex: `@/lib/seo.ts`) dans chaque site.
- Toujours vérifier la branche utilisée côté CapRover build.


