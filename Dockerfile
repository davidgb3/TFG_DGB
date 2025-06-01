# Etapa de construcción del frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa de construcción del backend
FROM node:18-alpine
WORKDIR /app

# Copiar y construir el backend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install --production

COPY backend/ ./

# Copiar el frontend construido
COPY --from=frontend-build /app/frontend/dist ../frontend/dist

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]