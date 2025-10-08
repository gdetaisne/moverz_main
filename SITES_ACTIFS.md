# 🚀 SITES ACTIFS SUR LOCALHOST

**Date** : 8 octobre 2025  
**Status** : ✅ TOUS LES SITES EN LIGNE

---

## 📊 LISTE DES SITES

| # | Ville | Port | URL | Status |
|---|-------|------|-----|--------|
| 1 | **Bordeaux** | 4001 | http://localhost:4001 | ✅ EN LIGNE |
| 2 | **Marseille** | 4002 | http://localhost:4002 | ✅ EN LIGNE |
| 3 | **Lyon** | 4003 | http://localhost:4003 | ✅ EN LIGNE |
| 4 | **Toulouse** | 4004 | http://localhost:4004 | ✅ EN LIGNE |
| 5 | **Nice** | 4005 | http://localhost:4005 | ✅ EN LIGNE |
| 6 | **Nantes** | 4006 | http://localhost:4006 | ✅ EN LIGNE |
| 7 | **Strasbourg** | 4007 | http://localhost:4007 | ✅ EN LIGNE |
| 8 | **Lille** | 4008 | http://localhost:4008 | ✅ EN LIGNE |
| 9 | **Rennes** | 4009 | http://localhost:4009 | ✅ EN LIGNE |
| 10 | **Rouen** | 4010 | http://localhost:4010 | ✅ EN LIGNE |

---

## 🎯 DASHBOARD

Accède au dashboard de déploiement : http://localhost:4000

---

## 🔧 COMMANDES UTILES

### Arrêter tous les serveurs
```bash
pkill -f "npm run dev"
```

### Relancer tous les serveurs
```bash
cd /Users/guillaumestehelin/moverz_main
for site in bordeaux marseille lyon toulouse nice nantes strasbourg lille rennes rouen; do
  port=$((4001 + i))
  cd sites/$site && PORT=$port npm run dev > /tmp/$site-dev.log 2>&1 &
  ((i++))
done
```

### Vérifier les logs d'un site
```bash
tail -f /tmp/marseille-dev.log
```

---

## 📝 NOTES

- ✅ Toutes les dépendances installées
- ✅ `next.config.ts` renommé en `next.config.js` pour tous les sites
- ✅ Serveurs Next.js en mode développement
- ⚠️ Les sites utilisent le port HTTP, pas HTTPS

---

## 🚀 PROCHAINES ÉTAPES

1. Tester chaque site (Footer, Header, Blog, Partenaires)
2. Corriger les erreurs éventuelles
3. Builder pour production
4. Déployer sur CapRover/Vercel
