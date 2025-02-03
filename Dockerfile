# --- Etapa de build ---
FROM node:20-alpine as build

WORKDIR /app

# Copiamos solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalamos dependencias de forma optimizada
RUN npm ci

# Copiamos el código fuente después de instalar dependencias
COPY . .

# Construcción de la aplicación
RUN npm run build

# --- Etapa de producción ---
FROM nginx:alpine

# Definir un directorio de trabajo para evitar problemas de permisos
WORKDIR /usr/share/nginx/html

# Copiamos la configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiamos los archivos construidos desde la etapa anterior
COPY --from=build /app/dist . 

# Asegurar permisos adecuados para OpenShift
RUN chmod -R 755 /usr/share/nginx/html && \
    chmod -R 777 /tmp /var/cache/nginx /var/run /var/log/nginx

# Cambiar al usuario no root
USER 1001

# Exponemos el puerto que usará nginx
EXPOSE 8080

# El comando CMD se hereda de la imagen base de nginx
