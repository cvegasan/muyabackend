# Proyecto Final: Hito 3 - Desarrollo Backend 💻 ⚙️ 💾

El tercer hito consiste en el desarrollo backend del proyecto.
Se crean las rutas proyecto "Muya, Agricultura Urbana" en base a las definiciones del "Hito 1 - Diseño y Prototipo".

## Integrantes:
    * Ángela Águila
    * Bárbara Estrada
    * Cristián Vega

## Repositorio:
    https://github.com/bestrada05/Muya

## Server (Backend)
npm i -y  
npm install express  
npm install pg cors  
npm install pg-format (Manejo sentencias SQL)  
npm install dotenv (Manejo de variables de entorno)  
npm install -D nodemon (Habilitar actualizacion Hot Reloading)  
npm install --save-dev jest supertest  
npm install --save-dev jest babel-jest @babel/preset-env  
npm install morgan (Generar informe)  

node server.js para iniciar el servidor  
si está configurado en el archivo pacjage.json  
npm start  

## Configuracion (Archivo .env)
PG_HOST=localhost  
PG_USER=postgres  
PG_PASSWORD=########  
PG_PORT=5510  
PG_DATABASE=ecommerce  
JWT_PASSWORD=########  

## Requerimientos
1. Crear un nuevo proyecto de npm e instalar todas las dependencias que necesitarás.  
2. Utilizar el paquete pg para gestionar la comunicación con la base de datos PostgreSQL.  
3. Implementar la autenticación y autorización de usuarios con JWT.  
4. Usar el paquete CORS para permitir las consultas de orígenes cruzados.  
5. Utilizar middlewares para validar las credenciales o token en cabeceras en las rutas que aplique.
6. Realizar test de por lo menos 4 rutas de la API REST comprobando los códigos de estados de diferentes escenarios.  

## Informe
Nombre: informe.log
