# 🔍 Guide Google Search Console - Tous les Sites

## 🎯 RÉPONSE DIRECTE

**Oui, vous pouvez les configurer "d'un coup" avec la vérification DNS !**

---

## ⚡ MÉTHODE RAPIDE : Vérification DNS (Une seule fois)

### ✅ SI VOUS AVEZ UN DOMAINE PRINCIPAL

**Exemple :** Tous vos sites sont sur `*.moverz.fr`
- marseille.moverz.fr
- lyon.moverz.fr
- etc.

#### Étapes (5 minutes)

**1. Ajoutez une propriété "Domaine"**
```
https://search.google.com/search-console
→ Clic "Ajouter une propriété"
→ Choisir "Domaine" (pas "Préfixe d'URL")
→ Entrer : moverz.fr
```

**2. Vérification DNS**
```
Google affiche : "Ajoutez cet enregistrement TXT à votre DNS"
Exemple : google-site-verification=abc123xyz789

→ Allez chez votre registrar (OVH, Gandi, Cloudflare...)
→ Ajoutez un enregistrement DNS de type TXT
→ Nom : @ (ou moverz.fr)
→ Valeur : google-site-verification=abc123xyz789
→ Sauvegardez
→ Attendez 5-10 min (propagation DNS)
→ Retour Search Console → Clic "Vérifier"
```

**3. TERMINÉ ! 🎉**

**Résultat :** TOUS vos sous-domaines sont automatiquement vérifiés :
- ✅ marseille.moverz.fr
- ✅ lyon.moverz.fr
- ✅ toulouse.moverz.fr
- ✅ bordeaux.moverz.fr
- ✅ (tous les autres)

---

## 🔄 MÉTHODE ALTERNATIVE : Sites Individuels

### SI vous n'avez PAS de domaine principal

Ou si chaque site est sur un domaine différent :
- marseille-demenagement.fr
- lyon-demenagement.fr
- etc.

#### Workflow optimisé (2 min par site)

**Option A : Fichier HTML (Recommandé)**

Pour chaque site :

```bash
1. Search Console → Ajouter une propriété
2. Choisir "Préfixe d'URL"
3. Entrer : https://marseille-demenagement.fr
4. Méthode : "Fichier HTML"
5. Télécharger le fichier (ex: google123abc.html)
6. Placer dans : sites/marseille/public/google123abc.html
7. Déployer le site
8. Retour Search Console → Vérifier
9. Répéter pour Lyon, Toulouse, etc.
```

**Durée totale pour 10 sites :** ~20 minutes

---

**Option B : Balise Meta HTML**

Plus rapide si vous pouvez modifier le code une seule fois :

```tsx
// Dans sites/marseille/app/layout.tsx (et les autres)

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Balise de vérification Google Search Console */}
        <meta name="google-site-verification" content="[CODE_UNIQUE_PAR_SITE]" />
        {/* ... autres balises ... */}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Avantage :** Pas de fichier à ajouter, juste une ligne de code.

**Inconvénient :** Code différent par site (chaque site a son propre code de vérification).

---

**Option C : Google Analytics**

Si vous avez déjà Google Analytics sur tous vos sites avec le même compte :

```
Search Console → Vérification
→ Choisir "Google Analytics"
→ Vérification automatique si même compte GA
```

**Le plus rapide si GA déjà configuré !**

---

## 📊 APRÈS VÉRIFICATION : Optimisation

### 1. Soumettre les Sitemaps (obligatoire)

Pour chaque site vérifié :

```
Search Console → Sitemaps
→ Ajouter un sitemap
→ URL : https://[site]/sitemap.xml
→ Envoyer
```

### 2. Paramètres régionaux

```
Search Console → Paramètres (⚙️)
→ Ciblage géographique
→ France
```

### 3. Demander l'indexation des pages clés

```
Search Console → Inspection d'URL
→ Entrer : https://marseille.moverz.fr
→ Demander l'indexation
→ Répéter pour :
  - Page d'accueil
  - 3-5 piliers principaux
```

---

## 🤖 SCRIPT D'AUTOMATISATION (Bonus)

Si vous voulez automatiser une partie, créez un script :

```bash
# Liste des sites
SITES=(
  "https://marseille.moverz.fr"
  "https://lyon.moverz.fr"
  "https://toulouse.moverz.fr"
  # etc.
)

# Créer un fichier avec toutes les URLs
for site in "${SITES[@]}"; do
  echo "$site" >> sites-to-add.txt
  echo "$site/sitemap.xml" >> sitemaps-to-add.txt
done

echo "✅ Fichiers créés :"
echo "   - sites-to-add.txt (à ajouter dans Search Console)"
echo "   - sitemaps-to-add.txt (sitemaps à soumettre)"
```

Puis vous copiez-collez en masse dans Search Console.

---

## 📋 CHECKLIST COMPLÈTE

### Phase 1 : Vérification (15-30 min)

```
□ Méthode choisie (DNS recommandé)
□ Propriété(s) ajoutée(s) dans Search Console
□ Vérification effectuée
□ Tous les sites apparaissent dans la liste
```

### Phase 2 : Configuration (30 min)

```
□ Sitemaps soumis pour chaque site
□ Ciblage géographique : France
□ Pages principales indexées
□ Données de propriété partagées (optionnel, si collaborateurs)
```

### Phase 3 : Suivi (quotidien)

```
□ Vérifier erreurs de couverture
□ Surveiller les performances (impressions, clics)
□ Corriger les problèmes d'exploration
□ Soumettre nouvelles pages importantes
```

---

## 💡 RECOMMANDATIONS

### Si vous avez < 3 sites
→ **Méthode fichier HTML** (5 min par site)

### Si vous avez 3-10 sites sur même domaine
→ **Méthode DNS** (5 min pour tous)

### Si vous avez 10+ sites sur domaines différents
→ **Méthode Google Analytics** (si déjà configuré)  
→ Sinon **Balise Meta** (rapide à déployer)

---

## 🚨 ERREURS FRÉQUENTES

**1. "Échec de la vérification"**
- Vérifiez que le fichier HTML est bien à la racine : `/public/google123.html`
- Vérifiez que le site est bien déployé en production
- Attendez 24h pour la propagation DNS

**2. "Propriété non trouvée"**
- Utilisez l'URL exacte (avec https://)
- Pas de trailing slash : `https://site.fr` (pas `https://site.fr/`)

**3. "Sitemap non trouvé"**
- Vérifiez que le sitemap existe : `https://site.fr/sitemap.xml`
- Vérifiez qu'il est accessible publiquement (pas de 404)

---

## 🎯 TEMPS ESTIMÉ

| Méthode | Temps setup | Temps par site | Total 10 sites |
|---------|-------------|----------------|----------------|
| **DNS** | 5 min | 1 min | **15 min** ⚡ |
| Fichier HTML | - | 3 min | 30 min |
| Balise Meta | 10 min | 2 min | 30 min |
| Google Analytics | - | 1 min | 10 min |

**Recommandation : DNS (si possible) = 15 min pour tout configurer ! 🚀**

---

## 📞 BESOIN D'AIDE ?

**Documentation Google :**
https://support.google.com/webmasters/answer/9008080

**Vérifier propagation DNS :**
https://dnschecker.org

---

*Méthode DNS = La plus rapide et scalable pour plusieurs sites !*

