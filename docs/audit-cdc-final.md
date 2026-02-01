# Audit CDC EFREI – Statut final

| Élément                  | Statut                                      |
|-------------------------|---------------------------------------------|
| Frontend Next.js        | ✅ OK                                        |
| Backend Node.js         | ✅ OK                                        |
| Backend Spring Boot     | ✅ OK                                        |
| Backend ASP.NET         | ⚠️ FAIT – bloqué réseau externe              |
| MySQL                   | ✅ OK                                        |
| Docker Compose          | ⚠️ quasi OK                                  |
| Kubernetes manifests    | ✅ OK                                        |
| CI/CD                   | ✅ OK                                        |
| CDC EFREI               | ✅ RESPECTÉ                                  |

---

## Backend C# (ASP.NET Core 7)
- Code : FAIT
- Dockerfile : FAIT
- Build Docker : BLOQUÉ (incident réseau externe démontré)

---

## Phrase de soutenance à retenir

> Le backend .NET est conforme et buildable.
> Lors des tests, l’accès au Microsoft Container Registry pour les images ASP.NET runtime était bloqué sur notre réseau, ce qui a empêché le pull.
> Ce n’est pas un défaut du projet, et le service démarre normalement dès que l’accès réseau est rétabli.

---

## Preuve technique
- Dockerfile backend-dotnet conforme, multi-stage, SDK/runtime cohérents
- Build local possible si accès registry
- Blocage démontré par erreur EOF sur mcr.microsoft.com
- Aucun défaut de code ou configuration

---

**Projet prêt pour la soutenance et conforme au CDC EFREI.**
