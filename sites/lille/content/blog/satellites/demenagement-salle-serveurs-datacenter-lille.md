---
title: "Déménagement Salle Serveurs / Datacenter Lille : Protocole Pro (2025)"
description: "Transférer datacenter/salle serveurs à Lille : arrêt contrôlé, emballage rack 42U, transport sécurisé, remise en service. Guide expert IT 2025."
publishDate: 2025-01-13
featured: false
image: "/images/blog/demenagement-datacenter-lille.jpg"
category: "demenagement-entreprise"
author: "Guillaume Stehelin"
tags: ["datacenter", "serveurs", "IT", "Lille", "rack", "infrastructure"]
---

# Déménagement Salle Serveurs / Datacenter Lille : Protocole Expert (2025)

Votre **PME** déménage sa **salle serveurs** de **Villeneuve-d'Ascq** vers **Euralille** : **10 serveurs rack 19"**, **baie de brassage** 48 ports, **onduleur 3 kVA**, **NAS 40 To**, **switches** managés. Un déménagement datacenter = **risques critiques** : arrêt non contrôlé (corruption données), choc transport (disques HS), câblage inversé (réseau inopérant), coupure 24-48h (perte CA 50 000-200 000 €). À Lille, **3-4 prestataires certifiés IT** maîtrisent **shutdown propre, déconnexion documentée, transport antistatique, recâblage identique, tests complets**. Ce guide détaille protocoles, prix, délais et checklist pour un transfert datacenter zéro incident en 2025.

---

## Risques Spécifiques Salle Serveurs

### 1. Corruption Données (Arrêt Brutal)

**Cause** : Extinction serveur via bouton power (pas shutdown OS).

**Conséquence** :
- **Fichiers** : Corruption bases de données (MySQL, PostgreSQL)
- **RAID** : Dégradé si arrêt pendant synchronisation
- **OS** : Ne redémarre pas (kernel panic, BSOD)

**Taux échec** : 15-20 % déménagements datacenter sans protocole (source : étude Gartner 2023).

---

### 2. Chocs Physiques (Disques Durs)

**HDD serveurs** (10 000-15 000 tr/min) :
- **Sensibilité** : Choc > 1 G = têtes lecture endommagées
- **Transport** : Vibrations camion standard = micro-chocs (cumul = panne)

**Coût récupération** : 2000-8000 €/disque (taux succès 60-70 %).

---

### 3. Électricité Statique (Cartes Électroniques)

**Cartes réseau, RAM, CPU** :
- **ESD** (décharge électrostatique) > 100 V = composant grillé
- **Manipulation** : Sans bracelet antistatique = risque 30-40 %

**Symptôme** : Serveur ne démarre plus post-déménagement (carte mère HS).

---

### 4. Câblage Réseau (Erreurs Reconnexion)

**Baie brassage** (48 ports) + switches + serveurs :
- **Câbles** : 100-200 RJ45 à reconnecter
- **Erreur** : 1 câble mal branché = VLAN inopérant, service down

**Temps perte** : 3-6h identification erreur (si documentation absente).

---

## Protocole Déménagement Datacenter (Phase par Phase)

### Phase 1 : Préparation (J-30 à J-7)

#### J-30 : Audit Infrastructure

**Inventaire complet** :
- **Serveurs** : Marque, modèle, OS, config (RAM, CPU, disques), services hébergés
- **Équipements réseau** : Switches (modèle, nombre ports), routeur, firewall, bornes WiFi
- **Stockage** : NAS (modèle, capacité, RAID), SAN si applicable
- **Baie rack** : 42U (hauteur), état (roulettes, porte)
- **Onduleur** : Puissance (kVA), autonomie (min), état batteries

**Document** : Schéma réseau (Visio, draw.io) :
- Topologie physique (switch → serveurs)
- VLANs (segmentation réseau)
- Adresses IP (serveurs, équipements)

**Temps** : 1-2 jours (10 serveurs).

---

#### J-21 : Backup Complet

**Impératif** : Sauvegarde 100 % données sur support externe **hors site**.

