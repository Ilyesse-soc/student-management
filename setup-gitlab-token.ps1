# Configuration Git avec Personal Access Token GitLab
# Remplacez YOUR_TOKEN par votre token GitLab

param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

Write-Host "`n🔧 Configuration Git pour GitLab avec token..." -ForegroundColor Cyan

# Configurer l'URL remote avec le token
$repoUrl = "https://oauth2:$Token@gitlab.com/ilyesse-soc1/student-management.git"
git remote set-url origin $repoUrl

Write-Host "✓ Remote configuré avec authentification" -ForegroundColor Green

# Afficher la configuration (sans le token)
Write-Host "`nConfiguration actuelle:" -ForegroundColor Yellow
git remote -v | ForEach-Object { $_ -replace $Token, "***TOKEN***" }

Write-Host "`n✓ Vous pouvez maintenant faire: git push origin main" -ForegroundColor Green
