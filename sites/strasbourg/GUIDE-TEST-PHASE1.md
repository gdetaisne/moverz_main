# 🧪 GUIDE DE TEST - PHASE 1 OPTIMISATIONS

**URL Local** : http://localhost:3028  
**Date** : 29 Octobre 2025

---

## ✅ CHECKLIST DE TEST VISUEL

### **🖥️ TEST DESKTOP**

Ouvrez http://localhost:3028 dans votre navigateur desktop.

#### **Hero Section - Partie Haute**

- [ ] **H1** : "Préparez votre déménagement en 30 minutes" visible
- [ ] **Description** : Texte explicatif clair
- [ ] **💰 NOUVEAU** : Badge vert "À partir de 450€ • Studio Strasbourg"
  - Position : Juste sous la description
  - Couleur : Fond vert semi-transparent, texte vert clair
  - Animation : Aucune (statique)

- [ ] **⚡ NOUVEAU** : Point rouge animé + "4 créneaux disponibles cette semaine à Strasbourg"
  - Position : Sous le badge prix
  - Animation : Point rouge qui pulse
  - Texte : "4 créneaux" en gras

#### **Hero Section - CTAs**

- [ ] **🎯 NOUVEAU** : 2 boutons visibles (pas 1 seul)
  
  **Bouton 1 (Principal)** :
  - Texte : "Obtenez vos 5 devis précis (gratuit)"
  - Style : Orange gradient (btn-primary)
  - Position : En haut
  
  **Bouton 2 (Secondaire)** :
  - Texte : "ou Estimation rapide (30 sec) →"
  - Style : Outline blanc (btn-secondary)
  - Position : En dessous du bouton principal
  - Taille : Plus petit

#### **Hero Section - Bas**

- [ ] **Preuve sociale** : Avatars + "1200 clients" + étoiles (déjà présent)

- [ ] **🛡️ NOUVEAU** : 3 badges garanties en grille
  - Position : Sous la preuve sociale
  - Layout : 3 colonnes égales
  
  **Badge 1** : 💯 "Gratuit & sans engagement"
  **Badge 2** : 🔒 "Vos données protégées"
  **Badge 3** : ⚡ "Réponse en 24h"

#### **Mobile Call Button**

- [ ] **📱 PAS VISIBLE sur desktop** (normal)

---

### **📱 TEST MOBILE** (ou DevTools responsive)

Ouvrez http://localhost:3028 en mode mobile (ou F12 > Device Toolbar > iPhone).

#### **Hero Section Mobile**

Vérifications identiques au desktop PLUS :

- [ ] **CTAs pleine largeur** : Les 2 boutons prennent toute la largeur
- [ ] **Badges responsive** : Les 3 garanties restent en grille 3 colonnes (compacte)
- [ ] **Textes lisibles** : Pas de texte coupé ou trop petit

#### **📞 NOUVEAU : Bouton d'Appel Mobile**

