# 🔧 CORRECTIONS APPLIQUÉES AU TEMPLATE

**Date** : 8 octobre 2025  
**Raison** : Éviter de refaire les mêmes erreurs à chaque génération

---

## ❌ ERREURS CORRIGÉES

### 1. **CtaPrimary.tsx - Variables Handlebars dans JSX**

**Fichier** : `src/components/CtaPrimary.tsx`  
**Ligne** : 62

**❌ AVANT (Bug)** :
```typescript
case "footer":
  return "Rejoignez plus de 1200 clients satisfaits à {{{city_name}}}";
```

**✅ APRÈS (Corrigé)** :
```typescript
case "footer":
  return "Rejoignez plus de 1200 clients satisfaits à Bordeaux"; // Sera remplacé par ville
```

**⚠️ PROBLÈME** : Les variables Handlebars `{{{...}}}` dans du JSX causent des erreurs de parsing SWC.

**✅ SOLUTION** : Utiliser le nom de la ville en dur, qui sera remplacé par le script de génération via regex.

---

### 2. **LocalPage.tsx - Fragment React et Script**

**Fichier** : `src/app/_templates/LocalPage.tsx`

**❌ AVANT (Bug)** :
```typescript
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="min-h-screen bg-[#04163a]">
      ...
    </div>
  </>
);
```

**✅ APRÈS (Corrigé)** :
```typescript
import Script from 'next/script';

return (
  <div className="min-h-screen bg-[#04163a]">
    <Script
      id="local-page-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    ...
  </div>
);
```

**⚠️ PROBLÈMES** :
- Fragment `<>` avec `<script>` cause des erreurs de parsing
- `<script>` HTML ne fonctionne pas dans JSX
- Manque d'import de `Script`

**✅ SOLUTIONS** :
- Retirer le Fragment
- Utiliser `<Script>` de Next.js
- Ajouter `strategy="afterInteractive"`

---

### 3. **generate-site.js - Dossier _templates/ non copié**

**Fichier** : `scripts/generate-site.js`  
**Ligne** : ~147

**❌ AVANT (Bug)** :
```javascript
// Copier les libs
await fs.copy(
  path.join(this.templateDir, 'src/lib'),
  path.join(this.outputDir, 'src/lib')
);

// Copier les images
await fs.copy(
  path.join(this.templateDir, 'public/images'),
  path.join(this.outputDir, 'public/images')
);
```

**✅ APRÈS (Corrigé)** :
```javascript
// Copier les libs
await fs.copy(
  path.join(this.templateDir, 'src/lib'),
  path.join(this.outputDir, 'src/lib')
);

// Copier les templates
await fs.copy(
  path.join(this.templateDir, 'src/app/_templates'),
  path.join(this.outputDir, 'src/app/_templates')
);

// Copier les images
await fs.copy(
  path.join(this.templateDir, 'public/images'),
  path.join(this.outputDir, 'public/images')
);
```

**⚠️ PROBLÈME** : Le dossier `_templates/` n'était pas copié lors de la génération.

**✅ SOLUTION** : Ajouter la copie explicite du dossier `_templates/`.

---

### 4. **globals.css - Classe Tailwind non définie**

**Fichier** : `app/globals.css` ou `src/app/globals.css`

**❌ AVANT (Bug)** :
```css
* {
  @apply border-border;
}
```

**✅ APRÈS (Corrigé)** :
```css
* {
  @apply border-gray-200;
}
```

**⚠️ PROBLÈME** : `border-border` n'est pas une classe Tailwind définie.

**✅ SOLUTION** : Utiliser `border-gray-200` ou définir `border` dans `tailwind.config.ts`.

---

## 📝 CHECKLIST AVANT GÉNÉRATION

Avant de générer un nouveau site, TOUJOURS vérifier :

- [ ] Pas de `{{{variable}}}` dans du JSX (uniquement dans strings ou attributs HTML)
- [ ] `Script` de Next.js au lieu de `<script>` HTML
- [ ] Pas de Fragment `<>` si conflit avec Script
- [ ] Dossier `_templates/` copié dans `generate-site.js`
- [ ] Classes Tailwind valides dans `globals.css`
- [ ] Import de `Script from 'next/script'` présent

---

## 🚀 PROCESSUS DE CORRECTION

Si une erreur est détectée dans un site généré :

1. ✅ Corriger le site généré (ex: `sites/bordeaux/`)
2. ✅ **IMMÉDIATEMENT** reporter la correction dans `moverz-template/`
3. ✅ Documenter la correction dans ce fichier
4. ✅ Tester la correction sur le template
5. ✅ Appliquer la correction aux autres sites générés

**⚠️ NE JAMAIS** corriger seulement le site généré sans mettre à jour le template !

---

## 📊 HISTORIQUE DES CORRECTIONS

| Date | Fichier | Correction | Raison |
|------|---------|-----------|--------|
| 2025-10-08 | CtaPrimary.tsx | Retrait {{{city_name}}} | Erreur parsing JSX |
| 2025-10-08 | LocalPage.tsx | Fragment → div + Script | Erreur parsing SWC |
| 2025-10-08 | generate-site.js | Ajout copie _templates/ | Module not found |
| 2025-10-08 | globals.css | border-border → border-gray-200 | Classe non définie |

---

## 🎯 RÈGLE D'OR

> **"Une correction appliquée = Template mis à jour + Documentation"**

Ne jamais laisser le template avec des bugs déjà corrigés ailleurs !


