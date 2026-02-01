# Backend .NET – Student Management

Backend ASP.NET Core 7 (C#) pour la gestion des étudiants.

## Lancement local

1. Installer les dépendances :
   ```
   dotnet restore
   ```
2. Lancer le serveur en développement :
   ```
   dotnet run --project backend-dotnet
   ```
3. Accéder à l’API :
   - http://localhost:3002/api/students
   - Swagger : http://localhost:3002/swagger
   - Healthcheck : http://localhost:3002/health

## Build production

1. Compiler le code :
   ```
   dotnet build -c Release
   ```
2. Publier :
   ```
   dotnet publish -c Release -o ./publish
   ```

## Variables d’environnement
- Voir `appsettings.Development.json`

## Structure du code
- `Controllers/` : contrôleurs API
- `Models/` : entités EF
- `Data/` : DbContext
- `Services/` : logique métier
