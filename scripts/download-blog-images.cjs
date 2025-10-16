#!/usr/bin/env node

/**
 * 📝 Script automatisé de téléchargement d'images de blog
 * Pour les 10 piliers de blog des 11 sites Moverz
 * 
 * Usage:
 *   UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-blog-images.cjs
 * 
 * Ou créer un fichier .env à la racine:
 *   UNSPLASH_ACCESS_KEY=votre_clé
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');

// Configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const BASE_DIR = path.join(__dirname, '..');
const DRY_RUN = process.env.DRY_RUN === 'true'; // Pour tester sans télécharger

// Mapping des 10 piliers de blog avec leurs requêtes de recherche et alt-text SEO local
const BLOG_PILIERS = [
  { 
    filename: 'cover-etudiant.jpg', 
    query: 'student moving university campus young people',
    description: 'Déménagement Étudiant - Ambiance jeune, campus',
    altTextTemplate: 'Déménagement étudiant {ville} - Guide complet étudiants, université, budget serré'
  },
  { 
    filename: 'cover-entreprise.jpg', 
    query: 'office moving business relocation corporate',
    description: 'Déménagement Entreprise - Bureaux, déménagement pro',
    altTextTemplate: 'Déménagement entreprise {ville} - Relocation professionnelle, bureaux, déménageurs pros'
  },
  { 
    filename: 'cover-prix.jpg', 
    query: 'moving cost calculator money budget price',
    description: 'Prix & Tarifs - Calculatrice, devis, euros',
    altTextTemplate: 'Prix déménagement {ville} 2025 - Tarifs, devis, calculatrice, budget'
  },
  { 
    filename: 'cover-devis.jpg', 
    query: 'moving quote estimate form clipboard',
    description: 'Devis Déménagement - Formulaire, estimation',
    altTextTemplate: 'Devis déménagement {ville} gratuit - Estimation, comparateur, devis en ligne'
  },
  { 
    filename: 'cover-pas-cher.jpg', 
    query: 'cheap moving budget cardboard boxes',
    description: 'Déménagement Économique - Cartons, budget',
    altTextTemplate: 'Déménagement pas cher {ville} - Économique, budget, cartons, astuces'
  },
  { 
    filename: 'cover-urgent.jpg', 
    query: 'urgent moving fast relocation emergency',
    description: 'Déménagement Urgent - Rapidité, urgence',
    altTextTemplate: 'Déménagement urgent {ville} - Express, rapide, 24h, déménageurs disponibles'
  },
  { 
    filename: 'cover-longue-distance.jpg', 
    query: 'long distance moving truck highway',
    description: 'Longue Distance - Camion, autoroute',
    altTextTemplate: 'Déménagement longue distance {ville} - France entière, camion, autoroute'
  },
  { 
    filename: 'cover-garde-meuble.jpg', 
    query: 'storage unit warehouse boxes furniture',
    description: 'Garde-Meuble - Stockage, entrepôt',
    altTextTemplate: 'Garde-meuble {ville} - Stockage, entrepôt, self-stockage, location box'
  },
  { 
    filename: 'cover-international.jpg', 
    query: 'international moving world map passport',
    description: 'International - Carte du monde, voyage',
    altTextTemplate: 'Déménagement international {ville} - Étranger, expatriation, formalités douanes'
  },
  { 
    filename: 'cover-piano.jpg', 
    query: 'piano moving musical instrument transport',
    description: 'Déménagement Piano - Instrument, transport délicat',
    altTextTemplate: 'Déménagement piano {ville} - Transport piano, instrument, déménageurs spécialisés'
  }
];

// Images génériques par ville (covers spécifiques)
const VILLE_COVERS = [
  { 
    filename: 'cover-guide.jpg', 
    query: 'moving guide tips advice relocation',
    description: 'Guide déménagement - Conseils et astuces',
    altTextTemplate: 'Guide déménagement {ville} 2025 - Conseils, astuces, démarches, check-list'
  },
  { 
    filename: 'cover-quartiers.jpg', 
    query: 'neighborhoods city districts architecture',
    description: 'Quartiers - Architecture urbaine',
    altTextTemplate: 'Quartiers {ville} déménagement - Zones, accès camion, parkings, contraintes'
  },
  { 
    filename: 'cover-estimation.jpg', 
    query: 'moving estimation volume calculator measuring',
    description: 'Estimation volume - Calcul, mesure',
    altTextTemplate: 'Estimation volume déménagement {ville} - Calcul m3, devis, inventaire, prix'
  }
];

// Liste des villes
const VILLES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

// Statistiques
const stats = {
  total: 0,
  success: 0,
  failed: 0,
  skipped: 0
};

/**
 * Recherche une photo sur Unsplash
 */
