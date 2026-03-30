# Student Management System 🎓

[![GitLab CI/CD](https://img.shields.io/badge/CI%2FCD-GitLab-orange)](https://gitlab.com/ilyesse-soc1/student-management/-/pipelines)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)](https://github.com/Ilyesse-soc/student-management/actions)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

Système de gestion d'étudiants avec architecture microservices, incluant 3 backends (Node.js, .NET, Spring Boot) et un frontend Next.js.

## 📍 Repositories

Ce projet est synchronisé sur deux plateformes:

- **🦊 GitLab (Principal)**: https://gitlab.com/ilyesse-soc1/student-management
- **🐙 GitHub (Miroir)**: https://github.com/Ilyesse-soc/student-management

### CI/CD Pipelines
- GitLab CI/CD: Pipeline avec images Docker officielles
- GitHub Actions: 4 workflows automatisés (CI/CD, sync, code quality, database checks)

## 🚀 Démarrage rapide

### Prérequis
- Docker & Docker Compose
- Node.js 18+
- .NET 8.0+ (optionnel)
- Java 17+ (optionnel)

### Installation rapide

1. **Cloner le projet**
   ```bash
   git clone https://gitlab.com/ilyesse-soc1/student-management.git
   cd student-management
   ```

2. **Lancer avec Docker Compose**
   ```bash
   cd infra/docker-compose
   docker-compose -f docker-compose.dev.yml up
   ```

3. **OU lancer avec le script PowerShell (Windows)**
   ```powershell
   .\start-services.ps1
   ```

4. **Accéder à l'application**
   - Frontend: http://localhost:3000
   - API Node.js: http://localhost:3001
   - API .NET: http://localhost:3002
   - API Spring Boot: http://localhost:3003

## 📋 Architecture

### Backend Services
- **Node.js (Express + Prisma)** - Port 3001
- **.NET Core** - Port 3002
- **Spring Boot** - Port 3003

### Frontend
- **Next.js** - Port 3000

### Base de données
- **MySQL 8.0** - Port 3309 (hôte) → 3306 (container)
- **phpMyAdmin** - http://localhost:8080

## 🔧 CI/CD

Le projet utilise deux pipelines CI/CD:

### GitLab CI/CD
Pipeline avec images Docker officielles (node:18-alpine, dotnet/sdk:8.0, maven:3.8-openjdk-17)
- ✅ Build des 4 composants (frontend + 3 backends)
- ✅ Tests avec service MySQL intégré
- ✅ Build et push Docker images
- ✅ Déploiement manuel

📊 **Pipeline**: https://gitlab.com/ilyesse-soc1/student-management/-/pipelines

### GitHub Actions
4 workflows automatisés:
- ✅ CI/CD principal (tests + build + deploy)
- ✅ Synchronisation automatique des branches
- ✅ Vérification qualité du code (ESLint, Prettier)
- ✅ Validation migrations base de données

📊 **Actions**: https://github.com/Ilyesse-soc/student-management/actions

**Voir [.github/README.md](.github/README.md) pour plus de détails**

## 🔄 Synchronisation Git

Le projet est synchronisé sur GitLab et GitHub. Scripts disponibles:

```powershell
# Synchroniser les deux repos
.\sync-repos.ps1

# Push vers GitLab uniquement
.\push-gitlab.ps1

# Configurer token GitLab
.\setup-gitlab-token.ps1 -Token "VOTRE_TOKEN"
```

### Configuration manuelle
```bash
# Voir les remotes
git remote -v

# Push vers GitLab
git push origin main

# Push vers GitHub
git push github main
```

## 📝 Scripts disponibles

### Backend Node.js
```bash
cd backend-node
npm install
npm run dev        # Mode développement
npm run build      # Build production
npm test          # Lancer les tests
```

### Backend .NET
```bash
cd backend-dotnet
dotnet restore
dotnet run        # Lancer l'application
dotnet test       # Lancer les tests
```

### Backend Spring Boot
```bash
cd backend-springboot
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev       # Mode développement
npm run build     # Build production
```

## 🗄️ Base de données

### Prisma Migrations (Node.js)
```bash
cd backend-node
npx prisma generate              # Générer le client Prisma
npx prisma migrate dev          # Créer une migration
npx prisma migrate deploy       # Appliquer les migrations
npx prisma studio              # Interface graphique
```

## 📚 Documentation

- [API Documentation](docs/fr/api.md)
- [Architecture](docs/fr/architecture.md)
- [Installation](docs/fr/installation.md)
- [Deployment](docs/fr/deployment.md)

## 🛠️ Technologies

### Backend
- Node.js + Express + TypeScript
- ASP.NET Core 8.0 + Entity Framework
- Spring Boot 3.1 + JPA

### Frontend
- Next.js 14
- React 18
- TypeScript

### Base de données
- MySQL 8.0
- Prisma ORM

### DevOps
- Docker & Docker Compose
- GitHub Actions
- Git

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changes (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT.

## 👥 Auteurs

- **Ilyesse El Adaoui** - [GitLab](https://gitlab.com/ilyesse-soc1)

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitLab.
* [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
