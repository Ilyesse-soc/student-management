# CI/CD Configuration - Student Management

## 🚀 Workflows GitHub Actions

Ce projet utilise GitHub Actions pour automatiser les tests, la qualité du code et le déploiement.

### 📋 Workflows disponibles

#### 1. **CI/CD Principal** (`ci-cd.yml`)
Déclenché sur chaque push et pull request vers `main` ou `develop`.

**Jobs :**
- ✅ Test Backend Node.js (Express + Prisma)
- ✅ Test Backend .NET Core
- ✅ Test Backend Spring Boot
- ✅ Test & Build Frontend Next.js
- ✅ Build des images Docker
- ✅ Validation docker-compose

**Services :**
- MySQL 8.0 (pour les tests)

#### 2. **Auto-Sync** (`auto-sync.yml`)
Synchronise automatiquement la branche `develop` avec `main`.

**Déclencheurs :**
- Push sur `develop`
- Tous les jours à minuit (cron)

#### 3. **Code Quality** (`code-quality.yml`)
Vérifie la qualité du code et détecte les problèmes.

**Vérifications :**
- 🔍 Détection de fichiers volumineux
- 🔒 Détection de secrets exposés
- 📊 Comptage des lignes de code
- 📁 Vérification de la structure

#### 4. **Database Check** (`database-check.yml`)
Vérifie les migrations de base de données.

**Déclencheurs :**
- Pull requests modifiant :
  - `backend-node/prisma/**`
  - `backend-dotnet/Data/**`
  - `backend-springboot/src/main/resources/**`
  - `infra/mysql/**`

**Vérifications :**
- ✅ Validation du schéma Prisma
- ✅ Format du schéma Prisma
- ✅ Exécution des migrations
- ✅ État de la base de données

## 🔧 Configuration requise

### Variables d'environnement GitHub
Aucune variable secrète requise pour l'instant. Le workflow utilise `GITHUB_TOKEN` automatiquement fourni.

### Badges de statut
Ajoutez ces badges à votre README principal :

```markdown
![CI/CD](https://github.com/VOTRE-USERNAME/student-management/actions/workflows/ci-cd.yml/badge.svg)
![Code Quality](https://github.com/VOTRE-USERNAME/student-management/actions/workflows/code-quality.yml/badge.svg)
```

## 📝 Utilisation

### Pour déclencher les workflows :

1. **Push sur main/develop**
   ```bash
   git add .
   git commit -m "feat: nouvelle fonctionnalité"
   git push origin main
   ```

2. **Créer une Pull Request**
   - Les workflows s'exécutent automatiquement
   - Le merge est bloqué si les tests échouent

3. **Forcer le re-run**
   - Aller dans l'onglet "Actions" sur GitHub
   - Sélectionner le workflow
   - Cliquer "Re-run all jobs"

## 🚦 Status des jobs

Les workflows affichent :
- ✅ **Success** : Tous les tests passent
- ❌ **Failed** : Au moins un test échoue
- 🟡 **Pending** : En cours d'exécution
- ⏭️ **Skipped** : Job ignoré (conditions non remplies)

## 🔄 Workflow de développement recommandé

1. **Créer une branche feature**
   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalité
   ```

2. **Développer et commiter**
   ```bash
   git add .
   git commit -m "feat: ajout de ma fonctionnalité"
   git push origin feature/ma-nouvelle-fonctionnalité
   ```

3. **Créer une Pull Request**
   - Les workflows de test s'exécutent automatiquement
   - Vérifier les résultats dans l'onglet "Checks"

4. **Merger si les tests passent**
   ```bash
   git checkout main
   git merge feature/ma-nouvelle-fonctionnalité
   git push origin main
   ```

## 📊 Monitoring

### Voir les logs
1. Aller sur GitHub → Onglet "Actions"
2. Sélectionner le workflow
3. Cliquer sur le job pour voir les logs détaillés

### Notifications
- Recevoir des emails sur les échecs (configuration GitHub)
- Intégrer avec Slack/Discord (via webhooks)

## 🛠️ Maintenance

### Mettre à jour les versions
- Node.js : Modifier `node-version` dans les workflows
- .NET : Modifier `dotnet-version`
- Java : Modifier `java-version`

### Ajouter de nouveaux tests
1. Ajouter des scripts de test dans `package.json`
2. Le workflow CI/CD les exécutera automatiquement

## 📚 Ressources

- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
