# Architecture du projet Student Management

## Vue d’ensemble
Plateforme microservices : frontend Next.js, 3 backends (Node.js, .NET, Spring Boot), base MySQL, orchestrée par Docker/Kubernetes.

## Schéma global
```
[ Utilisateur ]
      |
   [ Ingress ]
      |
  -----------------------------
  |      |        |         |
[FE]   [Node]   [.NET]   [Spring]
      \      |      /
        [ MySQL ]
```

## Détail des services
- **frontend/** : Next.js 14, React 18, Tailwind CSS
- **backend-node/** : Node.js 18, Express, Prisma
- **backend-dotnet/** : ASP.NET Core 7, EF Core
- **backend-springboot/** : Spring Boot 3.1, JPA
- **infra/** : Docker Compose, Kubernetes, scripts DB

## Flux principal
1. L’utilisateur interagit avec le frontend (port 3000)
2. Le frontend appelle l’API REST du backend choisi (/api/students)
3. Les backends accèdent à la base MySQL (port 3306 en interne, 3309 exposé sur l’hôte en dev)
4. Les réponses sont affichées dans l’UI

## Base de données
- 3 bases : StudentManagement_Dev, UAT, PRD
- Table students : id, firstName, lastName, email, phone, enrollmentDate, createdAt, updatedAt
- Index sur email et enrollmentDate

## Orchestration
- Docker Compose pour le DEV
- Kubernetes (Minikube) pour la prod/présentation
- Healthchecks, scaling, ingress, HPA

## CI/CD
- Pipeline GitLab multi-stage (build, test, docker, deploy)

## Sécurité & bonnes pratiques
- Validation des entrées
- Logging structuré
- Variables d’environnement
- Aucun mot de passe en dur
