# TASK-002 : Migration Canonicals - 11 villes

**ID** : TASK-002
**Type** : Refactor / SEO
**Priorité** : P2
**Assigné** : Guillaume
**Statut** : ⚠️ INCOMPLET

---

## 📊 Vue rapide

**Démarrée le** : ~31 octobre 2025
**Mise en pause le** : ~31 octobre 2025
**Progression** : ~5% (documentation complète, code pas commencé)

**Temps estimé initial** : 92-137h (sans scripts)
**Temps estimé avec scripts** : 40-54h
**Temps passé** : ~6h (documentation exhaustive)
**Temps restant** : 40-54h (implémentation)

**Liens rapides** :
- [Contexte détaillé](./context.md)
- [Journal de bord](./progress.md)
- [Commits GitHub](./commits.md)
- [Tests effectués](./tests.md)
- [Décisions techniques](./decisions.md)

---

## ✅ Definition of Done

- [ ] 1. Helper centralisé créé + code propre et documenté
- [ ] 2. Déployé sur 11 villes avec commits documentés
- [ ] 3. Testé sur 2+ sites + monitoring Search Console 7 jours OK

---

## 📝 Résumé exécutif

**Problème** : Canonicals incohérents sur les 11 sites Moverz
- 3 domaines différents pour Nice (dilution PageRank)
- Slash final incohérent (50% avec `/`, 50% sans)
- URLs hardcodées dans 50+ fichiers (maintenance impossible)
- Risque SEO réel (Google voit plusieurs versions d'une même page)

**Solution** : Migration complète vers canonicals cohérents
- 1 seul domaine par ville
- Slash final partout : `https://devis-demenageur-nice.fr/`
- Helper centralisé pour génération automatique
- Scripts pour automatiser migration

**Documentation créée** (5% fait) :
- ✅ ANALYSE-CANONICALS-COMPLETE.md (analyse détaillée)
- ✅ RESUME-CANONICALS.md (résumé exécutif)
- ✅ EXEMPLE-MIGRATION-CANONICALS.md (guide pratique)
- ✅ DECISION-CANONICALS.md (décisions à prendre)
- ✅ EFFETS-BORD-CANONICALS.md (impacts)
- ✅ TABLEAU-DOMAINES-ACTUELS.md (état des lieux)

**Code à faire** (95% restant) :
- [ ] Créer helper canonicals centralisé
- [ ] Migrer Nice (modèle) : 12-17h
- [ ] Répliquer 10 autres villes : 4-6h chacune
- [ ] Configurer redirections 301 si changement domaine
- [ ] Tests + déploiement
- [ ] Monitoring Search Console 30j

**Impact SEO attendu** :
- Court terme (J+1-7) : -5% positions (temporaire)
- Long terme (J+30+) : +15-20% positions
- ROI : +300% à 60 jours

