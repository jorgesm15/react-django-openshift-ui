# frontend/Dockerfile

# Etapa de build
FROM node:16-alpine as build

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el código fuente
COPY . .

# Construcción de la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiamos la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiamos los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Creamos un usuario no privilegiado
RUN adduser -D -H -u 1001 appuser && \
    chown -R appuser:appuser /usr/share/nginx/html

# Cambiamos los permisos para OpenShift
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx /var/run /var/log/nginx

# Cambiamos al usuario no privilegiado
USER appuser

# Exponemos el puerto que usará nginx
EXPOSE 8080

# El comando CMD se hereda de la imagen base de nginx