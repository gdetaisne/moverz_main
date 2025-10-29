# 🎯 Image CTA (Call-to-Action)

## Image

### background.jpg (345 KB)
- **Contenu**: Déménagement professionnel / cartons
- **Source**: Unsplash (photo-1600518464441-9154a4dea21b)
- **Dimensions**: 2000×1200 px
- **Utilisation**: Fond des sections CTA

## Déploiement
- ✅ Site principal: `/public/images/cta/`
- ✅ 11 sites satellites
- ✅ Composant: `components/CtaPrimary.tsx`

## Utilisation
Cette image est utilisée comme fond pour les sections call-to-action sur :
- Page Services
- Page Contact
- Page Partenaires
- Page FAQ
- Et autres pages avec CTA inline

## Performances
- **Avant**: ~2 MB (Unsplash externe)
- **Après**: 345 KB (local)
- **Gain**: -83% de poids, -800ms latence

## Notes
- Overlay gradient appliqué (turquoise/teal)
- Image de haute qualité pour grands écrans
- Lazy loading géré par Next.js

## Migration
- **Date**: 29/10/2024
- **Phase**: 3 (Priorité Basse)

