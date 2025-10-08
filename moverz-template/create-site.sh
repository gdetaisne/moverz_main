#!/bin/bash

# Script de création rapide de site
# Usage: ./create-site.sh <city-name> <domain>

set -e

CITY_NAME="$1"
DOMAIN="$2"

if [ -z "$CITY_NAME" ] || [ -z "$DOMAIN" ]; then
    echo "❌ Usage: ./create-site.sh <city-name> <domain>"
    echo "📝 Exemple: ./create-site.sh Lyon https://www.lyon-demenageur.fr"
    exit 1
fi

CITY_SLUG=$(echo "$CITY_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')

echo "🚀 Création du site pour $CITY_NAME..."
echo "📁 Slug: $CITY_SLUG"
echo "🌐 Domaine: $DOMAIN"

# 1. Créer le fichier de données
echo "📝 Création du fichier de données..."
cat > "data/$CITY_SLUG.json" << EOF
{
  "city_name": "$CITY_NAME",
  "citySlug": "$CITY_SLUG",
  "region": "Région à définir",
  "zipCodes": "XXXXX-YYYYY",
  "meta_title": "Déménagement $CITY_NAME | Devis Gratuit | Meilleurs Déménageurs",
  "meta_description": "Déménagement professionnel à $CITY_NAME. Devis gratuit, déménageurs vérifiés, service de qualité.",
  "keywords": "déménagement $CITY_SLUG, déménageur $CITY_SLUG, déménagement pas cher $CITY_SLUG",
  "contactEmail": "contact@$CITY_SLUG-demenageur.fr",
  "contactPhone": "0X XX XX XX XX",
  "domain": "$DOMAIN",
  "googleVerification": "YOUR_GOOGLE_VERIFICATION_CODE",
  "hero_title": "Préparez votre déménagement à $CITY_NAME en 30 minutes → recevez 5 devis précis gratuitement sous 7 jours",
  "hero_subtitle": "Votre dossier complet, sans stress. Estimation fiable, prix transparents, partenaires de confiance à $CITY_NAME.",
  "stats": {
    "clients": "1000+",
    "rating": "4.9"
  },
  "pricing": {
    "studio": "300-600€",
    "t2": "500-900€",
    "t3": "700-1200€",
    "t4": "900-1500€"
  },
  "contraintes": "Contraintes spécifiques à $CITY_NAME à définir.",
  "quartiers": [
    {
      "nom": "Quartier 1",
      "slug": "quartier-1",
      "description": "Description du quartier 1 à $CITY_NAME.",
      "contraintes": "Contraintes spécifiques au quartier 1.",
      "stats": {
        "dossiers": "150+",
        "demenageurs": "10+",
        "delai": "5 jours"
      }
    },
    {
      "nom": "Quartier 2", 
      "slug": "quartier-2",
      "description": "Description du quartier 2 à $CITY_NAME.",
      "contraintes": "Contraintes spécifiques au quartier 2.",
      "stats": {
        "dossiers": "120+",
        "demenageurs": "8+",
        "delai": "6 jours"
      }
    },
    {
      "nom": "Quartier 3",
      "slug": "quartier-3", 
      "description": "Description du quartier 3 à $CITY_NAME.",
      "contraintes": "Contraintes spécifiques au quartier 3.",
      "stats": {
        "dossiers": "100+",
        "demenageurs": "7+",
        "delai": "7 jours"
      }
    },
    {
      "nom": "Quartier 4",
      "slug": "quartier-4",
      "description": "Description du quartier 4 à $CITY_NAME.",
      "contraintes": "Contraintes spécifiques au quartier 4.",
      "stats": {
        "dossiers": "90+",
        "demenageurs": "6+",
        "delai": "8 jours"
      }
    },
    {
      "nom": "Quartier 5",
      "slug": "quartier-5",
      "description": "Description du quartier 5 à $CITY_NAME.",
      "contraintes": "Contraintes spécifiques au quartier 5.",
      "stats": {
        "dossiers": "80+",
        "demenageurs": "5+",
        "delai": "9 jours"
      }
    }
  ],
  "destinations": [
    {
      "nom": "Paris",
      "slug": "$CITY_SLUG-vers-paris",
      "distance": "500 km",
      "duree": "5-7h",
      "prix_moyen": "800-1500€"
    },
    {
      "nom": "Lyon",
      "slug": "$CITY_SLUG-vers-lyon", 
      "distance": "300 km",
      "duree": "3-4h",
      "prix_moyen": "600-1200€"
    }
  ],
  "partners": [
    {
      "name": "Déménageurs $CITY_NAME Express",
      "description": "Spécialistes du déménagement rapide à $CITY_NAME.",
      "logo": "/images/partners/partner1.png"
    }
  ],
  "blog": {
    "categories": [
      "Conseils Déménagement $CITY_NAME",
      "Vie à $CITY_NAME", 
      "Actualités Déménagement"
    ],
    "pillars": [
      {
        "title": "Guide complet pour déménager à $CITY_NAME",
        "slug": "guide-demenagement-$CITY_SLUG"
      }
    ]
  }
}
EOF

echo "✅ Fichier de données créé: data/$CITY_SLUG.json"

# 2. Générer le site
echo "🔨 Génération du site..."
node scripts/generate-site-handlebars.js "$CITY_SLUG"

echo ""
echo "🎉 Site créé avec succès !"
echo "📁 Dossier: ../sites/$CITY_SLUG"
echo "🌐 URL: $DOMAIN"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Personnaliser les données dans data/$CITY_SLUG.json"
echo "2. Ajouter des images spécifiques à $CITY_NAME"
echo "3. Générer le contenu du blog"
echo "4. Tester le site: cd ../sites/$CITY_SLUG && npm run dev"

