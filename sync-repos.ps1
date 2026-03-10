# Script de synchronisation GitLab <-> GitHub
# Maintient les deux repositories à jour

Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   SYNCHRONISATION GITLAB ↔ GITHUB       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    Write-Host "❌ Erreur: Ce script doit être exécuté depuis la racine du projet" -ForegroundColor Red
    exit 1
}

# Vérifier les remotes
Write-Host "[1] Vérification des remotes configurés...`n" -ForegroundColor Yellow
git remote -v

# Vérifier le statut
Write-Host "`n[2] Statut Git actuel:" -ForegroundColor Yellow
$status = git status --short
if ($status) {
    Write-Host $status
    Write-Host "`n⚠️  Des changements sont en attente. Souhaitez-vous les committer? (O/N): " -NoNewline -ForegroundColor Yellow
    $response = Read-Host
    
    if ($response -eq "O" -or $response -eq "o") {
        git add .
        Write-Host "`n📝 Message de commit: " -NoNewline -ForegroundColor Cyan
        $commitMsg = Read-Host
        git commit -m $commitMsg
        Write-Host "✓ Commit créé" -ForegroundColor Green
    }
} else {
    Write-Host "✓ Aucun changement en attente" -ForegroundColor Green
}

# Afficher les derniers commits
Write-Host "`n[3] Derniers commits:" -ForegroundColor Yellow
git log --oneline -3

# Synchronisation avec GitLab
Write-Host "`n[4] Push vers GitLab (origin)..." -ForegroundColor Magenta
$gitlabPush = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ GitLab synchronisé" -ForegroundColor Green
} else {
    Write-Host "⚠️  GitLab: $gitlabPush" -ForegroundColor Yellow
}

# Synchronisation avec GitHub
Write-Host "`n[5] Push vers GitHub (github)..." -ForegroundColor Blue
$githubPush = git push github main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ GitHub synchronisé" -ForegroundColor Green
} else {
    Write-Host "⚠️  GitHub: $githubPush" -ForegroundColor Yellow
}

# Résumé
Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║         SYNCHRONISATION TERMINÉE        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "📊 Accès aux repositories:" -ForegroundColor Cyan
Write-Host "  🦊 GitLab:  https://gitlab.com/ilyesse-soc1/student-management" -ForegroundColor White
Write-Host "  🐙 GitHub:  https://github.com/Ilyesse-soc/student-management" -ForegroundColor White

Write-Host "`n🔄 CI/CD Pipelines:" -ForegroundColor Cyan
Write-Host "  GitLab CI: https://gitlab.com/ilyesse-soc1/student-management/-/pipelines" -ForegroundColor White
Write-Host "  GitHub Actions: https://github.com/Ilyesse-soc/student-management/actions`n" -ForegroundColor White
