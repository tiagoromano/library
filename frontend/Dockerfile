# Etapa 1: Build da aplicação
FROM node:20-alpine AS build

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Build da aplicação para produção
RUN npm run build --prod

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Remove configuração default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia build Angular para o diretório do Nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copia arquivo de configuração do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe porta padrão do Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
