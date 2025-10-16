#!/usr/bin/env node

/**
 * 🏘️ Script d'optimisation des alt-text des images de quartiers
 * Pour le SEO local et l'accessibilité
 * 
 * Usage:
 *   node scripts/optimize-quartiers-alt-text.cjs
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');

// Mapping des quartiers par ville avec leurs alt-text optimisés
const QUARTIERS_ALT_TEXT = {
  lille: {
    'centre.jpg': 'Centre Lille déménagement - Grand Place, circulation dense, parkings payants, accès camion',
    'lomme.jpg': 'Lomme Lille déménagement - Quartier résidentiel, accès facilité, parkings disponibles',
    'moulins.jpg': 'Moulins Lille déménagement - Zone résidentielle, rues larges, stationnement aisé',
    'vieux-lille.jpg': 'Vieux Lille déménagement - Centre historique, rues pavées, contraintes d\'accès',
    'wazemmes.jpg': 'Wazemmes Lille déménagement - Marché, quartier populaire, circulation modérée'
  },
  lyon: {
    'confluence.jpg': 'Confluence Lyon déménagement - Quartier moderne, architecture contemporaine, accès facilité',
    'croix-rousse.jpg': 'Croix Rousse Lyon déménagement - Colline, escaliers, contraintes d\'accès, pentes',
    'part-dieu.jpg': 'Part Dieu Lyon déménagement - Quartier d\'affaires, gare, accès excellent',
    'presquile.jpg': 'Presqu\'île Lyon déménagement - Centre-ville, place Bellecour, circulation dense',
    'vieux-lyon.jpg': 'Vieux Lyon déménagement - Centre historique, traboules, rues étroites, contraintes'
  },
  marseille: {
    'endoume.jpg': 'Endoume Marseille déménagement - Quartier résidentiel, vue mer, accès modéré',
    'joliette.jpg': 'Joliette Marseille déménagement - Port moderne, zone industrielle, accès excellent',
    'panier.jpg': 'Le Panier Marseille déménagement - Vieux quartier, rues colorées, contraintes d\'accès',
    'plaine.jpg': 'La Plaine Marseille déménagement - Marché, quartier populaire, circulation modérée',
    'vieux-port.jpg': 'Vieux Port Marseille déménagement - Port historique, circulation dense, parkings payants'
  },
  montpellier: {
    'antigone.jpg': 'Antigone Montpellier déménagement - Architecture néoclassique, zone moderne, accès excellent',
    'beaux-arts.jpg': 'Beaux Arts Montpellier déménagement - Quartier culturel, rues commerçantes, circulation modérée',
    'comedie.jpg': 'Place Comédie Montpellier déménagement - Centre-ville, fontaine, circulation dense',
    'ecusson.jpg': 'Écusson Montpellier déménagement - Vieux centre, rues médiévales, contraintes d\'accès',
    'port-marianne.jpg': 'Port Marianne Montpellier déménagement - Quartier moderne, architecture contemporaine, accès facilité'
  },
  nantes: {
    'beaulieu.jpg': 'Beaulieu Nantes déménagement - Quartier résidentiel, université, accès facilité',
    'centre-ville.jpg': 'Centre-ville Nantes déménagement - Place Royale, circulation dense, parkings payants',
    'dervallieres.jpg': 'Dervallières Nantes déménagement - Quartier populaire, rues étroites, contraintes modérées',
    'ile-nantes.jpg': 'Île de Nantes déménagement - Quartier moderne, architecture contemporaine, accès excellent',
    'malakoff.jpg': 'Malakoff Nantes déménagement - Zone résidentielle, rues larges, stationnement aisé'
  },
  nice: {
    'cimiez.jpg': 'Cimiez Nice déménagement - Colline, panorama, contraintes d\'accès, pentes',
    'liberation.jpg': 'Libération Nice déménagement - Avenue commerçante, circulation dense, parkings payants',
    'port.jpg': 'Port Nice déménagement - Port de plaisance, circulation modérée, accès facilité',
    'promenade-anglais.jpg': 'Promenade des Anglais Nice déménagement - Front de mer, circulation dense, contraintes',
    'vieux-nice.jpg': 'Vieux Nice déménagement - Centre historique, rues étroites, contraintes d\'accès'
  },
  rennes: {
    'beaulieu.jpg': 'Beaulieu Rennes déménagement - Campus universitaire, zone résidentielle, accès excellent',
    'centre-ville.jpg': 'Centre-ville Rennes déménagement - Place du Parlement, circulation dense, parkings payants',
    'cleunay.jpg': 'Cléunay Rennes déménagement - Quartier résidentiel, rues larges, stationnement aisé',
    'thabor.jpg': 'Thabor Rennes déménagement - Parc, quartier calme, circulation modérée, accès facilité',
    'villejean.jpg': 'Villejean Rennes déménagement - Zone résidentielle, université, accès excellent'
  },
  rouen: {
    'centre-ville.jpg': 'Centre-ville Rouen déménagement - Cathédrale, centre historique, contraintes d\'accès',
    'coteaux-sud.jpg': 'Coteaux Sud Rouen déménagement - Quartier résidentiel, pentes, contraintes modérées',
    'joli-mai.jpg': 'Joli Mai Rouen déménagement - Zone résidentielle, rues larges, stationnement aisé',
    'saint-marc.jpg': 'Saint Marc Rouen déménagement - Quartier populaire, circulation dense, parkings payants',
    'saint-sever.jpg': 'Saint Sever Rouen déménagement - Zone résidentielle, accès facilité, stationnement aisé'
  },
  strasbourg: {
    'cronenbourg.jpg': 'Cronenbourg Strasbourg déménagement - Quartier résidentiel, zone périphérique, accès excellent',
    'esplanade.jpg': 'Esplanade Strasbourg déménagement - Campus universitaire, zone moderne, accès facilité',
    'grande-ile.jpg': 'Grande Île Strasbourg déménagement - Centre historique, cathédrale, contraintes d\'accès',
    'hautepierre.jpg': 'Hautepierre Strasbourg déménagement - Zone résidentielle, architecture moderne, accès excellent',
    'neudorf.jpg': 'Neudorf Strasbourg déménagement - Quartier populaire, circulation modérée, stationnement aisé'
  },
  toulouse: {
    'capitole.jpg': 'Capitole Toulouse déménagement - Place du Capitole, centre-ville, circulation dense',
    'carmes.jpg': 'Carmes Toulouse déménagement - Marché, quartier commerçant, circulation modérée',
    'compans.jpg': 'Compans Caffarelli Toulouse déménagement - Parc, zone résidentielle, accès excellent',
    'jean-jaures.jpg': 'Jean Jaurès Toulouse déménagement - Avenue commerçante, circulation dense, parkings payants',
    'saint-cyprien.jpg': 'Saint Cyprien Toulouse déménagement - Rive Garonne, quartier populaire, accès modéré'
  }
};

// Statistiques
const stats = {
  total: 0,
  success: 0,
  failed: 0
};

/**
 * Optimise les alt-text des images de quartiers
 */
