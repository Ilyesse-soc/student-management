# Script pour pousser les changements vers GitLab
# Usage: .\push-gitlab.ps1

Write-Host "`n╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   PUSH VERS GITLAB - CI/CD FIX      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Vérifier si on est dans le bon répertoire
if (-not (Test-Path ".git")) {
    Write-Host "❌ Erreur: Ce script doit être exécuté depuis la racine du projet Git" -ForegroundColor Red
    exit 1
}

# Vérifier les changements
Write-Host "[1] Vérification des changements...`n" -ForegroundColor Yellow
git status --short

Write-Host "`n[2] Ajout des fichiers modifiés..." -ForegroundColor Yellow
git add .

Write-Host "`n[3] Vérification des fichiers en staged..." -ForegroundColor Yellow
git diff --cached --name-only

Write-Host "`n[4] Status actuel:" -ForegroundColor Yellow
$status = git status --short
if ($status) {
    Write-Host $status
    
    # Demander confirmation
    Write-Host "`n⚠️  Voulez-vous committer ces changements? (O/N): " -ForegroundColor Yellow -NoNewline
    $response = Read-Host
    
    if ($response -eq "O" -or $response -eq "o") {
        Write-Host "`n[5] Création du commit..." -ForegroundColor Green
        git commit -m "ci: Correction pipeline GitLab CI/CD - utilisation d'images Docker standards

- Remplacement des tags runners spécifiques (windows, docker, efrei_project)
- Utilisation d'images Docker officielles (node:18-alpine, dotnet/sdk:8.0, maven:3.8-openjdk-17)
- Ajout de services MySQL pour les tests backend Node
- Optimisation cache NPM, NuGet et Maven
- Ajout de before_script avec installations de dépendances
- Configuration only: main, develop, merge_requests

Résout les échecs de build sur GitLab CI/CD"
        
        Write-Host "`n✓ Commit créé!" -ForegroundColor Green
    }
}

Write-Host "`n[6] Historique des derniers commits:" -ForegroundColor Yellow
git log --oneline -5

Write-Host "`n[7] Push vers GitLab..." -ForegroundColor Cyan
Write-Host "⚠️  Une fenêtre d'authentification va s'ouvrir..." -ForegroundColor Yellow
Write-Host "Si vous utilisez SSO/SAML, utilisez un Personal Access Token:`n" -ForegroundColor Yellow
Write-Host "   1. Allez sur: https://gitlab.com/-/user_settings/personal_access_tokens" -ForegroundColor White
Write-Host "   2. Créez un token avec scopes: write_repository, read_repository" -ForegroundColor White
Write-Host "   3. Username: oauth2" -ForegroundColor White
Write-Host "   4. Password: <VOTRE_TOKEN>`n" -ForegroundColor White

# Tentative de push
$pushAttempt = 0
$maxAttempts = 3

while ($pushAttempt -lt $maxAttempts) {
    $pushAttempt++
    Write-Host "Tentative $pushAttempt/$maxAttempts..." -ForegroundColor Cyan
    
    git push origin main 2>&1 | Tee-Object -Variable pushOutput
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Push réussi vers GitLab!" -ForegroundColor Green
        Write-Host "`nVérifiez votre pipeline sur:" -ForegroundColor Cyan
        Write-Host "https://gitlab.com/ilyesse-soc1/student-management/-/pipelines`n" -ForegroundColor White
        exit 0
    }
    else {
        Write-Host "`n❌ Push échoué (tentative $pushAttempt/$maxAttempts)" -ForegroundColor Red
        if ($pushAttempt -lt $maxAttempts) {
            Write-Host "Nouvelle tentative dans 3 secondes..." -ForegroundColor Yellow
            Start-Sleep -Seconds 3
        }
    }
}

Write-Host "`n⚠️  Échec après $maxAttempts tentatives" -ForegroundColor Red
Write-Host "Solutions possibles:" -ForegroundColor Yellow
Write-Host "  1. Configurez un Personal Access Token (voir instructions ci-dessus)" -ForegroundColor White
Write-Host "  2. Ou utilisez SSH: git remote set-url origin git@gitlab.com:ilyesse-soc1/student-management.git" -ForegroundColor White
Write-Host "  3. Vérifiez vos credentials Git: git config --list | Select-String 'user.'" -ForegroundColor White
