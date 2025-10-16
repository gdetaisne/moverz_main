#!/usr/bin/env node

/**
 * 📸 Script automatisé de téléchargement d'images Unsplash
 * Pour les pages quartiers des 11 sites Moverz
 * 
 * Usage:
 *   UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-quartiers-images.js
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

// Mapping complet des quartiers par ville
const QUARTIERS_MAP = {
  lille: [
    { filename: 'centre.jpg', query: 'Lille Grand Place France architecture' },
    { filename: 'lomme.jpg', query: 'Lomme Lille residential France' },
    { filename: 'moulins.jpg', query: 'Moulins Lille street France' },
    { filename: 'vieux-lille.jpg', query: 'Vieux Lille old town cobblestone' },
    { filename: 'wazemmes.jpg', query: 'Wazemmes Lille market street France' }
  ],
  lyon: [
    { filename: 'confluence.jpg', query: 'Confluence Lyon modern architecture' },
    { filename: 'croix-rousse.jpg', query: 'Croix Rousse Lyon street stairs' },
    { filename: 'part-dieu.jpg', query: 'Part Dieu Lyon business district' },
    { filename: 'presquile.jpg', query: 'Presqu ile Lyon place Bellecour' },
    { filename: 'vieux-lyon.jpg', query: 'Vieux Lyon medieval architecture' }
  ],
  marseille: [
    { filename: 'endoume.jpg', query: 'Endoume Marseille residential sea' },
    { filename: 'joliette.jpg', query: 'Joliette Marseille port modern' },
    { filename: 'panier.jpg', query: 'Le Panier Marseille colorful street' },
    { filename: 'plaine.jpg', query: 'La Plaine Marseille market street' },
    { filename: 'vieux-port.jpg', query: 'Vieux Port Marseille harbor boats' }
  ],
  montpellier: [
    { filename: 'antigone.jpg', query: 'Antigone Montpellier neoclassical architecture' },
    { filename: 'beaux-arts.jpg', query: 'Beaux Arts Montpellier street France' },
    { filename: 'comedie.jpg', query: 'Place Comedie Montpellier fountain' },
    { filename: 'ecusson.jpg', query: 'Ecusson Montpellier old town medieval' },
    { filename: 'port-marianne.jpg', query: 'Port Marianne Montpellier modern architecture' }
  ],
  nantes: [
    { filename: 'beaulieu.jpg', query: 'Beaulieu Nantes residential France' },
    { filename: 'centre-ville.jpg', query: 'Nantes city center Place Royale' },
    { filename: 'dervallieres.jpg', query: 'Dervallieres Nantes neighborhood France' },
    { filename: 'ile-nantes.jpg', query: 'Ile de Nantes modern architecture' },
    { filename: 'malakoff.jpg', query: 'Malakoff Nantes street France' }
  ],
  nice: [
    { filename: 'cimiez.jpg', query: 'Cimiez Nice hill panorama' },
    { filename: 'liberation.jpg', query: 'Liberation Nice avenue France' },
    { filename: 'port.jpg', query: 'Port Nice harbor boats France' },
    { filename: 'promenade-anglais.jpg', query: 'Promenade des Anglais Nice beach' },
    { filename: 'vieux-nice.jpg', query: 'Vieux Nice old town colorful' }
  ],
  rennes: [
    { filename: 'beaulieu.jpg', query: 'Beaulieu Rennes university campus France' },
    { filename: 'centre-ville.jpg', query: 'Rennes city center Place du Parlement' },
    { filename: 'cleunay.jpg', query: 'Cleunay Rennes residential France' },
    { filename: 'thabor.jpg', query: 'Thabor Rennes park garden France' },
    { filename: 'villejean.jpg', query: 'Villejean Rennes neighborhood France' }
  ],
  rouen: [
    { filename: 'centre-ville.jpg', query: 'Rouen city center cathedral gothic' },
    { filename: 'coteaux-sud.jpg', query: 'Coteaux Sud Rouen residential France' },
    { filename: 'joli-mai.jpg', query: 'Joli Mai Rouen neighborhood France' },
    { filename: 'saint-marc.jpg', query: 'Saint Marc Rouen street France' },
    { filename: 'saint-sever.jpg', query: 'Saint Sever Rouen district France' }
  ],
  strasbourg: [
    { filename: 'cronenbourg.jpg', query: 'Cronenbourg Strasbourg residential France' },
    { filename: 'esplanade.jpg', query: 'Esplanade Strasbourg university France' },
    { filename: 'grande-ile.jpg', query: 'Grande Ile Strasbourg cathedral medieval' },
    { filename: 'hautepierre.jpg', query: 'Hautepierre Strasbourg neighborhood France' },
    { filename: 'neudorf.jpg', query: 'Neudorf Strasbourg district France' }
  ],
  toulouse: [
    { filename: 'capitole.jpg', query: 'Place du Capitole Toulouse pink city' },
    { filename: 'carmes.jpg', query: 'Carmes Toulouse market street France' },
    { filename: 'compans.jpg', query: 'Compans Caffarelli Toulouse park France' },
    { filename: 'jean-jaures.jpg', query: 'Jean Jaures Toulouse avenue France' },
    { filename: 'saint-cyprien.jpg', query: 'Saint Cyprien Toulouse Garonne France' }
  ]
};

// Fallback: recherches génériques si pas de résultats
const FALLBACK_QUERIES = {
  lille: 'Lille France architecture street',
  lyon: 'Lyon France architecture Rhone',
  marseille: 'Marseille France Mediterranean architecture',
  montpellier: 'Montpellier France architecture',
  nantes: 'Nantes France architecture Loire',
  nice: 'Nice France Cote Azur architecture',
  rennes: 'Rennes France Bretagne architecture',
  rouen: 'Rouen France Normandy architecture',
  strasbourg: 'Strasbourg France Alsace architecture',
  toulouse: 'Toulouse France pink city architecture'
};

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
 * Traite un quartier
 */
