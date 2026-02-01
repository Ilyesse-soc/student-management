# Dockerfile multi-stage pour le backend .NET (ASP.NET Core 7)
# Étape 1 : Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY [".", "."]
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Étape 2 : Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 3002
ENV ASPNETCORE_URLS=http://+:3002
ENTRYPOINT ["dotnet", "backend-dotnet.dll"]
