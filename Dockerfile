# Etapa de construcción del frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa de construcción del backend
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Etapa final
FROM node:18-alpine
WORKDIR /app

# Copiar backend
COPY --from=backend-build /app/backend ./backend
# Copiar frontend compilado
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Instalar solo dependencias de producción del backend
WORKDIR /app/backend
RUN npm ci --only=production

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]