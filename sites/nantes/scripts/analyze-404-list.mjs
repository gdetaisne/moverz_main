#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mappingPath = path.join(__dirname, 'blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Liste des 404s de l'utilisateur (slugs extraits)
const links404 = `
demenagement-nantes-usa-canada
demenagement-nantes-asie
demenagement-nantes-uk-post-brexit
aide-demenagement-amis-famille-nantes
demenagement-semaine-vs-weekend-nantes
comparatif-formules-economiques-nantes
demenagement-derniere-minute-nantes
basse-saison-demenagement-nantes
prix-demenagement-pas-cher-nantes-2025
demenagement-etudiant-nantes-astuces
astuces-reduire-cout-demenagement-nantes
emballage-diy-demenagement-nantes
demenagement-piano-nantes-prix
demenagement-piano-queue-nantes
demenagement-piano-etages-sans-ascenseur-nantes
demenagement-objets-lourds-nantes
monte-meuble-demenagement-nantes
prix-garde-meuble-nantes-2025
garde-meuble-pas-cher-nantes
garde-meuble-courte-duree-nantes
assurance-garde-meuble-nantes
garde-meuble-etudiant-nantes
transport-maritime-vs-aerien-demenagement-nantes
`.trim().split('\n').map(s => s.trim()).filter(Boolean);

console.log(`📊 Analyse ${links404.length} liens 404\n`);

const exists = [];
const missing = [];

links404.forEach(slug => {
  if (mapping[slug]) {
    exists.push({ slug, url: mapping[slug].url });
  } else {
    missing.push(slug);
  }
});

console.log(`✅ ${exists.length} articles EXISTENT dans le mapping:`);
exists.forEach(item => console.log(`  - ${item.slug} → ${item.url}`));

console.log(`\n❌ ${missing.length} articles MANQUANTS:`);
missing.forEach(slug => console.log(`  - ${slug}`));

console.log(`\n📊 Résumé: ${exists.length}/${links404.length} existent (${Math.round(exists.length/links404.length*100)}%)`);

