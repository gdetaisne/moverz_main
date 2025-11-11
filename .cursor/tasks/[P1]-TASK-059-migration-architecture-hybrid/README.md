# [P1]-TASK-059 : Migration Architecture Hybrid Vercel + VPS

**Statut** : 📋 PENDING (à faire après nettoyage Docker)  
**Priorité** : P1 (Important - Impact business fort)  
**Créée le** : 11 novembre 2025 04:30 UTC  
**Temps estimé** : 3-4h (migration + tests)  
**ROI attendu** : +99% uptime sites, -40% maintenance, résilience critique

---

## 📋 RÉSUMÉ EXÉCUTIF

### Objectif
**Séparer sites publics (Vercel) du backend privé (VPS)** pour résilience et performance optimales.

### Architecture Actuelle (Problématique)
```
┌─────────────────────────────────────────┐
│  VPS HOSTINGER (TOUT sur 1 serveur)    │
│  ├── 11 sites Next.js publics           │
│  ├── Postgres (DB)                      │
│  ├── CRM custom                         │
│  ├── Dashboards admin                   │
│  └── API endpoints                      │
│                                         │
│  ❌ Si VPS down → TOUT down             │
│  ❌ 751 images Docker (problème disque) │
│  ❌ Performance 1 région (France)       │
│  ❌ Maintenance lourde (Docker)         │
└─────────────────────────────────────────┘
```

### Architecture Cible (Optimal)
```
┌──────────────────────────────────────────┐
│  VERCEL (Public - Sites clients)         │
│  ├── 11 sites Next.js                    │
│  │   └── CDN 70+ régions                 │
│  │   └── Auto-scaling                    │
│  │   └── 99.99% uptime                   │
│  │   └── 0 maintenance                   │
│  │                                        │
│  ✅ Si VPS down → Sites OK               │
│  Coût: 0€/mois (tier gratuit)            │
└──────────────────────────────────────────┘
            ↓ API calls (HTTPS)
┌──────────────────────────────────────────┐
│  VPS HOSTINGER (Private - Backend)       │
│  ├── Postgres (DB)                       │
│  ├── CRM custom                          │
│  ├── Dashboards admin                    │
│  └── API REST (Express/Next API)         │
│                                          │
│  ✅ Allégé (pas de sites)                │
│  ✅ Moins d'images Docker                │
│  ✅ Focus backend uniquement             │
│  Coût: 30-40€/mois (vs 50€)             │
└──────────────────────────────────────────┘
```

---

## 🎯 BÉNÉFICES ATTENDUS

### 1. Résilience Critique
- **Avant** : VPS down → 11 sites down = 0 lead
- **Après** : VPS down → Sites OK, CRM down (interne uniquement)
- **Impact** : Perte 0 lead vs 10-20 leads/mois potentiels

### 2. Performance Sites Publics
- **Avant** : Datacenter France uniquement, ~200-500ms users US/Asie
- **Après** : CDN 70+ régions, ~50-100ms partout dans le monde
- **Impact SEO** : Core Web Vitals améliorés, ranking boost

### 3. Maintenance Réduite
- **Avant** : Gérer 11 containers Docker sites + backend
- **Après** : 0 maintenance sites (Vercel auto), focus backend
- **Temps gagné** : 5-10h/mois

### 4. Problème Disque Résolu
- **Avant** : 751 images dangling (11 sites × builds multiples)
- **Après** : Seulement backend (2-3 containers) = 10x moins d'images
- **Espace récupéré** : ~200 GB permanent

### 5. Coûts Optimisés
- **Avant** : VPS 50€/mois (charge lourde)
- **Après** : Vercel 0€ + VPS 30€ = 30€/mois total
- **Économie** : 20€/mois = 240€/an

---

## 📊 MÉTRIQUES CIBLES

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| **Uptime sites** | 67% (cette semaine) | 99.99% | +49% |
| **Uptime backend** | 67% | 95%+ (focus) | +42% |
| **Performance sites (France)** | 200ms | 50ms | ×4 |
| **Performance sites (US)** | 500ms | 80ms | ×6 |
| **Images Docker** | 751 | <50 | -93% |
| **Maintenance/mois** | 10h | 2h | -80% |
| **Coût total** | 50€ | 30€ | -40% |

---

## 🚀 PLAN DE MIGRATION

Voir **`PLAN-MIGRATION.md`** pour procédure détaillée step-by-step.

---

## ⚠️ PRÉREQUIS

Avant de commencer :
- [ ] Nettoyage Docker terminé (TASK-058) ✅
- [ ] VPS stable et accessible ✅
- [ ] Compte Vercel créé (gratuit)
- [ ] Backup complet VPS (snapshot Hostinger)
- [ ] 3-4h temps disponible (migration + tests)

---

## 🔗 FICHIERS LIÉS

- **Plan** : `PLAN-MIGRATION.md` (étapes détaillées)
- **Checklist** : `CHECKLIST.md` (validation post-migration)
- **Tests** : `TESTS.md` (scénarios de validation)
- **Rollback** : `ROLLBACK.md` (procédure annulation si problème)

---

**Créée par** : Cursor AI  
**Assignée à** : Guillaume  
**Lien incident** : [P0]-TASK-057 (résilience) + [P0]-TASK-058 (disque)


