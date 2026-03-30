# Script de demarrage pour Student Management
# Demarre la stack via Docker Compose (portable, sans chemins codes en dur)
# Note: le service backend-dotnet est dans un profile "dotnet" car l'acces a mcr.microsoft.com
# peut etre bloque sur certains reseaux; utilise -IncludeDotnet pour l'activer.

param(
    [switch]$IncludeDotnet
)

$ErrorActionPreference = 'Stop'

$repoRoot = $PSScriptRoot
$composePath = Join-Path $repoRoot 'infra\docker-compose\docker-compose.dev.yml'

Write-Host "=== LANCEMENT DE STUDENT MANAGEMENT (Docker Compose) ===" -ForegroundColor Blue
Write-Host "Compose: $composePath" -ForegroundColor DarkGray

if (-not (Test-Path $composePath)) {
    throw "Fichier docker-compose introuvable: $composePath"
}

Write-Host "`n1) Build + demarrage des services..." -ForegroundColor Cyan
if ($IncludeDotnet) {
    docker compose -f $composePath --profile dotnet up -d --build
} else {
    docker compose -f $composePath up -d --build
}

Write-Host "`n2) Verification rapide des endpoints..." -ForegroundColor Yellow
$checks = @(
    @{ Name = 'Frontend (3000)'; Url = 'http://localhost:3000' },
    @{ Name = 'API Node (3001)'; Url = 'http://localhost:3001/api/students' },
    @{ Name = 'API .NET (3002)'; Url = 'http://localhost:3002/api/students' },
    @{ Name = 'API Spring (3003)'; Url = 'http://localhost:3003/api/students' },
    @{ Name = 'phpMyAdmin (8080)'; Url = 'http://localhost:8080' }
)

foreach ($c in $checks) {
    Write-Host ("{0}:" -f $c.Name) -NoNewline
    try {
        Invoke-WebRequest -Uri $c.Url -TimeoutSec 3 -UseBasicParsing | Out-Null
        Write-Host " OK" -ForegroundColor Green
    } catch {
        Write-Host " NOT_READY" -ForegroundColor Yellow
    }
}

Write-Host "`n=== URLS D ACCES ===" -ForegroundColor Cyan
Write-Host "Frontend:      http://localhost:3000"
Write-Host "API Node.js:   http://localhost:3001/api/students"
Write-Host "API .NET:      http://localhost:3002/api/students"
Write-Host "API Spring:    http://localhost:3003/api/students"
Write-Host "phpMyAdmin:    http://localhost:8080 (serveur: mysql / user: root / mdp: root)"
Write-Host "MySQL (host):  127.0.0.1:3309"
