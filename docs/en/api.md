# Student API Documentation

## Shared JSON format
```json
{
  "id": 1,
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, unique)",
  "phone": "string (required)",
  "enrollmentDate": "date (required)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## REST Endpoints (identical for all backends)

- `GET    /api/students` : List all students
- `GET    /api/students/{id}` : Get student details
- `POST   /api/students` : Add a student
- `PUT    /api/students/{id}` : Update a student
- `DELETE /api/students/{id}` : Delete a student

### Endpoint details

#### GET /api/students
- Response: array of students
- Code 200

#### GET /api/students/{id}
- Response: student object
- Code 200 or 404 if not found

#### POST /api/students
- Body: student object (without id, createdAt, updatedAt)
- Response: created student
- Code 201
- Errors: 400 (validation), 409 (email already used)

#### PUT /api/students/{id}
- Body: student object (without id, createdAt, updatedAt)
- Response: updated student
- Code 200 or 404

#### DELETE /api/students/{id}
- Response: empty
- Code 204 or 404

### Common error codes
- 400: Invalid data
- 404: Student not found
- 409: Email already used
- 500: Server error

### Swagger
- Node.js: `/api-docs`
- .NET: `/swagger`
- Spring Boot: `/swagger-ui.html` (if enabled)
