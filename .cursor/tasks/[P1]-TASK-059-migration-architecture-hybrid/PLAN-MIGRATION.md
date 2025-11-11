# PLAN DE MIGRATION - Architecture Hybrid

**Durée totale estimée** : 3-4h  
**Downtime attendu** : 0 (migration progressive)

---

## 📅 PHASES DE MIGRATION

### PHASE 0 : Préparation (30 min)

**Avant de commencer** :

```bash
# 1. Backup VPS complet
# Via dashboard Hostinger → Créer snapshot manuel

# 2. Lister tous les services actuels
ssh root@88.223.94.12 'docker service ls'

# 3. Documenter variables env sites
# Via CapRover UI → Chaque app dd-* → Variables

# 4. Créer compte Vercel
# https://vercel.com/signup (gratuit)

# 5. Installer Vercel CLI sur Mac
npm install -g vercel
vercel login
```

**Checklist Préparation** :
- [ ] Snapshot VPS créé
- [ ] Services documentés
- [ ] Variables env exportées
- [ ] Compte Vercel créé
- [ ] Vercel CLI installé

---

### PHASE 1 : Migrer Site #1 TEST (Nice) - 1h

**Objectif** : Migrer 1 site pour valider le process avant les 10 autres.

#### Étape 1.1 : Préparer Repo Nice (10 min)

```bash
cd /Users/guillaumestehelin/moverz_main-4/sites/nice

# Vérifier que le build fonctionne localement
npm install
npm run build

# Si OK, continuer
```

#### Étape 1.2 : Deploy sur Vercel (10 min)

```bash
# Dans sites/nice/
vercel

# Suivre prompts :
# → Set up and deploy? YES
# → Which scope? (ton compte)
# → Link to existing project? NO
# → Project name? dd-nice
# → Directory? ./
# → Override settings? NO
# → Deploy? YES
```

**Résultat** : URL preview Vercel (ex: dd-nice-xxx.vercel.app)

#### Étape 1.3 : Configurer Variables Env (10 min)

```bash
# Via Vercel Dashboard ou CLI
vercel env add NEXT_PUBLIC_SITE_URL
# Valeur: https://devis-demenageur-nice.fr

vercel env add NEXT_PUBLIC_API_URL
# Valeur: https://api.ton-vps.fr (si tu as une API backend)

# Ajouter toutes les autres variables env nécessaires
```

#### Étape 1.4 : Redeploy avec Env (5 min)

```bash
vercel --prod
```

**Résultat** : Site Nice sur Vercel avec toutes les env vars

#### Étape 1.5 : Tester Preview (10 min)

```bash
# Ouvrir l'URL preview Vercel
# Tester :
# - Homepage charge ?
# - Navigation fonctionne ?
# - Formulaires OK ?
# - API calls backend OK ? (si applicable)
```

**✅ CHECKPOINT 1** : Site Nice fonctionne sur Vercel preview

#### Étape 1.6 : Configurer Domaine Production (15 min)

```bash
# Via Vercel Dashboard :
# 1. Project dd-nice → Settings → Domains
# 2. Add Domain : devis-demenageur-nice.fr
# 3. Suivre instructions DNS (A/CNAME records)
```

**Modifications DNS Hostinger/OVH** :
```
Type: A
Name: @
Value: 76.76.21.21 (IP Vercel)
TTL: 300

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

**Propagation DNS** : 5-30 min

#### Étape 1.7 : Valider Production (10 min)

```bash
# Attendre propagation DNS (5-30 min)
# Tester https://devis-demenageur-nice.fr

curl -I https://devis-demenageur-nice.fr/
# Attendu : HTTP/2 200 (Vercel)
```

**✅ CHECKPOINT 2** : Nice en production sur Vercel ✅

---

### PHASE 2 : Migrer 10 Sites Restants (1h30)

**Maintenant que le process est validé, répéter pour les 10 autres villes.**

#### Étape 2.1 : Script Automatisé (30 min)

```bash
# Créer script migration
cat > /tmp/migrate-city-to-vercel.sh << 'EOF'
#!/bin/bash
CITY=$1

cd /Users/guillaumestehelin/moverz_main-4/sites/$CITY

echo "🚀 Migration $CITY vers Vercel..."

# Deploy
vercel --prod --yes

# Configurer domaine (manuel via dashboard pour l'instant)
echo "✅ $CITY déployé ! Configure domaine via dashboard."
EOF

chmod +x /tmp/migrate-city-to-vercel.sh
```

#### Étape 2.2 : Migrer Villes Batch 1 (Lyon, Marseille, Bordeaux) - 30 min

```bash
/tmp/migrate-city-to-vercel.sh lyon
/tmp/migrate-city-to-vercel.sh marseille
/tmp/migrate-city-to-vercel.sh bordeaux

