# ========= ETAPA DE CONSTRUCCIÓN =========
FROM node:23-alpine AS builder

WORKDIR /backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

# ========= ETAPA DE DESARROLLO =========
FROM node:23-alpine AS dev

WORKDIR /backend
COPY --from=builder backend/node_modules ./node_modules
COPY backend/. .

# Instala herramientas para esperar a MySQL
RUN apk add --no-cache mysql-client

ENV NODE_ENV=development
ENV PORT=3005
EXPOSE 3005

CMD ["node", "src/wait-for-mysql.js"]

# ========= ETAPA DE PRODUCCIÓN =========
# FROM node:23-alpine AS production

# WORKDIR /backend
# COPY --from=builder /backend/node_modules ./node_modules
# COPY . .

# # Instala solo lo necesario para esperar MySQL
# RUN apk add --no-cache mysql-client

# ENV NODE_ENV=production
# ENV PORT=3005
# EXPOSE 3005

# CMD ["sh", "-c", "./scripts/wait-for-mysql.sh mysql root 12345 pokedex node src/index.js"]