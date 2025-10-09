# 🎯 Template de Prompt pour Nouveau Chat Cursor

Copiez-collez ce prompt dans un **nouveau chat Cursor** pour créer un pilier.

---

## PROMPT COMPLET (Copier-coller)

```markdown
# MISSION : Création Page Pilier SEO - Moverz Marseille

Lis le fichier : seo-briefs/marseille/01-demenagement-marseille-pas-cher.md

## TON RÔLE
Tu es rédacteur expert en déménagement pour Moverz, entreprise marseillaise de services de déménagement.

## OBJECTIF
Rédiger une page pilier SEO premium qui :
- Ranke position 1-3 sur Google pour la requête cible
- Convertit les visiteurs en demandes de devis
- Devient la référence sur ce sujet pour Marseille

## INSTRUCTIONS CRITIQUES

### ✅ À RESPECTER ABSOLUMENT

1. **SUIVRE LE BRIEF À LA LETTRE**
   - Structure H1/H2/H3 EXACTEMENT celle indiquée dans le brief
   - Traiter TOUTES les sections demandées
   - Longueur : celle du brief (généralement 1500-2500 mots)
   - Répondre à TOUTES les "questions implicites" (dans la FAQ)

2. **MARSEILLE 100% AUTHENTIQUE**
   - Citer des quartiers spécifiques : Vieux-Port, La Joliette, Castellane, Endoume, La Valentine, etc.
   - Problématiques locales : immeubles anciens sans ascenseur, rues étroites du centre, stationnement difficile
   - Périodes : éviter juin-septembre (tourisme), préférer octobre-mai
   - Références naturelles à la ville, pas forcées

3. **INTÉGRER TOUS LES MOTS SÉMANTIQUES**
   - Utiliser naturellement les 40-50 mots listés dans le brief
   - Pas de bourrage : intégration fluide dans le texte
   - Variations et synonymes acceptés

4. **DONNÉES RÉELLES & VÉRIFIABLES**
   - Prix Marseille 2025 (fourchettes) :
     * Studio : 400-800€
     * 2-3 pièces : 800-1500€
     * Maison : 1500-3000€
     * (Adapter selon le type de déménagement du pilier)
   - Jamais inventer de chiffres précis
   - Toujours donner des fourchettes
   - Mentionner les facteurs de variation

5. **E-E-A-T (Google Quality)**
   - **Experience** : Exemples concrets, cas d'usage réels
   - **Expertise** : Vocabulaire technique précis du métier
   - **Authoritativeness** : Conseils professionnels, normes, certifications
   - **Trustworthiness** : Transparence sur prix, avertissements si nécessaire

### ❌ INTERDICTIONS ABSOLUES

- ❌ Contenu générique valable pour toute ville de France
- ❌ Phrases creuses ("il est important de noter que...", "en effet...", "par ailleurs...")
- ❌ Bourrage artificiel de mots-clés
- ❌ Données inventées ou trop précises (ex: "347€" au lieu de "300-400€")
- ❌ Ignorer des sections du brief
- ❌ Modifier la structure H2/H3 proposée dans le brief

### 📤 FORMAT DE SORTIE OBLIGATOIRE

Produire un fichier Markdown avec front matter Next.js :

```yaml
---
title: "[Utiliser le titre SEO du brief]"
description: "[Utiliser la meta-description du brief]"
slug: "[url-optimisee-du-pilier]"
category: "demenagement-marseille"
keywords: 
  - "[mot-clé principal]"
  - "[mots-clés secondaires du brief]"
author: "Équipe Moverz Marseille"
publishedAt: "2025-01-15"
updatedAt: "2025-01-15"
featured: true
---

# [H1 exact du brief]

[Introduction accrocheuse - 2-3 paragraphes]
- Aborder la problématique
- Rassurer l'utilisateur
- Annoncer le contenu

[CTA si recommandé dans le brief]

## [H2 Section 1 selon brief]

[Contenu détaillé - 300-500 mots]
- Utiliser H3 si nécessaire
- Listes à puces
- Paragraphes courts (2-4 lignes max)

## [H2 Section 2 selon brief]

[Contenu détaillé]

[... suivre TOUTE la structure du brief ...]

## Questions Fréquentes

### [Question 1 issue des "questions implicites" du brief]
[Réponse concise et experte]

### [Question 2]
[Réponse]

[... Minimum 5 questions/réponses ...]

## [Conclusion]

[Synthèse + rappel CTA]

---

<!-- MÉTADONNÉES TECHNIQUES -->
Schema.org suggestions:
- LocalBusiness (Moverz Marseille)
- Service (type de déménagement)
- FAQPage

Images recommandées:
1. [Description image hero]
2. [Description visuel section 1]
3. [Description infographie si pertinent]

Liens internes à créer:
- Vers [autres piliers si pertinents]
- Vers page d'accueil Marseille
- Vers page contact/devis
```

## STYLE & TON

- **Expert** mais accessible (pas trop technique)
- **Rassurant** et empathique (déménager = stress)
- **Concret** : exemples, chiffres, actions
- **Local** : vocabulaire marseillais naturel (pas exagéré)
- **Conversationnel** mais professionnel

## CHECKLIST FINALE

Avant de me transmettre le contenu, vérifie :

```
✅ Structure = celle du brief (H1/H2/H3 identiques)
✅ Longueur = celle indiquée dans le brief
✅ Mots sémantiques intégrés (80%+ de la liste)
✅ Questions implicites = réponses dans FAQ
✅ Références Marseille spécifiques (pas génériques)
✅ Données chiffrées = fourchettes réalistes
✅ Aucune phrase de fluff
✅ CTA positionnés comme suggéré
✅ Front matter complet et correct
```

---

## C'EST PARTI !

Rédige maintenant la page pilier complète en suivant strictement ces instructions et le brief du fichier.
```

---

## Variantes pour d'autres pilliers

### Pour le pilier #2 (international)
Remplacer la première ligne par :
```
Lis le fichier : seo-briefs/marseille/02-demenagement-international-marseille.md
```

### Pour le pilier #3 (piano)
Remplacer la première ligne par :
```
Lis le fichier : seo-briefs/marseille/03-demenagement-piano-marseille.md
```

Etc.

---

## Prompt pour Articles Satellites (après les pilliers)

```markdown
# MISSION : Article Satellite pour Pilier

Pilier parent : [nom du pilier]
Article à créer : [sous-requête identifiée]

## OBJECTIF
Créer un article satellite de 1200 mots qui :
- Approfondit UNE sous-thématique du pilier
- Pointe vers le pilier parent (2-3 liens naturels)
- Cible une requête longue traîne spécifique

## STRUCTURE
[H1 avec la sous-requête]
Introduction (lien vers pilier)
3-4 sections H2 détaillées
Conclusion (lien vers pilier + CTA)

## FORMAT
Même front matter que les piliers, catégorie identique

GO !
```

---

**Pro tip :** Ouvrez un chat Cursor par pilier pour conserver le contexte et faciliter les ajustements.

