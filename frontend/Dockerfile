# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias y construir
COPY package*.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm config set strict-ssl false

RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la app para producción
RUN npm run build

# Etapa 2: Servir la app con NGINX
FROM nginx:stable-alpine

# Copiar archivos de compilación desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Eliminar la configuración por defecto de nginx y usar una personalizada (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto que usa nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]