# Configurer domaines via Vercel Dashboard (parallèle)
```

#### Étape 2.3 : Migrer Villes Batch 2 (7 villes restantes) - 30 min

```bash
for city in lille toulouse nantes strasbourg rouen rennes montpellier; do
  /tmp/migrate-city-to-vercel.sh $city
done

# Configurer domaines via Vercel Dashboard
```

#### Étape 2.4 : Valider 11/11 Sites (30 min)

```bash
# Script test rapide
for url in \
  https://devis-demenageur-nice.fr/ \
  https://devis-demenageur-lyon.fr/ \
  https://devis-demenageur-marseille.fr/ \
  https://www.bordeaux-demenageur.fr/ \
  https://devis-demenageur-lille.fr/ \
  https://devis-demenageur-toulousain.fr/ \
  https://devis-demenageur-nantes.fr/ \
  https://devis-demenageur-strasbourg.fr/ \
  https://devis-demenageur-rouen.fr/ \
  https://devis-demenageur-rennes.fr/ \
  https://devis-demenageur-montpellier.fr/
do
  echo -n "Testing $url : "
  curl -sI $url | head -1
done
```

**Attendu** : 11/11 sites HTTP/2 200

**✅ CHECKPOINT 3** : 11/11 sites sur Vercel ✅

---

### PHASE 3 : Nettoyer VPS (1h)

**Maintenant que sites sont sur Vercel, nettoyer VPS.**

#### Étape 3.1 : Supprimer Containers Sites (10 min)

```bash
ssh root@88.223.94.12

# Lister containers sites
docker service ls | grep "srv-captain--dd-"

# Supprimer UN PAR UN (prudent)
docker service rm srv-captain--dd-nice
docker service rm srv-captain--dd-lyon
# ... (×11)

# Ou batch (plus rapide mais attention)
docker service ls -q | grep "srv-captain--dd-" | xargs docker service rm
```

#### Étape 3.2 : Supprimer Images Sites (20 min)

```bash
# Lister images sites
docker images | grep "img-captain-dd-"

# Supprimer
docker images -q -f "reference=img-captain-dd-*" | xargs docker rmi -f
```

#### Étape 3.3 : Nettoyage Complet Docker (20 min)

```bash
# Images dangling restantes
docker image prune -f

# Build cache
docker builder prune -f

# Volumes orphelins (PRUDENT - vérifier avant)
docker volume prune -f

# Vérifier espace libéré
df -h /
```

**Attendu** : ~200-250 GB libérés

#### Étape 3.4 : Valider Backend Toujours OK (10 min)

```bash
# Vérifier services backend restants
docker service ls

# Attendu :
# - captain-captain (CapRover)
# - captain-nginx
# - srv-captain--postgres (si tu as)
# - srv-captain--crm (ou autre backend)
# - srv-captain--dashboards

# Tester accès CapRover UI
curl -I https://captain.gslv.cloud/
# Attendu : HTTP/1.1 200

# Tester dashboards/CRM (URLs internes)
```

**✅ CHECKPOINT 4** : Backend OK, espace libéré ✅

---

### PHASE 4 : Optimiser Configuration (30 min)

#### Étape 4.1 : Configurer Auto-Deploy Vercel (10 min)

```bash
# Via Vercel Dashboard, pour chaque projet :
# Settings → Git → Connect GitHub repo
# → Auto-deploy on push to main : YES

# Résultat : git push = deploy auto
```

#### Étape 4.2 : Configurer Variables Env Globales (10 min)

```bash
# Si variables communes aux 11 sites :
# Vercel Dashboard → Team Settings → Environment Variables
# Ajouter variables globales (héritées par tous projets)
```

#### Étape 4.3 : Monitoring Vercel (10 min)

```bash
# Vercel Dashboard → Team Settings → Integrations
# Ajouter :
# - Slack notifications (optionnel)
# - Vercel Analytics (gratuit, métriques perf)
```

**✅ CHECKPOINT 5** : Configuration optimisée ✅

---

## 🎉 RÉSULTAT FINAL

**Après migration complète** :

```
Architecture Hybrid Opérationnelle :

VERCEL (Public) :
✅ 11 sites Next.js
✅ CDN 70+ régions
✅ Auto-deploy git push
✅ 99.99% uptime
✅ 0 maintenance
Coût : 0€/mois

VPS (Private) :
✅ Postgres (DB)
✅ CRM custom
✅ Dashboards admin
✅ API backend
✅ 200+ GB espace libéré
Coût : 30-40€/mois

TOTAL : 30-40€/mois (vs 50€ avant)
```

---

## 📊 VALIDATION POST-MIGRATION

Voir **`CHECKLIST.md`** pour validation complète.

---

## 🚨 ROLLBACK (Si Problème)

Voir **`ROLLBACK.md`** pour procédure annulation.

---

**Créée par** : Cursor AI  
**Dernière mise à jour** : 11/11/2025 04:30 UTC


