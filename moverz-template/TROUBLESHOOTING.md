# 🔧 **Troubleshooting - Moverz Template**

## 🚨 **Erreurs Courantes et Solutions**

---

## **1. ERREURS HANDLEBARS**

### **1.1 Missing Helper Errors**

#### **Erreur :** `Missing helper: "color:"`
```
Error: Missing helper: "color:"
    at Object.<anonymous> (/path/to/file:line:column)
```

**Cause :** Handlebars interprète mal les styles CSS inline ou les classes avec caractères spéciaux.

**Solution :**
```tsx
// ❌ Incorrect - Handlebars ne peut pas parser
style={{ color: "#6bcfcf" }}

// ✅ Correct - Utiliser des classes Tailwind
className="text-[#6bcfcf]"
```

#### **Erreur :** `Missing helper: "bg-"`
```
Error: Missing helper: "bg-"
```

**Cause :** Classes CSS avec crochets non échappés.

**Solution :**
```tsx
// ❌ Incorrect
className="bg-[#04163a]"

// ✅ Correct - Échapper les crochets
className="bg-\\[\\#04163a\\]"
```

### **1.2 Syntax Errors**

#### **Erreur :** `Unexpected token 'section'`
```
Error: x Unexpected token `section`. Expected jsx identifier
```

**Cause :** Handlebars placeholders mal formés dans le JSX.

**Solution :**
```tsx
// ❌ Incorrect - Placeholders Handlebars dans JSX
<section className="relative overflow-hidden text-white">
  <h1>{{hero_title}}</h1>
</section>

// ✅ Correct - Utiliser des variables JavaScript
<section className="relative overflow-hidden text-white">
  <h1>{heroTitle}</h1>
</section>
```

---

## **2. ERREURS NEXT.JS**

### **2.1 Configuration Files**

#### **Erreur :** `Configuring Next.js via 'next.config.ts' is not supported`
```
Error: Configuring Next.js via 'next.config.ts' is not supported. 
Please replace the file with 'next.config.js' or 'next.config.mjs'.
```

**Cause :** Next.js 14+ ne supporte que les fichiers `.js` ou `.mjs` pour la configuration.

**Solution :**
```bash
# Supprimer le fichier .ts
rm next.config.ts

# Le script génère automatiquement next.config.js
node scripts/generate-site-handlebars.js [ville]
```

#### **Erreur :** `Cannot find module '@tailwindcss/postcss'`
```
Error: Cannot find module '@tailwindcss/postcss'
```

**Cause :** Dépendance PostCSS manquante.

**Solution :**
```bash
# Installer la dépendance manquante
npm install @tailwindcss/postcss

# Ou régénérer le site (le script l'installe automatiquement)
node scripts/generate-site-handlebars.js [ville]
```

### **2.2 Missing Files**

#### **Erreur :** `Module not found: Can't resolve './globals.css'`
```
Module not found: Can't resolve './globals.css'
```

**Cause :** Fichier CSS global manquant.

**Solution :**
```bash
# Vérifier que le fichier existe
ls -la src/app/globals.css

# Si manquant, le régénérer
node scripts/generate-site-handlebars.js [ville]
```

#### **Erreur :** `ENOENT: no such file or directory, scandir '/path/to/src/app'`
```
Error: ENOENT: no such file or directory, scandir '/path/to/src/app'
```

**Cause :** Dossier `src/app` manquant ou structure incomplète.

**Solution :**
```bash
# Vérifier la structure
ls -la sites/[ville]/src/

# Régénérer complètement
rm -rf sites/[ville]
node scripts/generate-site-handlebars.js [ville]
```

---

## **3. ERREURS DE GÉNÉRATION**

### **3.1 File Generation Errors**

#### **Erreur :** `ENOENT: no such file or directory, open '/path/to/file'`
```
Error: ENOENT: no such file or directory, open '/path/to/file'
```

**Cause :** Dossier parent manquant pour le fichier à créer.

**Solution :**
```javascript
// Dans le script de génération, s'assurer de créer les dossiers
await fs.ensureDir(path.dirname(filePath));
await fs.writeFile(filePath, content);
```

#### **Erreur :** `Expected '(', got '-'` dans les noms de fonctions
```
Error: Expected '(', got '-'
```

**Cause :** Noms de fonctions avec des tirets (invalides en JavaScript).

**Solution :**
```javascript
// Sanitizer les noms de fonctions
const functionName = quartierName.replace(/[^a-zA-Z0-9]/g, '');
```

### **3.2 Handlebars Compilation Errors**

#### **Erreur :** `Parse error on line X: ...`
```
Parse error on line 264: ...TML={{ __html: JSON.stringify(json) }}
```

**Cause :** Handlebars essaie de parser du JSX.

**Solution :**
```javascript
// Utiliser des template literals au lieu de Handlebars pour le JSX
const content = `
  <div dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(data)}) }} />
`;
```

---

## **4. ERREURS DE PORT**