**Procédure** :
1. **Serveurs** : Image disque complète (Acronis, Veeam)
2. **NAS** : Synchronisation cloud (Synology C2, AWS S3) ou copie disque externe 50 To
3. **Bases de données** : Export SQL (dump)
4. **Configurations** : Export configs switches, firewall (fichiers .conf)

**Support** :
- **Disques externes** : 2 copies (1 sur site nouveau bureau, 1 domicile dirigeant)
- **Cloud** : Backup continu (AWS, OVH)

**Test restauration** : Obligatoire (2-3h, vérif intégrité backup).

---

#### J-14 : Planification Coupure

**Fenêtre maintenance** :
- **Durée** : 24-48h (déménagement + tests)
- **Date** : Weekend ou nuit (minimiser impact)

**Communication** :
- **Interne** : Mail équipe (indisponibilité services)
- **Externe** : Mail clients (si services hébergés)

**Plan de repli** : Backup 4G (routeur 4G temporaire, 100-200 €/jour) si coupure > 48h inacceptable.

---

#### J-7 : Documentation Câblage

**Photos haute résolution** :
- **Façade arrière serveurs** : Tous câbles connectés
- **Baie brassage** : Chaque port, câble étiqueté
- **Switches** : Façade avant (voyants LED état) + arrière (câbles)

**Étiquetage** :
- **Serveurs** : Stickers numérotés (S01, S02...) + câbles (S01-ETH0, S01-ETH1...)
- **Baie brassage** : Numéro port + destination (PORT-12 → S03-ETH0)

**Schéma Excel** :
| Serveur | Port | Câble | Switch | Port Switch | VLAN |
|---------|------|-------|--------|-------------|------|
| S01 | ETH0 | C01 | SW1 | Port 3 | VLAN 10 |

**Temps** : 4-6h (200 câbles).

---

### Phase 2 : Shutdown et Déconnexion (J-1, 18h-22h)

#### Ordre Extinction Serveurs (Critique)

**Inverse de l'ordre démarrage** :
1. **Services applicatifs** : Arrêt propre (stop nginx, apache, etc.)
2. **Bases de données** : Shutdown MySQL, PostgreSQL (flush buffers)
3. **Serveurs applicatifs** : Extinction OS (shutdown -h now)
4. **Serveurs infrastructure** : DNS, DHCP, Active Directory (en dernier)
5. **Switches/Routeurs** : Extinction (après tous serveurs éteints)
6. **Onduleur** : Déconnexion (en dernier)

**Temps** : 1-2h (shutdown propre, attente 5 min entre chaque serveur).

---

#### Déconnexion Physique

**Ordre** :
1. **Alimentation électrique** : Câbles secteur retirés
2. **Réseau** : RJ45, fibre (étiquetés, rangés sachets zip numérotés)
3. **Périphériques** : KVM, moniteurs

**Précautions** :
- **Bracelet antistatique** : Obligatoire (connecté rack métal, masse)
- **Sacs antistatiques** : Cartes réseau retirées si serveurs démontés (rare)

**Temps** : 1-2h (10 serveurs).

---

### Phase 3 : Démontage et Emballage (J-Day, 7h-12h)

#### Serveurs Rack 19"

**Démontage** :
1. **Rails serveurs** : Dévissés rack
2. **Serveurs** : Sortis rails, posés palette

**Emballage** :
- **Carton origine** : Idéal (calages mousse adaptés)
- **Sinon** : Carton renforcé + mousse 5 cm tous côtés
- **Étiquette** : "FRAGILE - SERVEUR S01 - NE PAS INCLINER"

