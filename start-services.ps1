# Script de démarrage pour Student Management
# Lance tous les services dans des fenêtres séparées

Write-Host "=== LANCEMENT DE STUDENT MANAGEMENT ===" -ForegroundColor Blue
Write-Host "`n1. Démarrage de MySQL (Docker)..." -ForegroundColor Cyan
Set-Location -Path "d:\epreuvefinal-devopscicd\student-management\infra\docker-compose"
docker-compose -f docker-compose.dev.yml up mysql -d

Write-Host "`n2. Attente du démarrage de MySQL..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "`n3. Lancement du Backend Node.js (Port 3001)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'd:\epreuvefinal-devopscicd\student-management\backend-node'; Write-Host '=== Backend Node.js - Port 3001 ===' -ForegroundColor Green; npm run dev"

Write-Host "`n4. Lancement du Frontend Next.js (Port 3000)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location 'd:\epreuvefinal-devopscicd\student-management\frontend'; Write-Host '=== Frontend Next.js - Port 3000 ===' -ForegroundColor Magenta; npm run dev"

Write-Host "`n✓ Services lancés dans des fenêtres séparées!" -ForegroundColor Green
Write-Host "`nAttente de 15 secondes pour le démarrage complet..."
Start-Sleep -Seconds 15

Write-Host "`n=== STATUT DES SERVICES ===" -ForegroundColor Blue
Write-Host "`nMySQL:" -NoNewline
docker ps --filter "name=mysql" --format " ✓ {{.Status}}"

Write-Host "Backend Node (3001):" -NoNewline
try {
    Invoke-WebRequest -Uri 'http://localhost:3001/api/students' -TimeoutSec 2 -UseBasicParsing | Out-Null
    Write-Host " ✓ ACTIF" -ForegroundColor Green
} catch {
    Write-Host " ✗ Pas encore prêt" -ForegroundColor Yellow
}

Write-Host "Frontend (3000):" -NoNewline
try {
    Invoke-WebRequest -Uri 'http://localhost:3000' -TimeoutSec 2 -UseBasicParsing | Out-Null
    Write-Host " ✓ ACTIF" -ForegroundColor Green
} catch {
    Write-Host " ✗ Pas encore prêt" -ForegroundColor Yellow
}

Write-Host "`n=== URLS D'ACCÈS ===" -ForegroundColor Cyan
Write-Host "Frontend:     http://localhost:3000"
Write-Host "API Node.js:  http://localhost:3001/api/students"
Write-Host "Swagger Node: http://localhost:3001/api-docs"

Write-Host "`nNote: Les backends .NET et Spring Boot nécessitent que dotnet et Java soient installés" -ForegroundColor Yellow
