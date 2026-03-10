# Script de vérification et mise à jour GitHub

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  MISE À JOUR COMPLÈTE GITHUB                   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan

Set-Location "d:\epreuvefinal-devopscicd\student-management"

Write-Host "`n[1] Vérification des fichiers modifiés..." -ForegroundColor Yellow
$status = git status --porcelain

if ($status) {
    Write-Host "`nFichiers non commités détectés:" -ForegroundColor Red
    Write-Host $status
    
    Write-Host "`n[2] Ajout de tous les fichiers..." -ForegroundColor Yellow
    git add .
    
    Write-Host "`n[3] Création du commit..." -ForegroundColor Yellow
    git commit -m "chore: Mise à jour complète du projet - configuration et corrections"
    
    Write-Host "`n[4] Push vers GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host "`n✓ Mise à jour complète effectuée!" -ForegroundColor Green
} else {
    Write-Host "`n✓ Tous les fichiers sont déjà à jour sur GitHub!" -ForegroundColor Green
}

Write-Host "`n[DERNIER COMMIT]" -ForegroundColor Cyan
git log --oneline -1

Write-Host "`n[STATUT]" -ForegroundColor Cyan
git status -sb

Write-Host "`nAppuyez sur une touche pour fermer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
