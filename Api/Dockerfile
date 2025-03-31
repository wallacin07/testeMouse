# Usa a imagem oficial do .NET 9.0 SDK para build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do projeto para dentro do contêiner
COPY . ./

# Restaura as dependências e publica a aplicação
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Usa uma imagem mais leve apenas com o runtime do .NET 9.0
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copia os arquivos da etapa de build
COPY --from=build /app/out ./

# Define o comando para rodar a aplicação
CMD ["dotnet", "testeMouse.dll"]
