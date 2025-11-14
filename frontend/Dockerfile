# 1️⃣ Build-Stage mit Node
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 🟢 Wichtig: Build-Argument von docker-compose übernehmen
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Debug-Ausgabe zur Kontrolle
RUN echo "Building Frontend with VITE_API_URL=$VITE_API_URL"
# Jetzt weiß Vite beim Build, welche URL es verwenden soll
RUN npm run build

# 2️⃣ Runtime-Stage mit Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# (Optional, aber gut) eigene SPA-Weiterleitung
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]