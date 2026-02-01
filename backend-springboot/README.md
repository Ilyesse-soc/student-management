# Backend Spring Boot – Student Management

Backend Java Spring Boot 3.1 pour la gestion des étudiants.

## Lancement local

1. Installer les dépendances :
   ```
   ./mvnw clean install
   ```
2. Lancer le serveur en développement :
   ```
   ./mvnw spring-boot:run
   ```
3. Accéder à l’API :
   - http://localhost:3003/api/students
   - Actuator health : http://localhost:3003/actuator/health

## Build production

1. Compiler le code :
   ```
   ./mvnw clean package -DskipTests
   ```
2. Lancer le JAR :
   ```
   java -jar target/*.jar
   ```

## Variables d’environnement
- Voir `src/main/resources/application-dev.properties`

## Structure du code
- `controller/` : contrôleurs REST
- `model/` : entités JPA
- `repository/` : accès base
- `service/` : logique métier
