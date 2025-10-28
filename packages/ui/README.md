# @moverz/ui

Composants UI partagés (Hero, HowItWorks, PricingPreview, StickyCTA) pour les sites Moverz.

## Utilisation (monorepo)
- Activer les workspaces au root
- Ajouter `transpilePackages: ['@moverz/ui']` dans `next.config.mjs`
- Importer: `import { Hero } from '@moverz/ui'`

## Build
```
pnpm -w @moverz/ui build
```

## Notes
- `react`, `react-dom`, `next` en peerDependencies
- Ajouter le package dans la config Tailwind `content` côté sites si nécessaire
