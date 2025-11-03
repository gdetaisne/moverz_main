# Décisions - TASK-404-02

## 🤔 Décisions techniques

### Décision #1 : Retrait complet des accents dans CATEGORY_MAPPING

**Contexte** : CATEGORY_MAPPING contient des variantes avec accents (`déménagement`, `étudiant`)

**Options considérées** :
1. Garder accents + normaliser slugs
2. Retirer tous les accents
3. Ajouter logic de normalisation

**Décision** : Option 2 - Retirer tous les accents

**Raison** :
- URLs Next.js générées sans accents (slugify automatique)
- Matching direct sans transformation
- Plus simple et plus maintenable
- Évite bugs futurs

---

### Décision #2 : Fix cleanSlug() par ville (pas centraliser)

**Contexte** : cleanSlug() copié-collé avec patterns ville hardcodés

**Options considérées** :
1. Centraliser cleanSlug() dans un helper partagé
2. Fix individuel par ville

**Décision** : Option 2 - Fix individuel

**Raison** :
- Chaque ville peut avoir ses spécificités
- Évite risque régression multi-villes
- Plus rapide (15 min vs 1h refactor)
- Scope limité à cette tâche

---

### Décision #3 : Nice satellites 'conseils' (pas 'satellites')

**Contexte** : Nice a une catégorie 'satellites' qui mappe vers null

**Options considérées** :
1. Créer vraie catégorie 'satellites'
2. Mapper vers 'conseils' (existant)
3. Mapper vers 'guides'

**Décision** : Option 2 - Mapper vers 'conseils'

**Raison** :
- Catégorie 'conseils' existe et est adaptée
- Pas besoin créer nouvelle catégorie
- Cohérent avec autres villes
- Quick fix (2 min)

---

*Dernière mise à jour : 2025-11-02*

