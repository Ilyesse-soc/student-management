# Documentation de l’API Étudiants

## Format JSON partagé
```json
{
  "id": 1,
  "firstName": "string (obligatoire)",
  "lastName": "string (obligatoire)",
  "email": "string (obligatoire, unique)",
  "phone": "string (obligatoire)",
  "enrollmentDate": "date (obligatoire)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Endpoints REST (identiques sur tous les backends)

- `GET    /api/students` : Liste tous les étudiants
- `GET    /api/students/{id}` : Détail d’un étudiant
- `POST   /api/students` : Ajout d’un étudiant
- `PUT    /api/students/{id}` : Modification d’un étudiant
- `DELETE /api/students/{id}` : Suppression d’un étudiant

### Détail des endpoints

#### GET /api/students
- Réponse : tableau d’étudiants
- Code 200

#### GET /api/students/{id}
- Réponse : objet étudiant
- Code 200 ou 404 si non trouvé

#### POST /api/students
- Corps : objet étudiant (sans id, createdAt, updatedAt)
- Réponse : étudiant créé
- Code 201
- Erreurs : 400 (validation), 409 (email déjà utilisé)

#### PUT /api/students/{id}
- Corps : objet étudiant (sans id, createdAt, updatedAt)
- Réponse : étudiant modifié
- Code 200 ou 404

#### DELETE /api/students/{id}
- Réponse : vide
- Code 204 ou 404

### Codes d’erreur courants
- 400 : Données invalides
- 404 : Étudiant non trouvé
- 409 : Email déjà utilisé
- 500 : Erreur serveur

### Swagger
- Node.js : `/api-docs`
- .NET : `/swagger`
- Spring Boot : `/swagger-ui.html` (si activé)

---
Pour toute question, voir le code source ou contacter l’équipe.