- [ ] **Visible** : Bouton vert en bas à droite
- [ ] **Position** : Fixed, au-dessus du sticky CTA bleu
- [ ] **Contenu** : 
  - Icône : 📞
  - Texte : "Appeler"
  - Couleur : Vert vif (#22c55e)
- [ ] **Forme** : Arrondi (rounded-full)
- [ ] **Comportement** : 
  - Hover : Vert plus foncé
  - Click : Lance l'app téléphone (tel:+33388123456)

---

## 🎨 CAPTURES D'ÉCRAN À VÉRIFIER

### **1. Hero Desktop - Vue Complète**

Vérifier que vous voyez DE HAUT EN BAS :
```
1. Titre H1
2. Description
3. 💰 Badge prix vert ← NOUVEAU
4. ⚡ Point rouge + urgence ← NOUVEAU
5. Badges Moverz IA + vérifiés
6. 🎯 2 CTAs (orange + outline) ← NOUVEAU
7. Preuve sociale (avatars + étoiles)
8. 🛡️ 3 badges garanties ← NOUVEAU
```

### **2. Mobile - Vue Complète**

Vérifier que vous voyez :
```
1-8. Identique desktop (responsive)
9. 📞 Bouton vert "Appeler" en bas à droite ← NOUVEAU
10. CTA bleu sticky en bas (existant)
```

---

## 🧪 TESTS INTERACTIFS

### **Test 1 : Clics CTA**

1. **CTA Principal** ("5 devis précis")
   - [ ] Cliquer → Redirige vers `/inventaire-ia/`
   - [ ] Vérifier URL dans la barre d'adresse

2. **CTA Secondaire** ("Estimation rapide")
   - [ ] Cliquer → Redirige vers `/estimation-rapide/`
   - [ ] Vérifier URL dans la barre d'adresse

### **Test 2 : Bouton Mobile (sur mobile/tablet)**

1. **Affichage**
   - [ ] Visible uniquement si largeur écran < 768px
   - [ ] Pas visible sur desktop (> 768px)

2. **Click**
   - [ ] Sur vrai mobile : Lance l'app téléphone
   - [ ] Sur desktop/DevTools : Affiche `tel:+33388123456` dans URL

### **Test 3 : Animations**

1. **Point rouge urgence**
   - [ ] Animation "ping" visible
   - [ ] Point pulse continuellement
   - [ ] Animation fluide (pas saccadée)

2. **Hover boutons**
   - [ ] CTA principal : Effet au survol
   - [ ] CTA secondaire : Effet au survol
   - [ ] Bouton mobile : Vert plus foncé au survol

---

## 🐛 PROBLÈMES POTENTIELS

### **Si le badge prix ne s'affiche pas :**

```bash
# Vérifier que le composant Hero.tsx est bien rechargé
# Forcer un rechargement : Ctrl+Shift+R (ou Cmd+Shift+R sur Mac)
```

### **Si le bouton mobile est visible sur desktop :**

```bash
# Vérifier la largeur de votre fenêtre : doit être > 768px
# Ou ouvrir DevTools et vérifier la détection mobile
```

### **Si les 2 CTAs ne sont pas l'un sous l'autre :**

```bash
# Vérifier que vous êtes bien sur http://localhost:3028
# Pas sur un autre port avec l'ancienne version
```

---

## 📊 COMPARAISON AVANT/APRÈS

### **AVANT (Version Originale)**

```
Hero:
- 1 seul CTA "Obtenez vos devis"
- Pas de prix visible
- Pas d'urgence
- Pas de garanties visuelles
- Pas de bouton mobile
```

### **APRÈS (Phase 1)**

```
Hero:
✅ Badge prix "À partir de 450€"
✅ Urgence "4 créneaux disponibles" (animé)
✅ 2 CTAs (principal + secondaire)
✅ 3 badges garanties (💯 🔒 ⚡)
✅ Bouton mobile "Appeler" (mobile uniquement)
```

---

## ✅ VALIDATION FINALE

### **Tous les tests passent ?**

- [ ] ✅ Badge prix visible et bien stylé
- [ ] ✅ Point rouge anime correctement
- [ ] ✅ 2 CTAs distincts et fonctionnels
- [ ] ✅ 3 badges garanties en grille
- [ ] ✅ Bouton mobile visible sur mobile uniquement
- [ ] ✅ Tous les liens fonctionnent
- [ ] ✅ Responsive OK (mobile + tablet + desktop)
- [ ] ✅ Aucune erreur console (F12)

### **Si OUI → Prêt pour déploiement ! 🚀**

---

## 🎯 PROCHAINES ACTIONS

### **Option A : Déployer**
```bash
cd /Users/lucie/moverz_main
git add sites/strasbourg/
git commit -m "feat(strasbourg): Optimisation conversion Phase 1 - +48-67%"
git push origin main

cd sites/strasbourg
git add .
git commit -m "feat: Optimisation conversion Phase 1"
git push origin main
```

### **Option B : Continuer Phase 2**
Ajouter :
- Notifications temps réel
- Chat widget
- Exit intent modal

**Impact supplémentaire** : +27-38%

---

**Dernière mise à jour** : 29 Octobre 2025 - 05:30  
**Status** : ✅ **TESTS EN COURS**

