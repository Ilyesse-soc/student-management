# Backend Node.js – Student Management

Backend Node.js (Express + Prisma) pour la gestion des étudiants.

## Lancement local

1. Installer les dépendances :
   ```
   npm ci
   ```
2. Générer le client Prisma :
   ```
   npx prisma generate
   ```
3. Lancer le serveur en développement :
   ```
   npm run dev
   ```
4. Accéder à l’API :
   - http://localhost:3001/api/students
   - Swagger : http://localhost:3001/api-docs
   - Healthcheck : http://localhost:3001/health

## Build production

1. Compiler le code :
   ```
   npm run build
   ```
2. Lancer en mode production :
   ```
   npm start
   ```

## Variables d’environnement
- Voir `.env.example` et `.env`

## Migration de la base
- Adapter la connexion dans `.env`
- Appliquer les migrations Prisma si besoin

## Structure du code
- `src/controllers/` : logique métier
- `src/routes/` : routes Express
- `src/services/` : services (non utilisé ici)
- `src/middlewares/` : middlewares Express
- `src/config/` : configuration (logger, prisma)
