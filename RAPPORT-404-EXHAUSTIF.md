# 📊 RAPPORT EXHAUSTIF DES 404 - PROJET MOVERZ
Date: 29/10/2025 06:03:54

---

## 📈 SYNTHÈSE EXÉCUTIVE

### Chiffres Globaux
- **Total de liens cassés**: 2 970
- **Total d'articles**: 1 047
- **Taux d'erreur moyen**: 283.7% par article

### Répartition par Ville

| Ville | Articles | Liens cassés | Fichiers affectés | Taux |
|-------|----------|--------------|-------------------|------|
| marseille    |       70 |          173 |                54 | 247.1% |
| toulouse     |       93 |          172 |                82 | 184.9% |
| lyon         |       99 |          467 |                89 | 471.7% |
| bordeaux     |      102 |          230 |                86 | 225.5% |
| nantes       |      151 |          299 |                70 | 198.0% |
| lille        |      111 |          401 |               101 | 361.3% |
| nice         |      119 |          355 |                98 | 298.3% |
| strasbourg   |       38 |          124 |                32 | 326.3% |
| rouen        |       37 |          179 |                26 | 483.8% |
| rennes       |      113 |          332 |                92 | 293.8% |
| montpellier  |      114 |          238 |               111 | 208.8% |


---

## 🏷️ CATÉGORISATION DES PROBLÈMES

### 1. SLUGS INCORRECTS (188 erreurs)

**Description**: Liens qui ne suivent pas le bon format d'URL
- Format invalide
- Manque de catégorie ou slug
- Structure d'URL incorrecte

**Exemples**:
- [toulouse] `/blog/demenagement-international-toulouse`
  - Texte: "guide complet déménagement international Toulouse"
  - Source: assurance-demenagement-international-toulouse.md:14

- [toulouse] `/blog/demenagement-international-toulouse`
  - Texte: "dossier déménagement international Toulouse"
  - Source: assurance-demenagement-international-toulouse.md:32

- [toulouse] `/blog/demenagement-international-toulouse`
  - Texte: "solutions de déménagement international à Toulouse"
  - Source: assurance-demenagement-international-toulouse.md:167

- [toulouse] `/blog/garde-meuble-toulouse`
  - Texte: "guide complet garde-meuble Toulouse"
  - Source: box-stockage-toulouse.md:16

- [toulouse] `/blog/demenagement-pas-cher-toulouse`
  - Texte: "guide complet déménagement pas cher Toulouse"
  - Source: cartons-pas-chers-demenagement-pas-cher-toulouse.md:16

- [toulouse] `/blog/demenageur-toulouse`
  - Texte: "guide déménageur Toulouse"
  - Source: demenagement-ascenseur-toulouse.md:16

- [toulouse] `/blog/demenageur-toulouse`
  - Texte: "guide complet déménageur Toulouse"
  - Source: demenagement-assurance-toulouse.md:16

- [toulouse] `/blog/demenageur-toulouse`
  - Texte: "guide déménageur Toulouse"
  - Source: demenagement-avion-toulouse.md:16

- [toulouse] `/blog/demenageur-toulouse`
  - Texte: "guide complet déménageur Toulouse"
  - Source: demenagement-avis-toulouse.md:16

- [toulouse] `/blog/demenageur-toulouse`
  - Texte: "guide déménageur Toulouse"
  - Source: demenagement-bateau-toulouse.md:16



### 2. ARTICLES MANQUANTS (1618 erreurs)

**Description**: Liens vers des articles qui n'existent pas dans le répertoire content/blog
- Article non créé
- Slug incorrect
- Article supprimé sans mise à jour des liens

**Exemples**:
- [marseille] `/blog/demenagement-marseille/location-camion-demenagement-marseille`
  - Texte: "louer un camion pour déménager à Marseille"
  - Source: accessoires-location-camion-marseille-diable-sangles.md:17

- [marseille] `/blog/demenagement-marseille/location-camion-demenagement-marseille`
  - Texte: "location véhicule utilitaire Marseille"
  - Source: accessoires-location-camion-marseille-diable-sangles.md:28

- [marseille] `/blog/demenagement-marseille/location-camion-demenagement-marseille`
  - Texte: "guide location camion déménagement Marseille"
  - Source: accessoires-location-camion-marseille-diable-sangles.md:29

- [marseille] `/blog/demenagement-marseille/aide-au-demenagement-marseille`
  - Texte: "obtenir de l'aide pour déménager à Marseille"
  - Source: aide-demenagement-particulier-marseille-trouver.md:17

- [marseille] `/blog/demenagement-marseille/aide-au-demenagement-marseille`
  - Texte: "aides financières et pratiques déménagement Marseille"
  - Source: aide-demenagement-particulier-marseille-trouver.md:28