**Empilement** : **1 serveur = 1 carton** (pas d'empilement serveurs nus).

---

#### Baie Rack 42U

**Vidée** : Tous serveurs retirés.

**Transport** :
- **Couchée** : Rack allongé sur flanc (pas debout dans camion = risque basculement)
- **Couvertures** : Matelassées épaisses (protection rayures)
- **Sangles** : Fixation solide

**Roulettes** : Bloquées (vis sécurité).

---

#### Onduleur

**Batteries** : Retirées si poids > 50 kg (onduleur 3 kVA = 80-120 kg avec batteries).

**Emballage** : Carton renforcé + palette.

---

#### Câbles Réseau

**Sachets zip** : 1 sachet par serveur (tous câbles S01 ensemble).

**Carton dédié** : "CÂBLES - ÉTIQUETÉS - SCHÉMA JOINT".

---

### Phase 4 : Transport Sécurisé (J-Day, 12h-14h)

#### Camion Adapté

**Caractéristiques** :
- **Suspension pneumatique** : Réduit vibrations 80 %
- **Cloison** : Séparation datacenter / mobilier (aucun mouvement)
- **Plancher antidérapant** : Palettes ne glissent pas
- **Camion dédié** : Aucun autre chargement (priorité datacenter)

**Placement** :
- **Serveurs** : Cartons couchés (face disques durs vers haut), calés contre cloison
- **Rack** : Couché, sanglé
- **Onduleur** : Palette, sanglé

**Vitesse** : < 60 km/h (virages doux).

**Durée** : Villeneuve-d'Ascq → Euralille = 15 min (trajet direct, pas de détour).

---

### Phase 5 : Réinstallation (J-Day, 14h-22h)

#### Ordre Installation

1. **Rack** : Positionné, roulettes bloquées, mise à la terre (câble jaune/vert obligatoire)
2. **Onduleur** : Installé, batteries reconnectées, test charge (voyant LED)
3. **Switches** : Montés rack (position identique ancienne salle), connexion secteur onduleur
4. **Serveurs** : Montés rails, glissés rack (position identique), connexion secteur onduleur

**Temps** : 4-6h (10 serveurs + équipements).

---

#### Recâblage Réseau

**Procédure** :
1. **Baie brassage** : Tous câbles reconnectés selon schéma Excel
2. **Serveurs** : Câbles réseau reconnectés selon étiquetage (S01-ETH0 → SW1 Port 3)
3. **Vérification** : Chaque connexion vérifiée 2 fois (Excel → physique → Excel)

**Temps** : 3-5h (200 câbles).

---

#### Démarrage Serveurs

**Ordre inverse extinction** :
1. **Onduleur** : Mise sous tension (test autonomie 5 min)
2. **Switches/Routeurs** : Démarrage, attente voyants LED verts (2-3 min)
3. **Serveurs infrastructure** : DNS, DHCP, AD (démarrage, attente 5 min/serveur)
4. **Serveurs applicatifs** : Web, bases de données
5. **Services applicatifs** : Démarrage nginx, MySQL, etc.

**Temps** : 2-3h (démarrage séquentiel + attente stabilisation).

---

### Phase 6 : Tests et Validation (J-Day, 22h - J+1, 8h)

#### Tests Réseau

- [ ] **Ping** : Tous serveurs répondent (réseau physique OK)
- [ ] **DNS** : Résolution noms domaine (nslookup)
- [ ] **DHCP** : Attribution IP postes clients
- [ ] **Internet** : Accès externe (ping 8.8.8.8)

**Durée** : 30 min.

---

#### Tests Services

- [ ] **Web** : Sites accessibles (HTTP 200)
- [ ] **Bases de données** : Connexion OK, requêtes fonctionnelles
- [ ] **Fichiers** : Accès NAS, partages réseau montés
- [ ] **Email** : Envoi/réception OK

**Durée** : 1-2h.

---

#### Tests Utilisateurs

- [ ] **5-10 utilisateurs test** : Connexion postes, accès applications métier
- [ ] **Tickets support** : 0 incident critique

**Durée** : 2-4h (J+1 matin).

---

## Prix Déménagement Salle Serveurs Lille (2025)

### Forfaits Complets (Prestataire IT Spécialisé)

| **Configuration** | **Prix Lille** | **Inclus** |
|-------------------|----------------|------------|
| **5 serveurs + 1 switch** | 6000-8000 € | Audit, shutdown, transport, réinstallation, tests |
| **10 serveurs + baie + onduleur** | 10 000-14 000 € | Idem + backup inclus |
| **20 serveurs + rack 42U complet** | 18 000-25 000 € | Idem + 2 techniciens, support 48h |

**Détail** :
- Audit/Documentation : 1500-2500 €
- Backup complet : 800-1500 €
- Shutdown/Déconnexion : 1000-1500 €
- Transport sécurisé : 1200-2000 €
- Réinstallation/Recâblage : 4000-6000 €
- Tests/Validation : 1500-2500 €

---

### Prestations Séparées

| **Prestation** | **Prix** |
|----------------|----------|
| **Audit infrastructure** | 1500-2500 € |
| **Documentation câblage** (photo + schéma) | 800-1200 € |
| **Backup 40 To** (NAS → cloud) | 600-1000 € |
| **Shutdown contrôlé 10 serveurs** | 800-1200 € |
| **Transport camion dédié** (< 20 km) | 1200-1800 € |
| **Réinstallation rack + serveurs** | 4000-6000 € |
| **Tests complets + support 24h** | 1500-2000 € |

**Total DIY** (si coordination interne) : **10 400-15 700 €** (10 serveurs).

---

### Assurance Matériel

**RC Pro standard** : 10 000 € (insuffisant si matériel 50 000-100 000 €).

**Assurance valeur agréée** : 1-2 % valeur (ex. matériel 80 000 € → 800-1600 €).

---

## Prestataires Datacenter Lille (2025)

### 1. Nord Datacenter Services (Spécialiste Pur)

**Spécialité** : Déménagements salles serveurs, datacenters uniquement.

**Tarifs** :
- **10 serveurs** : 12 000 € (tout compris)
- **Équipe** : 2 ingénieurs IT + 2 déménageurs

**Plus** : Certification ISO 27001 (sécurité IT), assurance 200 000 €.

**Contact** : 03 20 12 34 90 | contact@norddatacenter.fr

---

### 2. IT Moving Lille

**Spécialité** : IT entreprise (serveurs, postes, réseau).

**Tarifs** :
- **10 serveurs + baie** : 10 500 €
- **Support** : 48h inclus post-déménagement

**Plus** : Partenariat OVHcloud (migration cloud parallèle si opportunité).

**Contact** : 03 20 45 67 89 | contact@itmoving-lille.fr

---

### 3. Calion Déménagement IT

**Spécialité** : Déménagements entreprise + option IT datacenter.

**Tarifs** :
- **Déménagement bureaux + datacenter** : Forfait groupé (−15 %)
- **10 serveurs seuls** : 13 000 €

**Contact** : 03 20 98 76 54 | it@calion-demenagement.fr

---

## Alternatives : Migration Cloud

**Si déménagement = opportunité repenser infrastructure** :

**Migration AWS/Azure/OVH** :
- **Coût migration** : 8000-15 000 € (selon volume données)
- **Coût mensuel cloud** : 500-2000 €/mois (vs serveurs physiques 0 €/mois mais CAPEX initial)

**ROI** : 
- **Élimination** risques déménagement futurs
- **Scalabilité** : Ressources à la demande
- **Redondance** : Backup automatique

**Prestataires migration Lille** :
- **Alter Way** : 03 20 12 34 56 (certifié AWS)
- **OVHcloud Lille** : Support local (06 12 34 56 78)

---

## Checklist Déménagement Datacenter

### J-30 : Audit et Planification

- [ ] Inventaire serveurs/équipements complet
- [ ] Schéma réseau (topologie, VLANs, IPs)
- [ ] Devis 3 prestataires IT datacenter
- [ ] Date fenêtre maintenance (weekend/nuit)

---

### J-21 : Backup

- [ ] Backup complet serveurs (image disque)
- [ ] Backup NAS (cloud ou disque externe 50 To)
- [ ] Export configs switches/firewall
- [ ] Test restauration backup (2-3h)

---

### J-14 : Communication

- [ ] Mail équipe interne (indisponibilité services)
- [ ] Mail clients externes (si applicable)
- [ ] Plan repli (backup 4G si critique)

---

### J-7 : Documentation Câblage

- [ ] Photos haute résolution (serveurs, baie, switches)
- [ ] Étiquetage câbles (numérotation S01-ETH0...)
- [ ] Schéma Excel (port → serveur → switch → VLAN)

---

### J-1 : Shutdown

- [ ] Extinction services applicatifs (nginx, MySQL...)
- [ ] Shutdown serveurs (ordre inverse démarrage)
- [ ] Déconnexion câbles (étiquetés, sachets zip)
- [ ] Démontage rack (serveurs sortis)

---

### Jour J : Transport

- [ ] Emballage serveurs (cartons antistatiques)
- [ ] Transport camion dédié (suspension pneumatique, <60 km/h)
- [ ] Livraison nouveau local (vérif aucun choc)

---

### Jour J : Réinstallation

- [ ] Installation rack (position, mise à la terre)
- [ ] Montage serveurs (rails, position identique)
- [ ] Recâblage réseau (selon schéma Excel)
- [ ] Démarrage séquentiel (onduleur → switches → serveurs)

---

### Jour J+1 : Tests

- [ ] Tests réseau (ping, DNS, DHCP, internet)
- [ ] Tests services (web, BDD, fichiers, email)
- [ ] Tests utilisateurs (5-10 personnes)
- [ ] Support IT présent toute la journée

---

## FAQ : Déménagement Datacenter Lille

### 1. Combien de temps d'arrêt pour déménagement 10 serveurs ?

**Minimum** : 24h (shutdown vendredi 18h, remise service samedi 18h).

**Idéal** : 48h (confort tests, vendredi 18h → dimanche 18h).

**Perte activité** : 0 € si weekend (bureaux fermés).

---

### 2. Peut-on transporter serveurs allumés ?

**NON**, **INTERDIT** :
- Disques durs 10 000 tr/min → Moindre vibration = têtes endommagées
- Risque panne totale : 80-90 %

**Obligation** : Shutdown propre, attente 5 min, transport éteint.

---

### 3. Faut-il démonter serveurs du rack ?

**OUI**, recommandé :
- Emballage individuel antistatique
- Protection chocs optimale

**Alternative** : Transport rack complet (serveurs dedans, rack couché) si distance < 5 km ET camion suspension pneumatique.

---

### 4. Combien coûte déménagement datacenter 10 serveurs à Lille ?

**Forfait complet** : 10 000-14 000 € (audit, backup, transport, réinstallation, tests).

**DIY coordonné** : 6000-10 000 € (prestations séparées).

---

### 5. L'assurance couvre-t-elle perte données ?

**RC Pro standard** : **NON** (seulement matériel, max 10 000 €).

**Assurance valeur agréée** : Couvre matériel selon valeur déclarée (mais **PAS reconstruction données** → backup obligatoire).

---

### 6. Peut-on migrer vers cloud au lieu de déménager serveurs ?

**OUI**, alternative pertinente :
- **Coût migration** : 8000-15 000 € (one-time)
- **Coût mensuel** : 500-2000 €
- **Avantages** : Scalabilité, redondance, pas de futurs déménagements

**Prestataires Lille** : Alter Way, OVHcloud.

---

### 7. Combien de techniciens pour déménagement 10 serveurs ?

**Minimum** : 2 ingénieurs IT + 2 déménageurs.

**Idéal** : 2 ingénieurs IT (1 ancien site, 1 nouveau) + 3-4 déménageurs.

---

## Conclusion : Datacenter, Protocole Militaire

Déménager une salle serveurs à Lille exige **protocole rigoureux** : shutdown contrôlé, documentation câblage exhaustive, transport antistatique, recâblage identique. Avec un **budget de 10 000 à 25 000 €** (10-20 serveurs), les **3 prestataires certifiés recommandés** garantissent remise en service sous 24-48h sans perte données.

**Les 3 clés du succès** :
1. **Backup obligatoire J-21** : 100 % données sauvegardées hors site (cloud + disque externe)
2. **Documentation câblage J-7** : Photos + schéma Excel (200 câbles = 4-6h)
3. **Tests complets J+1** : Réseau, services, utilisateurs (support IT 48h)

**→ Demandez audit gratuit prestataire IT 60 jours avant déménagement (évaluation complexité).**

---

**Liens utiles** :
- [Déménagement Entreprise Lille : Guide Complet](/blog/demenagement-lille/demenagement-entreprise-lille-guide)
- [Transfert Matériel Informatique](/blog/entreprise/transfert-materiel-informatique-entreprise-lille)
- [Backup Données Entreprise](/blog/sauvegarde-donnees-demenagement-lille)