async function searchUnsplashPhoto(query, orientation = 'landscape') {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1&content_filter=high`;
  
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          
          if (json.results && json.results.length > 0) {
            const photo = json.results[0];
            resolve({
              url: `${photo.urls.raw}&w=1600&h=900&fit=crop&q=80`,
              downloadUrl: photo.links.download_location,
              author: photo.user.name,
              authorUrl: photo.user.links.html,
              photoUrl: photo.links.html
            });
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Télécharge une image
 */
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(outputPath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

/**
 * Notifie Unsplash du téléchargement (requis par les ToS)
 */
async function triggerDownload(downloadUrl) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    };

    https.get(downloadUrl, options, (res) => {
      res.on('data', () => {}); // Consume response
      res.on('end', resolve);
    }).on('error', reject);
  });
}

/**
 * Délai pour respecter rate limits
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Traite une image de blog
 */
async function processBlogImage(ville, image) {
  stats.total++;
  
  const outputDir = path.join(BASE_DIR, 'sites', ville, 'public', 'images', 'blog');
  const outputPath = path.join(outputDir, image.filename);
  
  // Vérifier si l'image existe déjà
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  [${ville}/${image.filename}] Déjà présente, skip`);
    stats.skipped++;
    return;
  }
  
  console.log(`🔍 [${ville}/${image.filename}] Recherche: "${image.query}"...`);
  
  try {
    // Rechercher la photo
    const photo = await searchUnsplashPhoto(image.query);
    
    if (!photo) {
      console.log(`❌ [${ville}/${image.filename}] Aucun résultat trouvé`);
      stats.failed++;
      return;
    }
    
    if (DRY_RUN) {
      console.log(`🔗 [DRY RUN] ${photo.url}`);
      console.log(`   By ${photo.author} (${photo.authorUrl})`);
      stats.success++;
      return;
    }
    
    // Créer le dossier si nécessaire
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Télécharger l'image
    console.log(`⬇️  Téléchargement...`);
    await downloadImage(photo.url, outputPath);
    
    // Notifier Unsplash (requis)
    await triggerDownload(photo.downloadUrl);
    
    console.log(`✅ [${ville}/${image.filename}] Téléchargé avec succès`);
    console.log(`   📸 By ${photo.author} - ${photo.photoUrl}`);
    
    stats.success++;
    
    // Générer l'alt-text SEO local
    const altText = image.altTextTemplate.replace('{ville}', ville.charAt(0).toUpperCase() + ville.slice(1));
    
    // Enregistrer les attributions et métadonnées SEO
    const attributionPath = path.join(outputDir, 'ATTRIBUTIONS.txt');
    const attribution = `${image.filename}\n  Photo by ${photo.author} (${photo.authorUrl})\n  ${photo.photoUrl}\n  via Unsplash\n  Description: ${image.description}\n  Alt-text SEO: ${altText}\n\n`;
    fs.appendFileSync(attributionPath, attribution);
    
    // Créer un fichier de métadonnées SEO pour chaque image
    const metadataPath = path.join(outputDir, `${image.filename.replace('.jpg', '')}-metadata.json`);
    const metadata = {
      filename: image.filename,
      ville: ville,
      altText: altText,
      description: image.description,
      author: photo.author,
      authorUrl: photo.authorUrl,
      photoUrl: photo.photoUrl,
      keywords: [
        `déménagement ${ville}`,
        `déménageur ${ville}`,
        ville,
        'déménagement',
        'déménageur',
        'devis déménagement',
        'prix déménagement'
      ],
      seoOptimized: true,
      localSeo: true
    };
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
  } catch (err) {
    console.error(`❌ [${ville}/${image.filename}] Erreur: ${err.message}`);
    stats.failed++;
  }
  
  // Délai pour respecter rate limits (50 req/h = 1 req toutes les 72s, on prend 2s pour être safe)
  await delay(2000);
}

/**
 * Main
 */
async function main() {
  console.log('📝 Téléchargement automatique des images de blog Moverz\n');
  
  // Vérifier la clé API
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('❌ ERREUR: Variable UNSPLASH_ACCESS_KEY manquante\n');
    console.log('📋 Pour obtenir votre clé API Unsplash (gratuit):');
    console.log('   1. Créez un compte sur https://unsplash.com/developers');
    console.log('   2. Créez une nouvelle application (Demo tier = 50 req/h)');
    console.log('   3. Copiez votre "Access Key"\n');
    console.log('💡 Ensuite lancez:');
    console.log('   UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-blog-images.cjs\n');
    process.exit(1);
  }
  
  if (DRY_RUN) {
    console.log('🔍 MODE DRY RUN activé (aucun téléchargement réel)\n');
  }
  
  const totalImages = VILLES.length * (BLOG_PILIERS.length + VILLE_COVERS.length);
  console.log(`📊 Total: ${totalImages} images à traiter\n`);
  console.log(`   - ${VILLES.length} villes × ${BLOG_PILIERS.length} piliers = ${VILLES.length * BLOG_PILIERS.length} images pilier`);
  console.log(`   - ${VILLES.length} villes × ${VILLE_COVERS.length} covers = ${VILLES.length * VILLE_COVERS.length} images cover\n`);
  
  // Traiter chaque ville
  for (const ville of VILLES) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🏙️  ${ville.toUpperCase()}`);
    console.log('='.repeat(60));
    
    // Images des piliers (10 par ville)
    console.log('\n📚 Piliers de blog:');
    for (const pilier of BLOG_PILIERS) {
      await processBlogImage(ville, pilier);
    }
    
    // Images de couverture spécifiques (3 par ville)
    console.log('\n🎨 Covers spécifiques:');
    for (const cover of VILLE_COVERS) {
      await processBlogImage(ville, cover);
    }
  }
  
  // Résumé final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ FINAL');
  console.log('='.repeat(60));
  console.log(`Total traité:     ${stats.total}`);
  console.log(`✅ Succès:        ${stats.success}`);
  console.log(`❌ Échecs:        ${stats.failed}`);
  console.log(`⏭️  Déjà présentes: ${stats.skipped}`);
  console.log('');
  
  if (stats.success > 0 && !DRY_RUN) {
    console.log('📝 Les attributions ont été enregistrées dans chaque dossier:');
    console.log('   sites/[ville]/public/images/blog/ATTRIBUTIONS.txt\n');
  }
  
  if (stats.failed > 0) {
    console.log('⚠️  Certaines images n\'ont pas pu être téléchargées.');
    console.log('   Vous pouvez relancer le script, il skippe les images existantes.\n');
  }
}

// Lancer le script
main().catch(err => {
  console.error('💥 Erreur fatale:', err);
  process.exit(1);
});