- [marseille] `/blog/demenagement-marseille/aide-au-demenagement-marseille`
  - Texte: "guide aide au déménagement à Marseille"
  - Source: aide-demenagement-particulier-marseille-trouver.md:29

- [marseille] `/blog/demenagement-marseille/aide-au-demenagement-marseille`
  - Texte: "obtenir de l'aide pour déménager à Marseille"
  - Source: aides-financieres-demenagement-marseille.md:16

- [marseille] `/blog/demenagement-marseille/aide-au-demenagement-marseille`
  - Texte: "aides financières et pratiques déménagement Marseille"
  - Source: aides-financieres-demenagement-marseille.md:27

- [marseille] `/blog/demenagement-marseille/aide-au-demenagement-marseille`
  - Texte: "guide aide au déménagement à Marseille"
  - Source: aides-financieres-demenagement-marseille.md:28

- [marseille] `/blog/demenagement-marseille/demenageur-marseille`
  - Texte: "déménagement professionnel à Marseille"
  - Source: assurance-demenageur-marseille-garanties.md:11



### 3. PRÉFIXES VILLE (1164 erreurs)

**Description**: Liens contenant le nom de la ville dans le slug (ex: `-marseille-guide-complet`)
- Double préfixe ville
- Format non standardisé
- Besoin de nettoyage de slug

**Exemples**:
- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "stockage sécurisé à Marseille"
  - Source: bien-ranger-box-stockage-marseille.md:17

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "guide complet du garde-meuble à Marseille"
  - Source: bien-ranger-box-stockage-marseille.md:23

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "guide complet du stockage à Marseille"
  - Source: bien-ranger-box-stockage-marseille.md:71

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "solutions de garde-meuble marseillais"
  - Source: bien-ranger-box-stockage-marseille.md:100

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "guide complet pour choisir son garde-meuble à Marseille"
  - Source: combien-coute-garde-meuble-marseille.md:81

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "guide complet des garde-meubles à Marseille"
  - Source: duree-minimum-location-garde-meuble-marseille.md:56

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "stockage sécurisé à Marseille"
  - Source: faq-garde-meuble-marseille-questions-reponses.md:12

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "guide complet du garde-meuble à Marseille"
  - Source: faq-garde-meuble-marseille-questions-reponses.md:18

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "solutions de garde-meuble marseillais"
  - Source: faq-garde-meuble-marseille-questions-reponses.md:89

- [marseille] `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`
  - Texte: "stockage sécurisé à Marseille"
  - Source: garde-meuble-etudiant-marseille-ete.md:14



---

## 🔧 RECOMMANDATIONS PAR TYPE DE PROBLÈME

### Type 1: Slugs Incorrects
1. **Action**: Corriger le format des liens
2. **Outils**: Script de réécriture d'URL
3. **Priorité**: HAUTE (facile à automatiser)

### Type 2: Articles Manquants  
1. **Action**: Identifier si article doit être créé ou lien redirigé
2. **Options**:
   - Créer l'article manquant
   - Rediriger vers l'article pilier correspondant
   - Supprimer le lien si non pertinent
3. **Priorité**: MOYENNE (nécessite validation manuelle)

### Type 3: Préfixes Ville
1. **Action**: Normaliser les slugs (retirer les préfixes ville en double)
2. **Outils**: Script `fix-404-links.sh` existant + amélioration
3. **Priorité**: HAUTE (pattern répétitif, automatisable)

---

## 📋 PLAN D'ACTION PROPOSÉ

### Phase 1: Quick Wins (Automatisable) ⚡
- [ ] Nettoyer les préfixes ville en double (1164 liens)
- [ ] Corriger les slugs au mauvais format (188 liens)
- **Impact**: ~45% des 404 résolus

### Phase 2: Validation Manuelle 🔍
- [ ] Analyser les 20 URLs cassées les plus fréquentes
- [ ] Décider: créer article VS rediriger vers pilier
- [ ] Mettre à jour la stratégie de maillage
- **Impact**: ~30% des 404 résolus

### Phase 3: Nettoyage Final 🧹
- [ ] Traiter les cas restants au cas par cas
- [ ] Mettre en place validation automatique des liens (CI/CD)
- [ ] Documenter les règles de nommage
- **Impact**: 100% des 404 résolus

---

## 💡 PRÉVENTION FUTURE

1. **Hook pre-commit**: Valider les liens internes avant commit
2. **CI/CD check**: Exécuter `check-blog-links.js` en CI
3. **Documentation**: Guide de nommage des articles et slugs
4. **Template**: Générer les maillages automatiquement avec slugs validés

---

**Fin du rapport**
