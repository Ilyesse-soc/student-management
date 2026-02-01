# Deployment Guide

## Docker Compose (DEV)
1. Start the stack:
   ```
   docker-compose -f infra/docker-compose/docker-compose.dev.yml up --build
   ```
2. Check logs and service status:
   ```
   docker-compose ps
   docker-compose logs -f
   ```
3. Access the frontend at http://localhost:3000

## Kubernetes (Minikube)
1. Start Minikube and enable ingress:
   ```
   minikube start
   minikube addons enable ingress
   ```
2. Apply all manifests:
   ```
   kubectl apply -f infra/k8s/
   ```
3. Check pods and services:
   ```
   kubectl get all -n student-management
   kubectl get ingress -n student-management
   ```
4. Add to `/etc/hosts`:
   ```
   127.0.0.1 student-management.local
   ```
5. Access http://student-management.local:3000

## GitLab CI/CD
- The `.gitlab-ci.yml` pipeline handles: build, test, build images, push to registry, Docker Compose and Kubernetes deployment
- Manual deployment via GitLab (deploy stages)

## Common issues
- If a pod fails to start, check logs with `kubectl logs`
- For autoscaling, check HPA with `kubectl get hpa -n student-management`
- For any question, see the documentation or contact the team
