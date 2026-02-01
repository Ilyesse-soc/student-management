Student Management

Projet réalisé dans le cadre du cursus EFREI (module DevOps / CI-CD).

L’objectif du projet est de mettre en place une application de gestion d’étudiants avec une architecture multi-technologies, ainsi qu’une chaîne CI/CD complète sous GitLab.

Présentation du projet

Le projet est organisé sous forme de monorepo et comprend :

un frontend en Next.js,

plusieurs backends (Node.js, .NET, Spring Boot),

une base de données MySQL,

une infrastructure Docker et une pipeline CI/CD GitLab.

Chaque partie du projet est indépendante et communique via des API REST.

Architecture du dépôt
student-management/
├── frontend/              # Frontend Next.js
├── backend-node/          # Backend Node.js (Express + Prisma)
├── backend-dotnet/        # Backend .NET
├── backend-springboot/    # Backend Spring Boot
├── infra/
│   ├── docker-compose/
│   └── k8s/
├── docs/
├── .gitlab-ci.yml
├── .gitignore
└── README.md

Technologies utilisées

Frontend : Next.js, TypeScript

Backend Node.js : Express, Prisma

Backend .NET

Backend Spring Boot

Base de données : MySQL

DevOps : Docker, Docker Compose, GitLab CI/CD, GitLab Container Registry

Orchestration (optionnel) : Kubernetes / Minikube

Lancement du projet en local

⚠️ Les services doivent être lancés dans des terminaux séparés.

Base de données
docker-compose -f infra/docker-compose/docker-compose.dev.yml up -d mysql

Backend Node.js
cd backend-node
npm install
npm run dev


API disponible sur :

http://localhost:3001/api/students

Frontend
cd frontend
npm install
npm run dev


Application disponible sur :

http://localhost:3000


Le frontend communique avec le backend via la variable NEXT_PUBLIC_API_URL.

CI/CD – Phase 8

Le projet intègre une pipeline CI/CD GitLab complète définie dans le fichier .gitlab-ci.yml.

Étapes principales du pipeline

build des différents services,

tests (frontend et backend Spring Boot),

build et push des images Docker vers le GitLab Container Registry,

déploiement manuel via Docker Compose ou Kubernetes.

Un GitLab Runner Docker dédié est configuré et rattaché au projet.

Documentation

La documentation technique est disponible dans le dossier docs/ :

architecture,

installation,

déploiement,

audit final du cahier des charges.

Auteur

Projet réalisé par Ilyesse
EFREI

Statut

Projet fonctionnel et conforme au cahier des charges.
Pipeline CI/CD opérationnel.