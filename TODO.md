# 📝 TODO - Améliorations Futures

## 🟡 Non-urgentes (optimisations)

### 1. Localiser images HowItWorks

**État actuel :** Images Unsplash avec `unoptimized: true`  
**Objectif :** Héberger les images localement pour éviter la dépendance externe

**Avantages :**
- Pas de risque de rate-limiting Unsplash
- Temps de chargement plus rapide
- Contrôle total sur les assets

**Plan d'action :**
```bash
# 1. Télécharger les 3 images Unsplash actuelles
wget -O public/images/how-it-works/step-1.jpg "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1600&h=1200&fit=crop&q=85"
wget -O public/images/how-it-works/step-2.jpg "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1200&fit=crop&q=85"
wget -O public/images/how-it-works/step-3.jpg "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1600&h=1200&fit=crop&q=85"

# 2. Mettre à jour HowItWorks.tsx
# Remplacer les URLs Unsplash par /images/how-it-works/step-X.jpg

# 3. Copier vers tous les sites
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  mkdir -p "sites/$city/public/images/how-it-works"
  cp public/images/how-it-works/*.jpg "sites/$city/public/images/how-it-works/"
  cp components/HowItWorks.tsx "sites/$city/components/HowItWorks.tsx"
done
```

**Priorité :** Basse (fonctionne déjà avec `unoptimized: true`)

---

## ✅ Complétées (28 Oct 2025)

- [x] Hero animé IA avec badges Moverz
- [x] Testimonials localisés par ville
- [x] CSS unifié (btn-primary, btn-secondary, btn-accent)
- [x] Blog tenant-aware
- [x] Images `unoptimized: true`
- [x] Canonical URLs uniformisés (sans www.)
- [x] ESLint anti-imports cross-ville
- [x] Documentation complète (ARCHITECTURE.md, DEPLOY.md, CHANGELOG.md)
- [x] URLs quartiers en kebab-case

---

**Dernière mise à jour :** 28 Octobre 2025

