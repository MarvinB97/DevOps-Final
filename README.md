## 🚀 Mini Pokédex con DevOps
Aplicación web sencilla con:

- 🔐 Autenticación (Login básico)
- 🦊 CRUD de Pokémons (Crear, leer, actualizar, eliminar)
- 🛠️ Prácticas DevOps implementadas

### 🛠 Tecnologías
Frontend: React.js

Backend: Node.js + Express

Base de datos: MySQL

DevOps: Docker, GitHub Actions (CI/CD básico)

### 🚀 Cómo Empezar
Clonar repositorio:

bash
git clone https://github.com/MarvinB97/DevOps-Final
Ejecutar con Docker:

bash
docker-compose up --build  
Abrir en navegador:
http://localhost:3005

🔧 Variables de Entorno
Crear .env basado en .env.example

Nota: Proyecto educativo para practicar DevOps en un contexto realista.

📌 ¡Atrapa todos los Pokémons (y los bugs también)!

🔍 Estructura básica:
/backend   # API Node.js  
/frontend  # App React  
docker-compose  # Container 
.github    # CI/CD workflows  

### 🚀 Despliegue continuo

#### Ejemplo:
Lineas de comando:

docker build -t marv7/devops-final-frontend:blue -f ./frontend/Dockerfile ./frontend 
docker login
docker push marv7/devops-final-frontend:blue  
kubectl apply -f ./kubernetes/blue/frontend-blue.yaml 
kubectl apply -f ./kubernetes/blue/service-frontend-blue.yaml 
kubectl apply -f ./kubernetes/green/frontend-green.yaml 
kubectl get deployments
kubectl get pods
kubectl rollout status deployment/frontend-blue
kubectl port-forward svc/frontend-service 3000:80 