async function optimizeQuartiersAltText() {
  console.log('🏘️ Optimisation des alt-text des images de quartiers\n');
  
  for (const [ville, quartiers] of Object.entries(QUARTIERS_ALT_TEXT)) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`🏙️  ${ville.toUpperCase()}`);
    console.log('='.repeat(50));
    
    for (const [filename, altText] of Object.entries(quartiers)) {
      stats.total++;
      
      const imagePath = path.join(BASE_DIR, 'sites', ville, 'public', 'images', 'quartiers', ville, filename);
      const metadataPath = path.join(BASE_DIR, 'sites', ville, 'public', 'images', 'quartiers', ville, filename.replace('.jpg', '-metadata.json'));
      
      try {
        // Vérifier si l'image existe
        if (!fs.existsSync(imagePath)) {
          console.log(`⚠️  [${ville}/${filename}] Image non trouvée, skip`);
          stats.failed++;
          continue;
        }
        
        // Créer les métadonnées SEO
        const metadata = {
          filename: filename,
          ville: ville,
          altText: altText,
          description: `Image du quartier ${filename.replace('.jpg', '')} à ${ville}`,
          keywords: [
            `déménagement ${ville}`,
            `déménageur ${ville}`,
            `quartier ${filename.replace('.jpg', '')} ${ville}`,
            ville,
            'déménagement',
            'déménageur',
            'quartier',
            'accès camion',
            'stationnement'
          ],
          seoOptimized: true,
          localSeo: true,
          accessibility: true
        };
        
        // Sauvegarder les métadonnées
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        
        // Mettre à jour le fichier d'attributions
        const attributionPath = path.join(BASE_DIR, 'sites', ville, 'public', 'images', 'quartiers', ville, 'ATTRIBUTIONS.txt');
        let attributionContent = '';
        
        if (fs.existsSync(attributionPath)) {
          attributionContent = fs.readFileSync(attributionPath, 'utf8');
        }
        
        // Ajouter l'alt-text SEO à la fin du fichier d'attributions
        if (!attributionContent.includes(`Alt-text SEO: ${altText}`)) {
          const seoInfo = `\n\n=== SEO OPTIMIZATION ===\n${filename}\n  Alt-text SEO: ${altText}\n  Keywords: ${metadata.keywords.join(', ')}\n  Local SEO: Optimized for "${ville}"\n`;
          fs.appendFileSync(attributionPath, seoInfo);
        }
        
        console.log(`✅ [${ville}/${filename}] Alt-text optimisé`);
        console.log(`   📝 "${altText}"`);
        
        stats.success++;
        
      } catch (err) {
        console.error(`❌ [${ville}/${filename}] Erreur: ${err.message}`);
        stats.failed++;
      }
    }
  }
  
  // Résumé final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ FINAL');
  console.log('='.repeat(60));
  console.log(`Total traité:     ${stats.total}`);
  console.log(`✅ Succès:        ${stats.success}`);
  console.log(`❌ Échecs:        ${stats.failed}`);
  console.log('');
  
  if (stats.success > 0) {
    console.log('📝 Les métadonnées SEO ont été créées:');
    console.log('   sites/[ville]/public/images/quartiers/[ville]/*-metadata.json\n');
    console.log('📝 Les alt-text SEO ont été ajoutés aux attributions:');
    console.log('   sites/[ville]/public/images/quartiers/[ville]/ATTRIBUTIONS.txt\n');
  }
}

// Lancer le script
optimizeQuartiersAltText().catch(err => {
  console.error('💥 Erreur fatale:', err);
  process.exit(1);
});
