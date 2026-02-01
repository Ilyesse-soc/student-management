# Installation Guide

## Prerequisites
- Docker Desktop
- Node.js 18+
- .NET 7 SDK
- Java 21 JDK
- Maven 3.9+
- Minikube
- kubectl

## Local installation (DEV)
1. Clone the repository:
   ```
   git clone <repo-url>
   cd student-management
   ```
2. Start the Docker Compose stack:
   ```
   docker-compose -f infra/docker-compose/docker-compose.dev.yml up --build
   ```
3. Access the frontend at http://localhost:3000

## Kubernetes (Minikube) installation
1. Start Minikube:
   ```
   minikube start
   minikube addons enable ingress
   ```
2. Apply manifests:
   ```
   kubectl apply -f infra/k8s/
   ```
3. Add to `/etc/hosts`:
   ```
   127.0.0.1 student-management.local
   ```
4. Access http://student-management.local:3000

## Environment variables
- See `.env.example` files in each service folder.

## Common issues
- Make sure all ports are free (3000, 3001, 3002, 3003, 3306)
- If a service fails to start, check Docker/Kubernetes logs
- For any question, see the documentation in `docs/en-us/` or ask the team
