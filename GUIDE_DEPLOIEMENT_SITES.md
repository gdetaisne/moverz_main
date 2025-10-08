# 🚀 GUIDE DÉPLOIEMENT SITES - COMMITS SÉPARÉS

**Approche** : 1 commit GitHub = 1 site déployable  
**Avantage** : Solution propre, pas de configuration temporaire

---

## 🎯 **COMMENT ÇA MARCHE**

### **Workflow :**
1. **Commande** : `./deploy-site.sh <site>`
2. **Résultat** : 1 commit GitHub avec `captain-definition` configuré pour ce site
3. **Déploiement** : CapRover utilise ce commit pour déployer l'app

### **Architecture :**
```
Repo GitHub: gdetaisne/moverz_main
    ↓ (commit avec captain-definition pour Lille)
CapRover App: dd-lille
    ↓ (utilise sites/lille/Dockerfile)
Site Live: devis-demenageur-lille.fr
```

---

## 📋 **COMMANDES DISPONIBLES**

### **Déployer un site :**
```bash
./deploy-site.sh lille
./deploy-site.sh marseille
./deploy-site.sh lyon
./deploy-site.sh toulouse
./deploy-site.sh nice
./deploy-site.sh nantes
./deploy-site.sh strasbourg
./deploy-site.sh rennes
./deploy-site.sh rouen
```

### **Déployer tous les sites :**
```bash
for site in lille marseille lyon toulouse nice nantes strasbourg rennes rouen; do
  echo "🚀 Déploiement de $site..."
  ./deploy-site.sh $site
  echo "✅ $site prêt !"
  echo ""
done
```

---

## 🔧 **CONFIGURATION CAPROVER**

### **Pour chaque app CapRover :**

1. **Va dans l'app** (ex: `dd-lille`)
2. **Onglet "Déploiement"**
3. **Configure :**
   ```
   Repository: gdetaisne/moverz_main
   Branch: main
   Username: gdetaisne
   Password: [ton token GitHub]
   ```
4. **Clique sur "Save & Deploy"**

### **Variables d'environnement :**
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

---

## 🎯 **EXEMPLE : DÉPLOIEMENT LILLE**

### **1. Commande :**
```bash
./deploy-site.sh lille
```

### **2. Résultat :**
```bash
🚀 DÉPLOIEMENT DU SITE: lille
==============================

📋 Configuration pour lille:
  App CapRover: dd-lille
  Repository: gdetaisne/moverz_main
  Branch: main
  Captain Definition Path: sites/lille/captain-definition

✅ Créé captain-definition à la racine pour lille

📤 Push vers GitHub...

🎉 DÉPLOIEMENT PRÊT !

📋 Maintenant dans CapRover pour dd-lille:
  1. Va dans l'onglet 'Déploiement'
  2. Configure:
     Repository: gdetaisne/moverz_main
     Branch: main
     Username: gdetaisne
     Password: [ton token GitHub]
  3. Clique sur 'Save & Deploy'

💡 Le captain-definition à la racine pointe vers sites/lille/Dockerfile
```

### **3. Commit GitHub créé :**
```
🎯 Déploiement lille

- Captain-definition configuré pour lille
- Dockerfile: sites/lille/Dockerfile
- App CapRover: dd-lille
- Prêt pour déploiement !
```

### **4. CapRover utilise :**
- **captain-definition** à la racine
- **Dockerfile** dans `sites/lille/Dockerfile`
- **Code** de `sites/lille/`

---

## 🎉 **AVANTAGES**

✅ **Solution propre** : Pas de configuration temporaire  
✅ **Traçabilité** : 1 commit = 1 déploiement  
✅ **Flexibilité** : Déploiement sélectif par site  
✅ **Maintenance** : Historique clair des déploiements  
✅ **Rollback** : Possibilité de revenir à un commit précédent  

---

## 🚨 **IMPORTANT**

### **Ordre de déploiement :**
- **1 site à la fois** : Ne pas déployer plusieurs sites simultanément
- **Attendre la fin** : Attendre que le build soit terminé avant le suivant
- **Vérifier** : Tester chaque site avant de passer au suivant

### **Si erreur :**
1. **Vérifier les logs** CapRover
2. **Vérifier le commit** GitHub
3. **Relancer** : `./deploy-site.sh <site>`

---

## 📊 **STATUT DES DÉPLOIEMENTS**

| Site | App CapRover | Commit | Status |
|------|--------------|--------|--------|
| Lille | dd-lille | ✅ | Prêt |
| Marseille | dd-marseille | ⏳ | À déployer |
| Lyon | dd-lyon | ⏳ | À déployer |
| Toulouse | dd-toulouse | ⏳ | À déployer |
| Nice | dd-nice | ⏳ | À déployer |
| Nantes | dd-nantes | ⏳ | À déployer |
| Strasbourg | dd-strasbourg | ⏳ | À déployer |
| Rennes | dd-rennes | ⏳ | À déployer |
| Rouen | dd-rouen | ⏳ | À déployer |

---

## 🎯 **PROCHAINE ÉTAPE**

**Maintenant que Lille est prêt :**
1. **Va dans CapRover** → `dd-lille`
2. **Configure le déploiement** avec les paramètres ci-dessus
3. **Teste le déploiement**
4. **Si ça marche** → On déploie les 8 autres sites !

**Dis-moi quand Lille est déployé et on continue ! 🚀**