async function processQuartier(ville, quartier) {
  stats.total++;
  
  const outputDir = path.join(BASE_DIR, 'sites', ville, 'public', 'images', 'quartiers', ville);
  const outputPath = path.join(outputDir, quartier.filename);
  
  // Vérifier si l'image existe déjà
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  [${ville}/${quartier.filename}] Déjà présente, skip`);
    stats.skipped++;
    return;
  }
  
  console.log(`🔍 [${ville}/${quartier.filename}] Recherche: "${quartier.query}"...`);
  
  try {
    // Rechercher la photo
    const photo = await searchUnsplashPhoto(quartier.query);
    
    if (!photo) {
      console.log(`❌ [${ville}/${quartier.filename}] Aucun résultat trouvé`);
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
    
    console.log(`✅ [${ville}/${quartier.filename}] Téléchargé avec succès`);
    console.log(`   📸 By ${photo.author} - ${photo.photoUrl}`);
    
    stats.success++;
    
    // Enregistrer les attributions
    const attributionPath = path.join(outputDir, 'ATTRIBUTIONS.txt');
    const attribution = `${quartier.filename}\n  Photo by ${photo.author} (${photo.authorUrl})\n  ${photo.photoUrl}\n  via Unsplash\n\n`;
    fs.appendFileSync(attributionPath, attribution);
    
  } catch (err) {
    console.error(`❌ [${ville}/${quartier.filename}] Erreur: ${err.message}`);
    stats.failed++;
  }
  
  // Délai pour respecter rate limits (50 req/h = 1 req toutes les 72s, on prend 2s pour être safe)
  await delay(2000);
}

/**
 * Main
 */
async function main() {
  console.log('🚀 Téléchargement automatique des images de quartiers Moverz\n');
  
  // Vérifier la clé API
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('❌ ERREUR: Variable UNSPLASH_ACCESS_KEY manquante\n');
    console.log('📋 Pour obtenir votre clé API Unsplash (gratuit):');
    console.log('   1. Créez un compte sur https://unsplash.com/developers');
    console.log('   2. Créez une nouvelle application (Demo tier = 50 req/h)');
    console.log('   3. Copiez votre "Access Key"\n');
    console.log('💡 Ensuite lancez:');
    console.log('   UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-quartiers-images.js\n');
    console.log('   Ou créez un fichier .env à la racine avec:');
    console.log('   UNSPLASH_ACCESS_KEY=votre_clé\n');
    process.exit(1);
  }
  
  if (DRY_RUN) {
    console.log('🔍 MODE DRY RUN activé (aucun téléchargement réel)\n');
  }
  
  console.log(`📊 Total: ${Object.values(QUARTIERS_MAP).flat().length} images à traiter\n`);
  
  // Traiter chaque ville
  for (const [ville, quartiers] of Object.entries(QUARTIERS_MAP)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🏙️  ${ville.toUpperCase()} (${quartiers.length} quartiers)`);
    console.log('='.repeat(60));
    
    for (const quartier of quartiers) {
      await processQuartier(ville, quartier);
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
    console.log('   sites/[ville]/public/images/quartiers/[ville]/ATTRIBUTIONS.txt\n');
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

