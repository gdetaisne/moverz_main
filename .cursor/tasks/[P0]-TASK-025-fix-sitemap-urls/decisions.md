# Décisions - TASK-025

## Décision #1 : Utiliser cleanCategory + cleanSlug

**Date** : 03/11/2025  
**Décidé par** : Guillaume + Cursor

**Problème** : Sitemap utilise `category` + `slug` bruts

**Options considérées** :
1. Modifier sitemap pour utiliser clean* ✅ CHOISI
2. Modifier routing pour accepter category brut ❌ (casse tout)
3. Créer redirections 1000+ URLs ❌ (palliatif)

**Raison** :
- Le routing utilise déjà cleanCategory + cleanSlug partout
- C'est le sitemap qui est bugué, pas le routing
- Solution la plus simple et sûre

---

## Décision #2 : Corriger les 11 villes en même temps

**Date** : 03/11/2025  
**Décidé par** : Guillaume + Cursor

**Options** :
1. Corriger 11 villes en même temps ✅ CHOISI
2. Corriger 1 ville test puis généraliser ❌

**Raison** :
- Bug identique sur 11 villes (même code copié)
- Correction simple (1 ligne change)
- Urgence SEO (chaque jour = perte leads)
- Tests pré-deploy suffisants

---

## Décision #3 : Resubmit sitemaps immédiatement

**Date** : 03/11/2025  
**Décidé par** : Guillaume + Cursor

**Raison** :
- Accélérer ré-indexation Google
- Signaler à Google que le problème est corrigé
- Monitoring actif pendant 7 jours

---

*Décisions documentées le 03/11/2025*

