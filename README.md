# mongoIncidencias

mongoIncidencias es una aplicación de gestión de trainers, areas e incidencias, construida con Node.js y una base de datos MongoDB. Esta aplicación te permite administrar tus incidencias de manera eficiente y organizada. A continuación, encontrarás información detallada sobre cómo configurar y ejecutar el proyecto.

## Requerimientos

El proyecto está desarrollado utilizando Node.js y MongoDB, por lo que necesitarás lo siguiente para ejecutarlo:

- Node.js ([https://nodejs.org](https://nodejs.org/)) - Verifica que la versión instalada sea compatible con las dependencias del proyecto. Se recomienda la versión 18.16.0 de Node.js.
- MongoDB Atlas (https://www.mongodb.com/cloud/atlas) - Se requiere una base de datos MongoDB en línea para almacenar la información del proyecto.

## Configuración del archivo .env

Crea un archivo `.env` en la raíz del proyecto, configura las variables de entorno necesarias y la conexión a la base de datos. Un ejemplo de cómo configurar el archivo `.env` se proporciona en el archivo `.env.example`:

```json
MY_SERVER={"hostname":"127.10.10.15", "port":"3001"}

ATLAS_USER="tu_usuario_de_MongoDB_Atlas"
ATLAS_PASSWORD="tu_contraseña_de_MongoDB_Atlas"
ATLAS_DB="nombre_de_tu_base_de_datos_en_Atlas"

# Clave privada para JWT
JWT_PASSWORD="tu_contraseña_de_creación_del_token"
```

## Instalación de Dependencias

Ejecuta el siguiente comando en la terminal para instalar las dependencias necesarias:

```
npm install
```

## Montar el Servidor

Una vez configuradas las variables de entorno, puedes iniciar el servidor con el siguiente comando:

```
npm run dev
```

## Generación del token

Para de interactuar con los endpoints debes primeramente crear un token  a partir del usuario y su rol:

1. **Rol: admin** 
   - Acceso:
     - "/trainer" versión: 1.0.0 y 2.2.1 - Metodos [ 'get' , 'post' , 'delete' ]
     - "/incidencia" versión: 1.0.0 y 2.2.1  - Metodos [ 'get' , 'post' , 'delete' ]
     - "/area" versión: 1.0.0 y 2.2.1  - Metodos [ 'get' , 'post']
2. **Rol: trainer**
   - Acceso:
     - "/incidencia" versión: 1.0.0 y 2.2.1 - Metodos [ 'get' , 'post' ]
     - "/trainer" versión: 1.0.0 - Metodos [ 'get' ]
     - "/area" versión: 1.0.0  - Metodos [ 'get' ]
3. **Rol: camper**
   - Acceso:
     - "/incidencia" versión: 1.0.0 - Metodos [ 'get' , 'post' ]

```http
GET http://127.10.10.15:3001/token
```

Ejemplos de datos a enviar a través del body:

```json
{
    "nombre": "admin"
 }
```

Usaremos el usuario admin para poder ingresar a todas las peticiones.

Se generará el siguiente código que se debe agregar al HTTP Header de tipo Authorization:

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTdkNTgxNzFmNzdjMjgxNmUzNmIyZiIsImlhdCI6MTY5MjkxNTMwNCwiZXhwIjoxNjkyOTI2MTA0fQ.CRqfVyMSvltKh7X-mqP-2hRxG-1kFY6ZYwM0vfaDXbQ
```

## Petición

Para de interactuar con los endpoints puedes hacerlo mediante la siguiente petición GET:

```http
GET http://127.10.10.15:3001/<nombre_endpoint>
```

## Endpoints Disponibles

### Listar incidencias v1.0.0

Endpoint: `GET /incidencias`

Este endpoint te permite listar todos las incidencias registradas en el sistema. Ejemplos de Datos:

```json
[
  {
    "_id": "64e667d2dd4296f23d18d1ca",
    "id": 1,
    "categoria": "Hardware",
    "tipo": "Fallo de Teclado",
    "descripcion": "Teclado no responde",
    "fecha_reporte": "2023-08-23T00:00:00.000Z",
    "severidad": "leve",
    "area": 2,
    "trainer": 1
  },
  {
    "_id": "64e667d2dd4296f23d18d1cb",
    "id": 2,
    "categoria": "Software",
    "tipo": "Error de Software",
    "descripcion": "Aplicación se bloquea al abrir",
    "fecha_reporte": "2023-08-23T00:00:00.000Z",
    "severidad": "moderada",
    "area": 1,
    "trainer": 2
  },
    ...]
```

### Crear incidencia v1.0.0

Endpoint: `POST /incidencia`

Crea una nueva incidencia en el sistema. Los datos de entrada deben incluir:

- `CATEGORIA` Software, hardware

- `TIPO` Error de aplicación, falta la aplicación, perdida o daño del hardware, por ejemplo.}

- `DESCRIPCION`

- `SEVERIDAD` leve, moderada o critica

- `IDA` id correspondiente al area.

- `IDT` id correspondiente al trainer.

- `FECHA_REPORTE` En caso de no reportarla se genera la actual. Formato (YYYY-MM-DD) .

  Ejemplos de datos a enviar:

  ```json
  {
      "CATEGORIA": "Software",
      "TIPO": "Error de Software",
      "DESCRIPCION": "Aplicación se bloquea al abrir",
      "FECHA_REPORTE": "2023-08-23",
      "SEVERIDAD": "moderada",
      "IDA": 1,
      "IDT": 2
   }
  ```
  
  Respuesta:
  
  ```json
  {
    "message": "Incidencia added successfully",
    "insertedId": "64e4f69fa4077b1d3f298ca8"
  }
  ```

### Listar areas v1.0.0

Endpoint: `GET /area`

Este endpoint te permite listar todos las area registradas en el sistema. Ejemplos de datos:

```json
[
  {
    "_id": "64e667d1dd4296f23d18d1c6",
    "id": 1,
    "tipo": "training",
    "nombre": "Área de Entrenamiento 1",
    "computadores": 10,
    "teclados": 15,
    "mouse": 20,
    "diademas": 5
  },
  {
    "_id": "64e667d1dd4296f23d18d1c7",
    "id": 2,
    "tipo": "review",
    "nombre": "Área de Revisión 1",
    "computadores": 5,
    "teclados": 8,
    "mouse": 12,
    "diademas": 2
  },
    ...]
```

### Crear areas v2.2.1

Endpoint: `POST /area`

Crea una nueva area en el sistema. Los datos de entrada deben incluir:

- `NOMBRE`

- `TIPO` Training o review.

- `COMPUTADORES`cantidad.

- `TECLADOS` cantidad.

- `MOUSE` cantidad.

- `DIADEMAS` cantidad.

  Ejemplos de datos a enviar:

  ```json
  {
    "NOMBRE":"Apolo",
    "TIPO":"Training",
    "COMPUTADORES":15,
    "TECLADOS":25,
    "MOUSE":15,
    "DIADEMAS":15
  }
  ```

  Respuesta:

  ```json
  {
    "message": "Area added successfully",
    "insertedId": "64e4f69fa4077b1d3f298ca8"
  }
  ```

### Listar trainers v1.0.0

Endpoint: `GET /trainer`

Este endpoint te permite listar todos las incidencias registradas en el sistema. Ejemplos de datos:

```json
[
  {
    "_id": "64e667d1dd4296f23d18d1c8",
    "id": 1,
    "nombre": "Entrenador 1",
    "email_personal": "entrenador1@email.com",
    "email_corporativo": "entrenador1@empresa.com",
    "telefono_movil": "+57123456789",
    "telefono_empresa": "+57111222333"
  },
  {
    "_id": "64e667d1dd4296f23d18d1c9",
    "id": 2,
    "nombre": "Entrenador 2",
    "email_personal": "entrenador2@email.com",
    "email_corporativo": "entrenador2@empresa.com",
    "telefono_movil": "+57987654321",
    "telefono_empresa": "+57444555666"
  }
    ...]
```

### Crear trainers v2.2.1

Endpoint: `POST /trainer`

Crea un nuevo trainer en el sistema. Los datos de entrada deben incluir, los telefonos deben llevar el indicativo:

- `NOMBRE` Software, hardware

- `EMAIL_PERSONAL`

- `EMAIL_CORPORATIVO`

- `TELEFONO_MOVIL`

- `TELEFONO_EMPRESA` 

  Opcionales:

- `TELEFONO_MOVIL_EMPRESARIAL`

- `TELEFONO_RESIDENCIAL`

  Ejemplos de datos a enviar:

  ```json
  {
      "NOMBRE": "Entrenador 3", 
      "EMAIL_PERSONAL": "entrenador3@email.com", 
      "EMAIL_CORPORATIVO": "entrenador3@empresa.com", 
      "TELEFONO_MOVIL": "+57123456789", 
      "TELEFONO_EMPRESA": "+57111222333
   }
  ```
  
  Respuesta:

  ```json
  {
    "message": "Trainer added successfully",
    "insertedId": "64e67118f47a76d665729a47"
  }
  ```

### Eliminar incidencia v2.2.1

Endpoint: `DELETE /incidencia/<id>`

Eliminar una incidencia especifica en el sistema. La peticion debe hacerse de la siguiente manera:

```http
DELETE http://127.10.10.15:3001/incidencia/2
```

Respuesta:

```json
{
  "message": "Incidencia deleted successfully"
}
```

### Eliminar trainer v2.2.1

Endpoint: `DELETE /trainer/<id>`

Eliminar un trainer especifico en el sistema. La peticion debe hacerse de la siguiente manera:

```http
DELETE http://127.10.10.15:3001/trainer/2
```

Respuesta:

```json
{
  "message": "Trainer deleted successfully"
}
```

## Dependencias Utilizadas

Este proyecto utiliza diversas dependencias para su funcionamiento. A continuación, se detallan las dependencias principales y sus respectivas versiones:

- **express**: 4.18.2 Express es un marco de aplicación web rápido, minimalista y flexible para Node.js. Es utilizado en este proyecto para manejar las rutas y la lógica de la aplicación.
- **dotenv**: 16.3.1 Dotenv es una librería que permite cargar variables de entorno desde un archivo `.env`. En este proyecto, se utiliza para gestionar las configuraciones sensibles.
- **express-rate-limit**: 6.8.1 Express Rate Limit es un middleware que proporciona limitación de velocidad y control de la frecuencia de las solicitudes HTTP. Se utiliza aquí para prevenir ataques de fuerza bruta y abusos.
- **mongodb**: 5.7.0 MongoDB es una base de datos NoSQL ampliamente utilizada. En este proyecto, se usa para almacenar y recuperar datos relacionados con el alquiler de autos.
- **nodemon**: 3.0.1 Nodemon es una herramienta que ayuda en el desarrollo al reiniciar automáticamente la aplicación cuando se detectan cambios en el código fuente. Esto agiliza el proceso de desarrollo y prueba.
- **jose** (4.14.4): Esta dependencia parece relacionarse con JSON Web Tokens (JWT) y puede estar relacionada con la autenticación y la seguridad en tu aplicación.
- **express-session** (1.17.3): Express Session es una librería que permite gestionar sesiones de usuario en aplicaciones Express.js. Puede ser utilizada para mantener el estado de la sesión del usuario en el servidor.
- **express-routes-versioning**: ^1.0.1: Express Routes  Versioning es una librería para Node.js que permite manejar y gestionar  versiones en las rutas de una aplicación Express de manera sencilla. Con esta dependencia, puedes definir y mantener diferentes versiones de tus rutas en función de los cambios y actualizaciones que realices en tu  API. Esto es útil para garantizar la compatibilidad hacia atrás y  permitir que los clientes sigan utilizando versiones anteriores de tu  API mientras introduces nuevas funcionalidades.