# URLs Production - 11 Sites Moverz

Source de vérité pour les URLs de prod. **Ne jamais inventer les URLs, toujours se référer à ce fichier.**

## Liste des Sites

- **Marseille** : https://devis-demenageur-marseille.fr/
- **Lyon** : https://devis-demenageur-lyon.fr/
- **Montpellier** : https://devis-demenageur-montpellier.fr/
- **Bordeaux** : https://www.bordeaux-demenageur.fr/
- **Nantes** : https://devis-demenageur-nantes.fr/
- **Lille** : https://devis-demenageur-lille.fr/
- **Nice** : https://devis-demenageur-nice.fr/
- **Strasbourg** : https://devis-demenageur-strasbourg.fr/
- **Rouen** : https://devis-demenageur-rouen.fr/
- **Rennes** : https://devis-demenageur-rennes.fr/
- **Toulouse** : https://devis-demenageur-toulousain.fr/

## Source

Ces URLs sont extraites de `sites/{ville}/.caproverenv` (variable `SITE_URL`).

## Usage

Avant de tester un site en prod, **toujours vérifier ce fichier** pour avoir l'URL exacte.

**Patterns URL** :
- Majorité : `devis-demenageur-{ville}.fr`
- Exceptions : 
  - Bordeaux : `www.bordeaux-demenageur.fr` (www + inversion)
  - Toulouse : `devis-demenageur-toulousain.fr` (adjectif)

---

*Dernière mise à jour* : 05/11/2025
