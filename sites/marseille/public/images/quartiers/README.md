# 🏘️ Quartiers Bordeaux Images

## Images Suggérées

### Quartiers Prioritaires

#### `chartrons.jpg` ✅ (Implémenté)
- **Format**: 16:9 ou 4:3
- **Dimensions**: 1600x900px
- **Poids max**: 100KB
- **Contenu**: Façades pierre typiques, rues pavées étroites, antiquaires
- **Alt**: `"Chartrons — accès camion déménagement, façades typiques, rues étroites"`

#### `saint-pierre.jpg`
- **Format**: 16:9 ou 4:3
- **Dimensions**: 1600x900px
- **Contenu**: Rues pavées centre historique, accès limité
- **Alt**: `"Saint-Pierre — rues pavées, accès camion limité, centre historique Bordeaux"`

#### `cauderan.jpg`
- **Format**: 16:9 ou 4:3
- **Dimensions**: 1600x900px
- **Contenu**: Quartier résidentiel, avenues larges, parkings
- **Alt**: `"Caudéran — accès camion facilité, quartier résidentiel, parkings"`

#### `merignac.jpg`
- **Format**: 16:9 ou 4:3
- **Dimensions**: 1600x900px
- **Contenu**: Zone péri-urbaine, espaces dégagés
- **Alt**: `"Mérignac — accès camion facilité, parking aisé, zone résidentielle"`

#### `pessac.jpg`
- **Format**: 16:9 ou 4:3
- **Dimensions**: 1600x900px
- **Contenu**: Mix résidentiel/universitaire
- **Alt**: `"Pessac — accès résidentiel, proximité université, parkings"`

#### `bastide.jpg`
- **Format**: 16:9 ou 4:3
- **Dimensions**: 1600x900px
- **Contenu**: Quartier rive droite, accès pont
- **Alt**: `"Bastide — rive droite Garonne, accès pont, quartier résidentiel"`

## Utilisé Dans
- `app/_templates/LocalPage.tsx` (pages quartiers)
- `app/bordeaux/[quartier]/page.tsx`

## Comment Ajouter
```tsx
const quartierData = {
  zone: "bordeaux/nom-quartier",
  zoneDisplay: "Nom Quartier",
  coverImage: "/images/quartiers/nom-quartier.jpg", // ← Ajouter ici
  // ... autres props
};
```

## Sources d'Images
- **Unsplash**: `"bordeaux architecture"`, `"bordeaux street"`
- **Pexels**: `"french architecture"`, `"european street"`
- **Flickr**: Recherche géolocalisée Bordeaux
- **Wikimedia Commons**: Photos libres quartiers Bordeaux

## Guidelines
- Montrer les spécificités d'accès (étroit/large, parking, etc.)
- Capturer l'ambiance du quartier
- Focus architecture typique
- Éviter présence humaine trop visible
- Luminosité naturelle, pas de nuit

