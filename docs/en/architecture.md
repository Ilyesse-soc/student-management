# Project Architecture

## Overview
Microservices platform: Next.js frontend, 3 backends (Node.js, .NET, Spring Boot), MySQL database, orchestrated by Docker/Kubernetes.

## Global diagram
```
[ User ]
   |
[ Ingress ]
   |
-------------------------------
|     |      |        |
[FE] [Node] [.NET] [Spring]
     \    |    /
      [ MySQL ]
```

## Service details
- **frontend/**: Next.js 14, React 18, Tailwind CSS
- **backend-node/**: Node.js 18, Express, Prisma
- **backend-dotnet/**: ASP.NET Core 7, EF Core
- **backend-springboot/**: Spring Boot 3.1, JPA
- **infra/**: Docker Compose, Kubernetes, DB scripts

## Main flow
1. User interacts with the frontend (port 3000)
2. Frontend calls the chosen backend REST API (/api/students)
3. Backends access MySQL (port 3306)
4. Responses are displayed in the UI

## Database
- 3 databases: StudentManagement_DEV, UAT, PRD
- Table students: id, firstName, lastName, email, phone, enrollmentDate, createdAt, updatedAt
- Index on email and enrollmentDate

## Orchestration
- Docker Compose for DEV
- Kubernetes (Minikube) for prod/presentation
- Healthchecks, scaling, ingress, HPA

## CI/CD
- GitLab multi-stage pipeline (build, test, docker, deploy)

## Security & best practices
- Input validation
- Structured logging
- Environment variables
- No hardcoded passwords
