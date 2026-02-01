-- Création des bases de données
CREATE DATABASE IF NOT EXISTS StudentManagement_DEV CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS StudentManagement_UAT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS StudentManagement_PRD CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base DEV pour l'initialisation
USE StudentManagement_DEV;

-- Création de la table students
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    enrollmentDate DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Index sur email et enrollmentDate
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_enrollmentDate ON students(enrollmentDate);

-- Données de test
INSERT INTO students (firstName, lastName, email, phone, enrollmentDate)
VALUES
('Alice', 'Durand', 'alice.durand@efrei.fr', '0601020304', '2023-09-01'),
('Benoît', 'Martin', 'benoit.martin@efrei.fr', '0605060708', '2024-01-15'),
('Chloé', 'Petit', 'chloe.petit@efrei.fr', '0608091011', '2023-09-01');

-- Réplication pour UAT et PRD
USE StudentManagement_UAT;
CREATE TABLE IF NOT EXISTS students LIKE StudentManagement_DEV.students;
INSERT INTO students SELECT * FROM StudentManagement_DEV.students;

USE StudentManagement_PRD;
CREATE TABLE IF NOT EXISTS students LIKE StudentManagement_DEV.students;
INSERT INTO students SELECT * FROM StudentManagement_DEV.students;
