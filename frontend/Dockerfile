# Etapa 1: Construcción con Node.js
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la app
RUN npm run build

# Etapa 2: Servir la app con NGINX
FROM nginx:stable-alpine

# Copiar archivos compilados desde la etapa builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Iniciar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
