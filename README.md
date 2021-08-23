# App Node Practica 2 Microservicios

Esta app registra a usuarios y da ingreso a un usuario a través de un  token generado.

Incluye:

- app nodejs
- archivo dockerfile para correr app node
- archivo docker-compose para correr app node y mongodb

## Manera local
Se debe contar con la instalación de:

- Nodejs
- Mongodb

### Rutas
- Registrar usuario:

Post:

    http://localhost:3000/auth/register

Parámetros:

Son recibidos en formato json en el body de la petición:

- nombre: String 
- apellidoPaterno: String 
- apellidoMaterno: String 
- correo: String
- telefono: String 
- password: String 
- tipo: String
### Ejemplo de ejecución

- Registro correcto

![Alt text](img/1.png?raw=true "Title")

- Registro ya existente

![Alt text](img/2.png?raw=true "Title")

- Faltan datos

![Alt text](img/3.png?raw=true "Title")

- Login:

Post:

    http://localhost:3000/auth/login

Parámetros:

Son recibidos en formato json en el body de la petición:

- correo: String
- password: String 

#### Ejemplo de ejecución

- login correcto

![Alt text](img/4.png?raw=true "Title")

- Login incorrecto

![Alt text](img/5.png?raw=true "Title")

- Faltan datos

![Alt text](img/6.png?raw=true "Title")
## Docker
El proyecto podría funcionar si instalamos Node y MongoDB  en nuestro servidor local.
Pero la intención es no instalar ninguno de ellos y que funcione gracias a Docker.

Para ello creamos 2 contenedores:
- Un contenedor Node que contiene el código de nuestra app
- Un contenedor de MongoDB asociado 

### Cómo iniciar el proyecto

Todas las configuraciones necesarias se encuentras en los archivos dockerfile y docker-compose.yaml.
Utilizando docker-compose podemos ejecutar de manera sencilla las siguientes actividades:

- Crear una imagen basada en Node con el código de la app.
- Iniciar un contenedor de mongo.
- Definir las credenciales de mongo como variables de entorno. 
- Asociar los contenedores a una Network
- Exponer puertos para que estén disponibles en nuestro Host

### Usando Docker Compose

Puedes hacer todo lo anterior ejecutando un solo comando:

    docker-compose up

![Alt text](img/consola.png?raw=true "Title")
## Una vez iniciado el proyecto

- Puedes acceder a la aplicación desde localhost:8090 en tu navegador.

### Rutas
- Registrar usuario:

Post:

    http://localhost:8090/auth/register

Parámetros:

Son recibidos en formato json en el body de la petición:

- nombre: String 
- apellidoPaterno: String 
- apellidoMaterno: String 
- correo: String
- telefono: String 
- password: String 
- tipo: String

#### Ejemplo de ejecución

- Registro correcto

![Alt text](img/7.png?raw=true "Title")

- Registro ya existente

![Alt text](img/8.png?raw=true "Title")

- Faltan datos

![Alt text](img/9.png?raw=true "Title")

- Login:

Post:

    http://localhost:8090/auth/login

Parámetros:

Son recibidos en formato json en el body de la petición:

- correo: String
- password: String

#### Ejemplo de ejecución en docker

- login correcto

![Alt text](img/10.png?raw=true "Title")

- Login incorrecto

![Alt text](img/11.png?raw=true "Title")

- Faltan datos

![Alt text](img/12.png?raw=true "Title")