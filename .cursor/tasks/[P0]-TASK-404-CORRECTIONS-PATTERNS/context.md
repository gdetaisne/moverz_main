# Contexte - TASK-404 Corrections Patterns

## Pourquoi cette tâche

Crawler externe a identifié **513 URLs 404** sur les 11 sites en production.

**Impact business** :
- ❌ Perte ranking Google (liens cassés = signal négatif)
- ❌ Mauvaise UX (404 = frustration visiteurs)
- ❌ Perte leads potentiels

## Découverte

Guillaume a lancé un scan crawler qui a révélé 5 patterns majeurs de 404s :
1. Services pages → `/devis-demenagement-lille` hardcodé (33 liens)
2. Corridors → `/marseille` hardcodé (110 liens)
3. Majuscules URLs Nantes (4 liens)
4. FAQ Quartiers Bordeaux hardcodés (66 liens)
5. Structure blog incorrecte (300+ liens dans markdown)

**Cause racine** : Hardcoding villes au lieu d'utiliser `cityData` dynamique.

## Objectif

Résoudre **500+/513 URLs 404** (97%+) en corrigeant à la source (pas de redirections).