### **4.1 Port Already in Use**

#### **Erreur :** `EADDRINUSE: address already in use :::4000`
```
Error: listen EADDRINUSE: address already in use :::4000
```

**Cause :** Port 4000 déjà utilisé par un autre processus.

**Solution :**
```bash
# Tuer les processus sur le port 4000
lsof -ti:4000 | xargs kill -9

# Ou utiliser un autre port
PORT=4001 npm run dev
```

#### **Erreur :** `EADDRINUSE: address already in use :::3000`
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause :** Port par défaut de Next.js déjà utilisé.

**Solution :**
```bash
# Utiliser un port spécifique
npm run dev -- -p 4000
```

---

## **5. ERREURS TAILWIND CSS**

### **5.1 Missing Content Configuration**

#### **Erreur :** `The 'content' option in your Tailwind CSS configuration is missing or empty`
```
warn - The `content` option in your Tailwind CSS configuration is missing or empty.
```

**Cause :** Configuration Tailwind incomplète.

**Solution :**
```javascript
// Dans tailwind.config.ts
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ... rest of config
}
```

### **5.2 CSS Not Loading**

#### **Erreur :** Styles Tailwind non appliqués
**Cause :** Fichier `globals.css` manquant ou mal configuré.

**Solution :**
```css
/* Dans src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## **6. ERREURS DE DONNÉES**

### **6.1 Missing Data Fields**

#### **Erreur :** `Cannot read properties of undefined (reading 'replace')`
```
TypeError: Cannot read properties of undefined (reading 'replace')
```

**Cause :** Champ manquant dans le fichier de données JSON.

**Solution :**
```javascript
// Vérifier que tous les champs requis existent
const requiredFields = ['city_name', 'citySlug', 'region', 'domain'];
requiredFields.forEach(field => {
  if (!cityData[field]) {
    throw new Error(`Missing required field: ${field}`);
  }
});
```

#### **Erreur :** `Cannot read properties of undefined (reading 'length')`
```
TypeError: Cannot read properties of undefined (reading 'length')
```

**Cause :** Array manquant (ex: `quartiers`, `testimonials`).

**Solution :**
```javascript
// Vérifier et initialiser les arrays
const quartiers = cityData.quartiers || [];
const testimonials = cityData.testimonials || [];
```

---

## **7. ERREURS DE BUILD**

### **7.1 Build Failures**

#### **Erreur :** `Failed to compile`
```
Failed to compile
./src/components/Hero.tsx
Syntax error: Unexpected token
```

**Cause :** Erreur de syntaxe dans les composants générés.

**Solution :**
```bash
# Vérifier la syntaxe
npm run lint

# Corriger les erreurs et rebuilder
npm run build
```

#### **Erreur :** `Module not found: Can't resolve '@/components/...'`
```
Module not found: Can't resolve '@/components/Header'
```

**Cause :** Alias de chemin mal configuré.

**Solution :**
```javascript
// Dans next.config.js
module.exports = {
  experimental: {
    appDir: true,
  },
  // ... rest of config
}
```

---

## **8. SOLUTIONS PRÉVENTIVES**

### **8.1 Vérifications Avant Génération**
```bash
# 1. Vérifier que le template est fonctionnel
cd moverz-template
npm run dev

# 2. Vérifier les données JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('data/[ville].json', 'utf8')))"

# 3. Nettoyer les anciens sites
rm -rf sites/[ville]
```

### **8.2 Vérifications Après Génération**
```bash
# 1. Vérifier la structure
ls -la sites/[ville]/src/

# 2. Tester la compilation
cd sites/[ville]
npm run build

# 3. Tester le serveur
npm run dev
```

---

## **9. COMMANDES DE DIAGNOSTIC**

### **9.1 Vérifier les Ports**
```bash
# Lister les ports utilisés
lsof -i :4000
lsof -i :3000

# Tuer un processus spécifique
kill -9 [PID]
```

### **9.2 Vérifier les Dépendances**
```bash
# Vérifier les dépendances installées
npm list

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### **9.3 Vérifier les Fichiers**
```bash
# Vérifier la structure des fichiers
find sites/[ville] -name "*.tsx" -o -name "*.ts" -o -name "*.js" | head -20

# Vérifier les permissions
ls -la sites/[ville]/
```

---

## **10. CONTACT ET SUPPORT**

### **10.1 En Cas de Problème Persistant**
1. **Consulter** ce guide de troubleshooting
2. **Vérifier** les logs d'erreur complets
3. **Tester** avec un site simple (données minimales)
4. **Documenter** l'erreur pour améliorer ce guide

### **10.2 Amélioration Continue**
- **Signaler** les nouvelles erreurs rencontrées
- **Proposer** des solutions alternatives
- **Mettre à jour** ce guide régulièrement

---

**Version :** 1.0  
**Dernière mise à jour :** Janvier 2025  
**Auteur :** Assistant IA Moverz

