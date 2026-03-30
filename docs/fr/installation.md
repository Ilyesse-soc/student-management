# Guide d’installation

## Prérequis
- Docker Desktop
- Node.js 18+
- .NET 7 SDK
- Java 21 JDK
- Maven 3.9+
- Minikube
- kubectl

## Installation locale (DEV)
1. Cloner le dépôt :
   ```
   git clone <url-du-repo>
   cd student-management
   ```
2. Lancer la stack Docker Compose :
   ```
   docker-compose -f infra/docker-compose/docker-compose.dev.yml up --build
   ```
3. Accéder au frontend sur http://localhost:3000

## Installation Kubernetes (Minikube)
1. Démarrer Minikube :
   ```
   minikube start
   minikube addons enable ingress
   ```
2. Appliquer les manifests :
   ```
   kubectl apply -f infra/k8s/
   ```
3. Ajouter dans `/etc/hosts` :
   ```
   127.0.0.1 student-management.local
   ```
4. Accéder à http://student-management.local:3000

## Variables d’environnement
- Voir les fichiers `.env.example` dans chaque dossier de service.

## Problèmes courants
- Vérifier que tous les ports sont libres (3000, 3001, 3002, 3003, 3309)
- Si un service ne démarre pas, consulter les logs Docker/Kubernetes
- Pour toute question, voir la documentation dans `docs/fr/` ou demander à l’équipe
