#!/bin/bash

# Script pour corriger les liens 404 vers les piliers correspondants
# Usage: ./fix-404-links.sh

echo "🔧 Correction des liens 404 vers les piliers correspondants..."

# Fonction pour corriger les liens dans un fichier
fix_links_in_file() {
    local file="$1"
    local site="$2"
    
    echo "Vérification de $file"
    
    # Liste des articles satellites qui existent réellement
    local existing_articles=$(find "sites/$site/content/blog/satellites" -name "*.md" 2>/dev/null | sed 's|.*/||' | sed 's|\.md$||')
    
    # Pour chaque lien dans le fichier, vérifier s'il existe
    while IFS= read -r line; do
        if [[ $line =~ \[.*\]\(/blog/([^)]+)\) ]]; then
            local link_path="${BASH_REMATCH[1]}"
            local article_name=$(basename "$link_path")
            
            # Vérifier si l'article existe
            if ! echo "$existing_articles" | grep -q "^$article_name$"; then
                echo "  ❌ Lien cassé trouvé: $link_path"
                
                # Déterminer le pilier correspondant basé sur la catégorie
                local category=$(echo "$link_path" | cut -d'/' -f1)
                local pilier_slug=""
                
                case "$category" in
                    "garde-meuble-*")
                        pilier_slug="garde-meuble-$site-guide-complet"
                        ;;
                    "demenagement-etudiant-*")
                        pilier_slug="demenagement-etudiant-$site-guide-complet"
                        ;;
                    "demenagement-entreprise-*")
                        pilier_slug="demenagement-entreprise-$site-guide-complet"
                        ;;
                    "demenagement-piano-*")
                        pilier_slug="demenagement-piano-$site-guide-complet"
                        ;;
                    "demenagement-international-*")
                        pilier_slug="demenagement-international-$site-guide-complet"
                        ;;
                    "demenagement-pas-cher-*")
                        pilier_slug="demenagement-pas-cher-$site-guide-complet"
                        ;;
                    "prix-demenagement-*")
                        pilier_slug="prix-demenagement-$site-guide-complet"
                        ;;
                    "aide-demenagement-*")
                        pilier_slug="aide-demenagement-$site-guide-complet"
                        ;;
                    "location-camion-*")
                        pilier_slug="location-camion-demenagement-$site-guide-complet"
                        ;;
                    "petit-demenagement-*")
                        pilier_slug="petit-demenagement-$site-guide-complet"
                        ;;
                    *)
                        pilier_slug="demenagement-$site-guide-complet"
                        ;;
                esac
                
                # Remplacer le lien cassé par le lien vers le pilier
                local new_link="/blog/$category/$pilier_slug"
                sed -i "s|\[.*\](.*$link_path.*)|[Guide complet](/blog/$category/$pilier_slug)|g" "$file"
                echo "  ✅ Lien corrigé vers: $new_link"
            fi
        fi
    done < "$file"
}

# Traiter tous les sites
for site in bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse; do
    if [ -d "sites/$site/content/blog" ]; then
        echo "📁 Traitement du site $site..."
        
        # Trouver tous les fichiers markdown avec des liens /blog/
        find "sites/$site/content/blog" -name "*.md" -exec grep -l "/blog/" {} \; | while read -r file; do
            fix_links_in_file "$file" "$site"
        done
    fi
done

echo "✅ Correction terminée !"
