// Script pour générer les redirections des satellites
const fs = require('fs');

// Liste des URLs 404 depuis Search Console
const urls404 = [
  "demenagement-pas-cher-top-10-astuces",
  "transfert-materiel-informatique-entreprise",
  "prix-demenagement-saison",
  "stockage-pendant-demenagement-duree",
  "demenagement-basse-saison-economie",
  "formalites-administratives-demenagement-entreprise",
  "choisir-demenageur-10-criteres",
  "location-camion-pas-cher-astuces",
  "garde-meuble-securise-surveillance",
  "groupage-demenagement-partage-couts",
  "main-oeuvre-demenagement-location",
  "changement-adresse-demarches-demenagement",
  "prix-demenagement-international-2025",
  "demenagement-m3-calcul-tarif",
  "petit-demenagement-studio-t1",
  "aide-emballage-demenagement",
  "delais-demenagement-international",
  "materiel-demenagement-pas-cher-location",
  "aide-demenagement-personnes-agees",
  "livraison-meuble-occasion-leboncoin",
  "prix-demenagement-longue-distance-paris",
  "formule-economique-vs-standard-demenagement",
  "assurance-garde-meuble-obligatoire",
  "demenagement-dimanche-surcout",
  "demenageur-vieux-acces-difficiles",
  "demenagement-urgence-express",
  "prix-demenagement-garde-meuble",
  "transport-meubles-sans-demenageur",
  "prix-location-camion-20m3",
  "protection-piano-transport-materiaux",
  "demenagement-industrie-machines",
  "garde-meuble-etudiant-pas-cher",
  "porteurs-pro-vs-amis-demenagement",
  "stockage-piano-demenagement-temporaire",
  "tarifs-petit-demenagement-volume",
  "location-camion-aller-simple-paris",
  "demenagement-usa-formalites",
  "transport-conteneur-demenagement-international",
  "garde-meuble-court-terme-long-terme",
  "demenagement-piano-prix",
  "diy-demenagement-budget-mini",
  "demenagement-chambre-etudiant",
  "quelle-taille-box-t2-t3",
  "reassurance-piano-apres-demenagement",
  "demenagement-bureaux-weekend",
  "demenagement-europe-belgique-allemagne",
  "accordage-piano-apres-demenagement",
  "demenagement-londres-post-brexit",
  "permis-b-camion-demenagement-limites",
  "economiser-prix-demenagement-astuces",
  "demenageur-monte-meuble-quand-necessaire",
  "formule-economique-cle-en-main",
  "duree-minimum-garde-meuble",
  "assurance-piano-demenagement",
  "desencombrement-avant-demenagement-economie",
  "prix-demenagement-t2-detaille",
  "agences-location-camion-comparatif",
  "self-stockage-vs-garde-meuble",
  "conduire-camion-demenagement-conseils",
  "piano-vieux-acces-difficiles",
  "demenagement-bureaux-nuit",
  "demenagement-forfait-horaire",
  "cartons-gratuits-recuperer",
  "formalites-douanieres-demenagement-international",
  "prix-demenageur-2025-volume",
  "aides-financieres-demenagement",
  "stockage-temporaire-demenagement-international",
  "checklist-complete-demenagement-entreprise",
  "services-complementaires-demenagement",
  "portage-cartons-escaliers",
  "prix-demenagement-studio-2025",
  "piano-droit-queue-transport-differences",
  "demenagement-salle-serveurs-datacenter",
  "monte-piano-specialiste",
  "devis-demenagement-obtenir-comparer",
  "porteurs-heure-demenagement",
  "assurance-demenagement-entreprise",
  "pourboire-demenageurs-usages",
  "specialistes-piano",
  "demenagement-locaux-commerciaux",
  "demenagement-piano-etage-monte-charge",
  "demenagement-handicap-accessibilite",
  "demenagement-archives-entreprise",
  "demenagement-colocation-chambre",
  "facteurs-prix-demenagement",
  "autorisation-stationnement-demenagement",
  "demenageur-low-cost-risques-eviter",
  "assurance-demenageur-couverture",
  "demenagement-senior-downsizing",
  "acces-247-self-stockage",
  "aide-demenagement-particuliers",
  "prix-garde-meuble-2025",
  "location-camion-vs-demenageur",
  "surcouts-caches-demenagement",
  "carburant-peage-location-camion",
  "quel-volume-camion-t2-t3"
];

// Vérifier quels fichiers existent avec -lille
const existingSatellites = fs.readdirSync('content/blog/satellites')
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace('.md', ''));

const redirects = [];

urls404.forEach(url => {
  // Chercher si version avec -lille existe
  const withLille = `${url}-lille`;
  if (existingSatellites.includes(withLille)) {
    redirects.push({
      source: `/blog/satellites/${url}`,
      destination: `/blog/satellites/${withLille}`,
      permanent: true
    });
  } else if (existingSatellites.includes(url)) {
    // Le fichier existe sans -lille
    console.log(`✓ Exists: ${url}`);
  } else {
    console.log(`✗ Missing: ${url} (and ${withLille})`);
  }
});

console.log(`\n📊 Generated ${redirects.length} redirects`);
console.log(JSON.stringify(redirects, null, 2));
