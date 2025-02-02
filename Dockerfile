# Etapa de build
FROM node:16-alpine as build

WORKDIR /app

# Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el código fuente
COPY . .

# Aseguramos los permisos correctos
RUN chown -R 1001:0 /app && \
    chmod -R g+rwX /app

# Construcción de la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiamos la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiamos los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Configuramos los permisos para OpenShift
RUN chown -R 1001:0 /usr/share/nginx/html && \
    chmod -R g+rwX /usr/share/nginx/html && \
    chown -R 1001:0 /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx

# Cambiamos al usuario no privilegiado
USER 1001

EXPOSE 8080