# Guide de déploiement

## Docker Compose (DEV)
1. Lancer la stack :
   ```
   docker-compose -f infra/docker-compose/docker-compose.dev.yml up --build
   ```
2. Vérifier les logs et l’état des services :
   ```
   docker-compose ps
   docker-compose logs -f
   ```
3. Accéder au frontend sur http://localhost:3000

## Kubernetes (Minikube)
1. Démarrer Minikube et activer l’ingress :
   ```
   minikube start
   minikube addons enable ingress
   ```
2. Appliquer tous les manifests :
   ```
   kubectl apply -f infra/k8s/
   ```
3. Vérifier les pods et services :
   ```
   kubectl get all -n student-management
   kubectl get ingress -n student-management
   ```
4. Ajouter dans `/etc/hosts` :
   ```
   127.0.0.1 student-management.local
   ```
5. Accéder à http://student-management.local:3000

## CI/CD GitLab
- Le pipeline `.gitlab-ci.yml` gère : build, test, build images, push registry, déploiement Docker Compose et Kubernetes
- Déploiement manuel via GitLab (stages `deploy`)

## Problèmes courants
- Si un pod ne démarre pas, vérifier les logs avec `kubectl logs`
- Pour le scaling automatique, vérifier les HPA avec `kubectl get hpa -n student-management`
- Pour toute question, consulter la documentation ou contacter l’équipe
